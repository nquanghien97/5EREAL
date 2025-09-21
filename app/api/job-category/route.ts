import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  try {
    await prisma.job_category.create({
      data: {
        name,
      }
    })
    return NextResponse.json({ message: 'Tạo Danh mục việc làm thành công' }, { status: 200 })
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
  const name = url.searchParams.get('name');
  // const location = url.searchParams.get('location');

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const whereCondition = {
    name: name ? { contains: name } : undefined,
  };

  try {
    const jobs = await prisma.job_category.findMany({
      skip,
      take,
      where: whereCondition,
      orderBy: {
        createdAt: 'desc'
      }
    })
    const total = await prisma.job_category.count({
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