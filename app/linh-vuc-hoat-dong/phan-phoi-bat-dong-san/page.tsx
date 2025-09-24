import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          PHÂN PHỐI BẤT ĐỘNG SẢN
        </h1>
        <p className="mt-3 text-slate-600">
          Hệ thống phân phối chuyên nghiệp và hiệu quả
        </p>
      </div>

      {/* First image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/cong-cu-4.jpg"
          alt="Hệ thống phân phối"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      {/* Text content */}
      <div className="space-y-4 text-slate-700">
        <p>
          Với hệ thống phân phối rộng khắp và chuyên nghiệp, chúng tôi đảm bảo mỗi dự án bất động sản
          được tiếp cận đúng khách hàng mục tiêu, tối ưu hiệu quả bán hàng và gia tăng giá trị thương hiệu.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Đội ngũ kinh doanh giàu kinh nghiệm</li>
          <li>Chiến lược tiếp thị & bán hàng hiệu quả</li>
          <li>Mạng lưới phân phối đa kênh toàn diện</li>
          <li>Chính sách hỗ trợ và chăm sóc khách hàng chuyên nghiệp</li>
        </ul>
      </div>

      {/* Second image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/du-an-3.png"
          alt="Kênh phân phối"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      <div className="space-y-4 text-slate-700">
        <p>
          Chúng tôi triển khai hệ thống quản lý bán hàng minh bạch, hiện đại và hiệu quả, đảm bảo tiến độ
          cũng như mục tiêu kinh doanh của từng dự án.
        </p>
        <p>
          Sứ mệnh của chúng tôi là mang đến cho khách hàng cơ hội tiếp cận những sản phẩm bất động sản chất
          lượng, đồng thời giúp chủ đầu tư tối ưu hóa doanh thu và phát triển bền vững.
        </p>
      </div>
    </section>

  )
}

export default page