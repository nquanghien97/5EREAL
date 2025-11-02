import { getUserFromCookie } from "@/lib/getUserFromCookie"
import prisma from "@/lib/prisma"
import { createSlug } from "@/utils/createSlug"
import { deleteFile, uploadFile } from "@/utils/fileUpload"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ param: string }> }) {
  try {
    const { param } = await params
    const news = await prisma.news.findUnique({
      where: { id: Number(param) },
      include: {
        author: { select: { id: true, fullName: true } },
        news_sections: {
          orderBy: { orderIndex: "asc" },
        },
      },
    })

    if (!news) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 })
    }

    return NextResponse.json({ news }, { status: 200 })
  } catch (err) {
    console.error("Lỗi lấy news:", err)
    return NextResponse.json({ message: "Lỗi khi lấy bài viết" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const uploadedFiles: string[] = [];
  const deleteQueue: string[] = [];

  try {
    // --- Kiểm tra quyền ---
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const { param } = await params;
    const id = Number(param);
    const formData = await req.formData();

    // --- Dữ liệu cơ bản ---
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const isHotNews = formData.get("isHotNews") === "true";
    const thumbnail = formData.get("thumbnail") as File | null;

    // --- Lấy bài viết cũ ---
    const oldNews = await prisma.news.findUnique({
      where: { id },
      include: { news_sections: true },
    });

    if (!oldNews) {
      return NextResponse.json(
        { message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    // --- Xử lý thumbnail ---
    let thumbnailUrl = oldNews.thumbnail;
    if (thumbnail) {
      const [filename] = await uploadFile([thumbnail], "news");
      thumbnailUrl = `/images/news/${filename}`;
      uploadedFiles.push(thumbnailUrl);
      if (oldNews.thumbnail) deleteQueue.push(oldNews.thumbnail);
    }

    // --- Cập nhật bài viết chính ---
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        summary,
        slug: createSlug(title),
        isHotNews,
        thumbnail: thumbnailUrl,
      },
    });

    // --- LẤY DANH SÁCH SECTION MỚI TỪ FORM ---
    const incomingSections = [];
    let i = 0;
    while (true) {
      const raw = formData.get(`section_${i}`);
      if (!raw) break;
      const section = JSON.parse(raw as string);
      section.orderIndex = Number(section.orderIndex); // Đảm bảo là số
      incomingSections.push(section);
      i++;
    }

    // Sắp xếp theo orderIndex để đảm bảo thứ tự
    incomingSections.sort((a, b) => a.orderIndex - b.orderIndex);
    const oldSections = [...oldNews.news_sections].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );

    // --- XÁC ĐỊNH: CẬP NHẬT, TẠO MỚI, XÓA DỰA TRÊN orderIndex ---
    const incomingOrderIndices = incomingSections.map((s) => s.orderIndex);

    // Section bị xóa: có trong DB nhưng không có trong form
    const removedSections = oldSections.filter(
      (s) => !incomingOrderIndices.includes(s.orderIndex)
    );

    if (removedSections.length) {
      await prisma.news_sections.deleteMany({
        where: { id: { in: removedSections.map((s) => s.id) } },
      });
      removedSections.forEach(
        (s) => s.imageUrl && deleteQueue.push(s.imageUrl)
      );
    }

    // --- CẬP NHẬT HOẶC TẠO MỚI TỪNG SECTION ---
    let fileIndex = 0;
    for (const section of incomingSections) {
      const file = formData.get(`section_image_${fileIndex}`) as File | null;

      const data : { caption: string, content: string, orderIndex: number, imageUrl?: string | null} = {
        caption: section.caption || null,
        content: section.content || null,
        orderIndex: section.orderIndex,
      };

      // === CHỈ THAY ĐỔI ẢNH KHI CÓ FILE MỚI ===
      if (file) {
        const [filename] = await uploadFile([file], "news/sections");
        const newImageUrl = `/images/news/sections/${filename}`;
        uploadedFiles.push(newImageUrl);

        // Tìm section cũ có cùng orderIndex
        const oldSec = oldSections.find(
          (s) => s.orderIndex === section.orderIndex
        );
        if (oldSec?.imageUrl) {
          deleteQueue.push(oldSec.imageUrl);
        }

        data.imageUrl = newImageUrl;
      }
      // Không có file → KHÔNG thêm imageUrl → giữ nguyên ảnh cũ

      // === UPDATE HOẶC CREATE ===
      const oldSec = oldSections.find(
        (s) => s.orderIndex === section.orderIndex
      );

      if (oldSec) {
        // Cập nhật section cũ
        await prisma.news_sections.update({
          where: { id: oldSec.id },
          data,
        });
      } else {
        // Tạo section mới
        await prisma.news_sections.create({
          data: {
            ...data,
            newsId: id,
          },
        });
      }

      fileIndex++;
    }

    // --- XÓA CÁC FILE CŨ SAU KHI THÀNH CÔNG ---
    if (deleteQueue.length) {
      await Promise.all(deleteQueue.map((path) => deleteFile(path)));
    }

    return NextResponse.json({
      message: "Cập nhật bài viết thành công",
      news: updatedNews,
    });
  } catch (err) {
    // --- ROLLBACK: XÓA FILE ĐÃ UPLOAD NẾU LỖI ---
    if (uploadedFiles.length) {
      await Promise.all(uploadedFiles.map((path) => deleteFile(path)));
    }
    console.error("PUT /news lỗi:", err);
    return NextResponse.json(
      { message: "Lỗi cập nhật bài viết" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const deleteQueue: string[] = []; // Danh sách file cần xóa

  try {
    // --- Kiểm tra quyền ---
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const { param } = await params;
    const id = Number(param);

    // --- Lấy bài viết + section + ảnh ---
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        news_sections: {
          select: {
            imageUrl: true,
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

    // --- Thu thập tất cả ảnh cần xóa ---
    if (news.thumbnail) {
      deleteQueue.push(news.thumbnail);
    }

    news.news_sections.forEach((section) => {
      if (section.imageUrl) {
        deleteQueue.push(section.imageUrl);
      }
    });

    // --- XÓA DỮ LIỆU TRONG DB ---
    // Prisma tự xóa section do có cascade
    await prisma.news.delete({
      where: { id },
    });

    // --- XÓA ẢNH TRÊN SERVER ---
    if (deleteQueue.length > 0) {
      await Promise.all(
        deleteQueue.map((path) => deleteFile(path).catch(console.error))
      );
    }

    return NextResponse.json({
      message: "Xóa bài viết thành công",
    });
  } catch (err) {
    console.error("DELETE /news lỗi:", err);

    // Nếu có lỗi, vẫn cố xóa ảnh đã thêm vào queue (nếu có)
    if (deleteQueue.length > 0) {
      await Promise.all(
        deleteQueue.map((path) => deleteFile(path).catch(console.error))
      );
    }

    return NextResponse.json(
      { message: "Lỗi khi xóa bài viết" },
      { status: 500 }
    );
  }
}