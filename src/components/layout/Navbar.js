'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Wand2, User, BarChart3 } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 bg-[#fafafa] px-3 py-1 transition-all duration-300 ${isScrolled ? 'border-b border-gray-200' : ''}`}
>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-1.5">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/webestrix-logo-full-3.svg" 
              alt="Webestrix Logo" 
              width={100} 
              height={33} 
            />
          </Link>
          
          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/about-us" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-regular px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-regular px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              Services
            </Link>
            <Link href="/tools" className="relative group">
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all  hover:shadow-md relative"
                style={{ 
                  background: 'linear-gradient(#FDFDFB, #FDFDFB) padding-box, linear-gradient(90deg, #f0c4dcff 0%, #9ae4ecff 33%, #7a90feff 66%, #785defff 100%) border-box',
                  border: '1px solid transparent'
                }}
              >
                <Wand2 className="w-4 h-4" style={{ color: '#A78BFA' }} />
                <span className="font-regular text-sm lg:text-base text-gray-700">AI Tools</span>
              </div>
            </Link>
            <Link href="/career" className="text-gray-700 hover:text-gray-900 font-regular text-2xl md:text-sm lg:text-base px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              Career
            </Link>
            <Link href="/pricing" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-regular px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              Pricing
            </Link>
            <Link href="/blogs" className="text-2xl md:text-sm lg:text-base text-gray-700 hover:text-gray-900 font-regular px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              Blogs
            </Link>
          </nav>

          {/* Contact + Auth - Right */}
          <div className="hidden md:flex items-center space-x-3">
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

            <Link 
              href="/contact-us" 
              className="px-6 py-2 rounded-full font-semibold bg-black text-white text-sm transition-all hover:bg-[#0B0048] font-poppins"
             
            >
              Contact Us
            </Link>
          </div>
          
          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile User Profile */}
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
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
              <Link href="/sign-in" className="text-gray-700">
                <User className="w-6 h-6" />
              </Link>
            </SignedOut>

            {/* Hamburger Menu Button */}
            <button 
              className="text-gray-700 focus:outline-none"
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
        </div>
        
        {/* Mobile Menu - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-[#fafafa] z-[45] overflow-y-auto">
            <nav className="flex flex-col h-full px-6 py-6">
              <Link 
                href="/about-us" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/tools" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link 
                href="/career" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Career
              </Link>
              <Link 
                href="/pricing" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blogs" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="/contact-us" 
                className="text-2xl text-gray-900 hover:text-gray-600 font-regular py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Bottom Action Button */}
              <div className="mt-auto pb-6">
                <SignedOut>
                  <Link 
                    href="/sign-in" 
                    className="block w-full px-6 py-4 rounded-full font-semibold text-gray-900 bg-gray-100 text-center text-lg transition-all hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
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