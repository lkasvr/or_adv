'use client';
import { SubCategory } from '@/app/api/sub-categories/domain';
import Loading from '@/components/Loading';
import { IRootState } from '@/store';
import {
  toggleSelectFilter,
  setSlugsSelectedSubCategories,
  setSubCategoriesTotalAmount,
} from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

import { getSubCategories } from '../utils/fetchers';

const SubCategories = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR<SubCategory[]>(
    '/api/sub-categories',
    getSubCategories,
  );

  const { selectSubCategories, slugsSelectedSubCategories } = useSelector(
    (state: IRootState) => state.articles.searchFilters,
  );

  React.useEffect(() => {
    if (data) dispatch(setSubCategoriesTotalAmount(data.length));
  }, [isLoading]);

  const toggleOption = (slug: string) => {
    if (slugsSelectedSubCategories.includes(slug))
      return dispatch(
        setSlugsSelectedSubCategories(
          slugsSelectedSubCategories.filter(
            (selectedOptionSlug) => selectedOptionSlug !== slug,
          ),
        ),
      );

    dispatch(
      setSlugsSelectedSubCategories([...slugsSelectedSubCategories, slug]),
    );
  };

  return (
    <fieldset className="w-full xl:w-1/2 flex">
      {/* SELECT */}
      {selectSubCategories.isOpen &&
        data?.length !== slugsSelectedSubCategories.length && (
          <select
            className="p-1 w-full h-full flex flex-row flex-wrap bg-transparent cursor-pointer overflow-y-auto scrollbar-none"
            multiple
            value={slugsSelectedSubCategories}
            onChange={(e) => toggleOption(e.target.value)}
          >
            <option className="text-sm text-slate-400 !bg-transparent">
              Selecione uma sub-categoria
            </option>
            {data?.map(({ id, attributes: { displayName, slug } }) => {
              const selected = slugsSelectedSubCategories.includes(slug);
              return (
                <option
                  key={id}
                  value={slug}
                  className={`ml-1 inline-flex items-center justify-center px-2.5 py-0.5 m-1 text-xs sm:text-sm ${
                    selected && '!hidden'
                  }`}
                >
                  {displayName}
                </option>
              );
            })}
          </select>
        )}
      {/* SELECTED OPTIONS */}
      {(!selectSubCategories.isOpen ||
        data?.length === slugsSelectedSubCategories.length) && (
        <div
          className={`h-full w-full bg-white flex flex-row flex-wrap content-start items-start ${
            slugsSelectedSubCategories.length < 1 &&
            'bg-slate-50 border border-dashed rounded-3xl '
          } ${error ? 'border-red-500' : 'border-slate-300'}`}
        >
          {!selectSubCategories.isOpen &&
            slugsSelectedSubCategories.length < 1 && (
              <div
                className="w-full h-full flex justify-center items-center cursor-pointer"
                onClick={() => dispatch(toggleSelectFilter(true))}
              >
                {isLoading ? (
                  <Loading type="spinningBubbles" width={32} height={32} />
                ) : (
                  <p
                    className={`text-sm ${
                      error ? 'text-red-500' : 'text-slate-400'
                    }`}
                  >
                    {error ? 'Algo deu errado...' : 'Selecionar sub-categorias'}
                  </p>
                )}
              </div>
            )}
          <p className="w-full text-sm text-slate-400">
            {((!selectSubCategories.isOpen &&
              slugsSelectedSubCategories.length !== 0) ||
              (slugsSelectedSubCategories.length > 0 &&
                slugsSelectedSubCategories.length === data?.length)) &&
              'Subcategorias'}
          </p>
          {slugsSelectedSubCategories.map((value) => (
            <span
              key={value}
              className="h-max inline-flex items-center justify-center bg-primary/30 rounded-full px-2.5 py-0.5 text-primary/90 m-1"
            >
              <p className="whitespace-nowrap text-sm">
                {
                  data?.find(({ attributes }) => attributes.slug === value)
                    ?.attributes.displayName
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
      )}
    </fieldset>
  );
};

export default SubCategories;
