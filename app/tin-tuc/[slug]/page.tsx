import OthersNewsSection from '@/components/others-news-section'
import { getNewsBySlug } from '@/services/news'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Chi tiết tin tức',
  description: 'Chi tiết tin tức'
}

async function DetailNews({ params }: { params: Promise<{ slug: string, page: string, pageSize: string }> }) {
  const { slug } = await params

  const res = await getNewsBySlug(slug)
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="content_news" dangerouslySetInnerHTML={{ __html: res.content }} />
      </div>
      <OthersNewsSection slug={slug}  />
    </div>
  )
}

export default DetailNews