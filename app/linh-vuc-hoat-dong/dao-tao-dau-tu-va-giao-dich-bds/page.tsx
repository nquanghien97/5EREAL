import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          ĐÀO TẠO ĐẦU TƯ &amp; GIAO DỊCH BĐS
        </h1>
        <p className="mt-3 text-slate-600">
          Chương trình đào tạo chuyên sâu về đầu tư bất động sản
        </p>
      </div>

      {/* First image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/linh-vuc-1.png"
          alt="Đào tạo bất động sản"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      {/* Text content */}
      <div className="space-y-4 text-slate-700">
        <p>
          Chúng tôi xây dựng chương trình đào tạo chuyên sâu giúp học viên nắm vững kiến thức, kỹ năng
          và chiến lược trong lĩnh vực đầu tư &amp; giao dịch bất động sản. Nội dung đào tạo được thiết kế
          bài bản, kết hợp lý thuyết và thực tiễn.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Kiến thức nền tảng về thị trường bất động sản</li>
          <li>Phân tích và đánh giá tiềm năng dự án</li>
          <li>Chiến lược đầu tư và quản lý rủi ro</li>
          <li>Kỹ năng giao dịch và đàm phán hiệu quả</li>
        </ul>
      </div>

      {/* Second image */}
      <figure className="rounded-xl overflow-hidden bg-slate-50">
        <Image
          src="/linh-vuc-2.jpg"
          alt="Khóa học đầu tư"
          className="w-full object-cover"
          width={1920}
          height={1080}
        />
      </figure>

      <div className="space-y-4 text-slate-700">
        <p>
          Các buổi học được dẫn dắt bởi chuyên gia giàu kinh nghiệm, mang đến góc nhìn thực tế và giải pháp
          phù hợp cho từng tình huống cụ thể trong đầu tư bất động sản.
        </p>
        <p>
          Mục tiêu của chúng tôi là giúp học viên tự tin hơn trong việc ra quyết định, gia tăng cơ hội thành
          công và xây dựng sự nghiệp bền vững trong ngành bất động sản.
        </p>
      </div>
    </section>

  )
}

export default page