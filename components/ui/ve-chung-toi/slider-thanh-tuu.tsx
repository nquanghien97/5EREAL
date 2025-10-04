'use client';

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import PlayIcon from '@/assets/icons/PlayIcon';
import { Autoplay, Navigation } from 'swiper/modules';

const ListThanhTuu = [
  {
    id: 1,
    src: '/thanh-tuu-1.png',
    name: '2020 - Giải vàng BĐS',
  },
  {
    id: 2,
    src: '/thanh-tuu-2.png',
    name: '2020 - Giải vàng BĐS',
  },
  {
    id: 3,
    src: '/thanh-tuu-3.png',
    name: '2020 - Giải vàng BĐS',
  },
  {
    id: 4,
    src: '/thanh-tuu-4.png',
    name: '2020 - Giải vàng BĐS',
  },
  {
    id: 5,
    src: '/thanh-tuu-5.png',
    name: '2020 - Giải vàng BĐS',
  }
]

function SliderThanhTuu() {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <section className="relative mb-8 lg:hidden">
        <div className="bg-[url('/bgr-doi-ngu.png')] bg-[length:100%_100%] h-1/2 w-full absolute bottom-0" />
        <div className="max-w-7xl m-auto px-4">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-4 text-center">THÀNH TỰU</h2>
          <div className="relative">
            <button
              ref={prevRef}
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
              aria-label="Previous slide"
            >
              <PlayIcon className="rotate-180 group-hover:scale-110 transition-transform fill-current" />
            </button>

            <button
              ref={nextRef}
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
              aria-label="Next slide"
            >
              <PlayIcon className="group-hover:scale-110 transition-transform fill-current" />
            </button>
            <Swiper
              slidesPerView={1}
              loop={true}
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
            >
              {ListThanhTuu.map((thanhtuu) => (
                <>
                  <SwiperSlide key={thanhtuu.id}>
                    <div
                      className="relative cursor-pointer py-4"
                    >
                      <div className="mb-2 flex justify-center">
                        <Image src={thanhtuu.src} alt={thanhtuu.name} width={740} height={740} className="rounded-2xl h-[300px] w-auto" />
                      </div>
                      <div className="px-4">
                          <p className="text-white font-bold text-2xl text-center">{thanhtuu.name}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}

export default SliderThanhTuu