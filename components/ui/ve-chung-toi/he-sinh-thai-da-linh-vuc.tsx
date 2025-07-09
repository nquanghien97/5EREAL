import Image from 'next/image'
import React from 'react'

function HeSinhThaiDaLinhVuc() {
  return (
    <section className="bg-[#fef7e5] py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F3E5A] mb-4 text-center">HỆ SINH THÁI ĐA LĨNH VỰC</h2>
      <div className="container m-auto px-4 mb-8">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4 max-lg:mb-4 relative">
            <Image src="/ve-chung-toi-4.png" alt="ve-chung-toi" width={600} height={400} className="w-full" />
            <div className="absolute top-0 left-0 w-1/3 md:w-1/3">
              <Image src="/don-vi-thanh-vien-2.png" alt="don-vi-thanh-vien-2" width={400} height={606} className="w-full" />
            </div>
            <div className="absolute top-0 right-0 w-1/3 md:w-1/3">
              <Image src="/don-vi-thanh-vien-3.png" alt="don-vi-thanh-vien-3" width={400} height={606} className="w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-1/3 md:w-1/3">
              <Image src="/don-vi-thanh-vien-4.png" alt="don-vi-thanh-vien-4" width={400} height={591} className="w-full" />
            </div>
            <div className="absolute bottom-0 right-0 w-1/3 md:w-1/3">
              <Image src="/don-vi-thanh-vien-5.png" alt="don-vi-thanh-vien-5" width={400} height={591} className="w-full" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:p-16 flex items-center">
            <p className="text-justify text-[#007AA7] text-lg">5E REAL là đơn vị phân phối chuyên sâu, trực thuộc hệ sinh thái Reatimes, gồm: Chủ đầu tư Reatimes Holding, Tạp chí điện tử BĐS Việt Nam Reatimes, Viện Nghiên cứu BĐS Việt Nam (VIPREC) và Hiệp hội BĐS Việt Nam. Kế thừa sức mạnh từ nghiên cứu – truyền thông – kết nối chính sách, 5E mang đến sản phẩm đúng tầm, dịch vụ đúng tâm, tạo nên trải nghiệm giao dịch chuyên nghiệp và bền vững.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeSinhThaiDaLinhVuc