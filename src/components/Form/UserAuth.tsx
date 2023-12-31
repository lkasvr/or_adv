'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import Form from './';
import FormButton from './buttons/FormButton';
import TextField from './inputs/TextField';

type LoginForm = {
  identifier: string;
  password: string;
};

const UserAuth = ({ title }: { title: string }) => {
  const [error, setError] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleSubmit = async ({ identifier, password }: LoginForm) => {
    try {
      setIsDisabled(true);
      const response = await signIn('credentials', {
        identifier,
        password,
        redirect: true,
        callbackUrl: '/register',
      });

      if (response?.error) setError(response.error);

      console.log(response);

      console.log(error);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Form<LoginForm>
      initialValues={{
        identifier: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      // validationSchema={validationYupSchema}
      classStyles="w-full flex flex-row flex-wrap justify-center gap-2 overflow-y-auto md:scrollbar-none"
    >
      <h2 className="md:mb-4 w-full flex flex-row flex-wrap justify-center text-2xl font-extrabold leading-none tracking-tight text-white md:text-3xl lg:text-3xl">
        {title}
      </h2>
      <TextField
        label="E-mail*"
        name="identifier"
        type="email"
        wraperclass="w-4/5"
      />
      <TextField
        label="Senha*"
        name="password"
        type="password"
        wraperclass="w-4/5"
      />
      <FormButton
        text="Entrar"
        isDisabled={isDisabled}
        extendClass="col-span-full w-2/5"
      />
    </Form>
  );
};

export default UserAuth;
