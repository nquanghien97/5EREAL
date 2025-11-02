// app/api/projects/[id]/route.ts
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { createSlug } from "@/utils/createSlug";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { SECTION_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params;
    const projectId = Number(param);

    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        project_sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            project_images: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
        project_images: {
          where: { sectionId: null }, // ảnh không thuộc section nào
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    console.error("GET /projects/[id] lỗi:", err);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const uploadedFiles: string[] = [];
  const deleteQueue: string[] = [];

  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const { param } = await params;
    const projectId = Number(param);
    const formData = await req.formData();

    const payloadStr = formData.get("payload") as string;
    const payload = JSON.parse(payloadStr);

    // Lấy dữ liệu cũ
    const oldProject = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        project_sections: {
          include: { project_images: true },
        },
        project_images: true,
      },
    });

    if (!oldProject) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    // --- Thumbnail ---
    let thumbnailUrl = oldProject.thumbnailUrl;
    const thumbnail = formData.get("thumbnail") as File | null;
    if (thumbnail) {
      const [filename] = await uploadFile([thumbnail], "projects");
      thumbnailUrl = `/images/projects/${filename}`;
      uploadedFiles.push(thumbnailUrl);
      if (oldProject.thumbnailUrl) deleteQueue.push(oldProject.thumbnailUrl);
    }

    // --- Cập nhật dự án chính ---
    await prisma.projects.update({
      where: { id: projectId },
      data: {
        name: payload.name,
        slug: createSlug(payload.name),
        location: payload.location,
        totalArea: Number(payload.totalArea),
        constructionRate: Number(payload.constructionRate),
        floorHeightMin: Number(payload.floorHeightMin),
        floorHeightMax: Number(payload.floorHeightMax),
        type: payload.type,
        numberOfUnits: Number(payload.numberOfUnits),
        investor: payload.investor,
        thumbnailUrl,
        description: payload.description,
        fullName: payload.fullName,
      },
    });

    // === XỬ LÝ SECTIONS (dùng orderIndex) ===
    const listSections = payload.listSections || [];
    const oldSections = oldProject.project_sections;
    const incomingSectionOrders = listSections.map((s: { orderIndex: number }) => s.orderIndex);

    // Xóa section bị loại
    const removedSections = oldSections.filter(
      (s) => !incomingSectionOrders.includes(s.orderIndex)
    );
    if (removedSections.length) {
      await prisma.project_sections.deleteMany({
        where: { id: { in: removedSections.map((s) => s.id) } },
      });
      removedSections.forEach((s) => {
        if (s.imageUrl) deleteQueue.push(s.imageUrl);
        s.project_images.forEach((img) => img.imageUrl && deleteQueue.push(img.imageUrl));
      });
    }

    for (const section of listSections) {
      const file = section.imageKey ? (formData.get(section.imageKey) as File | null) : null;
      const data : { type: SECTION_TYPE, orderIndex: number, title: string, description: string, content: string, imageUrl?: string} = {
        type: section.type,
        orderIndex: section.orderIndex,
        title: section.title || null,
        description: section.description || null,
        content: section.content || null,
      };

      if (file) {
        const [filename] = await uploadFile([file], "projects/sections");
        const newUrl = `/images/projects/sections/${filename}`;
        uploadedFiles.push(newUrl);

        const oldSec = oldSections.find((s) => s.orderIndex === section.orderIndex);
        if (oldSec?.imageUrl) deleteQueue.push(oldSec.imageUrl);

        data.imageUrl = newUrl;
      }

      const oldSec = oldSections.find((s) => s.orderIndex === section.orderIndex);
      if (oldSec) {
        await prisma.project_sections.update({
          where: { id: oldSec.id },
          data,
        });
      } else {
        await prisma.project_sections.create({
          data: { ...data, projectId },
        });
      }
    }

    // === XỬ LÝ ẢNH TRONG SECTION (TIEN_ICH, THU_VIEN_HINH_ANH) ===
    const processImages = async (
      items: { orderIndex: number, imageKey: string, caption: string | null }[],
      type: "TIEN_ICH" | "THU_VIEN_HINH_ANH",
      sectionOrderIndex: number
    ) => {
      const section = oldSections.find((s) => s.orderIndex === sectionOrderIndex);
      if (!section) return;

      const oldImages = section.project_images;
      const incomingOrders = items.map((i : { orderIndex: number }) => i.orderIndex);

      // Xóa ảnh bị loại
      const removed = oldImages.filter((i) => !incomingOrders.includes(i.orderIndex));
      if (removed.length) {
        await prisma.project_images.deleteMany({
          where: { id: { in: removed.map((i) => i.id) } },
        });
        removed.forEach((i) => i.imageUrl && deleteQueue.push(i.imageUrl));
      }

      for (const item of items) {
        const file = item.imageKey ? (formData.get(item.imageKey) as File | null) : null;
        const data : { type: SECTION_TYPE, orderIndex: number, caption: string | null, sectionId: number, imageUrl?: string} = {
          type,
          orderIndex: item.orderIndex,
          caption: item.caption || null,
          sectionId: section.id,
        };

        if (file) {
          const [filename] = await uploadFile([file], "projects/sections");
          const newUrl = `/images/projects/sections/${filename}`;
          uploadedFiles.push(newUrl);

          const oldImg = oldImages.find((i) => i.orderIndex === item.orderIndex);
          if (oldImg?.imageUrl) deleteQueue.push(oldImg.imageUrl);

          data.imageUrl = newUrl;
        }

        const oldImg = oldImages.find((i) => i.orderIndex === item.orderIndex);
        if (oldImg) {
          await prisma.project_images.update({
            where: { id: oldImg.id },
            data,
          });
        } else {
          await prisma.project_images.create({
            data: { ...data, projectId, imageUrl: data.imageUrl ?? "" },
          });
        }
      }
    };

    // Tiện ích
    if (payload.dataTienIch && payload.dataTienIch.length > 0) {
      await processImages(payload.dataTienIch, "TIEN_ICH", 100); // giả sử orderIndex = 100
    }

    // Thư viện hình ảnh
    if (payload.dataThuVienHinhAnh && payload.dataThuVienHinhAnh.length > 0) {
      await processImages(payload.dataThuVienHinhAnh, "THU_VIEN_HINH_ANH", 200); // orderIndex = 200
    }

    // --- XÓA ẢNH CŨ ---
    if (deleteQueue.length) {
      await Promise.all(deleteQueue.map((p) => deleteFile(p)));
    }

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (err) {
    if (uploadedFiles.length) {
      await Promise.all(uploadedFiles.map((p) => deleteFile(p)));
    }
    console.error("PUT /projects/[id] lỗi:", err);
    return NextResponse.json(
      { message: "Lỗi cập nhật" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const deleteQueue: string[] = [];

  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const { param } = await params;
    const projectId = Number(param);

    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        project_sections: {
          include: { project_images: { select: { imageUrl: true } } },
          select: { imageUrl: true, project_images: true },
        },
        project_images: { select: { imageUrl: true } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    // Thu thập ảnh cần xóa
    if (project.thumbnailUrl) deleteQueue.push(project.thumbnailUrl);
    project.project_sections.forEach((s) => {
      if (s.imageUrl) deleteQueue.push(s.imageUrl);
      s.project_images.forEach((img) => img.imageUrl && deleteQueue.push(img.imageUrl));
    });
    project.project_images.forEach((img) => img.imageUrl && deleteQueue.push(img.imageUrl));

    // Xóa DB (cascade tự xóa sections + images)
    await prisma.projects.delete({
      where: { id: projectId },
    });

    // Xóa file
    if (deleteQueue.length) {
      await Promise.all(deleteQueue.map((p) => deleteFile(p).catch(console.error)));
    }

    return NextResponse.json({ message: "Xóa thành công" });
  } catch (err) {
    console.error("DELETE /projects/[id] lỗi:", err);
    if (deleteQueue.length) {
      await Promise.all(deleteQueue.map((p) => deleteFile(p).catch(console.error)));
    }
    return NextResponse.json(
      { message: "Lỗi xóa" },
      { status: 500 }
    );
  }
}