import { ArticlePreviewAttributes } from '@/app/articles/domain/Articles';
import Link from 'next/link';
import React from 'react';

interface IArticle extends ArticlePreviewAttributes {}

const Preview = ({ slug, imageRelated, title, description }: IArticle) => {
  return (
    <article className="group">
      <img
        alt="Lava"
        src={imageRelated}
        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div className="p-4">
        <Link href={`articles/${slug}`}>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </Link>

        <p className="mt-2 ml-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description}
        </p>

        <Link
          href={`articles/${slug}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          Leia mais
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </Link>
      </div>

      <hr className="mt-1 mb-6 h-[1px] w-full text-gray-400" />
    </article>
  );
};

export default Preview;
