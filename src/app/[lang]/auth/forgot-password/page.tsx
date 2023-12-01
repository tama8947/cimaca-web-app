import { type Metadata } from 'next';
import ContentForgotPassword from './_components/content-forgot-password';
import Favicon from '@/app/favicon.png';

export const metadata: Metadata = {
  title : 'Recuperar Contraseña',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function ForgotPasswordPage () {
  return <div className="w-full"><ContentForgotPassword/></div>;
}
