import { add, getTime } from 'date-fns';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseUrl =
  process.env.DEVAPI_BASE_URL ?? process.env.ARTICLES_API_BASE_URL;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ trigger, user, token }) {
      if (trigger === 'signIn' && user) {
        const tokenExpirationTimestamp = getTime(add(new Date(), { hours: 3 }));

        const {
          jwt,
          slug,
          username,
          firstName,
          lastName,
          email,
          role,
          author,
          confirmed,
          isAuthorizedPost,
          isAuthorizedEditSiteContent,
        } = user;

        return {
          user: {
            slug,
            username,
            firstName,
            lastName,
            email,
            role,
            author,
            confirmed,
            isAuthorizedPost,
            isAuthorizedEditSiteContent,
          },
          jwt,
          expiration: tokenExpirationTimestamp.toString(),
        };
      }

      if (user) token.slug = user.slug;

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.jwt;
      session.expiration = token.expiration;

      return session ?? undefined;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'E-mail*', type: 'email' },
        password: { label: 'Senha*', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${baseUrl}/auth/local`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const { jwt, user } = await response.json();
            return { jwt, ...user };
          }

          throw JSON.stringify(response.body);
        } catch (error) {
          return error;
        }
      },
    }),
  ],
};
