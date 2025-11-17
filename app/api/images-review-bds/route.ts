import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function POST(req: Request) {
  let uploaded: { filename: string, url: string, mimeType: string }[] = [];
  try {
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const formData = await req.formData();
    const files = Array.from(formData.values()).filter(
      (value): value is File => value instanceof File
    );
    const coordinatesId = formData.get("coordinatesId") as string | null;
    const lat = formData.get("lat") as string | null
    const lng = formData.get("lng") as string | null

    if (!userId) {
      return NextResponse.json(
        { message: "Không xác thực được user" },
        { status: 401 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { message: "Không file nào được chọn" },
        { status: 400 }
      );
    }

    // upload và lấy tên file
    uploaded = await uploadFile(files, "images-review-bds");
    let newCoordinatesId: number;

    if(!coordinatesId) {
      const result = await prisma.coordinates.create({
        data: {
          userId: Number(userId),
          lat: Number(lat),
          lng: Number(lng),
          note: "",
        },
      });
      newCoordinatesId = result.id;
    }

    const data = uploaded.map((f) => ({
      userId: Number(userId),
      url: f.url,
      coordinatesId: Number(coordinatesId) || newCoordinatesId,
    }));

    // transaction để đảm bảo consistency
    const listNewImages = await prisma.$transaction(async (tx) => {
      await tx.images_review_bds.createMany({
        data,
        skipDuplicates: true,
      });

      return tx.images_review_bds.findMany({
        where: {
          userId: Number(userId),
          coordinatesId: Number(coordinatesId) || newCoordinatesId,
          url: { in: data.map((d) => d.url) },
        },
      });
    });

    return NextResponse.json(
      { images: listNewImages, message: "Thêm hình ảnh thành công" },
      { status: 200 }
    );
  } catch (err) {
    // rollback file nếu có lỗi
    if (uploaded.length > 0) {
      await Promise.all(
        uploaded.map((f) =>
          deleteFile(f.url)
        )
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 });
    }
  }
}


export async function GET(req: Request) {
  const url = new URL(req.url);
  const coordinatesId = url.searchParams.get('coordinatesId')

  try {
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const listImages = await prisma.images_review_bds.findMany({
      where: {
        coordinatesId: Number(coordinatesId),
        userId: Number(userId)
      }
    })
    return NextResponse.json(
      {
        data: listImages
      },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}