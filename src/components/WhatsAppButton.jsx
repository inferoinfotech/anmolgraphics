"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

function isProductDetailPath(pathname) {
  return Boolean(
    pathname && pathname.startsWith("/products/") && pathname.length > "/products/".length
  );
}

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const onProductDetail = isProductDetailPath(pathname);
  const phoneNumber = "919724259889";

  return (
    <>
      {showPopup ? (
        <div
          className="fixed bottom-28 right-20 z-[999] max-w-[220px] rounded-xl bg-white px-4 py-2 text-sm text-gray-800 shadow-lg transition-all duration-300"
          style={{ backdropFilter: "blur(6px)" }}
        >
          Hi 👋 How can we help you?
        </div>
      ) : null}

      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-20 right-6 z-[1000] rounded-full bg-green-500 p-2 text-white shadow-xl transition-all duration-300 hover:bg-green-600 ${
          onProductDetail ? "max-md:hidden" : ""
        }`}
        style={{ backdropFilter: "blur(6px)" }}
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </>
  );
}