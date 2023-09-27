import UserSessionProvider from '@/providers/UserSessionProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserSessionProvider>
      <section className="articles-auth-layout mt-14 md:mt-0 py-4 px-4 md:px-24 xl:px-28 w-full h-full bg-white flex flex-col flex-nowrap rounded-3xl overflow-auto">
        {children}
      </section>
    </UserSessionProvider>
  );
}
