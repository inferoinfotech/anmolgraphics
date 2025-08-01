"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);

  const phoneNumber = "919724259889"; // Replace with your WhatsApp number

  return (
    <>
      {/* Chat Popup */}
      {showPopup && (
        <div
          className="fixed bottom-28 right-20 z-[999] bg-white text-gray-800 text-sm shadow-lg rounded-xl px-4 py-2 max-w-[220px] transition-all duration-300"
          style={{ backdropFilter: "blur(6px)" }}
        >
          Hi 👋 How can we help you?
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        aria-label="Chat on WhatsApp"
        className={`
          fixed z-[1000] bottom-20 right-6 p-2 rounded-full shadow-xl 
          bg-green-500 hover:bg-green-600 text-white transition-all duration-300
        `}
        style={{ backdropFilter: "blur(6px)" }}
      >
        {/* WhatsApp SVG Icon */}
        <FaWhatsapp className="text-3xl" />
      </a>
    </>
  );
}
