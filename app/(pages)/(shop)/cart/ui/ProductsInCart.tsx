'use client'

import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"

import { useCartStore } from "@/app/store/cart/cart-store"
import CartDetailsSkeleton from "@/app/components/sckeletons/CartDetailsSkeleton"
import { QuantitySelector } from "@/app/components/product/QuantitySelector"
import {  IoCloseCircleOutline } from "react-icons/io5"

import { useEffect } from "react"


export const ProductsInCart = () => {
  const { hasHydrated, cart, updateQuantity, removeProduct } = useCartStore();

  useEffect(() => {
    if( cart.length === 0 ) {
        redirect('/empty')
    }
  }, [cart])
  

  return (
     <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más items</span>
              <Link href="/" className="underline mb-5">
                Continua comprando
              </Link>

              {
                hasHydrated
                 ?
                  cart.map( (product, index) => (
                    <div key={`${product.slug}-${index}`} className="flex mb-5 fade-in">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.image}`}
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
                       </Link>


                      <div>
                        <Link  href={`/product/${product.slug}`}>
                            <span>{ product.title } </span>
                            <span className="font-semibold text-gray-500 text-sm"> { product.size }</span>
                        </Link>
                        <p> ${ product.price.toFixed(2) }</p>
                        <QuantitySelector quantity={product.quantity} setQuantity={ (value) => updateQuantity(product, value) } />
                        <button onClick={() => removeProduct( product ) } 
                                className="text-red-600 mt-3 active:scale-95 cursor-pointer flex items-center">
                          <IoCloseCircleOutline size={20} />
                          <span className="text-sm">Remover</span>
                        </button>
                      </div>

                    </div>
                  ))
                : <CartDetailsSkeleton />
              }
            </div>
  )
}
