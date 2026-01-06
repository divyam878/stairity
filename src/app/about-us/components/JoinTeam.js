'use client';

import Image from 'next/image';
import Underline from "../../../components/Underline";
import { useCTAModal } from '../../../components/providers/CTAProvider';

const JoinTeam = () => {
  const { openCareerModal } = useCTAModal();

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center bg-[#FAFAFA] py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4">
        {/* Left: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/images/team.png"
            alt="Team illustration"
            width={480}
            height={380}
            className="w-full max-w-md h-auto object-contain"
            priority
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-gray-400 font-semibold uppercase tracking-widest mb-2 text-base">Careers</span>
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-2">
            Join the<br />
            <span className="relative text-3xl md:text-5xl lg:text-6xl inline-block font-bold p-3">
                Team
                <div
                  className="absolute -bottom-2 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#FFD600" width="100%" thickness="4" />
                </div>
                
              </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mt-4 mb-8 max-w-xl">
            We&apos;re always on the lookout for creative minds! If you&apos;re passionate about digital design and growth, drop us a line.
          </p>
          <button
            onClick={openCareerModal}
            className="relative px-12 py-4 rounded-full bg-white text-black text-2xl font-medium shadow-lg transition border-2 border-gray-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            tabIndex={0}
            aria-label="Join Us"
          >
            JOIN US
            {/* Yellow underline doodle under button text */}
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
