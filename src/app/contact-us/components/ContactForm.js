'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedIn: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClasses = "w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border-2 border-dashed border-gray-400 focus:border-gray-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400 text-sm sm:text-base";
  const labelClasses = "block text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2";

  return (
    <section id="contact-form" className="relative bg-[#FAFAFA] py-10 sm:py-12 md:py-16">
      {/* Dotted background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Vertical lines - hidden on mobile */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gray-300 hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gray-300 hidden md:block"></div>
      
      {/* Horizontal line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at line intersections - hidden on mobile */}
      <div className="absolute top-0 left-[15%] -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute top-0 right-[15%] translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Bottom horizontal line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 hidden md:block"></div>
      
      {/* Plus markers at line intersections - bottom */}
      <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      <div className="absolute bottom-0 right-[15%] translate-x-1/2 translate-y-1/2 text-gray-400 text-3xl font-light select-none hidden md:block z-10">+</div>
      
      {/* Content container */}
      <div className="relative mx-4 sm:mx-[5%] md:mx-[15%] px-2 sm:px-4 md:px-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Row 1: Full Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            <div>
              <label htmlFor="fullName" className={labelClasses}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
          
          {/* Row 2: Phone and Interested In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="interestedIn" className={labelClasses}>
                Interested In
              </label>
              <select
                id="interestedIn"
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select a service</option>
                <option value="web-design">Web Design</option>
                <option value="web-development">Web Development</option>
                <option value="branding">Branding</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="content-creation">Content Creation</option>
                <option value="website-audit">Website Audit</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          {/* Row 3: Message */}
          <div className="mb-6 sm:mb-8">
            <label htmlFor="message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${inputClasses} sm:rows-6`}
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center gap-2 sm:gap-4 bg-black text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 text-sm sm:text-base font-semibold tracking-wider hover:bg-gray-900 transition-colors"
            >
              SEND MESSAGE
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
