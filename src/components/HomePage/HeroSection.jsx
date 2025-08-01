import React from 'react'
import { FlipWords } from "@/components/ui/flip-words";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Link from 'next/link';

const HeroSection = () => {
    const words = ["Identity-Cards", "RFID Cards", "Lanyards", "Medals", "Printed Mug", "Wrist Band"];
    return (
        <>
            <HeroHighlight className="text-center">
                <section className="py-16">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h1 className="px-6 text-md md:text-lg text-gray-600 font-inter">"Trusted Identity Card Manufacturer for Businesses & Schools"</h1>
                            <div className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                                We Manufacture High-Quality
                                <span className="relative inline-flex sm:inline">
                                    <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                                    <span className="relative">
                                        <FlipWords words={words} />
                                    </span>
                                </span>
                            </div>


                            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                                <Link
                                    href="/contact"
                                    title=""
                                    className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    role="button"
                                >
                                    <svg
                                        className="feather transition-all duration-300 me-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                        />
                                    </svg>

                                    Contact Us
                                </Link>
                                <Link
                                    href="/products"
                                    title=""
                                    className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900"
                                    role="button"
                                >
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 h-2/3"></div>
                        <div className="relative mx-auto">
                            <div className="max-w-[375px] lg:max-w-7xl py-3 sm:py-10 md:py-12 mt-5 md:mt-12 lg:mx-auto">
                                <InfiniteMovingCards />
                            </div>
                        </div>
                    </div>
                </section>
            </HeroHighlight>


        </>
    )
}

export default HeroSection