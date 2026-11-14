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
    <Suspense fallback={<div className="min-h-screen bg-ag-canvas flex items-center justify-center text-ag-ink/60 text-sm font-roboto">Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
