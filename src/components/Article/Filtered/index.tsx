'use client';
import { ArticlePreview } from '@/app/articles/domain/Articles';
import { IRootState } from '@/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

interface IFiltrered {
  articles: ArticlePreview[];
}

const Filtered = ({ articles }: IFiltrered) => {
  const { slugsCategories } = useSelector(
    (state: IRootState) => state.articles,
  );

  const [filteredArticles, setFilteredArticles] = React.useState<
    ArticlePreview[]
  >([]);

  React.useEffect(() => {
    if (slugsCategories.length > 0) {
      setFilteredArticles(
        articles.filter((article) => {
          let hasCategory = false;
          article.attributes.categories.data.forEach((articleCategory) => {
            if (slugsCategories.includes(articleCategory.attributes.slug))
              hasCategory = true;
          });
          return hasCategory;
        }),
      );
    } else setFilteredArticles(articles);
  }, [slugsCategories]);

  return (
    <div>
      {filteredArticles.map(
        ({ id, attributes: { slug, imageRelated, title, description } }) => (
          <section key={id} className="h-full mb-8">
            <article className="group">
              <img
                alt="Lava"
                src={imageRelated}
                className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
              />

              <div className="p-4">
                <Link href={`articles/${slug}`}>
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                </Link>

                <p className="mt-2 ml-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {description}
                </p>

                <Link
                  href={`articles/${slug}`}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Leia mais
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>

              <hr className="mt-1 mb-6 h-[1px] w-full text-gray-400" />
            </article>
          </section>
        ),
      )}
    </div>
  );
};

export default Filtered;
