import React from 'react'
import Image from 'next/image'

function DonViThanhVien() {
  return (
    <section className="from-[#fffbf2] to-[#d7a755] mb-8 relative">
      <div className="absolute left-0 right-0 bottom-[15%] z-0 h-1/2">
        <Image src="/khung-don-vi.png" alt="khung-don-vi" fill className="" />
      </div>
      <div className="max-w-7xl m-auto px-4 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-4 text-center">HỆ SINH THÁI</h2>
          <p className="text-[1.25rem] lg:text-[1.75rem] text-[#19366A] mb-8 text-justify">5E REAL là đơn vị phân phối chuyên sâu, trực thuộc hệ sinh thái Reatimes, gồm: Chủ đầu tư Reatimes Holding,Tạp chí điện tử BĐS Việt Nam Reatimes, Viện nghiên cứu BĐS Việt Nam (VIPREC) và Hiệp hội BĐS Việt Nam. Kế thừa sức mạnh từ nghiên cứu - truyền thông - kết nối chính sách, 5E mang đến sản phẩm đúng tầm, dịch vụ đúng tâm, tạo nên trải nghiệm giao dịch chuyên nghiệp và bền vững.</p>
        </div>
        <div className="relative">
          <div className="flex justify-center p-16">
            <Image src="/logo-tron.png" alt="logo-tron" width={600} height={889} className="w-1/2" />
          </div>
          <div className="absolute top-0 left-0 w-1/3 md:w-1/4">
            <Image src="/don-vi-thanh-vien-2.png" alt="don-vi-thanh-vien-2" width={400} height={606} className="w-full" />
          </div>
          <div className="absolute top-0 right-0 w-1/3 md:w-1/4">
            <Image src="/don-vi-thanh-vien-3.png" alt="don-vi-thanh-vien-3" width={400} height={606} className="w-full" />
          </div>
          <div className="absolute bottom-0 left-0 w-1/3 md:w-1/4">
            <Image src="/don-vi-thanh-vien-4.png" alt="don-vi-thanh-vien-4" width={400} height={591} className="w-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 md:w-1/4">
            <Image src="/don-vi-thanh-vien-5.png" alt="don-vi-thanh-vien-5" width={400} height={591} className="w-full" />
          </div>
        </div>
      </div>
      <div className="px-4 w-full lg:w-3/4 m-auto flex justify-center relative">
        <div className="px-16 bg-gradient-to-br from-[#157e9e] to-[#1a4c65] rounded-2xl py-8 w-full flex flex-col items-center border-gradient-yellow">
          <h2 className="text-3xl lg:text-5xl font-[800] text-white mb-4 text-center">ĐỐI TÁC</h2>
          <div className="flex gap-4 justify-center">
            <Image src="/doi-tac-1.png" alt="doi-tac-1" width={300} height={591} className="w-1/4" />
            <Image src="/doi-tac-2.png" alt="doi-tac-2" width={300} height={591} className="w-1/4" />
            <Image src="/doi-tac-3.png" alt="doi-tac-3" width={300} height={591} className="w-1/4" />
            <Image src="/doi-tac-4.png" alt="doi-tac-4" width={300} height={591} className="w-1/4" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonViThanhVien