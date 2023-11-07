import { getSession } from '@/lib/session';
import React from 'react';

import Banner from '../../User/Banner';
import Categories from './filters/Categories';
import SubCategories from './filters/SubCategories';
import { SearchBar } from './SearchBar';

const Search = async () => {
  const session = await getSession();

  return (
    <React.Fragment>
      <div className="top-bar w-full max-[375px]:h-1/6 h-1/6 max-xl:h-[15%] xl:h-1/6 flex flex-row flex-nowrap justify-end">
        {!session ? (
          <SearchBar title="ARTIGOS JURÍDICOS" />
        ) : (
          <Banner session={session} />
        )}
      </div>

      <div
        className="filters-bar
        mt-1 pb-1 px-4 sm:px-8 md:px-10 lg:px-24 xl:px-28
        w-full max-[375px]:h-1/6 h-1/6 max-xl:h-[30%] lx:h-1/6
        flex flex-row flex-wrap xl:flex-nowrap
        border-b border-gray-100
        overflow-x-hidden overflow-y-auto"
      >
        {/* CATEGORY */}
        <Categories />
        {/* SUB-CATEGORY */}
        <SubCategories />
      </div>
    </React.Fragment>
  );
};

export default Search;
