'use client'

import { useShallow } from "zustand/shallow";
import clsx from "clsx";

import { useUIStore } from "@/app/store";
import { useCartStore } from "@/app/store/cart/cart-store";
import { useAddresStore } from "@/app/store/address/address-store";
import { currencyFormat } from "@/app/utils";

import { ResumenSckeleton } from "@/app/components/sckeletons/ResumenSckeleton";
import { Loader } from "../ui/Loader";
import { DeliverAddress } from "./DeliverAddress";

export const OrderResume = () => {
 const { hasHydrated: hasHydratedAddress, deliverInfo } = useAddresStore();
 const { hasHydrated, cart } = useCartStore();
 const {totalProducts, subtotal, iva } = useCartStore(useShallow((state) => state.getResumenCart()));
 const { loading, handleloading } = useUIStore()

 const onPlaceOrder = () => {
  handleloading()
  
  const productsToOrder = cart.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    size: item.size
  }));

  console.log(productsToOrder, deliverInfo);
  
  
 }

 return (
    <div className="rounded-xl shadow-xl p-7">
      {
        hasHydratedAddress 
        ? <DeliverAddress deliverInfo={deliverInfo} />
        : <ResumenSckeleton />
      }

      <div className="w-full h-0.5 rounded bg-gray-100 my-10" />

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
                  <p className="mb-3">
                    <span className="text-xs">
                      Al hacer click en "Realizar pedido", aceptas nuestros  
                      <a href="#" className="underline ml-1">términos y condiciones de uso</a> y 
                      <a href="#" className="underline ml-1">nuestras políticas de privacidad</a>
                    </span>
                  </p>
                  
                  <span className="text-red-500 text-sm fade-in">Error al realizar el pedido</span>
                  {/* //href="/orders/123" */}
                  <button className={
                    clsx(
                      "w-full flex items-center gap-2 btn-primary justify-center ", {
                       "cursor-pointer active:scale-90": !loading
                      }
                    )
                  }
                          disabled={loading}
                          onClick={onPlaceOrder}
                  >
                          { loading && <Loader />}
                          Realizar Pedido
                  </button>
                </div>
              </>  
            )
            : <ResumenSckeleton />
        }
    </div>
  )
}


