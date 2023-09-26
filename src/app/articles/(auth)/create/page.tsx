import { getCategories } from '@/components/Article/Search/filters/utils/get-categories';
import { getSubCategories } from '@/components/Article/Search/filters/utils/get-subCategories';
import ArticleForm from '@/components/Form/ArticleForm';
import React from 'react';

export default async function Page() {
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  return (
    <section className="articles-create-auth">
      <ArticleForm categories={categories} subCategories={subCategories} />
    </section>
  );
}
