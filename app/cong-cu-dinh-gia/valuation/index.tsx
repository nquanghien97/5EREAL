'use client'

import { DinhGiaBDS } from '@/services/dinh-gia-bds'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Results } from './type'
import Result from './Result'
import LoadingIcon from '@/assets/icons/LoadingIcon'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Vui lòng nhập tên bất động sản')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được vượt quá 100 ký tự'),
  area: yup
    .string()
    .required('Vui lòng nhập diện tích bất động sản'),
  price: yup
    .string()
    .required('Vui lòng nhập giá bất động sản')
})

interface FormData {
  name: string
  area: string
  price: string
}

function Valuation() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [data, setData] = React.useState<Results | null>(null)
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const res = await DinhGiaBDS(data)
      setData(res.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container m-auto mb-8 scroll-mt-[68px]" id="dinh-gia-bds">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F3E5A] text-center uppercase">Định giá Bất Động Sản</h2>
      <div className="mb-4">
        <p className="text-center text-[#0F3E5A] text-lg mb-4">Sử dụng công cụ dưới đây để định giá bất động sản của bạn.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="mb-1 text-[#0F3E5A]">Địa chỉ Bất Động Sản</p>
              <input type="text" {...register("name")} placeholder="Nhập địa chỉ bất động sản" className="bg-white border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex-1">
              <p className="mb-1 text-[#0F3E5A]">Diện tích Bất Động Sản</p>
              <input type="text" {...register("area")} placeholder="Nhập diện tích bất động sản (m2)" className="bg-white border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.area && <p className="text-red-500">{errors.area.message}</p>}
            </div>
            <div className="flex-1">
              <p className="mb-1 text-[#0F3E5A]">Giá Bất Động Sản</p>
              <input type="text" {...register("price")} placeholder="Nhập giá bất động sản (VNĐ)" className="bg-white border border-gray-300 p-2 rounded-md w-full outline-0" />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
          </div>
          <button disabled={loading} type="submit" className={`${loading ? 'bg-[#0F3E5A] text-white py-2 px-8 cursor-not-allowed rounded-md mt-4' : 'bg-[#0F3E5A] text-white py-2 px-8 cursor-pointer hover:opacity-75 duration-300 rounded-md mt-4'}`}>
            {loading ? <LoadingIcon size='small' color='white' /> : 'Định giá'}
          </button>
        </form>
      </div>
      {data && (
        <Result data={data} />
      )}
    </div>
  )
}

export default Valuation