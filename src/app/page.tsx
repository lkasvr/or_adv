import WarningCard from '@/components/WarningCard';
import React from 'react';

export default function Home() {
  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      <WarningCard
        title="Página Inicial - Recurso em Construção"
        button={{ icon: true, text: 'Retornar a Página Inicial', link: '/' }}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            A Página Inicial conterá conteúdos interessantes e te guiará pelo nosso espaço aqui na web!
          </p>
        </div>
      </WarningCard>
    </div>
  );
}
