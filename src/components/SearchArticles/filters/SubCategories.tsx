'use client';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

export type SubCategory = {
  id: string;
  attributes: {
    name: string;
    displayName: string;
    slug: string;
  };
};

interface ISubCategories {
  subCategories: SubCategory[];
}

const SubCategories = ({ subCategories }: ISubCategories) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const {
    searchFilters: { isSelectOpen },
  } = useSelector((state: IRootState) => state.app);

  const toggleOption = (slug: string) => {
    if (selectedOptions.includes(slug)) {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOptionSlug) => selectedOptionSlug !== slug,
        ),
      );
    } else setSelectedOptions([...selectedOptions, slug]);
  };

  return (
    <React.Fragment>
      <div className="relative w-1/2 grid grid-cols-2">
        {/* SELECT */}
        {isSelectOpen && subCategories.length !== selectedOptions.length && (
          <select
            className="p-1 absolute max-w-max h-full flex flex-row flex-wrap bg-transparent cursor-pointer overflow-y-auto scrollbar-none"
            multiple
            value={selectedOptions}
            onChange={(e) => toggleOption(e.target.value)}
          >
            <option className="text-sm text-slate-400 !bg-transparent">
              Selecione uma sub-categoria
            </option>
            {subCategories.map(({ id, attributes: { displayName, slug } }) => {
              const selected = selectedOptions.includes(slug);
              return (
                <option
                  key={id}
                  value={slug}
                  selected={selected}
                  className={`ml-1 max-w-max inline-flex items-center justify-center px-2.5 py-0.5 m-1 rounded-full ${
                    selected ? '!hidden' : ''
                  }`}
                >
                  <p className="whitespace-nowrap truncate">{displayName}</p>
                </option>
              );
            })}
          </select>
        )}
        {/* SELECTED OPTIONS */}
        <div
          className={`h-full ${
            isSelectOpen && subCategories.length !== selectedOptions.length
              ? 'col-start-2 w-full bg-white flex flex-row flex-wrap justify-end'
              : 'col-span-full bg-transparent'
          } ${
            !isSelectOpen && selectedOptions.length < 1
              ? 'bg-slate-50 border border-dashed border-slate-200 rounded-3xl'
              : ''
          }`}
        >
          {!isSelectOpen && selectedOptions.length < 1 ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-sm text-slate-400">
                Selecionar sub-categorias
              </p>
            </div>
          ) : (
            ''
          )}
          <p className="text-sm text-slate-400">
            {((!isSelectOpen && selectedOptions.length !== 0) ||
              (selectedOptions.length > 0 &&
                selectedOptions.length === subCategories.length)) &&
              'Subcategorias'}
          </p>
          {selectedOptions.map((value) => (
            <span
              key={value}
              className="h-max inline-flex items-center justify-center bg-primary/30 rounded-full px-2.5 py-0.5 text-primary/90 m-1"
            >
              <p className="whitespace-nowrap text-sm">
                {
                  subCategories.find(
                    ({ attributes }) => attributes.slug === value,
                  )?.attributes.displayName
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
      </div>
    </React.Fragment>
  );
};

export default SubCategories;
