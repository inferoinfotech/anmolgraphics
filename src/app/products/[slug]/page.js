import products from "@/components/ProductsPage/ProductData"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ProductDetailPage from "@/components/ProductsPage/ProductDetails"
import StructuredData from "@/components/SEO/StructuredData"

export async function generateMetadata({ params }) {
    const product = products.find((p) => p.slug === params.slug)
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
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetail({ params }) {
    const { slug } = params // Get product slug
    const product = products.find((p) => p.slug === params.slug);
    if (!product) {
        return notFound()
    }

    // Get related products
    const relatedProducts = products
        .filter((item) => item.slug !== slug && item.hashtags.some((tag) => product.hashtags.includes(tag)))
        .slice(0, 4);

    return (
        <>
            <StructuredData product={product} />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
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
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className="border border-slate-200 hover:border-slate-700 transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 group relative flex flex-col h-full"
                                >
                                    <Image
                                        src={relatedProduct.images[0] || "/placeholder.svg"}
                                        alt={relatedProduct.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                                    />
                                    <div className="my-2 sm:my-4 flex-grow">
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">{relatedProduct.title}</h3>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <Link
                                            href={`/products/${relatedProduct.slug}`}
                                            className="text-xs sm:text-sm bg-gray-900 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-700"
                                        >
                                            View Product
                                        </Link>
                                        <span className="text-gray-600 flex items-center group-hover:translate-x-1 transition-all duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 md:h-5 w-4 md:w-5 ml-2"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

