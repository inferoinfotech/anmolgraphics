import dbConnect from "@/lib/dbConnect"
import Product from "@/lib/models/Product"
import { seedDatabase } from "@/lib/seed"
import { notFound } from "next/navigation"
import ProductDetailPage from "@/components/ProductsPage/ProductDetails"
import StructuredData from "@/components/SEO/StructuredData"

export const dynamic = "force-dynamic"

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

    const dbProduct = await Product.findOne({ slug }).lean()
    if (!dbProduct) {
        return notFound()
    }
    const product = JSON.parse(JSON.stringify(dbProduct))

    const dbRelated = await Product.find({
        slug: { $ne: slug },
        hashtags: { $in: product.hashtags || [] }
    }).limit(4).lean()
    const relatedProducts = JSON.parse(JSON.stringify(dbRelated))

    return (
        <>
            <StructuredData product={product} />
            <div className="bg-[var(--ag-page-bg)] pb-[4.5rem] md:pb-6">
                <div className="site-container py-4 pb-4 sm:py-6 sm:pb-6">
                    <ProductDetailPage product={product} relatedProducts={relatedProducts} />
                </div>
            </div>
        </>
    )
}