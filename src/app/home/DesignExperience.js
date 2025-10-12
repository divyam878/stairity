"use client";

import React from "react";
import Image from "next/image";
import Underline from "../../components/Underline";
// Import SVG images
const ComplexEmoji = () => (
  <div className="w-24 h-24 relative">
    <Image 
      src="/images/complex.svg" 
      alt="Complex Interfaces" 
      width={96} 
      height={96}
      className="w-full h-full object-contain"
    />
  </div>
);

const InconsistentEmoji = () => (
  <div className="w-24 h-24 relative">
    <Image 
      src="/images/inconsistent.svg" 
      alt="Inconsistent Branding" 
      width={96} 
      height={96}
      className="w-full h-full object-contain"
    />
  </div>
);

const PoorEmoji = () => (
  <div className="w-24 h-24 relative">
    <Image 
      src="/images/poor.svg" 
      alt="Poor Visual Hierarchy" 
      width={96} 
      height={96}
      className="w-full h-full object-contain"
    />
  </div>
);

const ArrowUp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProblemCard = ({ emoji, title, className = "" }) => (
  <div className={`flex flex-col items-center p-6  rounded-lg  h-full ${className}`}>
    <div className="mb-4 mt-8">
      {emoji}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
  </div>
);

export default function DesignExperience() {
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-full mx-auto">
        <div className="text-left mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-5xl  font-light text-gray-500 mb-2">
            Creating Wonderful
            </h1>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-medium text-black mb-2">
             <span className="relative inline-block font-hello font-medium">
                Design
                <div
                  className="absolute -bottom-3 md:-bottom-3 lg:-bottom-4 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#ED3001" width="100%" thickness="5" />
                </div>
                
              </span>
              {" "}Experiences
          </h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Grid */}
          <div className="relative grid grid-cols-2 gap-6">
            {/* Vertical divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 transform -translate-x-1/2"></div>
            {/* Horizontal divider */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 transform -translate-y-1/2"></div>
            
            <div className="relative font-hello ">
              <ProblemCard 
                emoji={<ComplexEmoji />}
                title="Complex Interfaces"
                className="relative z-10"
              />
            </div>
            
            <div className="relative font-hello">
              <ProblemCard 
                emoji={<InconsistentEmoji />}
                title="Inconsistent Branding"
                className="relative z-10"
              />
            </div>
            
            <div className="relative font-hello">
              <ProblemCard 
                emoji={<PoorEmoji />}
                title="Poor Visual Hierarchy"
                className="relative z-10"
              />
            </div>
            
            <div className="relative flex items-center lg:pl-12  space-x-4">
              <div className="bg-black text-white p-4 lg:pl-6 rounded-full flex items-center justify-center h-48 w-48">
                <div className="text-[#FEB301]">
                  <ArrowUp />
                </div>
                <span className="text-xl font-medium">ELEVATE YOUR PRESENCE</span>
              </div>
            </div>
          </div>

          {/* Right Section - 11+ Industries */}
          <div className="flex items-center">
            <div className="relative">
              <div className="relative z-10">
                <div className="text-8xl font-medium font-hello text-black">11+</div>
                <div className="absolute -top-8 -left-4 w-40 h-40 -z-10">
                  <Image 
                    src="/images/doodlecircle.svg" 
                    alt="" 
                    width={180} 
                    height={180}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-lg font-regular text-black">
                  <span className="font-bold">Industries</span> focused on making your business goals a reality through innovative web design, compelling branding, and effective digital marketing initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}