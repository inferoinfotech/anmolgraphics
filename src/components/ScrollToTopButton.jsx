"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isScrollToTopHidden(pathname) {
  if (!pathname) return false;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/products/") && pathname.length > "/products/".length) {
    return true;
  }
  return false;
}

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const hidden = isScrollToTopHidden(pathname);

  useEffect(() => {
    if (hidden) return undefined;
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [hidden]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (hidden) return null;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 border border-gray-300 text-gray-800 hover:bg-gray-900 hover:text-white transition-all rounded-full p-3 text-sm shadow-md"
          aria-label="Scroll to top"
        >
          <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}
