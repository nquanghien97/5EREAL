import prisma from "@/lib/prisma";
import { createToken } from "@/utils/token";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { phoneNumber, password } = await req.json();

  if (!phoneNumber || !password) {
    return NextResponse.json({
      success: false,
      message: "Missing phone number or password"
    }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Incorrect phone number or password"
      }, { status: 400 });
    }

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      return NextResponse.json({
        success: false,
        message: "Incorrect phone number or password"
      }, { status: 400 });
    }

    const accessToken = await createToken(user.id, user.role, user.phoneNumber);
    const userResponse = {
      id: user.id,
      role: user.role,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      createdAt: user.createdAt,
    }

    // Tạo response JSON
    const response = NextResponse.json({
      success: true,
      message: "Login successfully",
      user: userResponse
    }, { status: 200 });

    // Set HttpOnly cookie
    response.cookies.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chỉ secure ở môi trường production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 ngày
    });

    return response;

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Server error, please try again.",
      error: (err as Error).message,
    }, { status: 500 });
  }
}
