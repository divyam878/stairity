"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Wand2 } from "lucide-react";
import Underline from "../../components/Underline";
import Faq from "./components/Faq";

const tools = [
  {
    id: 'pagespeed-insights',
    name: 'PageSpeed Insights',
    description: 'Analyse your website performance and get actionable recommendations',
    icon: '/images/pagespeed-image.png',
    available: true,
    href: '/website-analyzer',
    wandColor: { icon: 'text-blue-500', glow: 'bg-blue-400' }
  },
  {
    id: 'seo-content-generator',
    name: 'AI SEO Content Generator',
    description: 'Generate optimized meta tags, descriptions, and keywords for your pages',
    icon: '/images/seo-content-image.png',
    available: true,
    href: '/tools/seo-generator',
    wandColor: { icon: 'text-red-500', glow: 'bg-red-400' }
  },
  {
    id: 'social-media-content',
    name: 'AI Social Media Content Generator',
    description: 'Create engaging captions and posts for Instagram, TikTok, and YouTube',
    icon: '/images/social-media-content-image.png',
    available: true,
    href: '/tools/social-content',
    wandColor: { icon: 'text-yellow-500', glow: 'bg-yellow-400' }
  },
  {
    id: 'video-script-generator',
    name: 'AI Video Script Generator',
    description: 'Generate scripts for your reels, shorts, and video content',
    icon: '/images/video-script-image.png',
    available: true,
    href: '/tools/video-scripts',
    wandColor: { icon: 'text-green-500', glow: 'bg-green-400' }
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-32 ">
      <div className="max-w-7xl mx-auto px-4 ">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D5B2FF] rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#FFFFFF]" />
            <span className="text-sm font-semibold text-black">AI-Powered Tools</span>
          </div>
          
          <h1 className="text-6xl md:text-6xl font-regular text-black mb-4">
            Free Tools to Grow
            <br />
            <span className="relative inline-block mt-2 font-hello pt-5">
              Your Brand
              <Underline color="#17d8eaff" width="100%" height={24} thickness={4}/>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Powerful AI tools to help you optimize your website, create content, and grow your online presence
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.available ? tool.href : '#'}
              className={`group ${!tool.available && 'pointer-events-none'}`}
            >
              <div
                className={`
                  dashed-border-card bg-white rounded-4xl p-6 md:p-8 border border-gray-200
                  transition-all duration-300 relative overflow-hidden h-[370px]
                  ${tool.available ? 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]' : 'opacity-75'}
                `}
              >
                {/* Marching ants border - inside card */}
                <svg className="marching-ants-border-inner" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <rect x="1" y="1" width="98" height="98" rx="6" ry="6" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* AI Wand Icon - Top right */}
                <div className="absolute top-4 right-4 z-20 p-5">
                  <div className="relative">
                    <div className={`absolute inset-0 ${tool.wandColor.glow} blur-lg opacity-50 rounded-full`}></div>
                    <Wand2 className={`w-6 h-6 ${tool.wandColor.icon} relative`} />
                  </div>
                </div>

                {/* Text content */}
                <div className="relative z-10 max-w-[60%]">
                  <h3 className="google-gradient-text text-2xl md:text-3xl font-bold text-black mb-3 uppercase leading-tight">
                    {tool.name.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  {tool.available && (
                    <div className="inline-flex items-center gap-2 text-black font-semibold group-hover:gap-3 transition-all">
                      Try for free
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Image - Bottom right corner */}
                <div className="absolute bottom-0 right-0 w-52 md:w-72 h-52 md:h-72 group-hover:scale-105 transition-transform">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    fill
                    className="object-contain object-bottom-right"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <Faq />

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute top-4 left-4 w-full h-full bg-[#2bb4ae] rounded-[2rem] " />
          <div className="bg-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden border-black border-2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left content */}
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-[#00bf63] mb-6 leading-tight">
                Need a Complete<br />Website Redesign?
              </h2>
              <p className="text-gray-600 text-xl mb-8">
                Our AI tools help with content and SEO, but for a professional website redesign, work with our expert team
              </p>
            </div>

            {/* Right side - illustration placeholder and button */}
            <div className="flex flex-col items-end gap-6">
              {/* Dollar image */}
              <div className="w-24 h-24 md:w-46 hidden  md:h-46 relative">
                <Image
                  src="/images/dollar-image.png"
                  alt="Dollar"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Button */}
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-wide hover:bg-gray-800 transition-all"
              >
                View Pricing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-[#a1ffc8] rounded-3xl p-6 text-center">
          <p className="text-gray-700">
            <span className="font-semibold text-black">Free tier:</span> All tools available with basic limits • 
            <Link href="/pricing" className="text-[#005b52] hover:underline ml-1 font-semibold">
              Upgrade for unlimited access
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
