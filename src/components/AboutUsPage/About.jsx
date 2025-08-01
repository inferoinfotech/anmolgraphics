"use client";

import React from 'react';
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle, Lightbulb, Smile, ShieldCheck } from "lucide-react";
import { LinkPreview } from '../ui/link-preview';

const About = () => {
  const values = [
    {
      title: "Quality",
      description: "We ensure top-notch products with attention to detail.",
      icon: <CheckCircle className="text-slate-400 text-4xl" />,
    },
    {
      title: "Innovation",
      description: "We embrace new technologies like RFID & Smart ID cards.",
      icon: <Lightbulb className="text-slate-400 text-4xl" />,
    },
    {
      title: "Customer Satisfaction",
      description: "We prioritize clients’ needs with exceptional service.",
      icon: <Smile className="text-slate-400 text-4xl" />,
    },
    {
      title: "Trust & Integrity",
      description: "We build lasting relationships with our customers.",
      icon: <ShieldCheck className="text-slate-400 text-4xl" />,
    },
  ];

  const data = [
    {
      title: "Our Mission",
      content: (
        <div>
          <p className="text-neutral-800 text-sm sm:text-base md:text-lg font-normal mb-4 sm:mb-6 md:mb-8">
            "To provide top-quality identity solutions with precision, innovation, and trust. We strive to empower businesses, educational institutions, and organizations with premium ID card solutions that enhance security, professionalism, and brand identity. Our commitment to quality, customer satisfaction, and timely delivery drives everything we do."
          </p>
        </div>
      ),
    },
    {
      title: "Our Vision",
      content: (
        <div>
          <p className="text-neutral-800 text-sm sm:text-base md:text-lg font-normal mb-4 sm:mb-6 md:mb-8">
            "To become India’s leading provider of cutting-edge identity solutions, setting new benchmarks in quality, technology, and service. We envision expanding our reach across industries by integrating advanced printing technologies, smart card solutions, and sustainable practices—ensuring every client experiences the best in identity solutions."
          </p>
        </div>
      ),
    },
    {
      title: "Our Values",
      content: (
        <div>
          <p className="text-neutral-800 text-sm sm:text-base md:text-lg font-normal mb-4 sm:mb-6 md:mb-8">
            The principles that drive our commitment to excellence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 rounded-2xl hover:border hover:border-slate-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {value.title}
                  </h3>
                  <span>
                    {value.icon}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Our Offerings",
      content: (
        <div className="flex justify-center items-center flex-col">
          <div className="text-neutral-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            We specialize in providing high-quality{" "}
            <LinkPreview url="your-lanyards-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-300 to-blue-500">
              ID Cards
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview url="your-rfidcards-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold text-slate-600">
              RFID Cards
            </LinkPreview>, ensuring secure identification solutions for businesses, schools, and organizations.
          </div>
          <div className="text-neutral-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            Elevate your brand with our premium{" "}
            <LinkPreview url="your-lanyards-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              Multicolored Lanyards
            </LinkPreview>{" "}
            and durable{" "}
            <LinkPreview url="your-holders-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold text-slate-500">
              ID Card Holders
            </LinkPreview>, designed for both style and functionality.
          </div>
          <div className="text-neutral-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            Recognize achievements with our finely crafted{" "}
            <LinkPreview url="your-medals-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-400  to-orange-400">
              Medals
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview url="your-yoyo-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold text-gray-500">
              Yoyo
            </LinkPreview>, perfect for corporate and academic rewards.
          </div>
          <div className="text-neutral-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            Add a personal touch with our custom{" "}
            <LinkPreview url="your-printedmug-link" imageSrc="/assets/images/feature-1.jpg" className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600">
              Printed Mugs
            </LinkPreview>, an ideal gift for clients, employees, and loved ones.
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

export default About;
