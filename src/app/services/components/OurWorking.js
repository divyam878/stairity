import React from "react";
import Underline from "../../../components/Underline";

// --- ASSET FILE PATHS ---
const DOODLE_CIRCLE_ASSET = "/images/doodlecircle.svg";
const NUMBER_CIRCLE_ASSET = "/images/number-circle.png";
const ARROW_RIGHT_ASSET = "/images/working-arrow-right.png";
const ARROW_LEFT_ASSET = "/images/working-arrow-left.png";

const ICON_ASSETS = [
  "/images/icon-lightbulb.png",
  "/images/icon-code.png",
  "/images/icon-chart.png",
  "/images/icon-search.png",
];

const DoodleCircleVisual = ({ strokeColor, className }) => (
  <div className={`absolute inset-0 w-full h-full p-2 ${className}`}>
    <img
      src={DOODLE_CIRCLE_ASSET}
      alt="Doodle Circle Outline"
      className="w-full h-full object-contain"
      style={{
        color: strokeColor,
      }}
    />
  </div>
);

const WorkingStep = ({
  number,
  title,
  description,
  iconAssetName,
  doodleColor,
}) => {
  const isTextOnRight = number % 2 === 0;

  const contentClasses = isTextOnRight
    ? "lg:ml-[55%] lg:pl-8 text-left"
    : "lg:mr-[55%] lg:pr-8 text-left lg:text-right";

  const arrowAsset = ARROW_RIGHT_ASSET;
  const arrowPositionClasses = isTextOnRight
    ? "left-1/2 ml-4"
    : "right-1/2 mr-4";
  const arrowFlipClass = isTextOnRight ? "" : "scale-x-[-1]";

  return (
    <div className="relative w-full py-10">
      {/* Step Visual (Side by side on mobile/tablet) */}
      <div
        className="relative lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2
        flex items-center z-20 mt-4 lg:mt-0 ml-6 sm:ml-12 lg:ml-0"
      >
        {/* Number Circle - Now positioned to the left of the doodle on mobile/tablet */}
        <div
          className={`relative flex items-center justify-center z-30
          w-10 h-10 mr-2 sm:mr-4
          lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2
          ${isTextOnRight 
            ? "lg:left-auto lg:right-1/2 lg:mr-28" 
            : "lg:left-1/2 lg:ml-28"
          }`}
        >
          <img
            src={NUMBER_CIRCLE_ASSET}
            alt={`Step ${number} Ring`}
            className="absolute w-full h-full object-contain"
          />
          <span className="relative text-lg sm:text-xl font-bold font-serif italic text-gray-800">
            {number}
          </span>
        </div>

        {/* Main Doodle + Icon Container */}
        <div
          className="relative flex items-center justify-center
          w-24 h-24 sm:w-32 sm:h-32"
        >
          <DoodleCircleVisual
            strokeColor={doodleColor}
            className="absolute inset-0"
          />
          <img
            src={iconAssetName}
            alt={`Step ${number} Icon`}
            className="w-16 h-16 md:w-18 md:h-18 relative z-10"
          />
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`w-full lg:w-[45%] px-6 sm:px-12 mx-auto mt-4 sm:mt-6 lg:mt-0 ${contentClasses}`}
      >
        <h3
          className={`text-2xl sm:text-3xl text-gray-900 mb-3 leading-tight ${isTextOnRight ? 'text-left' : 'lg:text-right'}`}
          style={{ fontWeight: 400 }}
        >
          {title}
        </h3>
        <p
          className={`text-gray-600 text-base max-w-sm lg:max-w-md ${isTextOnRight ? 'text-justify' : 'lg:text-right'}`}
          style={{ fontWeight: 300 }}
        >
          {description}
        </p>
      </div>

      {/* Arrow (Desktop Only) */}
      {number <= 4 && (
        <div
          className={`absolute hidden lg:block top-[10%] transform -translate-y-1/2 z-20 w-20 h-auto p-6
          ${arrowPositionClasses}`}
        >
          <img
            src={arrowAsset}
            alt="Step Arrow"
            className={`w-full h-auto object-contain ${arrowFlipClass}`}
          />
        </div>
      )}
    </div>
  );
};

const OurWorking = () => {
  const steps = [
    {
      number: 1,
      title: "Discovery & Strategy",
      description:
        "Understand your vision, audience, and goals to create a roadmap for success.",
      iconAssetName: ICON_ASSETS[0],
      doodleColor: "#80C6AF",
    },
    {
      number: 2,
      title: "Design & Development",
      description:
        "Build stunning websites, interfaces, and brand assets that look as good as they perform.",
      iconAssetName: ICON_ASSETS[1],
      doodleColor: "#EF99BF",
    },
    {
      number: 3,
      title: "Marketing & Growth",
      description:
        "Launch campaigns, attract the right audience, and turn attention into measurable results.",
      iconAssetName: ICON_ASSETS[2],
      doodleColor: "#99CCF0",
    },
    {
      number: 4,
      title: "Analytics & Optimization",
      description:
        "Track, analyze, and refine your strategy to maximize ROI and long-term growth.",
      iconAssetName: ICON_ASSETS[3],
      doodleColor: "#F49F9F",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-full mx-auto">
        <header className="mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
            OUR WORKING
          </p>
          <h2 className="text-5xl md:text-6xl text-gray-900 tracking-tight relative inline-block font-light">
            How we{" "}
            <span className="relative inline-block font-medium font-hello">
              work
              <div className="absolute left-0 right-0 -bottom-2 h-4">
                <Underline color="#C7EEFF" width="100%" thickness="4" />
              </div>
            </span>
          </h2>
        </header>

        <div className="relative flex flex-col items-center">
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-0.5 bg-gray-200 border-l border-dashed border-gray-400 z-10 hidden lg:block" />
          {steps.map((step) => (
            <WorkingStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurWorking;