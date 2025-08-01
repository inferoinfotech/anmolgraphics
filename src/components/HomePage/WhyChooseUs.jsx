import React from 'react'
import { Box, Leaf, Lock, Search, Settings, ShieldCheck, Sparkles, ThumbsUp, Truck } from "lucide-react";
import { GlowingEffect } from '../ui/glowing-effect';

const WhyChooseUs = () => {
  return (
    <>
      <div className='py-10 md:py-32 max-w-[1440px] mx-auto px-4 lg:px-0'>
        <span className='flex items-center gap-2 bg-[#f3f3f3] max-w-fit px-2 py-1 text-xs font-inter rounded-md'>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <g>
              <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
            </g>
          </svg>
          EXPERTISE YOU CAN TRUST
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <g>
              <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" fill="#166d99"></path>
            </g>
          </svg>

        </span>
        <div className="my-5 text-2xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
          Why Choose Us ?
        </div>
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-4 lg:gap-4  xl:grid-rows-3">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Premium Quality Materials"
            description="We use durable PVC, RFID, and smart card technology for long-lasting ID cards."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
            icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Custom Design & Branding"
            description="Fully customizable designs with logos, colors, and personalization options."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]"
            icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="All India Service Available"
            description="Serving customers across India with reliable and timely delivery."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:2/5/3/9]"
            icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Bulk & Wholesale Pricing"
            description="Cost-effective solutions for schools, companies, and organizations at wholesale rates."
          />

          <GridItem
            area="md:[grid-area:3/1/4/7] xl:[grid-area:1/9/2/13]"
            icon={<Truck className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Fast Turnaround & Delivery"
            description="Quick production with pan-India delivery to meet urgent business needs."
          />

          <GridItem
            area="md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]"
            icon={<Leaf className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Eco-Friendly Options"
            description="We offer sustainable materials and eco-conscious printing methods."
          />

          <GridItem
            area="md:[grid-area:4/1/5/7] xl:[grid-area:3/1/4/6]"
            icon={<ShieldCheck className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Advanced Security Features"
            description="Options for barcodes, QR codes, holograms, and RFID technology to enhance security."
          />

          <GridItem
            area="md:[grid-area:4/7/5/13] xl:[grid-area:3/6/4/13]"
            icon={<ThumbsUp className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Customer Satisfaction Guaranteed"
            description="100% quality assurance with customer-friendly service and support."
          />
        </ul>

      </div>
    </>
  )
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[9rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-[14rem] list-none ${area}`}>
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
            <div className="w-fit rounded-lg border border-gray-600 p-1.5 sm:p-2">
              {icon}
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="pt-0.5 text-lg sm:text-xl md:text-2xl font-semibold text-black">
                {title}
              </h3>
              <h2 className="text-xs sm:text-sm md:text-base text-black">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WhyChooseUs