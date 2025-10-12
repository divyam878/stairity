import React from 'react';
import Image from 'next/image';
import { Gayathri } from 'next/font/google';
import Underline from "../../components/Underline";
// Configure Gayathri font
const gayathriFont = Gayathri({
  weight: ['700'], // Design looks bold
  subsets: ['latin'],
  display: 'swap', // Ensures text is visible while font loads
});

const clientData = [
  {
    id: 1,
    bgColor: 'bg-[#141248]',
    textColor: 'text-indigo-300',
    nameLine1: 'NESSCOINDIA',
    nameLine2: 'Pvt. Ltd',
    logo: '/images/nessco_logo.png',
    screenshot: '/images/nessco_site.png',
  },
  {
    id: 2,
    bgColor: 'bg-[#ED2F00]',
    textColor: 'text-red-200',
    nameLine1: 'AXIO',
    nameLine2: 'ELECTRONICS',
    logo: '/images/axio_logo.png',
    screenshot: '/images/axio_site.png',
  },
  {
    id: 3,
    bgColor: 'bg-[#518753]',
    textColor: 'text-green-300',
    nameLine1: 'HOUSE OF',
    nameLine2: 'MODULAR',
    logo: '/images/hom_logo.png',
    screenshot: '/images/hom_site.png',
  },
];

const Clients = () => {
  return (
    <section className="py-16 bg-white sm:py-24 w-full">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
            Clients
          </h3>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-light text-black mb-2">
             <span className="relative text-3xl md:text-5xl lg:text-5xl inline-block font-hello font-medium">
                Trusted By
                <div
                  className="absolute -bottom-2 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#ED3001" width="100%" thickness="4" />
                </div>
                
              </span>
              {" "}leading brands 
          <br className='md:block hidden'/>
          and innovative startups
          </h1>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8 lg:mt-16 w-full">
          {clientData.map((client) => (
            <div
              key={client.id}
              className={`group relative ${client.bgColor} rounded-[4rem] shadow-xl overflow-hidden flex flex-col h-[360px] sm:h-[410px] md:h-[340px] lg:h-[380px] xl:h-[410px]`}
            >
              {/* Top Content Area (Text & Logo) */}
              <div className="p-6 relative z-10 flex-grow flex flex-col">
                <h4 className={`text-4xl lg:text-5xl font-bold ${client.textColor} opacity-40 leading-tight break-words ${gayathriFont.className}`}>
                  {client.nameLine1}
                  {client.nameLine2 && <br />}
                  {client.nameLine2}
                </h4>
                {/* Logo - positioned top-right of this text area, increased size */}
                {client.logo && (
                  <div className="relative z-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mt-auto self-end mb-2">
                    <Image
                      src={client.logo}
                      alt={`${client.nameLine1} logo`}
                      layout="fill"
                      objectFit="contain"
                      className="opacity-80"
                    />
                  </div>
                )}
              </div>

              {/* Screenshot Area - Increased height, image narrower and centered */}
              <div className="relative w-full h-[55%] mt-auto flex justify-center items-end"> {/* Increased height to 55%, added flex for centering child */}
                {/* Screenshot Image container - narrower width, full height of parent, for animation and rounded corners */}
                <div className="relative w-11/12 h-full rounded-t-md overflow-hidden"> {/* Narrower width, full height of parent */}
                  {client.screenshot && (
                    <Image
                      src={client.screenshot}
                      alt={`${client.nameLine1} website screenshot`}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="bottom"
                      className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2 mix-blend-color-dodge"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
