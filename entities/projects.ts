import { SECTION_TYPE } from "@prisma/client"
import { UserEntity } from "./user"

export interface ProjectsEntity {
  id: number
  name: string
  fullName: string
  slug: string
  location: string
  totalArea: number //Diện tích (m2)
  constructionRate: number // Mật độ xây dựng (%)
  floorHeightMin: number // Số tầng thấp nhất
  floorHeightMax: number // Số tầng cao nhất
  type: number // Loại hình bất động sản
  numberOfUnits: number // Tổng số căn
  investor: number // Tên chủ đầu tư
  thumbnailUrl: string // URL ảnh đại diện
  authorId: number
  description: string
  author: UserEntity
  createdAt: Date
  updatedAt: Date

  project_sections: ProjectsSectionsEntity[]
  project_images: ProjectsSectionsEntity[]
}

export interface ProjectsSectionsEntity {
  id: number
  projectId: number
  type: SECTION_TYPE
  description?: string
  title: string
  content: string
  imageUrl: string
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}

export interface ProjectsImageEntity {
  id: number,
  projectId: number,
  type: SECTION_TYPE,
  sectionId: number,
  imageUrl: string,
  caption: string,
  orderIndex: number,
  createdAt: Date
}