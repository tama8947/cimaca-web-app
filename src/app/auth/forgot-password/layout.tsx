// import { type ChildContainerProps } from '@/components/global-types/types';

// function Layout ({ children }: ChildContainerProps) {
function Layout ({ children }: any) {
  return (
    <div className="w-full h-screen flex justify-content-center align-items-center">
        {children}
    </div>
  );
}

export default Layout;
