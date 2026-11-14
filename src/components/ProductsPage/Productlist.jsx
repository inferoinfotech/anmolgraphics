"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input"
import ProductCatalogCard from "./ProductCatalogCard"
import { ProductCategorySidebar, ProductCategoryMobileDrawer } from "./ProductCategorySidebar"
import {
    normalizeCategorySelection,
    resolveSelectedCategory,
} from "./productCategoryNavUtils"

const SEARCH_PLACEHOLDERS = [
    "Find your perfect ID card...",
    "Looking for a custom lanyard?",
    "Search badges, holders, and attachments...",
    "Type to find medals and awards",
    "Explore trending products...",
]

const Productlist = ({ searchTerm = "", setSearchTerm }) => {
    const [categories, setCategories] = useState([{ name: "All", products: [] }])
    const [selectedCategoryName, setSelectedCategoryName] = useState("All")
    const [loading, setLoading] = useState(true)

    const setCategory = useCallback((name) => {
        setSelectedCategoryName(normalizeCategorySelection(name))
    }, [])

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

    const selectedCategory = useMemo(
        () => resolveSelectedCategory(categories, selectedCategoryName),
        [categories, selectedCategoryName]
    )

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
        <main className="site-container-fluid">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 py-5 lg:grid-cols-5 lg:gap-x-8 lg:py-10">
                <ProductCategorySidebar
                    categories={categories}
                    selectedName={selectedCategoryName}
                    onSelect={setCategory}
                />

                {/* Right Side: Products Display */}
                <section className="min-w-0 lg:col-span-4 lg:pr-0">
                    <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{selectedCategory.name}</h2>
                        <div className="w-full sm:max-w-md">
                            <label htmlFor="product-search" className="sr-only">
                                Search products
                            </label>
                            <PlaceholdersAndVanishInput
                                inputId="product-search"
                                compact
                                placeholders={SEARCH_PLACEHOLDERS}
                                onChange={(e) => setSearchTerm?.(e.target.value)}
                                onSubmit={(e) => e.preventDefault()}
                                className="mx-0 h-11 max-w-full border-2 border-slate-300 bg-slate-50 shadow-[0_2px_10px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/90 focus-within:border-slate-500 focus-within:bg-white focus-within:shadow-md"
                            />
                        </div>
                    </div>
                    <ProductCategoryMobileDrawer
                        categories={categories}
                        selectedName={selectedCategoryName}
                        onSelect={setCategory}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCatalogCard
                                key={product._id || product.slug}
                                product={product}
                            />
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


