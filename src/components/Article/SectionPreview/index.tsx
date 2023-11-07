import { ArticlePreview } from '@/app/articles/domain/Articles';
import ScrollDownIcon from '@/components/ScrollDownIcon';
import React from 'react';

import Preview from '../Preview';

interface Props {
  articlesPreview: ArticlePreview[];
  wrapperClass?: string;
}

const SectionPreview = ({ articlesPreview, wrapperClass }: Props) => {
  return (
    <div className={`relative scrollbar-none overflow-auto ${wrapperClass}`}>
      {articlesPreview?.length > 1 && (
        <div className="max-2xl:hidden absolute top-0 right-10 w-full flex flex-row flex-nowrap justify-end">
          <ScrollDownIcon text="role para baixo" initialY={25} targetY={50} />
        </div>
      )}

      {articlesPreview.map(({ attributes }) => (
        <Preview
          key={attributes.slug}
          wrapperClass="2xl:h-full flex flex-row flex-wrap md:flex-col justify-center"
          {...attributes}
        />
      ))}
    </div>
  );
};

export default SectionPreview;
