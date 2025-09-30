'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon'
import Pagination from '../pagination'
import { ProjectsEntity } from '@/entities/projects'
import { getProjects } from '@/services/projects'

interface OthersProjectsSectionProps {
  slug: string
}

function OthersProjectsSection(props: OthersProjectsSectionProps) {
  const { slug } = props
  const [data, setData] = useState<ProjectsEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 4,
    total: 0
  })

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjects({ page: paging.page, pageSize: paging.pageSize, excludeProjectsSlug: slug })
        setData(res.data)
        setPaging(res.paging)
      } catch (err) {
        console.log((err as Error).message)
      }
    })()
  }, [paging.page, paging.pageSize, slug])

  const onPageChange = (page: number) => {
    setPaging({...paging, page})
  }
  return (
    <div className="container m-auto px-4 mb-4">
      <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-4 text-center">DỰ ÁN NẰM TRONG HỆ SINH THÁI 5EREAL</h2>
      {data.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`grid grid-cols-1 gap-0.5 ${data.length > 1 ? 'md:grid-cols-2' : ''} container mx-auto rounded-2xl overflow-hidden`}>
            {data.map((project) => (
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
                        <Image src="/location.png" alt="location" width={20} height={20} className="w-auto h-auto" />
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
          <Pagination
            totalCount={paging.total}
            onPageChange={onPageChange}
            siblingCount={1}
            currentPage={paging.page}
            pageSize={paging.pageSize}
          />
        </div>
      ) : (
        <p className="text-center">Không có dự án mới</p>
      )}
    </div>
  )
}

export default OthersProjectsSection