import './layout.scss';

export default function ResetPasswordLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="reset-password-layout overflow-x-hidden w-full h-screen flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
