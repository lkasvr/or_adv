import Filtered from '@/components/Article/Filtered';
import Search from '@/components/Article/Search';
import React from 'react';

import { getArticlesPreview } from './utils/get-articlesPreview';

export default async function Page() {
  const articlesPreview = await getArticlesPreview();

  return (
    <React.Fragment>
      <Search />
      <div className="mt-8 px-28 w-full h-3/5 overflow-auto">
        <Filtered articles={articlesPreview} />
      </div>
    </React.Fragment>
  );
}
