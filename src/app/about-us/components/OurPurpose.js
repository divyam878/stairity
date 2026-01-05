"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Folder from "../../../components/Folder/Folder";
import Underline from "../../../components/Underline";

gsap.registerPlugin(ScrollTrigger);

export default function OurPurpose() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready on client-side navigation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const titleContainer = sectionRef.current?.querySelector(".title-container");
      if (titleContainer) {
        gsap.fromTo(
          titleContainer,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    { 
      title: "Digital Strategy", 
      description: "We craft data-driven blueprints to accelerate your digital growth and market presence.", 
      color: "bg-[#3498DB]" 
    },
    { 
      title: "Modern Web Dev", 
      description: "Building blazing fast, scalable, and secure web applications using next-gen technologies.", 
      color: "bg-[#F1C40F]" 
    },
    { 
      title: "CSS Optimization", 
      description: "Refining styles for pixel-perfect, lightweight, and performant user interfaces.", 
      color: "bg-[#2ECC71]" 
    },
    { 
      title: "Web Performance", 
      description: "Analyzing and optimizing core web vitals to ensure top-tier speed and user experience.", 
      color: "bg-[#E74C3C]" 
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#FAFAFA] py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="title-container text-center mb-16">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase pb-4">
            Our Purpose
          </h3>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-light text-black mb-2">
            What We
            <span className="relative text-3xl md:text-5xl lg:text-5xl inline-block font-hello font-medium p-3">
              Do ?
              <div
                className="absolute -bottom-2 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2"
                style={{ width: "100%" }}
              >
                <Underline color="#00bf63" width="100%" thickness="4" />
              </div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            Whether you&apos;re a startup or a growing brand, our focus is the
            same: turn your website into your strongest asset.
          </p>
        </div>

        
        <div className="relative h-[400px] md:h-[600px] flex justify-center items-center border border-dashed border-[#ccc] mt-8 w-[90%] md:w-full mx-auto">
          <Folder 
            size={5} 
            color="#d9d9d9" 
            className="custom-folder scale-75 md:scale-100"
            items={services}
          />
        </div>
      </div>
    </section>
  );
}
