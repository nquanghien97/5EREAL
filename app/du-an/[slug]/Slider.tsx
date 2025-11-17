'use client';

import React from 'react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { ProjectsImagesEntity } from '@/entities/projects'

function Slider({ listImages }: { listImages?: ProjectsImagesEntity[] }) {
  if (listImages?.length === 0 || !listImages) return;
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      initialSlide={1}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {listImages.map(image => (
        <SwiperSlide key={image.id}>
          <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + image.image.url} alt="image_hinh_anh" width={1920} height={1080} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider