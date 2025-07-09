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

    return NextResponse.json({
      success: true,
      message: "Login successfully",
      accessToken
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Server error, please try again.",
      error: (err as Error).message,
    }, { status: 500 });
  }
}
