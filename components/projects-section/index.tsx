import React from 'react'
import Image from 'next/image'
import { ProjectsEntity } from '@/entities/projects'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon'

function ProjectsSection({ response }: { response: { data: ProjectsEntity[] } }) {
  return (
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
  )
}

export default ProjectsSection