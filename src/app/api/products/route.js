import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import Category from '@/lib/models/Category';
import { seedDatabase } from '@/lib/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    
    // Auto-seed if empty
    await seedDatabase();

    const products = await Product.find({}).sort({ sortOrder: 1, createdAt: -1 });
    const categories = await Category.find({}).sort({ name: 1 });

    return NextResponse.json({
      products,
      categories
    });
  } catch (error) {
    console.error('Fetch public products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
