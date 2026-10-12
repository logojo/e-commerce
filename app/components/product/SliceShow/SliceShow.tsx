'use client'

import React, { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { SliceShowItem } from './SliceShowItem';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

interface Props {
   images: string[];
   title: string;
   className?: string;
}

export const SliceShow = ({ images, title, className } : Props ) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType|null>();

   const validThumbsSwiper =
    thumbsSwiper && !thumbsSwiper.destroyed
      ? thumbsSwiper
      : null;

  return (
    <div className={className}>
    
      <Swiper
      key={images.join('|')}
      style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: validThumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {
          images.map( (image, index) => (
          <>
          <SwiperSlide key={ image }>
            <SliceShowItem  
              image={image} 
              title={title}  
              width={1024}
              height={800}
              priority={index === 0}
            />
          </SwiperSlide>
          </>
          ))
        }
      </Swiper>
      
      <Swiper
        key={`thumbs-${images.join('|')}`}
        onSwiper={setThumbsSwiper}
        onBeforeDestroy={( swiper ) => {
          setThumbsSwiper( (current) => current === swiper ? null : current )
        }}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper cursor-pointer"
      >
        {
          images.map( image => (
          <>
          <SwiperSlide key={ image }>
            <SliceShowItem  image={image} title={title}  />
          </SwiperSlide>
          </>
          ))
        }
      </Swiper>
        
    </div>
  )
}

