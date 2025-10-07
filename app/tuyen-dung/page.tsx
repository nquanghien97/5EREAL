import Banner from './Banner';
import Image from 'next/image';
import NewsSection from '@/components/news-section';

async function CoHoiKinhDoanh() {

  return (
    <main>
      <Banner />
      <section className="max-w-7xl m-auto px-4">
        <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center max-lg:mb-2 mb-4">Giới thiệu về 5E REAL</h2>
        <p className="text-[1.25rem] text-[#19366A] text-justify mb-6">5E - đối tác chiến lược trong phát triển và thương mại hóa bất động sản. Không đơn thuẩn là một đơn vị phân phối, 5E chủ động tham gia từ khâu nghiên cứu thị trường, tư vấn định vị sản phẩm đến xây dựng chiến lược ra hàng phù hợp từng phân khúc. Với tệp khách hàng sẵn có, hệ thống phân loại thông minh và cộng đồng nhà đầu tư được nuôi dưỡng chuyên nghiệp, 5E tạo nên bàn tay kép dẫn dắt thị trường - đúng điều khách cần, tròn điều chủ muốn.</p>
      </section>
      <section className="max-w-7xl m-auto px-4">
        <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center max-lg:mb-2 mb-4">Vì sao bạn lựa chọn 5E REAL</h2>
        <ul className="flex flex-wrap">
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-1.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-3.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-2.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-4.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-5.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
          <li className="w-1/3 px-4 mb-7">
            <div className="mb-2">
              <Image src="/benefit-img-6.gif" alt="" width={500} height={500} className="w-[120px]" />
            </div>
            <div>
              <h3 className="uppercase font-bold mb-2 text-[1.5rem]">Danh tiếng công ty</h3>
              <p className="text-[#19366A] text-[1.25rem]">Tầm vóc và danh tiếng doanh nghiệp được lan tỏa không chỉ ở nội bộ mà còn ghi dấu trên cả thị trường lao động</p>
            </div>
          </li>
        </ul>
      </section>
      <section className="max-w-7xl m-auto px-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] text-center mb-4">Cơ hội nghề nghiệp</h2>
        <p className="text-center text-[#19366A] text-[1.25rem]">Tham gia cùng chúng tôi</p>
        <p className="text-center text-[#19366A] text-[1.25rem]">Bạn gửi CV về địa chỉ email: <a className="text-[blue] hover:underline" href='mailto:tuyendung@5ereal.com'>tuyendung@5ereal.com</a></p>
        <Image src="/ve-chung-toi-2.png" alt="ve-chung-toi-2" width={1920} height={1080} />
      </section>

      <NewsSection />
    </main>
  )
}

export default CoHoiKinhDoanh