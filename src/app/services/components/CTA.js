import React from 'react';
import { CircleCheckBig, Mail, TrendingUp } from 'lucide-react';
import Underline from '../../../components/Underline';
// Color constants
const LIGHT_PURPLE = '#F5F0FF';
const DARK_PURPLE = '#4d3258';

const benefits = [
  'A dedicated project manager and team.',
  'Access to our suite of strategic templates.',
  'Weekly progress reports and transparent updates.',
  'Priority support during and after launch.',
  'Free 3-month post-launch optimization.'
];

const CTA = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#b294b8] rounded-4xl overflow-hidden shadow-lg relative">
          {/* Background Doodle */}
          <div className="absolute inset-0 bg-[url('/images/purple_service_doodle.svg')] bg-cover bg-center opacity-60"></div>
          <div className="flex flex-col lg:flex-row">
            {/* Left Section: Text Content */}
            <div className="p-10 lg:p-16 lg:w-1/2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Launch Your</span>{' '}
                <span className="text-[#4d3258] relative inline-block font-hello">
                  Digital Presence
                  <div className="absolute left-0 right-0 -bottom-3 h-4">
                    <Underline color="#C7EEFF" width="100%" thickness="4" />
                  </div>
                </span>
              </h2>
              <p className="text-white text-lg mb-8 max-w-lg">
                Start your project with a team that combines creativity, strategy, and results.
              </p>
              <div className="relative flex items-center justify-center h-40 w-40">
                {/* Email Button */}
                <button className="absolute -left-2 -top-2 bg-white p-3 rounded-full shadow-lg hover:scale-110 hover:border hover:border-[#4d3258] transition-transform duration-200 z-10 cursor-pointer">
                  <Mail/>
                </button>
                
                {/* Main CTA Button - Circle with Arrow */}
                <div className="w-28 h-28 rounded-full bg-[#4d3258] flex items-center justify-center hover:bg-opacity-90 hover:scale-155 hover:border hover:border-[white] transition-all duration-200 cursor-pointer">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                
                {/* WhatsApp Button */}
                <button className="absolute -right-2 -bottom-2 bg-white p-3 rounded-full shadow-lg hover:scale-110 hover:border hover:border-[#4d3258] transition-transform duration-200 z-10 cursor-pointer">
                  <img src="/images/whatsapp-icon-black.png" alt="WhatsApp" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right Section: Dark Purple Square */}
            <div className="lg:w-1/2 p-6 lg:p-10 flex items-center justify-center">
              <div 
                className="w-full h-full min-h-[300px] lg:min-h-[500px] rounded-4xl p-8 flex flex-col justify-between"
                style={{ backgroundColor: DARK_PURPLE }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">What You&apos;ll Get</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CircleCheckBig className="text-white mr-3 mt-1 flex-shrink-0" size={20} />
                        <span className="text-white">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col space-y-3 mt-6">
                  <button className="w-full bg-white text-[#4d3258] py-3 px-6 rounded-full font-medium hover:bg-opacity-90 transition-all">
                    BOOK A CALL
                  </button>
                  <button className="w-full bg-transparent border-2 border-white text-white py-3 px-6 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all">
                    REQUEST A QUOTE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
