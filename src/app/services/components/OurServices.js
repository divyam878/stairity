"use client";
import { ArrowRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Underline from "../../../components/Underline";

// Modal Component for Service Details
const ServiceModal = ({ isOpen, onClose, service }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        style={{
          background: `linear-gradient(135deg, ${service.iconColor}15 0%, rgba(0,0,0,0.5) 100%)`,
        }}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
        style={{
          background: `linear-gradient(135deg, ${service.theme.bg.replace("bg-[", "").replace("]", "")} 0%, white 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Swirl */}
        <img
          src={service.swirlImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg group"
        >
          <X
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
            style={{ color: service.iconColor }}
          />
        </button>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <service.icon />
            </div>
            <div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2"
                style={{ color: service.iconColor }}
              >
                {service.title.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${service.theme.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {service.description}
          </p>

          {/* Divider */}
          <div
            className="w-full h-px mb-8"
            style={{
              background: `linear-gradient(90deg, transparent, ${service.iconColor}40, transparent)`,
            }}
          />

          {/* Extended Details */}
          <div className="space-y-6">
            <h4
              className="text-lg font-bold"
              style={{ color: service.iconColor }}
            >
              What We Offer
            </h4>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${service.iconColor}20` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: service.iconColor }}
                    />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Benefits */}
            <h4
              className="text-lg font-bold mt-8"
              style={{ color: service.iconColor }}
            >
              Key Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderColor: `${service.iconColor}20`,
                  }}
                >
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <a
              href="/contact-us"
              className="group relative flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: service.iconColor,
                boxShadow: `0 8px 24px ${service.iconColor}40`,
              }}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  onExplore,
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
          onClick={onExplore}
          className={`group relative flex items-center justify-between w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none overflow-hidden cursor-pointer`}
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
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExplore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

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
      features: [
        "Custom responsive website design tailored to your brand",
        "Modern UI/UX with intuitive user flows",
        "Full-stack web application development",
        "E-commerce solutions with secure payment integration",
        "Performance optimization and SEO-ready architecture",
        "CMS integration (WordPress, Webflow, custom solutions)",
      ],
      benefits: [
        "Increase conversion rates by up to 200%",
        "Mobile-first design for all devices",
        "Fast loading speeds under 3 seconds",
        "Ongoing maintenance and support",
      ],
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
      features: [
        "Professional video production and editing",
        "Eye-catching social media graphics and posts",
        "Compelling copywriting and storytelling",
        "Interactive content and animations",
        "Infographics and data visualization",
        "Content calendar planning and strategy",
      ],
      benefits: [
        "Boost engagement by 3x on social media",
        "Consistent brand voice across all channels",
        "Ready-to-publish content packages",
        "Viral-worthy creative concepts",
      ],
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
      features: [
        "Custom logo design with multiple concepts",
        "Complete brand identity system",
        "Brand guidelines and style documentation",
        "Typography and color palette selection",
        "Business card and stationery design",
        "Brand voice and messaging strategy",
      ],
      benefits: [
        "Stand out from competitors instantly",
        "Build trust and recognition",
        "Consistent look across all touchpoints",
        "Professional brand assets library",
      ],
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
      features: [
        "Search Engine Optimization (SEO) strategy",
        "Google Ads and Meta Ads management",
        "Social media marketing and management",
        "Email marketing automation",
        "Analytics and performance reporting",
        "Conversion rate optimization",
      ],
      benefits: [
        "Increase organic traffic by 150%+",
        "Lower cost per acquisition",
        "Data-driven marketing decisions",
        "Scalable growth strategies",
      ],
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
              onExplore={() => handleExplore(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default OurServices;
