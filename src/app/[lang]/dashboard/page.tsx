import { type Metadata } from 'next';
import Favicon from '@/app/favicon.png';

export const metadata: Metadata = {
  title : 'Dashboard',
  icons : [{ rel: 'icon', url: Favicon.src }]
};

export default function DashboardPage () {
  return <div>Dashboard</div>;
}
