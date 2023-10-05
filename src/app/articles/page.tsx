import Filtered from '@/components/Article/Filtered';
import Search from '@/components/Article/Search';
import { Metadata } from 'next';
import React from 'react';

import { getArticlesPreview } from './utils/get-articlesPreview';

const description =
  'Leia a produção de artigos do nosso escritório, o seu conteúdo varia entre questões jurídicas, temas acadêmicos, jusfilosóficos e ciências jurídicas';

export const metadata: Metadata = {
  title: 'Artigos',
  description,
};

export default async function Page() {
  const articlesPreview = await getArticlesPreview();

  return (
    <section className="articles-preview mt-14 md:mt-0 pb-2 w-full h-full bg-white flex flex-col flex-nowrap rounded-t-lg rounded-b-3xl overflow-hidden">
      <Search />
      <div className="px-4 md:px-24 xl:px-28 pt-4 w-full h-4/6 flex flex-row flex-wrap justify-between overflow-auto">
        <Filtered articles={articlesPreview} />
      </div>
    </section>
  );
}
