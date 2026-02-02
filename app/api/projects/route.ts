import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { createSlug } from "@/utils/createSlug";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

enum SECTION_TYPE {
  TIEN_ICH = "TIEN_ICH",
  THU_VIEN_HINH_ANH = "THU_VIEN_HINH_ANH",
  NORMAL = "NORMAL"
}

interface SectionImageInput {
  imageId: number
  orderIndex?: number
}

interface SectionInput {
  type: SECTION_TYPE
  title?: string | null
  caption?: string | null
  description?: string | null
  content?: string | null
  orderIndex?: number
  section_images?: SectionImageInput[]
}

interface CreateProjectBody {
  name: string
  description: string
  fullName: string
  location: string
  totalArea: number
  constructionRate: number
  floorHeightMin: number
  floorHeightMax: number
  type: string
  numberOfUnits: number
  investor: string
  thumbnailId: number
  backgroundOverviewId?: number | null
  sections?: SectionInput[]
}

export async function POST(req: Request) {
  try {
    // 1. Check authentication & authorization
    const user = await getUserFromCookie();
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    // 2. Parse and validate body
    const body: CreateProjectBody = await req.json();
    const {
      name,
      fullName,
      location,
      totalArea,
      constructionRate,
      floorHeightMin,
      floorHeightMax,
      type,
      numberOfUnits,
      investor,
      thumbnailId,
      backgroundOverviewId,
      sections = []
    } = body;

    // 3. Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Tên dự án là bắt buộc" },
        { status: 400 }
      );
    }

    if (!fullName?.trim()) {
      return NextResponse.json(
        { message: "Tên đầy đủ dự án là bắt buộc" },
        { status: 400 }
      );
    }

    if (!location?.trim()) {
      return NextResponse.json(
        { message: "Vị trí dự án là bắt buộc" },
        { status: 400 }
      );
    }

    if (!thumbnailId) {
      return NextResponse.json(
        { message: "Ảnh thumbnail là bắt buộc" },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (totalArea <= 0 || constructionRate <= 0 ||
      floorHeightMin <= 0 || floorHeightMax <= 0 ||
      numberOfUnits <= 0) {
      return NextResponse.json(
        { message: "Các giá trị số phải lớn hơn 0" },
        { status: 400 }
      );
    }

    if (floorHeightMin > floorHeightMax) {
      return NextResponse.json(
        { message: "Chiều cao tầng tối thiểu không được lớn hơn tối đa" },
        { status: 400 }
      );
    }

    // 4. Generate slug
    const slug = createSlug(name);

    // 5. Check if slug already exists
    const existingProject = await prisma.projects.findUnique({
      where: { slug }
    });

    if (existingProject) {
      return NextResponse.json(
        { message: `Dự án với slug "${slug}" đã tồn tại` },
        { status: 409 }
      );
    }

    // 6. Verify thumbnail exists
    const thumbnailExists = await prisma.images.findUnique({
      where: { id: thumbnailId }
    });

    if (!thumbnailExists) {
      return NextResponse.json(
        { message: "Ảnh thumbnail không tồn tại" },
        { status: 400 }
      );
    }

    // 7. Verify background image if provided
    if (backgroundOverviewId) {
      const backgroundExists = await prisma.images.findUnique({
        where: { id: backgroundOverviewId }
      });

      if (!backgroundExists) {
        return NextResponse.json(
          { message: "Ảnh background không tồn tại" },
          { status: 400 }
        );
      }
    }

    // 8. Create project with sections and images using transaction
    const newProject = await prisma.$transaction(async (tx) => {
      // Create project first
      const project = await tx.projects.create({
        data: {
          name,
          fullName,
          slug,
          location,
          totalArea: Number(totalArea),
          constructionRate: Number(constructionRate),
          floorHeightMin: Number(floorHeightMin),
          floorHeightMax: Number(floorHeightMax),
          type,
          numberOfUnits: Number(numberOfUnits),
          investor,
          thumbnailId,
          backgroundOverviewId: backgroundOverviewId || null,
          authorId: user.userId
        }
      });

      // Create sections with their images
      if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];

          // Create section
          const createdSection = await tx.project_sections.create({
            data: {
              projectId: project.id,
              type: section.type,
              caption: section.caption,
              title: section.title || null,
              description: section.description || null,
              content: section.content || null,
              orderIndex: section.orderIndex ?? i + 1
            }
          });

          // Create section images if any
          if (section.section_images && section.section_images.length > 0) {
            const sectionImagesData = section.section_images.map((img, imgIndex) => ({
              sectionId: createdSection.id,
              imageId: img.imageId,
              orderIndex: img.orderIndex ?? imgIndex + 1
            }));

            await tx.project_section_images.createMany({
              data: sectionImagesData
            });
          }
        }
      }

      // Fetch complete project with all relations
      return await tx.projects.findUnique({
        where: { id: project.id },
        include: {
          thumbnail: true,
          backgroundOverview: true,
          author: {
            select: {
              id: true,
              fullName: true,
            }
          },
          sections: {
            include: {
              section_images: {
                include: {
                  image: true
                },
                orderBy: { orderIndex: 'asc' }
              }
            },
            orderBy: { orderIndex: 'asc' }
          }
        }
      });
    });

    return NextResponse.json({
      message: "Tạo dự án thành công",
      data: newProject
    }, { status: 201 });

  } catch (error) {
    console.error("❌ POST /api/projects error:", error);

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };

      switch (prismaError.code) {
        case 'P2002':
          return NextResponse.json(
            { message: "Dữ liệu trùng lặp (slug đã tồn tại)" },
            { status: 409 }
          );
        case 'P2003':
          return NextResponse.json(
            { message: "Tham chiếu không hợp lệ (thumbnail/background/author không tồn tại)" },
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
        message: "Không thể tạo dự án",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize');
  const search = url.searchParams.get('search');

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && pageSize !== null) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }
  try {

    const whereCondition: Prisma.projectsWhereInput = {
      ...(search && {
        name: {
          contains: search
        },
      }),
    }
    const projectsList = await prisma.projects.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      include: {
        thumbnail: true,
        author: {
          select: { id: true, fullName: true },
        },
        sections: {
          include: {
            section_images: {
              orderBy: { orderIndex: 'asc' },
              include: {
                image: true
              }
            }
          }
        }
      },
      skip,
      take
    });

    const total = await prisma.projects.count({
      where: whereCondition
    })

    return NextResponse.json({
      projects: projectsList, paging: {
        page,
        pageSize,
        total
      }
    });
  } catch (error) {
    console.error("❌ GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}