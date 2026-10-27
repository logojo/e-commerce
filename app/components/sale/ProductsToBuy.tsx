'use client'

import Image from 'next/image';

import CartDetailsSkeleton from '@/app/components/sckeletons/CartDetailsSkeleton';
import { useCartStore } from '@/app/store/cart/cart-store';
import { currencyFormat } from '@/app/utils';

export const ProductsToBuy = () => {
  const { hasHydrated, cart } = useCartStore();

  return (
    <div className="flex flex-col mt-5">
        {
        hasHydrated
            ?
            cart.map( (product, index) => (
            <div key={`${product.slug}-${index}`} className="flex mb-5 fade-in">
            
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
            
            <div>
                <p>{ product.title } { product.size }</p>
                <p>{ currencyFormat( product.price) } x { product.quantity } </p>
                <p>subtotal:  { currencyFormat( product.price * product.quantity ) } </p>
            </div>

            </div>
            ))
        : <CartDetailsSkeleton />
        }
    </div>
  )
}



 