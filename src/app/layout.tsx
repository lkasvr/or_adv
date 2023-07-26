import './globals.css';
import HeaderWithFooter from '@/components/HeaderWithFooter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Template from './template';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oliveira Rios Advogados',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} max-h-screen bg-main bg-no-repeat bg-cover flex flex-row flex-wrap`}
      >
        <HeaderWithFooter />
        <main className="w-full sm:w-9/12 max-h-screen sm:p-24 bg-gradient-to-r from-primary/95 to-secondary/95">
          <Template>
            <section className="w-full h-full bg-primary bg-opacity-75 sm:rounded-3xl">
              {children}
            </section>
          </Template>
        </main>
      </body>
    </html>
  );
}
