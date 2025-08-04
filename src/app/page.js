import Counter from "@/components/HomePage/Counter";
import FeatureProducts from "@/components/HomePage/FeatureProducts";
import HeroSection from "@/components/HomePage/HeroSection";
import IndustrySolutions from "@/components/HomePage/IndustrySolutions";
import Testimonial from "@/components/HomePage/Testimonial";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import StructuredDataScript from "@/components/SEO/StructuredDataScript";

export const metadata = {
  title: "Anmol Graphics | ID Cards, RFID & Printing Solutions",
  description: "Anmol Graphics offers high-quality ID cards, RFID cards, lanyards, and more — customized for schools, companies, and events across India.",
  alternates: {
    canonical: "https://anmolgraphics.in/",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Anmol Graphics",
  "url": "https://anmolgraphics.in/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://anmolgraphics.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};


export default function Home() {
  return (
    <>
      <StructuredDataScript data={schema} />
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