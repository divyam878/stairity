"use client";

import { useState } from "react";
import Image from "next/image";
import Underline from "../../components/Underline";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const faqItems = [
    {
      question: "What services do you offer?",
      answer:
        "We specialize in web design, development, and digital marketing — including SEO, branding, UI/UX design, and full-stack development.",
    },
    {
      question: "Who do you typically work with?",
      answer:
        "We work with startups, small businesses, and growing brands across various industries, both in India and internationally.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "Pricing varies depending on the scope. We offer flexible packages — from one-page websites to complete brand and marketing solutions. Book a call for a free quote.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Project timelines vary based on complexity. We typically deliver within 2-4 weeks for basic websites, and 4-8 weeks for comprehensive solutions.",
    },
    {
      question: "Do you offer post-launch support?",
      answer:
        "Yes. All our projects include a 15–30 day support window. We also offer affordable ongoing maintenance plans.",
    },
    {
      question: "Will my website be mobile-friendly and SEO-optimized?",
      answer:
        "Absolutely. Every site we build is responsive, fast-loading, and built with SEO best practices.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. Whether it's a full revamp or just optimization, we can give your current site a fresh, modern upgrade.",
    },
    {
      question: "Do you sign NDAs or work under white label?",
      answer:
        "Yes, we respect confidentiality and can work under NDA or as a white-label partner for agencies.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-5 bg-white w-full box-border text-left">
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
