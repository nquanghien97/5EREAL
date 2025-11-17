import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { deleteFile } from "@/utils/fileUpload";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Bạn không có quyền thực hiện hành động này" },
        { status: 403 }
      );
    }
    const { id } = await params;
    const imageId = Number(id);

    if (isNaN(imageId)) {
      return NextResponse.json({
        message: 'ID không hợp lệ',
      }, { status: 400 });
    }

    const currentImage = await prisma.images.findUnique({
      where: {
        id: imageId
      }
    });

    if (!currentImage) {
      return NextResponse.json({
        message: 'Hình ảnh không tồn tại',
      }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.images.delete({
        where: {
          id: imageId
        }
      });

      await deleteFile(currentImage.url);
    });

    return NextResponse.json({
      message: 'Xóa hình ảnh thành công',
    }, { status: 200 });

  } catch (error) {
    console.error("❌ DELETE /api/images/[id] error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Hình ảnh đã được sử dụng, không thể xóa",
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Đã xảy ra lỗi không xác định" },
      { status: 500 }
    );
  }
}