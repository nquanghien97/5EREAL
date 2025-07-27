import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Công cụ định giá',
  description: 'Công cụ định giá'
}

function page() {
  return (
    <main className="container p-4">
      <h1 className="text-center">Công cụ định giá</h1>
    </main>
  )
}

export default page