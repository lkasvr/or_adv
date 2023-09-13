import { Article as TypeArticle } from '@/app/articles/domain/Articles';
import React from 'react';

interface IArticle {
  article: TypeArticle;
}

const Article = ({ article: { attributes } }: IArticle) => {
  return (
    <article className="group">
      <img
        alt="Lava"
        src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div className="p-4">
        <a href="#">
          <h3 className="text-lg font-medium text-gray-900">
            {attributes.title}
          </h3>
        </a>

        <p className="mt-2 ml-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {attributes.description}
        </p>

        <a
          href="#"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </a>
      </div>

      <hr className="mt-1 mb-6 h-[1px] w-full text-gray-400" />
    </article>
  );
};

export default Article;
