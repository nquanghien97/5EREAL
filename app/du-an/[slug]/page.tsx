import { getProjectsBySlug } from '@/services/projects'
import React from 'react'
import Image from 'next/image'
import NewsSection from '@/components/news-section'
import OthersProjectsSection from '@/components/other-projects-section'

async function DetailProject({ params }: { params: Promise<{ slug: string, page: string, pageSize: string }> }) {
  const { slug } = await params
  if(!slug) return (
    <div>Không tìm thấy dự án</div>
  )
  const project = await getProjectsBySlug(slug)
  return (
    <div className="background-linear-yellow">
      <div className="">
        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + project.thumbnailUrl} alt="banner-du-an" width={1831} height={916} className="w-full max-h-[600px] object-cover" />
      </div>
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center mb-2">TỔNG QUAN DỰ ÁN</h2>
          <p className="text-[#0F3E5A] text-center font-bold text-lg mb-4">Tên pháp lý: {project.name}</p>
          <ul className="text-[#003c7a] mb-4 grid grid-cols-2">
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Vị trí:</p>
              <p>{project.location}</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Tổng diện tích:</p>
              <p>{project.totalArea} m²</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Mật độ xây dựng:</p>
              <p>{project.constructionRate}%</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Tầng cao công trình:</p>
              <p>{project.floorHeightMin}-{project.floorHeightMax} tầng</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Loại hình:</p>
              <p>{project.type}</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Sản phẩm:</p>
              <p>{project.numberOfUnits} căn</p>
            </li>
            <li className="mb-4 lg:mb-2 max-lg:flex max-lg:items-center gap-2">
              <p className="font-bold text-lg">Chủ đầu tư:</p>
              <p>{project.investor}</p>
            </li>
          </ul>
          <div>
            <div className="content_projects text-[#003c7a]" dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </div>
      </section>

      <OthersProjectsSection slug={slug} />

      <NewsSection />
    </div>
  )
}

export default DetailProject