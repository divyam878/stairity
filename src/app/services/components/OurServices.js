import { ArrowBigDown, ArrowRight } from "lucide-react";
import React from "react";
import Underline from "../../../components/Underline";

// Image components using PNGs
const WebIcon = () => (
  <img
    src="/images/web-dev-icon.png"
    alt="Web Development Icon"
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
  />
);

const ContentIcon = () => (
  <img
    src="/images/content-creation-icon.png"
    alt="Content Creation Icon"
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
  />
);

const BrandingIcon = () => (
  <img
    src="/images/branding-icon.png"
    alt="Branding Icon"
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
  />
);

const MarketingIcon = () => (
  <img
    src="/images/digital-marketing-icon.png"
    alt="Digital Marketing Icon"
    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
  />
);

// Component for small tag chips
const Tag = ({ children, colorClass }) => (
  <span
    className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap ${colorClass}`}
  >
    {children}
  </span>
);

// Component for service cards
const ServiceCard = ({
  icon: Icon,
  theme,
  title,
  tags,
  description,
  iconColor,
  swirlImage,
}) => {
  const tagColorClass = theme.tag;
  const cardBgClass = theme.bg;

  return (
    <div
      className={`relative overflow-hidden p-6 sm:p-8 rounded-4xl border border-gray-100 transform hover:shadow-2xl transition-all duration-300 group ${cardBgClass}`}
    >
      {/* Swirl background image */}
      <img
        src={swirlImage}
        alt="Swirl Background"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-50"
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-8">
          <Icon />
        </div>

        {/* Tags */}
        <div className="absolute top-0 right-0 flex rounded-full flex-col items-end space-y-1 font-light pointer-events-none">
          {tags.map((tag, index) => (
            <Tag key={index} colorClass={tagColorClass}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Title & Description */}
        <h3
          className="text-xl sm:text-2xl font-extrabold tracking-tight mt-16 mb-4 leading-tight"
          style={{ color: iconColor }}
        >
          {title.toUpperCase()}
        </h3>
        <p className="text-gray-700 mb-8 text-base">{description}</p>

        {/* Explore Button */}
        <button
          className={`group relative flex items-center justify-between w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none overflow-hidden`}
          style={{
            backgroundColor: iconColor,
            boxShadow: `0 4px 14px ${iconColor}55`,
          }}
        >
          {/* Animated white border only on edges */}
          <span
            className="absolute inset-0 rounded-full border-2 border-white opacity-0 translate-y-full transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0"
            style={{
              pointerEvents: "none",
              background: "transparent",
              zIndex: 1,
            }}
          ></span>

          {/* Button content */}
          <span className="relative z-10 flex items-center">
            Explore
            <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:rotate-315" />
          </span>
        </button>
      </div>
    </div>
  );
};

// Main component
const OurServices = () => {
  const services = [
    {
      icon: WebIcon,
      title: "Web Development & UI/UX Design",
      tags: ["Website Design", "UI/UX", "Web Development"],
      description:
        "Build high-performing websites and web applications that look stunning and convert visitors into customers.",
      iconColor: "#4d3258",
      swirlImage: "/images/web-swirl.png",
      theme: {
        bg: "bg-[#f7f6ff]",
        tag: "text-[white] bg-[#4d3258]",
      },
    },
    {
      icon: ContentIcon,
      title: "Content Creation & Design",
      tags: [
        "Strategic Design",
        "Creative Assets",
        "Content Strategy",
        "Copywriting",
      ],
      description:
        "Produce scroll-stopping videos, graphics, copy, and interactive content that resonates with your audience.",
      iconColor: "#133c3a",
      swirlImage: "/images/content-swirl.png",
      theme: {
        bg: "bg-[#f5f9fb]",
        tag: "text-[white] bg-[#133c3a]",
      },
    },
    {
      icon: BrandingIcon,
      title: "Branding & Visual Identity",
      tags: [
        "Logo Design",
        "Brand Strategy",
        "Brand Guidelines",
        "Visual Identity",
      ],
      description:
        "Create memorable logos, brand systems, and cohesive visual identities that make your business stand out.",
      iconColor: "#00347a",
      swirlImage: "/images/branding-swirl.png",
      theme: {
        bg: "bg-[#f2f9ff]",
        tag: "text-[white] bg-[#00347a]",
      },
    },
    {
      icon: MarketingIcon,
      title: "Digital Marketing & Growth",
      tags: ["SEO", "Performance Marketing", "Social Ads", "Lead Generation"],
      description:
        "Drive traffic, engagement, and sales with social media, SEO, paid campaigns, and growth strategies.",
      iconColor: "#7b5745",
      swirlImage: "/images/marketing-swirl.png",
      theme: {
        bg: "bg-[#fafafa]",
        tag: "text-[white] bg-[#7b5745]",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans p-4 sm:p-8 lg:p-12">
      <div className="max-w-full pt-20 mx-auto">
        {/* Header */}
        <header className="mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
            OUR SERVICES
          </p>
          <h2 className="text-5xl sm:text-6xl text-gray-900 tracking-tight font-light relative inline-block">
            Services We{" "}
            <span className="relative inline-block font-medium font-hello">
              Offer
              <div className="absolute left-0 right-0 -bottom-2 h-4">
                <Underline color="#D0CEE6" width="100%" thickness="4" />
              </div>
            </span>
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-4xl">
            We design, develop, and market digital brands that stand out — from
            strategy to launch and growth.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              tags={service.tags}
              description={service.description}
              iconColor={service.iconColor}
              swirlImage={service.swirlImage}
              theme={service.theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
