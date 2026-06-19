"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight } from "lucide-react"

const Productlist = ({ searchTerm = "" }) => {
    const [categories, setCategories] = useState([{ name: "All", products: [] }])
    const [selectedCategoryName, setSelectedCategoryName] = useState("All")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const data = await res.json()
                
                const dbProducts = data.products || []
                const dbCategories = data.categories || []

                const constructed = [
                    { name: "All", products: dbProducts },
                    ...dbCategories.map(cat => ({
                        name: cat.name,
                        products: dbProducts.filter(p => p.category === cat.name)
                    }))
                ]
                setCategories(constructed)
            } catch (error) {
                console.error("Failed to load products:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    const selectedCategory = categories.find(c => c.name === selectedCategoryName) || categories[0] || { name: "All", products: [] }

    // Filter products based on search term
    const filteredProducts = selectedCategory.products.filter(
        (product) =>
            (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.hashtags && product.hashtags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <svg 
                    className="animate-spin h-8 w-8 text-slate-800" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <span className="text-sm font-medium text-slate-500">Loading products...</span>
            </div>
        )
    }

    return (
        <main className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            {/* Mobile Category Filter Toggle */}
            <div className="lg:hidden py-4">
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex items-center justify-between w-full bg-slate-100 px-4 py-3 rounded-xl"
                >
                    <span className="font-medium">Category: {selectedCategory.name}</span>
                    {isMobileFilterOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {/* Mobile Category Dropdown */}
                {isMobileFilterOpen && (
                    <div className="mt-2 bg-slate-100 rounded-xl p-3 shadow-md">
                        <ul className="space-y-1">
                            {categories.map((category) => (
                                <li
                                    key={category.name}
                                    className={`py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer 
                                    ${selectedCategory.name === category.name ? "bg-slate-300" : "hover:bg-slate-200"}`}
                                    onClick={() => {
                                        setSelectedCategoryName(category.name)
                                        setIsMobileFilterOpen(false)
                                    }}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-5 py-5 lg:py-10">
                {/* Left Sidebar: Product Categories (Desktop) */}
                <aside className="hidden lg:block bg-slate-100 px-5 py-5 rounded-3xl max-h-fit sticky top-24">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product Categories</h3>
                    <ul className="space-y-2 text-sm font-medium text-gray-900">
                        {categories.map((category) => (
                            <li
                                key={category.name}
                                className={`py-2 px-2 rounded-lg transition-all duration-300 cursor-pointer 
                                ${selectedCategory.name === category.name ? "bg-slate-300" : "hover:bg-slate-200 hover:translate-x-1"}`}
                                onClick={() => setSelectedCategoryName(category.name)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Side: Products Display */}
                <section className="lg:col-span-4 p-2 sm:p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedCategory.name}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 hover:border-slate-700 transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 group relative flex flex-col h-full"
                            >
                                {/* Product Image */}
                                <Image
                                    src={product.thumbnail || product.images[0] || "/placeholder.svg"}
                                    alt={product.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                                />
                                {/* Content Section */}
                                <div className="my-2 sm:my-4 flex-grow">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                                        {product.title}
                                    </h3>
                                </div>

                                {/* Buttons */}
                                <div className="mt-auto flex justify-between items-center">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="text-xs sm:text-sm bg-gray-900 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        View Products
                                    </Link>
                                    <span className="text-gray-600 flex items-center group-hover:translate-x-1 transition-all duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2"
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

                    {/* Empty state */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No products found in this category.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Productlist


