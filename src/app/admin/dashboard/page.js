import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  return <DashboardClient />;
}
