import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export async function PUT(req, { params }) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      price,
      rating,
      note,
      highlights,
      hashtags,
      images,
      thumbnail,
      slug,
      sections,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify product exists
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Handle slug change / check uniqueness if changed
    let finalSlug = product.slug;
    if (slug && slug !== product.slug) {
      finalSlug = slugify(slug);
      const count = await Product.countDocuments({ slug: finalSlug, _id: { $ne: id } });
      if (count > 0) {
        finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 7)}`;
      }
    } else if (title !== product.title && (!slug || slug.trim() === '')) {
      finalSlug = slugify(title);
      const count = await Product.countDocuments({ slug: finalSlug, _id: { $ne: id } });
      if (count > 0) {
        finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 7)}`;
      }
    }

    product.title = title;
    product.slug = finalSlug;
    product.description = description;
    product.category = category;
    product.price = price || '';
    product.rating = Number(rating) || 5;
    product.note = note;
    product.highlights = Array.isArray(highlights) ? highlights.filter(h => h.trim() !== '') : [];
    product.hashtags = Array.isArray(hashtags) ? hashtags.filter(t => t.trim() !== '') : [];
    product.images = Array.isArray(images) ? images : [];
    product.thumbnail = thumbnail || (images && images[0] ? images[0] : '/placeholder.svg');
    product.sections = Array.isArray(sections) ? sections : [];

    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await dbConnect();
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
