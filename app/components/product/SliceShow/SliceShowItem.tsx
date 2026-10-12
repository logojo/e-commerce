'use client'

import Image from 'next/image';

interface Props {
   image: string
   title: string
   width?: number;
   height?: number;
   priority?: boolean;
}


export const SliceShowItem = ({ image, title, width = 300 , height = 300, priority = false, } : Props) => {
  return (
      <Image 
         src={`/products/${image}`}
         alt={title}
         className='md:rounded object-fill '
         width={width}
         height={height}       
         preload={priority}
         loading={priority ? undefined : 'lazy'}
      />
  
  )
}
