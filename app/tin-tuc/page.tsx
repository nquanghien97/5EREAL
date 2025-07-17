import React from 'react'
import Image from 'next/image'
import { getFirstNews, getNews } from '@/services/news'
import { NewsEntity } from '@/entities/news'
import ListNews from './ListNews'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function TinTuc({ searchParams }: { searchParams: Promise<{ page: string, pageSize: string }> }) {
  const { page = 1, pageSize = 6 } = await searchParams
  const response: { data: NewsEntity[], paging: { page: number, pageSize: number, total: number} } = await getNews({ page: Number(page), pageSize: Number(pageSize) })
  const responseFirstNews: { data: NewsEntity[] } = await getFirstNews()
  const firstNews = responseFirstNews.data[0]
  const otherNews = response.data.slice(1)
  console.log(response)
  return (
    <main>
      <section className="mb-8">
        <Image src="/banner-ve-chung-toi.png" alt="banner-ve-chung-toi" width={1831} height={916} className="w-full" />
      </section>

      <section>
        {firstNews ? (
          <div className="container m-auto px-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:h-[400px] mb-4">
            <div className="lg:w-1/2">
              <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${firstNews.thumbnailUrl}`} alt={firstNews.title} width={600} height={400} className="object-cover w-full h-full rounded-lg" />
            </div>
            <div className="lg:w-1/2 h-full flex flex-col">
              <h2 className="text-[#0F3E5A] font-bold text-xl mb-2">{firstNews.title}</h2>
              <p className="text-[#d2a932] font-bold mb-2">{new Date(firstNews.createdAt).toLocaleDateString()}</p>
              <div dangerouslySetInnerHTML={{ __html: firstNews.content }} className="line-clamp-5 text-[#007AA7] flex-1 h-full mb-4" />
              <div>
                <Link href={`tin-tuc/${firstNews.slug}`} className="inline-flex py-2 px-8 text-[#007AA7] bg-gradient-to-r from-[#feedbf] to-[#c29551] rounded-full font-semibold cursor-pointer hover:opacity-80 duration-300">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <p className="text-center">Không có dữ liệu</p>
        )}
      </section>
    
      <ListNews data={otherNews} currentPage={Number(page)} total={Number(response.paging.total)} />
    </main>
  )
}

export default TinTuc