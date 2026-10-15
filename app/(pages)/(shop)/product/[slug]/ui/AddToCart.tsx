'use client'

import { useRef, useState } from 'react';

import { QuantitySelector } from '@/app/components/product/QuantitySelector'
import { SizeSelector } from '@/app/components/product/SizeSelector'
import { useCartStore } from '@/app/store/cart/cart-store';

import type { Product, ValidSizes } from '@/app/interfaces'
import { FlyingIcon } from '@/app/components/ui/FlyingIcon';


type Flight = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

interface Props {
    product: Product;
}

const AddToCart = ({ product } : Props ) => {
  const buttonRef  = useRef<HTMLButtonElement>(null);
  const [flight, setFlight] = useState<Flight |null>(null);

  const [size, setSize] = useState<ValidSizes|undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const { addProduct } = useCartStore();

  const animate = () => {
    const button = buttonRef .current;

    if (!button ) return;

    const from = button.getBoundingClientRect();
    

    setFlight({
      startX: from.left + from.width / 2,
      startY: from.top + from.height / 2,
      endX:   window.innerWidth - 100,
      endY:   1,
    });

  };

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
        animate()
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
          ref={buttonRef}
          onClick={onAddToCart}
          className="btn-primary my-5 cursor-pointer active:scale-90">
          Agregar al carrito
        </button>

        {flight && (
        <FlyingIcon
          {...flight}
          onComplete={() => setFlight(null)}
          image={ product.images[0] }
        />
      )}
    </>
  )
}

export default AddToCart
