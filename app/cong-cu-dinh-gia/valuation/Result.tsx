import React from 'react'
import { Results } from './type'
import AlertCircleIcon from '@/assets/icons/AlertCircleIcon'
import Building2Icon from '@/assets/icons/Building2Icon'
import CheckCircle from '@/assets/icons/CheckCircle'
import MapPinIcon from '@/assets/icons/MapPinIcon'
import RulerIcon from '@/assets/icons/RulerIcon'
import TrendingUp from '@/assets/icons/TrendingUp'
import FileTextIcon from '@/assets/icons/FileTextIcon'

function Result({ data }: { data: Results }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 rounded-xl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 text-balance">Báo Cáo Đánh Giá Bất Động Sản</h1>
          <p className="text-lg text-gray-600">Phân tích chi tiết thị trường bất động sản {data.propertyDetails.location}</p>
        </div>

        {/* Property Details */}
        <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Building2Icon className="h-6 w-6" />
              Thông Tin Bất Động Sản
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2Icon className="h-4 w-4" />
                  Loại hình
                </div>
                <p className="font-semibold text-gray-900">{data.propertyDetails.propertyType}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4" />
                  Vị trí
                </div>
                <p className="font-semibold text-gray-900">{data.propertyDetails.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <RulerIcon className="h-4 w-4" />
                  Diện tích
                </div>
                <p className="font-semibold text-gray-900">
                  {data.propertyDetails.propertySize.min} - {data.propertyDetails.propertySize.max} m²
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  Giao dịch
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {data.propertyDetails.transactionType}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Giá Thị Trường</h3>
              <p className="text-2xl font-bold text-green-700">
                {data.propertyDetails.marketPrice.min} - {data.propertyDetails.marketPrice.max}{" "}
                {data.propertyDetails.marketPrice.unit}
              </p>
            </div>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Advantages */}
          <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <CheckCircle className="h-6 w-6" />
                Ưu Điểm
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {data.evaluation.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disadvantages */}
          <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <AlertCircleIcon className="h-6 w-6" />
                Nhược Điểm
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {data.evaluation.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex">
                      <AlertCircleIcon className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <FileTextIcon className="h-6 w-6" />
              Kết Luận Đánh Giá
            </h2>
          </div>
          <div className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-800 leading-relaxed text-lg">{data.evaluation.evaluationConclusion}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Báo cáo được tạo tự động • Cập nhật: {new Date().toLocaleDateString("vi-VN")}</p>
        </div>
      </div>
    </div>
  )
}

export default Result