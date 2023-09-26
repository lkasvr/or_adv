'use client';
import { IRootState } from '@/store';
import { setSearchByTitle } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  wrapperStyle?: string;
  label?: string;
  placeHolder?: string;
  inputStyle: string;
  buttonStyle: string;
}

const SearchInput = ({
  wrapperStyle = '',
  label,
  placeHolder = '',
  inputStyle,
  buttonStyle,
}: Props) => {
  const dispatch = useDispatch();
  const { searchByTitle } = useSelector(
    (state: IRootState) => state.articles.searchFilters,
  );

  return (
    <div className={`relative ${wrapperStyle}`}>
      <label className="sr-only" htmlFor="search">
        {' '}
        {label ?? 'Search'}{' '}
      </label>

      <input
        className={inputStyle}
        id="search"
        type="search"
        value={searchByTitle}
        onChange={(e) => dispatch(setSearchByTitle(e.target.value))}
        placeholder={placeHolder}
      />

      <button type="button" className={buttonStyle}>
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
  );
};

export default SearchInput;
