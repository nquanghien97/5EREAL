import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Chi tiết tin tức',
  description: 'Chi tiết tin tức'
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="text-center py-4">chi tiết tin tức {slug}</div>
  )
}

export default page