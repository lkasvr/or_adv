import Card from '@/components/Card';
import SearchArticles from '@/components/SearchArticles';
import React from 'react';

export default function Page() {
  return (
    <React.Fragment>
      <SearchArticles />
      <div className="mt-8 px-28 w-full h-3/5 overflow-auto scrollbar-none">
        <div className="h-full mb-8">
          <Card />
        </div>
        <div className="h-full mb-8">
          <Card />
        </div>
        <div className="h-full mb-8">
          <Card />
        </div>
      </div>
    </React.Fragment>
  );
}
