'use client';

import Image from 'next/image';
import Underline from '../../../components/Underline';

export default function ScheduleCall({
  calLink = "https://cal.com/divyamgoyal878/15min?overlayCalendar=true",
}) {
  return (
    <section className="relative bg-[#FAFAFA] py-10 sm:py-16 md:py-24">
      
      {/* Vertical lines - hidden on mobile */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gray-300 hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gray-300 hidden md:block"></div>
      
      {/* Horizontal line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at line intersections - hidden on mobile */}
      <div className="absolute top-0 left-[15%] -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute top-0 right-[15%] translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Horizontal line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at line intersections - bottom */}
      <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute bottom-0 right-[15%] translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Content container */}
      <div className="relative mx-4 sm:mx-[5%] md:mx-[15%] px-2 sm:px-4 md:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-center mb-8 sm:mb-10 md:mb-12 leading-tight">
          Start your project with a conversation.{' '}
          <span className="relative inline-block font-medium font-hello">
            Schedule
            <div
              className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]"
              style={{ width: '100%' }}
            >
              <div className="md:hidden">
                <Underline color="#0daeb0ff" width="100%" thickness="3" height="15" />
              </div>
              <div className="hidden md:block">
                <Underline color="#8150c1ff" width="100%" thickness="4" height="25" />
              </div>
            </div>{' '}
            a call
          </span>
        </h2>
        
        {/* Cal.com Embed Container */}
        <div className="relative mt-6 sm:mt-8 md:mt-12 flex flex-col items-center">
          <div className="w-full max-w-5xl h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] bg-transparent rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={calLink}
              style={{ width: '100%', height: '100%', border: '0' }}
              title="Schedule a call - Cal.com"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Doodle arrow - hidden on small mobile */}
          <div className="absolute -top-8 sm:-top-14 right-0 sm:-right-8 md:-right-16 lg:-right-24 opacity-70 transform rotate-[15deg] w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 z-10 hidden sm:block">
            <Image
              src="/images/teal-arrow-doodle.svg"
              alt="Schedule a call doodle"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
