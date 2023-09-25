import { User as NextAuthUser } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by authorize async function
   */
  export interface User extends NextAuthUser {
    jwt: string;
    id: number;
    slug: string;
    username: string;
    name: string;
    email: string;
    role: string;
    author: Author;
    confirmed: boolean;
    blocked: boolean;
    isAuthorizedPost: boolean;
    isAuthorizedEditSiteContent: boolean;
    provider?: string;
    createdAt: string;
    updatedAt: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    token: string;
    expiration: string;
    user: IUserSession;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    jwt: string;
    slug: string;
    username: string;
    name: string;
    email: string;
    role: string;
    author: Author;
    confirmed: boolean;
    isAuthorizedPost: boolean;
    isAuthorizedEditSiteContent: boolean;
    expiration: string;
  }
}

export interface IUserSession {
  slug: string;
  username: string;
  name: string;
  email: string;
  role: string;
  author: Author;
  confirmed: boolean;
  isAuthorizedPost: boolean;
  isAuthorizedEditSiteContent: boolean;
}

type Author = {
  slug: string;
  name: string;
  displayName?: string;
  email: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
};
