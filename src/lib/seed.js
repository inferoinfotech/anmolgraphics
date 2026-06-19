import dbConnect from './dbConnect';
import Product from './models/Product';
import Category from './models/Category';
import products from '@/components/ProductsPage/ProductData';

export async function seedDatabase() {
  await dbConnect();

  // Seed categories
  const defaultCategories = [
    "Attachments", "Badges", "Corporate ID Cards", "Exhibitors ID Cards",
    "Gift Article", "Holders", "ID Cards", "Keychain", "Lanyards",
    "Medals", "Membership Cards", "Mouse Pad", "Mug", "RFID Smart Cards", "YoYo"
  ];
  
  for (const name of defaultCategories) {
    const exists = await Category.findOne({ name });
    if (!exists) {
      await Category.create({ name });
    }
  }

  // Ensure categories referenced by products exist
  for (const p of products) {
    if (p.category) {
      const exists = await Category.findOne({ name: p.category });
      if (!exists) {
        await Category.create({ name: p.category });
      }
    }
  }

  // Seed products with unique slugs tracking
  const usedSlugs = new Set();

  for (const p of products) {
    const baseSlug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    
    let counter = 1;
    while (usedSlugs.has(slug)) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }
    usedSlugs.add(slug);

    const exists = await Product.findOne({ slug });
    if (!exists) {
      await Product.create({
        title: p.title,
        slug: slug,
        images: p.images || [],
        thumbnail: p.images && p.images[0] ? p.images[0] : '/placeholder.svg',
        description: p.description,
        category: p.category,
        hashtags: p.hashtags || [],
        highlights: p.highlights || [],
        price: p.price || '',
        rating: p.rating || 5,
        note: p.note || 'Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.'
      });
    }
  }
  console.log('Successfully completed seeding/updating all products in DB!');
}
