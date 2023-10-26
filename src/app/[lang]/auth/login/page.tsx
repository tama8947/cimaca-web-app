import { type Metadata } from 'next';
import Favicon from '@/app/favicon.png';
import ContentLogin from './_components/content-login';

export const metadata: Metadata = {
  title : 'Iniciar Sesión',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function LoginPage () {
  return (
    <main className="w-full">
      <ContentLogin />
    </main>
  );
}
