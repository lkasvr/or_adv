'use client';
import { ArticlePreview } from '@/app/articles/domain/Articles';
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
          title
            .normalize('NFD') // converte caracteres acentuados (diacríticos) em sua forma equivalente sem acentos
            .replace(/[\u0300-\u036f]/g, '') // remove todos os caracteres que não são letras (acentos, cedilhas e outros caracteres especiais) da string
            .replace(/\s/g, '') // remove todos os espaços em branco da string, substituindo-os por uma string vazia ''
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
      {filteredArticles.map(({ attributes }) => (
        <Preview
          key={attributes.slug}
          wrapperClass="h-full py-2"
          {...attributes}
        />
      ))}
    </React.Fragment>
  );
};

export default Filtered;
