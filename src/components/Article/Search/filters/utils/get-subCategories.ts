import { cache } from 'react';

import 'server-only';
import { SubCategory } from '../domain/SubCategories';

export const preload = () => {
  void getSubCategories();
};

export const getSubCategories = cache(async () => {
  const res = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/sub-categories`,
  );

  const { data }: { data: SubCategory[] } = await res.json();
  return data;
});
