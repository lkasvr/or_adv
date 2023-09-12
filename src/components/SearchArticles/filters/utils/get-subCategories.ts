import { cache } from 'react';
import 'server-only';

import { SubCategory } from '../SubCategories';

export const preload = () => {
  void getSubCategories();
};

export const getSubCategories = cache(async () => {
  const res = await fetch('http://127.0.0.1:1337/api/sub-categories');

  const { data }: { data: SubCategory[] } = await res.json();
  return data;
});
