import { NewsEntity } from "@/entities/news";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getNews({ page, pageSize, excludeNewsSlug }: { page?: number, pageSize?: number, excludeNewsSlug?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (excludeNewsSlug) params.append('excludeNewsSlug', excludeNewsSlug.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?${params.toString()}`)
  return res.json()
}

export async function getFirstNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?page=1&pageSize=1`)
  return res.json()
}

export async function getNewsBySlug(slug: string): Promise<NewsEntity> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${slug}`)
  const data = await res.json()
  return data.news
}

export async function getNewsByPrisma({ page = 1, pageSize = 3, excludeNewsSlug }: { page: number, pageSize: number, excludeNewsSlug?: string }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  try {
    const news = await prisma.news.findMany({
      skip,
      take,
      include: {
        thumbnail: true,
        author: {
          select: { id: true, fullName: true },
        },
      },
      where: excludeNewsSlug ? {
        slug: { not: excludeNewsSlug }
      } : {}
    })
    const total = await prisma.news.count({
      where: excludeNewsSlug ? {
        slug: { not: excludeNewsSlug }
      } : {}
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