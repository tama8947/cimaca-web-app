import { type ChildContainerProps } from '@/global-types/types';

export default function LoginLayout ({ children }: ChildContainerProps) {
  return (
    <div className="w-full h-screen flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
