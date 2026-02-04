// app/api/upload-images/route.ts
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/utils/fileUpload";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN" && user.role !== "STAFF") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploaded = await uploadFile(files, 'images-section') as { url: string, mimeType: string, filename: string }[];

    await prisma.images.createMany({
      data: uploaded.map((f) => ({
        url: f.url,
        mimeType: f.mimeType,
        alt: f.filename,
      })),
    });

    return NextResponse.json({
      message: 'Tải hình ảnh thành công',
      uploaded
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const listImages = await prisma.images.findMany();

    return NextResponse.json({
      message: 'Lấy danh sách hình ảnh thành công',
      listImages
    }, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/news error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
