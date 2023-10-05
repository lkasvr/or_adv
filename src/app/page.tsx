import SectionPreview from '@/components/Article/SectionPreview';
import Image from 'next/image';

import { getArticlesPreview } from './articles/utils/get-articlesPreview';

export default async function Home() {
  const articlesPreview = await getArticlesPreview();

  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      {/* H1 FOR SEO */}
      <h1 className="hidden">Oliveira e Rios Advogados</h1>
      <div className="home-page mt-14 md:mt-0 w-full h-full flex flex-row flex-wrap xl:flex-nowrap rounded-3xl overflow-auto">
        {/* SECTION 1 */}
        <section className="sub-section-1 relative px-4 py-8 md:px-16 xl:px-20 w-full xl:w-1/2 h-full flex flex-row flex-wrap content-center ">
          <Image
            src="/assets/images/salao_n_stj.jpg"
            alt="Salão Nobre STJ"
            width={1000}
            height={1000}
            className="absolute w-full h-full top-0 left-0 rounded-t-3xl xl:rounded-e-none xl:rounded-s-3xl"
          />
          <div className="absolute w-full h-full top-0 left-0 z-[1] bg-gradient-to-b xl:bg-gradient-to-r from-white/30 to-white/100 rounded-t-3xl xl:rounded-e-none xl:rounded-s-3xl"></div>
          <h2 className="text-3xl xl:text-5xl text-primary font-extrabold leading-none tracking-tight z-[2]">
            Somos um escritório de advocacia
          </h2>
          <span className="pt-3 pl-4 text-justify text-secondary/75 z-[2]">
            <b>&#39;full service&#39;</b>, atuante no DF e em diversas capitais.
            Nos dedicamos ao ideal de justiça, primamos pela liberdade, isonomia
            e temos como objetivo fornecer supedâneo ao seu direito, prestando
            um serviço distinto, eficiente e personalizado.
          </span>
        </section>
        {/* SECTION 2 */}
        <section className="sub-section-2 px-4 md:px-16 w-full xl:w-1/2 h-full bg-white flex flex-col content-center items-center">
          <SectionPreview articlesPreview={articlesPreview} />
        </section>
      </div>
    </div>
  );
}
