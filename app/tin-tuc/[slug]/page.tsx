import OthersNewsSection from '@/components/others-news-section'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Chi tiết tin tức',
  description: 'Chi tiết tin tức'
}

async function DetailNews({ params }: { params: Promise<{ slug: string, page: string, pageSize: string }> }) {
  const { slug } = await params
  return (
    <div>
      <div className="text-center py-4">chi tiết tin tức {slug}</div>
      <OthersNewsSection slug={slug}  />
    </div>
  )
}

export default DetailNews