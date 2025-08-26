import prisma from "@/lib/prisma";
import { deleteFile } from "@/utils/fileUpload";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { note } = await req.json()
    await prisma.coordinates.update({
      where: {
        id: Number(id)
      },
      data: {
        note
      }
    })
    return NextResponse.json({ message: "Update Coordinates successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Tìm tất cả ảnh thuộc tọa độ & user
    const listImages = await prisma.images_review_bds.findMany({
      where: {
        coordinatesId: Number(id),
        userId: Number(userId),
      },
    });

    // Transaction xoá DB: ảnh + coordinate
    await prisma.$transaction([
      prisma.images_review_bds.deleteMany({
        where: { coordinatesId: Number(id), userId: Number(userId) },
      }),
      prisma.coordinates.deleteMany({
        where: { id: Number(id), userId: Number(userId) },
      }),
    ]);

    // Sau khi DB đã xoá, mới xoá file vật lý
    if (listImages.length > 0) {
      await Promise.all(
        listImages.map((image) =>
          deleteFile(image.url).catch((err) =>
            console.warn(`Không xoá được file ${image.url}:`, err)
          )
        )
      );
    }

    return NextResponse.json({ message: "Coordinate và ảnh đã xoá" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting coordinate:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
