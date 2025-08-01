"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, PhoneCall } from "lucide-react";
import {
    IconBrandInstagram,
    IconBrandWhatsapp,
    IconHome,
    IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

const Footer = () => {
    const links = [
        { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500" />, href: "/" },
        { title: "Products", icon: <IconTerminal2 className="h-full w-full text-neutral-500" />, href: "products" },
        { title: "Instagram", icon: <IconBrandInstagram className="h-full w-full text-neutral-500" />, href: "#" },
        { title: "Whatsapp", icon: <IconBrandWhatsapp className="h-full w-full text-neutral-500" />, href: "https://wa.me/919724259889", target: "_blank", rel: "noopener noreferrer" },
    ];

    return (
        <footer className="bg-white text-gray-700 border-t py-10 px-4 md:px-10">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {/* Logo and Description */}
                <div className="text-center sm:text-left">
                    <Link href="/" passHref>
                        <img src="/assets/images/erasebg-transformed.png" alt="logo" width={144} height={50} className="mx-auto sm:mx-0 w-36" />
                    </Link>
                    <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto sm:mx-0">
                        Anmol Graphics specializes in ID cards, lanyards, badges, and printing solutions with fast, high-quality service across 14 states in India.
                    </p>
                    <div className="hidden md:flex justify-center sm:justify-start mt-4">
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-2 md:gap-8 mt-6 sm:text-left">
                    <div>
                        <h3 className="text-sm ml-5 font-semibold text-gray-600">COMPANY</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "about" },
                                { name: "Products", href: "products" },
                                { name: "Faq", href: "faq" },
                                { name: "Contact Us", href: "contact" }
                            ].map((item, index) => (
                                <li key={index} className="group relative">
                                    <Link href={item.href} className="flex items-center justify-start sm:justify-start group-hover:translate-x-2 transition-transform duration-300">
                                        <ChevronRight className="mr-2 w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm ml-5 font-semibold text-gray-600">HELP</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            {[
                                { name: "Customer Support", href: "/support" },
                                { name: "Terms & Conditions", href: "/terms" },
                                { name: "Privacy Policy", href: "/privacy" }
                            ].map((item, index) => (
                                <li key={index} className="group relative">
                                    <Link href={item.href} className="flex items-center justify-start sm:justify-start group-hover:translate-x-2 transition-transform duration-300">
                                        <ChevronRight className="mr-2 w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Information */}
                <div className="mt-6 text-left">
                    <h3 className="text-sm font-semibold text-gray-600 text-center md:text-start">INFORMATION</h3>
                    <div className="mt-4 flex md:block justify-between items-center md:space-y-4 text-sm text-gray-500">
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <Clock className="w-3 h-3 text-gray-500" />
                                <h4 className="font-semibold">Working Hours</h4>
                            </div>
                            <p>Mon - Fri : 9:00 AM - 6:00 PM</p>
                            <p>Sat : 10:00 AM - 4:00 PM</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <PhoneCall className="w-3 h-3 text-gray-500" />
                                <h4 className="font-semibold">Contact Number</h4>
                            </div>
                            <p>+91 97242 59889</p>
                            <p>+91 78200 23555</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t pt-5 text-center text-xs text-gray-500">
                © Copyright 2025, All Rights Reserved by Anmol Graphics
            </div>
        </footer>
    );
};

export default Footer;