import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createToken } from '@/utils/token';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, password, fullName } = await req.json();

    if (!phoneNumber || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: 'Missing phone number, password or full name' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Phone number already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { phoneNumber, fullName, password: hashedPassword },
      select: { id: true, fullName: true, phoneNumber: true, role: true, createdAt: true },
    });

    // Tạo access_token
    const accessToken = await createToken(user.id, user.role, user.phoneNumber);

    // Lưu cookie HttpOnly
    (await
      // Lưu cookie HttpOnly
      cookies()).set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 ngày
    });

    return NextResponse.json(
      { success: true, message: 'Register & login successfully', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
