"use client";

import React, { useState } from "react";
import { X, Briefcase, ArrowRight } from "lucide-react";
import Underline from "@/components/Underline";
import { useCTAModal } from "@/components/providers/CTAProvider";

// Data for the roles with descriptions
const roles = [
  {
    name: "Content Creator",
    bgColor: "bg-green-800",
    textColor: "text-white",
    hex: "#166534",
    description: "We're looking for a creative Content Creator to craft compelling stories across our digital platforms. You'll create engaging content for blogs, social media, and marketing campaigns that resonates with our audience.",
    requirements: [
      "2+ years experience in content creation",
      "Strong writing and editing skills",
      "Experience with social media platforms",
      "Portfolio of previous work",
      "SEO knowledge is a plus"
    ]
  },
  {
    name: "Web Developer",
    bgColor: "bg-amber-800",
    textColor: "text-white",
    hex: "#92400e",
    description: "Join our development team to build stunning, high-performance websites. You'll work with modern technologies like React, Next.js, and Node.js to create digital experiences that wow our clients.",
    requirements: [
      "3+ years of web development experience",
      "Proficiency in React/Next.js",
      "Strong JavaScript/TypeScript skills",
      "Experience with CSS frameworks (Tailwind preferred)",
      "Git version control knowledge"
    ]
  },
  {
    name: "UI/UX Designer",
    bgColor: "bg-red-700",
    textColor: "text-white",
    hex: "#b91c1c",
    description: "We need a talented UI/UX Designer to create beautiful, user-centered designs. You'll be responsible for the entire design process from wireframing to high-fidelity prototypes.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma or Sketch",
      "Strong portfolio showcasing web/mobile designs",
      "Understanding of design systems",
      "User research experience"
    ]
  },
  {
    name: "Branding & Visual Designer",
    bgColor: "bg-orange-600",
    textColor: "text-white",
    hex: "#ea580c",
    description: "Shape brand identities that leave lasting impressions. As a Branding & Visual Designer, you'll create logos, brand guidelines, and visual assets that define how companies present themselves to the world.",
    requirements: [
      "4+ years in branding/visual design",
      "Strong typography and color theory skills",
      "Experience creating brand guidelines",
      "Illustration skills are a plus",
      "Adobe Creative Suite proficiency"
    ]
  },
  {
    name: "Digital Marketing Specialist",
    bgColor: "bg-yellow-400",
    textColor: "text-gray-800",
    hex: "#facc15",
    description: "Drive growth through data-driven marketing strategies. You'll manage campaigns across multiple channels, analyze performance metrics, and optimize for conversions.",
    requirements: [
      "2+ years in digital marketing",
      "Experience with Google Ads & Meta Ads",
      "Analytics and reporting skills",
      "SEO/SEM knowledge",
      "Email marketing experience"
    ]
  },
];

// Modal component for role details
const RoleModal = ({ role, isOpen, onClose }) => {
  const { openCareerModal } = useCTAModal();

  if (!isOpen || !role) return null;

  const handleApply = () => {
    onClose();
    openCareerModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div 
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-3xl"
          style={{ backgroundColor: role.hex }}
        >
          {/* Header */}
          <div className="sticky top-0 px-6 py-5 flex items-center justify-between" style={{ backgroundColor: role.hex }}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Briefcase className={`w-5 h-5 ${role.textColor}`} />
              </div>
              <h2 className={`text-2xl font-bold ${role.textColor}`}>{role.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X className={`w-6 h-6 ${role.textColor}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">
            {/* Description */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold ${role.textColor} mb-3 opacity-80`}>About the Role</h3>
              <p className={`${role.textColor} text-lg leading-relaxed`}>
                {role.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold ${role.textColor} mb-3 opacity-80`}>Requirements</h3>
              <ul className="space-y-2">
                {role.requirements.map((req, index) => (
                  <li key={index} className={`flex items-start gap-3 ${role.textColor}`}>
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" />
                    <span className="text-base">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className={`w-full py-4 px-8 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                role.name === "Digital Marketing Specialist"
                  ? "bg-gray-800 text-white hover:bg-gray-900"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              Apply for this Role
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for the content inside each colored layer
const RoleContent = ({ role, isLast }) => (
  <div
    className={`flex justify-between items-center w-full
                ${isLast ? "p-6 sm:p-8 lg:p-10" : "py-6 sm:py-8 lg:py-10"}`}
  >
    <h2 className={`text-2xl sm:text-4xl font-normal ${role.textColor}`}>
      <span
        className="relative inline-block
                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-current
                   after:w-0 after:transition-all after:duration-300 after:ease-out
                   group-hover:after:w-full"
      >
        {role.name}
      </span>
    </h2>
    <svg
      className={`w-8 h-8 transform rotate-45 ${role.textColor}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </div>
);

const OpenRoles = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const renderNestedRoles = (index) => {
    if (index >= roles.length) {
      return null;
    }

    const role = roles[index];
    const isLast = index === roles.length - 1;
    const layerClasses = `${role.bgColor} rounded-t-4xl rounded-b-none ${isLast ? "" : "px-5 pt-5"}`;

    return (
      <div key={role.name} className={layerClasses}>
        <div 
          className="group cursor-pointer transition-all duration-300 hover:scale-[1.005]"
          onClick={() => setSelectedRole(role)}
        >
          <RoleContent role={role} isLast={isLast} />
        </div>
        {renderNestedRoles(index + 1)}
      </div>
    );
  };

  return (
    <>
      <section className="p-4 py-32 sm:p-10 bg-[#FAFAFA] min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-center mb-12">
            <header className="mb-16 sm:mb-20 lg:mb-24">
              <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
                OPEN ROLES
              </p>
              <h2
                className="text-5xl md:text-6xl text-gray-900 tracking-tight relative inline-block"
                style={{ fontWeight: 400 }}
              >
                We have diverse{" "}
                <span className="relative inline-block text-5xl md:text-5xl lg:text-6xl font-hello font-medium text-black">
                  openings
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]"
                    style={{ width: "70%" }}
                  >
                    <Underline color="#FDC800" width="100%" thickness="4" />
                  </div>
                </span>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-4xl">
                  We&apos;re always on the lookout for talented creatives who love
                  building digital experiences that inspire.
                </p>
              </h2>
            </header>
          </div>

          <div className="max-w-3xl mx-auto lg:max-w-6xl">
            {renderNestedRoles(0)}
          </div>

          <div className="pt-20"></div>
        </div>
      </section>

      {/* Role Detail Modal */}
      <RoleModal 
        role={selectedRole} 
        isOpen={!!selectedRole} 
        onClose={() => setSelectedRole(null)} 
      />
    </>
  );
};

export default OpenRoles;
