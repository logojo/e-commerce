'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import { SliceShowItem } from './SliceShowItem';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';



interface Props {
   images: string[];
   title: string;
   className?: string;
}


export const MobileSliceShow = ({ images, title, className } : Props ) => {
  
  return (
    <div className={className}>
        <Swiper
          style={{
            width: '100vw',
            height: '500px'
          }}
          pagination={true}
          autoplay={{
            delay: 2500
          }}
          modules={[FreeMode, Autoplay, Pagination]}
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
                width={600}
                height={500}
              />
            </SwiperSlide>
            </>
            ))
          }
        </Swiper>
    </div>
  )
}