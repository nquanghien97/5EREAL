import React from 'react'
import Link from 'next/link'
import NewsSection from '@/components/news-section'
import Image from 'next/image'
import { Metadata } from 'next'
import { getProjectsByPrisma } from '@/services/projects'
import { ProjectsEntity } from '@/entities/projects'
import ProjectsSection from '@/components/projects-section'
import Banner from '@/components/Banner'

export const metadata: Metadata = {
  title: 'Dự án',
  description: 'Tổng quan dự án'
}

async function DuAn() {
  const res = await getProjectsByPrisma({ page: 1, pageSize: 4 })
  const response: { data: ProjectsEntity[] } = await res.json()
  const firstProject = response.data[0]
  const secondProject = response.data[1]
  // const othersProjects = response.data.slice(2)
  return (
    <main>
      <Banner
        bannerImage="/banner-du-an.png"
        title="DỰ ÁN"
        description={["Tâm điểm mới phía Nam Hà Nội", "Kết nối giao thương - Đón đầu thịnh vượng"]}
        style='secondary'
      />

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          {firstProject && (
            <div className="flex items-center flex-col lg:flex-row gap-8 mb-16">
              <div className="w-full lg:w-3/5 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-3/4 bg-gradient-to-l from-[#155a84] to-[#104565]">
                  <p className="bg-text-yellow lgtext-xl font-bold text-center">Tên pháp lý: {firstProject.name}</p>
                </div>
                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + firstProject.thumbnailUrl} alt={firstProject.name} width={600} height={400} className="w-full object-cover rounded-2xl mb-4" />
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
                    <p className="font-bold text-lg whitespace-nowrap">Chủ đầu tư:</p>
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
              <div className="w-full lg:w-3/5 lg:hidden relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-3/4 bg-gradient-to-l from-[#155a84] to-[#104565]">
                  <p className="bg-text-yellow lg:text-xl font-bold text-center">Tên pháp lý: {secondProject.name}</p>
                </div>
                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + secondProject.thumbnailUrl} alt={secondProject.name} width={600} height={400} className="w-full object-cover rounded-2xl mb-4" />
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
                    <p className="font-bold text-lg whitespace-nowrap">Chủ đầu tư:</p>
                    <p>{secondProject.investor}</p>
                  </li>
                  <button className="py-2 px-8 bg-gradient-to-r from-[#feedbf] to-[#c29551] rounded-full font-bold cursor-pointer hover:opacity-80 duration-300">
                    <Link href={`/du-an/${secondProject.slug}`}>Xem thêm</Link>
                  </button>
                </ul>
              </div>
              <div className="w-full lg:w-3/5 max-lg:hidden relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-3/4 bg-gradient-to-l from-[#155a84] to-[#104565]">
                  <p className="bg-text-yellow lg:text-xl font-bold text-center">Tên pháp lý: {secondProject.name}</p>
                </div>
                <Image src="/du-an-3.png" alt="du-an-3" width={600} height={400} className="w-full object-cover rounded-2xl mb-4" />
              </div>
            </div>
          )}
        </div>
      </section>

      <ProjectsSection
        response={response}
        description="Công ty CP Đầu tư và Dịch vụ BĐS 5E REAL là đơn vị phân phối bất động sản chuyên sâu, trực thuộc hệ sinh thái Reatimes Holding – nơi quy tụ sức mạnh toàn diện từ truyền thông, nghiên cứu đến kết nối chính sách. Với lợi thế từ Tạp chí Reatimes, Viện Nghiên cứu BĐS Việt Nam, và sự bảo trợ chuyên môn từ Hiệp hội BĐS Việt Nam, 5E không chỉ mang đến sản phẩm “đúng tầm” mà còn kiến tạo trải nghiệm giao dịch “đúng tâm”, minh bạch, hiệu quả và chuyên nghiệp."
      />

      <NewsSection />
    </main>
  )
}

export default DuAn