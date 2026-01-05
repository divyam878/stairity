"use client";

import { useState } from "react";
import { Sparkles, Download, Eye, Code, Loader2 } from "lucide-react";
import Link from "next/link";
import Underline from "../../../components/Underline";
import WebsiteBuilderForm from "../../../components/ai/WebsiteBuilderForm";
import WebsitePreview from "../../../components/ai/WebsitePreview";

export default function AIWebsiteBuilderPage() {
  const [step, setStep] = useState(1); // 1: Form, 2: Preview
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Generation failed');
      }

      setGeneratedWebsite(data);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedWebsite) return;

    const blob = new Blob([generatedWebsite.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setStep(1);
    setGeneratedWebsite(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5D4FF] mb-6">
            <Sparkles className="w-4 h-4 text-[#9333ea]" />
            <span className="text-sm font-medium text-black">
              AI-Powered Website Builder
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-hello font-medium text-black mb-6">
            Build Your Website in{" "}
            <span className="relative inline-block">
              Minutes
              <div
                className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2"
                style={{ width: "100%" }}
              >
                <Underline color="#9333ea" width="100%" thickness="6" />
              </div>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto mb-8 mt-8">
            Tell us about your business, and our AI will create a beautiful, professional website tailored to your brand.
          </p>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === 1 ? 'bg-black text-white' : 'bg-white text-gray-600'}`}>
              <span className="font-semibold">1</span>
              <span className="text-sm">Tell Us About You</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === 2 ? 'bg-black text-white' : 'bg-white text-gray-600'}`}>
              <span className="font-semibold">2</span>
              <span className="text-sm">Preview & Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 1 && (
          <WebsiteBuilderForm 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating}
            error={error}
          />
        )}

        {step === 2 && generatedWebsite && (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" />
                Download HTML
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Create Another
              </button>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#9333ea] text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
              >
                Upgrade for More
              </Link>
            </div>

            {/* Preview */}
            <WebsitePreview html={generatedWebsite.html} />
          </div>
        )}
      </section>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
            <Loader2 className="w-16 h-16 text-[#9333ea] animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-black mb-2">
              Creating Your Website...
            </h3>
            <p className="text-gray-600">
              Our AI is crafting a beautiful website just for you. This may take 10-20 seconds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
