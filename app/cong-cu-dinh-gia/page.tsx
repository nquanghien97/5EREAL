import MapBox from '@/app/cong-cu-dinh-gia/mapbox'
import { GetCoordinates } from '@/services/coordinates/get-coordinates'
import { Metadata } from 'next'
import React from 'react'
import BDSNews from './tin-tuc-bds'
import Valuation from './valuation'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Công cụ định giá',
  description: 'Công cụ định giá'
}

async function CongCuDinhGia() {

  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value
  if (!token) {
    return (
      <main className="py-4 background-linear-yellow">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-2 text-center">CÔNG CỤ TRỢ LÝ TƯ VẤN ĐỊNH GIÁ BDS</h1>
          <div className="w-1/2 m-auto h-1 bg-[#0F3E5A] rounded-md" />
        </div>
        <div className="text-center text-red-500">Vui lòng đăng nhập để sử dụng công cụ định giá.</div>
      </main>
    )
  }
  const res = await GetCoordinates()

  return (
    <main className="py-4 background-linear-yellow">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-2 text-center">CÔNG CỤ TRỢ LÝ TƯ VẤN ĐỊNH GIÁ BDS</h1>
        <div className="w-1/2 m-auto h-1 bg-[#0F3E5A] rounded-md" />
      </div>
      <BDSNews />
      <MapBox initCoordinates={res.data} />
      <Valuation />
    </main>
  )
}

export default CongCuDinhGia