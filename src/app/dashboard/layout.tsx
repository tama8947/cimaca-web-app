import { type ChildContainerProps } from '@/components/global-types/types';
import AppLayout from '@/components/layouts/app-layout/app-layout';
import '@/components/layouts/app-layout/styles/layout.scss';

function Layout ({ children }: ChildContainerProps) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}

export default Layout;
