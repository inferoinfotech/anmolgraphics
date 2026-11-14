"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCatalogCard({ product }) {
  const href = `/products/${product.slug}`;
  const imageSrc = product.thumbnail || product.images?.[0] || "/placeholder.svg";
  const rating = Math.min(5, Math.max(1, Number(product.rating) || 5));

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-slate-400 sm:rounded-2xl sm:p-4">
      <div className="relative shrink-0 overflow-hidden rounded-lg bg-slate-50">
        {product.category ? (
          <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-full border border-[#DCE6ED] bg-[#F3F6FA] px-3 py-1 text-[11px] font-semibold leading-none text-[#0E3A56] shadow-[0_2px_8px_rgba(14,58,86,0.08)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {product.category}
          </span>
        ) : null}
        <Image
          src={imageSrc}
          alt={product.title}
          width={300}
          height={200}
          className="h-32 w-full object-cover sm:h-40 md:h-48"
        />
      </div>

      <div className="my-2 flex flex-grow flex-col sm:my-4">
        <h3 className="line-clamp-2 text-sm font-bold text-[#0E3A56] sm:text-base md:text-lg">
          {product.title}
        </h3>

        <div
          className="mt-2 flex gap-0.5 text-sm leading-none text-[#F0B552]"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
      </div>

      <Link
        href={href}
        className="mt-auto flex w-full items-center justify-between rounded-lg border border-[#0E3A56] px-3 py-2 text-xs font-medium text-[#0E3A56] transition-colors duration-200 hover:bg-[#0E3A56] hover:text-white sm:py-2.5 sm:text-sm"
      >
        View product
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </article>
  );
}