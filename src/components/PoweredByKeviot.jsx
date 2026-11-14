"use client";

import { useEffect, useState } from "react";

const KEVIOT_LOGO_URL =
  "https://res.cloudinary.com/dhckfe9kc/image/upload/f_auto,q_auto:best/v1792490346/keviot_assets/main-keviot-logo/Keviot_Logo.png";

const KEVIOT_SITE_URL = "https://keviottech.com/";

const linkClass =
  "inline-flex cursor-pointer items-center text-inherit no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B6E9C] focus-visible:outline-offset-2 rounded-sm";

export default function PoweredByKeviot() {
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoReady(true);
    img.onerror = () => setLogoReady(false);
    img.src = KEVIOT_LOGO_URL;
  }, []);

  return (
    <a
      href={KEVIOT_SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClass} gap-1`}
    >
      <span>Powered by</span>
      {logoReady ? (
        <span className="group relative ml-0.5 inline-block align-middle leading-none sm:ml-1">
          <span className="whitespace-nowrap font-medium text-[#0E3A56] transition-opacity duration-300 ease-out group-hover:opacity-0">
            Keviot Tech Pvt Ltd
          </span>
          <img
            src={KEVIOT_LOGO_URL}
            alt="Keviot Tech Pvt Ltd"
            width={120}
            height={24}
            className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-auto max-w-[10rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:h-8"
            onError={() => setLogoReady(false)}
          />
        </span>
      ) : (
        <span className="ml-0.5 font-medium text-[#0E3A56] sm:ml-1">Keviot Tech Pvt Ltd</span>
      )}
    </a>
  );
}