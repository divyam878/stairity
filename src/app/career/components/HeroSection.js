"use client";

import React, { useState, useEffect, useRef } from "react";
// Removed: import SplitText from "./SplitText";

// --- 💡 NEW: WordSplitter Component for Native Animation (Now fully self-contained) ---
const WordSplitter = ({ text, className, delayIncrement = 50, tag = "p" }) => {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Split text into words and render spans
  const words = text.split(" ").map((word, index) => (
    <span
      key={index}
      // Removed: opacity-0 translate-y-8
      className="inline-block whitespace-nowrap mr-2 transition-all duration-700"
      style={{
        // 1. Initial/Final State is now handled here:
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(2rem)", // 2rem is the equivalent of Tailwind's translate-y-8

        // 2. Staggered delay remains:
        transitionDelay: `${index * delayIncrement}ms`,
      }}
    >
      {word}
      {/* Add a non-breaking space to ensure proper word wrapping */}
      &nbsp;
    </span>
  ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the animation when the element enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // Configure the observer to trigger when the element is 10% visible
      { threshold: 0.1 },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  // Dynamically render the text inside the specified HTML tag
  const Tag = tag;

  // The overall className is applied to the parent tag
  return (
    <Tag ref={contentRef} className={className}>
      {words}
    </Tag>
  );
};

// --- END WordSplitter Component ---

// Utility: interpolate between two RGBA colors
const interpolateColor = (scrollProgress) => {
  const startColor = [224, 247, 255, 0.8]; // very light blue
  const endColor = [56, 182, 255, 1.0]; // brand blue #38b6ff

  const r = Math.round(
    startColor[0] + (endColor[0] - startColor[0]) * scrollProgress,
  );
  const g = Math.round(
    startColor[1] + (endColor[1] - startColor[1]) * scrollProgress,
  );
  const b = Math.round(
    startColor[2] + (endColor[2] - startColor[2]) * scrollProgress,
  );
  const a = startColor[3] + (endColor[3] - startColor[3]) * scrollProgress;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const HeroSection = () => {
  const [circleColor, setCircleColor] = useState(interpolateColor(0));
  const [rotationAngle, setRotationAngle] = useState(0);
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  const totalRotationDegrees = 5 * 360;

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = heroRef.current;
        const rect = el.getBoundingClientRect();
        const scrollHeight = el.offsetHeight;
        const scrollDistance = Math.max(0, -rect.top);

        const totalProgress = Math.min(
          1,
          Math.max(0, scrollDistance / scrollHeight),
        );

        // --- 1. Update Circle Color ---
        const transitionDistance = el.offsetHeight / 1.5;
        const colorProgress = Math.min(
          1,
          Math.max(0, scrollDistance / transitionDistance),
        );
        setCircleColor(interpolateColor(colorProgress));

        // --- 2. Update Rotation Angle ---
        setRotationAngle(totalProgress * totalRotationDegrees);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // REMOVED: const circleDiameterVw = 150;

  // Page 2 text
  const text1 = `We’re a modern digital agency crafting brands, websites, and marketing that make an impact.`;
  const text2 = `Our culture blends creativity, innovation, and strategy — empowering brands to shine in the digital age.`;

  // Page 3 text strings
  const text3 = `Join us and be part of a team redefining digital presence.`;
  const text4 = `We value bold ideas, refined execution, and meaningful impact — helping brands grow through thoughtful design and modern technology.`;

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[300vh] bg-[#FAFAFA] overflow-hidden pt-20 pb-40 lg:pb-60"
    >
      {/* --- Blue Arc (Now Responsive) --- */}
      <div
        className="absolute left-1/2 rounded-full z-0
                   w-[500vw] h-[500vw] lg:w-[170vw] lg:h-[170vw]
                  " // <-- Changed to responsive classes
        style={{
          backgroundColor: circleColor,
          top: "50%",
          transform: "translate(-50%, -50%)",
          transition: "background-color 150ms linear",
        }}
      />

      {/* --- Page 1 Content --- */}
      <div className="sticky top-0 flex flex-col items-center justify-center min-h-screen text-center z-10">
        <div className="relative max-w-6xl px-6 flex flex-col items-center justify-center">
          {/* Heading Block */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-semibold text-black tracking-tight leading-tight -z-1">
              CAREERS AT{" "}
              <span className="font-hello font-regular text-[#38b6ff]">
                Stairity
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-regular text-gray-900 mt-4">
              Build the Future of Digital Creativity
            </p>
          </div>

          {/* White Sphere with Logo and Moon */}
          <div
            className="relative w-40 h-40 md:w-52 md:h-52 bg-white rounded-full
                                 shadow-lg mx-auto
                                 flex items-center justify-center"
          >
            {/* New: Moon image behind the logo */}
            <img
              src="/images/moon.png"
              alt="Moon"
              // Center the moon, slightly smaller than the sphere
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                   w-40 h-40 md:w-52 md:h-52 object-contain  z-[1]"
            />
            <img
              src="/images/stairitylogohalf.svg"
              alt="Stairity Logo"
              width={100}
              height={100}
              className="w-24 h-24 md:w-32 md:h-32 object-contain z-[2]" // Ensure logo is above moon
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            />
          </div>

          {/* GET IN TOUCH Button */}
          <a
            href="#contact"
            className="mt-16 md:mt-20 relative group flex items-center justify-center w-48 h-12 md:w-56 md:h-14 rounded-full bg-[#1a5f9c] hover:bg-[#13497a] transition-colors duration-300 z-10"
          >
            <span className="text-white font-medium text-sm md:text-base tracking-wider">
              GET IN TOUCH
            </span>
            <svg
              className="w-4 h-4 md:w-5 md:h-5 ml-2 text-white transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* --- Page 2 Content (Native Animation) --- */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-2 text-center z-10">
        <div className="max-w-6xl">
          {/* Text Block 1 */}
          <WordSplitter
            text={text1}
            className="text-3xl md:text-5xl text-gray-800 leading-relaxed"
            tag="p"
          />

          <div className="h-6" />

          {/* Text Block 2 */}
          <WordSplitter
            text={text2}
            className="text-2xl md:text-3xl text-[white] font-hello leading-relaxed"
            tag="p"
          />
        </div>
      </div>

      {/* --- Page 3 Content (Native Animation) --- */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center z-10 mb-46">
        <div className="max-w-5xl">
          {/* Text Block 3 - Applied brand color via className */}
          <WordSplitter
            text={text3}
            className="text-4xl md:text-6xl font-bold text-white leading-relaxed" // Restored blue color for better visibility
            tag="p"
          />

          <div className="h-6" />

          {/* Text Block 4 */}
          <WordSplitter
            text={text4}
            className="text-xl md:text-3xl text-gray-800 leading-relaxed"
            tag="p"
          />
        </div>
      </div>
      {/* New: Cloud 1 - positioned at the bottom-left of the Page 3 container */}
      <img
        src="/images/cloud-1.png"
        alt="Cloud"
        className="absolute bottom-100 md:bottom-160 left-0 w-[100%] md:w-[100%] h-auto z-[1]
                     transform translate-y-1/2" // translate-y-1/2 makes it overlap bottom edge
        style={{
          opacity: circleColor.includes("rgba(224,") ? 0 : 0.5,
          transition: "opacity 150ms linear",
          pointerEvents: "none",
        }}
      />

      {/* New: Cloud 2 - positioned at the bottom-right of the Page 3 container */}
      <img
        src="/images/cloud-2.png"
        alt="Cloud"
        className="absolute bottom-100 md:bottom-180 right-0 w-[100%] md:w-[100%] h-auto z-[1]
                     transform translate-y-1/2" // translate-y-1/2 makes it overlap bottom edge
        style={{
          opacity: circleColor.includes("rgba(224,") ? 0 : 0.5, // Transitions to 0.5 opacity
          transition: "opacity 150ms linear",
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

// The component is now fully self-contained and does not require external CSS.

export default HeroSection;
