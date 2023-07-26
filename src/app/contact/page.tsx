'use client';
import TextArea from '@/components/form/inputs/TextArea';
import TextField from '@/components/form/inputs/TextField';
import { Formik, Form } from 'formik';
//import * as Yup from 'yup';

export default function Page() {
  return (
    <div className="p-10 w-full h-full">
      <div className="p-10 w-full h-full border rounded-2xl">
        <Formik
          initialValues={{ firstName: '' }}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          <Form className="grid grid-cols-2 gap-6">
            <h2 className="col-span-full mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Fale conosco
            </h2>
            <TextField
              label="Primeiro Nome"
              name="firstName"
              type="text"
              wraperClass="w-3/4"
            />
            <TextField
              label="Sobrenome"
              name="lastName"
              type="text"
              wraperClass="w-3/4"
            />
            <TextField
              label="E-mail"
              name="email"
              type="text"
              wraperClass="w-3/4"
            />
            <TextField
              label="Celular/Telefone"
              name="phone"
              type="text"
              wraperClass="w-3/4"
            />
            <TextArea
              label="Relato"
              name="content"
              type="text"
              placeholder="Digite sua mensagem ..."
              wraperClass="col-span-full w-3/5 mt-3 justify-self-start flex flex-row flex-wrap text-white"
              rows={4}
            />
            <button
              className="col-span-full w-2/5 mt-7 mb-5 p-2 justify-self-center flex justify-center items-center bg-secondary/30 shadow-sm shadow-primary/50 hover:shadow-none duration-300 hover:cursor-pointer transition ease-in-out delay-150 hover:bg-secondary text-white"
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
