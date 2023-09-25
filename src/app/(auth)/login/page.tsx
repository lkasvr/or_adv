import UserAuth from '@/components/Form/UserAuth';
import { ExpiredException, UnauthenticatedException } from '@/Errors/AppErrors';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const session = await getSession();
  console.log('session pagina login (server)');
  console.log(session);
  if (
    !(session instanceof ExpiredException) &&
    !(session instanceof UnauthenticatedException)
  )
    redirect('/articles');

  return (
    <section className="login w-1/2 h-full flex flex-col justify-center">
      <UserAuth title="OR Academy" />
    </section>
  );
}
