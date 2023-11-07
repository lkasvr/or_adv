import { getArticle } from '@/app/articles/utils/get-article';
import Image from 'next/image';
import React from 'react';

import Badge from '../Badge';
import DateIndicator from '../DateIndicator';
import ShareButtons from '../ShareButtons';

export const preload = (slug: string) => {
  void getArticle(slug);
};

const Article = async ({ slug }: { slug: string }) => {
  const url = `${process.env.NEXTAUTH_URL}/articles/${slug}`;

  const {
    attributes: {
      title,
      content,
      authors,
      categories,
      subCategories,
      coverImage,
      updatedAt,
      publishedAt,
    },
  } = await getArticle(slug);

  const {
    alternativeText,
    formats: { large },
  } = coverImage.data.attributes;

  return (
    <article className="group flex flex-col">
      <div className="m-2 pr-1 w-1/5 self-end">
        <ShareButtons url={url} title={title} />
      </div>
      {/* SET UP IMAGES 1640  x 224 */}
      <Image
        alt={alternativeText ?? 'Capa do Artigo'}
        src={large.url}
        width={large.width}
        height={large.height}
        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div className="p-2 w-full">
        <div className="w-full flex flex-row flex-wrap justify-end items-start">
          <DateIndicator
            legend="última atualização"
            date={updatedAt}
            wrapperClass="mt-1 mb-2 md:mt-4 text-[12px] max-md:leading-4 md:text-sm font-medium text-primary"
          />
        </div>
        <div className="flex flex-row flex-wrap">
          <h3 className="text-2xl md:text-3xl font-medium text-gray-900">
            {title}
          </h3>
          &nbsp;&nbsp;
          {categories.data.map(({ attributes: { slug, displayName } }) => (
            <Badge
              key={slug}
              text={displayName}
              extendedClass="font-bold bg-slate-200 text-slate-600"
            />
          ))}
          {subCategories.data.length > 0 && (
            <div className="ml-6 mt-4 md:mt-2 w-full flex flex-row flex-wrap justify-start">
              <span className="w-full text-base text-primary">
                Temas relacionados:
              </span>
              <div className="py-2 px-10 w-full flex flex-row flex-wrap justify-start">
                {subCategories.data.map(
                  ({ attributes: { slug, displayName } }) => (
                    <Badge
                      key={slug}
                      text={displayName}
                      extendedClass="bg-transparent text-slate-500"
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="mt-2 p-2 md:mt-4 md:p-4 text-justify text-lg/relaxed text-gray-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="w-full flex flex-row justify-between items-end ">
          <DateIndicator
            legend="publicado"
            date={publishedAt}
            wrapperClass="max-md:text-[12px] max-md:leading-4 text-primary/75"
          />
          <div className="w-1/3 flex flex-row flex-wrap justify-end">
            {authors.data.map(({ attributes: { slug, displayName } }, i) => (
              <span
                key={slug}
                className="text-slate-500 text-sm italic max-md:text-[12px] max-md:leading-4"
              >
                {!displayName ? 'desconhecido' : displayName}
                {authors.data.length === i + 1 ? '' : ','}&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
