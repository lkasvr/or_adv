import { authOptions } from '@/lib/auth';
import { isSessionExpired } from '@/middleware';
import { getServerSession } from 'next-auth/next';

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session || isSessionExpired(parseInt(session.expiration))) return null;
  return session;
}
