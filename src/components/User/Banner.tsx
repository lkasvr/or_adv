import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

import SearchInput from '../Article/Search/SearchInput';
import Menu from './Menu';

const Banner = async ({ session }: { session: Session }) => {
  const { user } = session;

  return (
    session && (
      <header className="h-1/3 bg-gradient-to-r from-primary/95 to-secondary/95 rounded-b-3xl">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <SearchInput
                wrapperStyle="w-full"
                placeHolder="Título do artigo ..."
                inputStyle="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                buttonStyle="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              />

              <Link
                href="/articles/create"
                className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <FaPlus className="h-5 w-5" />
              </Link>
            </div>

            <span
              aria-hidden="true"
              className="block h-6 w-px rounded-full bg-gray-200"
            ></span>

            <Menu />
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome Back, {user.firstName}!
            </h1>

            <p className="mt-1.5 text-sm text-gray-300">
              Your website has seen a 52% increase in traffic in the last month.
              Keep it up! 🚀
            </p>
          </div>
        </div>
      </header>
    )
  );
};

export default Banner;
