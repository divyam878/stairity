"use client";

import { useState, useEffect } from "react";
import { Instagram, Copy, Check, Sparkles, Loader2, Music, Youtube, Twitter, Briefcase, Smile, Star, BookOpen, Target } from "lucide-react";
import Underline from "../../../components/Underline";
import { useAIUsage } from "../../../hooks/useAIUsage";
import { UsageCounter, UsageLimitBanner } from "../../../components/ai/UsageComponents";

const TOOL_NAME = "social-content";

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', Icon: Instagram, maxLength: 2200 },
  { id: 'tiktok', name: 'TikTok', Icon: Music, maxLength: 300 },
  { id: 'youtube', name: 'YouTube', Icon: Youtube, maxLength: 5000 },
  { id: 'twitter', name: 'Twitter/X', Icon: Twitter, maxLength: 280 },
];

const TONES = [
  { id: 'professional', name: 'Professional', Icon: Briefcase },
  { id: 'casual', name: 'Casual & Fun', Icon: Smile },
  { id: 'inspirational', name: 'Inspirational', Icon: Star },
  { id: 'educational', name: 'Educational', Icon: BookOpen },
  { id: 'promotional', name: 'Promotional', Icon: Target },
];

export default function SocialContentPage() {
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'instagram',
    tone: 'casual',
    includeHashtags: true,
    includeEmojis: true,
    callToAction: ''
  });
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

      const response = await fetch('/api/ai/generate-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlatform = PLATFORMS.find(p => p.id === formData.platform);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EAB308] rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">AI Social Media</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-regular text-black mb-4 leading-tight">
            Create Engaging
            <br />
            <span className="relative inline-block mt-2 font-hello">
              Social Content
              <Underline color="#EAB308" width="100%" height={25} thickness="3" />
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate perfect captions and posts for Instagram, TikTok, YouTube, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#EAB308] shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Content Details</h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  What&apos;s your post about? *
                </label>
                <textarea
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g., New coffee blend launch, Behind the scenes, Customer testimonial..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Platform *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PLATFORMS.map(platform => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, platform: platform.id }))}
                      className={`p-4 rounded-2xl font-medium transition-all ${
                        formData.platform === platform.id
                          ? 'bg-[#EAB308] text-white shadow-lg scale-105'
                          : 'bg-[#F6F6F6] text-black hover:shadow-md'
                      }`}
                    >
                      <platform.Icon className="w-6 h-6 mb-1 mx-auto" />
                      <span className="text-sm">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Tone & Style *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TONES.map(tone => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tone: tone.id }))}
                      className={`p-3 rounded-2xl font-medium transition-all text-sm ${
                        formData.tone === tone.id
                          ? 'bg-[#FEF9C3] text-[#854D0E] shadow-md scale-105 border border-[#EAB308]'
                          : 'bg-[#F6F6F6] text-black hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <tone.Icon className="w-4 h-4" />
                        <span>{tone.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Call to Action (optional)
                </label>
                <input
                  type="text"
                  value={formData.callToAction}
                  onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
                  placeholder="e.g., Visit our website, Shop now, Follow for more"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeHashtags}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeHashtags: e.target.checked }))}
                    className="w-5 h-5 rounded accent-[#EAB308]"
                  />
                  <span className="text-sm text-black">Include hashtags</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeEmojis}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeEmojis: e.target.checked }))}
                    className="w-5 h-5 rounded accent-[#EAB308]"
                  />
                  <span className="text-sm text-black">Include emojis</span>
                </label>
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 px-8 bg-[#EAB308] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#EAB308] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Generated Post</h2>
              {result && (
                <button
                  onClick={() => copyToClipboard(result.caption)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEF9C3] text-[#854D0E] rounded-full font-medium hover:scale-105 transition-all border border-[#EAB308]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              )}
            </div>
            
            {!result && !isGenerating && (
              <div className="text-center py-12">
                <Instagram className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Fill out the form and click generate to see your content</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-[#EAB308] mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Creating engaging content...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Caption */}
                <div className="p-6 rounded-2xl bg-[#F6F6F6]">
                  <p className="text-black whitespace-pre-wrap leading-relaxed">
                    {result.caption}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-500">
                      {result.caption.length} / {selectedPlatform.maxLength} characters
                    </p>
                  </div>
                </div>

                {/* Hashtags */}
                {result.hashtags && result.hashtags.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-black mb-2 block">
                      Suggested Hashtags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#FEF9C3] text-[#854D0E] rounded-full text-sm font-medium border border-[#EAB308]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                {result.tips && (
                  <div className="p-4 rounded-2xl bg-[#FEF9C3] border border-[#EAB308]">
                    <p className="text-sm font-semibold text-[#854D0E] mb-2">💡 Pro Tips:</p>
                    <ul className="text-sm text-[#854D0E] space-y-1">
                      {result.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
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
        <div className="mt-8 bg-[#EAB308] rounded-3xl p-8 text-center text-white border-2 border-[#CA8A04] shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Need more social posts?</h2>
          <p className="text-yellow-100 mb-6">
            Free tier: 20 posts per month
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#854D0E] rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Upgrade for Unlimited
            <Sparkles className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
}
