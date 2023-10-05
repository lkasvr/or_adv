import { Metadata } from 'next';

const description =
  'Fale conosco e envie seu relato, podemos ajudá-lo em demandas judicias e administrativas, concursos, litígios trabalhistas, ações policiais, inquéritos, Licitações, INSS, Guarda de filhos menores e muito mais..';

export const metadata: Metadata = {
  title: 'Contato',
  description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-nowrap justify-evenly p-4 xl:px-9 w-full h-full border rounded-2xl">
      {children}
    </div>
  );
}
