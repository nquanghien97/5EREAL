import { ProjectsEntity } from "@/entities/projects";
import prisma from "@/lib/prisma";
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
  return data.data
}

export async function getProjectsByPrisma({ page = 1, pageSize = 3, excludeProjectsSlug }: { page: number, pageSize: number, excludeProjectsSlug?: string }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  try {
    const Projects = await prisma.projects.findMany({
      skip,
      take,
      where: excludeProjectsSlug ? {
        slug: { not: excludeProjectsSlug }
      } : {}
    })
    const total = await prisma.projects.count({
      where: excludeProjectsSlug ? {
        slug: { not: excludeProjectsSlug }
      } : {}
    })
    return NextResponse.json(
      {
        data: Projects,
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