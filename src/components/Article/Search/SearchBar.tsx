'use client';
import { IRootState } from '@/store';
import { toggleSelectFilter, setSearchByTitle } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SearchBar = () => {
  const dispatch = useDispatch();

  const { userMenu } = useSelector((state: IRootState) => state.app);
  const {
    slugsSelectedSubCategories,
    subCategoriesTotal,
    selectSubCategories,
    searchByTitle,
  } = useSelector((state: IRootState) => state.articles.searchFilters);

  return (
    !userMenu.isOpen && (
      <div className="relative p-2 w-full h-1/6 bg-gradient-to-r from-primary/95 to-secondary/95 rounded-b-[100px] flex flex-row flex-wrap">
        <div className="relative w-full">
          <label className="sr-only" htmlFor="search">
            {' '}
            Search{' '}
          </label>

          <input
            className="w-full h-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm"
            id="search"
            type="search"
            value={searchByTitle}
            onChange={(e) => dispatch(setSearchByTitle(e.target.value))}
            placeholder="Título do artigo ..."
          />

          <button
            type="button"
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-2 text-gray-600 transition hover:text-gray-700"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="w-full mt-2">
          <h1 className="text-xl sm:text-2xl text-white text-center font-bold">
            ARTIGOS JURÍDICOS
          </h1>
        </div>
        {/* CHECKBOX */}
        <label className="absolute top-[75%] right-[5%] inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={
              selectSubCategories.isOpen &&
              slugsSelectedSubCategories.length !== subCategoriesTotal
            }
            onChange={() =>
              dispatch(toggleSelectFilter(!selectSubCategories.isOpen))
            }
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span className="ml-3 text-sm font-medium text-gray-300">
            Filtros
          </span>
        </label>
      </div>
    )
  );
};
