import SectionPreview from '@/components/Article/SectionPreview';
import Image from 'next/image';

import { getArticlesPreview } from './articles/utils/get-articlesPreview';

export default async function Home() {
  const articlesPreview = await getArticlesPreview();

  return (
    <div className="md:px-4 xl:px-5 2xl:p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center max-md:rounded-b-3xl overflow-hidden">
      {/* H1 FOR SEO */}
      <h1 className="hidden">Oliveira e Rios Advogados</h1>
      <div className="home-page md:mt-0 w-full h-full flex flex-row flex-wrap 2xl:flex-nowrap rounded-3xl overflow-auto">
        {/* SECTION 1 */}
        <section className="sub-section-1 relative px-4 py-8 md:px-16 xl:px-20 w-full 2xl:w-1/2 h-full flex flex-row flex-wrap content-center">
          <Image
            src="/assets/images/salao_n_stj.jpg"
            alt="Salão Nobre STJ"
            width={1000}
            height={1000}
            className="absolute w-full h-full top-0 left-0"
          />
          <div className="absolute w-full h-full top-0 left-0 z-[1] bg-gradient-to-b xl:bg-gradient-to-r from-white/30 to-white/100"></div>
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
        <SectionPreview
          articlesPreview={articlesPreview}
          wrapperClass="sub-section-2 px-3 py-10 md:px-10 2xl:w-1/2 h-full bg-white"
        />
      </div>
    </div>
  );
}
