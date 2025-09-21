import { JobEntity } from "@/entities/job.entity";

export async function getJobs({ page, pageSize, phone_number, full_name, job_name, category }: { page?: number, pageSize?: number, phone_number?: string, full_name?: string, job_name?: string, category?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (phone_number) params.append('phone_number', phone_number.toString());
  if (full_name) params.append('full_name', full_name.toString());
  if (job_name) params.append('job_name', job_name.toString());
  if (category) params.append('category', category.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job?${params.toString()}`)
  if (!res.ok) throw new Error('Có lỗi xảy ra');
  return res.json()
}

export async function getJobsBySlug(slug: string): Promise<JobEntity> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${slug}`)
  if (!res.ok) throw new Error('Có lỗi xảy ra');
  return res.json()
}

export async function getJobSuggestions({ page, pageSize, currentJobId, category }: { page?: number, pageSize?: number, currentJobId?: number, category?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (currentJobId) params.append('currentJobId', currentJobId.toString());
  if (category) params.append('category', category.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-suggestions?${params.toString()}`)
  if (!res.ok) throw new Error('Có lỗi xảy ra');
  return res.json()
}