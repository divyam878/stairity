'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function OurPurpose() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current.querySelector('.title-container'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  const services = [
    { title: 'Digital Strategy &', subtitle: 'Growth', color: 'bg-[#3498DB]' },
    { title: 'Modern Web', subtitle: 'Development', color: 'bg-[#F1C40F]' },
    { title: 'CSS Optimization', subtitle: 'Tools', color: 'bg-[#2ECC71]' },
    { title: 'Web Performance', subtitle: 'Analyzer', color: 'bg-[#E74C3C]' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#FAFAFA] py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="title-container text-center mb-16">
          <p className="text-gray-500 uppercase tracking-wide mb-4">OUR PURPOSE</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <h2 className="text-5xl font-bold">What We Do</h2>
            <Image
              src="/images/questionMarkDoodle.svg"
              alt="Question Mark"
              width={40}
              height={40}
              className="ml-2"
            />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re a startup or a growing brand, our focus is the same:
            turn your website into your strongest asset.
          </p>
        </div>

        <div className="relative mt-32 w-full h-[900px] mx-auto">
          {/* Back rotated rectangle */}
          <Image
            src="/images/rotatedrectangleback.svg"
            alt="Background Shape"
            fill
            className="absolute z-0 object-contain ml-18 lg:scale-x-[1.2] lg:scale-y-[1.005] hidden xl:block"
            style={{ filter: 'drop-shadow(0 -8px 12px rgba(0, 0, 0, 0.1))' }}
          />

          {/* Colored service cards */}
          <Image
            src="/images/bluecard.svg"
            alt="Blue Card"
            fill
            className="absolute z-1 object-contain"
            style={{ filter: 'drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.15))' }}
          />
          <Image
            src="/images/yellowcard.svg"
            alt="Yellow Card"
            fill
            className="absolute z-2 object-contain mt-10"
            style={{ filter: 'drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.15))' }}
          />
          <Image
            src="/images/greencard.svg"
            alt="Green Card"
            fill
            className="absolute z-3 object-contain mt-20"
            style={{ filter: 'drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.15))' }}
          />
          <Image
            src="/images/redcard.svg"
            alt="Red Card"
            fill
            className="absolute z-4 object-contain mt-40"
            style={{ filter: 'drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.15))' }}
          />

          {/* Front elements */}
          <Image
            src="/images/rotatedrectanglefront.svg"
            alt="Front Shape"
            fill
            className="absolute z-5 object-contain ml-125 mt-2 lg:scale-x-[2.2] lg:scale-y-[1.01] hidden xl:block"
            style={{ filter: 'drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.1))' }}
          />
          <Image
            src="/images/graycardfronthorizontal.svg"
            alt="Gray Card"
            fill
            className="absolute z-6 object-contain mt-60 scale-[1.03]"
            style={{ filter: 'drop-shadow(0 -9px 12px rgba(0, 0, 0, 0.1))' }}
          />
        </div>
      </div>
    </section>
  );
}