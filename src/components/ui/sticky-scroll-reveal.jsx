"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint) - Math.abs(latest - cardsBreakpoints[acc]);  // distance from current breakpoint
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        (<motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="h-[36rem] overflow-y-auto scrollbar-hide rounded-md p-10 py-20"
            ref={ref}>
            <div className="max-w-[1440px] mx-auto flex justify-between relative space-x-10" >
                <div className="div relative flex items-start">
                    <div className="max-w-xl">
                        {content.map((item, index) => (
                            <div key={item.title + index} className="my-32">
                                <motion.h2
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className="text-2xl font-bold text-slate-100">
                                    {item.title}
                                </motion.h2>
                                <motion.p
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className="text-kg text-slate-300 max-w-lg mt-10">
                                    {item.description}
                                </motion.p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cn("hidden lg:block h-96 w-auto rounded-2xl bg-white sticky top-5 overflow-hidden", contentClassName)}>
                    <img
                        src={content[activeCard]?.image}
                        alt={content[activeCard]?.title}
                        className="h-full w-full object-contain rounded-2xl"
                    />
                </div>
            </div>
        </motion.div>)
    );
};
