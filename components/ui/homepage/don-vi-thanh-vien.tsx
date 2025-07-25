import React from 'react'
import Image from 'next/image'

function DonViThanhVien() {
  return (
    <section className="bg-gradient-to-br from-[#fffbf2] to-[#d7a755] py-8">
      <div className="container m-auto px-4 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F3E5A] mb-2 text-center">ĐƠN VỊ THÀNH VIÊN</h2>
          <p className="text-[#007AA7] text-xl mb-8 text-justify lg:text-center">5E REAL là đơn vị phân phối chuyên sâu, trực thuộc hệ sinh thái Reatimes, gồm: Chủ đầu tư Reatimes Holding,Tạp chí điện tử BĐS Việt Nam Reatimes, Viện nghiên cứu BĐS Việt Nam (VIPREC) và Hiệp hội BĐS Việt Nam. Kế thừa sức mạnh từ nghiên cứu - truyền thông - kết nối chính sách, 5E mang đến sản phẩm đúng tầm, dịch vụ đúng tâm, tạo nên trải nghiệm giao dịch chuyên nghiệp và bền vững.</p>
        </div>
        <div className="relative">
          <div className="flex justify-center p-16">
            <Image src="/don-vi-thanh-vien-1.png" alt="don-vi-thanh-vien-1" width={600} height={889} className="w-1/2" />
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
      <div className="px-4 w-full lg:w-3/4 m-auto flex justify-center">
        <div className="px-16 bg-gradient-to-br from-[#157e9e] to-[#1a4c65] rounded-2xl py-8 w-full flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 text-center">ĐỐI TÁC</h2>
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