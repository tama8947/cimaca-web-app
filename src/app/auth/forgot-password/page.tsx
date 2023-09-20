import { type Metadata } from 'next';
import Favicon from '@/app/favicon.png';
import ContentForgotPassword from './_components/content-forgot-password';

export const metadata: Metadata = {
  title : 'Recuperar Contraseña',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function ForgotPasswordPage () {
  return <div className="w-full"><ContentForgotPassword/></div>;
}
