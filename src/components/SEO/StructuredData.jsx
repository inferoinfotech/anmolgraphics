'use client';
import React from 'react';

export default function StructuredData({ product }) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Anmol Graphics"
    },
    url: `https://anmolgraphics.in/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      url: `https://anmolgraphics.in/products/${product.slug}`,
      priceCurrency: "INR",
      price: "0.0",
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
