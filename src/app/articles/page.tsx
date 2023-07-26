import WarningCard from '@/components/WarningCard';

export default function Page() {
  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      <WarningCard
        title="Artigos - Recurso em Construção"
        button={{ icon: true, text: 'Retornar a Página Inicial', link: '/' }}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            O recurso de artigos terá como finalidade a produção e divulgação
            científica de conteúdos na área do direito e relacionadas.
          </p>
        </div>
      </WarningCard>
    </div>
  );
}
