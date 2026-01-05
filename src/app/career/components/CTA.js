"use client";

import React, { useState } from "react";
// Removed: import Image from "next/image";
// Removed: import Link from "next/link"; // Link is unused and caused an error

// Hardcoding roles based on the OpenRoles.js context for the dropdown
const JOB_ROLES = [
  "Content Creator",
  "Web Developer",
  "UI/UX Designer",
  "Branding & Visual Designer",
  "Digital Marketing Specialist",
];

// Helper function to handle form submission (placeholder)
const handleSubmit = (formData) => {
  console.log("Application Submitted:", formData);
  // Custom message replacement for window.alert()
  console.log(
    `Application submitted for ${formData.jobRole}!\n\nCheck the console for the form data.`,
  );
};

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: JOB_ROLES[0],
    portfolioLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    // Optionally clear form
    // setFormData({ name: "", email: "", jobRole: JOB_ROLES[0], portfolioLink: "" });
  };

  // --- Reusable Tailwind Class for Styled Input/Select ---
  // Key classes: bg-white, border-l-4 (light blue default), focus:border-blue-600 (dark blue on focus), focus:ring-0 (remove default outline)
  const inputClass =
    "w-full px-5 py-3 rounded-xl shadow-sm transition duration-150 bg-white focus:bg-[#E8F0FE] border border border-l-4 border-blue-500 focus:outline-none focus:border-blue-700 focus:ring-0";

  return (
    <section className="relative bg-[#FAFAFA] py-24 overflow-hidden font-sans">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-[white] rounded-xl shadow-lg overflow-hidden">
          <div className="relative p-8 md:p-12">
            {/* Notebook lines pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_24px]"></div>
              <div className="absolute left-12 top-0 bottom-0 w-px bg-gray-200"></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center">
                {/* FORM CONTENT */}
                <div className="lg:w-1/2 mb-12 lg:mb-0 lg:px-10">
                  <h2 className="text-4xl md:text-4xl font-semibold mb-8 leading-tight text-gray-900">
                    Apply Now to Join Our Amazing Team
                  </h2>

                  <form onSubmit={onSubmit} className="space-y-4">
                    {/* --- ROW 1: Name and Email Inputs (Side-by-Side on large screens) --- */}
                    <div className="flex flex-col flex-row gap-4">
                      {/* Name Input */}
                      <div className="flex-1">
                        <label
                          htmlFor="name"
                          className="block text-base font-semibold text-gray-800 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className={inputClass}
                        />
                      </div>

                      {/* Email Input */}
                      <div className="flex-1">
                        <label
                          htmlFor="email"
                          className="block text-base font-semibold text-gray-800 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* --- ROW 2: Job Role and Portfolio Link (Side-by-Side) --- */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Job Role Dropdown */}
                      <div>
                        <label
                          htmlFor="jobRole"
                          className="block text-base font-semibold text-gray-800 mb-1"
                        >
                          Applying For
                        </label>
                        <select
                          name="jobRole"
                          id="jobRole"
                          required
                          value={formData.jobRole}
                          onChange={handleChange}
                          className={inputClass + " appearance-none"} // Add appearance-none for select
                        >
                          {JOB_ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Portfolio Link Input */}
                      <div>
                        <label
                          htmlFor="portfolioLink"
                          className="block text-base font-semibold text-gray-800 mb-1"
                        >
                          Portfolio/LinkedIn
                        </label>
                        <input
                          type="url"
                          name="portfolioLink"
                          id="portfolioLink"
                          required
                          value={formData.portfolioLink}
                          onChange={handleChange}
                          placeholder="https://yourwebsite.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full text-xl mt-8 bg-blue-600 text-white py-4 px-8 rounded-full transition duration-300 transform hover:scale-[1.01] hover:bg-blue-700 shadow-xl"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="relative w-full h-64 lg:h-96 flex justify-center items-center">
                    <img
                      src="/images/interview.png"
                      alt="Digital Transformation"
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
