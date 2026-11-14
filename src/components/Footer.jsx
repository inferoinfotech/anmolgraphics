"use client";

import React from "react";
import Link from "next/link";
import { Clock, Mail, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import PoweredByKeviot from "./PoweredByKeviot";

const Footer = () => {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const companyLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const helpLinks = [
    { name: "Customer Support", href: "/support" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const linkClass =
    "text-sm text-gray-500 transition-colors hover:text-[#0E3A56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B6E9C] focus-visible:outline-offset-2 rounded-sm";

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-gray-700">
      <div className="site-container py-8 md:py-9">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-block">
              <img
                src="/assets/images/erasebg-transformed.png"
                alt="Anmol Graphics"
                width={144}
                height={50}
                className="mx-auto w-36 sm:mx-0"
              />
            </Link>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:mx-0">
              Anmol Graphics specializes in ID cards, lanyards, badges, and printing solutions
              with fast, high-quality service across 14 states in India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Company</h3>
              <ul className="mt-3 space-y-2">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Help</h3>
              <ul className="mt-3 space-y-2">
                {helpLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-left sm:col-span-2 lg:col-span-1">
            <h3 className="text-center text-sm font-semibold text-gray-600 sm:text-left">
              Contact
            </h3>
            <div className="mt-3 space-y-3 text-sm text-gray-500">
              <div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Clock className="h-3.5 w-3.5 text-[#C48A3A]" aria-hidden />
                  <span>Working hours</span>
                </div>
                <p className="mt-1 leading-snug">Mon – Fri: 9:00 AM – 6:00 PM</p>
                <p className="leading-snug">Sat: 10:00 AM – 4:00 PM</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <PhoneCall className="h-3.5 w-3.5 text-[#C48A3A]" aria-hidden />
                  <span>Phone</span>
                </div>
                <p className="mt-1">
                  <a href="tel:+919724259889" className={linkClass}>
                    +91 97242 59889
                  </a>
                </p>
                <p>
                  <a href="tel:+917820023555" className={linkClass}>
                    +91 78200 23555
                  </a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Mail className="h-3.5 w-3.5 text-[#C48A3A]" aria-hidden />
                  <span>Email</span>
                </div>
                <p className="mt-1">
                  <a href="mailto:anmol_graphics@ymail.com" className={linkClass}>
                    anmol_graphics@ymail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 flex flex-col items-center justify-center gap-1 border-t border-slate-200 pt-4 text-center text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-0">
          <span>
            © {year}{" "}
            <span className="font-medium text-[#0E3A56]">Anmol Graphics</span>. All Rights
            Reserved.
          </span>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>
            |
          </span>
          <PoweredByKeviot />
        </p>
      </div>
    </footer>
  );
};

export default Footer;