import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const actualDateInSeconds = Math.floor(Date.now() / 1000);
        const tokenExpirationInSeconds = Math.floor(4 * 60 * 60);

        const {
          jwt,
          slug,
          username,
          name,
          email,
          role,
          author,
          confirmed,
          isAuthorizedPost,
          isAuthorizedEditSiteContent,
        } = user;

        return {
          jwt,
          slug,
          username,
          name,
          email,
          role,
          author,
          confirmed,
          isAuthorizedPost,
          isAuthorizedEditSiteContent,
          expiration: Math.floor(
            actualDateInSeconds + tokenExpirationInSeconds,
          ).toString(),
        };
      }

      if (user) token.slug = user.slug;

      return token;
    },
    async session({ session, token }) {
      const {
        jwt,
        expiration,
        slug,
        username,
        name,
        email,
        role,
        author,
        confirmed,
        isAuthorizedPost,
        isAuthorizedEditSiteContent,
      } = token;
      session.token = jwt;
      session.expiration = expiration;

      session.user = {
        slug,
        username,
        name,
        email,
        role,
        author,
        confirmed,
        isAuthorizedPost,
        isAuthorizedEditSiteContent,
      };

      return session;
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
          const response = await fetch(
            `${process.env.ARTICLES_API_BASE_URL}/auth/local`,
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            },
          );

          if (response.ok) {
            const { jwt, user } = await response.json();
            return { jwt, ...user };
          }

          throw new Error('Authentication failure. User data not available');
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
};
