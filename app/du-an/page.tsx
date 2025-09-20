import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NewsSection from '@/components/news-section'
import { Metadata } from 'next'
import { getProjectsByPrisma } from '@/services/projects'
import { ProjectsEntity } from '@/entities/projects'
import ProjectsSection from '@/components/projects-section'

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
        <Image src="/banner-du-an.png" alt="banner-du-an" width={1831} height={916} className="w-full max-h-[600px] object-cover" />
      </section>

      <section>
        <div className="container mx-auto px-4 py-8">
          {/* firt project */}
          {firstProject && (
            <div className="flex items-center flex-col lg:flex-row gap-8 mb-8">
              <div className="w-full lg:w-3/5">
                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + firstProject.thumbnailUrl} alt={firstProject.name} width={600} height={400} className="w-full object-cover rounded-2xl" />
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
                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + secondProject.thumbnailUrl} alt={secondProject.name} width={600} height={400} className="w-full object-cover rounded-2xl" />
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

      <ProjectsSection response={response} />

      <NewsSection />
    </main>
  )
}

export default DuAn