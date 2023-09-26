import StrapiRestAPIResponseError, {
  ExpiredException,
} from '@/app/api/Errors/types';
import { authOptions } from '@/lib/auth';
import { isAfter } from 'date-fns';
import { getServerSession } from 'next-auth/next';

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session) return new StrapiRestAPIResponseError(session);

  const expiration = Number(session.expiration);
  if (isAfter(new Date(), expiration))
    return new ExpiredException(
      'User session expired',
      'TOKEN',
      new Date(expiration),
    );

  return session;
}
