import Button from '@/components/Button';
import { authOptions } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const session = await getSession();

  if (!session) redirect(authOptions?.pages?.signIn ?? '/login');

  return (
    <div>
      Você está logado e foi autorizado a ficar, seja bem vindo!
      <Button text="Sair" />
    </div>
  );
}
