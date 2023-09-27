import { Categories } from '@/app/api/categories/domain';
import { SubCategories } from '@/app/api/sub-categories/domain';

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
  authors: authors;
  categories: Categories;
  subCategories: SubCategories;
  metadata: metadata;
  updatedAt: string;
  publishedAt: string;
  createdAt: string;
};

export type authors = {
  data: author[];
};

export type author = {
  id: number;
  attributes: {
    slug: string;
    name: string;
    displayName: string;
    email: string;
    url: string;
    updatedAt: string;
    createdAt: string;
  };
};

export type metadata = {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      applicationName: string;
      keywords: string;
      creator: string;
      referrer: string;
      publisher: string;
      category: string;
    };
  };
};

// SPECIFIC TYPE FOR USE CASE'S
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
