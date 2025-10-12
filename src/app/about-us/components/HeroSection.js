"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const statRefs = {
    websites: useRef(null),
    pages: useRef(null),
    roi: useRef(null),
    businesses: useRef(null)
  };

  useEffect(() => {
    // Animate stats when component mounts
    const stats = [
      { ref: statRefs.websites, value: 350, suffix: "+" },
      { ref: statRefs.pages, value: 850, suffix: "+" },
      { ref: statRefs.roi, value: 85, suffix: "%" },
      { ref: statRefs.businesses, value: 28, suffix: "+" }
    ];

    // Set initial state
    gsap.set(stats.map(stat => stat.ref.current), { opacity: 0, y: 50 });

    // Create animation for each stat
    stats.forEach((stat, index) => {
      gsap.to(stat.ref.current, {
        scrollTrigger: {
          trigger: stat.ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.out"
      });

      // Animate counting numbers
      const count = { value: 0 };
      gsap.to(count, {
        scrollTrigger: {
          trigger: stat.ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        value: stat.value,
        duration: 2,
        delay: index * 0.2,
        ease: "power2.out",
        onUpdate: () => {
          if (stat.ref.current) {
            const value = stat.suffix === "%" 
              ? Math.round(count.value) 
              : Math.round(count.value);
            stat.ref.current.querySelector('.stat-number').textContent = value;
          }
        }
      });
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [statRefs.websites, statRefs.pages, statRefs.roi, statRefs.businesses]);
  return (
    <div className="w-full min-h-[calc(100vh-80px)] mt-20 bg-[#FAFAFA] py-20 px-0">
      <div className="w-full">
        <div className="text-center mb-16 px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            From{" "}
            <span className="font-light font-hello text-[#ACD9D9]">
              Insights
            </span>{" "}
            to <span className="bg-black text-white px-3 py-1">IMPACT</span> -
            We
            <div className="mt-2">Make Every Step Count.</div>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            At Stairity, we're not just a{" "}
            <span className="font-semibold">digital agency</span> — we're your
            partner in scalable success. We build high-performing websites,
            elevate user experience, and drive measurable growth. From
            performance insights to pixel-perfect design, we help brands step
            up.
          </p>
        </div>

        {/* Stats and CTA */}
        <div className="relative w-full h-[400px] mb-0">
          {/* Left side stats at bottom */}
          <div className="absolute left-0 bottom-0 flex w-[400px]">
            {/* Left (taller) card with higher z-index and rightward shadow */}
            <div 
              ref={statRefs.websites}
              className="relative h-[400px] w-1/2 bg-white shadow-[40px_0_40px_rgba(0,0,0,0.08)] z-20 p-6"
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl font-bold whitespace-nowrap">
                  <span className="stat-number">0</span>
                  <span className="text-[#7ED6D1]">+</span>
                </div>
                <div className="text-gray-600 text-left mt-2">
                  Websites
                  <br />
                  Analyzed
                </div>
              </div>
            </div>

            {/* Right (shorter) card that sits *under* the shadow of the left */}
            <div 
              ref={statRefs.pages}
              className="relative h-[300px] mt-25 w-1/2 bg-white shadow-[20px_0_30px_rgba(0,0,0,0.05)] z-10 p-6"
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl font-bold whitespace-nowrap">
                  <span className="stat-number">0</span>
                  <span className="text-[#7ED6D1]">+</span>
                </div>
                <div className="text-gray-600 text-left mt-2">
                  Pages
                  <br />
                  Optimized
                </div>
              </div>
            </div>
          </div>

          {/* Center button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Link
              href="/contact-us"
              className="inline-block bg-white text-black px-8 py-3 text-lg font-medium rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-shadow duration-200"
            >
              Get in Touch
            </Link>
          </div>

          {/* Right side stats at bottom */}
          <div className="absolute right-0 bottom-0 flex gap-0 w-[400px]">
            <div 
              ref={statRefs.roi}
              className="relative h-[300px] w-1/2 bg-white shadow-[-40px_0_40px_rgba(0,0,0,0.08)] mt-25 p-6"
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl font-bold whitespace-nowrap">
                  <span className="stat-number">0</span>
                  <span className="text-[#7ED6D9]">%</span>
                </div>
                <div className="text-gray-600 text-right mt-2">
                  ROI
                  <br />
                  Increase
                </div>
              </div>
            </div>

            <div 
              ref={statRefs.businesses}
              className="relative h-[400px] w-1/2 bg-white shadow-[-40px_0_40px_rgba(0,0,0,0.08)] p-6"
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl font-bold whitespace-nowrap">
                  <span className="stat-number">0</span>
                  <span className="text-[#7ED6D1]">+</span>
                </div>
                <div className="text-gray-600 text-right mt-2">
                  Businesses
                  <br />
                  Trusted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
