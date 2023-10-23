import qs from 'qs';
import { cache } from 'react';

import 'server-only';
import { Article } from '../domain/Articles';

const baseUrl =
  process.env.DEVAPI_BASE_URL ?? process.env.ARTICLES_API_BASE_URL;

const query = (slug: string) =>
  qs.stringify(
    {
      populate: {
        authors: true,
        categories: true,
        subCategories: true,
        metadata: {
          populate: { robots: true },
        },
        coverImage: true,
      },
      filters: {
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true },
  );

export const getArticle = cache(async (slug: string) => {
  const res = await fetch(`${baseUrl}/articles?${query(slug)}`);

  const { data }: { data: Article[] } = await res.json();

  return data[0];
});
