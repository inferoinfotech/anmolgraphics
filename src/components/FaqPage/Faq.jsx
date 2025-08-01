"use client";

import { useState } from "react";
import { GlowingEffect } from "../ui/glowing-effect";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do you offer bulk discounts for schools, colleges, and corporate orders?",
    answer:
      "Yes, we provide special bulk pricing for educational institutions, corporate clients, and large-scale orders. Our competitive rates ensure cost-effective solutions without compromising quality. Contact us for a customized quote based on your requirements.",
  },
  {
    question: "What types of ID cards do you manufacture?",
    answer:
      "We manufacture a variety of ID cards, including PVC cards, RFID-enabled cards, magnetic strip cards, and smart ID cards. Our ID cards are durable, high-quality, and customizable to meet your specific needs.",
  },
  {
    question: "Can you customize ID cards with logos, barcodes, and QR codes?",
    answer:
      "Absolutely! We specialize in fully customizable ID cards, allowing you to add logos, barcodes, QR codes, and other security features to enhance identification and authentication.",
  },
  {
    question: "Do you provide design services for ID cards and printed materials?",
    answer:
      "Yes, we have a team of skilled designers who can create custom ID card designs, lanyards, and other printed materials to align with your brand identity.",
  },
  {
    question: "What is the turnaround time for bulk ID card orders?",
    answer:
      "Our standard turnaround time for bulk orders depends on the quantity and customization required. Typically, we deliver within 5-7 business days. For urgent orders, we also offer express processing.",
  },
  {
    question: "What other products do you offer besides ID cards?",
    answer:
      "In addition to ID cards, we provide lanyards, badge holders, medals, yo-yos, printed mugs, and other corporate branding materials. Our products are designed to enhance brand visibility and professionalism.",
  },
  {
    question: "Can I place an order online, and do you ship across India?",
    answer:
      "Yes, we accept online orders and ship across 14 states in India. You can place an order through our website, email, or by contacting our sales team directly.",
  },
  {
    question: "Do you offer after-sales support and reprints for damaged or lost ID cards?",
    answer:
      "Yes, we provide after-sales support, including reprinting lost or damaged ID cards at minimal cost. Customer satisfaction and service excellence are our top priorities.",
  },
  {
    question: "How can I contact your team for inquiries or custom orders?",
    answer:
      "You can reach us via phone, email, or through our website. Our team is always available to assist you with inquiries, bulk orders, and customization requirements.",
  },
];


const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <li className="list-none">
      <div className="relative h-full border p-2 sm:p-2.5 md:p-3 rounded-2xl sm:rounded-3xl">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex flex-col justify-between gap-4 sm:gap-5 md:gap-6 overflow-hidden rounded-xl border-0.75 p-3 sm:p-3.5 md:p-4">
          <div className="relative flex flex-1 flex-col justify-between md:gap-2">
            <button
              className="w-full text-left flex items-center justify-between text-base sm:text-lg font-semibold text-black group"
              onClick={onClick}
            >
              <span className="pr-8">{question}</span>
              <span className="shrink-0">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="text-sm sm:text-base text-slate-600 space-y-1 mt-2 sm:mt-3">
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="my-4 sm:my-5 md:my-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                     text-center font-bold leading-tight text-gray-900 
                     mb-3 sm:mb-4 md:mb-5">
          We're Here to Help
        </h1>
        <p className="text-center text-base sm:text-lg font-medium 
                     max-w-[90%] sm:max-w-2xl mx-auto text-gray-600 
                     px-4 sm:px-6">
          "Find quick answers to common questions. If you don't see what you're looking for,
          feel free to contact us!"
        </p>
      </div>

      <ul className="space-y-3 sm:space-y-4 sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl 
                     mx-auto my-8 sm:my-12 md:my-16 lg:my-20">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Faq;
