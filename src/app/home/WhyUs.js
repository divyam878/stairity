"use client";

import React from 'react';
import Image from 'next/image';
import Underline from "../../components/Underline";

const WaveDivider = ({ className = '', flip = false, fill = '#ffffff' }) => (
  <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`w-full h-12 md:h-20 ${flip ? 'transform rotate-180' : ''}`}
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        fill={fill}
      />
    </svg>
  </div>
);
const WhyUs = () => {
  const points = [
    "Strategic Approach to Every Project",
    "Fast, Mobile-First Development",
    "Designed for Conversions",
    "Scalable, SEO-Ready Architecture",
    "Ongoing Support & Growth Plans",
    
  ];

  return (
    <section className="relative w-full flex flex-col items-center bg-[#FAFAFA] overflow-hidden py-16 md:py-24">
      {/* Top Wave */}
      <WaveDivider className="absolute top-0 left-0 right-0" flip={false} fill="#FAFAFA" />
      
      {/* Bottom Wave */}
      <WaveDivider className="absolute bottom-0 left-0 right-0" flip={true} fill="#FAFAFA" />

      <div className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left Column - Heading and Points */}
            <div className="w-full lg:w-1/2">
              <div className="text-left mb-8">
                <h2 className="text-4xl md:text-5xl font-light font-hello text-black mb-4">
                  Why <span className="relative inline-block font-hello font-medium">
                Us?
                <div
                  className="absolute -bottom-3 md:-bottom-3 lg:-bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#932600" width="100%" thickness="8" />
                </div>
                
              </span>
                </h2>
                
              </div>
              <p className="text-lg text-black font-regular mb-8">
              We work like an in-house team for early-stage startups, personal brands, and growing businesses.
              </p>
              
              <ul className="space-y-6">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        src="/images/smallArrowDoodle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="text-orange-500"
                      />
                    </div>
                    <p className="text-lg text-black">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex items-center">
              <div className="relative w-full max-w-2xl mx-auto">
                <img
                  src="/images/whyUsImage.jpeg"
                  alt="Why Choose Us"
                  width={700}
                  height={700}
                  className="lg:max-w-none lg:h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;