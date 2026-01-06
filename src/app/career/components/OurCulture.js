"use client";

import React from "react";
import { FaGlobe, FaBullhorn, FaShoppingCart } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import Underline from "@/components/Underline";

// Data for the culture boxes, replicating the colors and content from your provided service array
const culturePerksData = [
  {
    id: 1,
    title: "Remote-Friendly Culture",
    description:
      "Work from anywhere, anytime — your creativity isn’t tied to a desk.",
    bgColor: "bg-[#d6f1f8] text-black", // Light blue
    illustration: "/images/remote-friendly.png",
    // REDUCED SIZE: w-80px md:w-100px
    illustrationClasses:
      "absolute bottom-2 right-4 w-[80px] h-auto md:w-[100px] opacity-80 z-[1]",
  },
  {
    id: 2,
    title: "Creative Freedom",
    description: "You’ll have ownership and space to explore your ideas.",
    bgColor: "bg-[#a9e2f8] text-black", // Medium blue
    illustration: "/images/creative-freedom.png",
    // REDUCED SIZE: w-100px md:w-120px
    illustrationClasses:
      "absolute bottom-2 right-4 w-[100px] h-auto md:w-[120px] opacity-80 z-[1]",
  },
  {
    id: 3,
    title: "Real Projects, Real Impact",
    description: "Build for startups and brands that are making noise online.",
    bgColor: "bg-[#52c9d0] text-white", // Teal
    illustration: "/images/real-projects.png",
    // REDUCED SIZE: w-80px md:w-100px
    illustrationClasses:
      "absolute bottom-2 right-4 w-[80px] h-auto md:w-[100px] opacity-80 z-[1]",
  },
  {
    id: 4,
    title: "Collaborative Team Vibe",
    description:
      "Work alongside designers, developers, and marketers who genuinely care about great work.",
    bgColor: "bg-[#2bb4ae] text-white", // Darker teal
    illustration: "/images/collaborative-team.png",
    // REDUCED SIZE: w-100px md:w-120px
    illustrationClasses:
      "absolute bottom-2 right-4 w-[100px] h-auto md:w-[120px] opacity-80 z-[1]",
  },
];

// The CulturePerkCard component is removed, and logic is integrated into OurCulture's map function

const OurCulture = () => {
  return (
    <section className="px-4 pb-32 md:px-12 lg:px-12 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Left Section (Cards) - Replicated OurServices Card Layout */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 ">
          {culturePerksData.map((data, idx) => (
            <div
              key={data.id}
              className={`
                p-10
                h-[300px]
                md:h-[350px]
                rounded-[3rem]
                shadow-xl
                ${data.bgColor}
                relative overflow-hidden  {/* Keeping overflow-hidden now that image positioning is fixed */}
                flex flex-col justify-start gap-4 transform transition-transform duration-300 z-[1]
                ${idx % 2 === 0 ? "sm:translate-y-[-30px]" : "sm:translate-y-[30px]"}
              `}
            >
              {/* Illustration (Image on bottom right) */}
              <img
                src={data.illustration}
                alt={`${data.title} illustration`}
                className={data.illustrationClasses}
              />

              {/* Title */}
              <h3 className="text-3xl font-hello font-semibold z-[2] text-left">
                {data.title}
              </h3>

              {/* Description */}
              <p className="text-base z-[2] text-left pr-[10px] md:pr-[10px]">
                {" "}
                {/* Increased right padding to prevent text overlap */}
                {data.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Section (Header/Description) - Replicated OurServices Header Layout */}
        <div className="flex-1 lg:pl-0 mt-10 order-1 lg:order-2">
          <h2 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
            OUR CULTURE & PERKS
          </h2>
          <h2 className="text-5xl md:text-6xl lg:text-6xl font-light text-gray-500 leading-tight">
            Building a better
          </h2>

          <div className="mt-3">
            <div className="flex flex-col md:flex-row md:items-end gap-2">
              <h2 className="text-5xl md:text-6xl lg:text-6xl font-hello font-medium text-black">
                Workplace
              </h2>
              <span className="relative inline-block text-5xl md:text-6xl lg:text-6xl font-hello font-medium text-black">
                Experience
                <div
                  className="absolute -bottom-3 left-0 md:left-1/2 md:-translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]"
                  style={{ width: "70%" }}
                >
                  <Underline color="#52c9d0" width="100%" thickness="4" />
                </div>
              </span>
            </div>
          </div>

          <p className="mt-6 md:mt-10 text-sm md:text-lg text-black max-w-lg">
            We focus on creating an environment that encourages ownership,
            innovation, and genuine collaboration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurCulture;
