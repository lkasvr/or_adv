import { isAfter } from 'date-fns';
import { withAuth } from 'next-auth/middleware';

export function isSessionExpired(expiration: number): boolean {
  return isAfter(new Date(), expiration);
}

export default withAuth({
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    authorized({ req, token }) {
      if (!token || isSessionExpired(parseInt(token.expiration))) return false;
      // `/register` requires admin role
      if (req.nextUrl.pathname === '/register')
        if (token?.user.role !== 'admin') return false;

      return !!token;
    },
  },
});

export const config = { matcher: ['/articles/create', '/register'] };
