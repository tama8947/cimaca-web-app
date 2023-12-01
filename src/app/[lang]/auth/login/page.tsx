import { type Metadata } from 'next';
import ContentLogin from './_components/content-login';
import Favicon from '@/app/favicon.png';

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
