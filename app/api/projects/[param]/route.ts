// app/api/projects/[id]/route.ts
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
  id?: number // Có ID = existing, không có = new
  imageId: number
  orderIndex?: number
}

interface SectionInput {
  id?: number // Có ID = update, không có = create
  type: SECTION_TYPE
  title?: string | null
  caption?: string | null
  description?: string | null
  content?: string | null
  orderIndex?: number
  section_images?: SectionImageInput[]
}

interface UpdateProjectBody {
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params
    let whereCondition: Prisma.projectsWhereUniqueInput
    if (isNaN(Number(param))) {
      whereCondition = {
        slug: param
      }
    } else {
      whereCondition = {
        id: Number(param)
      }
    }
    const project = await prisma.projects.findUnique({
      where: whereCondition,
      include: {
        thumbnail: true,
        author: { select: { id: true, fullName: true } },
        sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            section_images: {
              include: {
                image: true
              }
            }
          }
        },
      },
    })

    if (!project) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({ project, message: 'Lấy thông tin bài viết thành công!' }, { status: 200 })
  } catch (err) {
    console.error("Lỗi lấy projects:", err)
    return NextResponse.json({ message: "Lỗi khi lấy bài viết" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param: paramId } = await params;
    const id = Number(paramId);

    // 1. Validate ID
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    // 2. Check authentication & authorization
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    // 3. Parse and validate body
    const body: UpdateProjectBody = await req.json();
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

    // 4. Validate required fields
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

    // 5. Check if project exists
    const existingProject = await prisma.projects.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            section_images: true
          }
        }
      }
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Dự án không tồn tại" },
        { status: 404 }
      );
    }

    // 6. Generate and check slug
    const slug = createSlug(name);
    const slugConflict = await prisma.projects.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    });

    if (slugConflict) {
      return NextResponse.json(
        { message: `Slug "${slug}" đã được sử dụng bởi dự án khác` },
        { status: 409 }
      );
    }

    // 7. Update project with sections using transaction
    const updatedProject = await prisma.$transaction(async (tx) => {
      // ========================================
      // STEP 1: Handle Sections
      // ========================================

      const existingSectionIds = existingProject.sections.map(s => s.id);
      const incomingSectionIds = sections
        .filter(s => s.id)
        .map(s => s.id!);

      // Find sections to delete
      const sectionsToDelete = existingSectionIds.filter(
        sId => !incomingSectionIds.includes(sId)
      );

      // Delete removed sections (cascade will delete section_images)
      if (sectionsToDelete.length > 0) {
        await tx.project_sections.deleteMany({
          where: {
            id: { in: sectionsToDelete },
            projectId: id
          }
        });
      }

      // ========================================
      // STEP 2: Update/Create Sections
      // ========================================

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionData = {
          type: section.type,
          title: section.title || null,
          caption: section.caption,
          description: section.description || null,
          content: section.content || null,
          orderIndex: i + 1, // Force sequential
          projectId: id
        };

        let sectionId: number;

        if (section.id && incomingSectionIds.includes(section.id)) {
          // Update existing section
          const updatedSection = await tx.project_sections.update({
            where: { id: section.id },
            data: sectionData
          });
          sectionId = updatedSection.id;
        } else {
          // Create new section
          const createdSection = await tx.project_sections.create({
            data: sectionData
          });
          sectionId = createdSection.id;
        }

        // ========================================
        // STEP 3: Handle Section Images
        // ========================================

        if (section.section_images) {
          // Get existing images for this section
          const existingImages = existingProject.sections
            .find(s => s.id === section.id)?.section_images || [];

          const existingImageIds = existingImages.map(img => img.id);
          const incomingImageIds = section.section_images
            .filter(img => img.id)
            .map(img => img.id!);

          // Delete removed images
          const imagesToDelete = existingImageIds.filter(
            imgId => !incomingImageIds.includes(imgId)
          );

          if (imagesToDelete.length > 0) {
            await tx.project_section_images.deleteMany({
              where: {
                id: { in: imagesToDelete },
                sectionId: sectionId
              }
            });
          }

          // Update/Create images
          for (let j = 0; j < section.section_images.length; j++) {
            const img = section.section_images[j];
            const imageData = {
              sectionId: sectionId,
              imageId: img.imageId,
              orderIndex: j + 1 // Force sequential
            };

            if (img.id && incomingImageIds.includes(img.id)) {
              // Update existing image
              await tx.project_section_images.update({
                where: { id: img.id },
                data: imageData
              });
            } else {
              // Create new image
              await tx.project_section_images.create({
                data: imageData
              });
            }
          }
        }
      }

      // ========================================
      // STEP 4: Update Project
      // ========================================

      return await tx.projects.update({
        where: { id },
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
          authorId: user.userId,
          updatedAt: new Date()
        },
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
      message: "Cập nhật dự án thành công",
      data: updatedProject
    }, { status: 200 });

  } catch (error) {
    console.error("❌ PUT /api/projects/[id] error:", error);

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
            { message: "Tham chiếu không hợp lệ (thumbnail/background/image không tồn tại)" },
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
        message: "Không thể cập nhật dự án",
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
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }

    await prisma.projects.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'Delete projects successfully' }, { status: 201 });
  } catch (error) {
    console.error("❌ DELETE /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to delete projects" },
      { status: 500 }
    );
  }
}