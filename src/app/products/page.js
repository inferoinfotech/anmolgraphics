'use client'
import ProBreadcurmbs from '@/components/ProductsPage/ProBreadcurmbs'
import Productlist from '@/components/ProductsPage/Productlist'
import { useState, useEffect } from 'react';

export default function Products() {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSearchTerm(""); // Ensuring no mismatch during hydration
    }, []);

    return (
        <div className="bg-white">
            <div className="border-b">
                <ProBreadcurmbs searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <Productlist searchTerm={searchTerm} />
        </div>
    )
}
