'use client';
import { getTime } from 'date-fns';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React, { createContext } from 'react';

export const SessionContext = createContext<Session | null>(null);

export default function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = React.useState<Session | null>(null);

  const fetchUserSession = async () => {
    try {
      const response = await fetch('/api/auth/session', { cache: 'no-store' });
      const newSession = await response.json();
      setSession(newSession);
    } catch (error) {
      setSession(null);
    }
  };

  const checkSessionExpiration = () => {
    if (!session) return;
    const expiration = Number(session.expiration);
    const time = expiration - getTime(new Date());

    if (time <= 0) {
      setSession(null);
      signOut({ redirect: true, callbackUrl: '/' });
    }
  };

  React.useEffect(() => {
    fetchUserSession();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(checkSessionExpiration, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
