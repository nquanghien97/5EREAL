import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function POST(req: Request) {
  let filenames: string[] = [];
  try {
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const slug = createSlug(name);
    const location = formData.get('location') as string;
    const totalArea = parseInt(formData.get('totalArea') as string, 10);
    const constructionRate = parseFloat(formData.get('constructionRate') as string);
    const floorHeightMin = parseInt(formData.get('floorHeightMin') as string, 10);
    const floorHeightMax = parseInt(formData.get('floorHeightMax') as string, 10);
    const type = formData.get('type') as string;
    const numberOfUnits = parseInt(formData.get('numberOfUnits') as string, 10);
    const investor = formData.get('investor') as string;
    const content = formData.get('content') as string;
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ message: "Không file nào được chọn" }, { status: 400 });
    }
    filenames = await uploadFile(files, "projects");
    const newProject = await prisma.projects.create({
      data: {
        name,
        location,
        totalArea,
        constructionRate,
        floorHeightMin,
        floorHeightMax,
        type,
        numberOfUnits,
        investor,
        content,
        slug,
        authorId: Number(userId),
        thumbnailUrl: `/images/projects/${filenames[0]}`
      }
    })
    return NextResponse.json({ newProject }, { status: 200 })
  } catch (err) {
    if (filenames.length > 0) {
      await Promise.all(filenames.map((filename) => deleteFile(`/images/projects/${filename}`)));
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10);
  const excludeProjectsSlug = url.searchParams.get('excludeProjectsSlug')

  const skip = (page - 1) * pageSize;
  const take = pageSize;
  try {
    const projects = await prisma.projects.findMany({
      skip,
      take,
      where: excludeProjectsSlug ? {
        slug: { not: excludeProjectsSlug }
      } : {}
    })
    const total = await prisma.news.count({
      where: excludeProjectsSlug ? {
        slug: { not: excludeProjectsSlug }
      } : {}
    })
    return NextResponse.json(
      {
        data: projects,
        paging: {
          page,
          pageSize,
          total
        }
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