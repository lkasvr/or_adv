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
    <div className="md:px-4 xl:px-5 2xl:p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      {' '}
      <section className="articles-preview pb-2 w-full h-full bg-white flex flex-col flex-nowrap rounded-t-lg rounded-b-3xl overflow-hidden">
        <Search />
        <div
          className="
        px-4 md:px-12 lg:px-20 xl:px-28 pt-12 xl:pt-4 2xl:pt-2
        w-full max-[375px]:h-4/6 h-4/6 max-lg:h-[55%] lg:h-4/6
        overflow-x-hidden overflow-auto"
        >
          <Filtered articles={articlesPreview} />
        </div>
      </section>
    </div>
  );
}
