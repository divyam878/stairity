"use client";

import { useState } from "react";
import Image from "next/image";
import Underline from "../../../components/Underline";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const faqItems = [
  {
    question: "What kind of websites do you build?",
    answer:
      "We build everything from portfolio and business websites to fully customized e-commerce platforms and web applications — all tailored to your brand and goals.",
  },
  {
    question: "Do you design from templates or build custom designs?",
    answer:
      "Every website we create is custom-designed. We start from scratch to match your brand identity, user flow, and performance goals — no pre-made templates.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern, high-performance stacks like Next.js, React, Node.js, and MongoDB. Every project is optimized for speed, scalability, and SEO.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Timelines depend on complexity. Most business websites take 2–4 weeks, while advanced web applications or e-commerce builds take 6–8 weeks.",
  },
  {
    question: "Can you help with branding and content too?",
    answer:
      "Yes. Along with development, we offer branding, logo design, brand strategy, and content creation to ensure your brand voice is consistent across all touchpoints.",
  },
  {
    question: "Do you handle SEO and digital marketing?",
    answer:
      "Absolutely. Every website we build is SEO-optimized by default, and we also offer digital marketing, social media, and paid campaign strategies for long-term growth.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Our pricing depends on scope and requirements. Basic websites start at an accessible rate, while full-scale brand and marketing solutions are priced based on strategy and scale. We provide transparent quotes before we begin.",
  },
  {
    question: "Do you offer maintenance and updates after launch?",
    answer:
      "Yes. Every project includes a 15–30 day support period. We also offer ongoing maintenance, performance checks, and content updates under flexible monthly plans.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we collaborate with clients globally. All communication and reviews happen online, making the process smooth regardless of location.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Definitely. Whether it’s a full rebrand or UX refresh, we can modernize your current site for better performance, aesthetics, and conversion.",
  },
];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-5 bg-[#FAFAFA] w-full box-border text-left">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="mb-16 w-full">
          <span className="block text-xs font-semibold text-[#9AA1AE] uppercase tracking-wider mb-4 text-left w-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <div className="relative w-full flex items-start">
            <div className="flex-1">
              <h2 className="text-[46px] font-light text-black m-0 leading-snug text-left relative inline-block max-w-[80%]">
                Your Questions{" "}
                <span className="relative text-[42px] inline-block font-hello font-normal">
                  Answered Here.
                  <div className="absolute -bottom-3 md:-bottom-3 lg:-bottom-4 left-1/2 -translate-x-1/2 md:scale-x-[1.2] w-full">
                    <Underline color="#649F66" width="100%" thickness="4" />
                  </div>
                </span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#4CAF50] opacity-30 -z-10 -rotate-1"></span>
              </h2>
            </div>
            <div className="ml-5 -mt-2.5 flex-shrink-0">
              <Image
                src="/images/questionMarkDoodle.svg"
                alt="Question mark doodle"
                width={120}
                height={120}
                className="relative"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-2.5">
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full text-left py-5 text-[26px] font-normal transition-colors duration-300 flex justify-between items-start ${
                  activeIndex === index ? "text-black" : "text-[#333]"
                }`}
              >
                <span className="text-left pr-4">{item.question}</span>
                <span
                  className={`text-[#666] transition-transform duration-300 ml-5 flex-shrink-0 flex items-center justify-center text-2xl ${
                    activeIndex === index ? "rotate-0" : "rotate-0"
                  }`}
                >
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              {activeIndex === index && item.answer && (
                <div className="pb-5 text-[#666] text-lg leading-relaxed text-left w-full">
                  <p>{item.answer}</p>
                </div>
              )}
              <div className="h-px bg-gray-200 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
