'use client'

import Link from "next/link"
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/app/store/cart/cart-store";
import { ResumenSckeleton } from "@/app/components/sckeletons/ResumenSckeleton";
import { currencyFormat } from "@/app/utils";

export const ResumenOrder = () => {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  //const resumen = useCartStore(useShallow((state) => state.getResumenCart()));

  //al desestructurar te ahorrar el useShallow
  const {totalProducts, subtotal, iva } = useCartStore(useShallow((state) => state.getResumenCart()));

  return (
    <div className="rounded-xl shadow-xl p-7">
              <h2 className="text-xl mb-2">Resumen de la orden</h2>

        {
            hasHydrated
            ? (
              <>
                <div className="grid grid-cols-2">
                    <span>No. Productos</span>
                    <span className="text-right">{totalProducts} artículos</span>

                    <span>Subtotal</span>
                    <span className="text-right">{ currencyFormat( subtotal ) }</span>

                    <span>Impuestos (16%)</span>
                    <span className="text-right">{ currencyFormat( iva ) }</span>

                    <span className="text-2xl mt-5">Total</span>
                    <span className="text-right mt-5 text-2xl"> {currencyFormat( subtotal + iva ) }</span>
                </div>

                <div className="mt-5 mb-2">
                <Link className="flex btn-primary justify-center active:scale-90" href="/checkout/address">Checkout</Link>
                </div>
              </>  
            )
            : <ResumenSckeleton />
        }
    </div>
  )
}

