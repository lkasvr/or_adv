import { Metadata } from 'next';

const description =
  '“OR - Pro Bono” é um dos pilares da nossa atuação, cujo conceito prático é a realização gratuita da defesa daqueles que, atendendo aos critérios estabelecidos, se inscrevam no programa';

export const metadata: Metadata = {
  title: 'OR - Pro Bono',
  description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-wrap 2xl:flex-nowrap justify-evenly w-full h-full">
      {children}
    </div>
  );
}
