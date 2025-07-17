import { NewsEntity } from "@/entities/news";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getNews({ page, pageSize }: { page?: number, pageSize?: number }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?${params.toString()}`)
  return res.json()
}

export async function getFirstNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?page=1&pageSize=1`)
  return res.json()
}

export async function getNewsBySlug(slug: string): Promise<NewsEntity> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${slug}`)
  return res.json()
}

export async function getNewsByPrisma() {

  try {
    const news = await prisma.news.findMany({
      skip: 0,
      take: 4
    })
    return NextResponse.json(
      {
        data: news,
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