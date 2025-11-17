import { MediaEntity } from "./media";
import { UserEntity } from "./user";

export interface NewsEntity {
  id: number;
  isHotNews: boolean;
  sections: NewsSectionEntity[];
  slug: string;
  summary: string;
  thumbnail?: MediaEntity | null;
  title: string;
  author: Pick<UserEntity, 'id' | 'fullName'>
  authorId: number;
  createdAt: Date;
}

export interface NewsSectionEntity {
  orderIndex: number;
  caption?: string;
  image?: MediaEntity | null;
  imageId?: number;
  content?: string;
}