import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: 'orderedIds array is required' }, { status: 400 });
    }

    await dbConnect();

    const updates = orderedIds.map((id, index) =>
      Product.updateOne({ _id: id }, { sortOrder: index })
    );
    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}