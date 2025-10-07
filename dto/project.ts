import { SECTION_TYPE } from "@prisma/client"

type SectionImage = {
  file?: File;
  url?: string;
  caption?: string;
};

export interface ProjectsSectionDTO {
  type: SECTION_TYPE
  title?: string
  content?: string
  images?: SectionImage[]
  orderIndex: number
  imageUrl?: string | null
  description?: string
}