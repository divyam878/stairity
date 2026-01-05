'use client';

import Image from 'next/image';
import Link from 'next/link';
import Underline from '../../../components/Underline';

export default function ContactHero() {
  return (
    <section className="relative bg-[#FAFAFA] pt-32 sm:pt-40 md:pt-56 pb-12 md:pb-16 overflow-hidden">
      {/* Dotted background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Vertical lines - hidden on mobile */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gray-300 hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gray-300 hidden md:block"></div>
      {/* Middle vertical line - between title and right content */}
      <div className="absolute top-0 bottom-0 right-[38%] w-px bg-gray-300 hidden lg:block"></div>
      
      {/* Horizontal line below CONTACT US title */}
      <div className="absolute top-[350px] left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at title horizontal line intersections */}
      <div className="absolute top-[350px] left-[15%] -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute top-[350px] right-[38%] translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden lg:block z-10">+</div>
      <div className="absolute top-[350px] right-[15%] translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Horizontal line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at bottom line intersections */}
      <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute bottom-0 right-[15%] translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Content container */}
      <div className="relative mx-4 sm:mx-[5%] md:mx-[15%] px-2 sm:px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Left Content */}
          <div className="flex-1 w-full lg:max-w-2xl">
            {/* Main Heading */}
            <h1 className="relative inline-block text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-regular mb-6 md:mb-12 tracking-tight font-hello">
              Contact Us
              <div
                className="absolute -bottom-2 md:-bottom-4 left-0 scale-x-[1.2] md:scale-x-[1.5]"
                style={{ width: '100%' }}
              >
                <div className="md:hidden">
                  <Underline color="#0daeb0ff" width="100%" thickness="3" height="20" />
                </div>
                <div className="hidden md:block">
                  <Underline color="#0daeb0ff" width="100%" thickness="3" height="34" />
                </div>
              </div>
            </h1>

            
            {/* Subheading and Description */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 md:mb-4">
                Let&apos;s Build Something That Performs
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                Have a project in mind, need a website audit, or want to explore AI-powered tools? Drop us a message and our team will get back within 24 hours.
              </p>
            </div>
            
            {/* CTA Button */}
            <Link 
              href="#contact-form"
              className="inline-flex items-center gap-2 sm:gap-4 bg-black text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide hover:bg-gray-900 transition-colors group"
            >
              GET FREE CONSULTATION
              <span className="inline-block w-6 sm:w-8 md:w-12 h-px bg-white group-hover:w-10 md:group-hover:w-16 transition-all"></span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Right Content */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 md:gap-8 w-full lg:w-auto mt-6 lg:mt-0">
            {/* Audit My Website Button */}
            <Link 
              href="/website-analyzer"
              className="inline-flex items-center gap-2 sm:gap-4 bg-[#8150c1ff] text-white px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#52c9d0] transition-colors group"
            >
              <div className="text-right">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">Audit My</div>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">Website</div>
              </div>
              <span className="inline-block w-4 sm:w-6 md:w-8 h-px bg-white group-hover:w-8 md:group-hover:w-12 transition-all"></span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {/* Illustration */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <Image
                src="/images/hands-phone-illustration.png"
                alt="Hands holding phones illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
