"use client"; // ✅ Ensure this runs on the client side

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
        <section ref={ref} className="py-10  sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                {/* Title Section */}
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Numbers tell our story
                    </h2>
                    <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                        We take pride in delivering high-quality identification and printing solutions across industries.
                    </p>
                </div>

                {/* Counter Section */}
                <div className="grid grid-cols-1 gap-8 mt-10 text-center sm:grid-cols-2 md:grid-cols-3 lg:mt-20 sm:gap-x-8">
                    {/* Card 1 */}
                    <div>
                        <h3 className="font-bold text-5xl sm:text-6xl lg:text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {inView && <CountUp start={0} end={18} duration={2} />}+
                            </span>
                        </h3>
                        <p className="mt-4 text-lg sm:text-xl font-medium text-gray-900">Years in Business</p>
                        <p className="text-sm sm:text-base mt-1 text-gray-500">Serving clients with excellence</p>
                    </div>

                    {/* Card 2 */}
                    <div>
                        <h3 className="font-bold text-5xl sm:text-6xl lg:text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {inView && <CountUp start={0} end={14} duration={2} />}+
                            </span>
                        </h3>
                        <p className="mt-4 text-lg sm:text-xl font-medium text-gray-900">States Covered</p>
                        <p className="text-sm sm:text-base mt-1 text-gray-500">Delivering across India</p>
                    </div>

                    {/* Card 3 */}
                    <div>
                        <h3 className="font-bold text-5xl sm:text-6xl lg:text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {inView && <CountUp start={0} end={900} duration={2} />}+
                            </span>
                        </h3>
                        <p className="mt-4 text-lg sm:text-xl font-medium text-gray-900">Businesses Served</p>
                        <p className="text-sm sm:text-base mt-1 text-gray-500">Trusted by schools, companies & more</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Counter;
