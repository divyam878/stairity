"use client";

import { useState } from "react";
import Image from "next/image";
import Underline from "../../../components/Underline";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqItems = [
    {
      question: "Can I start with the free audit and upgrade later?",
      answer:
        "Absolutely! Our free audit is a great way to understand your website's current performance. You can upgrade to any paid plan anytime, and we'll credit your audit insights toward the redesign process.",
    },
    {
      question: "What's included in the AI-Powered Pro plan?",
      answer:
        "The Pro plan includes unlimited access to our AI website builder, automated SEO content generation, monthly performance monitoring, and priority support. It's perfect for businesses that want ongoing optimization.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes! We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied with our service, we'll refund your payment—no questions asked.",
    },
    {
      question: "Can I cancel my monthly subscription anytime?",
      answer:
        "Yes, you can cancel your monthly AI-Powered Pro subscription at any time. You'll retain access until the end of your billing period.",
    },
    {
      question: "What if I need more than 5 pages redesigned?",
      answer:
        "No problem! We offer custom enterprise packages for larger projects. Contact us for a personalized quote.",
    },
    {
      question: "How long does a website redesign take?",
      answer:
        "Typically, our website redesign projects take 2-4 weeks depending on the scope. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you provide ongoing support after the project?",
      answer:
        "Yes! All our plans include 30-day post-launch support. For ongoing maintenance, you can opt for our monthly AI-Powered Pro plan or purchase additional support packages.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-5  w-full box-border text-left">
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="mb-16 w-full">
          <span className="block text-xs font-semibold text-[#9AA1AE] uppercase tracking-wider mb-4 text-left w-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <div className="relative w-full flex items-start">
            <div className="flex-1">
              <h2 className="text-[46px] font-light text-black m-0 leading-snug text-left relative inline-block max-w-[80%]">
                Pricing{" "}
                <span className="relative text-[42px] inline-block font-hello font-normal">
                  Questions Answered.
                  <div className="absolute -bottom-3 md:-bottom-3 lg:-bottom-4 left-1/2 -translate-x-1/2 md:scale-x-[1.2] w-full">
                    <Underline color="#005b52" width="100%" thickness="4" />
                  </div>
                </span>
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
