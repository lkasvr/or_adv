import { Metadata } from 'next';

const description =
  'Fale conosco e envie seu relato, podemos ajudá-lo em demandas judicias e administrativas, concursos, litígios trabalhistas, ações policiais, inquéritos, Licitações, INSS, Guarda de filhos menores e muito mais..';

export const metadata: Metadata = {
  title: 'Contato',
  description,
  openGraph: {
    title: 'Contato | Oliveira & Rios Advogados',
    description,
    images: {
      url: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoFb.2024f082.png&w=1920&q=75',
      width: 260,
      height: 149,
      alt: 'Logo Oliveira Rios Advogados',
    },
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-nowrap justify-evenly p-4 xl:px-9 w-full h-full border rounded-2xl">
      {children}
    </div>
  );
}
