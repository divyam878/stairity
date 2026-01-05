"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import gsap from "gsap";
import AnalysisResults from "../../components/analysis/AnalysisResults";
import Underline from "../../components/Underline";

const normalizeResults = (raw) => {
  if (!raw) return null;

  // Function to calculate performance score based on Core Web Vitals
  const calculatePerformanceScore = (metrics) => {
    // Use provided webVitals or estimate from raw data
    const TTFB =
      metrics.webVitals?.TTFB ||
      metrics.navigation?.timeToFirstByte ||
      metrics.pageLoadTime * 0.2;
    const FCP =
      metrics.webVitals?.FCP ||
      metrics.navigation?.firstContentfulPaint ||
      metrics.pageLoadTime * 0.4;
    const LCP =
      metrics.webVitals?.LCP ||
      metrics.metrics?.LCP ||
      metrics.pageLoadTime * 0.8;
    const TBT = metrics.webVitals?.TBT || metrics.metrics?.TBT || 0;
    const CLS = metrics.webVitals?.CLS || metrics.metrics?.CLS || 0.05;

    // Normalize metrics to 0-100 scale
    const normalize = (value, ideal, poor) => {
      if (value <= ideal) return 100;
      if (value >= poor) return 0;
      return 100 - ((value - ideal) / (poor - ideal)) * 100;
    };

    // Calculate weighted score
    return Math.round(
      0.3 * normalize(LCP, 2000, 4000) + // Ideal <2s, Poor >4s
      0.25 * normalize(TBT, 0, 600) + // Ideal 0, Poor >600ms
      0.2 * normalize(FCP, 1000, 3000) + // Ideal <1s, Poor >3s
      0.15 * normalize(CLS, 0.1, 0.25) + // Ideal <0.1, Poor >0.25
      0.1 * normalize(TTFB, 200, 600), // Ideal <200ms, Poor >600ms
    );
  };

  const insights = [];

  // Calculate performance score based on Core Web Vitals
  const performanceScore =
    raw.performanceScore || calculatePerformanceScore(raw);

  // Add insights based on performance score
  if (performanceScore < 50) {
    insights.push({
      type: "error",
      message: `Low performance score: ${performanceScore}/100`,
      recommendation:
        "Review Web Vitals metrics and prioritize critical optimizations",
    });
  } else if (performanceScore < 90) {
    insights.push({
      type: "warning",
      message: `Performance score needs improvement: ${performanceScore}/100`,
      recommendation:
        "Focus on optimizing Core Web Vitals for better user experience",
    });
  }

  if (raw.pageLoadTime > 3000) {
    insights.push({
      type: "warning",
      message: "Page load time is high",
      recommendation:
        "Consider optimizing images and reducing server response time",
    });
  }

  if (raw.totalRequests > 50) {
    insights.push({
      type: "warning",
      message: "High number of requests",
      recommendation:
        "Consider bundling resources and reducing third-party scripts",
    });
  }

  // Add SEO insights
  if (raw.seo) {
    if (!raw.seo.metaTags["description"]) {
      insights.push({
        type: "warning",
        message: "Missing meta description",
        recommendation: "Add a descriptive meta description for better SEO",
      });
    }

    if (raw.seo.headings.h1 === 0) {
      insights.push({
        type: "warning",
        message: "Missing H1 heading",
        recommendation:
          "Add a primary H1 heading for better SEO and accessibility",
      });
    }

    const imagesWithoutAlt = raw.seo.images.filter((img) => !img.hasAlt).length;
    if (imagesWithoutAlt > 0) {
      insights.push({
        type: "warning",
        message: `${imagesWithoutAlt} images missing alt text`,
        recommendation:
          "Add descriptive alt text to all images for accessibility and SEO",
      });
    }
  }

  // Extract web vitals from raw data
  const webVitals = raw.webVitals || {
    TTFB: raw.navigation?.timeToFirstByte || raw.pageLoadTime * 0.2,
    FCP: raw.navigation?.firstContentfulPaint || raw.pageLoadTime * 0.4,
    LCP: raw.metrics?.LCP || raw.pageLoadTime * 0.8,
    TBT: raw.metrics?.TBT || 0,
    CLS: raw.metrics?.CLS || 0.05,
    FID: raw.metrics?.FID || 100,
  };

  return {
    url: raw.url || "",
    loadTime: raw.pageLoadTime || 0,
    performanceScore: performanceScore,
    resourceMetrics: {
      totalBytes: parseFloat(raw.totalSizeKB || "0") * 1024,
      requests: raw.totalRequests || 0,
      thirdPartyScripts: parseInt(raw.thirdPartyScripts || 0),
      resourceTypes: {
        css: parseInt(raw.css || 0),
        scripts: parseInt(raw.scripts || 0),
        images: parseInt(raw.images || 0),
        fonts: parseInt(raw.fonts || 0),
      },
    },
    domMetrics: {
      elements: parseInt(raw.elements || 0),
      domDepth: parseInt(raw.domDepth || 0),
    },
    webVitals: webVitals,
    coreWebVitals: {
      TTFB: {
        value: webVitals.TTFB,
        score:
          webVitals.TTFB < 200
            ? "good"
            : webVitals.TTFB < 600
              ? "needs-improvement"
              : "poor",
        description: "Time to First Byte measures server responsiveness",
      },
      FCP: {
        value: webVitals.FCP,
        score:
          webVitals.FCP < 1000
            ? "good"
            : webVitals.FCP < 3000
              ? "needs-improvement"
              : "poor",
        description:
          "First Contentful Paint measures when content first appears",
      },
      LCP: {
        value: webVitals.LCP,
        score:
          webVitals.LCP < 2500
            ? "good"
            : webVitals.LCP < 4000
              ? "needs-improvement"
              : "poor",
        description: "Largest Contentful Paint measures loading performance",
      },
      CLS: {
        value: webVitals.CLS,
        score:
          webVitals.CLS < 0.1
            ? "good"
            : webVitals.CLS < 0.25
              ? "needs-improvement"
              : "poor",
        description: "Cumulative Layout Shift measures visual stability",
      },
      TBT: {
        value: webVitals.TBT,
        score:
          webVitals.TBT < 300
            ? "good"
            : webVitals.TBT < 600
              ? "needs-improvement"
              : "poor",
        description: "Total Blocking Time measures interactivity",
      },
    },
    navigationTiming: raw.navigation || {
      dnsLookup: raw.pageLoadTime * 0.05,
      tcpConnection: raw.pageLoadTime * 0.05,
      tlsNegotiation: raw.pageLoadTime * 0.1,
      serverTime: raw.pageLoadTime * 0.2,
      downloadTime: raw.pageLoadTime * 0.2,
      domInteractive: raw.pageLoadTime * 0.5,
      domContentLoaded: raw.pageLoadTime * 0.6,
      domComplete: raw.pageLoadTime * 0.8,
      firstPaint: raw.pageLoadTime * 0.3,
      firstContentfulPaint: raw.pageLoadTime * 0.4,
    },
    imageInsights: {
      largestImageKB: parseFloat(raw.largestImageKB || "0"),
      totalImageSizeKB: parseFloat(raw.totalImageSizeKB || "0"),
    },
    server: {
      responseTime: parseInt(raw.serverResponseTime || 0),
      isHTTP2: !!raw.isHTTP2,
      compression: raw.compression || "unknown",
    },
    seo: raw.seo
      ? {
        title: raw.seo.title || "",
        metaTags: raw.seo.metaTags || {},
        headings: raw.seo.headings || { h1: 0, h2: 0, h3: 0 },
        images: raw.seo.images || [],
        links: raw.seo.links || { total: 0, internal: 0, external: 0 },
        structuredData: raw.seo.structuredData || [],
      }
      : null,
    technical: raw.technical
      ? {
        viewport: raw.technical.viewport || { width: 0, height: 0 },
        responsive: raw.technical.responsive || {
          hasViewportMeta: false,
          mediaQueries: 0,
        },
        security: raw.technical.security || {
          hasHttps: false,
          hasCsp: false,
        },
        technologies: raw.technical.technologies || {
          hasJQuery: false,
          hasReact: false,
          hasGoogleAnalytics: false,
        },
      }
      : null,
    insights,
    accessibility: raw.accessibility || [],
  };
};

const HeroSection = () => {
  // Animation variants for the outer glow effect
  // Removed outerGlowVariants
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  const [shouldShowResults, setShouldShowResults] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      // Store a reference to the current element
      const logoElement = logoRef.current;

      // Animate logo rotation with varying speeds
      const rotation = gsap.to(logoElement, {
        rotation: "+=360",
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        modifiers: {
          rotation: (rotation) => {
            // Variable speed rotation based on sine wave
            const speed = (Math.sin((rotation * Math.PI) / 180) + 1.5) * 1.2;
            return rotation * speed;
          },
        },
      });

      return () => {
        // Cleanup animations
        gsap.killTweensOf(logoElement);
        // Reset rotation when loading stops
        gsap.to(logoElement, {
          rotation: 0,
          duration: 0.5,
        });
      };
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      setIsLoading(true);
      setError(null);
      setAnalysisResults(null);
      setShouldShowResults(false);

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        setError("Please enter a valid URL starting with http:// or https://");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/performance-analyzer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const rawData = await response.json();

        if (!response.ok) {
          throw new Error(rawData.error || "Analysis failed");
        }

        const normalizedData = normalizeResults(rawData);
        console.log("🚀 Raw data:", rawData);
        console.log("📊 Normalized data:", normalizedData);
        setAnalysisResults(normalizedData);
        setShouldShowResults(true);
      } catch (err) {
        setError(err.message || "Failed to analyze URL. Please try again.");
        setAnalysisResults(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseAnalysis = () => {
    setShouldShowResults(false);
    setTimeout(() => {
      setAnalysisResults(null);
      setUrl("");
    }, 300); // Wait for animation to complete
  };

  return (
    <div className="w-full min-h-[calc(100vh)] pt-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
      {/* Dotted grid background */}
      <div className="absolute inset-0 bg-repeat opacity-30 z-0" />

      {/* Sticker-style Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full min-h-[calc(80vh)] bg-[#FDFDFB] rounded-[36px] px-6 py-10 md:px-14 md:py-16 flex flex-col items-center justify-center overflow-hidden isolate"
        style={{
          boxShadow: [
            '0 2px 6px -1px rgba(0, 0, 0, 0.02)',
            '0 4px 12px -2px rgba(0, 0, 0, 0.04)',
            '0 8px 24px -3px rgba(0, 0, 0, 0.06)',
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
          ].join(','),
          border: '1px solid rgba(255, 255, 255, 0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Removed glow effect */}
        {/* Notebook-style Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: 
              'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),' +
              'linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0',
            backgroundColor: 'transparent',
            opacity: 0.9
          }}
        />
        {/* Logo + Bubble */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <div className="relative w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36">
            <div 
              ref={logoRef}
              className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* 3D Frosted Glass Globe */}
              <div 
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0.25))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: [
                    'inset 2px 2px 20px rgba(255, 255, 255, 0.8)',
                    'inset -2px -2px 20px rgba(0, 0, 0, 0.15)',
                    '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
                    '0 0 0 1px rgba(255, 255, 255, 0.25)'
                  ].join(','),
                  transform: 'translateZ(10px)',
                }}
              >
                {/* Glass highlight */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), transparent 70%)',
                    opacity: 0.6,
                    mixBlendMode: 'overlay'
                  }}
                />
                
                {/* Noise texture */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.6\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                    mixBlendMode: 'overlay'
                  }}
                />
              </div>
              
              {/* Logo Image */}
              <div className="relative z-10 w-3/4 h-3/4 flex items-center justify-center p-2">
                <img
                  src="/images/webestrix-logo-short-4.svg"
                  alt="Webestrix Logo"
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight">
              Climb the Digital{" "}
              <span className="relative inline-block font-hello">
                Ladder
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#5FD6C1" width="100%" thickness="5" />
                </div>
              </span>
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-600 mt-2 mb-4">
            One Step <span className="text-gray-500">at a Time.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 mt-2">
            Begin with a <b>free analysis.</b> Reach new heights.
          </p>
        </div>

        {/* URL Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 w-full max-w-xl mx-auto"
        >
          <div className="relative w-full sm:w-[380px] rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
            </div>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Website Url"
              className="relative w-full text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-4 rounded-full bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/30 transition placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="relative w-14 h-14 flex items-center justify-center rounded-full overflow-hidden group"
            aria-label="Analyze Website"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              transition: 'all 0.3s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            }}
          >
            {/* 3D Frosted Glass Globe */}
            <div 
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: [
                  'inset 2px 2px 15px rgba(255, 255, 255, 0.9)',
                  'inset -2px -2px 15px rgba(0, 0, 0, 0.15)',
                  '0 6px 20px -2px rgba(0, 0, 0, 0.15)',
                  '0 0 0 1px rgba(255, 255, 255, 0.3)'
                ].join(','),
                transform: 'translateZ(10px)',
                transition: 'all 0.2s ease-out',
              }}
            >
              {/* Glass highlight */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 60%)',
                  opacity: 0.6,
                  mixBlendMode: 'overlay'
                }}
              />
              
              {/* Noise texture */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay'
                }}
              />
              
              {/* Icon container */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading ? (
                  <FiLoader
                    size={22}
                    className="relative z-10 text-gray-800 animate-spin"
                    style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
                  />
                ) : (
                  <FiArrowRight 
                    size={22} 
                    className="relative z-10 text-gray-800"
                    style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
                  />
                )}
              </div>
            </div>
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {shouldShowResults && analysisResults && (
            <div className="relative w-full mt-8">
              {/* Grid Background */}
              <div 
                className="absolute inset-0 -z-10 w-full h-full"
                style={{
                  backgroundImage: 
                    'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), ' +
                    'linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  opacity: 0.5,
                  maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                }}
              />
              
              {/* Vertical Center Line */}
              <div 
                className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                style={{
                  transform: 'translateX(-50%)',
                  height: '100%',
                  zIndex: 0,
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.7)'
                }}
              />
              
              {/* Horizontal Center Line */}
              <div 
                className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                style={{
                  transform: 'translateY(-50%)',
                  width: '100%',
                  zIndex: 0,
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.7)'
                }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <AnalysisResults
                  results={analysisResults}
                  onClose={handleCloseAnalysis}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HeroSection;
