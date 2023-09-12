'use client';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

export const Search = () => {
  const { userMenu } = useSelector((state: IRootState) => state.app);

  return (
    !userMenu.isOpen && (
      <div className="p-2 w-full h-1/6 bg-gradient-to-r from-primary/95 to-secondary/95 rounded-b-[100px] flex flex-row flex-wrap">
        <div className="relative w-full">
          <label className="sr-only" htmlFor="search">
            {' '}
            Search{' '}
          </label>

          <input
            className="w-full h-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm"
            id="search"
            type="search"
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
      </div>
    )
  );
};
