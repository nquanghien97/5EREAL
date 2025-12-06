import prisma from "../../../../lib/prisma"
import { NextResponse } from "next/server";
import { deleteFile } from "@/utils/fileUpload";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const image = await prisma.images_review_bds.findUnique({
      where: { id: Number(id) },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Không tìm thấy hình ảnh" },
        { status: 404 }
      );
    }

    // Xóa record trong DB
    await prisma.images_review_bds.delete({ where: { id: Number(id) } });

    // Xóa file vật lý (nếu có)
    try {
      if (image.url) {
        await deleteFile(image.url);
      }
    } catch (fileErr) {
      console.warn("Xóa file thất bại:", fileErr);
    }

    return NextResponse.json(
      { message: "Xóa hình ảnh thành công", id },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 });
  }
}