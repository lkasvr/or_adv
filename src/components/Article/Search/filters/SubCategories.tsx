'use client';
import { IRootState } from '@/store';
import { toggleSelectFilter } from '@/store/appSlice';
import { setSlugsSubCategories } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubCategory } from './domain/SubCategories';

interface ISubCategories {
  subCategories: SubCategory[];
}

const SubCategories = ({ subCategories }: ISubCategories) => {
  const dispatch = useDispatch();

  const { slugsSubCategories } = useSelector(
    (state: IRootState) => state.articles.filters,
  );
  const {
    searchFilters: { isSelectOpen },
  } = useSelector((state: IRootState) => state.app);

  const toggleOption = (slug: string) => {
    if (slugsSubCategories.includes(slug))
      return dispatch(
        setSlugsSubCategories(
          slugsSubCategories.filter(
            (selectedOptionSlug) => selectedOptionSlug !== slug,
          ),
        ),
      );

    dispatch(setSlugsSubCategories([...slugsSubCategories, slug]));
  };

  return (
    <React.Fragment>
      <div className="relative w-1/2 grid grid-cols-2">
        {/* SELECT */}
        {isSelectOpen && subCategories.length !== slugsSubCategories.length && (
          <select
            className="p-1 absolute max-w-max h-full flex flex-row flex-wrap bg-transparent cursor-pointer overflow-y-auto scrollbar-none"
            multiple
            value={slugsSubCategories}
            onChange={(e) => toggleOption(e.target.value)}
          >
            <option className="text-sm text-slate-400 !bg-transparent">
              Selecione uma sub-categoria
            </option>
            {subCategories.map(({ id, attributes: { displayName, slug } }) => {
              const selected = slugsSubCategories.includes(slug);
              return (
                <option
                  key={id}
                  value={slug}
                  className={`ml-1 max-w-max inline-flex items-center justify-center px-2.5 py-0.5 m-1 rounded-full ${
                    selected ? '!hidden' : ''
                  }`}
                >
                  {displayName}
                </option>
              );
            })}
          </select>
        )}
        {/* SELECTED OPTIONS */}
        <div
          className={`h-full ${
            isSelectOpen && subCategories.length !== slugsSubCategories.length
              ? 'col-start-2 w-full bg-white flex flex-row flex-wrap justify-end'
              : 'col-span-full bg-transparent'
          } ${
            !isSelectOpen && slugsSubCategories.length < 1
              ? 'bg-slate-50 border border-dashed border-slate-200 rounded-3xl'
              : ''
          }`}
        >
          {!isSelectOpen && slugsSubCategories.length < 1 ? (
            <div
              className="w-full h-full flex justify-center items-center cursor-pointer"
              onClick={() => dispatch(toggleSelectFilter(true))}
            >
              <p className="text-sm text-slate-400">
                Selecionar sub-categorias
              </p>
            </div>
          ) : (
            ''
          )}
          <p className="text-sm text-slate-400">
            {((!isSelectOpen && slugsSubCategories.length !== 0) ||
              (slugsSubCategories.length > 0 &&
                slugsSubCategories.length === subCategories.length)) &&
              'Subcategorias'}
          </p>
          {slugsSubCategories.map((value) => (
            <span
              key={value}
              className="h-max inline-flex items-center justify-center bg-primary/30 rounded-full px-2.5 py-0.5 text-primary/90 m-1"
            >
              <p className="whitespace-nowrap text-sm">
                {
                  subCategories.find(
                    ({ attributes }) => attributes.slug === value,
                  )?.attributes.displayName
                }
              </p>
              <button
                onClick={() => toggleOption(value)}
                className="ml-1 rounded-full bg-primary/40 p-0.5 text-primary/90 hover:bg-primary/60"
              >
                <span className="sr-only">Remove badge</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubCategories;
