import React from 'react'
import Image from 'next/image'
// import PhanPhoiBatDongSan from '@/components/ui/linh-vuc-hoat-dong/phan-phoi-bat-dong-san'
import NewsSection from '@/components/news-section'
import { Metadata } from 'next'
import { getProjectsByPrisma } from '@/services/projects'
import { ProjectsEntity } from '@/entities/projects'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lĩnh vực hoạt động',
  description: 'Lĩnh vực hoạt động'
}

async function LinhVucHoatDong() {

  const res = await getProjectsByPrisma({ page: 1, pageSize: 4 });
  const response: { data: ProjectsEntity[] } = await res.json()

  return (
    <main className="background-linear-yellow">
      <section className="mb-8">
        <Image src="/banner-ve-chung-toi.png" alt="banner-ve-chung-toi" width={1831} height={916} className="w-full max-h-[600px] object-cover" />
      </section>

      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center">DỰ ÁN</h2>
          <p className="text-[#007AA7] lg:text-xl text-center mb-4">5E tham gia từ sớm cùng chủ đầu tư để định hình chiến lược thương mại và truyền thông cho dự án.</p>
          <div className="mb-16 px-4 mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              {response.data.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Background Image with Overlay */}
                  <div className="">
                    <Link href={`/du-an/${project.slug}`}>
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + project.thumbnailUrl}
                        alt={project.name}
                        width={600}
                        height={400}
                        className="w-full object-cover rounded-t-2xl"
                        loading="lazy"
                      />
                    </Link>
                    <div className="w-full p-4 flex flex-col items-center gap-2 justify-between">
                      <h3 className="text-xl font-semibold text-[#0F3E5A] leading-tight">{project.name}</h3>
                      <div className="line-clamp-2 text-[#d2a932] text-center" dangerouslySetInnerHTML={{ __html: `${project.content} ...` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <PhanPhoiBatDongSan showDots={false} /> */}

      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center">ĐÀO TẠO ĐẦU TƯ & GIAO DỊCH BĐS</h2>
          <p className="text-[#007AA7] lg:text-xl text-center mb-4">Xây dựng cộng đồng nhà đầu tư hiểu biết, minh bạch và thực chiến. Cấp chứng chỉ chính quy với các lớp học môi giới.</p>
          <div>
            <Image src="/17.jpg" alt="17" width={1792} height={1200} className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 lg:flex-row flex-col">
            <div className="flex flex-col gap-2 flex-1 lg:hidden">
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center">Thiết kế và thi công căn hộ</h2>
                <p className="text-[#007AA7] text-center mb-4">Tối ưu hóa công năng và giá trị thương mại sau mua.</p>
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
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] text-center">Thiết kế và thi công căn hộ</h2>
                <p className="text-[#007AA7] text-center mb-4">Tối ưu hóa công năng và giá trị thương mại sau mua.</p>
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