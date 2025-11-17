import { MediaEntity } from "./media"

export interface ProjectsEntity {
  id: number
  name: string
  description: string
  fullName: string
  slug: string
  location: string
  totalArea: number
  constructionRate: number
  floorHeightMin: number
  floorHeightMax: number
  type: string
  numberOfUnits: number
  investor: string
  thumbnailId: number
  thumbnail: MediaEntity                    // Populated relation
  backgroundOverviewId: number | null
  backgroundOverview: MediaEntity | null    // Populated relation
  authorId: number
  author: {
    id: number
    fullName: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
  sections: ProjectsSectionsEntity[]
}

export type SECTION_TYPE = "TIEN_ICH" | "THU_VIEN_HINH_ANH" | "NORMAL"

export interface ProjectsSectionsEntity {
  projectId: number
  id: number
  type: SECTION_TYPE
  title: string | null
  caption?: string
  description: string | null
  content?: string
  image?: MediaEntity
  imageUrl?: string
  orderIndex: number
  section_images: ProjectsImagesEntity[]
}

export interface ProjectsImagesEntity {
  id: number
  projectId: number
  type: SECTION_TYPE
  image: MediaEntity
  caption?: string
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}