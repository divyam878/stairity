"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Underline from "../../../components/Underline";
gsap.registerPlugin(ScrollTrigger);

export default function OurVision() {
  const folderRef = useRef(null);
  const videoRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    // Animate folder structure
    gsap.from(folderRef.current, {
      scrollTrigger: {
        trigger: folderRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Animate video
    gsap.from(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });

    // Animate note
    gsap.from(noteRef.current, {
      scrollTrigger: {
        trigger: noteRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.7)"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative py-20 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase pb-4">
            Our Vision
          </h3>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-light text-black mb-2">
            Where We&apos;re
             <span className="relative text-3xl md:text-5xl lg:text-5xl inline-block font-hello font-medium p-3">
                Headed
                <div
                  className="absolute -bottom-2 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#5FD0FF" width="100%" thickness="4" />
                </div>
                
              </span>
             
          <br className='md:block hidden'/>
         
          </h1>
        </div>
          <p className="text-xl text-gray-600">
            We envision a digital landscape where every interaction tells a story and 
            every pixel serves a purpose.
          </p>
        </div>

        <div className="relative">
          {/* Folder Structure */}
          <div 
            ref={folderRef}
            className="relative z-10 ml-[-50px] w-[400px] h-[300px] bg-white rounded-lg shadow-2xl transform -rotate-6 origin-bottom-left"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex space-x-4 mb-4">
                <div className="w-1/3 h-8 bg-blue-100 rounded-md"></div>
                <div className="w-1/3 h-8 bg-blue-200 rounded-md"></div>
                <div className="w-1/3 h-8 bg-blue-300 rounded-md"></div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-blue-100 rounded w-3/4"></div>
                <div className="h-6 bg-blue-100 rounded w-5/6"></div>
                <div className="h-6 bg-blue-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Video Background */}
          <div 
            ref={videoRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gray-200 rounded-xl shadow-2xl overflow-hidden"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/visionVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Paper Note */}
          <div 
            ref={noteRef}
            className="absolute right-0 bottom-0 w-[280px] bg-yellow-50 rounded-lg shadow-lg p-6 z-20 transform rotate-6 translate-y-20"
          >
            <div className="absolute top-2 right-2 text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Promise</h3>
            <p className="text-gray-600 text-sm">
              To deliver exceptional digital experiences that drive results and 
              create lasting impressions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}