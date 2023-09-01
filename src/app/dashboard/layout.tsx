"use client";
import { ChildContainerProps } from "@/components/global-types/types";
import AppLayout from "@/components/layouts/app-layout/app-layout";
import "@/components/layouts/app-layout/styles/layout.scss"

const Layout = ({ children }: ChildContainerProps) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};

export default Layout;
