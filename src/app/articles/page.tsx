import Filtered from '@/components/Article/Filtered';
import Search from '@/components/Article/Search';
import React from 'react';

import { getArticlesPreview } from './utils/get-articlesPreview';

export default async function Page() {
  const articlesPreview = await getArticlesPreview();

  return (
    <React.Fragment>
      <Search />
      <div className="px-4 md:px-24 xl:px-28 w-full h-4/6 overflow-auto">
        <Filtered articles={articlesPreview} />
      </div>
    </React.Fragment>
  );
}
