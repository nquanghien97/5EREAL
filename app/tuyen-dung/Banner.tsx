'use client'

import Image from 'next/image';
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PlayIcon from '@/assets/icons/PlayIcon';

function Banner() {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="m-auto w-full mb-16 relative">
      <button
        ref={prevRef}
        className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
        aria-label="Previous slide"
      >
        <PlayIcon className="rotate-180 group-hover:scale-110 transition-transform fill-current" />
      </button>

      <button
        ref={nextRef}
        className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
        aria-label="Next slide"
      >
        <PlayIcon className="group-hover:scale-110 transition-transform fill-current" />
      </button>
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        <SwiperSlide>
          <div className="reletive">
            <Image src="/banner-du-an.png" alt="banner-du-an" width={1831} height={916} className="w-full max-h-[300px] lg:max-h-[600px] object-cover" />
            <div className="absolute inset-0 lg:top-1/2 background-linear-blue" />
            {/* <div className={`absolute lg:left-[10%] bottom-[10%] text-white`}>
              <div>
                {<h2 className="text-2xl text-center lg:text-4xl font-bold pb-2">TUYỂN DỤNG</h2>}
              </div>
              <div className="flex items-center gap-2">
                <div className="max-lg:hidden w-1/2 h-[4px] bg-white" />
                <p className="text-sm lg:text-xl max-w-lg max-lg:text-center px-2">Tham gia cùng chúng tôi</p>
              </div>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image src="/banner-ve-chung-toi.png" alt="banner-ve-chung-toi" width={1920} height={400} className="w-full max-h-[300px] lg:max-h-[600px]" />
            <div className="absolute inset-0 lg:top-1/2 background-linear-blue" />
            {/* <div className={`absolute lg:left-[10%] bottom-[10%] text-white`}>
              <div>
                {<h2 className="text-2xl text-center lg:text-4xl font-bold pb-2">TUYỂN DỤNG</h2>}
              </div>
              <div className="flex items-center gap-2">
                <div className="max-lg:hidden w-1/2 h-[4px] bg-white" />
                <p className="text-sm lg:text-xl max-w-lg max-lg:text-center px-2">Tham gia cùng chúng tôi</p>
              </div>
            </div> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Banner