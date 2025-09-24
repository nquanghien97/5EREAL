import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">ĐẦU TƯ VÀ PHÁT TRIỂN DỰ ÁN</h1>
        <p className="mt-3 text-slate-600">Định hình toàn bộ chiến lược Marketing và thương mại hóa</p>
      </div>


      {/* First image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/17.jpg"
          alt="Banner"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>


      {/* Text content */}
      <div className="space-y-4 text-slate-700">
        <p>
          Chúng tôi đồng hành cùng đối tác trong toàn bộ tiến trình thương mại hóa dự án – từ ý tưởng
          ban đầu đến khi chính thức đi vào vận hành. Mỗi chiến lược được xây dựng đều hướng đến hiệu
          quả, bền vững và gia tăng giá trị lâu dài.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Nghiên cứu & phân tích thị trường</li>
          <li>Xây dựng chiến lược Marketing toàn diện</li>
          <li>Thương mại hóa & kế hoạch bán hàng</li>
          <li>Giải pháp đồng bộ từ thiết kế đến vận hành</li>
        </ul>
      </div>


      {/* Second image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/cong-cu-2.jpg"
          alt="Chiến lược"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      <div className="space-y-4 text-slate-700">
        <p>
          Mỗi dự án được triển khai theo một lộ trình rõ ràng, bao gồm các giai đoạn nghiên cứu, phát
          triển sản phẩm, truyền thông và thương mại hóa. Mỗi bước đi đều được tối ưu để đạt hiệu quả
          cao nhất.
        </p>
        <p>
          Chúng tôi cam kết mang đến cho khách hàng và đối tác giải pháp toàn diện, vừa đảm bảo mục
          tiêu kinh doanh, vừa tạo dựng giá trị lâu dài cho cộng đồng và thị trường.
        </p>
      </div>
    </section>
  )
}

export default page