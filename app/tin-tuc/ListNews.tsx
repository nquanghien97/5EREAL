'use client'

import Pagination from '@/components/pagination'
import React from 'react'
import Image from 'next/image'
import { NewsEntity } from '@/entities/news'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PlayIcon from '@/assets/icons/PlayIcon'

interface ListNewsProps {
  data: NewsEntity[]
  currentPage: number
  total: number
}

function ListNews(props: ListNewsProps) {
  const { data, currentPage, total } = props
  const router = useRouter()
  return (
    data.length > 0 ? (
      <section className="mb-4">
        <h2 className="text-3xl md:text-4xl font-[800] mb-4 text-center uppercase">Tin tức khác</h2>
        <div className="max-w-7xl m-auto px-4 mb-4">
          <div className="flex gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map(news => (
                <Link href={`tin-tuc/${news.slug}`} key={news.id} className="group relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <Image src={news.thumbnail ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnail?.url}` : '/example-img-1.jpg'} alt={news.title} width={600} height={400} className="object-cover w-full h-[320px]" />
                  <div className="bg-[#0F3E5A] h-full p-4">
                    <p className="text-white text-xl">{news.title}</p>
                    <div className="flex items-center space-x-2 text-[#d29015] hover:text-white transition-colors duration-200">
                      <span className="mr-2">Xem chi tiết</span>
                      <div className="flex items-center cursor-pointer p-2 rounded-full bg-white group-text-[#d29015] group-hover:bg-[#d29015] group-hover:text-white transition-colors">
                        <PlayIcon width={16} height={16} fill="currentColor" className="fill-current" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
    ) : null
  )
}

export default ListNews