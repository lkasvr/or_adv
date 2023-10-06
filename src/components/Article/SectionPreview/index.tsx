import { ArticlePreview } from '@/app/articles/domain/Articles';
import ScrollDownIcon from '@/components/ScrollDownIcon';
import React from 'react';

import Preview from '../Preview';

interface Props {
  articlesPreview: ArticlePreview[];
}

const SectionPreview = ({ articlesPreview }: Props) => {
  return (
    <div className="relative scrollbar-none overflow-auto">
      {articlesPreview?.length > 1 && (
        <div className="max-2xl:hidden absolute top-0 left-0 w-full flex flex-row flex-nowrap justify-end">
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
