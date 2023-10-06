'use client';
import { ArticlePreview } from '@/app/articles/domain/Articles';
import { resetStringToCompare } from '@/components/Form/inputs/utils/formatters';
import { IRootState } from '@/store';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Preview from '../Preview';

interface Props {
  articles: ArticlePreview[];
}

const Filtered = ({ articles }: Props) => {
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
          resetStringToCompare(title).includes(
            resetStringToCompare(searchByTitle),
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
      {filteredArticles.map(({ attributes }) => (
        <Preview
          key={attributes.slug}
          wrapperClass="h-full 2xl:w-[48%]"
          {...attributes}
        />
      ))}
    </React.Fragment>
  );
};

export default Filtered;
