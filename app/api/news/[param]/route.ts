import { getUserFromCookie } from "@/lib/getUserFromCookie"
import prisma from "@/lib/prisma"
import { createSlug } from "@/utils/createSlug"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ param: string }> }) {
  try {
    const { param } = await params
    let whereCondition: Prisma.newsWhereUniqueInput
    if (isNaN(Number(param))) {
      whereCondition = {
        slug: param
      }
    } else {
      whereCondition = {
        id: Number(param)
      }
    }
    const news = await prisma.news.findUnique({
      where: whereCondition,
      include: {
        thumbnail: true,
        author: { select: { id: true, fullName: true } },
        sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            image: true
          }
        },
      },
    })

    if (!news) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({ news: news, message: 'Lấy thông tin bài viết thành công!' }, { status: 200 })
  } catch (err) {
    console.error("Lỗi lấy news:", err)
    return NextResponse.json({ message: "Lỗi khi lấy bài viết" }, { status: 500 })
  }
}

interface SectionInput {
  id?: number // Có ID = update, không có = create
  imageId?: number | null
  content: string
  caption?: string | null
  orderIndex: number
}

interface UpdateNewsBody {
  title: string
  summary: string
  thumbnailId: number
  isHotNews?: boolean
  sections?: SectionInput[]
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params;
    const id = Number(param);

    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    // Check authentication & authorization
    const user = await getUserFromCookie();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    // Parse body
    const body: UpdateNewsBody = await req.json();
    const {
      title,
      summary,
      thumbnailId,
      isHotNews = false,
      sections = []
    } = body;

    // Validate required fields
    if (!title?.trim() || !summary?.trim() || !thumbnailId) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc (title, summary, thumbnailId)" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = createSlug(title);

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
      include: { sections: true }
    });

    if (!existingNews) {
      return NextResponse.json(
        { message: "Tin tức không tồn tại" },
        { status: 404 }
      );
    }

    // Check if slug is taken by another news
    const slugConflict = await prisma.news.findFirst({
      where: {
        slug,
        id: { not: id } // Exclude current news
      }
    });

    if (slugConflict) {
      return NextResponse.json(
        { message: `Slug "${slug}" đã được sử dụng bởi tin tức khác` },
        { status: 409 }
      );
    }

    // Update news with sections using transaction
    const updatedNews = await prisma.$transaction(async (tx) => {
      // Get existing section IDs
      const existingSectionIds = existingNews.sections.map(s => s.id);
      const incomingSectionIds = sections
        .filter(s => s.id)
        .map(s => s.id!);

      // Find sections to delete (exist in DB but not in request)
      const sectionsToDelete = existingSectionIds.filter(
        sId => !incomingSectionIds.includes(sId)
      );

      // 1. Delete removed sections
      if (sectionsToDelete.length > 0) {
        await tx.news_sections.deleteMany({
          where: {
            id: { in: sectionsToDelete },
            newsId: id
          }
        });
      }

      // 2. Update existing sections or create new ones
      const sectionPromises = sections.map((section, index) => {
        const sectionData = {
          content: section.content,
          caption: section.caption || null,
          imageId: section.imageId || null,
          orderIndex: index + 1, // Force sequential orderIndex
          newsId: id
        };

        if (section.id && incomingSectionIds.includes(section.id)) {
          // Update existing section
          return tx.news_sections.update({
            where: { id: section.id },
            data: sectionData
          });
        } else {
          // Create new section
          return tx.news_sections.create({
            data: sectionData
          });
        }
      });

      // Execute all section operations
      await Promise.all(sectionPromises);

      // 3. Update news
      return await tx.news.update({
        where: { id },
        data: {
          title,
          slug,
          summary,
          thumbnailId,
          authorId: user.userId,
          isHotNews,
          updatedAt: new Date()
        },
        include: {
          thumbnail: true,
          sections: {
            include: {
              image: true
            },
            orderBy: { orderIndex: 'asc' }
          },
          author: {
            select: {
              id: true,
              fullName: true,
            }
          }
        }
      });
    });

    return NextResponse.json({
      message: "Cập nhật tin tức thành công",
      data: updatedNews
    }, { status: 200 });

  } catch (error) {
    console.error("❌ PUT /api/news/[param] error:", error);

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };

      switch (prismaError.code) {
        case 'P2002':
          return NextResponse.json(
            { message: "Dữ liệu trùng lặp (unique constraint)" },
            { status: 409 }
          );
        case 'P2003':
          return NextResponse.json(
            { message: "Tham chiếu không hợp lệ (foreign key constraint)" },
            { status: 400 }
          );
        case 'P2025':
          return NextResponse.json(
            { message: "Không tìm thấy bản ghi" },
            { status: 404 }
          );
      }
    }

    return NextResponse.json(
      {
        message: "Không thể cập nhật tin tức",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params
    const id = Number(param);
    const user = await getUserFromCookie();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    await prisma.news.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'Delete news successfully' }, { status: 201 });
  } catch (error) {
    console.error("❌ DELETE /api/news error:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}