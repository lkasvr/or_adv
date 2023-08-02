'use client';
import Form from '@/components/form';
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
import { ContactTemplate } from '@/services/email/template/types';
import { createAlert } from '@/store/alertSlice';
import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

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
    personNumberRegister: Yup.string().matches(
      cpfCnpjRegExpMask,
      'CPF ou CNP inválido',
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
    const templateParams: ContactTemplate = {
      personNumberRegister: personNumberRegister
        ? personNumberRegister
        : 'Não informado',
      from_name: `${firstName} ${lastName}`,
      email,
      phone,
      area,
      message: report,
    };
    sendEmail<ContactTemplate>({
      templateID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
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
    <div className="p-6 sm:p-10 w-full h-full">
      <div className="p-4 sm:p-10 w-full h-full border rounded-2xl">
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
          onSubmit={handleSubmit}
          validationSchema={validationYupSchema}
          classStyles="flex flex-row flex-wrap sm:grid grid-cols-2 gap-4"
        >
          <h2 className="col-span-full sm:mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl">
            Fale conosco
          </h2>
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
            label="CPF/CNPJ"
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
            wraperclass="col-span-full w-full mt-3 justify-self-start flex flex-row flex-wrap text-white"
            rows={4}
          />
          <button
            className="col-span-full w-2/5 mt-7 mb-6 p-2 justify-self-center flex justify-center items-center text-gray-300 bg-secondary/30 shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:bg-secondary disabled:text-gray-600 disabled:bg-secondary/20"
            type="submit"
            disabled={isDisabled}
          >
            Enviar Mensagem
          </button>
        </Form>
      </div>
    </div>
  );
}
