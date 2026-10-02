'use client'

import Image from "next/image"
import { Product } from "@/app/interfaces"
import Link from "next/link"
import { useState } from "react"

interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState( product.images[0] )
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${ product.slug }`}>
        <Image  
            alt={product.title}
            src={`/products/${displayImage}`}
            className="w-full object-cover rounded-md shadow-sm"
            width={500}
            height={500}
            loading="eager"
            onMouseEnter={() => setDisplayImage( product.images[1])}
            onMouseLeave={() => setDisplayImage( product.images[0])}
        />
      </Link>
        <div className="p-4 flex flex-col">
            <Link href={`/product/${ product.slug }`} className="hover:text-red-800">
                { product.title }
            </Link>
            <span className="font-bold">$ { product.price.toFixed(2) }</span>
        </div>
    </div>
  )
}


