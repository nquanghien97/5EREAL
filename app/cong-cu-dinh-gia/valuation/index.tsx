'use client'

import { DinhGiaBDS } from '@/services/dinh-gia-bds'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Vui lòng nhập tên')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
  area: yup
    .number()
    .required('Vui lòng nhập diện tích'),
  price: yup
    .number()
    .required('Vui lòng nhập giá')
})

interface FormData {
  name: string
  area: number
  price: number
}

function Valuation() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [data, setData] = React.useState<any>(null)

  const onSubmit = async (data: FormData) => {
    try {
      const res = await DinhGiaBDS(data)
      setData(res.results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container m-auto mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F3E5A] text-center uppercase">Định giá Bất Động Sản</h2>
      <div>
        <p className="text-center text-[#0F3E5A] text-lg mb-4">Sử dụng công cụ dưới đây để định giá bất động sản của bạn.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <div>
              <input type="text" {...register("name")} placeholder="Nhập địa chỉ bất động sản" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <input type="text" {...register("area")} placeholder="Nhập diện tích bất động sản (m2)" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.area && <p className="text-red-500">{errors.area.message}</p>}
            </div>
            <div>
              <input type="text" {...register("price")} placeholder="Nhập giá bất động sản (VNĐ)" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
          </div>
          <button type="submit" className="bg-[#0F3E5A] text-white p-2 rounded-md mt-4">Định giá</button>
        </form>
      </div>
      {data && (
        <div>
          <div>
            <p>Thông tin Bất Động Sản:</p>
            <div>
              <p>Loại: {data.propertyDetails.propertyType}</p>
              <p>Vị trí: {data.propertyDetails.location}</p>
              <p>Giá: {data.propertyDetails.marketPrice.min} - {data.propertyDetails.marketPrice.max} {data.propertyDetails.marketPrice.unit}</p>
            </div>
          </div>
          <div>
            <p>Đánh giá:</p>
            <div>
              <p>Ưu điểm:</p>
              <ul>
                {data.evaluation.advantages.map((item: string, index: number) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>Nhược điểm:</p>
              <ul>
                {data.evaluation.disadvantages.map((item: string, index: number) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Valuation