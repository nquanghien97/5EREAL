import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon'
import NewsSection from '@/components/news-section'
import { Metadata } from 'next'
import { getProjectsByPrisma } from '@/services/projects'
import { ProjectsEntity } from '@/entities/projects'

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Tổng quan dự án'
}

async function DuAn() {
  const res = await getProjectsByPrisma({ page: 1, pageSize: 4 })
  const response: { data: ProjectsEntity[] } = await res.json()
  const firstProject = response.data[0]
  const secondProject = response.data[1]
  return (
    <main>
      <section className="">
        <Image src="/banner-du-an.png" alt="banner-du-an" width={1831} height={916} className="w-full" />
      </section>

      <section>
        <div className="container mx-auto px-4 py-8">
          {/* firt project */}
          {firstProject && (
            <div className="flex items-center flex-col lg:flex-row gap-8 mb-8">
              <div className="w-full lg:w-3/5">
                <Image src="/du-an-3.png" alt="du-an-3" width={600} height={400} className="w-full object-cover rounded-2xl" />
              </div>
              <div className="w-full lg:w-2/5">
                <ul className="text-[#003c7a]">
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Vị trí:</p>
                    <p>{firstProject.location}</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Tổng diện tích:</p>
                    <p>{firstProject.totalArea} m²</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Mật độ xây dựng:</p>
                    <p>{firstProject.constructionRate}%</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Tầng cao công trình:</p>
                    <p>{firstProject.floorHeightMin}-{firstProject.floorHeightMax} tầng</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Loại hình:</p>
                    <p>{firstProject.type}</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Sản phẩm:</p>
                    <p>{firstProject.numberOfUnits} căn</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Chủ đầu tư:</p>
                    <p>{firstProject.investor}</p>
                  </li>
                  <button className="py-2 px-8 bg-gradient-to-r from-[#feedbf] to-[#c29551] rounded-full font-bold cursor-pointer hover:opacity-80 duration-300">
                    <Link href={`/du-an/${firstProject.slug}`}>Xem thêm</Link>
                  </button>
                </ul>
              </div>
            </div>
          )}
          {secondProject && (
            <div className="flex items-center flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/5 lg:hidden">
                <Image src="/du-an-3.png" alt="du-an-3" width={600} height={400} className="w-full object-cover rounded-2xl" />
              </div>
              <div className="w-full lg:w-2/5">
                <ul className="text-[#003c7a]">
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Vị trí:</p>
                    <p>{secondProject.location}</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Tổng diện tích:</p>
                    <p>{secondProject.totalArea} m²</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Mật độ xây dựng:</p>
                    <p>{secondProject.constructionRate}%</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Tầng cao công trình:</p>
                    <p>{secondProject.floorHeightMin}-{secondProject.floorHeightMax} tầng</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Loại hình:</p>
                    <p>{secondProject.type}</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Sản phẩm:</p>
                    <p>{secondProject.numberOfUnits} căn</p>
                  </li>
                  <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
                    <p className="font-bold text-lg">Chủ đầu tư:</p>
                    <p>{secondProject.investor}</p>
                  </li>
                </ul>
                <button className="py-2 px-8 bg-gradient-to-r from-[#feedbf] to-[#c29551] rounded-full font-bold cursor-pointer hover:opacity-80 duration-300">
                  <Link href={`/du-an/${secondProject.slug}`}>Xem thêm</Link>
                </button>
              </div>
              <div className="w-full lg:w-3/5 max-lg:hidden">
                <Image src="/du-an-3.png" alt="du-an-3" width={600} height={400} className="w-full object-cover rounded-2xl mb-4" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row mb-4 ">
            <div className="flex flex-col justify-end">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F3E5A] mb-12 text-center">DỰ ÁN</h2>
              <Image src="/du-an-1.png" alt="du-an-1" width={1306} height={637} className="h-2/3" />
            </div>
            <Image src="/du-an-2.png" alt="du-an-2" width={1309} height={1025} />
          </div>
          <p className="text-xl text-[#007AA7] text-justify lg:text-center mb-6 px-4 lg:px-16">
            5E lựa chọn đồng hành cùng những dự án mang &quot;hơi thở phát triển&quot; - nơi hạ tầng đang vươn mình, dòng tiền đang đổ về và giá trị sống, giá trị đầu tư cùng bừng sáng theo từng bước chuyển mình của đô thị.
          </p>
          <div className={`grid grid-cols-1 ${response.data.length > 1 ? 'md:grid-cols-2' : ''} container mx-auto rounded-2xl overflow-hidden`}>
            {response.data.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden shadow-lg hover:shadow-xl"
              >
                {/* Background Image with Overlay */}
                <div className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${project.thumbnailUrl}`}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  {/* Content */}
                  <div className="absolute background-linear-black bottom-0 left-0 w-full z-20 p-8 flex flex-col justify-between">
                    {/* Number Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-6xl font-bold text-white/90 leading-none">{project.name}</div>
                    </div>

                    {/* Title and CTA */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Image src="/location.png" alt="location" width={20} height={20} />
                        <p className="text-xl font-semibold text-white leading-tight">{project.location}</p>
                      </div>
                      <button className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Link href={`/du-an/${project.slug}`} className="flex items-center">
                          <span className="mr-2 text-xl">Xem chi tiết</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsSection />
    </main>
  )
}

export default DuAn