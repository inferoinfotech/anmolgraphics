import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const isAuthenticated = await verifyAdminAuth();
  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
