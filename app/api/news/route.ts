import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  let filenames: string[] = [];
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
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const urls = formData.getAll('urls') as string[];
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);
    const slug = createSlug(title);

    if (files.length === 0) {
      return NextResponse.json({ message: "Không file nào được chọn" }, { status: 400 });
    }
    filenames = await uploadFile(files, "news");
    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        slug,
        authorId: Number(userId),
        thumbnailUrl: `/images/news/${filenames[0]}`
      }
    })

    if (urls.length > 0) {
      await prisma.images_news.updateMany({
        where: { url: { in: urls } },
        data: { newsId: newNews.id }
      });
    }

    return NextResponse.json({ newNews }, { status: 200 })
  } catch (err) {
    if (filenames.length > 0) {
      await Promise.all(filenames.map((filename) => deleteFile(`/images/news/${filename}`)));
    }
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
  const excludeNewsSlug = url.searchParams.get('excludeNewsSlug')
  const search = url.searchParams.get('search')

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const whereCondition: Prisma.newsWhereInput = {
    ...(excludeNewsSlug ? { slug: { not: excludeNewsSlug } } : {}),
    ...(search && {
      OR: [
        { title: { contains: search } },
        { content: { contains: search } },
      ],
    }),
  }

  try {
    const news = await prisma.news.findMany({
      skip,
      take,
      where: whereCondition
    })
    const total = await prisma.news.count({
      where: whereCondition
    })
    return NextResponse.json(
      {
        data: news,
        paging: {
          page,
          pageSize,
          total
        }
      },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}