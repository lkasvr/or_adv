import { Metadata } from 'next';

const description =
  'Somos o escritório Oliveira & Rios Advogados, atuamos na modalidade full service e mantemos parceria com outros escritórios e advogados fora do DF atendemos em todo o território nacional';

export const metadata: Metadata = {
  title: 'Escritório',
  description,
  openGraph: {
    title: 'Escritório | Oliveira & Rios Advogados',
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
  return children;
}
