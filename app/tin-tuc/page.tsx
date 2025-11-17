import React from 'react'
import Image from 'next/image'
import { getNews } from '@/services/news'
import { NewsEntity } from '@/entities/news'
import ListNews from './ListNews'
import Link from 'next/link'
import { Metadata } from 'next'
import Banner from '@/components/Banner'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Danh sách tin tức'
}

async function TinTuc({ searchParams }: { searchParams: Promise<{ page: string, pageSize: string }> }) {
  const { page = 1, pageSize = 20 } = await searchParams
  const response: { news: NewsEntity[], paging: { page: number, pageSize: number, total: number } } = await getNews({ page: Number(page), pageSize: Number(pageSize) })
  // const responseFirstNews: { data: NewsEntity[] } = await getFirstNews()
  // if (response.data.length === 0) {
  //   return <p className="text-center">Không có dữ liệu</p>
  // }
  // const firstNews = responseFirstNews.data[0]
  let lastThreeNews: NewsEntity[] = []
  if (response.news.length >= 3) {
    lastThreeNews = response.news.splice(-3)
  } else {
    lastThreeNews = []
  }

  return (
    <main>
      <Banner
        bannerImage='/banner-ve-chung-toi.png'
        title='TIN TỨC'
        description='Cập nhật tin tức, sự kiện nổi bật về thị trường bất động sản'
        style='secondary'
      />

      <section className="mb-8">
        <div className="max-w-7xl m-auto px-4">
          {response.news.length > 0 ?
            (
              response.news.map(news => (
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:h-[320px] mb-4" key={news.id}>
                  <div className="lg:w-2/5">
                    <Image src={news.thumbnail ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnail.url}` : '/example-img-1.jpg'} alt={news.title} width={600} height={400} className="object-cover w-full h-full max-h-[280px]" />
                  </div>
                  <div className="lg:w-3/5 h-full flex flex-col">
                    <h2 className="text-[#0F3E5A] font-bold text-xl mb-2">{news.title}</h2>
                    <p className="text-[#d2a932] font-bold mb-2">{new Date(news.createdAt).toLocaleDateString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: news.summary }} className="clamp-html line-clamp-4 text-[#19366A] mb-4" />
                    <div>
                      <Link href={`tin-tuc/${news.slug}`} className="inline-flex py-2 px-8 text-[#007AA7] bg-gradient-to-r from-[#feedbf] to-[#c29551] rounded-full font-semibold cursor-pointer hover:opacity-80 duration-300">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Không có dữ liệu</p>
            )}
        </div>
      </section>

      <ListNews data={lastThreeNews} currentPage={Number(page)} total={Number(response.paging.total)} />
    </main>
  )
}

export default TinTuc