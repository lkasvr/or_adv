import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        NAV DO DASH
        <br />
        <Link href={'/about'}>go to about</Link>
        <br />
        <Link href={'/contact'}>go to contact</Link>
        <br />
        <Link href={'/'}>go to Initial</Link>
      </nav>
      {children}
    </section>
  );
}
