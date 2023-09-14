'use client';
import ReactIcon from '@/components/ReactIcon';
import { IRootState } from '@/store';
import { setSlugsSelectedCategories } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from './domain/Categories';

interface ICategories {
  categories: Category[];
}

const Categories = ({ categories }: ICategories) => {
  const dispatch = useDispatch();

  const { slugsSelectedCategories } = useSelector(
    (state: IRootState) => state.articles.searchFilters,
  );

  const handleCategoryChange = (slug: string) => {
    if (slugsSelectedCategories.includes(slug))
      return dispatch(
        setSlugsSelectedCategories(
          slugsSelectedCategories.filter(
            (categorySlug) => categorySlug !== slug,
          ),
        ),
      );

    dispatch(setSlugsSelectedCategories([...slugsSelectedCategories, slug]));
  };

  return (
    <fieldset className="w-full h-full xl:w-1/2">
      <section className="w-full flex flex-row flex-wrap justify-center sm:justify-start content-center">
        <legend className="sr-only">Categorias</legend>
        {categories.map(({ attributes: { slug, displayName, icon } }) => {
          const checked = slugsSelectedCategories.includes(slug);
          return (
            <div key={slug} className="m-1">
              <input
                type="checkbox"
                name={slug}
                value={slug}
                id={slug}
                className="peer hidden"
                checked={checked}
                onChange={() => handleCategoryChange(slug)}
              />

              <label
                htmlFor={slug}
                className="flex cursor-pointer items-center justify-start rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:ring-1 peer-checked:border-primary peer-checked:ring-primary"
              >
                {/* ICON */}
                <ReactIcon
                  nameicon={icon.name}
                  lib={icon.lib}
                  className={`h-6 w-6 ${checked ? 'text-primary' : ''}`}
                />
                <p
                  className={`ml-4 text-gray-900 ${
                    checked ? 'font-bold text-primary' : ''
                  }`}
                >
                  {displayName}
                </p>
              </label>
            </div>
          );
        })}
      </section>
    </fieldset>
  );
};

export default Categories;
