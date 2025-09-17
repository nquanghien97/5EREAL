'use client';

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useRef } from 'react';

const ListFeedbacks = [
  {
    id: 1,
    src: '/business-man.jpg',
    name: 'Aaron Loeb',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm'
  },
  {
    id: 2,
    src: '/business-man.jpg',
    name: 'Aaron Loeb',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm'
  },
  {
    id: 3,
    src: '/business-man.jpg',
    name: 'Aaron Loeb',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm'
  },
  {
    id: 4,
    src: '/business-man.jpg',
    name: 'Aaron Loeb',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm'
  },
  {
    id: 5,
    src: '/business-man.jpg',
    name: 'Aaron Loeb',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm'
  }
]
function DoiNguCoVan() {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative">
      <div className="bg-[url('/bgr-doi-ngu.png')] bg-[length:100%_100%] h-1/2 w-full absolute bottom-0" />
      <div className="container m-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-2 text-center">ĐỘI NGŨ CỐ VẤN</h2>
          <p className="text-[#007AA7] text-xl font-semibold mb-8 text-center">Hơn 40 chuyên gia đầu ngành trong lĩnh vực BĐS</p>
        </div>
        <div className="relative">
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
            aria-label="Previous slide"
          >
            <ArrowLeftIcon className="group-hover:scale-110 transition-transform" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
            aria-label="Next slide"
          >
            <ArrowRightIcon className="group-hover:scale-110 transition-transform" />
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
              delay: 4000,
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
            {ListFeedbacks.map((feedback) => (
              <SwiperSlide key={feedback.id}>
                <div className="relative">
                  <div className="mb-16">
                    <Image src={feedback.src} alt={feedback.name} width={740} height={740} className="rounded-2xl" />
                  </div>
                  <div className="absolute bottom-2 px-4">
                    <div className="mb-2">
                      <p className="text-white font-bold text-2xl">{feedback.name}</p>
                    </div>
                    <div className="flex text-justify font-semibold mb-4 text-[#d29015] italic">
                      <p>{feedback.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default DoiNguCoVan