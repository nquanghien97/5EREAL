import MapBox from '@/components/mapbox'
import { GetCoordinates } from '@/services/coordinates/get-coordinates'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Công cụ định giá',
  description: 'Công cụ định giá'
}

async function CongCuDinhGia() {

  const res = await GetCoordinates()

  return (
    <main className="py-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F3E5A] mb-4 text-center">CÔNG CỤ TRỢ LÝ TƯ VẤN ĐỊNH GIÁ BDS</h1>
      <MapBox initCoordinates={res.data} />
      <div className="container m-auto p-4">

      </div>
    </main>
  )
}

export default CongCuDinhGia