import WarningCard from "@/components/WarningCard";

export default function Page() {
  return (
    <div className="p-10 w-full h-full flex flex-row flex-nowrap justify-center items-center">
      <WarningCard
        title="Pro Bono - Página em Construção"
        button={{ icon: true, text: 'Retornar a Página Inicial', link: '/' }}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            A página de Pro Bono conterá um formulário para que você possa entrar em contato e nos fornecer informações valiosas!
          </p>
        </div>
      </WarningCard>
    </div>
  );
}
