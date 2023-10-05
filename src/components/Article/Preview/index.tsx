import { ArticlePreviewAttributes } from '@/app/articles/domain/Articles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Badge from '../../Badge';
import DateIndicator from '../../DateIndicator';

interface Props extends ArticlePreviewAttributes {
  wrapperClass?: string;
}

const Preview = ({
  slug,
  title,
  coverImage,
  categories,
  description,
  updatedAt,
  wrapperClass,
}: Props) => {
  const {
    alternativeText,
    formats: { large },
  } = coverImage.data.attributes;
  return (
    <article className={`group ${wrapperClass} `}>
      <Link href={`/articles/${slug}`}>
        {' '}
        <Image
          alt={alternativeText ?? 'Capa do artigo'}
          src={large.url}
          width={large.width}
          height={large.height}
          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] hover:cursor-pointer"
        />
      </Link>

      <div className="p-4">
        <div className="flex flex-row flex-nowrap">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          &nbsp;&nbsp;
          {categories.data.map(({ attributes: { slug, displayName } }) => (
            <Badge
              key={slug}
              text={displayName}
              extendedClass="font-bold bg-slate-200 text-slate-600"
            />
          ))}
        </div>

        <p className="mt-2 ml-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description}
        </p>

        <div className="w-full flex flex-row flex-nowrap justify-between">
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
          <DateIndicator legend="última atualização" date={updatedAt} />
        </div>
      </div>

      <hr className="mt-1 mb-6 h-[1px] w-full text-gray-400" />
    </article>
  );
};

export default Preview;
