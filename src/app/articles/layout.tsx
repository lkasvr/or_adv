import { Metadata } from 'next';

const description =
  'Leia a produção de artigos do nosso escritório, o seu conteúdo varia entre questões jurídicas, temas acadêmicos, jusfilosóficos e ciências jurídicas';

export const metadata: Metadata = {
  title: 'Artigos',
  description,
  openGraph: {
    title: 'Artigos | Oliveira & Rios Advogados',
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
    <div className="px-28 py-14 w-full h-full bg-white flex flex-col flex-nowrap rounded-3xl">
      {children}
    </div>
  );
}
