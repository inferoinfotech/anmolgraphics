import Link from "next/link";
import React from "react";

const ContactBreadcrumbs = () => {
    return (
        <div className="max-w-[1440px] mx-auto py-6 px-4 lg:py-10">
            {/* Breadcrumb */}
            <div className="text-gray-400 text-sm md:text-md">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">→</span>
                <Link href="/contact" className="font-medium text-gray-600 hover:underline">Contact Us</Link>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">Contact Us</h1>
        </div>
    );
}

export default ContactBreadcrumbs;
