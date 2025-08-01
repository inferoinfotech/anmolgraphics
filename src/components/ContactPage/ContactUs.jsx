import React from "react";
import { MapPin, PhoneCall, Mail, Clock, FileText } from 'lucide-react';
import { GlowingEffect } from "../ui/glowing-effect";

const ContactUs = () => {
    const contactDetails = [
        {
            icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400" />,
            title: "Address",
            description: "A-202, Shree Om Apartment, Radhaswami Society, Opp. Vastukala, Ved Road, Surat - 395004, Gujarat, India",
        },
        {
            icon: <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400" />,
            title: "Contact",
            description: ["+91 97242 59889", "+91 78200 23555"],
        },
        {
            icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400" />,
            title: "Email ID",
            description: "anmol_graphics@ymail.com",
        },
        {
            icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400" />,
            title: "GST Details",
            description: ["GSTIN: 24AEWPC9392M1ZN", "PAN: AEWPC9392M", "State: Gujarat"],
        },
        {
            icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400" />,
            title: "Working Hours",
            description: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
        },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-0">
            {/* Header Badge */}
            <span className="flex items-center gap-2 bg-[#f3f3f3] max-w-fit px-2 py-1 text-[10px] sm:text-xs font-inter rounded-md mx-auto sm:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" className="sm:w-[14px] sm:h-[14px]">
                    <g>
                        <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
                    </g>
                </svg>
                CONNECT WITH US TODAY
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" className="sm:w-[14px] sm:h-[14px]">
                    <g>
                        <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
                    </g>
                </svg>
            </span>

            {/* Title */}
            <div className="my-4 sm:my-5 md:my-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                     text-center sm:text-left font-bold leading-tight text-gray-900">
                    We're Here to Help
                </h1>
            </div>

            {/* Grid Layout */}
            <ul className={`grid gap-3 sm:gap-4 lg:gap-5 pb-6 sm:pb-8 lg:pb-10
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                    ${contactDetails.length % 3 === 1
                    ? "lg:[&>*:last-child]:col-span-3"
                    : contactDetails.length % 3 === 2
                        ? "lg:[&>*:nth-last-child(2)]:col-span-2"
                        : ""
                }`}
            >
                {contactDetails.map((item, index) => (
                    <GridItem key={index} {...item} />
                ))}
            </ul>
        </div>
    );
};

const GridItem = ({ icon, title, description }) => {
    return (
        <li className="min-h-[9rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-[14rem] list-none">
            <div className="relative h-full border p-1.5 sm:p-2 md:p-3 rounded-2xl sm:rounded-3xl">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-4 sm:gap-5 lg:gap-6 
                      overflow-hidden rounded-xl border-0.75 p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="relative flex flex-1 flex-col justify-between md:gap-2">
                        {/* Icon */}
                        <div className="w-fit rounded-lg border border-gray-600 p-1.5 sm:p-2">
                            {icon}
                        </div>

                        {/* Content */}
                        <div className="space-y-2 sm:space-y-3">
                            <h3 className="pt-0.5 text-lg sm:text-xl font-semibold text-black">
                                {title}
                            </h3>
                            {Array.isArray(description) ? (
                                <div className="text-xs sm:text-sm md:text-base text-black space-y-0.5 sm:space-y-1">
                                    {description.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </div>
                            ) : (
                                <h2 className="text-xs sm:text-sm md:text-base text-black">
                                    {description}
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ContactUs;
