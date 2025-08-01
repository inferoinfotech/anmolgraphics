import React from "react";
import { useId } from "react";
import { ChevronRight } from "lucide-react";

const IndustrySolutions = () => {
    const solutions = [
        {
            title: "Corporate & IT Companies",
            description: "Professional ID cards with security features for corporate environments.",
            icon: "🏢",
            features: ["Barcode Integration", "RFID & Smart Cards", "Attendance & Access Control", "Custom Branding", "Employee Badges"]
        },
        {
            title: "Educational Institutions",
            description: "Durable student and staff ID cards, event badges, and visitor passes.",
            icon: "🎓",
            features: ["Student & Staff ID Cards", "Library & Canteen Access", "Event & Alumni Badges", "Visitor Passes", "Parent ID Cards"]
        },
        {
            title: "Healthcare & Hospitals",
            description: "Hygienic, tamper-proof ID cards for medical professionals and staff.",
            icon: "🏥",
            features: ["Doctor & Nurse ID Cards", "Patient Wristbands", "Medical Staff Access Cards", "Barcode-enabled Pharmacy Cards", "Emergency Response Tags"]
        },
        {
            title: "Manufacturing & Industrial",
            description: "High-durability ID cards for workers, contractors, and visitors.",
            icon: "🏭",
            features: ["Worker & Contractor Badges", "Safety Compliance Cards", "Time & Attendance Tracking", "RFID Access for Restricted Areas", "Machine Operator IDs"]
        },
        {
            title: "Retail & Hospitality",
            description: "Branded ID badges for employees in restaurants, hotels, and stores.",
            icon: "🛒",
            features: ["Employee Name Badges", "Customer Loyalty Cards", "Access Control for Staff", "Custom Lanyards & Accessories", "Security & Surveillance Integration"]
        },
        {
            title: "Government & NGOs",
            description: "Secure identity cards for officials, volunteers, and field workers.",
            icon: "🏛️",
            features: ["Government Official ID Cards", "Volunteer & Field Worker Badges", "RFID-enabled Security Passes", "Election & Polling Booth IDs", "Disaster Response Team Badges"]
        },
        {
            title: "Exhibitions & Events",
            description: "Custom ID solutions for trade shows, conferences, and large-scale events.",
            icon: "🎪",
            features: ["Exhibitor & Vendor Badges", "Visitor & Guest Passes", "VIP & Speaker Credentials", "RFID-enabled Entry Cards", "Event Staff & Crew ID Cards"]
        },
        {
            title: "Security & Law Enforcement",
            description: "Specialized ID cards for police, security agencies, and defense personnel.",
            icon: "🚔",
            features: ["Police & Security ID Cards", "Access Control for High-Security Areas", "RFID-enabled Tactical Badges", "Private Security Firm ID Cards"]
        }
    ];


    return (
        <section className="py-8 sm:py-12 lg:py-24">
            <div className="max-w-[1440px] px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-pj">
                        Our Industry Solutions
                    </h2>
                    <p className="text-center text-sm sm:text-base md:text-lg font-medium text-gray-600">
                        We provide specialized ID solutions for various industries.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-[1440px] mx-auto mt-8 sm:mt-10">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-b from-neutral-100 to-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <Grid size={16} className="text-gray-400 mb-2" />
                            <p className="text-lg sm:text-xl font-bold text-neutral-800 relative z-20">
                                {solution.icon} {solution.title}
                            </p>
                            <p className="text-neutral-600 mt-2 sm:mt-4 text-sm sm:text-base font-normal relative z-20">
                                {solution.description}
                            </p>
                            <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-gray-900 relative z-20">
                                {solution.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center transform text-xs sm:text-sm transition-transform duration-300 hover:translate-x-1"
                                    >
                                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                                        <span className="ml-1 sm:ml-2">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Grid = ({ pattern, size }) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-zinc-100/30 to-zinc-300/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

const GridPattern = ({ width, height, x, y, squares, ...props }) => {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y], idx) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}-${idx}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
};

export default IndustrySolutions;