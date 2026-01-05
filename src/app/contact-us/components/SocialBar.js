'use client';

import Link from 'next/link';

export default function SocialBar() {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/stairity',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/stairity',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/stairity',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-white border-t border-b border-gray-200">
      {/* Vertical lines - hidden on mobile */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gray-300 hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at line intersections - hidden on mobile */}
      <div className="absolute top-0 left-[15%] -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute top-0 right-[15%] translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute bottom-0 right-[15%] translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Content container */}
      <div className="relative mx-4 sm:mx-[5%] md:mx-[15%] px-2 sm:px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-wrap justify-center sm:justify-around items-center gap-6 sm:gap-8 md:gap-16">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 text-gray-800 hover:text-black transition-colors group"
            >
              <span className="text-gray-600 group-hover:text-black transition-colors">
                {social.icon}
              </span>
              <span className="text-base sm:text-lg font-medium">{social.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
