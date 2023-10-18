import { type ChildContainerProps } from '@/global-types/types';
import './layout.scss';

export default function LoginLayout ({ children }: ChildContainerProps) {
  return (
    <div className="login-layout overflow-x-hidden w-full h-screen flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
