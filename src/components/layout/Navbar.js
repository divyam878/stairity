'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wand2, User, BarChart3 } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
            <img 
              src="/images/webestrix-logo-full-3.svg" 
              alt="Webestrix Logo" 
              width={120} 
              height={40} 
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
                  background: 'linear-gradient(#FDFDFB, #FDFDFB) padding-box, linear-gradient(90deg, #f0c4dcff 0%, #9ae4ecff 33%, #7a90feff 66%, #785defff 100%) border-box',
                  border: '2px solid transparent'
                }}
              >
                <Wand2 className="w-4 h-4" style={{ color: '#A78BFA' }} />
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

            {/* User Authentication */}
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link 
                    label="Dashboard"
                    labelIcon={<BarChart3 className="w-4 h-4" />}
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <SignedOut>
              <Link 
                href="/sign-in" 
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </SignedOut>
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
            <nav className="flex flex-col space-y-1">
              <Link 
                href="/about-us" 
                className="text-lg md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-1 border-b border-gray-200 "
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-lg md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/tools" 
                className="py-1 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="font-semibold text-lg"
                    style={{ 
                      background: 'linear-gradient(90deg, #f35b9f 0%, #0891B2 33%, #6366F1 66%, #8B5CF6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >AI Tools</span>
                  <Wand2 className="w-5 h-5" style={{ color: '#A78BFA' }} />
                </div>
              </Link>
              <Link 
                href="/career" 
                className="text-lg md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Career
              </Link>
              <Link 
                href="/pricing" 
                className="text-lg md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blogs" 
                className="text-lg md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="/contact-us" 
                className="text-lg text-gray-700 hover:text-gray-900 font-medium py-1 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-2">
                <SignedIn>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-lg text-gray-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5" />
                    Dashboard
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link 
                    href="/sign-in" 
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium text-lg mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Sign In
                  </Link>
                </SignedOut>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;