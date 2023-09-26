import { cache } from 'react';
import 'server-only';

import { Category } from '../domain/Categories';

export const preload = () => {
  void getCategories();
};

export const getCategories = cache(async () => {
  const res = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/categories?populate=icon`,
    { cache: 'no-store' },
  );

  const { data }: { data: Category[] } = await res.json();
  return data;
});
