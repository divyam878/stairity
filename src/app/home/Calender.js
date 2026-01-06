"use client";

import React from "react";
import Image from "next/image";
import Underline from "../../components/Underline"; // Assuming this is the correct path

const Calender = ({
  calLink = "https://cal.com/divyamgoyal878/15min?overlayCalendar=true",
}) => {
  // Check if the calLink is the placeholder or empty, and display a message if so.
  // This is a simplified check compared to the useEffect version.
  if (!calLink || calLink === "YOUR_CAL_LINK_PLACEHOLDER") {
    // Using a distinct placeholder for clarity
    console.warn(
      "Cal.com: calLink prop is not set or is using the placeholder value.",
    );
    return (
      <section className="py-16 bg-[#FAFAFA] sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-regular text-gray-900 sm:text-5xl md:text-6xl mb-12">
            Start your project with a conversation.
            <span className="relative inline-block">
              Schedule a call.
              <span className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-medium text-black">
                development
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]" // responsive scale
                  style={{ width: "100%" }}
                >
                  <Underline color="#9333ea" width="100%" thickness="4" />
                </div>
              </span>
            </span>
          </h1>
          <div className="relative mt-12 flex flex-col items-center">
            <div className="w-full max-w-3xl h-[450px] bg-gray-100 rounded-lg shadow-lg overflow-hidden flex justify-center items-center">
              <p className="text-gray-600">
                Calendar scheduling is temporarily unavailable. Please provide a
                valid Cal.com link.
              </p>
            </div>
            {/* Arrow image can still be displayed if desired */}
            <div className="absolute -top-12 -right-16 sm:-right-24 md:-right-32 lg:-right-40 opacity-70 transform rotate-[15deg] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 z-10">
              <Image
                src="/images/teal-arrow-doodle.svg" // PLEASE REPLACE THIS with the actual path to your arrow image
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

  return (
    <section className="py-16 bg-[#FAFAFA] sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-light text-gray-900 sm:text-5xl md:text-5xl mb-12">
          Start your project with a conversation.
          <span className=" mt-8 relative inline-block text-4xl md:text-5xl lg:text-5xl font-medium font-hello text-black">
            Schedule
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]" // responsive scale
              style={{ width: "100%" }}
            >
              <Underline color="#9333ea" width="100%" thickness="3" />
            </div>{" "}
            a call
          </span>
        </h1>

        <div className="relative mt-12 flex flex-col items-center">
          <div className="w-full h-[750px] bg-transparent rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={calLink}
              style={{ width: "100%", height: "100%", border: "0" }}
              title="Schedule a call - Cal.com"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute -top-14 -right-2 sm:-right-24 md:-right-32 lg:-right-40 opacity-70 transform rotate-[15deg] w-12 h-12 sm:w-28 sm:h-28 md:w-32 md:h-32 z-10">
            <Image
              src="/images/teal-arrow-doodle.svg" // PLEASE REPLACE THIS with the actual path to your arrow image
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
};

export default Calender;
