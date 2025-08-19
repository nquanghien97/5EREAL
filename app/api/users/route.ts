import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function GET(req: Request) {
  const user_id = req.headers.get('x-user-id');
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize');
  const search = url.searchParams.get('search');

  // Chuyển đổi các tham số thành số nguyên, nếu có
  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;
  try {
    let skip: number | undefined;
    let take: number | undefined;

    if (page !== null && pageSize !== null) {
      skip = (page - 1) * pageSize;
      take = pageSize;
    }

    if (!user_id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const whereCondition: Prisma.userWhereInput = {
      role: {
        not: 'ADMIN'
      },
      ...(search && {
      OR: [
        { phoneNumber: { contains: search } },
        { fullName: { contains: search } },
      ],
    }),
    }

    const user = await prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        phoneNumber: true,
        fullName: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      },
      skip,
      take
    })
    const total = await prisma.user.count({
      where: whereCondition
    })
    return NextResponse.json(
      {
        data: user,
        paging: {
          page,
          pageSize,
          total
        }
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({
      message: (err as Error).message
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, password, fullName } = await req.json();

    if (!phoneNumber || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: 'Missing phone number, password or full name' },
        { status: 400 }
      );
    }

    const author = await getUserFromCookie();
    const userId = author?.userId;
    const role = author?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
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
      data: { phoneNumber, fullName, password: hashedPassword, role: 'STAFF' },
      select: { id: true, fullName: true, phoneNumber: true, role: true, createdAt: true },
    });

    return NextResponse.json(
      { success: true, message: 'User created successfully', user },
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