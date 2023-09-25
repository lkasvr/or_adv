import { UnauthenticatedException, ExpiredException } from '@/Errors/AppErrors';
import { authOptions } from '@/lib/auth';
import { isAfter } from 'date-fns';
import { getServerSession } from 'next-auth/next';

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session)
    return new UnauthenticatedException('User unauthenticated', 401);

  const expiration = Number(session.expiration);
  if (isAfter(new Date(), expiration))
    return new ExpiredException(
      'TOKEN',
      'User session expired',
      401,
      new Date(expiration),
    );

  return session;
}
