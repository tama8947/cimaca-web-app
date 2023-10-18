import AppLayout from '@/components/layouts/app-layout/app-layout';
import '@/components/layouts/app-layout/styles/layout.scss';
import { type ChildContainerProps } from '@/global-types/types';

export default function DashboardLayout ({ children }: ChildContainerProps) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};
