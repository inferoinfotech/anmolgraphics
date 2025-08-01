"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const bannerimages = [
    { image: "/assets/images/26.jpg", title: "ID Card" },
    { image: "/assets/images/18.jpg", title: "ID Card" },
    { image: "/assets/images/Womad-Lanyard.webp", title: "ID Card" },
    { image: "/assets/images/25.jpg", title: "ID Card" },
    { image: "/assets/images/21.jpg", title: "ID Card" },
    { image: "/assets/images/sublimation-mug.jpg", title: "ID Card" },
    { image: "/assets/images/wrist-band-heroimage.jpg", title: "ID Card" },
];

export const InfiniteMovingCards = ({
    items = bannerimages,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);
    useEffect(() => {
        setStart(true);
    }, []);


    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty("--animation-duration",
                speed === "fast" ? "15s" : speed === "normal" ? "40s" : "80s"
            );
        }
    };

    return (
        <div className="w-full overflow-hidden">
            <div
                ref={containerRef}
                className={cn(
                    "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent_5%,white_30%,white_70%,transparent_95%)]",
                    className
                )}
            >
                <ul
                    ref={scrollerRef}
                    className={cn(
                        "flex shrink-0 gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-nowrap",
                        start && "animate-scroll",
                        pauseOnHover && "hover:[animation-play-state:paused]"
                    )}
                >
                    {[...items, ...items].map((item, idx) => (
                        <li
                            className="w-[180px] xs:w-[120px] sm:w-[140px] md:w-[160px] lg:w-[200px] xl:w-[250px] 
                                        relative rounded-xl border border-slate-200 bg-transparent 
                                       flex-shrink-0 h-auto"
                            key={`${item.title}-${idx}`} // Unique key using title and index
                        >
                            <div className="relative z-20">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto rounded-xl object-cover"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


