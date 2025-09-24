import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          THIẾT KẾ VÀ THI CÔNG CĂN HỘ
        </h1>
        <p className="mt-3 text-slate-600">
          Dịch vụ thiết kế và thi công nội thất cao cấp
        </p>
      </div>

      {/* First image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/cong-cu-1.jpg"
          alt="Thiết kế căn hộ"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      {/* Text content */}
      <div className="space-y-4 text-slate-700">
        <p>
          Chúng tôi cung cấp dịch vụ thiết kế và thi công nội thất căn hộ theo phong cách hiện đại,
          sang trọng và tiện nghi. Mỗi dự án đều được nghiên cứu kỹ lưỡng để tối ưu không gian sống
          và thể hiện cá tính riêng của gia chủ.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Tư vấn phong cách và bố trí không gian</li>
          <li>Lựa chọn vật liệu cao cấp và bền vững</li>
          <li>Thi công trọn gói với đội ngũ chuyên nghiệp</li>
          <li>Bảo hành &amp; hỗ trợ sau bàn giao</li>
        </ul>
      </div>

      {/* Second image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/cong-cu-3.jpg"
          alt="Thi công nội thất"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      <div className="space-y-4 text-slate-700">
        <p>
          Mỗi căn hộ được chúng tôi hoàn thiện không chỉ đáp ứng nhu cầu công năng, mà còn mang đến
          sự thoải mái và thẩm mỹ lâu dài cho gia đình bạn.
        </p>
        <p>
          Với quy trình khép kín từ thiết kế đến thi công, chúng tôi cam kết mang lại chất lượng vượt
          trội, đúng tiến độ và tối ưu chi phí cho khách hàng.
        </p>
      </div>
    </section>

  )
}

export default page