import React from 'react'

function Valuation() {
  return (
    <div className="container m-auto mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F3E5A] text-center uppercase">Định giá Bất Động Sản</h2>
      <div>
        <p className="text-center text-[#0F3E5A] text-lg mb-4">Sử dụng công cụ dưới đây để định giá bất động sản của bạn.</p>
        <form>
          <div className="flex gap-2">
            <input type="text" placeholder="Nhập địa chỉ bất động sản" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
          <input type="text" placeholder="Nhập diện tích bất động sản (m2)" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
          <input type="text" placeholder="Nhập giá bất động sản (VNĐ)" className="border border-gray-300 p-2 rounded-md w-full outline-0" />
          </div>
          <button type="submit" className="bg-[#0F3E5A] text-white p-2 rounded-md mt-4">Định giá</button>
        </form>
      </div>
    </div>
  )
}

export default Valuation