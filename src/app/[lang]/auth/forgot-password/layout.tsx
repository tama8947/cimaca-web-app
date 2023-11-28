import './layout.scss';

export default function ForgotPasswordLayout ({
  children
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="forgot-password-layout overflow-x-hidden w-full h-screen flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
