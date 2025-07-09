import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";

export async function POST(req: Request) {
  let filenames: string[] = [];
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
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
        authorId: +1,
        thumbnailUrl: `/images/news/${filenames[0]}`
      }
    })
    return NextResponse.json({ newNews }, { status: 200 })
  } catch (err) {
    if (filenames.length > 0) {
      await Promise.all(filenames.map((filename) => deleteFile(filename)));
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

  const skip = (page - 1) * pageSize;
  const take = pageSize;
  try {
    const news = await prisma.news.findMany({
      skip,
      take
    })
    const total = await prisma.news.count()
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