import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }
    const body = await req.json();
    const {
      title,
      summary,
      isHotNews = false,
      sections = [],
      thumbnailId
    }: {
      title: string,
      summary: string,
      thumbnailId: number,
      authorId: number,
      isHotNews: boolean,
      sections: { imageId: number, content: string, caption: string, orderIndex: number }[]
    } = body;

    const slug = createSlug(title)
    if (!title || !slug || !thumbnailId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Tạo record news
    const news = await prisma.news.create({
      data: {
        title,
        slug,
        summary,
        thumbnailId,
        authorId: user.userId,
        isHotNews,
        sections: {
          create: sections.map((s, index: number) => ({
            imageId: s.imageId || null,
            content: s.content || null,
            caption: s.caption || null,
            orderIndex: s.orderIndex ?? index,
          })),
        },
      },
      include: {
        thumbnail: true,
        sections: {
          include: {
            image: true,
          },
        },
        author: {
          select: { id: true, fullName: true },
        },
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/news error:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/news
 * Lấy danh sách news (có thumbnail, tác giả)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize');
  const search = url.searchParams.get('search');
  const excludeNewsSlug = url.searchParams.get('excludeNewsSlug')

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && pageSize !== null) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }
  try {
    const whereCondition: Prisma.newsWhereInput = {
      ...(search && {
        title: {
          contains: search
        },
      }),
      ...(excludeNewsSlug ? {
        slug: { not: excludeNewsSlug }
      } : {})
    }
    const newsList = await prisma.news.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      include: {
        thumbnail: true,
        author: {
          select: { id: true, fullName: true },
        },
      },
      skip,
      take
    });

    const total = await prisma.news.count({
      where: whereCondition
    })

    return NextResponse.json({
      news: newsList, paging: {
        page,
        pageSize,
        total
      }
    });
  } catch (error) {
    console.error("❌ GET /api/news error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}