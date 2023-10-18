import { type Metadata } from 'next';
import CardLogin from './_components/card-login';
import Favicon from '@/app/favicon.png';

export const metadata: Metadata = {
  title : 'Iniciar Sesión',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function LoginPage () {
  return (
    <main className="w-full">
      <CardLogin />
    </main>
  );
}
