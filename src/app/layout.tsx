import './globals.css';
import HeaderWithFooter from '@/components/Header';
import AlertsWrapper from '@/components/Notifications/AlertsWrapper';
import InitialAppStateProvider from '@/providers/InitialAppStateProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StrictMode } from 'react';

import Template from './template';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${process.env.WEBSITE_DOMAIN}`),
  title: {
    default: 'Oliveira & Rios Advogados',
    template: '%s | Oliveira & Rios Advogados',
  },
  description:
    process.env.WEBSITE_DESCRIPTION ??
    'Escritório de Advocia em Brasília-DF, Plano Piloto',
  creator: 'Lucas Vieira',
  keywords: ['law', 'direito', 'advocacia', 'escritorio', 'brasilia', 'plano'],
  referrer: 'strict-origin-when-cross-origin',
  openGraph: {
    title: 'Oliveira & Rios Advogados',
    description:
      'Bem-vindos ao nosso website, somos um escritório de advocacia que se dedica ao ideal de justiça, primamos pela liberdade, isonomia e temos como objetivo fornecer supedâneo ao seu direito, prestando um serviço distinto, eficiente e personalizado.',
    images: {
      url: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoFb.2024f082.png&w=1920&q=75',
      width: 260,
      height: 149,
      alt: 'Logo Oliveira Rios Advogados',
    },
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    noimageindex: false,
    nocache: false,
    'max-video-preview': 15,
    'max-image-preview': 'large',
    'max-snippet': 55,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      nocache: false,
      'max-video-preview': 15,
      'max-image-preview': 'large',
      'max-snippet': 55,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} max-h-screen overflow-hidden bg-main bg-no-repeat bg-cover flex flex-row flex-nowrap`}
      >
        <ReduxProvider>
          <InitialAppStateProvider>
            <AlertsWrapper />
            <HeaderWithFooter />
            <StrictMode>
              <main className="w-full md:w-8/12 xl:w-9/12 h-screen p-6 xl:p-20 bg-gradient-to-r from-primary/95 to-secondary/95 overflow-auto">
                <Template>{children}</Template>
              </main>
            </StrictMode>
          </InitialAppStateProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
