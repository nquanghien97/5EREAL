import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { job_name, location, time_open, time_close, job_type, salary, job_description, number_of_recruitment, categoryId } = await req.json();
  const slug = createSlug(job_name)
  try {
    await prisma.job.create({
      data: {
        job_name,
        location,
        time_open,
        time_close,
        job_type,
        salary,
        job_description,
        number_of_recruitment,
        slug,
        categoryId
      }
    })
    return NextResponse.json({ message: 'Tạo Job thành công' }, { status: 200 })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10);
  const job_name = url.searchParams.get('job_name');
  const location = url.searchParams.get('location');

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const whereCondition = {
    job_name: job_name ? { contains: job_name } : undefined,
    location: location ? { contains: location } : undefined
  };

  try {
    const jobs = await prisma.job.findMany({
      skip,
      take,
      where: whereCondition,
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    const total = await prisma.job.count({
      where: whereCondition
    })
    return NextResponse.json(
      {
        data: jobs,
        paging: {
          page,
          pageSize,
          total
        }
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({
      message: (err as Error).message
    }, { status: 500 })
  }
}