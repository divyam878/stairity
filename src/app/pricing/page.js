"use client";

import { useState } from "react";
import { ArrowRight, Star, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Underline from "../../components/Underline";
import Faq from "./components/Faq";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("one-time");

  const pricingPlans = [
    {
      name: "Free Audit & AI Analysis",
      description: "For individuals to organize personal projects and life.",
      price: { oneTime: 0, monthly: 0 },
      features: [
        "Google PageSpeed Insights analysis",
        "Performance score breakdown",
        "Core Web Vitals report",
        "Mobile & Desktop metrics",
        "Basic SEO recommendations",
        "Downloadable PDF report",
      ],
      cta: "Try Now",
      ctaLink: "/tools",
      buttonVariant: "outline",
    },
    {
      name: "Website Redesign",
      description: "For small teams and professionals to work together.",
      price: { oneTime: "Custom", monthly: null },
      customPricing: true,
      features: [
        "Everything in Free Audit",
        "Custom website redesign (up to 5 pages)",
        "SEO-optimized content structure",
        "Mobile-responsive design",
        "Brand identity consultation",
        "2 rounds of revisions",
        "30-day post-launch support",
        "Performance optimization",
      ],
      cta: "Get a Quote",
      ctaLink: "/contact-us",
      popular: true,
      buttonVariant: "primary",
    },
    {
      name: "AI-Powered Pro",
      description: "For growing businesses to streamline teamwork.",
      price: { oneTime: 2499, monthly: 99 },
      features: [
        "Everything in Website Redesign",
        "AI website builder access (unlimited sites)",
        "AI-powered SEO content generation",
        "Automated meta tags & alt text",
        "AI design critique & suggestions",
        "Monthly performance monitoring",
        "Priority support (24-hour response)",
        "Quarterly strategy consultations",
      ],
      cta: "Contact Sales",
      ctaLink: "/contact-us",
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-42 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-regular text-black mb-6">
            Choose Your{" "}
            <span className="relative inline-block font-hello">
              Growth Plan
              <div
                className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 leading-tight"
                style={{ width: "100%" }}
              >
                <Underline color="#a9e2f8" width="110%" height={30} thickness="3" />
              </div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto mb-12 mt-8">
            Start with a <b>free performance audit</b>, then scale with professional redesign services and AI-powered tools
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-2 rounded-full bg-white shadow-lg mb-12">
            <button
              onClick={() => setBillingCycle("one-time")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                billingCycle === "one-time"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Monthly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 60%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const displayPrice =
              billingCycle === "monthly" && plan.price.monthly !== null
                ? plan.price.monthly
                : plan.price.oneTime;

            const isPopular = plan.popular;

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 md:p-8 bg-white border h-full flex flex-col ${
                  isPopular 
                    ? "border-blue-500 ring-1 ring-blue-500 shadow-lg" 
                    : "border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                    {isPopular && (
                      <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-bold text-black tracking-tight">
                      {plan.customPricing ? displayPrice : `$${displayPrice}`}
                    </span>
                    {!plan.customPricing && plan.price.monthly !== null && billingCycle === "monthly" && (
                      <span className="text-gray-500 font-medium ml-1">/month</span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-2.5 px-4 rounded-lg font-semibold text-center transition-all mb-8 ${
                    plan.buttonVariant === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features */}
                <div className="mt-auto">
                  <p className="text-sm font-semibold text-black mb-4">
                    {index === 0 ? "Everything in Free:" : "Everything in previous plan:"}
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${
                          plan.popular ? "text-blue-600" : "text-green-600"
                        }`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <Faq />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
        <div className="relative overflow-visible py-16">
          
          {/* Decorative dotted arcs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <svg width="400" height="100" viewBox="0 0 400 100" fill="none">
              <path 
                d="M50 80 Q200 -20 350 80" 
                stroke="#1f2937" 
                strokeWidth="3" 
                strokeDasharray="8 8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {/* Left Shadow Cards */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 rotate-[-12deg] hidden lg:block w-64 h-80 bg-gray-200 rounded-2xl" style={{ transform: 'translateX(-30%) translateY(-45%) rotate(-12deg)' }} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 rotate-[-10deg] hidden lg:block w-64 h-80 bg-gray-100 rounded-2xl" style={{ transform: 'translateX(-27%) translateY(-48%) rotate(-10deg)' }} />
          
          {/* Left Pricing Card - tilted */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 rotate-[-8deg] hidden lg:block w-64 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 z-10">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-gray-700 fill-gray-700" />
              <span className="font-bold text-gray-900">Free Audit</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Perfect for testing the waters.</p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">$0</span>
              <span className="text-sm text-gray-500"> / one-time</span>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-gray-500" />
                <span>PageSpeed analysis report</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-gray-500" />
                <span>Core Web Vitals breakdown</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-gray-500" />
                <span>Mobile & Desktop metrics</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-gray-500" />
                <span>Basic SEO recommendations</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-gray-500" />
                <span>Downloadable PDF report</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-[#1f2937] text-white text-sm rounded-full font-medium">
              Get Free Audit
            </button>
          </div>
          
          {/* Right Shadow Cards */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 rotate-[12deg] hidden lg:block w-64 h-80 bg-gray-200 rounded-2xl" style={{ transform: 'translateX(30%) translateY(-45%) rotate(12deg)' }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 rotate-[10deg] hidden lg:block w-64 h-80 bg-gray-100 rounded-2xl" style={{ transform: 'translateX(27%) translateY(-48%) rotate(10deg)' }} />
          
          {/* Right Pricing Card - tilted */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 rotate-[8deg] hidden lg:block w-64 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 z-10">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              <span className="font-bold text-gray-900">AI-Powered Pro</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">For growing businesses.</p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">$2,499</span>
              <span className="text-sm text-gray-500"> / project</span>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                <span>AI website builder access</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                <span>AI SEO content generation</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                <span>Automated meta tags & alt text</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                <span>Monthly performance monitoring</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                <span>Priority 24-hour support</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-[#1f2937] text-white text-sm rounded-full font-medium">
              Contact Sales
            </button>
          </div>
          
          {/* Center Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold text-gray-900 mb-6 leading-tight">
              Start growing by choosing the plan that fits you best.
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Whether you&apos;re just starting out or ready to scale, we have a solution tailored to help your business thrive online.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1f2937] text-white rounded-full font-semibold hover:bg-gray-800 transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
}
