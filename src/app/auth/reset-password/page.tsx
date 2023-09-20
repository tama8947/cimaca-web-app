import { type Metadata } from 'next';
import Favicon from '@/app/favicon.png';
import ContentResetPassword from './_components/content-reset-password';

export const metadata: Metadata = {
  title : 'Cambiar Contraseña',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function ResetPasswordPage () {
  return <div className="w-full"><ContentResetPassword/></div>;
}
