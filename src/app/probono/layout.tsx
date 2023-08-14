import { Metadata } from 'next';

const description =
  '“OR - Pro Bono” é um dos pilares da nossa atuação, cujo conceito prático é a realização gratuita da defesa daqueles que, atendendo aos critérios estabelecidos, se inscrevam no programa';

export const metadata: Metadata = {
  title: 'OR - Pro Bono',
  description,
  openGraph: {
    title: 'Programa OR - Pro Bono | Oliveira & Rios Advogados',
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
