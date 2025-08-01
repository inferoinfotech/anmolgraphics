import React from 'react'
import { StickyScroll } from '../ui/sticky-scroll-reveal';
import Image from "next/image";
import { Card } from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/Button';

const FeatureProducts = () => {
    const content = [
        {
            image: "/assets/images/feature-1.jpg",
            title: "Custom Identity Cards for Schools & Companies",
            description:
                "Durable, personalized identity cards for schools, companies, and organizations. Our high-quality cards are available in various designs and can be customized with your logo, text, and more.",
        },
        // {
        //     image: "/assets/images/feature-5.jpg",
        //     title: "Multicolored Lanyards",
        //     description:
        //         "Make a statement with our stylish multicolored lanyards. Ideal for holding IDs, badges, or keys, these lanyards can be customized with your brand colors and logo for a professional look.",
        // },
        {
            image: "/assets/images/feature-5.jpg",
            title: "lanyards",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        },
        {
            image: "/assets/images/feature-4.jpg",
            title: "Yoyo",
            description:
                " Our retractable yoyo badge reels provide convenience and mobility for accessing ID cards, keys, or security passes. Perfect for employees, students, and event attendees who need quick access without hassle.",
        },
        {
            image: "/assets/images/21.jpg",
            title: "Running out of content",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        },
        {
            image: "/assets/images/26.jpg",
            title: "Rsdsadst",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        },
        {
            image: "/assets/images/18.jpg",
            title: "asdsadasdasdt",
            description:
                "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        },
    ];
    return (
        <>
            <div className='px-4 lg:px-0 py-10 md:py-32'>
                <div className="max-w-[1440px] mx-auto">
                    <span className='flex items-center gap-2 bg-[#f3f3f3] max-w-fit px-2 py-1 text-xs font-inter rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                            <g>
                                <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
                            </g>
                        </svg>
                        WHAT WE PROVIDES
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                            <g>
                                <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
                            </g>
                        </svg>

                    </span>
                    <div className="my-5 text-2xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                        Feature Products
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.map((product, index) => (
                            <Card
                                key={index}
                                id={index}
                                image={product.image}
                                title={product.title}
                            />
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link href="/products">
                            <Button
                                variant="outline"
                                className="px-6 py-3 text-base font-medium hover:bg-gray-900 hover:text-white transition"
                            >
                                Browse All Products
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* <StickyScroll content={content} /> */}
            </div>
        </>
    )
}

export default FeatureProducts