'use client'

import { NewsEntity } from '@/entities/news'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Pagination from '../pagination'
import { getNews } from '@/services/news'
import PlayIcon from '@/assets/icons/PlayIcon'
import Link from 'next/link'

interface OthersNewsSectionProps {
  slug: string
}

function OthersNewsSection(props: OthersNewsSectionProps) {
  const { slug } = props
  const [data, setData] = useState<NewsEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 3,
    total: 0
  })

  useEffect(() => {
    (async () => {
      try {
        const res = await getNews({ page: paging.page, pageSize: paging.pageSize, excludeNewsSlug: slug })
        setData(res.news)
        setPaging(res.paging)
      } catch (err) {
        console.log((err as Error).message)
      }
    })()
  }, [paging.page, paging.pageSize, slug])

  const onPageChange = (page: number) => {
    setPaging({ ...paging, page })
  }
  return (
    <div className="max-w-7xl m-auto px-4 mb-4">
      <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-4 text-center">TIN TỨC KHÁC</h2>
      {data.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map(news => (
              <Link href={`/tin-tuc/${news.slug}`} key={news.id} className="flex flex-col group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Image src={news.thumbnail ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnail.url}` : '/example-img-1.jpg'} alt={news.title} width={600} height={400} className="object-cover w-full max-h-[300px]" />
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
          <Pagination
            totalCount={paging.total}
            onPageChange={onPageChange}
            siblingCount={1}
            currentPage={paging.page}
            pageSize={paging.pageSize}
          />
        </div>
      ) : (
        <p className="text-center">Không có dữ liệu</p>
      )}
    </div>
  )
}

export default OthersNewsSection