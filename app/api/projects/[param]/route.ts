// import prisma from "@/lib/db";
import { createSlug } from "@/utils/createSlug";
import prisma from "../../../../lib/prisma"
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

export async function PUT(req: Request, { params }: { params: Promise<{ param: number }> }) {
  let filenames: string[] = [];
  try {
    const { param } = await params;
    if (!param) {
      return NextResponse.json(
        {
          message: 'projects params is required',
        },
        { status: 400 }
      );
    }
    const oldProjects = await prisma.projects.findUnique({
      where: { id: +param },
    });
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
      const updatedProjects = await prisma.$transaction(async (tx) => {
        const projects = await tx.projects.update({
          where: { id: +param },
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
            slug
          },
        });

        return projects;
      });
      return NextResponse.json(
        { updatedProjects },
        { status: 200 }
      );
    }
    await deleteFile(oldProjects?.thumbnailUrl || '');

    filenames = await uploadFile(files, "projects");
    const updatedProjects = await prisma.$transaction(async (tx) => {
      const projects = await tx.projects.update({
        where: { id: +param },
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
          thumbnailUrl: `/images/projects/${filenames[0]}`,
          slug
        },
      });
      return projects;
    })
    return NextResponse.json(
      { updatedProjects },
      { status: 200 }
    );

  } catch (err) {
    if (filenames.length > 0) {
      await deleteFile(filenames[0]);
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ param: number | string }> }) {
  try {
    const { param } = await params;
    if (!isNaN(Number(param))) {
      const projects = await prisma.projects.findUnique({
        where: {
          id: +param
        }
      })
      return NextResponse.json(
        {
          data: projects,
        },
        { status: 200 }
      )
    } else {
      const projects = await prisma.projects.findUnique({
        where: {
          slug: param.toString()
        }
      })
      return NextResponse.json(
        {
          data: projects,
        },
        { status: 200 }
      )
    }

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ param: number }> }) {
  try {
    const { param } = await params;
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    const projects = await prisma.projects.findUnique({
      where: {
        id: +param
      }
    })
    await prisma.projects.delete({
      where: {
        id: +param
      }
    })
    await deleteFile(projects?.thumbnailUrl || "")
    return NextResponse.json(
      {
        message: 'Xóa Dự án thành công',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}