'use client'

import DollarSign from '@/assets/icons/DollarSign';
import LoadingIcon from '@/assets/icons/LoadingIcon';
import MapPin from '@/assets/icons/MapPinIcon';
import TrendingUp from '@/assets/icons/TrendingUp';
import { GetTinTucBDS } from '@/services/tin-tuc-bds';
// import Link from 'next/link';
import React, { useState } from 'react'

interface ResponseData {
  title: string;
  url: string;
  price_range: string;
  location: string;
  highlights: string[];
}

function BDSNews() {

  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await GetTinTucBDS({ userMessage: inputValue });
      setResponseData(response.results);
    } catch (err) {
      console.log((err as Error).message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl m-auto mb-8 scroll-mt-[68px]" id="tin-tuc-bds">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F3E5A] mb-4 text-center uppercase">Xem tổng quan giá BĐS quanh khu vực</h2>
      <div className="flex gap-4 mb-4">
        <div>
          {/* <label htmlFor="news" className="mr-4">Nhập vị trí BDS bạn muốn xem giá:</label> */}
          <input id='news' placeholder='Nhập vị trí BDS bạn muốn xem giá' className="bg-white border border-gray-300 p-2 rounded-md min-w-[320px]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
        <button disabled={loading} onClick={onSubmit} className={loading ? 'bg-[#0F3E5A] cursor-not-allowed text-[#ccc] p-2 rounded-md' : 'bg-[#1a445c] text-white p-2 rounded-md cursor-pointer hover:bg-blue-500 duration-300 flex items-center'}>
          {loading ? <div className="flex items-center"><span>Tiến trình có thể mất một vài phút, vui lòng chờ</span><LoadingIcon size='small' color='white' /></div> : 'Xem tổng quan giá'}
        </button>
      </div>
      <div>
        {responseData.length > 0 && (
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Tin Tức Bất Động Sản</h1>
            <p className="text-gray-600 text-lg">Cập nhật thông tin mới nhất về thị trường bất động sản</p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl">
          {responseData.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold leading-tight mb-3">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {news.title}
                  </a>
                </h2>

                <div className="flex flex-wrap gap-4 mb-4">
                  {news.location && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{news.location}</span>
                    </div>
                  )}

                  {news.price_range && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium">{news.price_range}</span>
                    </div>
                  )}
                </div>

                {news.highlights.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                      <TrendingUp className="h-4 w-4" />
                      Điểm nổi bật:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {news.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BDSNews