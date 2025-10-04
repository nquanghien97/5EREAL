'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PlayIcon from '@/assets/icons/PlayIcon';

function PhanPhoiBatDongSan({ showDots = true }: { showDots?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      title: "Ký thầu dự án",
      href: '#',
      subtitle: "Định hình toàn bộ chiến lược Marketing và thương mại hóa",
      image: "/linh-vuc-1.png",
      bgColor: "from-slate-800/80 to-slate-600/60",
    },
    {
      id: 2,
      title: "Tổ chức hệ thống bán hàng",
      href: '#',
      subtitle: "Hệ thống phân phối chuyên nghiệp và hiệu quả",
      image: "/linh-vuc-2.jpg",
      bgColor: "from-slate-800/80 to-slate-600/60",
    },
    {
      id: 3,
      title: "Tư vấn & chăm sóc khách hàng",
      href: '#',
      subtitle: "Chương trình đào tạo chuyên sâu về đầu tư bất động sản",
      image: "/linh-vuc-3.jpg",
      bgColor: "from-slate-800/80 to-slate-600/60",
    },
    {
      id: 4,
      title: "Sự kiện và ra hàng",
      href: '#',
      subtitle: "Dịch vụ thiết kế và thi công nội thất cao cấp",
      image: "/linh-vuc-4.jpg",
      bgColor: "from-slate-800/80 to-slate-600/60",
    },
  ]

  const getItemWidth = (index: number) => {
    if (hoveredIndex === null) return "25%" // Default equal width
    if (hoveredIndex === index) return "40%" // Expanded
    return "20%" // Contracted
  }

  return (
    <section className="px-4 mb-8">
      <div className="max-w-7xl mx-auto max-lg:hidden">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center mb-2">PHÂN PHỐI BẤT ĐỘNG SẢN</h2>
          <p className="text-[1.25rem] lg:text-[1.5rem] text-[#19366A] text-center mb-4">5E là đơn vị thầu phân phối chuyên nghiệp, kết nối sản phẩm đúng tầm với nhà đầu tư phù hợp.</p>
        </div>

        {/* Services Gallery */}
        <div className="flex gap-2 h-96 md:h-[500px] overflow-hidden shadow-2xl">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative cursor-pointer overflow-hidden will-change-transform"
              style={{
                width: getItemWidth(index),
                transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                  backgroundImage: `url(${service.image})`,
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />

              {/* Gradient Overlay */}
              <div
                className={`${hoveredIndex === index ? 'h-1/2 bottom-0 right-0 left-0 background-linear-blue' : `inset-0 bg-gradient-to-t ${service.bgColor}`} absolute`}
                style={{
                  opacity: hoveredIndex === index ? 0.8 : 0.9,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="transform will-change-transform">
                  <h3
                    className="font-bold text-white mb-3 will-change-transform text-2xl"
                    style={{
                      transition: "font-size 0.3s ease-in-out",
                    }}
                  >
                    {service.title}
                  </h3>
                  <div className={`h-[2px] bg-[#c3b97c] mb-2 ${hoveredIndex === index ? "w-1/2" : "w-full"}`} />
                  <div
                    className="overflow-hidden will-change-transform"
                    style={{
                      maxHeight: hoveredIndex === index ? "160px" : "0px",
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
                    }}
                  >
                    <p className="text-gray-200 leading-relaxed text-sm mb-3">{service.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Hover Indicator */}
              <div
                className="absolute top-0 left-0 w-full h-1 bg-yellow-500 will-change-transform"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {showDots && (
          <div className="flex justify-center mt-8 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${hoveredIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`View service ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="lg:hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#013d7b] mb-8 text-center">LĨNH VỰC HOẠT ĐỘNG</h2>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden shadow-2xl">
          {services.map((service) => (
            <Link
              href={service.href}
              key={service.id}
              className="relative overflow-hidden will-change-transform"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                // layout="fill"
                width={1920}
                height={1080}
                className="object-cover w-full"
              />

              {/* Content */}
              <div className="z-10 flex flex-col justify-end p-6 md:p-8 background-linear-blue absolute inset-0 top-1/2">
                <div className="transform will-change-transform">
                  <h3
                    className="font-bold text-white mb-3 will-change-transform text-lg lg:text-2xl"
                    style={{
                      transition: "font-size 0.3s ease-in-out",
                    }}
                  >
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#c3b97c] hover:text-white transition-colors duration-200">
                    <span>Xem chi tiết</span>
                    <div className="p-2 bg-white rounded-full flex items-center justify-center text-[#d29015] transition-colors duration-200">
                      <PlayIcon width={24} height={24} fill="currentColor" className="fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhanPhoiBatDongSan