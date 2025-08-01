'use client';
import Counter from "@/components/HomePage/Counter";
import FeatureProducts from "@/components/HomePage/FeatureProducts";
import HeroSection from "@/components/HomePage/HeroSection";
import IndustrySolutions from "@/components/HomePage/IndustrySolutions";
import Testimonial from "@/components/HomePage/Testimonial";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";

export default function Home() {
  return (
    <>
      <section className="">
        <HeroSection />
        <WhyChooseUs />
        <FeatureProducts />
        <Testimonial />
        <IndustrySolutions />
        <Counter />
      </section>
    </>
  );
}