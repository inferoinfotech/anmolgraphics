import dbConnect from '@/lib/dbConnect';
import ProductOption from '@/lib/models/ProductOption';
import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const DEFAULTS = {
  material: ['Metal and plastic', 'PVC', 'Polyester', 'Acrylic', 'Nylon'],
  orderType: ['Bulk and wholesale', 'Retail', 'Custom order', 'Sample order'],
};

async function ensureDefaults(type) {
  const count = await ProductOption.countDocuments({ type });
  if (count > 0) return;
  const names = DEFAULTS[type];
  if (!names?.length) return;
  await ProductOption.insertMany(
    names.map((name) => ({ type, name })),
    { ordered: false }
  ).catch(() => {});
}

export async function GET(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type || !['material', 'orderType'].includes(type)) {
      return NextResponse.json(
        { error: 'Query type must be material or orderType' },
        { status: 400 }
      );
    }

    await dbConnect();
    await ensureDefaults(type);
    const options = await ProductOption.find({ type }).sort({ name: 1 }).lean();

    return NextResponse.json({ options });
  } catch (error) {
    console.error('Fetch product options error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, name } = await req.json();
    if (!type || !['material', 'orderType'].includes(type)) {
      return NextResponse.json({ error: 'Invalid option type' }, { status: 400 });
    }
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await dbConnect();

    const trimmed = name.trim();
    const existing = await ProductOption.findOne({ type, name: trimmed });
    if (existing) {
      return NextResponse.json({ error: 'This option already exists' }, { status: 400 });
    }

    const option = await ProductOption.create({ type, name: trimmed });
    return NextResponse.json({ success: true, option });
  } catch (error) {
    console.error('Create product option error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Option id is required' }, { status: 400 });
    }

    await dbConnect();
    const removed = await ProductOption.findByIdAndDelete(id);
    if (!removed) {
      return NextResponse.json({ error: 'Option not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, name: removed.name });
  } catch (error) {
    console.error('Delete product option error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}