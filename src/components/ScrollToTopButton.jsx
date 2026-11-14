"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isProductDetailPath(pathname) {
  return Boolean(
    pathname && pathname.startsWith("/products/") && pathname.length > "/products/".length
  );
}

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const hiddenAdmin = Boolean(pathname && pathname.startsWith("/admin"));
  const onProductDetail = isProductDetailPath(pathname);

  useEffect(() => {
    if (hiddenAdmin) return undefined;
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [hiddenAdmin]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (hiddenAdmin) return null;

  const positionClass = onProductDetail
    ? "max-md:hidden md:bottom-6"
    : "bottom-6";

  return (
    <>
      {isVisible ? (
        <button
          type="button"
          onClick={scrollToTop}
          className={`fixed right-6 z-50 rounded-full border border-gray-300 p-3 text-sm text-gray-800 shadow-md transition-all hover:bg-gray-900 hover:text-white motion-reduce:transition-none ${positionClass}`}
          aria-label="Scroll to top"
        >
          <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </>
  );
}