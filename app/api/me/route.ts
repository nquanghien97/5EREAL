import prisma from "@/lib/prisma";
import { verifyToken } from "@/utils/token";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const authorization = req.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const userParse = await verifyToken(token)
    if (!userParse || !userParse.userId) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }


    const dataUser = await prisma.user.findUnique({
      where: {
        id: Number(userParse.userId),
      },
      select: {
        id: true,
        createdAt: true,
        fullName: true,
        phoneNumber: true,
        role: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: "Success",
      user: dataUser
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        success: false,
        message: "Server error, please try again.",
        error: err.message,
      }, { status: 500 });
    }
  }
}