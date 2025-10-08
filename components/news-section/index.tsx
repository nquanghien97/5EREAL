import ClockIcon from '@/assets/icons/ClockIcon'
import { NewsEntity } from '@/entities/news'
import { getNewsByPrisma } from '@/services/news'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function NewsSection() {
  const response = await getNewsByPrisma({ page: 1, pageSize: 4 })
  const result = await response.json() as { data: NewsEntity[] }
  if (result.data.length === 0) {
    return <p className="text-center">Không có dữ liệu</p>
  }
  const firstNews = result.data[0]
  const otherNews = result.data.slice(1)

  return (
    <section className="mb-8">
      <div className="max-w-7xl m-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-8 text-center">TIN TỨC</h2>
        </div>
        <div className="flex gap-4 flex-col lg:flex-row lg:max-h-[600px]">
          {firstNews ? (
            <div className="relative lg:w-[55%] py-2">
              <Link href={`/tin-tuc/${firstNews.slug}`}>
                <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${firstNews.thumbnail}`} alt={firstNews.title} width={600} height={400} className="object-cover w-full h-full rounded-lg" />
              </Link>
              <div className="absolute bottom-2 rounded-b-lg left-0 right-0 background-linear-blue p-8">
                <div className="flex items-center gap-1">
                  <ClockIcon width={16} height={16} fill='#d2a932' />
                  <p className="text-[#d2a932] font-semibold">{new Date(firstNews.createdAt).toLocaleDateString()}</p>
                </div>
                <h3 className="text-xl text-white bg-opacity-70 rounded font-bold">{firstNews.title}</h3>
              </div>
            </div>
          ) : (
            <p className="text-center">Không có dữ liệu</p>
          )}
          <div className="lg:w-[45%] flex flex-col">
            {otherNews.map(news => (
              <div className="lg:h-1/3 flex" key={news.id}>
                <div className="flex py-2 w-full gap-4">
                  <Link
                    href={`/tin-tuc/${news.slug}`}
                    className="w-2/5 h-full block"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnail}`}
                      alt={news.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                  <div className="w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                      <ClockIcon width={16} height={16} fill='#d2a932' />
                      <p className="text-[#d2a932] font-semibold">{new Date(firstNews.createdAt).toLocaleDateString()}</p>
                    </div>
                    <h3 className="text-xl text-[#0F3E5A] bg-opacity-70 font-semibold">{news.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsSection