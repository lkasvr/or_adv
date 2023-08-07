'use client';
import Form from '@/components/form';
import FormButton from '@/components/form/buttons/FormButton';
import Checkbox from '@/components/form/inputs/Checkbox';
import CPF_CNPJField, {
  cpfCnpjRegExpMask,
} from '@/components/form/inputs/CPF_CNPJField';
import PhoneField, {
  phoneRegExpMask,
} from '@/components/form/inputs/PhoneField';
import SelectInput from '@/components/form/inputs/SelectInput';
import TextArea from '@/components/form/inputs/TextArea';
import TextField from '@/components/form/inputs/TextField';
import sendEmail from '@/services/email/emailjs';
import { ProbonoTemplate } from '@/services/email/template/types';
import { IRootState } from '@/store';
import { createAlert } from '@/store/alertSlice';
import { FormikHelpers } from 'formik';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personNumberRegister: string;
  area: string;
  checked: false;
  report: string;
};

const selectOptions = [
  'Administrativo',
  'Cível',
  'Consumidor',
  'Criminal',
  'Trabalhista',
];

const ToggleTitle = ({ flag }: { flag: boolean }) => {
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

export default function Page() {
  const { isMobile } = useSelector((state: IRootState) => state.app);
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = React.useState(false);

  const validationYupSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'O primeiro nome deve ser composto de no mínimo 2 caracteres')
      .max(25, 'O primeiro nome deve ser composto de no máximo 25 caracteres')
      .required('O primeiro nome é requerido'),
    lastName: Yup.string()
      .min(2, 'O sobrenome nome deve ser composto de no mínimo 2 caracteres')
      .max(50, 'O sobre nome deve ser composto de no máximo 50 caracteres')
      .required('O sobrenome é requerido'),
    email: Yup.string()
      .email('Endereço de email inválido')
      .required('O email é requerido'),
    phone: Yup.string()
      .matches(phoneRegExpMask, 'Formato de celular/telefone inválido')
      .required('O celular/telefone para contato é requerido'),
    personNumberRegister: Yup.string()
      .matches(cpfCnpjRegExpMask, 'CPF ou CNPJ inválido')
      .required('O CPF ou CNPJ é requerido'),
    area: Yup.string()
      .required('A área do direito é requerida')
      .oneOf([...selectOptions]),
    checked: Yup.boolean().oneOf(
      [true],
      'Você deve concordar com os termos do programa OR Probono para prosseguir',
    ),
    report: Yup.string()
      .max(
        2000,
        'O seu relato deve ser resumido, e conter no máximo 2000 caracteres',
      )
      .required('O relato é requerido'),
  });

  const handleSubmit = (
    {
      personNumberRegister,
      firstName,
      lastName,
      email,
      phone,
      area,
      report,
    }: FormData,
    actions: FormikHelpers<FormData>,
  ) => {
    setIsDisabled(true);
    actions.setSubmitting(true);
    const templateParams: ProbonoTemplate = {
      personNumberRegister: personNumberRegister,
      from_name: `${firstName} ${lastName}`,
      email,
      phone,
      area,
      message: report,
    };
    sendEmail<ProbonoTemplate>({
      templateID: process.env.NEXT_PUBLIC_EMAILJS_PROBONO_TEMPLATE_ID ?? '',
      templateParams,
      success: (/*res*/) => {
        dispatch(
          createAlert({
            title: 'Mensagem enviada',
            message: 'Sua mensagem foi enviada com sucesso.',
            type: 'success',
          }),
        );
        setIsDisabled(false);
        actions.resetForm();
        actions.setSubmitting(false);
      },
      error: (error) => {
        dispatch(
          createAlert({
            title: `Erro (${error.status})`,
            message: 'Algo deu errado no envio da sua mensagem.',
            type: 'error',
          }),
        );
        setIsDisabled(false);
        actions.setSubmitting(false);
        console.error(error);
      },
    });
  };

  return (
    <div className="flex flex-row flex-wrap 2xl:flex-nowrap justify-evenly w-full h-full overflow-auto">
      <div className="w-full 2xl:w-1/2">
        <article className="px-2 xl:px-9 w-full flex flex-row flex-wrap justify-center content-center gap-0 text-sm text-white">
          {isMobile ? (
            <ToggleTitle flag={!isMobile} />
          ) : (
            <ToggleTitle flag={isMobile} />
          )}
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
          <p>
            <b>{!isMobile ? 'Conte-nos sua história' : ''}</b>
          </p>
        </article>
      </div>
      <div className="w-full 2xl:w-1/2 h-full p-4 2xl:p-9 flex flex-row flex-nowrap justify-evenly border rounded-2xl">
        <Form<FormData>
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            personNumberRegister: '',
            area: '',
            checked: false,
            report: '',
          }}
          validationSchema={validationYupSchema}
          onSubmit={handleSubmit}
          classStyles="w-full flex flex-row flex-wrap justify-center gap-2 lg:grid lg:grid-cols-2 overflow-y-auto md:scrollbar-none"
        >
          {isMobile ? <ToggleTitle flag={isMobile} /> : ''}
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
            placeholder="Selecione uma área do direito ..."
            name="area"
            type="text"
            wraperclass="w-4/5 justify-self-end"
          >
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
          <TextArea
            label="Relato*"
            name="report"
            type="text"
            placeholder="Digite sua mensagem ..."
            wraperclass="col-span-full w-full mt-2 justify-self-start flex flex-row flex-wrap text-white"
            rows={5}
          />
          <Checkbox
            label="Concordo com os termos do Progrma OR Probono"
            name="checked"
            wraperclass="col-span-full"
          />

          <FormButton
            text="Enviar Mensagem"
            isDisabled={isDisabled}
            extendClass="col-span-full w-2/5"
          />
        </Form>
      </div>
    </div>
  );
}
