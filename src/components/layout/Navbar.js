'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wand2 } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
  className="fixed top-2 left-2 right-2 z-50 bg-[#FDFDFB] px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_20px_rgba(0,0,0,0.1)]"
>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/stairityLogofull.svg" 
              alt="Stairity Logo" 
              width={120} 
              height={40} 
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about-us" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium ">
              About Us
            </Link>
            <Link href="/services" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium">
              Services
            </Link>
            <Link href="/tools" className="relative group">
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg relative"
                style={{ 
                  background: 'linear-gradient(#FDFDFB, #FDFDFB) padding-box, linear-gradient(90deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%) border-box',
                  border: '2px solid transparent'
                }}
              >
                <Wand2 className="w-4 h-4" style={{ color: '#4285F4' }} />
                <span className="font-semibold text-sm lg:text-base text-gray-700">AI Tools</span>
              </div>
            </Link>
            <Link href="/career" className="text-gray-700 hover:text-gray-900 font-medium text-2xl md:text-sm lg:text-base">
              Career
            </Link>
            <Link href="/pricing" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </Link>
            <Link href="/blogs" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium">
              Blogs
            </Link>
            <Link 
              href="/contact-us" 
              className="relative group"
            >
              <div className="relative">
                <Image 
                  src="/images/contactCircleBlack.svg" 
                  alt="Contact Us" 
                  width={120} 
                  height={60} 
                  className="transition-opacity group-hover:opacity-80"
                />
                <span className="absolute text-xl inset-0 flex items-center justify-center text-black font-medium  font-hello group-hover:text-gray-700 mt-2">
                  Contact Us
                </span>
              </div>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/about-us" 
                className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200 "
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/tools" 
                className="py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div 
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-md w-fit"
                  style={{ 
                    background: 'linear-gradient(#FDFDFB, #FDFDFB) padding-box, linear-gradient(90deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%) border-box',
                    border: '2px solid transparent'
                  }}
                >
                  <Wand2 className="w-5 h-5" style={{ color: '#4285F4' }} />
                  <span className="font-semibold text-xl text-gray-700">AI Tools</span>
                </div>
              </Link>
              <Link 
                href="/career" 
                className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Career
              </Link>
              <Link 
                href="/pricing" 
                className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blogs" 
                className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="/contact-us" 
                className="relative group block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative w-fit scale-125 md:scale-100">
                  <Image 
                    src="/images/contactCircleBlack.svg" 
                    alt="Contact Us" 
                    width={144} 
                    height={72} 
                    className="transition-opacity group-hover:opacity-80 w-[144px] h-auto"
                  />
                  <span className="absolute text-2xl md:text-xl inset-0 flex items-center justify-center text-black font-medium font-hello group-hover:text-gray-700 mt-2">
                    Contact Us
                  </span>
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;