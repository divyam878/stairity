"use client";

import { useState } from "react";
import Image from "next/image";
import Underline from "../../../components/Underline";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const faqItems = [
    {
      question: "What is your hiring process like?",
      answer:
        "Our process typically involves four steps: Initial Application Review, a short Take-Home Assessment (for technical roles), a Virtual Interview with the hiring manager, and a final Culture Fit Discussion with a team lead. We aim to move quickly while ensuring a great experience.",
    },
    {
      question: "What kind of talent are you looking for?",
      answer:
        "We look for talented creatives and builders across design, development, and content. We value candidates who are proactive, eager to learn, and passionate about creating inspiring digital experiences.",
    },
    {
      question: "Do you offer remote work or only in-office positions?",
      answer:
        "We offer flexible work options. While some roles may require occasional in-office presence for collaboration, most positions support a hybrid or fully remote setup, depending on the role and location.",
    },
    {
      question: "What is the typical project timeline for a new hire?",
      answer:
        "We believe in setting up new team members for success. You will start with a dedicated onboarding period (1-2 weeks) focused on systems and team integration, followed by joining small, focused projects before moving onto comprehensive client solutions.",
    },
    {
      question: "What benefits and professional support do you offer?",
      answer:
        "All full-time roles include health benefits, a competitive PTO policy, and dedicated budget for professional development (courses, conferences). We also run internal knowledge-sharing sessions regularly.",
    },
    {
      question: "What is your company culture like?",
      answer:
        "Our culture is built on autonomy, collaboration, and transparency. We prioritize a healthy work-life balance, encourage creative freedom, and celebrate both individual and team successes.",
    },
    {
      question: "I don't see a perfect role for me. Should I still apply?",
      answer:
        "Absolutely! We encourage you to send an open application and specify your skill set. We're always on the lookout for exceptional talent and may reach out if a relevant opportunity opens up.",
    },
    {
      question: "How are compensation and growth evaluated?",
      answer:
        "We offer competitive, market-aligned salaries. Performance and growth are reviewed annually, with clear pathways for career progression and merit-based compensation adjustments based on impact and skill development.",
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
