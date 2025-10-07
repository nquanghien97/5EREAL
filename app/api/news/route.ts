import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const uploadedFiles: string[] = [];

  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const isHotNews = formData.get("isHotNews") === "true";
    const thumbnail = formData.get("thumbnail") as File | null;

    if (!title || !summary) {
      return NextResponse.json({ message: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
    }

    const slug = createSlug(title);
    let thumbnailUrl: string = "";

    // Upload thumbnail nếu có
    if (thumbnail) {
      const [filename] = await uploadFile([thumbnail], "news");
      thumbnailUrl = `/images/news/${filename}`;
      uploadedFiles.push(thumbnailUrl);
    }

    // Tạo news chính
    const newNews = await prisma.news.create({
      data: {
        title,
        summary,
        slug,
        authorId: Number(user.userId),
        thumbnail: thumbnailUrl,
        isHotNews,
      },
    });

    // Duyệt qua tất cả các section
    const sections = [];
    let i = 0;
    while (true) {
      const sectionData = formData.get(`section_${i}`);
      if (!sectionData) break;

      const section = JSON.parse(sectionData as string);
      const file = formData.get(`section_image_${i}`) as File | null;

      let imageUrl: string | null = null;
      if (file) {
        const [filename] = await uploadFile([file], "news/sections");
        imageUrl = `/images/news/sections/${filename}`;
        uploadedFiles.push(imageUrl);
      }

      sections.push({
        orderIndex: Number(section.orderIndex),
        caption: section.caption || null,
        content: section.content || null,
        imageUrl,
        newsId: newNews.id,
      });

      i++;
    }

    if (sections.length > 0) {
      await prisma.news_sections.createMany({
        data: sections,
      });
    }

    return NextResponse.json(
      { message: "Tạo bài viết thành công", news: newNews },
      { status: 200 }
    );
  } catch (err) {
    // Xóa file nếu lỗi
    if (uploadedFiles.length > 0) {
      await Promise.all(uploadedFiles.map(path => deleteFile(path)));
    }

    console.error("Lỗi tạo news:", err);
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi tạo bài viết" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 0);
    const pageSize = Number(searchParams.get("pageSize") || 0);
    const search = searchParams.get("search") || "";
    const excludeNewsSlug = searchParams.get("excludeNewsSlug") || "";

    const where: Prisma.newsWhereInput = {};

    // 🔹 Lọc theo title nếu có search
    if (search) {
      where.title = {
        contains: search,
      };
    }

    // 🔹 Loại trừ 1 bài theo slug
    if (excludeNewsSlug) {
      where.slug = {
        not: excludeNewsSlug,
      };
    }

    // 🔹 Nếu không có page/pageSize → lấy toàn bộ
    if (!page || !pageSize) {
      const news = await prisma.news.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, fullName: true } },
        },
      });
      return NextResponse.json({ data: news, total: news.length });
    }

    // 🔹 Nếu có phân trang
    const skip = (page - 1) * pageSize;
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, fullName: true } },
        },
        skip,
        take: pageSize,
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({
      data: news,
      paging: {
        total,
        page,
        pageSize,
      }
    });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json(
      { message: "Không thể lấy danh sách bài viết" },
      { status: 500 }
    );
  }
}
