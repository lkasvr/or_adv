'use client';
import ReactIcon from '@/components/ReactIcon';
import { IRootState } from '@/store';
import { setSlugsCategories } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from './domain/Categories';

interface ICategories {
  categories: Category[];
}

const Categories = ({ categories }: ICategories) => {
  const dispatch = useDispatch();

  const { slugsCategories } = useSelector(
    (state: IRootState) => state.articles.filters,
  );

  const handleCategoryChange = (slug: string) => {
    if (slugsCategories.includes(slug))
      return dispatch(
        setSlugsCategories(
          slugsCategories.filter((categorySlug) => categorySlug !== slug),
        ),
      );

    dispatch(setSlugsCategories([...slugsCategories, slug]));
  };

  return (
    <React.Fragment>
      {categories.map(({ attributes: { slug, displayName, icon } }) => {
        const checked = slugsCategories.includes(slug);
        return (
          <div key={slug} className={'m-1'}>
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
    </React.Fragment>
  );
};

export default Categories;
