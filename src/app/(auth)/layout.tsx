export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="auth w-full h-full p-4 2xl:p-9 self-center flex flex-row flex-nowrap justify-center">
      {children}
    </section>
  );
}
