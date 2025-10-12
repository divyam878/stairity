'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative bg-[#FAFAFA] py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative p-8 md:p-12">
            {/* Notebook lines pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_24px]"></div>
              <div className="absolute left-12 top-0 bottom-0 w-px bg-gray-200"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Text Content */}
                <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                    Ready to transform your digital presence?
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 max-w-2xl relative pl-6">
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></span>
                    Let&apos;s build something amazing together. Get in touch with our team today.
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-block bg-gray-900 text-white hover:bg-gray-800 font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 border-2 border-transparent hover:border-gray-900"
                  >
                    Get Started
                  </Link>
                </div>
                
                {/* Image */}
                <div className="lg:w-1/2 relative">
                  <div className="relative w-full h-64 lg:h-96">
                    <Image
                      src="/images/CTAimage.svg"
                      alt="Digital Transformation"
                      fill
                      className="object-contain"
                      priority
                    />
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
