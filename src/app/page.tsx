import SectionPreview from '@/components/Article/SectionPreview';
import Image from 'next/image';
import temis from 'public/assets/images/temis.png';

import { getArticlesPreview } from './articles/utils/get-articlesPreview';

export default async function Home() {
  const articlesPreview = await getArticlesPreview();

  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      {/* H1 FOR SEO */}
      <h1 className="hidden">Oliveira e Rios Advogados</h1>
      <section className="home-page mt-14 md:mt-0 w-full h-full bg-white flex flex-row flex-nowrap rounded-3xl">
        {/* SECTION 1 */}
        <section className="sub-section-1 w-1/2 h-full flex flex-row flex-nowrap justify-between items-start">
          <div className="ml-4 w-1/2 h-full flex flex-row justify-between items-center">
            <Image src={temis} alt="Deusa da Justiça Temis" />
          </div>
          <div className="w-1/2 flex flex-col">
            <h2 className="pt-40 text-5xl text-primary font-extrabold leading-none tracking-tight">
              Bem vindo,
            </h2>
            <span className="pt-3 pl-4 -indent-2 text-justify text-gray-500">
              somos um escritório de advocacia <b>&#39;full service&#39;</b>{' '}
              atuante no DF e em diversas capitais. Nos dedicamos ao ideal de
              justiça, primamos pela liberdade, isonomia e temos como objetivo
              fornecer supedâneo ao seu direito, prestando um serviço distinto,
              eficiente e personalizado.
            </span>
          </div>
        </section>
        {/* SECTION 2 */}
        <section className="sub-section-2  px-4 py-8 md:px-16 xl:px-20 w-1/2 h-full flex flex-col content-center items-center">
          <SectionPreview articlesPreview={articlesPreview} />
        </section>
      </section>
    </div>
  );
}
