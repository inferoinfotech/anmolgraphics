'use client'
import React from "react";
import Link from "next/link";

const ProBreadcurmbs = () => {
    return (
        <div className="site-container py-6 lg:py-10">
            <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
                <Link href="/" className="hover:underline">
                    Home
                </Link>
                <span className="mx-2">→</span>
                <Link href="/products" className="font-medium text-gray-600 hover:underline">
                    Products
                </Link>
            </nav>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
                Browse trending products
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
                Premium ID cards, lanyards, badges, and custom printing from Anmol Graphics — for
                schools, corporates, and events across India.
            </p>
        </div>
    );
};

export default ProBreadcurmbs;