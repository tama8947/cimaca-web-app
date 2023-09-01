"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import { SessionProvider } from "next-auth/react";
import "@/components/layouts/AppLayout/styles/layout.scss";

import { useRef } from "react";
import { Toast } from "primereact/toast";
import { NotificationContext } from "@/components/layouts/AppLayout/contexts/custom-context";
import { LayoutProvider } from "@/components/layouts/AppLayout/contexts/layout-context";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
