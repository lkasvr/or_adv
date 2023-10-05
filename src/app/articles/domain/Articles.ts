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
  authors: Authors;
  categories: Categories;
  subCategories: SubCategories;
  metadata: Metadata;
  coverImage: CoverImage;
  updatedAt: string;
  publishedAt: string;
  createdAt: string;
};

export type Authors = {
  data: Author[];
};

export type Author = {
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

export type Metadata = {
  keywords: string;
  referrer: string;
  publisher: string;
};

export type CoverImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats: ImageFormats;
      url: string;
    };
  };
};

export type ImageFormats = {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
};

export type ImageFormat = {
  width: number;
  height: number;
  url: string;
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
