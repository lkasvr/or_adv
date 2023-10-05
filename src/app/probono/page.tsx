import ProbonoForm from '@/components/Form/ProbonoForm';
import React from 'react';

export default function Page() {
  return (
    <React.Fragment>
      <div className="w-full 2xl:w-1/2">
        <article className="px-2 xl:px-9 w-full max-sm:h-full max-xl:h-screen flex flex-row flex-wrap justify-center content-center gap-0 text-sm text-white">
          <h1 className="max-[767px]:mt-16 md:col-span-full self-start md:mb-4 text-center text-4xl text-white font-extrabold leading-none tracking-tight">
            Programa OR Pro Bono
          </h1>

          <p className="max-md:mt-4 mb-4 text-justify indent-8">
            A <b>Constituição Federal promulgada em 1988</b> reservou à
            advocacia o múnus público, ao destacar o advogado como indispensável
            à administração da Justiça, sendo inviolável por seus atos e
            manifestações no exercício da profissão, nos termos da lei.{' '}
            <b>(art. 133, da CF/88).</b>
          </p>
          <p className="mb-4 text-justify indent-8">
            <b>Nós, do escritório Oliveira e Rios Advogados,</b> acreditamos que
            um dos deveres dos entes &ndash; públicos e privados &ndash; é
            devolver à sociedade o que ela nos oferta. Deste modo, contribuir
            com o acesso democrático da pessoa hipossuficiente ao Poder
            Judiciário, torna-se um dos deveres da advocacia.
          </p>
          <p className="mb-4 text-justify indent-8">
            Por tal motivo, mantemos o <b>programa “OR - Pro Bono”</b> como um
            dos pilares da nossa atuação, cujo conceito prático é a realização
            gratuita da defesa daqueles que, atendendo aos critérios
            estabelecidos, se inscrevam no programa.
          </p>
          <p className="mb-4 text-justify indent-8">
            O <b>“OR &ndash; Pro Bono”</b> está disponível aos cidadãos que se
            encontrem em vulnerabilidade social, podendo, conforme análise do
            caso concreto, ser estendido às entidades sem fins lucrativos que,
            comprovadamente, não possuam condições de arcar com serviços
            advocatícios.
          </p>
          <p className="mb-4 text-justify indent-8">
            <b>A finalidade do programa “OR - Pro Bono”</b> é oferecer a
            prestação de serviços advocatícios de qualidade aos integrantes da
            sociedade civil que, eventualmente, venham enfrentar dificuldades de
            defesa no âmbito do direito voltado às mulheres, população
            LGBTQIAP+, direitos étnico-raciais e proteção aos direitos dos
            animais.
          </p>
          <p className="mb-4 text-justify indent-8">
            É importante destacar que, por força do Código de Ética e Disciplina
            do Conselho Federal da Ordem dos Advogados do Brasil (CED-CFOAB),{' '}
            <b>o programa “OR &ndash; Pro Bono”</b> não pode ser oferecido com
            objetivo político-partidário ou eleitoral, de forma que é vedado o
            exercício do programa para instituições que tenham objetivos
            político-partidários ou eleitorais.
          </p>
          <p className="max-[767px]:hidden">
            <b>Conte-nos sua história</b>
          </p>
        </article>
      </div>
      <div className="w-full 2xl:w-1/2 h-full p-4 2xl:p-9 flex flex-row flex-nowrap justify-evenly border rounded-2xl">
        <ProbonoForm />
      </div>
    </React.Fragment>
  );
}
