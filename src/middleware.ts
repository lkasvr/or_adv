import { withAuth } from 'next-auth/middleware';
export default withAuth({
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    authorized({ req, token }) {
      // `/register` requires admin role
      if (req.nextUrl.pathname === '/register')
        if (token?.user.role !== 'admin') return false;

      return !!token;
    },
  },
});

export const config = { matcher: ['/articles/create', '/register'] };
