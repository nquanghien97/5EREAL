import React from 'react'
import Image from 'next/image'
import PhanPhoiBatDongSan from '@/components/ui/linh-vuc-hoat-dong/phan-phoi-bat-dong-san'
import NewsSection from '@/components/news-section'
import { Metadata } from 'next'
import { getProjectsByPrisma } from '@/services/projects'
import { ProjectsEntity } from '@/entities/projects'
import Link from 'next/link'
import Banner from '@/components/Banner'

export const metadata: Metadata = {
  title: 'Lĩnh vực hoạt động',
  description: 'Lĩnh vực hoạt động'
}

async function LinhVucHoatDong() {

  const res = await getProjectsByPrisma({ page: 1, pageSize: 4 });
  const response: { data: ProjectsEntity[] } = await res.json()

  return (
    <main className="background-linear-yellow">
      <Banner
        bannerImage="/banner-ve-chung-toi.png"
        title="LĨNH VỰC HOẠT ĐỘNG"
        description="Cung cấp giải pháp toàn diện trong phát triển và thương mại hóa bất động sản"
        style='secondary'
      />

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center max-lg:mb-2">DỰ ÁN</h2>
          <p className="text-[1.25rem] lg:text-[1.5rem] text-[#19366A] text-center mb-4">5E tham gia từ sớm cùng chủ đầu tư để định hình chiến lược thương mại và truyền thông cho dự án.</p>
          <div className="mb-16 px-4 mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              {response.data.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gradient-yellow"
                >
                  {/* Background Image with Overlay */}
                  <div className="">
                    <Link href={`/du-an/${project.slug}`}>
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + project.thumbnail.url}
                        alt={project.name}
                        width={600}
                        height={400}
                        className="w-full object-cover rounded-t-2xl"
                        loading="lazy"
                      />
                    </Link>
                    <div className="w-full p-4 flex flex-col items-center gap-2 justify-between">
                      <h3 className="text-xl font-semibold text-[#0F3E5A] leading-tight">{project.name}</h3>
                      {/* <div className="line-clamp-2 text-[#d2a932] text-center" dangerouslySetInnerHTML={{ __html: `${project.content} ...` }} /> */}
                      <p className="line-clamp-2 text-[#d2a932] text-center">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PhanPhoiBatDongSan showDots={false} />

      <section className="mb-16">
        <div>
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-4 text-center">ĐÀO TẠO ĐẦU TƯ & GIAO DỊCH BĐS</h2>
          <p className="text-[1.25rem] px-4 lg:text-[1.5rem] text-[#19366A] mb-4 text-center">Xây dựng cộng đồng nhà đầu tư hiểu biết, minh bạch và thực chiến. Cấp chứng chỉ chính quy với các lớp học môi giới.</p>
          <div className="bg-[url('/nen@3x.png')] bg-[length:100%_100%] bg-no-repeat py-8">
            <div className=" max-w-7xl mx-auto px-4">
              <div className="relative">
                <Image src="/17.jpg" alt="17" width={1792} height={1200} className="w-full" />
                <div className="transform will-change-transform p-6 background-linear-blue absolute bottom-0 left-0 right-0">
                  <h3 className="font-bold text-white mb-2 will-change-transform text-2xl">Lớp học thực chiến</h3>
                  <p className="text-gray-200 leading-relaxed mb-3 max-lg:hidden font-semibold">Cung cấp dữ liệu chính xác, mô hình hóa tài chính, phân tích tiềm năng đầu tư.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative">
                  <Image src="/linh-vuc-2.jpg" alt="17" width={1792} height={1200} className="w-full" />
                  <div className="transform will-change-transform p-6 background-linear-blue absolute bottom-0 left-0 right-0">
                    <h3 className="font-bold text-white mb-2 will-change-transform text-2xl">Hội thảo chuyên đề</h3>
                    <p className="text-gray-200 leading-relaxed mb-3 max-lg:hidden font-semibold">Phân tích xu hướng, hành vi, cung - cầu và báo cáo chuyên sâu</p>
                  </div>
                </div>
                <div className="relative">
                  <Image src="/linh-vuc-3.jpg" alt="17" width={1792} height={1200} className="w-full" />
                  <div className="transform will-change-transform p-6 background-linear-blue absolute bottom-0 left-0 right-0">
                    <h3 className="font-bold text-white mb-2 will-change-transform text-2xl">Công cụ hỗ trợ</h3>
                    <p className="text-gray-200 leading-relaxed mb-3 max-lg:hidden font-semibold">Đồng hành cùng chủ đầu tư từ quy hoạch-pháp lý-định vị-triển khai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="flex gap-4 lg:flex-row flex-col">
            <div className="flex flex-col gap-2 flex-1 lg:hidden">
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center mb-4 uppercase">Thiết kế và thi công căn hộ</h2>
                <p className="text-[1.25rem] px-4 lg:text-[1.5rem] text-[#19366A] mb-4 text-center">Tối ưu hóa công năng và giá trị thương mại sau mua.</p>
              </div>
              <Image src="/cong-cu-4.jpg" alt="cong-cu-4" width={600} height={400} className="rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-2/3">
                <Image src="/cong-cu-1.jpg" alt="cong-cu-1" width={600} height={400} className="rounded-2xl w-full h-full object-cover" />
              </div>
              <div className="h-1/3">
                <Image src="/cong-cu-2.jpg" alt="cong-cu-2" width={600} height={400} className="rounded-2xl w-full h-full object-cover" />
              </div>
            </div>
            <div className="h-full flex-1">
              <Image src="/TMB 2.jpg" alt="TMB 2" width={600} height={400} className="rounded-2xl w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 flex-1 max-lg:hidden">
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center mb-4">Thiết kế và thi công căn hộ</h2>
                <p className="text-[#19366A] text-[1.25rem] text-center mb-4">Tối ưu hóa công năng và giá trị thương mại sau mua.</p>
              </div>
              <Image src="/cong-cu-4.jpg" alt="cong-cu-4" width={600} height={400} className="rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <NewsSection />
    </main>
  )
}

export default LinhVucHoatDong