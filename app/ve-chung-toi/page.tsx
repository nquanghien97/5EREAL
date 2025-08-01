import React from 'react'
import Image from 'next/image'
import GiaTriCotLoi from '@/components/ui/ve-chung-toi/gia-tri-cot-loi'
import ThanhTuu from '@/components/ui/ve-chung-toi/thanh-tuu'
import HeSinhThaiDaLinhVuc from '@/components/ui/ve-chung-toi/he-sinh-thai-da-linh-vuc'
import NewsSection from '@/components/news-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Giới thiệu'
}

function page() {
  return (
    <main>
      <section className="">
        <Image src="/banner-ve-chung-toi.png" alt="banner-ve-chung-toi" width={1831} height={916} className="w-full" />
      </section>

      <section className="bg-[#fef7e5] pt-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center flex-col lg:flex-row gap-4">
            <Image src="/ve-chung-toi-1.png" alt="ve-chung-toi" width={600} height={400} className="lg:w-1/2 object-cover rounded-t-2xl" />
            <div className="lg:w-1/2 py-4 lg:px-16">
              <p className="text-xl text-justify leading-8 text-[#007AA7]">Công ty CP Đầu tư và Dịch vụ BĐS 5E REAL là đơn vị phân phối bất động sản chuyên sâu, trực thuộc hệ sinh thái Reatimes Holding – nơi quy tụ sức mạnh toàn diện từ truyền thông, nghiên cứu đến kết nối chính sách. Với lợi thế từ Tạp chí Reatimes, Viện Nghiên cứu BĐS Việt Nam, và sự bảo trợ chuyên môn từ Hiệp hội BĐS Việt Nam, 5E không chỉ mang đến sản phẩm “đúng tầm” mà còn kiến tạo trải nghiệm giao dịch “đúng tâm”, minh bạch, hiệu quả và chuyên nghiệp.</p>
            </div>
          </div>
        </div>
        <div>
          <Image src="/ve-chung-toi-2.png" alt="ve-chung-toi" width={600} height={400} className="w-full object-cover rounded-b-2xl mt-4" />
        </div>
      </section>

      <section className="bg-[#fef7e5] py-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-2 flex-col lg:flex-row mb-4">
            <div className="lg:hidden flex flex-col justify-center">
              <h3 className="uppercase font-bold text-3xl lg:text-5xl mb-2 text-[#0F3E5A] text-center">TẦM NHÌN</h3>
              <p className="text-justify text-[#007AA7] text-lg">5E REAL cam kết kết nối những sản phẩm bất động sản đúng tầm với những khách hàng và nhà đầu tư đúng nhu cầu, thông qua hệ thống phân phối chuyên sâu, tư vấn chuẩn mực và nền tảng dữ liệu minh bạch – hướng đến việc chuyên nghiệp hóa thị trường và lan tỏa giá trị phát triển bền vững.</p>
            </div>
            <div className="lg:w-1/2 rounded-2xl p-4 relative mb-4">
              <Image src="/ve-chung-toi-3.jpg" alt="ve-chung-toi" width={600} height={400} className="object-cover rounded-2xl w-full relative z-10" />
              <div className="absolute w-3/4 h-3/4 bottom-[-0.25rem] right-[-0.25rem] bg-gradient-to-r from-[#f8d794] to-[#d2a155] opacity-50 z-[1] rounded-2xl"></div>
            </div>
            <div className="w-1/2 p-8 flex flex-col justify-center max-lg:hidden">
              <h3 className="uppercase font-bold text-3xl lg:text-5xl mb-2 text-[#0F3E5A]">TẦM NHÌN</h3>
              <p className="text-justify text-[#007AA7] text-lg">5E REAL cam kết kết nối những sản phẩm bất động sản đúng tầm với những khách hàng và nhà đầu tư đúng nhu cầu, thông qua hệ thống phân phối chuyên sâu, tư vấn chuẩn mực và nền tảng dữ liệu minh bạch – hướng đến việc chuyên nghiệp hóa thị trường và lan tỏa giá trị phát triển bền vững.</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="lg:w-1/2 lg:p-8 flex flex-col justify-center">
              <h3 className="uppercase font-bold text-3xl lg:text-5xl mb-2 text-center lg:text-end text-[#0F3E5A]"> SỨ MỆNH</h3>
              <p className="text-justify text-[#007AA7] text-lg">Trở thành đơn vị phân phối – tư vấn – đồng hành chiến lược hàng đầu trong lĩnh vực bất động sản tại Việt Nam, tiên phong ứng dụng công nghệ – dữ liệu – chuyên môn để nâng tầm trải nghiệm và hiệu quả cho cả người mua lẫn chủ đầu tư.</p>
            </div>
            <div className="lg:w-1/2 rounded-2xl p-4 relative">
              <Image src="/ve-chung-toi-3.jpg" alt="ve-chung-toi" width={600} height={400} className="object-cover rounded-2xl w-full relative z-10" />
              <div className="absolute w-3/4 h-3/4 bottom-[-0.25rem] right-[-0.25rem] bg-gradient-to-r from-[#f8d794] to-[#d2a155] opacity-50 z-[1] rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <GiaTriCotLoi />
      <ThanhTuu />
      <HeSinhThaiDaLinhVuc />

      <section className="bg-[#fef7e5] py-8">
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

      <NewsSection />
    </main>
  )
}

export default page