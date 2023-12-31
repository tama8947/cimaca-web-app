'use client';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import { LayoutProvider } from '@/components/layouts/app-layout/contexts/layout-context';
import '@/components/layouts/app-layout/styles/layout.scss';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const toastRef = useRef<Toast>(null);
  return (
    <html lang="en">
      <SessionProvider>
        <LayoutProvider>
          <NotificationContext.Provider value={toastRef}>
            <Toast ref={toastRef} />
            <body className={inter.className}>{children}</body>
          </NotificationContext.Provider>
        </LayoutProvider>
      </SessionProvider>
    </html>
  );
}
