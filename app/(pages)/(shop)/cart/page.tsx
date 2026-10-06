import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { QuantitySelector, Title } from "@/app/components";
import { initialData } from "@/app/seed/seeder";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]
export default function() {

  if( productsInCart.length === 0 ) {
      redirect('/empty')
  }
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250 ">
          <Title title="Carrito" />

          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10">
            
            {/* Productos en carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más items</span>
              <Link href="/" className="underline mb-5">
                Continua comprando
              </Link>
           

              {
                productsInCart.map( product => (
                  <div key={ product.slug } className="flex mb-5">
                    <Image 
                      src={`/products/${product.images[0]}`}
                      alt={product.title}
                      width={100}
                      height={100}
                      loading="eager"
                      className="mr-5 rounded"
                      style={{
                        width: '100px',
                        height: '100px'
                      }}
                    />

                    <div>
                      <p>{ product.title }</p>
                      <p>${ product.price.toFixed(2) }</p>
                      <QuantitySelector quantity={1} />
                      <button className="underline mt-3 active:scale-95 cursor-pointer">
                        remover
                      </button>
                    </div>

                  </div>
                ))
              }
            </div>

            {/* Checkout - Resumen de la orden */}
            <div className="rounded-xl shadow-xl p-7">
              <h2 className="text-xl mb-2">Resumen de la orden</h2>

              <div className="grid grid-cols-2">
                  <span>No. Productos</span>
                  <span className="text-right">3 artículos</span>

                  <span>Subtotal</span>
                  <span className="text-right">$ 100</span>

                  <span>Impuestos (16%)</span>
                  <span className="text-right">$ 16</span>

                  <span className="text-2xl mt-5">Total</span>
                  <span className="text-right mt-5 text-2xl">$ 116</span>
              </div>

              <div className="mt-5 mb-2">
                <Link className="flex btn-primary justify-center active:scale-90" href="/checkout/address">Checkout</Link>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}