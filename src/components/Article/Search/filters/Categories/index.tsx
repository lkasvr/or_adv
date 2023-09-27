'use client';
import { Category } from '@/app/api/categories/domain';
import Loading from '@/components/Loading';
import ReactIcon from '@/components/ReactIcon';
import { IRootState } from '@/store';
import { setSlugsSelectedCategories } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

import { getCategories } from '../utils/fetchers';

const Categories = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR<Category[]>(
    '/api/categories',
    getCategories,
  );

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
      {isLoading ? (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <Loading type="spinningBubbles" width={42} height={42} />
        </div>
      ) : (
        <section className="w-full flex flex-row flex-wrap justify-center sm:justify-start content-center m-">
          <legend className="sr-only">Categorias</legend>
          {error ? (
            <p className="text-sm text-red-500">Algo deu errado...</p>
          ) : (
            data?.map(({ attributes: { slug, displayName, icon } }) => {
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
            })
          )}
        </section>
      )}
    </fieldset>
  );
};

export default Categories;
