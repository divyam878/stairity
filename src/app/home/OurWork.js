"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Underline from "../../components/Underline";
const showcaseImages = [
  {
    src: "/images/HOMmockup.png",
    alt: "House Of Modular",
  },
  {
    src: "/images/axioMockup.png",
    alt: "Innovate Engineer Scale",
  },
  {
    src: "/images/WYFmockup.png",
    alt: "Winter Collection",
  },
  {
    src: "/images/nesscoMockup.png",
    alt: "Industrial Equipment",
  },
];

// Duplicate the images array to create a seamless loop
const duplicatedImages = [...showcaseImages, ...showcaseImages];

export default function OurWork() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 1; // Adjust speed as needed (lower is slower)
  let scrollPosition = 0;
  let isPaused = false;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startScrolling = () => {
      if (isPaused) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled the width of one set of images
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(startScrolling);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(startScrolling);

    // Pause on hover
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; startScrolling(); };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden px-6 md:px-12">
      <div className="w-full mx-auto ">
        {/* Section Header - Left Aligned */}
        <div className="mb-12 w-full max-w-3xl lg:pl-12 ">
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
            OUR WORK
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-light text-gray-500">
            Our Best {' '}
            

            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light text-black">
            <span className="relative inline-block font-hello font-medium">
              Work
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                style={{ width: "80%" }}
              >
                <Underline color="#5FD0FF" width="120%" thickness="6" />
              </div>
            </span> {' '}
            <span className="relative inline-block font-medium">
               at Showcase
              <span className="absolute left-0 bottom-1 w-full h-3 bg-purple-200/70 -z-10 transform -rotate-1"></span>
            </span>
          </h2>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-x-auto no-scrollbar pb-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex space-x-0 w-full">
            {duplicatedImages.map((item, idx) => (
              <div key={`${item.alt}-${idx}`} className="group relative flex-shrink-0">
                <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] lg:w-[600px] lg:h-[500px] overflow-hidden rounded-xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom scrollbar styling */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
