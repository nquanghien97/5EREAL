import React from 'react'

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="text-center py-4">chi tiết tin tức {slug}</div>
  )
}

export default page