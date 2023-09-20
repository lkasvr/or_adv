'use client';
import sendEmail from '@/services/email/emailjs';
import { ContactTemplate } from '@/services/email/template/types';
import { createAlert } from '@/store/appSlice';
import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Form from '.';
import FormButton from './buttons/FormButton';
import CPF_CNPJField, { cpfCnpjRegExpMask } from './inputs/CPF_CNPJField';
import PhoneField, { phoneRegExpMask } from './inputs/PhoneField';
import SelectInput from './inputs/SelectInput';
import TextArea from './inputs/TextArea';
import TextField from './inputs/TextField';

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personNumberRegister: string;
  area: string;
  report: string;
};

const selectOptions = [
  'Administrativo',
  'Cível',
  'Consumidor',
  'Criminal',
  'Trabalhista',
];

const Contact = ({ title }: { title: string }) => {
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
      'CPF ou CNPJ inválido',
    ),
    area: Yup.string()
      .required('A área do direito é requerida')
      .oneOf([...selectOptions]),
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
    }: ContactForm,
    actions: FormikHelpers<ContactForm>,
  ) => {
    setIsDisabled(true);
    actions.setSubmitting(true);
    const templateParams: ContactTemplate = {
      personNumberRegister: personNumberRegister ?? 'Não informado',
      from_name: `${firstName} ${lastName}`,
      email,
      phone,
      area,
      message: report,
    };
    sendEmail<ContactTemplate>({
      templateID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? '',
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
    <Form<ContactForm>
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
      classStyles="w-full flex flex-row flex-wrap justify-center gap-2 lg:grid lg:grid-cols-2 overflow-y-auto"
    >
      <h2 className="md:col-span-full self-start md:mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl">
        {title}
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
      <TextField label="E-mail*" name="email" type="text" wraperclass="w-4/5" />
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
      <FormButton
        text="Enviar Mensagem"
        isDisabled={isDisabled}
        extendClass="col-span-full w-2/5"
      />
    </Form>
  );
};

export default Contact;
