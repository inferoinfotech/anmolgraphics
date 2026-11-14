import dbConnect from '@/lib/dbConnect';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    await dbConnect();
    
    // Check if category already exists
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }

    const newCategory = new Category({ name: name.trim() });
    await newCategory.save();

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();

    await dbConnect();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const previousName = category.name;
    if (previousName === trimmedName) {
      return NextResponse.json({ success: true, category });
    }

    const existing = await Category.findOne({ name: trimmedName });
    if (existing && existing._id.toString() !== id) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }

    category.name = trimmedName;
    await category.save();

    await Product.updateMany({ category: previousName }, { category: trimmedName });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Update category error:', error);
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
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    await dbConnect();
    
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Delete category
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
