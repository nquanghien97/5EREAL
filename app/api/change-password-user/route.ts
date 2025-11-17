import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing userId, password' },
        { status: 400 }
      );
    }

    const author = await getUserFromCookie();
    const authorId = author?.userId;
    const role = author?.role;
    if (!authorId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản này không tồn tại' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: Number(userId)
      },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, message: 'Cập nhật mật khẩu người dùng thành công' },
      { status: 201 }
    );
  } catch (error) {
    console.error('create user Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}