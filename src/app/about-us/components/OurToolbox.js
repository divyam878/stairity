'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

gsap.registerPlugin();

export default function OurToolbox() {
  const containerRef = useRef(null);
  const designMarqueeRef = useRef(null);
  const otherMarqueeRef = useRef(null);

  // Split logos into two groups
  const designLogos = [
    '/images/logos/logo1.svg',
    '/images/logos/logo2.svg',
    '/images/logos/logo3.svg',
    '/images/logos/logo4.svg',
  ];
  const otherLogos = [
    '/images/logos/logo5.svg',
    '/images/logos/logo6.svg',
    '/images/logos/logo7.svg',
    '/images/logos/logo8.svg',
  ];

  // Duplicate for infinite loop
  const allDesignLogos = [...designLogos, ...designLogos];
  const allOtherLogos = [...otherLogos, ...otherLogos];

  useEffect(() => {
    // Animate design marquee (top strip) at 20s
    if (designMarqueeRef.current) {
      const marquee = designMarqueeRef.current;
      const singleSetWidth = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -singleSetWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % -singleSetWidth),
        },
      });
    }
    // Animate other marquee (bottom strip) at 30s
    if (otherMarqueeRef.current) {
      const marquee = otherMarqueeRef.current;
      const singleSetWidth = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -singleSetWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % -singleSetWidth),
        },
      });
    }
    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(designMarqueeRef.current);
      gsap.killTweensOf(otherMarqueeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Dotted SVG Background */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full object-cover"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMinYMin slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotted-bg"
              x="0"
              y="0"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.20" fill="#E5E7EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-bg)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Toolbox</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We use industry-leading tools and technologies to deliver exceptional results
          </p>
        </div>

        <div className="relative h-[400px] md:h-[500px] overflow-visible" ref={containerRef}>
          {/* First Angled Rectangle (Design Logos) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full">
            <div className="relative w-full h-full">
              <div className="absolute top-0 right-0 w-full h-[40%] bg-white rounded-2xl transform -rotate-3 origin-bottom-right transition-all duration-300" style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="absolute inset-0 p-8 overflow-hidden">
                  <div
                    className="logo-marquee flex min-w-max space-x-16 h-full items-center"
                    ref={designMarqueeRef}
                  >
                    {allDesignLogos.map((logo, index) => (
                      <div key={index} className="flex-shrink-0 w-32 h-32 relative">
                        <div className="w-full h-full" style={{
                          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))'
                        }}>
                          <Image
                            src={logo}
                            alt={`Design Logo ${index % designLogos.length + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Angled Rectangle (Other Logos) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-full">
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 left-0 w-full h-[40%] bg-white rounded-2xl transform rotate-3 origin-top-left transition-all duration-300" style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="absolute inset-0 p-8 overflow-hidden">
                  <div
                    className="logo-marquee flex min-w-max space-x-16 h-full items-center"
                    ref={otherMarqueeRef}
                  >
                    {allOtherLogos.map((logo, index) => (
                      <div key={`other-${index}`} className="flex-shrink-0 w-32 h-32 relative">
                        <div className="w-full h-full" style={{
                          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))'
                        }}>
                          <Image
                            src={logo}
                            alt={`Other Logo ${index % otherLogos.length + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
