import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import LinhVucHoatDong from "@/components/ui/homepage/linh-vuc-hoat-dong";
import Link from "next/link";
import Image from "next/image";
import DoiNguCoVan from "@/components/ui/homepage/doi-ngu-co-van";
import DonViThanhVien from "@/components/ui/homepage/don-vi-thanh-vien";
import NewsSection from "@/components/news-section";
import { getProjectsByPrisma } from "@/services/projects";
import { ProjectsEntity } from "@/entities/projects";
import ProjectsSection from "@/components/projects-section";
import FadeIn from "@/components/framer-motion/FadeIn";
import Banner from "@/components/Banner";

export default async function Home() {
  const res = await getProjectsByPrisma({ page: 1, pageSize: 4 })
  const projectsResponse: { data: ProjectsEntity[] } = await res.json()

  const tools = [
    {
      id: "1",
      title: "Lưu & quản lý thông tin BDS đã xem thông minh",
      description: "Hệ thống lưu trữ và quản lý thông minh các bất động sản đã xem",
      link: "/cong-cu-dinh-gia/#map-bds",
    },
    {
      id: "2",
      title: "Thiết lập bản đồ giá so sánh",
      description: "Công cụ tạo bản đồ giá cả để so sánh các khu vực",
      link: "/cong-cu-dinh-gia/#dinh-gia-bds",
    },
    {
      id: "3",
      title: "Tư vấn giá mua/bán trên dữ liệu thực tế KH đã khảo sát",
      description: "Tư vấn giá cả dựa trên dữ liệu khảo sát thực tế từ khách hàng",
      link: "/cong-cu-dinh-gia/#dinh-gia-bds",
    },
    {
      id: "4",
      title: "Dự báo tiềm năng tăng giá và khuyến cáo thời điểm bán",
      description: "Phân tích và dự báo xu hướng giá cả, tư vấn thời điểm giao dịch",
      link: "/cong-cu-dinh-gia/#tin-tuc-bds",
    },
  ]

  return (
    <main className="background-linear-yellow">
      <Banner
        bannerImage="/banner-home.png"
        title="Chào mừng đến với 5E REAL"
        description="Đối tác chiến lược trong phát triển và thương mại hóa bất động sản"
      />

      <FadeIn>
        <section className="mb-16 px-4 max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-5xl font-[800] text-[#0F3E5A] mb-8 text-center">CÔNG CỤ TRỢ LÝ TƯ VẤN ĐỊNH GIÁ BDS</h2>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {tools.map((tool) => (
              <Link
                href={tool.link}
                key={tool.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Image with Overlay */}
                <div className="relative">
                  <Image
                    src={`/cong-cu-${tool.id}.jpg`}
                    alt={tool.title}
                    width={600}
                    height={400}
                    className="w-full object-cover rounded-t-2xl"
                    loading="lazy"
                  />
                  <div className="bg-black opacity-40 z-10 absolute inset-0" />
                  {/* Content */}
                  <div className="absolute background-linear-blue bottom-0 left-0 w-full z-20 p-8 flex flex-col justify-between">
                    {/* Number Badge */}
                    <div className="flex">
                      <div className="text-6xl font-semibold text-white/90 leading-none">0{tool.id}</div>
                      <div className="flex items-end w-1/2">
                        <div className="w-full h-[2px] bg-[white] ml-2 mb-4" />
                      </div>
                    </div>

                    {/* Title and CTA */}
                    <div className="min-h-[80px] flex flex-col">
                      <div className="flex flex-1 items-center">
                        <h3 className="text-2xl font-semibold text-white leading-tight">{tool.title}</h3>
                      </div>

                      <button className="inline-flex items-center space-x-2 text-[#c3b97c] hover:text-yellow-300 transition-colors group-hover:translate-x-1 transform duration-200">
                        <div className="flex items-center cursor-pointer">
                          <span className="mr-2 italic text-lg">Xem chi tiết</span>
                          <ArrowRightIcon width={24} height={24} fill="currentColor" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mb-16 px-4">
          <div className="max-w-7xl mx-auto relative">
            <Image src="/dau1@3x.png" alt="dau1@3x" width={625} height={550} loading="lazy" className="w-16 m-auto hidden lg:block absolute top-0 left-0" />
            <Image src="/logo-2@3x.png" alt="5E REAL" width={1084} height={438} loading="lazy" className="w-full mb-2 lg:w-1/2 m-auto" />
            <p className="text-[1.25rem] lg:text-[1.5rem] text-[#19366A] text-justify mb-6">
              5E - đối tác chiến lược trong phát triển và thương mại hóa bất động sản. Không đơn thuẩn là một đơn vị phân phối, 5E chủ động tham gia từ khâu nghiên cứu thị trường, tư vấn định vị sản phẩm đến xây dựng chiến lược ra hàng phù hợp từng phân khúc. Với tệp khách hàng sẵn có, hệ thống phân loại thông minh và cộng đồng nhà đầu tư được nuôi dưỡng chuyên nghiệp, 5E tạo nên bàn tay kép dẫn dắt thị trường - đúng điều khách cần, tròn điều chủ muốn.
            </p>
            <Image src="/dau2@3x.png" alt="dau2@3x" width={625} height={550} loading="lazy" className="w-16 m-auto hidden lg:block absolute bottom-0 right-[-4rem]" />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <LinhVucHoatDong />
      </FadeIn>

      <ProjectsSection
        response={projectsResponse}
        description="5E lựa chọn đồng hành cùng những dự án mang &quot;hơi thở phát triển&quot; - nơi hạ tầng đang vươn mình, dòng tiền đang đổ về và giá trị sống, giá trị đầu tư cùng bừng sáng theo từng bước chuyển mình của đô thị."
      />

      <FadeIn>
        <DoiNguCoVan />
      </FadeIn>
      <FadeIn>
        <DonViThanhVien />
      </FadeIn>
      <FadeIn>
        <NewsSection />
      </FadeIn>
    </main>
  );
}
