import { Metadata } from 'next';

const description =
  'Somos o escritório Oliveira & Rios Advogados, atuamos na modalidade full service e mantemos parceria com outros escritórios e advogados fora do DF atendemos em todo o território nacional';

export const metadata: Metadata = {
  title: 'Escritório',
  description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-row flex-wrap 2xl:flex-nowrap justify-center gap-y-32 sm:gap-y-0 overflow-auto scrollbar-none">
      {children}
    </div>
  );
}
