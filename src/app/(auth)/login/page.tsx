import StrapiRestAPIResponseError, {
  ExpiredException,
} from '@/app/api/Errors/types';
import UserAuth from '@/components/Form/UserAuth';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const session = await getSession();

  if (
    !(session instanceof ExpiredException) &&
    !(session instanceof StrapiRestAPIResponseError)
  )
    redirect('/articles');

  return (
    <section className="login w-1/2 h-full flex flex-col justify-center">
      <UserAuth title="OR Academy" />
    </section>
  );
}
