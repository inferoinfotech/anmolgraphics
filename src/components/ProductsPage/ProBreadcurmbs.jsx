import { Search } from "lucide-react";
import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import Link from "next/link";

const ProBreadcurmbs = ({ searchTerm, setSearchTerm }) => {
    const placeholders = [
        "Find your perfect ID card...",
        "Looking for a custom lanyard?",
        "Search printed mugs and trophies...",
        "Type to find medals and awards",
        "Explore trending products...",
    ];

    const handleChange = (e) => {
        setSearchTerm(e.target.value); // Update search term state
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search submitted:", searchTerm);
    };

    return (
        <div className="max-w-[1440px] mx-auto py-6 px-4 lg:py-10">
            {/* Breadcrumb */}
            <div className="text-gray-400 text-sm md:text-md">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">→</span>
                <Link href="/products" className="font-medium text-gray-600 hover:underline">
                    Products
                </Link>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">Browse Trending Products</h1>

            {/* Search Bar */}
            <div className="mt-6 md:mt-10">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                    value={searchTerm}
                />
            </div>
        </div>
    );
};

export default ProBreadcurmbs;
