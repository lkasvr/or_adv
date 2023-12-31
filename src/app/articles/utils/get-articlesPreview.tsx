import qs from 'qs';
import { cache } from 'react';

import 'server-only';
import { ArticlesPreview } from '../domain/Articles';

const baseUrl =
  process.env.DEVAPI_BASE_URL ?? process.env.ARTICLES_API_BASE_URL;

const query = qs.stringify(
  {
    populate: {
      categories: true,
      subCategories: true,
      coverImage: true,
    },
    fields: ['slug', 'title', 'description', 'updatedAt'],
  },
  { encodeValuesOnly: true },
);

export const preload = () => {
  void getArticlesPreview();
};

export const getArticlesPreview = cache(async () => {
  const res = await fetch(`${baseUrl}/articles?${query}`);

  const { data }: ArticlesPreview = await res.json();

  return data;
});
