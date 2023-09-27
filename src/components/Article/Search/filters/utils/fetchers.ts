import { Category } from '@/app/api/categories/domain';
import { SubCategory } from '@/app/api/sub-categories/domain';
import { Fetcher } from 'swr';

export const getCategories: Fetcher<Category[], string> = (...args) =>
  fetch(...args, { cache: 'no-store' }).then((res) => res.json());

export const getSubCategories: Fetcher<SubCategory[], string> = (...args) =>
  fetch(...args, { cache: 'no-store' }).then((res) => res.json());
