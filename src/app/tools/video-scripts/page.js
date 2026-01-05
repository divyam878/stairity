"use client";

import { useState, useEffect } from "react";
import { Video, Copy, Check, Sparkles, Loader2, Clock, RefreshCw } from "lucide-react";
import Underline from "../../../components/Underline";

const VIDEO_TYPES = [
  { id: 'reel', name: 'Instagram Reel', duration: '15-30s', icon: '📸' },
  { id: 'short', name: 'YouTube Short', duration: '15-60s', icon: '▶️' },
  { id: 'tiktok', name: 'TikTok Video', duration: '15-60s', icon: '🎵' },
  { id: 'story', name: 'Story/Snap', duration: '10-15s', icon: '⚡' },
];

const STYLES = [
  { id: 'tutorial', name: 'Tutorial/How-To', emoji: '📚' },
  { id: 'behind-scenes', name: 'Behind the Scenes', emoji: '🎬' },
  { id: 'testimonial', name: 'Testimonial', emoji: '💬' },
  { id: 'product-showcase', name: 'Product Showcase', emoji: '✨' },
  { id: 'trending', name: 'Trending/Viral', emoji: '🔥' },
];

export default function VideoScriptsPage() {
  const [formData, setFormData] = useState({
    topic: '',
    videoType: 'reel',
    style: 'tutorial',
    keyPoints: '',
    targetAudience: ''
  });
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [refinementFeedback, setRefinementFeedback] = useState('');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerate = async (e, isRefinement = false) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setError('');
    if (!isRefinement) setResult(null);

    try {
      const payload = isRefinement 
        ? { ...formData, refinement: refinementFeedback, previousScript: result.script }
        : formData;

      const response = await fetch('/api/ai/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setResult(data);
      if (isRefinement) setRefinementFeedback('');
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

  const selectedType = VIDEO_TYPES.find(v => v.id === formData.videoType);

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
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A] rounded-full mb-6">
            <Video className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">AI Video Scripts</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-regular text-black mb-4 leading-tight">
            Generate Video
            <br />
            <span className="relative inline-block mt-2 font-hello">
              Scripts
              <Underline color="#16A34A" width="100%" height={15} thickness="4" />
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create engaging scripts for reels, shorts, and video content in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#16A34A] shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Video Details</h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  What&apos;s your video about? *
                </label>
                <textarea
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g., How to make the perfect latte, New product launch, Customer success story..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>

              {/* Video Type */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Video Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {VIDEO_TYPES.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, videoType: type.id }))}
                      className={`p-4 rounded-2xl font-medium transition-all ${
                        formData.videoType === type.id
                          ? 'bg-[#16A34A] text-white shadow-lg scale-105'
                          : 'bg-[#F6F6F6] text-black hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{type.icon}</span>
                      <span className="text-sm block">{type.name}</span>
                      <span className="text-xs opacity-70 block mt-1">{type.duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Video Style *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {STYLES.map(style => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, style: style.id }))}
                      className={`p-3 rounded-2xl font-medium transition-all text-sm ${
                        formData.style === style.id
                          ? 'bg-[#DCFCE7] text-[#166534] shadow-md scale-105 border border-[#16A34A]'
                          : 'bg-[#F6F6F6] text-black hover:shadow-sm'
                      }`}
                    >
                      {style.emoji} {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Points */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Key Points to Cover (optional)
                </label>
                <textarea
                  value={formData.keyPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, keyPoints: e.target.value }))}
                  placeholder="List main points you want to include..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Target Audience (optional)
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="e.g., Coffee lovers, Small business owners"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 px-8 bg-[#16A34A] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Script
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#16A34A] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Your Script</h2>
              {result && (
                <button
                  onClick={() => copyToClipboard(result.script)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#166534] rounded-full font-medium hover:scale-105 transition-all border border-[#16A34A]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            
            {!result && !isGenerating && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Fill out the form and click generate to see your script</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-[#16A34A] mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Creating your video script...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated duration: {selectedType.duration}</span>
                </div>

                {/* Script */}
                <div className="p-6 rounded-2xl bg-[#F6F6F6]">
                  <div className="space-y-4">
                    {result.script.split('\n\n').map((section, index) => (
                      <div key={index}>
                        <p className="text-black whitespace-pre-wrap leading-relaxed">
                          {section}
                        </p>
                        {index < result.script.split('\n\n').length - 1 && (
                          <div className="my-4 border-t border-gray-300"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refinement Section */}
                <div className="p-6 rounded-2xl bg-[#DCFCE7] border-2 border-dashed border-[#16A34A]">
                  <label className="block text-sm font-semibold text-[#166534] mb-2">
                    💡 Want to improve this script?
                  </label>
                  <p className="text-xs text-[#166534] mb-3">
                    Tell us what you&apos;d like to change (e.g., &quot;Make it more casual&quot;, &quot;Add a joke&quot;, &quot;Shorter hook&quot;)
                  </p>
                  <textarea
                    value={refinementFeedback}
                    onChange={(e) => setRefinementFeedback(e.target.value)}
                    placeholder="e.g., Make it more energetic, add a question at the start, make the CTA stronger..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16A34A] mb-3"
                  />
                  <button
                    onClick={() => handleGenerate(null, true)}
                    disabled={!refinementFeedback.trim() || isGenerating}
                    className="w-full py-3 px-6 bg-[#16A34A] text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refine Script
                  </button>
                </div>

                {/* Visual Suggestions */}
                {result.visualSuggestions && result.visualSuggestions.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-black mb-2 block">
                      📹 Visual Suggestions
                    </label>
                    <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#16A34A]">
                      <ul className="text-sm text-[#166534] space-y-2">
                        {result.visualSuggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Music/Sound */}
                {result.musicSuggestion && (
                  <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#16A34A]">
                    <p className="text-sm font-semibold text-[#166534] mb-1">🎵 Music Suggestion:</p>
                    <p className="text-sm text-[#166534]">{result.musicSuggestion}</p>
                  </div>
                )}

                {/* Hashtags */}
                {result.hashtags && result.hashtags.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-black mb-2 block">
                      Suggested Hashtags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-full text-sm font-medium border border-[#16A34A]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* CTA */}
        <div className="mt-8 bg-[#16A34A] rounded-3xl p-8 text-center text-white border-2 border-[#15803D] shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Need more video scripts?</h2>
          <p className="text-green-100 mb-6">
            Free tier: 15 video scripts per month
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#166534] rounded-full font-bold shadow-xl hover:scale-105 transition-all"
          >
            Upgrade for Unlimited
            <Sparkles className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
  );
}
