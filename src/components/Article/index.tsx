import { getArticle } from '@/app/articles/utils/get-article';
import React from 'react';

import Badge from '../Badge';
import DateIndicator from '../DateIndicator';
import ShareButtons from '../ShareButtons';

export const preload = (slug: string) => {
  void getArticle(slug);
};

const Article = async ({ slug }: { slug: string }) => {
  const {
    attributes: {
      title,
      content,
      authors,
      categories,
      subCategories,
      updatedAt,
      publishedAt,
    },
  } = await getArticle(slug);

  return (
    <article className="group flex flex-col">
      <div className="m-2 pr-1 w-1/5 self-end">
        <ShareButtons slug={slug} title={title} />
      </div>
      <img
        alt="Lava"
        src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div className="p-2 w-full">
        <div className="w-full flex flex-row flex-wrap justify-end items-start">
          <DateIndicator legend="última atualização" date={updatedAt} />
        </div>
        <div className="flex flex-row flex-wrap">
          <h3 className="text-3xl font-medium text-gray-900">{title}</h3>
          &nbsp;&nbsp;
          {categories.data.map(({ attributes: { slug, displayName } }) => (
            <Badge
              key={slug}
              text={displayName}
              extendedClass="font-bold bg-slate-200 text-slate-600"
            />
          ))}
          <div className="ml-6 mt-2 w-full flex flex-row flex-wrap justify-start">
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
        </div>

        <div
          className="mt-4 p-4 text-justify text-lg/relaxed text-gray-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="w-full flex flex-row justify-between items-end ">
          <DateIndicator
            legend="publicado"
            date={publishedAt}
            wrapperClass="text-primary/75"
          />
          <div className="w-1/3 flex flex-row flex-wrap justify-end">
            {authors.data.map(({ attributes: { slug, displayName } }, i) => (
              <span key={slug} className="text-slate-500 text-sm italic">
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
