import { getJobs } from '@/services/job';
import Banner from './Banner';
import Image from 'next/image';
import { JobEntity } from '@/entities/job.entity';
import MapPinIcon from '@/assets/icons/MapPinIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

async function CoHoiKinhDoanh({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const search = async (formData: FormData) => {
    'use server'
    const searchValue = formData.get('job_name') as string
    redirect(`/tuyen-dung?job_name=${encodeURIComponent(searchValue)}`)
  }

  const searchJobs = await searchParams

  const { data } = await getJobs({ page: 1, pageSize: 10, ...searchJobs }) as { data: JobEntity[] }

  return (
    <main>
      <Banner />
      <section className="mb-4 px-2 max-w-7xl m-auto flex gap-8">
        <div className="w-full lg:w-1/2">
          <Image src="/phuc-loi.jpg" alt="phuc-loi" width={1920} height={1080} className="mb-4" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="uppercase text-3xl font-bold mb-4"><span className="text-[#00305b]">Chế độ phúc lợi</span> <span className="text-[#589f46]">7WEALTH</span></h2>
          <ul className="list-disc pl-4">
            <li className="py-1"><strong>Lương thưởng hấp dẫn</strong> - Cạnh tranh, thỏa thuận theo năng lực và thành tích đóng góp.</li>
            <li className="py-1"><strong>Bữa phụ mỗi ngày</strong> - Được cung cấp bữa phụ đầy đủ dinh dưỡng, tiếp thêm năng lượng cho ngày làm việc hiệu quả.</li>
            <li className="py-1"><strong>Môi trường làm việc chuyên nghiệp</strong> - Trẻ trung, năng động, đồng nghiệp thân thiện, sẵn sàng hỗ trợ nhau phát triển</li>
            <li className="py-1"><strong>Trang thiết bị đầy đủ</strong> - Được cung cấp đầy đủ công cụ, thiết bị phục vụ công việc.</li>
            <li className="py-1"><strong>Du lịch & Team building</strong> - Du lịch hàng năm tại các địa điểm hấp dẫn, thường xuyên tổ chức các hoạt động team building kết nối đội ngũ.</li>
            <li className="py-1"><strong>Hoạt động nội bộ sôi động</strong> - Các chương trình thể thao, vui chơi giải trí đa dạng dành riêng cho nhân viên 7WEALTH.</li>
          </ul>
        </div>
      </section>
      <section className="max-w-7xl m-auto mb-4 px-2 flex gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="uppercase text-3xl font-bold mb-4"><span className="text-[#00305b]">Lộ trình thăng tiến</span> <span className="text-[#589f46]">7WEALTH</span></h2>
          <ul className="list-disc pl-4">
            <li className="py-1">Lộ trình thăng tiến rõ ràng</li>
            <li className="py-1">Review lương định kì 1 năm 1 lần, review lương đặc cách 1 năm 2 lần đối với các cá nhân xuất sắc.</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <Image src="/lo-trinh-thang-tien.jpg" alt="lo-trinh-thang-tien" width={1920} height={1080} className="mb-4" />
        </div>
      </section>
      <section className="max-w-7xl m-auto mb-4 px-2 flex gap-8">
        <div className="w-full lg:w-1/2">
          <Image src="/dao-tao.jpg" alt="dao-tao" width={1920} height={1080} className="mb-4" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="uppercase text-3xl font-bold mb-4"><span className="text-[#00305b]">Đào tạo & Phát triển tại</span> <span className="text-[#589f46]">7WEALTH</span></h2>
          <p className="">Tại <strong>7WEALTH</strong>, chúng tôi coi <strong>đào tạo và phát triển nhân sự</strong> là khoản đầu tư chiến lược cho sự thành công bền vững của công ty. Vì vậy, khi trở thành một thành viên của <strong>7WEALTH</strong>, bạn sẽ được:</p>
          <ul className="list-disc pl-4">
            <li className="py-1"><strong>Tham gia các chương trình đào tạo nội bộ miễn phí</strong> - Nâng cao kỹ năng mềm, kỹ năng chuyên môn và nghiệp vụ để phát triển bản thân.</li>
            <li className="py-1"><strong>Huấn luyện chuyên sâu</strong> - Được hướng dẫn bởi các chuyên gia giàu kinh nghiệm, giúp bạn làm chủ công việc và thăng tiến trong sự nghiệp.</li>
            <li className="py-1"><strong>Lộ trình phát triển rõ ràng</strong> - Tạo cơ hội để bạn liên tục phát triển, thử thách bản thân và đạt được những cột mốc quan trọng trong sự nghiệp.</li>
          </ul>
        </div>
      </section>
      <section className="max-w-7xl m-auto mb-4 px-2 flex gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="uppercase text-3xl font-bold text-center mb-4"><span className="text-[#00305b]">Tôn vinh và tưởng thưởng</span> <span className="text-[#589f46]">7WEALTH</span></h2>
          <p className="mb-2">Tại <strong>7WEALTH</strong>, chúng tôi coi <strong>đào tạo và phát triển nhân sự</strong> là khoản đầu tư chiến lược cho sự thành công bền vững của công ty. Vì vậy, khi trở thành một thành viên của <strong>7WEALTH</strong>, bạn sẽ được:</p>
          <ul className="list-disc mb-2 pl-4">
            <li className="py-1">Vinh danh và khen thưởng cuối năm đối với các cá nhân làm việc xuất sắc trong năm;</li>
            <li className="py-1">Vinh danh các cá nhân có thâm niên làm việc lâu dài tại công ty;</li>
            <li className="py-1">Vinh danh Phòng/Ban/BP tiêu biểu.</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <Image src="/ton-vinh.jpg" alt="ton-vinh" width={1920} height={1080} className="mb-4" />
        </div>
      </section>
      <section>
        <h2 className="uppercase text-3xl font-bold text-center mb-4"><span className="text-[#00305b]">Các vị trí tuyển dụng</span></h2>
        <div className="max-w-7xl m-auto">
          <div className="flex flex-col">
            <form action={search} className="flex mb-8">
              <input
                placeholder="Job title"
                className="w-full p-2 border border-[#ccc] rounded-l-md outline-[#589f46]"
                name="job_name"
              />
              <button type='submit' className="w-[15%] rounded-r-md py-1 bg-[#589f46] font-semibold text-white text-center hover:opacity-85 duration-300">Tìm kiếm</button>
            </form>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full">
                {(!data || data.length === 0) ? (
                  <div className="flex items-center py-4">
                    <p className="">Không có job phù hợp</p>
                  </div>
                ) : (
                  data.map((job: JobEntity) => (
                    <div
                      key={job.id.toString()}
                      className="flex justify-between w-full border-dotted border-b border-[#ccc] py-4"
                    >
                      <div>
                        <div className="mb-2">
                          <p className="text-xl font-semibold">{job.job_name}</p>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <span><MapPinIcon width={12} height={12} /></span>
                          <p>{job.location}</p>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <span><ClockIcon width={12} height={12} /></span>
                          <p>{job.time_open} - {job.time_close}</p>
                        </div>
                      </div>
                      <div>
                        <Link href={`/job/${job.slug}`} className="bg-[#589f46] p-4 rounded-md text-white hover:opacity-85 duration-300">Ứng tuyển ngay</Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CoHoiKinhDoanh