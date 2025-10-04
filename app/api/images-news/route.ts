// import prisma from "@/lib/db";
import prisma from "../../../lib/prisma"
import { NextResponse } from "next/server";
import { deleteFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function DELETE(req: Request, { params }: { params: Promise<{ newsId: number }> }) {
  try {
    const { newsId } = await params;
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    const news = await prisma.news.findUnique({
      where: {
        id: +newsId
      }
    })
    if (!news) {
      return NextResponse.json(
        { message: 'Tin tức không tồn tại' },
        { status: 404 }
      );
    }
    const images = await prisma.images_content.findMany({
      where: {
        newsId: +newsId
      }
    })
    for (const image of images) {
      await deleteFile(image.url)
    }
    return NextResponse.json(
      {
        message: 'Xóa hình ảnh tin tức thành công',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}