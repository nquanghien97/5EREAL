import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { createSlug } from "@/utils/createSlug";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const uploadedFiles: string[] = [];
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const formData = await req.formData();
    const payloadStr = formData.get("payload") as string;
    const payload = JSON.parse(payloadStr);
    const slug = createSlug(payload.name);

    const thumbnail = formData.get("thumbnail") as File | null;

    let thumbnailUrl = "";
    if (thumbnail) {
      const uploaded = await uploadFile([thumbnail], "projects");
      thumbnailUrl = `/images/projects/${uploaded[0]}`;
      uploadedFiles.push(thumbnailUrl);
    }

    const listSections = payload.listSections;
    const dataTienIch = payload.dataTienIch;
    const dataThuVienHinhAnh = payload.dataThuVienHinhAnh;

    const newProject = await prisma.projects.create({
      data: {
        name: payload.name,
        slug,
        location: payload.location,
        totalArea: Number(payload.totalArea),
        constructionRate: Number(payload.constructionRate),
        floorHeightMin: Number(payload.floorHeightMin),
        floorHeightMax: Number(payload.floorHeightMax),
        type: payload.type,
        numberOfUnits: Number(payload.numberOfUnits),
        investor: payload.investor,
        thumbnailUrl,
        authorId: Number(user.userId),
        description: payload.descriptionBanner,
        fullName: payload.fullName
      },
    });

    // Sections
    for (const section of listSections) {
      let imageUrl = "";
      if (section.imageKey) {
        const file = formData.get(section.imageKey) as File;
        if (file) {
          const uploaded = await uploadFile([file], "projects/sections");
          imageUrl = `/images/projects/sections/${uploaded[0]}`;
          uploadedFiles.push(imageUrl);
        }
      }

      await prisma.project_sections.create({
        data: {
          projectId: newProject.id,
          type: section.type,
          orderIndex: section.orderIndex,
          content: section.content,
          imageUrl,
        },
      });
    }

    // Tiện ích
    for (const item of dataTienIch) {
      let imageUrl = "";
      if (item.imageKey) {
        const file = formData.get(item.imageKey) as File;
        if (file) {
          const uploaded = await uploadFile([file], "projects/sections");
          imageUrl = `/images/projects/sections/${uploaded[0]}`;
          uploadedFiles.push(imageUrl);
        }
      }

      await prisma.project_images.create({
        data: {
          projectId: newProject.id,
          caption: item.caption,
          orderIndex: item.orderIndex,
          imageUrl,
          type: 'TIEN_ICH'
        },
      });
    }

    await prisma.project_sections.create({
      data: {
        projectId: newProject.id,
        type: dataTienIch[0].type,
        orderIndex: 100,
        content: dataTienIch[0].content,
        imageUrl: null,
        description: dataTienIch[0].description
      }
    })

    // Thư viện hình ảnh
    for (const item of dataThuVienHinhAnh) {
      let imageUrl = "";
      if (item.imageKey) {
        const file = formData.get(item.imageKey) as File;
        if (file) {
          const uploaded = await uploadFile([file], "projects/sections");
          imageUrl = `/images/projects/sections/${uploaded[0]}`;
          uploadedFiles.push(imageUrl);
        }
      }

      await prisma.project_images.create({
        data: {
          projectId: newProject.id,
          caption: item.caption,
          orderIndex: item.orderIndex,
          imageUrl,
          type: 'THU_VIEN_HINH_ANH'
        },
      });
    }

    await prisma.project_sections.create({
        data: {
          projectId: newProject.id,
          type: dataThuVienHinhAnh[0].type,
          orderIndex: 200,
          content: dataThuVienHinhAnh[0].content,
          imageUrl: null,
          description: dataThuVienHinhAnh[0].description
        }
      })

    return NextResponse.json({ project: newProject }, { status: 200 });
  } catch (err) {
    // rollback file upload nếu lỗi
    console.log(err)
    await Promise.all(uploadedFiles.map((file) => deleteFile(file)));
    return NextResponse.json({ message: (err as Error).message || "Lỗi không xác định" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("pageSize"));
    const search = searchParams.get("search") || "";
    const excludeProjectsSlug = searchParams.get("excludeProjectsSlug") || "";

    // Điều kiện WHERE
    const where: Prisma.projectsWhereInput = {};
    if (search) {
      where.name = { contains: search };
    }

    if (excludeProjectsSlug) {
      where.slug = {
        not: excludeProjectsSlug,
      };
    }

    // Nếu có page & pageSize → phân trang
    if (page && pageSize) {
      const [projects, total] = await Promise.all([
        prisma.projects.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: "desc" }
        }),
        prisma.projects.count({ where }),
      ]);

      return NextResponse.json({
        data: projects,
        paging: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    // Nếu không có page & pageSize → lấy toàn bộ
    const projects = await prisma.projects.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: projects });
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message || "Lỗi khi lấy danh sách dự án" },
      { status: 500 }
    );
  }
}