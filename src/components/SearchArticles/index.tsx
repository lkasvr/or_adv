import React from 'react';

import { Menu } from '../User/Menu';
import Categories from './filters/Categories';
import SubCategories from './filters/SubCategories';
import { getCategories } from './filters/utils/get-categories';
import { getSubCategories } from './filters/utils/get-subCategories';
import { Search } from './Search';

const SearchArticles = async () => {
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  return (
    <React.Fragment>
      {/* USER MENU  */}
      <Menu />

      {/* SEARCH */}
      <Search />

      {/* CATEGORIES AND SUB-CATEGORIES */}
      <div className="mt-1 px-28 w-full h-1/6 flex flex-row flex-nowrap pb-1 border-b border-gray-100 overflow-auto">
        {/* CATEGORY */}
        <fieldset className="w-1/2 flex flex-row flex-wrap justify-start content-center">
          <legend className="sr-only">Categorias</legend>
          <Categories categories={categories} />
        </fieldset>

        {/* SUB-CATEGORY */}
        <SubCategories subCategories={subCategories} />
      </div>
    </React.Fragment>
  );
};

export default SearchArticles;
