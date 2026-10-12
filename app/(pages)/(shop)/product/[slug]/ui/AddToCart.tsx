'use client'

import { useState } from 'react';

import { QuantitySelector } from '@/app/components/product/QuantitySelector'
import { SizeSelector } from '@/app/components/product/SizeSelector'
import { useCartStore } from '@/app/store/cart/cart-store';

import type { Product, ValidSizes } from '@/app/interfaces'

interface Props {
    product: Product;
}

const AddToCart = ({ product } : Props ) => {
  const [size, setSize] = useState<ValidSizes|undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const { addProduct } = useCartStore();

  const onAddToCart = () => {
        setPosted( true );
        if(!size) return;

        addProduct({
            id: product.id,
            slug:  product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size,
            image: product.images[0],
        });
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        
  }

  return (
    <>
       {/* Selector de tallas */}
        <SizeSelector 
          sizes={product.sizes} 
          selectedSize={size} 
          setSize={setSize} 
        />
        {
          (!size && posted) && (
              <div className="text-xs text-red-600 fade-in">Debe seleccionar una talla</div>
          )
        }

        {/* Selector de cantidad */}
        <QuantitySelector  
            quantity={ quantity }
            setQuantity={ setQuantity }
         />

        <button 
          onClick={onAddToCart}
          className="btn-primary my-5 cursor-pointer active:scale-90">
          Agregar al carrito
        </button>
    </>
  )
}

export default AddToCart
