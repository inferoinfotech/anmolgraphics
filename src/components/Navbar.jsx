"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, Mail, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Products", href: "/products" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full bg-white/30 py-2 backdrop-blur-lg bg-gradient-to-b from-[#f5f7ff] to-white">
            <div className="site-container flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/">
                    <img src="/assets/images/erasebg-transformed.png" alt="logo" width={144} height={50} className="w-40" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex gap-x-12">
                        {navItems.map((item, index) => (
                            <li key={index} className="px-2 relative">
                                <Link href={item.href}>
                                    <span className="text-[#3F444B] hover:text-black font-semibold transition-all relative py-2 rounded-full group bg-transparent flex items-center gap-1 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-600 after:transform after:origin-right after:scale-x-0 after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact Section (Desktop) */}
                <div className="hidden lg:flex border border-slate-300 rounded-lg">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-l-lg">
                        <Mail className="text-slate-500" />
                        <div>
                            <p className="text-xs text-gray-500">Any Inquiry <span className="font-medium text-slate-800 ms-4">+91 97242 59889</span></p>
                            <p className="text-sm font-medium text-slate-800">anmol_graphics@ymail.com</p>
                        </div>
                    </div>

                    {/* Right Section - Black Box */}
                    <div className="bg-black text-white px-4 py-3 rounded-r-lg flex items-center justify-center cursor-pointer">
                        <Link href="/contact">
                            <LayoutGrid className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={handleClick}
                    className="shrink-0 lg:hidden"
                    aria-label="Open menu"
                >
                    <LayoutGrid className="h-7 w-7" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed w-full h-screen top-0 left-0 shadow-md overflow-auto z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-white"
                    >
                        {/* Top Section: Logo & Close Button */}
                        <div className="absolute left-0 right-0 top-6">
                            <div className="site-container flex items-center justify-between">
                                <Link href="/">
                                    <img
                                        src="/assets/images/erasebg-transformed.png"
                                        alt="logo"
                                        width={144}
                                        height={50}
                                        className="w-40"
                                    />
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    className="rounded-xl border border-slate-500 p-1"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6 text-slate-700" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Items */}
                        <ul className="flex flex-col space-y-6 items-center">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} onClick={() => setIsOpen(false)} className="text-[#3F444B] font-semibold text-lg transition-all">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Contact Section (Mobile - At Bottom) */}
                        <div className="absolute bottom-8 border-t pt-6 pb-8 flex flex-col items-center w-full">
                            <div className="flex flex-col items-center border border-slate-300 rounded-lg w-fit max-w-md">
                                <div className="flex items-center justify-evenly space-x-2 px-4 py-2 bg-slate-100 rounded-lg w-fit">
                                    <Mail className="text-slate-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Any Inquiry <span className="font-medium text-slate-800 ms-4">+91 97242 59889</span></p>
                                        <p className="text-sm font-medium text-slate-800">anmol_graphics@ymail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>


        </header>
    );
};

export default Navbar;