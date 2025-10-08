'use client';

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import Detail from './Detail';
import PlayIcon from '@/assets/icons/PlayIcon';

type Employment = {
  id: number;
  src: string;
  name: string;
  description: string;
  details: string;
  phoneNumber?: string;
  email?: string;
}

const ListEmployments: Employment[] = [
  {
    id: 1,
    src: '/lehuyhoang.png',
    name: 'Lê Huy Hoàng',
    description: 'Chuyên gia bất động sản 15 năm kinh nghiệm',
    details: 'Lê Huy Hoàng đã có hơn 15 năm gắn bó trong lĩnh vực bất động sản, từng quản lý nhiều dự án lớn tại các thành phố trọng điểm. Anh chuyên về định giá tài sản, tư vấn đầu tư và xây dựng danh mục bất động sản tối ưu cho các khách hàng cá nhân cũng như doanh nghiệp. Với kinh nghiệm dày dạn, anh luôn đưa ra các giải pháp an toàn và bền vững.',
    phoneNumber: '0123 456 789',
    email: 'lehuyhoang@example.com'
  },
  {
    id: 2,
    src: '/nguyendinhdung.png',
    name: 'Nguyễn Đình Dũng',
    description: 'Kiến trúc sư nội thất cao cấp',
    details: 'Nguyễn Đình Dũng là kiến trúc sư nội thất với hơn 12 năm kinh nghiệm thiết kế căn hộ, biệt thự và không gian thương mại. Cô đặc biệt chú trọng đến sự cân bằng giữa công năng và thẩm mỹ, mang đến cho khách hàng những không gian sống hiện đại, tiện nghi và sang trọng. Các dự án của cô luôn được đánh giá cao về sự tinh tế trong từng chi tiết.',
    phoneNumber: '0987 654 321',
    email: 'nguyendinhdung@example.com'
  },
  {
    id: 3,
    src: '/hoangmanhhai.png',
    name: 'Hoàng Mạnh Hải',
    description: 'Luật sư pháp lý doanh nghiệp',
    details: 'Hoàng Mạnh Hải có kiến thức vững chắc trong mảng pháp lý doanh nghiệp và bất động sản. Anh từng tham gia cố vấn cho nhiều thương vụ mua bán, sáp nhập cũng như xử lý tranh chấp pháp lý phức tạp. Với sự tỉ mỉ và am hiểu luật pháp quốc tế, Hoàng Mạnh Hải giúp khách hàng yên tâm trong mọi thủ tục pháp lý liên quan đến đầu tư và giao dịch bất động sản.',
    phoneNumber: '0912 345 678',
    email: 'hoangmanhhai@example.com'
  },
  {
    id: 4,
    src: '/lethuyquynh.png',
    name: 'Lê Thúy Quỳnh',
    description: 'Chuyên gia tài chính – đầu tư',
    details: 'Lê Thúy Quỳnh là một chuyên gia phân tích tài chính với hơn 10 năm kinh nghiệm trong lĩnh vực đầu tư bất động sản. Cô đã xây dựng nhiều chiến lược đầu tư hiệu quả, tối ưu hóa lợi nhuận và giảm thiểu rủi ro cho khách hàng. Lê Thúy Quỳnh cũng thường xuyên tham gia các hội thảo tài chính quốc tế để cập nhật xu hướng và mang lại giá trị mới cho nhà đầu tư.',
    phoneNumber: '0123 456 789',
    email: 'lethuyquynh@example.com'
  },
  {
    id: 5,
    src: '/buimanhtruong.png',
    name: 'Bùi Mạnh Trường',
    description: 'Giám đốc marketing bất động sản',
    details: 'Bùi Mạnh Trường từng giữ vai trò giám đốc marketing cho nhiều tập đoàn bất động sản lớn trong khu vực. Anh có thế mạnh trong việc xây dựng thương hiệu, triển khai chiến lược truyền thông đa kênh và dẫn dắt các chiến dịch quảng bá thành công. Với tầm nhìn sáng tạo, Bùi Mạnh Trường luôn mang đến những giải pháp marketing độc đáo và hiệu quả.',
    phoneNumber: '0123 456 789',
    email: 'buimanhtruong@example.com'
  }
]

function DoiNguCoVan() {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [openDetail, setOpenDetail] = useState(false);
  const [employment, setEmployment] = useState<Employment | null>(null);

  return (
    <>
      <section className="relative mb-16">
        <div className="bg-[url('/bgr-doi-ngu.png')] bg-[length:100%_100%] h-1/2 w-full absolute bottom-0" />
        <div className="max-w-7xl m-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-4 text-center">ĐỘI NGŨ CỐ VẤN</h2>
            <p className="text-[1.25rem] lg:text-[1.5rem] text-[#19366A] mb-8 text-center">Hơn 40 chuyên gia đầu ngành trong lĩnh vực BĐS</p>
          </div>
          <div className="relative">
            <button
              ref={prevRef}
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
              aria-label="Previous slide"
            >
              <PlayIcon className="rotate-180 group-hover:scale-110 transition-transform fill-current" />
            </button>

            <button
              ref={nextRef}
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-[#d29015] hover:bg-[#d29015] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-[#d29015]"
              aria-label="Next slide"
            >
              <PlayIcon className="group-hover:scale-110 transition-transform fill-current" />
            </button>
            <Swiper
              slidesPerView={1}
              loop={true}
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
            >
              {ListEmployments.map((employment) => (
                <>
                  <SwiperSlide key={employment.id}>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        setOpenDetail(true)
                        setEmployment(employment)
                      }}
                    >
                      <div className="mb-16">
                        <Image src={employment.src} alt={employment.name} width={740} height={740} className="rounded-2xl" />
                      </div>
                      <div className="absolute bottom-2 px-4">
                        <div className="mb-2">
                          <p className="text-white font-bold text-2xl">{employment.name}</p>
                        </div>
                        <div className="flex text-justify font-semibold mb-4 text-[#d29015] italic">
                          <p>{employment.description}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {employment && <Detail open={openDetail} onClose={() => setOpenDetail(false)} data={employment} />}
    </>
  )
}

export default DoiNguCoVan