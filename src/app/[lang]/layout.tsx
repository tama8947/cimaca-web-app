'use client';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import AppLayout from '@/components/layouts/app-layout/app-layout';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import { LayoutProvider } from '@/components/layouts/app-layout/contexts/layout-context';
import '@/components/layouts/app-layout/styles/layout.scss';
import { i18n, type Locale } from '@/i18n.config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams () {
  return i18n.locales.map((locale: any) => ({ lang: locale }));
}

export default function RootLayout ({
  children,
  params
}: {
  readonly children: React.ReactNode
  readonly params: { lang: Locale }

}) {
  const toastRef = useRef<Toast>(null);
  return (
    <html lang={params.lang}>
      <head>
        <link rel='icon' href='/favicon.png'/>
      </head>
      <SessionProvider>
        <LayoutProvider>
          <NotificationContext.Provider value={toastRef}>
            <body className={inter.className}>
              <Toast ref={toastRef} />
              <AppLayout>
              {children}
              </AppLayout>
            </body>
          </NotificationContext.Provider>
        </LayoutProvider>
      </SessionProvider>
    </html>
  );
}
