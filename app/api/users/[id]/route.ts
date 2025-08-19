import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: number } }) {
  const { id } = params


  if (!id) return NextResponse.json(
    {
      message: "Missing user_id",
    },
    { status: 404 }
  )


  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id
      },
      select: {
        id: true,
        phoneNumber: true,
        fullName: true
      }
    })
    return NextResponse.json(
      {
        data: user,
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({
      message: (err as Error).message
    }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: 'User ID is required.' },
      { status: 400 }
    )
  }
  try {
    await prisma.user.delete({
      where: {
        id: +id
      }
    })
    return NextResponse.json({
      message: 'Xóa người dùng thành công'
    })
  } catch (err) {
    return NextResponse.json({
      message: (err as Error).message
    }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { fullName } = await req.json();

  try {
    if (!id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    await prisma.user.update({
      where: {
        id: +id
      },
      data: {
        fullName,
      }
    })
    return NextResponse.json(
      {
        success: true,
        message: 'Cập nhật thông tin thành công'
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({
      message: (err as Error).message
    }, { status: 500 })
  }
}