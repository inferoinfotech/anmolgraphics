import dbConnect from "@/lib/dbConnect"
import Product from "@/lib/models/Product"
import { seedDatabase } from "@/lib/seed"
import { notFound } from "next/navigation"
import Link from "next/link"
import ProductDetailPage from "@/components/ProductsPage/ProductDetails"
import ProductCatalogCard from "@/components/ProductsPage/ProductCatalogCard"
import StructuredData from "@/components/SEO/StructuredData"

export async function generateMetadata({ params }) {
    const { slug } = await params
    await dbConnect()
    const product = await Product.findOne({ slug }).lean()
    if (!product) return {}

    return {
        title: `${product.title} | Anmol Graphics`,
        description: product.description,
        alternates: {
            canonical: `https://anmolgraphics.in/products/${product.slug}`,
        },
    }
}

// Function to generate static params
export async function generateStaticParams() {
    try {
        await dbConnect()
        await seedDatabase()
        const dbProducts = await Product.find({}, { slug: 1 }).lean()
        return dbProducts.map((product) => ({
            slug: product.slug,
        }));
    } catch (e) {
        console.error("Static params generation failed:", e)
        return []
    }
}

export default async function ProductDetail({ params }) {
    const { slug } = await params
    await dbConnect()
    
    // Fetch product and serialize Mongoose document
    const dbProduct = await Product.findOne({ slug }).lean()
    if (!dbProduct) {
        return notFound()
    }
    const product = JSON.parse(JSON.stringify(dbProduct))

    // Get related products based on shared hashtags
    const dbRelated = await Product.find({
        slug: { $ne: slug },
        hashtags: { $in: product.hashtags || [] }
    }).limit(4).lean()
    const relatedProducts = JSON.parse(JSON.stringify(dbRelated))

    return (
        <>
            <StructuredData product={product} />
            <div className="site-container py-4 sm:py-6">
                {/* Back to Products Button */}
                <Link href="/products" className="flex items-center group text-gray-700 hover:text-gray-900 mb-4 text-sm md:text-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 md:h-5 w-4 md:w-5 mr-2 group-hover:-translate-x-1 transition-all duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5"></path>
                        <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                    Back to Products
                </Link>
                {/* Product Details */}
                <ProductDetailPage product={product} />

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <section className="mt-12 md:mt-16">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Related Products</h2>
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCatalogCard
                                    key={relatedProduct._id || relatedProduct.slug}
                                    product={relatedProduct}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

