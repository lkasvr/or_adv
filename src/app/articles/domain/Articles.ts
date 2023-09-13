import { Category } from '@/components/Article/Search/filters/domain/Categories';

// MAIN
export type Articles = { data: Article[] };

export type Article = {
  id: number;
  attributes: Attributes;
};

export type Attributes = {
  slug: string;
  title: string;
  description: string;
  content: string;
  imageRelated: string;
  categories: { data: Category[] };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

// SPECIFIC TYPE USE CASE
export type ArticlesSlug = {
  data: {
    id: number;
    attributes: Omit<
      Attributes,
      | 'title'
      | 'description'
      | 'content'
      | 'publishedAt'
      | 'createdAt'
      | 'updatedAt'
    >;
  }[];
};

export type ArticlesPreview = {
  data: ArticlePreview[];
};

export type ArticlePreview = {
  id: number;
  attributes: ArticlePreviewAttributes;
};

export type ArticlePreviewAttributes = Omit<
  Attributes,
  'content' | 'publishedAt' | 'createdAt'
>;
