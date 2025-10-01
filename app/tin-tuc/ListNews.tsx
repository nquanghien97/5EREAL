'use client'

import Pagination from '@/components/pagination'
import React from 'react'
import Image from 'next/image'
import { NewsEntity } from '@/entities/news'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon'
import { useRouter } from 'next/navigation'

interface ListNewsProps {
  data: NewsEntity[]
  currentPage: number
  total: number
}

function ListNews(props: ListNewsProps) {
  const { data, currentPage, total } = props
  const router = useRouter()
  return (
    <section className="mb-4">
      <div className="max-w-7xl m-auto px-4 mb-4">
        {data.length > 0 ? (
          <div className="flex gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map(news => (
                <div key={news.id} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnailUrl}`} alt={news.title} width={600} height={400} className="object-cover w-full" />
                  <div className="bg-[#0F3E5A] p-4">
                    <p className="text-white text-xl">{news.title}</p>
                    <Link href={`tin-tuc/${news.slug}`} className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors group-hover:translate-x-1 transform duration-200">
                      <span className="mr-2">Xem chi tiết</span>
                      <ArrowRightIcon className="w-2 h-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">Không có dữ liệu</p>
        )}
      </div>
      <Pagination
        totalCount={total}
        onPageChange={(page) => {
          router.push(`/tin-tuc?page=${page}`)
        }}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={6}
      />
    </section>

  )
}

export default ListNews