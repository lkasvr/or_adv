'use client';
import { ArticlePreview } from '@/app/articles/domain/Articles';
import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface IFiltrered {
  articles: ArticlePreview[];
}

const Filtered = ({ articles }: IFiltrered) => {
  const { searchByTitle, slugsSelectedCategories, slugsSelectedSubCategories } =
    useSelector((state: IRootState) => state.articles.searchFilters);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const { title, categories, subCategories } = article.attributes;

        const hasCategory =
          slugsSelectedCategories.length === 0 ||
          categories.data.some((articleCategory) =>
            slugsSelectedCategories.includes(articleCategory.attributes.slug),
          );

        const hasSubCategory =
          slugsSelectedSubCategories.length === 0 ||
          subCategories.data.some((articleSubCategory) =>
            slugsSelectedSubCategories.includes(
              articleSubCategory.attributes.slug,
            ),
          );

        const matchTitle =
          searchByTitle.length === 0 ||
          title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .toUpperCase()
            .includes(
              searchByTitle
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s/g, '')
                .toUpperCase(),
            );

        return hasCategory && hasSubCategory && matchTitle;
      }),
    [
      articles,
      searchByTitle,
      slugsSelectedCategories,
      slugsSelectedSubCategories,
    ],
  );

  return (
    <React.Fragment>
      {filteredArticles.map(
        ({ id, attributes: { slug, imageRelated, title, description } }) => (
          <article key={id} className="group h-full py-2">
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
        ),
      )}
    </React.Fragment>
  );
};

export default Filtered;
