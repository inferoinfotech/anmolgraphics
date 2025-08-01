// ProductDetailPage.jsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export default function ProductDetailPage({ product }) {

  const [mainImage, setMainImage] = useState(product?.images?.[0] || "/placeholder.jpg");

  if (!product) return <div>Product not found</div>;

  return (
    <div className="mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Image Section */}
        <div>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={`Main view of ${product.title}`}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail of ${product.title} - View ${index + 1}`}
                className={`w-28 aspect-[4/3] object-cover border rounded cursor-pointer transition-transform duration-300 hover:scale-105 ${mainImage === img ? "ring-2 ring-blue-500" : ""
                  }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          {/* Ratings - optional */}
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          {product.price && (
            <p className="text-lg text-gray-700">
              ₹{product.price} <span className="text-sm">Onwards</span>
            </p>
          )}

          {/* Description */}
          <p className="text-gray-600 text-[15px] leading-relaxed">
            {product.description}
          </p>

          {/* CTA Buttons (optional) */}
          <div className="flex gap-4 mt-4">
            <Link href={'/contact'}>
              <Button>Send Enquiry</Button>
            </Link>
          </div>

          {/* Divider */}
          <hr className="my-4" />

          {/* Highlights */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Highlights</h3>
            <ul className="space-y-2">
              {product.highlights?.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                  <Check className="text-green-600 w-4 h-4 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="my-4" />

          {/* Note */}

          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Note</h3>
            <p className="text-gray-600 text-sm">Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
