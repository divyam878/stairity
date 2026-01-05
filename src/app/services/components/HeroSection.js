import React from "react";
import Underline from "../../../components/Underline";
// Embedded SVG component for the arrow
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const HeroSection = () => {
  return (
    // Section Container
    // I added py-24 to give the section vertical padding
    <section className="relative flex min-h-[95vh] items-center overflow-hidden py-24 bg-[#FAFAFA] ">
      {/* Background Rectangle (This one is correct and stays) */}
      <div className="absolute bottom-0 left-1/2 z-0 h-1/2 w-[98%] max-w-full -translate-x-1/2 rounded-2xl bg-[#f8f7ff]">
        <img
          src="/images/doodle-purple.svg"
          alt="Purple Doodle Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* FIX #2: Added horizontal padding here (px-6 lg:px-8)
        This adds the "padding" you wanted.
      */}
      <div className="container relative z-10 mx-auto flex max-w-full flex-col items-center justify-between gap-0 px-6 lg:flex-row lg:px-8">
        {/* Left Side: Text Content */}
        <div className="z-10 flex-[1.2] text-center lg:order-1 lg:max-w-2xl lg:pr-16 lg:text-left pt-12">
          <h1 className="mb-6 font-normal leading-tight text-[#2d2d2d]">
            <span className="block text-2xl md:text-5xl text-gray-500">
              MAKE THE INTERNET
            </span>

            <span className="block text-5xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 mt-2 md:pb-12">
              REMEMBER <span className="font-semibold italic">YOUR NAME</span>
            </span>
          </h1>
          <p className="mx-auto mb-8 pt-6 max-w-full text-xl leading-relaxed text-[#555] lg:mx-0">
            Stairity helps startups grow with custom websites, branding, and
            digital marketing that transform ideas into powerful online
            identities.
          </p>

          {/* CTA Button */}
          <button
            className="group inline-flex items-center rounded-full bg-[#1a1a1a] px-7 py-4 text-base font-bold text-white transition-all duration-300 ease-in-out hover:bg-[#333] hover:-translate-y-0.5"
            aria-label="Let's Build Your Brand Together"
          >
            <span className="flex items-center gap-2.5">
              Let's Build Your Brand Together
              <ArrowIcon className="w-6 h-6" />
            </span>
          </button>
        </div>

        {/* Right Side: Mockup Image */}
        <div className="flex-[0.9] order-1 w-full lg:order-2 lg:max-w-lg lg:pl-8 pt-12">
          <div className="relative">
            <img
              src="/images/stairity_mock.png"
              alt="Stairity brand mockup"
              className="mx-auto w-full max-w-lg lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
