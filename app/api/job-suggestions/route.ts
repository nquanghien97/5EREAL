import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10);
  const job_name = url.searchParams.get('job_name');
  const location = url.searchParams.get('location');
  const category = url.searchParams.get('category');
  const currentJobId = url.searchParams.get('currentJobId');

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const whereCondition = {
    job_name: job_name ? { contains: job_name } : undefined,
    location: location ? { contains: location } : undefined,
    category: category
      ? {
        name: {
          contains: category,
        }
      }
      : undefined,
    NOT: currentJobId ? { id: parseInt(currentJobId, 10) } : undefined
  }

  try {
    const jobs = await prisma.job.findMany({
      skip,
      take,
      where: whereCondition,
      include: {
        category: true
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