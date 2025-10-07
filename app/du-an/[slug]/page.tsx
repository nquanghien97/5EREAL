import { getProjectsBySlug } from '@/services/projects'
import React from 'react'
import Image from 'next/image'
import NewsSection from '@/components/news-section'
// import OthersProjectsSection from '@/components/other-projects-section'
import Slider from './Slider'

async function DetailProject({ params }: { params: Promise<{ slug: string, page: string, pageSize: string }> }) {
  const { slug } = await params
  if (!slug) return (
    <div>Không tìm thấy dự án</div>
  )
  const project = await getProjectsBySlug(slug)
  const dataProjectSection = project.project_sections.filter(item => item.type === 'NORMAL')

  // dataTienIch
  const dataTienIch = project.project_sections.find(section => section.type === 'TIEN_ICH');
  const imagesTienIch = project.project_images.filter(image => image.type === 'TIEN_ICH');
  const dataTienIchWithImages = {
    ...dataTienIch,
    images: imagesTienIch
  };

  // dataThuVienHinhAnh
  const dataThuVienHinhAnh = project.project_sections.find(section => section.type === 'TIEN_ICH');
  const imagesThuVienHinhAnh = project.project_images.filter(image => image.type === 'TIEN_ICH');
  const dataThuVienHinhAnhWithImages = {
    ...dataThuVienHinhAnh,
    images: imagesThuVienHinhAnh
  };

  return (
    <div className="background-linear-yellow">
      <div className="">
        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + project.thumbnailUrl} alt="banner-du-an" width={1831} height={916} className="w-full max-h-[600px] object-cover" />
      </div>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center mb-2">TỔNG QUAN DỰ ÁN</h2>
          <p className="text-[#0F3E5A] text-center font-bold text-lg mb-4">Tên pháp lý: {project.fullName}</p>
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
        </div>
      </section>

      {dataProjectSection.map(section => (
        <div key={section.id} className="flex max-w-7xl m-auto px-4 mb-8 gap-4">
          {section.orderIndex % 2 !== 0 && (
            <div className="text-[#19366A] text-[1.25rem] flex-1" dangerouslySetInnerHTML={{ __html: section.content }} />
          )}
          <div className="flex-1">
            <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + section.imageUrl} alt="image_section" width={1920} height={1080} className="rounded-xl" />
          </div>
          {section.orderIndex % 2 === 0 && (
            <div className="text-[#19366A] text-[1.25rem] flex-1" dangerouslySetInnerHTML={{ __html: section.content }} />
          )}
        </div>
      ))}

      <section className="max-w-7xl m-auto px-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center mb-2">TIỆN ÍCH</h2>
        <p className="text-center text-[#19366A] text-[1.25rem] mb-4">{dataTienIchWithImages.description}</p>
        <div className="grid grid-cols-3">
          {dataTienIchWithImages.images.map((image, index) => (
            <div key={index} className="h-[280px] w-full">
              <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + image.imageUrl} alt="image" width={1920} height={1080} className="border !h-full !w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl m-auto px-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center mb-2">THƯ VIỆN HÌNH ẢNH</h2>
        <p className="text-center text-[#19366A] text-[1.25rem] mb-4">{dataThuVienHinhAnhWithImages.description}</p>
        <Slider listImages={dataThuVienHinhAnhWithImages.images} />
      </section>

      {/* <OthersProjectsSection slug={slug} /> */}

      <NewsSection />
    </div>
  )
}

export default DetailProject