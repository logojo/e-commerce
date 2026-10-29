"use server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

import {
  capturePayPalOrder,
  createPayPalOrder,
  getPayPalOrder,
  paypalCurrency,
} from "@/lib/paypal/rest";
import { auth } from "@/lib/auth";

export async function createPayment(orderId: string) {
  const session = await auth.api.getSession({
      headers: await headers() 
  })
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Debes iniciar sesión");
  }

  if (typeof orderId !== "string" || orderId.length > 100) {
    throw new Error("Pedido no válido");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    select: {
      id: true,
      total: true,
      isPaid: true,
      transactionId: true,
      proveedor: true,
    },
  });

  if (!order) {
    throw new Error("Pedido no encontrado");
  }

  if (order.isPaid) {
    throw new Error("Este pedido ya está pagado");
  }

  if (order.proveedor && order.proveedor !== "PayPal") {
    throw new Error("El pedido tiene otro proveedor de pago");
  }

  // Reutiliza el intento existente en lugar de crear órdenes duplicadas.
  if (order.transactionId) {
    if (order.proveedor !== "PayPal") {
      throw new Error("El proveedor del pedido no coincide");
    }

    const existing = await getPayPalOrder(order.transactionId);

    if (
      existing.id !== order.transactionId ||
      existing.purchase_units?.[0]?.custom_id !== order.id ||
      !["CREATED", "APPROVED"].includes(existing.status)
    ) {
      throw new Error(
        "El intento de pago anterior requiere revisión"
      );
    }

    return { orderId: existing.id };
  }

  if (!Number.isFinite(order.total) || order.total <= 0) {
    throw new Error("El importe del pedido no es válido");
  }

  const amount = order.total.toFixed(2);

  const paypalOrder = await createPayPalOrder({
    orderId: order.id,
    amount,
  });

  if (paypalOrder.status !== "CREATED" || !paypalOrder.id) {
    throw new Error("No se pudo crear la orden en PayPal");
  }

  // Vincula el pedido a PayPal sin sobrescribir cambios concurrentes.
  const updated = await prisma.order.updateMany({
    where: {
      id: order.id,
      userId,
      isPaid: false,
      transactionId: null,
      proveedor: null,
    },
    data: {
      transactionId: paypalOrder.id,
      proveedor: "PayPal",
    },
  });

  if (updated.count !== 1) {
    // No se debe iniciar otro intento automáticamente.
    throw new Error(
      "El pedido cambió mientras se iniciaba el pago"
    );
  }

  return { orderId: paypalOrder.id };
}

export async function capturePayment(paypalOrderId: string) {
  const session = await auth.api.getSession({
        headers: await headers() 
  })
  
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Debes iniciar sesión");
  }

  if (
    typeof paypalOrderId !== "string" ||
    !/^[A-Za-z0-9_-]{5,100}$/.test(paypalOrderId)
  ) {
    throw new Error("ID de PayPal no válido");
  }

  const order = await prisma.order.findFirst({
    where: {
      userId,
      transactionId: paypalOrderId,
      proveedor: "PayPal",
    },
    select: {
      id: true,
      total: true,
      isPaid: true,
      paidAt: true,
      transactionId: true,
    },
  });

  if (!order) {
    throw new Error("No se encontró el pedido asociado al pago");
  }

  if (order.isPaid) {
    return { success: true };
  }

  const expectedAmount = order.total.toFixed(2);

  // Comprueba el estado remoto antes de capturar. Esto permite
  // recuperar ciertos casos donde PayPal capturó, pero la app
  // perdió la respuesta anterior.
  let paypalOrder = await getPayPalOrder(paypalOrderId);

  if (paypalOrder.id !== paypalOrderId) {
    throw new Error("La orden devuelta por PayPal no coincide");
  }

  if (paypalOrder.status !== "COMPLETED") {
    if (paypalOrder.status !== "APPROVED") {
      throw new Error("La orden todavía no está aprobada para captura");
    }

    try {
      paypalOrder = await capturePayPalOrder(
        paypalOrderId,
        order.id
      );
    } catch {
      // La petición pudo haber fallado después de completarse
      // en PayPal. Consulta de nuevo antes de declarar el fallo.
      paypalOrder = await getPayPalOrder(paypalOrderId);
    }
  }

  const purchaseUnit = paypalOrder.purchase_units?.[0];
  const capture = purchaseUnit?.payments?.captures?.[0];

  if (
    paypalOrder.status !== "COMPLETED" ||
    purchaseUnit?.custom_id !== order.id ||
    purchaseUnit.amount?.currency_code !== paypalCurrency ||
    purchaseUnit.amount?.value !== expectedAmount ||
    capture?.status !== "COMPLETED" ||
    capture.amount?.currency_code !== paypalCurrency ||
    capture.amount?.value !== expectedAmount ||
    !capture.id
  ) {
    throw new Error(
      "No se pudo verificar la captura y el importe del pago"
    );
  }

  const updated = await prisma.order.updateMany({
    where: {
      id: order.id,
      userId,
      isPaid: false,
      transactionId: paypalOrderId,
      proveedor: "PayPal",
    },
    data: {
      isPaid: true,
      paidAt: new Date(),
    },
  });

  if (updated.count !== 1) {
    // Verifica si otra solicitud ya confirmó el mismo pedido.
    const current = await prisma.order.findUnique({
      where: { id: order.id },
      select: { isPaid: true },
    });

    if (!current?.isPaid) {
      throw new Error(
        "El pago se completó en PayPal, pero el pedido requiere reconciliación"
      );
    }
  }

  return { success: true };
}