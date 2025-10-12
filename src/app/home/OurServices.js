"use client";

import React from "react";
import { FaGlobe, FaBullhorn, FaShoppingCart } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import Underline from "../../components/Underline";

const services = [
  {
    title: "Websites",
    description:
      "A well-designed website is a powerful marketing and communication tool that helps build trust and generate leads.",
    icon: <FaGlobe className="text-white text-xl" />,
    bg: "bg-black text-white",
    shift: "translate-y-[-10px]", // shift upward
  },
  {
    title: "Web Applications",
    description:
      "Web applications can reach a global audience. They're interactive and engaging, so can easily hold users' attention.",
    icon: <MdWeb className="text-black text-xl" />,
    bg: "bg-gray-100 text-black",
    shift: "translate-y-[-10px]", // shift upward
  },
  {
    title: "Digital Marketing",
    description:
      "Digital marketing connects businesses with the right audience online. It boosts visibility and drives sales.",
    icon: <FaBullhorn className="text-white text-xl" />,
    bg: "bg-neutral-700 text-white",
    shift: "", // normal
  },
  {
    title: "Ecommerce",
    description:
      "With eCommerce solutions, businesses can operate 24 hours a day, 7 days a week, and reach customers in any time zone.",
    icon: <FaShoppingCart className="text-black text-xl" />,
    bg: "bg-[#ACD9D9] text-black",
    shift: "", // normal
  },
];

export default function OurServices() {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Left Section  */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 ">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`
                p-6
                h-[240px]
                md:h-[280px]
                rounded-[3rem]
                shadow-xl
                ${service.bg}
                flex flex-col gap-3 transform transition-transform duration-300
                ${idx % 2 === 0 ? "sm:translate-y-[-20px]" : "sm:translate-y-[20px]"}
              `}
            >
              <div className=" w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-hello font-semibold text-center">
                {service.title}
              </h3>
              <p className="text-sm text-center">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex-1 lg:pl-24 mt-10 order-1 lg:order-2">
          <h2 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
            OUR SERVICES
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-light text-gray-500 leading-tight">
            Achieve your <br />
            business goals with
          </h2>

          <div className="mt-3">
            <div className="flex items-end gap-2">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-hello font-medium text-black">
                Web
              </h2>
              <span className="relative inline-block text-4xl md:text-5xl lg:text-5xl font-hello font-medium text-black">
                development
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-x-[1.2] md:scale-x-[1.9]" // responsive scale
                  style={{ width: "100%" }}
                >
                  <Underline color="#9333ea" width="100%" thickness="4" />
                </div>
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-5xl mt-3 font-hello font-medium text-black">
              solutions
            </h2>
          </div>

          <p className="mt-6 text-sm md:text-base text-black max-w-md">
            Our battle-tested developers specialize in a wide range of web
            development services. Here's what we deliver.
          </p>
        </div>
      </div>
    </section>
  );
}
