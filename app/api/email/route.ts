import { sendEmail } from "@/lib/email/mailersend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("to" in body) ||
      !("subject" in body) ||
      !("message" in body)
    ) {
      return NextResponse.json(
        { error: "Los datos son obligatorios." },
        { status: 400 },
      );
    }

    const { to, subject, message } = body as {
      to: unknown;
      subject: unknown;
      message: unknown;
    };

    if (
      typeof to !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) ||
      subject.trim().length === 0 ||
      subject.length > 200 ||
      message.trim().length === 0 ||
      message.length > 10_000
    ) {
      return NextResponse.json(
        { error: "Los datos del correo no son válidos." },
        { status: 400 },
      );
    }

    await sendEmail({
      to,
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, message: "Correo enviado correctamente." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "No fue posible procesar el envío." },
      { status: 500 },
    );
  }
}