import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params;

    if (!param) {
      return NextResponse.json(
        { message: "Thiếu tham số bài viết" },
        { status: 400 }
      );
    }

    // Kiểm tra nếu param là số (id) hay chuỗi (slug)
    const isNumeric = /^\d+$/.test(param);

    const where = isNumeric
      ? { id: Number(param) }
      : { slug: param };

    const news = await prisma.news.findUnique({
      where,
      include: {
        author: {
          select: { id: true, fullName: true },
        },
        news_sections: {
          orderBy: { orderIndex: "asc" },
          select: {
            id: true,
            orderIndex: true,
            caption: true,
            imageUrl: true,
            content: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: news });
  } catch (error) {
    console.error("GET /api/news/[param] error:", error);
    return NextResponse.json(
      { message: "Không thể lấy thông tin bài viết" },
      { status: 500 }
    );
  }
}
