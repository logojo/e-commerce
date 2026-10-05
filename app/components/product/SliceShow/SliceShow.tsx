'use client'

import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  return (
    <div className={className}>
      <Swiper
       style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          images.map( image => (
          <>
          <SwiperSlide key={ image }>
            <SliceShowItem  
              image={image} 
              title={title}  
              width={1024}
              height={800}
            />
          </SwiperSlide>
          </>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
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

