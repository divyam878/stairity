"use client";

import { useState, useEffect } from "react";
import { Search, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import Underline from "../../../components/Underline";
import { useAIUsage } from "../../../hooks/useAIUsage";
import { UsageCounter, UsageLimitBanner } from "../../../components/ai/UsageComponents";

const TOOL_NAME = "seo-generator";

export default function SEOGeneratorPage() {
  const [formData, setFormData] = useState({
    pageTitle: '',
    pageDescription: '',
    targetKeywords: '',
    industry: ''
  });
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');

  // Usage tracking
  const { allowed, remaining, used, loading, incrementUsage, isSignedIn } = useAIUsage(TOOL_NAME);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    // Check usage limit
    if (!allowed) {
      setError("You've reached your free limit of 15 prompts. Please upgrade to continue.");
      return;
    }

    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      // Increment usage before making the API call
      const usageResult = await incrementUsage();
      if (usageResult.limitReached) {
        setError("You've reached your free limit of 15 prompts. Please upgrade to continue.");
        setIsGenerating(false);
        return;
      }

      const response = await fetch('/api/ai/generate-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate SEO content');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div 
      className="min-h-screen mt-24 py-16 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundColor: '#F6F6F6',
        backgroundImage: `
          linear-gradient(to right, #efefefff 1px, transparent 1px),
          linear-gradient(to bottom, #efefefff 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC2626] rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">AI SEO Generator</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-regular text-black mb-4 leading-tight">
            Generate SEO-Optimized
            <br />
            <span className="relative inline-block mt-2 font-hello">
              Content
              <Underline color="#DC2626" width="100%" height={15} thickness="3" />
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create perfect meta tags, descriptions, and keywords for better search rankings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#DC2626] shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Page Information</h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pageTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, pageTitle: e.target.value }))}
                  placeholder="e.g., Best Coffee Shop in Downtown"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Page Description
                </label>
                <textarea
                  value={formData.pageDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, pageDescription: e.target.value }))}
                  placeholder="Brief description of what this page is about..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Target Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.targetKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetKeywords: e.target.value }))}
                  placeholder="coffee shop, espresso, downtown cafe"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., Food & Beverage"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !allowed}
                className="w-full py-4 px-8 bg-[#DC2626] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : !allowed ? (
                  <>
                    Limit Reached
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate SEO Content
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#DC2626] shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Generated Content</h2>
            
            {!result && !isGenerating && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Fill out the form and click generate to see your SEO content</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-[#DC2626] mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Generating optimized content...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-black">Meta Title</label>
                    <button
                      onClick={() => copyToClipboard(result.title, 'title')}
                      className="text-sm text-[#DC2626] hover:underline flex items-center gap-1"
                    >
                      {copiedField === 'title' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'title' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                    <p className="text-black">{result.title}</p>
                    <p className="text-xs text-gray-500 mt-2">{result.title.length} characters</p>
                  </div>
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-black">Meta Description</label>
                    <button
                      onClick={() => copyToClipboard(result.description, 'description')}
                      className="text-sm text-[#DC2626] hover:underline flex items-center gap-1"
                    >
                      {copiedField === 'description' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'description' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                    <p className="text-black">{result.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{result.description.length} characters</p>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-black">Keywords</label>
                    <button
                      onClick={() => copyToClipboard(result.keywords.join(', '), 'keywords')}
                      className="text-sm text-[#DC2626] hover:underline flex items-center gap-1"
                    >
                      {copiedField === 'keywords' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'keywords' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Headings */}
                {result.h2 && (
                  <div>
                    <label className="text-sm font-semibold text-black mb-2 block">Suggested H2 Headings</label>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6] space-y-2">
                      {result.h2.map((heading, index) => (
                        <p key={index} className="text-black">• {heading}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Usage Indicator Moved to Bottom */}
        {isSignedIn && !loading && (
          <div className="mt-12">
            <UsageCounter remaining={remaining} used={used} />
            <UsageLimitBanner remaining={remaining} used={used} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-[#DC2626] rounded-3xl p-8 text-center text-white border-2 border-[#b91c1c] shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Need more SEO generations?</h2>
          <p className="text-red-100 mb-6">
            Free tier: 15 SEO generations per user
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#DC2626] rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Upgrade for Unlimited
            <Sparkles className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
}
