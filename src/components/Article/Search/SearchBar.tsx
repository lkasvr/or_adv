import React from 'react';

import Checkbox from './filters/SubCategories/Checkbox';
import SearchInput from './SearchInput';

export const SearchBar = ({ title }: { title: string }) => {
  return (
    <div className="relative p-2 w-full h-1/6 bg-gradient-to-r from-primary/95 to-secondary/95 rounded-b-[100px] flex flex-row flex-wrap">
      <SearchInput
        wrapperStyle="w-full"
        placeHolder="Título do artigo ..."
        inputStyle="w-full h-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm"
        buttonStyle="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-2 text-gray-600 transition hover:text-gray-700"
      />

      <div className="w-full mt-2">
        <h1 className="text-xl sm:text-2xl text-white text-center font-bold">
          {title}
        </h1>
      </div>
      {/* FILTERS CHECKBOX */}
      <Checkbox />
    </div>
  );
};
