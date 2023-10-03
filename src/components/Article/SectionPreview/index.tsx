'use client';
import { ArticlePreview } from '@/app/articles/domain/Articles';
import ScrollDownIcon from '@/components/ScrollDownIcon';
import { IRootState } from '@/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import Preview from '../Preview';

interface Props {
  articlesPreview: ArticlePreview[];
}

const SectionPreview = ({ articlesPreview }: Props) => {
  const { totalAmount } = useSelector(
    (state: IRootState) => state.articles.articles,
  );

  return (
    <React.Fragment>
      {' '}
      <div className="w-full flex flex-row flex-nowrap justify-between">
        <h3 className="pt-2 pl-2 md:col-span-full md:mb-4 self-start text-2xl text-primary/80 font-extrabold leading-none tracking-tight">
          <Link href="/articles">Artigos</Link>
        </h3>

        {totalAmount > 1 && (
          <div className="self-end">
            <ScrollDownIcon text="role para baixo" />
          </div>
        )}
      </div>
      <hr className="mb-1 h-[1px] w-full text-gray-400" />
      <div className="w-full h-full scrollbar-none overflow-auto">
        {articlesPreview.map(({ attributes }) => (
          <Preview
            key={attributes.slug}
            wrapperClass="h-full py-4"
            {...attributes}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default SectionPreview;
