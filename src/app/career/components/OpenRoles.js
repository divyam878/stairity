import React from "react";
import Underline from "@/components/Underline";
// Data for the roles, ordered from OUTERMOST (top) to INNERMOST (bottom)
const roles = [
  // 1. Content Creator (OUTERMOST - Dark Green/Teal)
  { name: "Content Creator", bgColor: "bg-green-800", textColor: "text-white" },
  // 2. Web Developer (Dark Brown)
  { name: "Web Developer", bgColor: "bg-amber-800", textColor: "text-white" },
  // 3. UI/UX Designer (Deep Red)
  { name: "UI/UX Designer", bgColor: "bg-red-700", textColor: "text-white" },
  // 4. Branding & Visual Designer (Orange/Red)
  {
    name: "Branding & Visual Designer",
    bgColor: "bg-orange-600",
    textColor: "text-white",
  },
  // 5. Digital Marketing Specialist (INNERMOST - Yellow)
  {
    name: "Digital Marketing Specialist",
    bgColor: "bg-yellow-400",
    textColor: "text-gray-800", // Darker text for contrast on yellow
  },
];

// Helper component for the content inside each colored layer (Role Name + Arrow)
const RoleContent = ({ role, isLast }) => (
  <div
    // Adjust padding: Full padding for the innermost card, just vertical padding for nested cards.
    className={`flex justify-between items-center w-full
                ${isLast ? "p-6 sm:p-8 lg:p-10" : "py-6 sm:py-8 lg:py-10"}`}
  >
    {/* Role Name with animated underline */}
    <h2 className={`text-2xl sm:text-4xl font-normal ${role.textColor}`}>
      <span
        className="relative inline-block
                   after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-current
                   after:w-0 after:transition-all after:duration-300 after:ease-out
                   group-hover:after:w-full" // Use group-hover to trigger on parent card hover
      >
        {role.name}
      </span>
    </h2>
    {/* Arrow Icon - Set to current layer's text color */}
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
  // Use a recursive functional approach to handle the dynamic nesting of components.
  const renderNestedRoles = (index) => {
    // Base Case: If we've rendered all roles, stop.
    if (index >= roles.length) {
      return null;
    }

    const role = roles[index];
    const isLast = index === roles.length - 1;

    // Outer colored container. px-5 pt-5 creates the border gap on top and sides.
    const layerClasses = `${role.bgColor} rounded-t-4xl rounded-b-none ${isLast ? "" : "px-5 pt-5"}`;

    return (
      <div key={role.name} className={layerClasses}>
        {/* 1. The Hoverable Content Area
          This is now a separate 'group' element, so its hover effect is self-contained.
        */}
        <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.005]">
          <RoleContent role={role} isLast={isLast} />
        </div>

        {/* 2. The Next Nested Layer (Recursion)
          This is a SIBLING to the hoverable content above.
          Hovering over this section will NOT trigger the 'group-hover' on the element above it.
        */}
        {renderNestedRoles(index + 1)}
      </div>
    );
  };

  return (
    <section className="p-4 py-32 sm:p-10 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        {/* --- Header Section --- */}
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
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]" // responsive scale
                  style={{ width: "70%" }}
                >
                  <Underline color="#FDC800" width="100%" thickness="4" />
                </div>
              </span>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-4xl">
                We’re always on the lookout for talented creatives who love
                building digital experiences that inspire.
              </p>
            </h2>
          </header>
        </div>

        {/* --- Nested Cards Container ---
          - Increased max-width on large screens (lg:max-w-5xl)
        */}
        <div className="max-w-3xl mx-auto lg:max-w-6xl">
          {renderNestedRoles(0)}
        </div>

        {/* This is a visual spacer */}
        <div className="pt-20"></div>
      </div>
    </section>
  );
};

export default OpenRoles;
