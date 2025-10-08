import ClockIcon from '@/assets/icons/ClockIcon'
import OthersNewsSection from '@/components/others-news-section'
import { getNewsBySlug } from '@/services/news'
import { formatDate } from '@/utils/formatDate'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Chi tiết tin tức',
  description: 'Chi tiết tin tức'
}

async function DetailNews({ params }: { params: Promise<{ slug: string, page: string, pageSize: string }> }) {
  const { slug } = await params
  if (!slug) return (
    <div>Không tìm thấy tin tức</div>
  )
  const res = await getNewsBySlug(slug)

  return (
    <div>
      <div className="border-b border-[#d29015] mb-2">
        <div className="max-w-7xl m-auto flex gap-2 p-2">
          <div>
            <Link href="/">Trang chủ</Link>
          </div>
          <span>/</span>
          <div>
            <Link href="/tin-tuc">Tin tức</Link>
          </div>
          <span>/</span>
          <div>
            <p>{res.title}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 lg:hidden">
        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + res.thumbnail} alt={res.title} width={1920} height={1080} className="w-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-4 lg:mb-16">
          <div className="flex-1">
            <div className="flex">
              {res.isHotNews && <p className="lg:mb-4 text-[#d29015] rounded-xl uppercase font-semibold">Tin nóng</p>}
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#0F3E5A] mb-4">{res.title}</h2>
            <div className="flex items-center gap-1 text-gray-500 mb-4">
              <ClockIcon width={16} height={16} fill="currentColor" />
              <p className="text-sm">{formatDate(res.createdAt)}</p>
            </div>
            <div className="text-[1.25rem] text-justify" dangerouslySetInnerHTML={{ __html: res.summary }} />
          </div>
          <div className="flex-1 max-lg:hidden">
            <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + res.thumbnail} alt={res.title} width={1920} height={1080} className="w-full" />
          </div>
        </div>
        <div className="max-w-4xl m-auto">
          {res.news_sections.map(section => (
            <section key={section.orderIndex} className="mb-8">
              {section.imageUrl && (
                <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + section.imageUrl} alt={section.caption || ''} width={1920} height={1080} />
              )}
              {section.imageUrl && section.caption && (
                <figcaption className="text-[#19366A] my-2 text-center italic">
                  <p>{section?.caption}</p>
                </figcaption>
              )}
              {section.content && (
                <div className="text-[#19366A] text-justify" dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </section>
          ))}
        </div>
      </div>
      <OthersNewsSection slug={slug} />
    </div>
  )
}

export default DetailNews