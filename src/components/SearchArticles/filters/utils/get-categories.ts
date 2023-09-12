import { cache } from 'react';
import 'server-only';

import { Category } from '../Categories';

export const preload = () => {
  void getCategories();
};

export const getCategories = cache(async () => {
  const res = await fetch('http://127.0.0.1:1337/api/categories?populate=icon');

  const { data }: { data: Category[] } = await res.json();
  return data;
});
