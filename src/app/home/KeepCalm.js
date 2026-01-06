"use client";

import Image from "next/image";
import Underline from "../../components/Underline";
import { useCTAModal } from "../../components/providers/CTAProvider";

export default function KeepCalm() {
  const { openCTAModal } = useCTAModal();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#FAFAFA] overflow-hidden px-6 md:px-12">
      {/* Optional Pattern Background */}
      <div className="absolute inset-0 w-full h-full pattern-background z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Text Content */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-6xl font-light text-gray-500">
            Keep Calm
          </h2>
          <h1 className="text-5xl md:text-7xl text-black font-medium leading-tight relative inline-block">
            We got{" "}
            <span className="relative inline-block font-hello">
              You
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                style={{ width: "80%" }}
              >
                <Underline color="#3FBF47" width="120%" thickness="7" />
              </div>
            </span>
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            At Webestrix, we don't just analyze — we elevate. From{" "}
            <strong>optimization</strong> to <strong>design</strong>, our{" "}
            <strong>full-stack web services</strong> help your brand scale like
            never before.
          </p>
          <div className="mt-8">
            <button 
              onClick={openCTAModal}
              className="relative bg-black text-white text-2xl font-light px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-0.5"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, box-shadow',
                letterSpacing: '0.5px'
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                I Need Help
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </span>
              <span 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  zIndex: 0
                }}
              />
            </button>
          </div>
        </div>

        {/* Right Side - Text and SVG */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl pr-22 font-hello mb-2 text-black text-left">
            My Score is
            <br />
            too low !
          </p>
          <img
            src="/images/WORRY.svg"
            alt="Crying Stick Figure"
            className="w-28 md:w-36 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
