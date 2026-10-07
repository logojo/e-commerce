import Link from "next/link";
import Image from "next/image";

import { Title } from "@/app/components";
import { initialData } from "@/seed/seeder";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]
export default function() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250 ">
          <Title title="Verificar orden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10">
            
            {/* Productos en carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar articulos</span>
              <Link href="/cart" className="underline mb-5">
                Editar carrito
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
                      <p>${ product.price.toFixed(2) } x 3</p>
                      <p>subtotal: $ { product.price * 3} </p>
                    </div>

                  </div>
                ))
              }
            </div>

            {/* Checkout - Resumen de la orden */}
            <div className="rounded-xl shadow-xl p-7">
              <h2 className="text-xl mb-2">Dirección de entrega</h2>
              <div className="mb-10 flex flex-col">
                  <span className="text-lg font-bold">Joel Flores</span>
                  <span>Calle del Silencio # 29 K</span>
                  <span>Col. Centro</span>
                  <span>CP: 98616</span>
                  <span>Guadalupe, Zacatecas</span>
                  <span>492-116-7655</span>
              </div>

              <div className="w-full h-0.5 rounded bg-gray-100 mb-10" />

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
                <p className="mb-3">
                  <span className="text-xs">
                    Al hacer click en "Realizar pedido", aceptas nuestros  
                    <a href="#" className="underline ml-1">términos y condiciones de uso</a> y 
                    <a href="#" className="underline ml-1">nuestras políticas de privacidad</a>
                  </span>
                </p>

                <Link className="flex btn-primary justify-center active:scale-90" 
                      href="/orders/123">
                        Realizar Pedido
                  </Link>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}