// import prisma from "@/lib/db";
import { createSlug } from "@/utils/createSlug";
import prisma from "../../../../lib/prisma"
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";

export async function PUT(req: Request, { params }: { params: { param: number } }) {
  const { param } = params;
  let filenames: string[] = [];
  try {
    if (!param) {
      return NextResponse.json(
        {
          message: 'news ID is required',
        },
        { status: 400 }
      );
    }
    const oldNews = await prisma.news.findUnique({
      where: { id: +param },
    });

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);
    const slug = createSlug(title);
    if (files.length === 0) {
      const updatedNews = await prisma.$transaction(async (tx) => {
        const news = await tx.news.update({
          where: { id: +param },
          data: {
            title,
            content,
            slug
          },
        });

        return news;
      });
      return NextResponse.json(
        { updatedNews },
        { status: 200 }
      );
    }
    await deleteFile(oldNews?.thumbnailUrl || '');

    filenames = await uploadFile(files, "news");
    const updatednews = await prisma.$transaction(async (tx) => {
      const news = await tx.news.update({
        where: { id: +param },
        data: {
          title,
          content,
          thumbnailUrl: `/images/news/${filenames[0]}`,
          slug
        },
      });
      return news;
    })
    return NextResponse.json(
      { updatednews },
      { status: 200 }
    );

  } catch (err) {
    if (filenames.length > 0) {
      await deleteFile(filenames[0]);
    }
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
      const news = await prisma.news.findUnique({
        where: {
          id: +param
        }
      })
      return NextResponse.json(
        {
          data: news,
        },
        { status: 200 }
      )
    } else {
      const news = await prisma.news.findUnique({
        where: {
          slug: param.toString()
        }
      })
      return NextResponse.json(
        {
          data: news,
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
    const news = await prisma.news.findUnique({
      where: {
        id: +param
      }
    })
    await prisma.news.delete({
      where: {
        id: +param
      }
    })
    await deleteFile(news?.thumbnailUrl || "")
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