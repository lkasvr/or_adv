'use client';
import Form from '@/components/form';
import CPF_CNPJField from '@/components/form/inputs/CPF_CNPJField';
import PhoneField from '@/components/form/inputs/PhoneField';
import SelectInput from '@/components/form/inputs/SelectInput';
import TextArea from '@/components/form/inputs/TextArea';
import TextField from '@/components/form/inputs/TextField';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personNumberRegister: string;
  area: string;
  report: string;
};

export default function Page() {
  const { isMobile } = useSelector((state: IRootState) => state.app);

  const toggleTitle = (flag: boolean) => {
    if (flag) {
      return (
        <h2 className="md:col-span-full self-start md:mb-4 text-center text-4xl text-white font-extrabold leading-none tracking-tight">
          Conte-nos sua história
        </h2>
      );
    }
    return (
      <h2 className="mt-16 md:mt-0 md:col-span-full self-start md:mb-4 text-center text-4xl text-white font-extrabold leading-none tracking-tight">
        Programa &nbsp; OR Pro Bono
      </h2>
    );
  };

  return (
    <div className="flex flex-row flex-wrap 2xl:flex-nowrap justify-evenly w-full h-full overflow-auto">
      <div className="w-full 2xl:w-1/2">
        <article className="px-2 xl:px-10 w-full flex flex-row flex-wrap justify-center content-center gap-0 text-sm text-white">
          {isMobile ? toggleTitle(!isMobile) : toggleTitle(isMobile)}
          <p className="max-md:mt-4 mb-4 text-justify indent-8">
            A <b>Constituição Federal promulgada em 1988</b> reservou à
            advocacia o múnus público, ao destacar o advogado como indispensável
            à administração da Justiça, sendo inviolável por seus atos e
            manifestações no exercício da profissão, nos termos da lei.{' '}
            <b>(art. 133, da CF/88).</b>
          </p>
          <p className="mb-4 text-justify indent-8">
            <b>Nós, do escritório Oliveira e Rios Advogados,</b> acreditamos que
            um dos deveres dos entes – públicos e privados – é devolver à
            sociedade o que ela nos oferta. Deste modo, contribuir com o acesso
            democrático da pessoa hipossuficiente ao Poder Judiciário, torna-se
            um dos deveres da advocacia.
          </p>
          <p className="mb-4 text-justify indent-8">
            Por tal motivo, mantemos o <b>programa “OR - Pro Bono”</b> como um
            dos pilares da nossa atuação, cujo conceito prático é a realização
            gratuita da defesa daqueles que, atendendo aos critérios
            estabelecidos, se inscrevam no programa.
          </p>
          <p className="mb-4 text-justify indent-8">
            O <b>“OR – Pro Bono”</b> está disponível aos cidadãos que se
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
            <b>o programa “OR – Pro Bono”</b> não pode ser oferecido com
            objetivo político-partidário ou eleitoral, de forma que é vedado o
            exercício do programa para instituições que tenham objetivos
            político-partidários ou eleitorais.
          </p>
          <p>
            <b>{!isMobile ? 'Conte-nos sua história' : ''}</b>
          </p>
        </article>
      </div>
      <div className="w-full 2xl:w-1/2 h-full p-4 2xl:p-10 flex flex-row flex-nowrap justify-evenly border rounded-2xl">
        <Form<FormData>
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            personNumberRegister: '',
            area: '',
            report: '',
          }}
          classStyles="w-full flex flex-row flex-wrap justify-center gap-4 lg:grid lg:grid-cols-2 overflow-y-auto md:scrollbar-none"
        >
          {isMobile ? toggleTitle(isMobile) : ''}
          <TextField
            label="Primeiro Nome*"
            name="firstName"
            type="text"
            wraperclass="w-4/5"
          />
          <TextField
            label="Sobrenome*"
            name="lastName"
            type="text"
            wraperclass="w-4/5 justify-self-end"
          />
          <TextField
            label="E-mail*"
            name="email"
            type="text"
            wraperclass="w-4/5"
          />
          <PhoneField
            label="Celular/Telefone*"
            name="phone"
            type="text"
            wraperclass="w-4/5 justify-self-end"
          />
          <CPF_CNPJField
            label="CPF/CNPJ*"
            name="personNumberRegister"
            type="text"
            wraperclass="w-4/5"
          />
          <SelectInput
            label="Área relacionada*"
            name="area"
            type="text"
            wraperclass="w-4/5 justify-self-end"
          >
            <option value="">Selecione uma área do direito ...</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Cível">Cível</option>
            <option value="Consumidor">Consumidor</option>
            <option value="Criminal">Criminal</option>
            <option value="Trabalhista">Trabalhista</option>
            <option value="Outra">Outra</option>
          </SelectInput>
          <TextArea
            label="Relato*"
            name="report"
            type="text"
            placeholder="Digite sua mensagem ..."
            wraperclass="col-span-full w-full mt-2 justify-self-start flex flex-row flex-wrap text-white"
            rows={5}
          />
          <button
            className="col-span-full w-2/5 mt-2 mb-1 2xl:mt-7 2xl:mb-6 p-2 justify-self-center flex justify-center items-center text-gray-300 bg-secondary/30 shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:bg-secondary disabled:text-gray-600 disabled:bg-secondary/20"
            type="submit"
          >
            Enviar Mensagem
          </button>
        </Form>
      </div>
    </div>
  );
}
