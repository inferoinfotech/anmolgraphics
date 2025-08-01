"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");

    useEffect(() => {
        animate("span", {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
        }, {
            duration: duration ? duration : 1,
            delay: stagger(0.2),
        });
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline-block">
                {wordsArray.map((word, idx) => (
                    <motion.span
                        key={word + idx}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-0"
                        style={{
                            filter: filter ? "blur(10px)" : "none",
                        }}>
                        {word}{" "}
                    </motion.span>
                ))}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className="text-xl font-inter sm:text-2xl md:text-xl font-semibold text-gray-800 leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
