"use client";
import { ChildContainerProps } from "@/components/global_types/types";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
import "@/components/layouts/AppLayout/styles/layout.scss"

const Layout = ({ children }: ChildContainerProps) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};

export default Layout;
