import { ExpiredException, UnauthenticatedException } from '@/Errors/AppErrors';
import { getSession } from '@/lib/session';
import React from 'react';

import Banner from '../../User/Banner';
import Categories from './filters/Categories';
import SubCategories from './filters/SubCategories';
import { getCategories } from './filters/utils/get-categories';
import { getSubCategories } from './filters/utils/get-subCategories';
import { SearchBar } from './SearchBar';

const Search = async () => {
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  const session = await getSession();

  return (
    <React.Fragment>
      {session instanceof ExpiredException ||
      session instanceof UnauthenticatedException ? (
        <SearchBar title="ARTIGOS JURÍDICOS" />
      ) : (
        <Banner session={session} />
      )}

      <div className="mt-1 px-1 md:px-10 lg:px-24 xl:px-28 w-full h-1/6 flex flex-row flex-wrap xl:flex-nowrap pb-1 border-b border-gray-100 overflow-x-hidden overflow-y-auto">
        {/* CATEGORY */}
        <Categories categories={categories} />
        {/* SUB-CATEGORY */}
        <SubCategories subCategories={subCategories} />
      </div>
    </React.Fragment>
  );
};

export default Search;
