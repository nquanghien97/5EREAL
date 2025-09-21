// import prisma from "@/lib/db";
import { createSlug } from "@/utils/createSlug";
import prisma from "../../../../lib/prisma"
import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function PUT(req: Request, { params }: { params: { param: number } }) {
  const { param } = params;
  const { job_name, location, time_open, time_close, job_type, salary, job_description, number_of_recruitment, categoryId } = await req.json();
  const slug = createSlug(job_name);
  try {
    if (!param) {
      return NextResponse.json(
        {
          message: 'job ID is required',
        },
        { status: 400 }
      );
    }

    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }

    const updatedjob = await prisma.$transaction(async (tx) => {
      const job = await tx.job.update({
        where: { id: +param },
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
        },
      });
      return job;
    })
    return NextResponse.json(
      { updatedjob },
      { status: 200 }
    );

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function GET(req: Request, { params }: { params: { param: number | string } }) {
  const { param } = params
  try {
    if (!isNaN(Number(param))) {
      const job = await prisma.job.findUnique({
        where: {
          id: +param
        }
      })
      return NextResponse.json(
        {
          data: job,
        },
        { status: 200 }
      )
    } else {
      const job = await prisma.job.findUnique({
        where: {
          slug: param.toString()
        },
        include: {
          category: true,
        }
      })
      return NextResponse.json(
        {
          data: job,
        },
        { status: 200 }
      )
    }

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request, { params }: { params: { param: number } }) {
  const { param } = params
  try {
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const job = await prisma.job.findUnique({
      where: {
        id: +param
      }
    })
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    await prisma.job.delete({
      where: {
        id: +param
      }
    })
    return NextResponse.json(
      {
        message: 'Xóa Tin tức thành công',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}