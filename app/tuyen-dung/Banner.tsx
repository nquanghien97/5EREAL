'use client'

import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

function Banner() {

  return (
    <section className="m-auto w-full mb-16">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Image src="/banner-du-an.png" alt="banner-du-an" width={1831} height={916} className="w-full max-h-[600px] object-cover" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <Image src="/banner-03.jpg" alt="banner-nho-02-2048x841" width={1920} height={400} className="w-full h-full" />
        </SwiperSlide> */}
      </Swiper>
    </section>
  )
}

export default Banner