'use client';
import { IRootState } from '@/store';
import { toggleSelectFilter } from '@/store/articlesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Checkbox = () => {
  const dispatch = useDispatch();
  const {
    slugsSelectedSubCategories,
    subCategoriesTotal,
    selectSubCategories,
  } = useSelector((state: IRootState) => state.articles.searchFilters);

  return (
    <label className="absolute top-[80%] right-[25%] sm:top-[75%] sm:right-[5%] inline-flex items-center mr-5 cursor-pointer">
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
      <div className="w-8 h-3 sm:w-11 sm:h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-3 after:w-3 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-primary"></div>
      <span className="ml-3 text-xs sm:text-sm font-medium text-gray-300">
        Filtros
      </span>
    </label>
  );
};

export default Checkbox;
