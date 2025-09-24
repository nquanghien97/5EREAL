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
      <section className="mb-8">
        <Image src="/banner-home.png" alt="banner-home" width={1831} height={916} unoptimized className="w-full max-h-[600px] object-center" />
      </section>
      <section className="mb-16 px-4 container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#0F3E5A] mb-12 text-center">CÔNG CỤ TRỢ LÝ TƯ VẤN ĐỊNH GIÁ BDS</h2>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto">
          {tools.map((tool) => (
            <div
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
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-6xl font-bold text-white/90 leading-none">0{tool.id}</div>
                  </div>

                  {/* Title and CTA */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white leading-tight">{tool.title}</h3>

                    <button className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors group-hover:translate-x-1 transform duration-200">
                      <Link href={tool.link} className="flex items-center">
                        <span className="mr-2 text-xl">Xem chi tiết</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 px-4">
        <div className="container mx-auto relative">
          <Image src="/dau1@3x.png" alt="dau1@3x" width={625} height={550} loading="lazy" className="w-16 m-auto hidden lg:block absolute top-0 left-0" />
          <Image src="/logo-2@3x.png" alt="5E REAL" width={1084} height={438} loading="lazy" className="w-1/2 m-auto" />
          <p className="text-xl text-[#007AA7] text-justify mb-6">
            5E - đối tác chiến lược trong phát triển và thương mại hóa bất động sản. Không đơn thuẩn là một đơn vị phân phối, 5E chủ động tham gia từ khâu nghiên cứu thị trường, tư vấn định vị sản phẩm đến xây dựng chiến lược ra hàng phù hợp từng phân khúc. Với tệp khách hàng sẵn có, hệ thống phân loại thông minh và cộng đồng nhà đầu tư được nuôi dưỡng chuyên nghiệp, 5E tạo nên bàn tay kép dẫn dắt thị trường - đúng điều khách cần, tròn điều chủ muốn.
          </p>
          <Image src="/dau2@3x.png" alt="dau2@3x" width={625} height={550} loading="lazy" className="w-16 m-auto hidden lg:block absolute bottom-[-5rem] right-0" />
        </div>
      </section>

      <LinhVucHoatDong />

      <ProjectsSection response={projectsResponse} />

      <DoiNguCoVan />
      <DonViThanhVien />
      <NewsSection />
    </main>
  );
}
