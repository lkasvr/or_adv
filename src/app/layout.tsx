import './globals.css';
import AlertsWrapper from '@/components/AlertsWrapper';
import HeaderWithFooter from '@/components/Header';
import InitialAppStateProvider from '@/providers/InitialAppStateProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Template from './template';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL ?? 'https://www.oliveirarios.adv.br',
  ),
  title: {
    default: 'Oliveira Rios Advogados',
    template: '%s | Oliveira Rios Advogados',
  },
  description:
    process.env.WEBSITE_DESCRIPTION ??
    'Escritório de Advocia em Brasília-DF, Plano Piloto',
  authors: { name: 'Lucas Vieira', url: 'https://github.com/lkasvr' },
  creator: 'Lucas Vieira',
  openGraph: {
    images: {
      url: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoFb.2024f082.png&w=1920&q=75',
      width: 260,
      height: 149,
      alt: 'Logo Oliveira Rios Advogados',
    },
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} max-h-screen overflow-hidden bg-main bg-no-repeat bg-cover flex flex-row flex-nowrap`}
      >
        <ReduxProvider>
          <InitialAppStateProvider>
            <AlertsWrapper />
            <HeaderWithFooter />
            <main className="w-full md:w-8/12 xl:w-9/12 h-screen p-6 xl:p-24 bg-gradient-to-r from-primary/95 to-secondary/95">
              <Template>
                <section className="w-full h-full bg-primary bg-opacity-75 rounded-3xl">
                  <div className="p-4 xl:p-6 2xl:p-10 w-full h-full">
                    {children}
                  </div>
                </section>
              </Template>
            </main>
          </InitialAppStateProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
