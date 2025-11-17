import { ProjectsEntity } from "@/entities/projects";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getProjects({ page, pageSize, excludeProjectsSlug }: { page?: number, pageSize?: number, excludeProjectsSlug?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (excludeProjectsSlug) params.append('excludeProjectsSlug', excludeProjectsSlug.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?${params.toString()}`)
  return res.json()
}

export async function getFirstProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?page=1&pageSize=1`)
  return res.json()
}

export async function getProjectsBySlug(slug: string): Promise<ProjectsEntity> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${slug}`)
  const data = await res.json()
  return data.project
}

export async function getProjectsByPrisma({ page, pageSize, excludeProjectsSlug }: { page?: number, pageSize?: number, excludeProjectsSlug?: string }) {
  let skip: number | undefined;
  let take: number | undefined;

  // Nếu có pageSize thì mới phân trang
  if (pageSize && page) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }

  try {
    const whereCondition: Prisma.projectsWhereInput = {
      ...(excludeProjectsSlug ? {
        slug: { not: excludeProjectsSlug }
      } : {}),
    };

    const projectsList = await prisma.projects.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      include: {
        thumbnail: true,
        author: { select: { id: true, fullName: true } },
        sections: {
          include: {
            section_images: {
              orderBy: { orderIndex: 'asc' },
              include: { image: true }
            }
          }
        }
      },
      ...(pageSize ? { skip, take } : {}) // 👈 Chỉ thêm vào options nếu có phân trang
    });

    const total = await prisma.projects.count({
      where: whereCondition
    });

    return NextResponse.json({
      projects: projectsList,
      paging: pageSize ? { page, pageSize, total } : undefined
    });
  } catch (error) {
    console.error("❌ GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
