'use client';
import CPF_CNPJField from '@/components/form/inputs/CPF_CNPJField';
import PhoneField from '@/components/form/inputs/PhoneField';
import SelectInput from '@/components/form/inputs/SelectInput';
import TextArea from '@/components/form/inputs/TextArea';
import TextField from '@/components/form/inputs/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

export default function Page() {
  const phoneRegExpMask =
    /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])\d{3}-\d{4}$/;

  const cpfCnpjRegExpMask =
    /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;

  return (
    <div className="p-6 sm:p-10 w-full h-full">
      <div className="p-4 sm:p-10 w-full h-full border rounded-2xl">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            cpf: '',
            area: '',
            report: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .min(
                2,
                'O primeiro nome deve ser composto de no mínimo 2 caracteres',
              )
              .max(
                25,
                'O primeiro nome deve ser composto de no máximo 25 caracteres',
              )
              .required('O primeiro nome é requerido'),
            lastName: Yup.string()
              .min(
                2,
                'O sobrenome nome deve ser composto de no mínimo 2 caracteres',
              )
              .max(
                50,
                'O sobre nome deve ser composto de no máximo 50 caracteres',
              )
              .required('O sobrenome é requerido'),
            email: Yup.string()
              .email('Endereço de email inválido')
              .required('O email é requerido'),
            phone: Yup.string()
              .matches(phoneRegExpMask, 'Formato de celular/telefone inválido')
              .required('O celular/telefone para contato é requerido'),
            personNumberRegister: Yup.string()
              .matches(cpfCnpjRegExpMask, 'CPF ou CNP inválido')
              .required('O CPF ou CNPJ é requerido'),
            report: Yup.string()
              .max(
                2000,
                'O seu relato deve ser resumido, e conter no máximo 2000 caracteres',
              )
              .required('O relato é requerido'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          <Form className="flex flex-row flex-wrap sm:grid grid-cols-2 gap-4">
            <h2 className="col-span-full sm:mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
              Fale conosco
            </h2>
            <TextField
              label="Primeiro Nome"
              name="firstName"
              type="text"
              wraperclass="w-4/5"
            />
            <TextField
              label="Sobrenome"
              name="lastName"
              type="text"
              wraperclass="w-4/5 justify-self-end"
            />
            <TextField
              label="E-mail"
              name="email"
              type="text"
              wraperclass="w-4/5"
            />
            <PhoneField
              label="Celular/Telefone"
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
              label="Área relacionada"
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
              label="Relato"
              name="report"
              type="text"
              placeholder="Digite sua mensagem ..."
              wraperclass="col-span-full w-full mt-3 justify-self-start flex flex-row flex-wrap text-white"
              rows={4}
            />
            <button
              className="col-span-full w-2/5 mt-7 mb-6 p-2 justify-self-center flex justify-center items-center bg-secondary/30 shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:bg-secondary text-white"
              type="submit"
            >
              Enviar Mensagem
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
