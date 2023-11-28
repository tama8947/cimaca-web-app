import './layout.scss';

export default function LoginLayout ({
  children
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="login-layout overflow-x-hidden w-full h-screen flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
