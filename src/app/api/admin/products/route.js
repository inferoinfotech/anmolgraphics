import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';
import { verifyAdminAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

export async function GET() {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const products = await Product.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      availabilityLabel,
      material,
      orderType,
      specifications,
      specificationRows,
      options,
      customisation,
      faqs,
      idealFor,
      dispatchTimeline,
      bulkOrderTimeline,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Generate unique slug
    let finalSlug = slug && slug.trim() !== '' ? slugify(slug) : slugify(title);
    
    // Check uniqueness
    const count = await Product.countDocuments({ slug: finalSlug });
    if (count > 0) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    const lastOrdered = await Product.findOne({}).sort({ sortOrder: -1 }).select('sortOrder');
    const nextSortOrder = (lastOrdered?.sortOrder ?? -1) + 1;

    const newProduct = new Product({
      title,
      slug: finalSlug,
      sortOrder: nextSortOrder,
      description,
      category,
      price: price || '',
      rating: Number(rating) || 5,
      note: note || undefined,
      highlights: Array.isArray(highlights) ? highlights.filter(h => h.trim() !== '') : [],
      hashtags: Array.isArray(hashtags) ? hashtags.filter(t => t.trim() !== '') : [],
      images: Array.isArray(images) ? images : [],
      thumbnail: thumbnail || (images && images[0] ? images[0] : '/placeholder.svg'),
      sections: Array.isArray(sections) ? sections : [],
      availabilityLabel: availabilityLabel?.trim() || '',
      material: material?.trim() || '',
      orderType: orderType?.trim() || '',
      specifications: specifications?.trim() || '',
      specificationRows: Array.isArray(specificationRows)
        ? specificationRows
            .map((r) => ({
              label: String(r?.label || '').trim(),
              value: String(r?.value || '').trim(),
            }))
            .filter((r) => r.label && r.value)
        : [],
      options: Array.isArray(options)
        ? options.map((o) => String(o).trim()).filter(Boolean)
        : [],
      customisation: customisation?.trim() || '',
      idealFor: Array.isArray(idealFor)
        ? idealFor.map((o) => String(o).trim()).filter(Boolean)
        : [],
      dispatchTimeline: dispatchTimeline?.trim() || '',
      bulkOrderTimeline: bulkOrderTimeline?.trim() || '',
      faqs: Array.isArray(faqs)
        ? faqs
            .map((f) => ({
              question: String(f?.question || '').trim(),
              answer: String(f?.answer || '').trim(),
            }))
            .filter((f) => f.question && f.answer)
        : [],
    });

    await newProduct.save();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
