'use client';

import UserSessionProvider from '@/providers/UserSessionProvider';

export default function Template({ children }: { children: React.ReactNode }) {
  return <UserSessionProvider>{children}</UserSessionProvider>;
}
