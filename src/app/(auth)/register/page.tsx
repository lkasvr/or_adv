import Button from '@/components/Button';
import { ExpiredException, UnauthenticatedException } from '@/Errors/AppErrors';
import { authOptions } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const session = await getSession();

  console.log('session pagina register (server)');
  console.log(session);

  if (
    session instanceof ExpiredException ||
    session instanceof UnauthenticatedException
  )
    redirect(authOptions?.pages?.signIn ?? '/login');

  return (
    <div>
      Você está logado e foi autorizado a ficar, seja bem vindo!
      <Button text="Sair" />
    </div>
  );
}
