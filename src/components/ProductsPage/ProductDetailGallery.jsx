"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ag-blue)] focus-visible:outline-offset-2";

export default function ProductDetailGallery({ images, productTitle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const multi = images.length > 1;
  const thumbnails = images.slice(0, 4);

  useEffect(() => {
    setActiveIndex(0);
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = 0;
    }
  }, [images]);

  const scrollToIndex = useCallback((index) => {
    const next = Math.min(Math.max(0, index), images.length - 1);
    setActiveIndex(next);
    const el = scrollRef.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    el.scrollTo({ left: next * el.clientWidth, behavior });
  }, [images.length]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.min(Math.max(0, index), images.length - 1);
    setActiveIndex((prev) => (prev !== clamped ? clamped : prev));
  }, [images.length]);

  const activeSrc = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {/* Mobile / touch carousel */}
      <div className="relative md:hidden">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="ag-scrollbar-hide flex w-full max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-xl border border-[var(--ag-border)] bg-white [-webkit-overflow-scrolling:touch]"
          aria-label="Product images"
        >
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative box-border flex h-[min(45vh,360px)] min-h-[200px] w-full min-w-full max-w-full shrink-0 grow-0 basis-full snap-start snap-always items-center justify-center p-3"
            >
              <Image
                src={src}
                alt={index === 0 ? productTitle : `${productTitle} image ${index + 1}`}
                width={640}
                height={480}
                sizes="(max-width: 767px) 100vw, 640px"
                className="h-auto max-h-full w-auto max-w-full object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        {multi ? (
          <div
            className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center gap-1.5"
            aria-hidden
          >
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-4 bg-[var(--ag-blue)]"
                    : "w-1.5 bg-[var(--ag-chip-border)]"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Tablet / desktop main image */}
      <div className="relative hidden md:flex md:h-[400px] md:min-h-[380px] md:items-center md:justify-center md:rounded-xl md:border md:border-[var(--ag-border)] md:bg-white md:p-4 lg:h-[400px] lg:min-h-[380px]">
        <Image
          src={activeSrc}
          alt={productTitle}
          width={640}
          height={480}
          className="max-h-full max-w-full object-contain"
          priority
        />
      </div>

      {multi ? (
        <div className="ag-scrollbar-hide flex gap-2 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] md:pb-1">
          {thumbnails.map((img, index) => {
            const isSelected = activeIndex === index;
            return (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-white p-0.5 transition motion-reduce:transition-none md:h-[68px] md:w-[72px] md:flex-none md:rounded-lg md:border-2 md:p-1 ${FOCUS} ${
                  isSelected
                    ? "border-2 border-[var(--ag-blue)] md:border-[var(--ag-blue)]"
                    : "border border-[var(--ag-border)] md:border-transparent md:ring-1 md:ring-[var(--ag-border)]"
                }`}
                aria-label={`View image ${index + 1}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <Image
                  src={img}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}