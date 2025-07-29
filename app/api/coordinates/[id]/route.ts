import prisma from "@/lib/prisma";
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

export async function DELETE(req: NextRequest, { params } : { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const userId = req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Xóa theo user và tọa độ
    await prisma.coordinates.deleteMany({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Coordinate deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting coordinate:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}