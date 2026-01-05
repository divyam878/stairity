"use client";

import { useState, useEffect } from "react";
import { Gauge, Loader2, ExternalLink, AlertCircle, Zap, Users, CheckCircle, Search, Lightbulb } from "lucide-react";
import Underline from "../../../components/Underline";

export default function PerformanceAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze website');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2B7FFF] rounded-full mb-6">
            <Gauge className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">PageSpeed Insights</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-regular text-black mb-4 leading-tight">
            Analyze Your
            <br />
            <span className="relative inline-block mt-2 font-hello">
              Website Performance
              <Underline color="#1a79eb" width="140%" height={25} thickness="3" />
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get detailed insights about your website's speed, SEO, and performance
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-[#2B7FFF] shadow-lg mb-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-black mb-3">
                Enter your website URL
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-6 py-4 rounded-full bg-[#F6F6F6] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] transition"
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 px-8 bg-[#2B7FFF] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Gauge className="w-5 h-5" />
                  Analyze Website
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Scores with Descriptions */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  name: 'Performance', 
                  score: result.performance, 
                  Icon: Zap,
                  description: 'How fast your website loads',
                  tip: 'Faster websites keep visitors happy and rank better on Google'
                },
                { 
                  name: 'Accessibility', 
                  score: result.accessibility, 
                  Icon: Users,
                  description: 'How easy it is for everyone to use',
                  tip: 'Including people with disabilities - good for everyone!'
                },
                { 
                  name: 'Best Practices', 
                  score: result.bestPractices, 
                  Icon: CheckCircle,
                  description: 'Following web standards',
                  tip: 'Keeps your site secure and reliable'
                },
                { 
                  name: 'SEO', 
                  score: result.seo, 
                  Icon: Search,
                  description: 'How well Google can find you',
                  tip: 'Better SEO = more people discover your business'
                },
              ].map((metric) => (
              <div key={metric.name} className="bg-white rounded-3xl p-6 border-2 border-[#2B7FFF] shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${getScoreBg(metric.score)}`}>
                      <metric.Icon className={`w-6 h-6 ${getScoreColor(metric.score)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-black">{metric.name}</h3>
                        <div className={`text-3xl font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{metric.description}</p>
                      <p className="text-xs text-gray-500 italic">{metric.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#2B7FFF] shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-2">📊 Core Web Vitals</h2>
              <p className="text-sm text-gray-600 mb-6">The key metrics that Google uses to rank your website</p>
              <div className="grid md:grid-cols-3 gap-4">
                {result.metrics && (
                  <>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                      <span className="text-xs font-bold text-green-700 uppercase">LCP</span>
                      <div className="text-2xl font-bold text-green-800 mt-1">{result.metrics.largestContentfulPaint}</div>
                      <p className="text-xs text-green-600 mt-1">Largest Contentful Paint</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
                      <span className="text-xs font-bold text-yellow-700 uppercase">FID/TBT</span>
                      <div className="text-2xl font-bold text-yellow-800 mt-1">{result.metrics.totalBlockingTime}</div>
                      <p className="text-xs text-yellow-600 mt-1">Total Blocking Time</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                      <span className="text-xs font-bold text-blue-700 uppercase">CLS</span>
                      <div className="text-2xl font-bold text-blue-800 mt-1">{result.metrics.cumulativeLayoutShift}</div>
                      <p className="text-xs text-blue-600 mt-1">Cumulative Layout Shift</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Speed Metrics */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#2B7FFF] shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-2">⏱️ Speed Metrics</h2>
              <p className="text-sm text-gray-600 mb-6">How fast your website loads for visitors</p>
              <div className="grid md:grid-cols-2 gap-4">
                {result.metrics && (
                  <>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">First Contentful Paint</span>
                        <span className="text-gray-700 font-bold">{result.metrics.firstContentfulPaint}</span>
                      </div>
                      <p className="text-xs text-gray-500">Time until first content appears</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Speed Index</span>
                        <span className="text-gray-700 font-bold">{result.metrics.speedIndex}</span>
                      </div>
                      <p className="text-xs text-gray-500">How quickly content is visually displayed</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Time to Interactive</span>
                        <span className="text-gray-700 font-bold">{result.metrics.timeToInteractive}</span>
                      </div>
                      <p className="text-xs text-gray-500">When page becomes fully interactive</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Server Response Time</span>
                        <span className="text-gray-700 font-bold">{result.metrics.serverResponseTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">Time for server to send first byte</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Resource Metrics */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#2B7FFF] shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-2">📦 Resource Analysis</h2>
              <p className="text-sm text-gray-600 mb-6">Details about your website's size and resources</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.metrics && (
                  <>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Total Page Size</span>
                        <span className="text-gray-700 font-bold">{result.metrics.totalByteWeight}</span>
                      </div>
                      <p className="text-xs text-gray-500">Combined size of all resources</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">DOM Elements</span>
                        <span className="text-gray-700 font-bold">{result.metrics.domSize}</span>
                      </div>
                      <p className="text-xs text-gray-500">Number of elements on page</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Network Requests</span>
                        <span className="text-gray-700 font-bold">{result.metrics.networkRequests}</span>
                      </div>
                      <p className="text-xs text-gray-500">Total HTTP requests made</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">JavaScript Execution</span>
                        <span className="text-gray-700 font-bold">{result.metrics.bootupTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">Time spent parsing & executing JS</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Main Thread Work</span>
                        <span className="text-gray-700 font-bold">{result.metrics.mainThreadWork}</span>
                      </div>
                      <p className="text-xs text-gray-500">Time spent on main thread</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F6F6F6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-black font-medium">Render-Blocking</span>
                        <span className="text-gray-700 font-bold">{result.metrics.renderBlockingResources || 'N/A'}</span>
                      </div>
                      <p className="text-xs text-gray-500">Resources blocking first paint</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Opportunities */}
            {result.opportunities && result.opportunities.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border-2 border-[#2B7FFF] shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-[#2B7FFF]" />
                  <h2 className="text-2xl font-bold text-black">How to Improve</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">Here's what you can do to make your website faster:</p>
                <div className="space-y-3">
                  {result.opportunities.map((opportunity, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-[#E8F4FF] border-l-4 border-[#2B7FFF]">
                      <p className="text-black font-semibold mb-2">{opportunity.title}</p>
                      <p className="text-sm text-gray-700">{opportunity.description}</p>
                      {opportunity.savings && (
                        <p className="text-xs text-[#2B7FFF] font-medium mt-2">💡 Could save: {opportunity.savings}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-[#2B7FFF] rounded-3xl p-8 text-center text-white border-2 border-[#1a5fd9] shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Want a faster, better website?</h2>
              <p className="text-blue-100 mb-6">
                Our team can redesign your website to score 90+ on all metrics
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2B7FFF] rounded-full font-bold shadow-xl hover:scale-105 transition-all"
              >
                View Pricing
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
