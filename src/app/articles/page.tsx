'use client';
import Card from '@/components/Card';
import ReactIcon from '@/components/ReactIcon';
import React from 'react';

export default function Page() {
  const [isOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getEnabledCategories = async () => {
      const response = await fetch(
        'http://localhost:1337/api/categories?populate=icon',
      );

      const result = await response.json();
      setCategories(result.data);
    };
    getEnabledCategories();
  }, []);

  const handleItemChange = (id: number) => {
    if (selectedItems.includes(id))
      return setSelectedItems(selectedItems.filter((item) => item !== id));

    setSelectedItems([...selectedItems, id]);
  };

  return (
    <React.Fragment>
      {isOpen && (
        <header className="bg-gray-50 rounded-3xl h-1/3">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <label className="sr-only" htmlFor="search">
                    {' '}
                    Search{' '}
                  </label>

                  <input
                    className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search website..."
                  />

                  <button
                    type="button"
                    className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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

                <a
                  href="#"
                  className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                >
                  <span className="sr-only">Notifications</span>
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </a>
              </div>

              <span
                aria-hidden="true"
                className="block h-6 w-px rounded-full bg-gray-200"
              ></span>

              <a href="#" className="block shrink-0">
                <span className="sr-only">Profile</span>
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </a>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, Barry!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Your website has seen a 52% increase in traffic in the last
                month. Keep it up! 🚀
              </p>
            </div>
          </div>
        </header>
      )}

      <div className="w-full h-1/4 flex flex-row flex-wrap">
        {!isOpen && (
          <div className="p-4 w-1/4 h-full bg-primary/90 rounded-3xl flex flex-row flex-wrap justify-center content-between items-start">
            <div className="relative">
              <label className="sr-only" htmlFor="search">
                {' '}
                Search{' '}
              </label>

              <input
                className="h-12 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                id="search"
                type="search"
                placeholder="Título do artigo ..."
              />

              <button
                type="button"
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
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
        )}

        <fieldset
          className={`px-2 ${
            isOpen ? 'w-full' : 'w-3/4'
          } h-full flex flex-row flex-wrap justify-start content-center border-t border-b border-gray-100 overflow-auto`}
        >
          <legend className="sr-only">Categorias</legend>
          {categories.map(
            ({
              id,
              attributes: { slug, displayName, icon }, // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }: any) => {
              const checked = selectedItems.includes(id);
              return (
                <div key={slug} className={`${isOpen ? 'w-1/5' : 'w-2/5'} m-1`}>
                  <input
                    type="checkbox"
                    name={slug}
                    value={slug}
                    id={slug}
                    className="peer hidden"
                    checked={checked}
                    onChange={() => handleItemChange(id)}
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
            },
          )}
        </fieldset>
      </div>

      <div className="mt-4">
        {categories.map(({ id }) => (
          <span
            key={id}
            className="mr-2 inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700"
          >
            <p className="whitespace-nowrap text-sm">Euro</p>

            <button className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300">
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

      <div
        className={` w-full mt-8 ${
          isOpen ? 'h-2/3' : 'h-3/4'
        } overflow-auto scrollbar-none`}
      >
        <div className="h-full mb-8">
          <Card />
        </div>
        <div className="h-full mb-8">
          <Card />
        </div>
        <div className="h-full mb-8">
          <Card />
        </div>
      </div>
    </React.Fragment>
  );
}
