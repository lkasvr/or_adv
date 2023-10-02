import Preview from '@/components/Article/Preview';

import { getArticlesPreview } from './articles/utils/get-articlesPreview';

export default async function Home() {
  const articlesPreview = await getArticlesPreview();

  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      <section className="home-page mt-14 md:mt-0 w-full h-full bg-white flex flex-row flex-nowrap rounded-3xl">
        <div className="px-4 py-8 md:px-16 xl:px-20 w-1/2 h-full"></div>

        <div className="px-4 py-8 md:px-16 xl:px-20 w-1/2 h-full flex flex-col content-center items-center">
          <h2 className="pt-2 pl-2 md:col-span-full md:mb-4 self-start text-3xl text-primary/80 font-extrabold leading-none tracking-tight">
            Artigos
          </h2>
          <hr className="mb-2 h-[1px] w-full text-gray-400" />
          <div className="w-full h-full scrollbar-none overflow-auto">
            {articlesPreview.map(({ attributes }) => (
              <Preview
                key={attributes.slug}
                wrapperClass="h-full py-4"
                {...attributes}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
