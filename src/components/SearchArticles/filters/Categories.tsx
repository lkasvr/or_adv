'use client';
import ReactIcon from '@/components/ReactIcon';
import React from 'react';

export type Category = {
  id: string;
  attributes: {
    slug: string;
    displayName: string;
    icon: {
      name: string;
      lib: string;
    };
  };
};

interface ICategories {
  categories: Category[];
}

const Categories = ({ categories }: ICategories) => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );

  const handleCategoryChange = (id: string) => {
    if (selectedCategories.includes(id))
      return setSelectedCategories(
        selectedCategories.filter((item) => item !== id),
      );

    setSelectedCategories([...selectedCategories, id]);
  };

  return (
    <React.Fragment>
      {categories.map(({ id, attributes: { slug, displayName, icon } }) => {
        const checked = selectedCategories.includes(id);
        return (
          <div key={slug} className={'m-1'}>
            <input
              type="checkbox"
              name={slug}
              value={slug}
              id={slug}
              className="peer hidden"
              checked={checked}
              onChange={() => handleCategoryChange(id)}
            />

            <label
              htmlFor={slug}
              className="flex cursor-pointer items-center justify-start rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:ring-1 peer-checked:border-primary peer-checked:ring-primary"
            >
              {/* ICON */}
              <ReactIcon
                nameicon={icon.name}
                lib={icon.lib}
                className={`h-6 w-6 ${checked ? 'text-primary' : ''}`}
              />
              <p
                className={`ml-4 text-gray-900 ${
                  checked ? 'font-bold text-primary' : ''
                }`}
              >
                {displayName}
              </p>
            </label>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Categories;
