'use client';
import Form from '@/components/Form';
import FormButton from '@/components/Form/buttons/FormButton';
import Checkbox from '@/components/Form/inputs/Checkbox';
import CPF_CNPJField, {
  cpfCnpjRegExpMask,
} from '@/components/Form/inputs/CPF_CNPJField';
import PhoneField, {
  phoneRegExpMask,
} from '@/components/Form/inputs/PhoneField';
import SelectInput from '@/components/Form/inputs/SelectInput';
import TextArea from '@/components/Form/inputs/TextArea';
import TextField from '@/components/Form/inputs/TextField';
import sendEmail from '@/services/email/emailjs';
import { ProbonoTemplate } from '@/services/email/template/types';
import { createAlert } from '@/store/appSlice';
import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

type ProbonoForm = {
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

const Probono = () => {
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
    }: ProbonoForm,
    actions: FormikHelpers<ProbonoForm>,
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
    <Form<ProbonoForm>
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
      <h2 className="min-[767px]:hidden md:col-span-full self-start md:mb-4 text-center text-4xl text-white font-extrabold leading-none tracking-tight">
        Conte-nos sua história
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
  );
};

export default Probono;
