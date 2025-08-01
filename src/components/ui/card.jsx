// components/ui/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";


export const Card = ({ image, title, id }) => {
  return (
    <div
      className="border border-slate-200 hover:border-slate-700 transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 group relative flex flex-col h-full"
    >
      {/* Product Image */}
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-32 sm:h-40 md:h-64 object-cover rounded-lg"
      />
      {/* Content Section */}
      <div className="my-2 sm:my-4 flex-grow">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};
