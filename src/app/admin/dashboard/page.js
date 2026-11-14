import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
