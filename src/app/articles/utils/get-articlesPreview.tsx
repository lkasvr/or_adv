import qs from 'qs';
import { cache } from 'react';

import 'server-only';
import { ArticlesPreview } from '../domain/Articles';

const query = qs.stringify(
  {
    populate: {
      categories: true,
      subCategories: true,
    },
    fields: ['slug', 'title', 'description', 'imageRelated', 'updatedAt'],
  },
  { encodeValuesOnly: true },
);

export const preload = () => {
  void getArticlesPreview();
};

export const getArticlesPreview = cache(async () => {
  const res = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/articles?${query}`,
  );

  const { data }: ArticlesPreview = await res.json();
  return data;
});
