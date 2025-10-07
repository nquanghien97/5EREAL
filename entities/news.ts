export interface NewsEntity {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  authorId: number;
  isHotNews: boolean;
  slug: string;
  createdAt: Date;
  news_sections: NewsSectionEntity[]
}

export interface NewsSectionEntity {
  id: number;
  newsId: number;
  orderIndex: number;
  content: string | null;
  caption: string | null;
  imageUrl: string | null;
}