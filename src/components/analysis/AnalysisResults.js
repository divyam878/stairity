"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FiClock,
  FiDatabase,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrendingUp,
  FiSearch,
  FiLayout,
  FiZap,
  FiSmartphone,
  FiMonitor,
} from "react-icons/fi";
import { BsStars, BsSpeedometer2 } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";

const funnyThoughts = [
  "Analyzing your pixels...",
  "Mmm, good design but could use some spice...",
  "Whoa! That’s a lot of requests!",
  "Hmm... feels a bit cluttered.",
  "Nice load time, but could be faster.",
  "Inspecting DOM like a curious cat...",
  "Looking under the hood...",
  "Reading your site's soul...",
  "Making sense of the chaos...",
  "Almost there, hang tight!",
];

const AnalysisResults = ({ results, onClose }) => {
  const loadTimeChartRef = useRef(null);
  const resourceChartRef = useRef(null);
  const domChartRef = useRef(null);
  const scoreChartRef = useRef(null);
  const chartsInstanceRef = useRef({});
  const [loadingSentence, setLoadingSentence] = useState(funnyThoughts[0]);
  const [uiUxScore, setUiUxScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [displayUrl, setDisplayUrl] = useState("");
  const [spinSpeed, setSpinSpeed] = useState(5);
  const [textColorPhase, setTextColorPhase] = useState(0);
  const [loadingSentenceIndex, setLoadingSentenceIndex] = useState(0);
  const [pageSpeedData, setPageSpeedData] = useState(null);
  const [pageSpeedLoading, setPageSpeedLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (!results) {
      // Cycle through funny thoughts
      interval = setInterval(() => {
        setLoadingSentenceIndex((prev) => (prev + 1) % funnyThoughts.length);
      }, 3000);

      // Color cycling interval for text
      const colorInterval = setInterval(() => {
        setTextColorPhase((prev) => (prev + 1) % 100);
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(colorInterval);
      };
    } else {
      // Format URL for display by removing https:// and www. if present
      const url = results.url || "";
      setDisplayUrl(url.replace(/^https?:\/\/(www\.)?/i, ""));

      // Simulate analysis delay with progress
      setIsAnalyzing(true);
      setAnalyzeProgress(0);

      // Animation for progress bar
      const intervalTime = 50;
      const totalTime = 4000;
      const steps = totalTime / intervalTime;

      // Color cycling interval for text
      const colorInterval = setInterval(() => {
        setTextColorPhase((prev) => (prev + 1) % 100);
      }, 50);

      const progressInterval = setInterval(() => {
        setAnalyzeProgress((prev) => {
          const newValue = prev + 100 / steps;
          // Update spin speed based on progress
          if (newValue > 70) {
            setSpinSpeed(1.5); // Slow
          } else if (newValue > 40) {
            setSpinSpeed(3); // Medium
          } else {
            setSpinSpeed(5); // Fast
          }
          return newValue >= 100 ? 100 : newValue;
        });
      }, intervalTime);

      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        clearInterval(progressInterval);
      }, totalTime);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    return () => clearInterval(interval);
  }, [results]);

  // Function to fetch Google PageSpeed Insights data
  const fetchPageSpeedInsights = async (url) => {
    try {
      setPageSpeedLoading(true);
      // In a production environment, you should use your own API key
      const apiKey = "YOUR_API_KEY"; // Replace with actual API key in production
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`;

      // For demo purposes, we'll use mock data instead of making the actual API call
      // In production, you would uncomment the following lines:
      // const response = await fetch(apiUrl);
      // const data = await response.json();

      // Mock PageSpeed Insights data
      const mockData = {
        lighthouseResult: {
          categories: {
            performance: { score: 0.76 },
            accessibility: { score: 0.92 },
            "best-practices": { score: 0.87 },
            seo: { score: 0.95 },
          },
          audits: {
            "first-contentful-paint": {
              displayValue: "1.2 s",
              score: 0.88,
              numericValue: 1210,
            },
            "largest-contentful-paint": {
              displayValue: "2.8 s",
              score: 0.61,
              numericValue: 2830,
            },
            "total-blocking-time": {
              displayValue: "120 ms",
              score: 0.85,
              numericValue: 120,
            },
            "cumulative-layout-shift": {
              displayValue: "0.08",
              score: 0.96,
              numericValue: 0.08,
            },
            "speed-index": {
              displayValue: "2.4 s",
              score: 0.72,
              numericValue: 2420,
            },
            "server-response-time": {
              displayValue: "220 ms",
              score: 0.82,
              numericValue: 220,
            },
            "render-blocking-resources": {
              displayValue: "3 resources delayed",
              score: 0.67,
              details: {
                items: [
                  { url: "https://example.com/style.css" },
                  { url: "https://example.com/analytics.js" },
                  { url: "https://example.com/fonts.css" },
                ],
              },
            },
            "unused-css-rules": {
              displayValue: "45 KB potential savings",
              score: 0.54,
              numericValue: 45000,
            },
            "unused-javascript": {
              displayValue: "120 KB potential savings",
              score: 0.41,
              numericValue: 120000,
            },
            "uses-optimized-images": {
              displayValue: "60 KB potential savings",
              score: 0.78,
              numericValue: 60000,
            },
          },
        },
        loadingExperience: {
          metrics: {
            FIRST_CONTENTFUL_PAINT_MS: {
              percentile: 1500,
              category: "FAST",
            },
            FIRST_INPUT_DELAY_MS: {
              percentile: 45,
              category: "FAST",
            },
            LARGEST_CONTENTFUL_PAINT_MS: {
              percentile: 2600,
              category: "AVERAGE",
            },
            CUMULATIVE_LAYOUT_SHIFT_SCORE: {
              percentile: 12,
              category: "GOOD",
            },
          },
          overall_category: "FAST",
        },
      };

      // Set the PageSpeed data (either from API or mock data)
      setPageSpeedData(mockData);
      setPageSpeedLoading(false);
    } catch (error) {
      console.error("Error fetching PageSpeed Insights data:", error);
      setPageSpeedLoading(false);
    }
  };

  useEffect(() => {
    if (!results) return;

    // Calculate UI/UX score
    const score = calculateUIUXScore(results);
    setUiUxScore(score);

    // Fetch PageSpeed Insights data
    fetchPageSpeedInsights(results.url);

    const initCharts = async () => {
      try {
        const Chart = (await import("chart.js/auto")).default;

        Object.values(chartsInstanceRef.current).forEach((chart) => {
          if (chart) chart.destroy();
        });
        chartsInstanceRef.current = {};

        if (loadTimeChartRef.current) {
          const ctx = loadTimeChartRef.current.getContext("2d");
          chartsInstanceRef.current.loadTime = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Page Load Time (ms)"],
              datasets: [
                {
                  label: "Time (ms)",
                  data: [results?.pageLoadTime || 0],
                  backgroundColor: ["#3FBF47"],
                  borderColor: ["#3FBF47"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Page Load Performance",
                },
              },
            },
          });
        }

        if (resourceChartRef.current) {
          const ctx = resourceChartRef.current.getContext("2d");
          chartsInstanceRef.current.resource = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: Object.keys(
                results?.resourceMetrics?.resourceTypes || {},
              ),
              datasets: [
                {
                  data: Object.values(
                    results?.resourceMetrics?.resourceTypes || {},
                  ),
                  backgroundColor: ["#3FBF47", "#FEB301", "#2C95CB", "#EF6B60"],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Resource Distribution",
                },
              },
            },
          });
        }

        if (domChartRef.current) {
          const ctx = domChartRef.current.getContext("2d");
          chartsInstanceRef.current.dom = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [
                "H1 Tags",
                "H2 Tags",
                "H3 Tags",
                "Internal Links",
                "External Links",
              ],
              datasets: [
                {
                  label: "Content Structure",
                  data: [
                    results?.seo?.headings?.h1 || 0,
                    results?.seo?.headings?.h2 || 0,
                    results?.seo?.headings?.h3 || 0,
                    results?.seo?.links?.internal || 0,
                    results?.seo?.links?.external || 0,
                  ],
                  backgroundColor: ["#3FBF47", "#FEB301", "#2C95CB", "#EF6B60"],
                  borderColor: ["#3FBF47", "#FEB301", "#2C95CB", "#EF6B60"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "DOM Structure Analysis",
                },
              },
            },
          });
        }

        if (scoreChartRef.current) {
          const ctx = scoreChartRef.current.getContext("2d");
          chartsInstanceRef.current.score = new Chart(ctx, {
            type: "radar",
            data: {
              labels: [
                "Content Structure",
                "Meta Info",
                "Links",
                "Images",
                "Technical",
              ],
              datasets: [
                {
                  label: "SEO Score",
                  data: [
                    // Content structure score based on headings
                    Math.min(
                      100,
                      (results?.seo?.headings?.h1 || 0) * 50 +
                        (results?.seo?.headings?.h2 || 0) * 25 +
                        (results?.seo?.headings?.h3 || 0) * 25,
                    ),
                    // Meta info score
                    results?.seo?.metaTags?.description ? 100 : 0,
                    // Links score based on internal/external ratio
                    Math.min(
                      100,
                      ((results?.seo?.links?.internal || 0) /
                        Math.max(1, results?.seo?.links?.total || 1)) *
                        100,
                    ),
                    // Images score based on alt text
                    Math.min(
                      100,
                      ((results?.seo?.images?.filter((img) => img?.hasAlt)
                        ?.length || 0) /
                        Math.max(1, results?.seo?.images?.length || 1)) *
                        100,
                    ),
                    // Technical score
                    (results?.technical?.responsive?.hasViewportMeta ? 25 : 0) +
                      (results?.technical?.security?.hasHttps ? 25 : 0) +
                      (results?.technical?.security?.hasCsp ? 25 : 0) +
                      (results?.technical?.responsive?.mediaQueries > 0
                        ? 25
                        : 0),
                  ],
                  backgroundColor: "rgba(63, 191, 71, 0.2)",
                  borderColor: "#3FBF47",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Performance & SEO Overview",
                },
              },
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize charts:", error);
      }
    };

    initCharts();

    return () => {
      Object.values(chartsInstanceRef.current).forEach((chart) => {
        if (chart) chart.destroy();
      });
      chartsInstanceRef.current = {};
    };
  }, [results]);

  if (!results) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 text-center"
      >
        <BsStars className="animate-spin text-[#2C95CB] text-4xl mb-4" />
        <p className="text-lg text-gray-600 animate-pulse">{loadingSentence}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
    >
      <div className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Analysis Results for {displayUrl}
        </h2>

        {isAnalyzing ? (
          <div className="flex justify-center items-center mb-6 p-10 rounded-xl bg-white relative shadow-sm">
            {/* Dotted grid background */}
            <div className="absolute inset-0 bg-repeat opacity-100 z-0 rounded-xl overflow-hidden" />

            <div className="relative z-10">
              <div className="w-48 h-48 flex items-center justify-center relative">
                {/* Bubble SVG background */}
                <div className="absolute inset-0">
                  {/* Using div with background as fallback for Image component */}
                  <div
                    className="w-full h-full opacity-50"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(44, 149, 203, 0.2) 0%, rgba(44, 149, 203, 0.1) 50%, transparent 70%)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* Spinning Webestrix logo */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 / spinSpeed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-28 h-28 relative z-10"
                ></motion.div>
              </div>

              {/* Progress indicator with color-changing text */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center mb-2 w-full max-w-[200px] mx-auto">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#2C95CB] to-[#1A75A8]"
                      style={{ width: `${analyzeProgress}%` }}
                    />
                  </div>
                  <span className="text-gray-600 text-sm font-mono ml-2">
                    {Math.round(analyzeProgress)}%
                  </span>
                </div>

                <motion.p
                  className="text-base font-medium"
                  style={{
                    color: `hsl(${(textColorPhase * 3) % 360}, 70%, 45%)`,
                    transition: "color 0.5s ease",
                    textShadow: "0 0 2px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {funnyThoughts[loadingSentenceIndex]}
                </motion.p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-sm text-gray-600 mb-4">
          Here&apos;s a breakdown of your page performance in simple terms:
          <ul className="list-disc ml-6 mt-2">
            <li>
              We checked how long your page took to load – faster is better!
            </li>
            <li>
              We analyzed what types of files your page uses – images, scripts,
              styles, etc.
            </li>
            <li>
              We looked at how complex your HTML structure is – less clutter =
              faster site.
            </li>
            <li>We reviewed accessibility, SEO and best practices.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`bg-white p-4 rounded-lg shadow ${
                results?.loadTime < 2000
                  ? "border-l-4 border-[#3FBF47]"
                  : results?.loadTime < 4000
                    ? "border-l-4 border-[#FEB301]"
                    : "border-l-4 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiClock
                    className={`mr-2 ${
                      results?.loadTime < 2000
                        ? "text-[#3FBF47]"
                        : results?.loadTime < 4000
                          ? "text-[#FEB301]"
                          : "text-[#EF6B60]"
                    }`}
                  />
                  <h3 className="font-medium">Total Load Time</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results?.loadTime < 2000
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results?.loadTime < 4000
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results?.loadTime < 2000
                    ? "Fast"
                    : results?.loadTime < 4000
                      ? "Average"
                      : "Slow"}
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  results?.loadTime < 2000
                    ? "text-[#3FBF47]"
                    : results?.loadTime < 4000
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {((results?.loadTime || 0) / 1000).toFixed(2)}s
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`bg-white p-4 rounded-lg shadow ${
                results?.resourceMetrics?.totalBytes < 500000
                  ? "border-l-4 border-[#3FBF47]"
                  : results?.resourceMetrics?.totalBytes < 2000000
                    ? "border-l-4 border-[#FEB301]"
                    : "border-l-4 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiDatabase
                    className={`mr-2 ${
                      results?.resourceMetrics?.totalBytes < 500000
                        ? "text-[#3FBF47]"
                        : results?.resourceMetrics?.totalBytes < 2000000
                          ? "text-[#FEB301]"
                          : "text-[#EF6B60]"
                    }`}
                  />
                  <h3 className="font-medium">Total Size</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results?.resourceMetrics?.totalBytes < 500000
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results?.resourceMetrics?.totalBytes < 2000000
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results?.resourceMetrics?.totalBytes < 500000
                    ? "Optimized"
                    : results?.resourceMetrics?.totalBytes < 2000000
                      ? "Average"
                      : "Large"}
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  results?.resourceMetrics?.totalBytes < 500000
                    ? "text-[#3FBF47]"
                    : results?.resourceMetrics?.totalBytes < 2000000
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {(results?.resourceMetrics?.totalBytes / 1024 / 1024).toFixed(
                  2,
                )}{" "}
                MB
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`bg-white p-4 rounded-lg shadow ${
                (results?.insights?.length || 0) === 0
                  ? "border-l-4 border-[#3FBF47]"
                  : (results?.insights?.length || 0) < 3
                    ? "border-l-4 border-[#FEB301]"
                    : "border-l-4 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiAlertTriangle
                    className={`mr-2 ${
                      (results?.insights?.length || 0) === 0
                        ? "text-[#3FBF47]"
                        : (results?.insights?.length || 0) < 3
                          ? "text-[#FEB301]"
                          : "text-[#EF6B60]"
                    }`}
                  />
                  <h3 className="font-medium">Issues</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    (results?.insights?.length || 0) === 0
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : (results?.insights?.length || 0) < 3
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {(results?.insights?.length || 0) === 0
                    ? "None"
                    : (results?.insights?.length || 0) < 3
                      ? "Minor"
                      : "Critical"}
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  (results?.insights?.length || 0) === 0
                    ? "text-[#3FBF47]"
                    : (results?.insights?.length || 0) < 3
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {results?.insights?.length || 0}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`bg-white p-4 rounded-lg shadow ${
                results?.resourceMetrics?.requests < 30
                  ? "border-l-4 border-[#3FBF47]"
                  : results?.resourceMetrics?.requests < 60
                    ? "border-l-4 border-[#FEB301]"
                    : "border-l-4 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiCheckCircle
                    className={`mr-2 ${
                      results?.resourceMetrics?.requests < 30
                        ? "text-[#3FBF47]"
                        : results?.resourceMetrics?.requests < 60
                          ? "text-[#FEB301]"
                          : "text-[#EF6B60]"
                    }`}
                  />
                  <h3 className="font-medium">Requests</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results?.resourceMetrics?.requests < 30
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results?.resourceMetrics?.requests < 60
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results?.resourceMetrics?.requests < 30
                    ? "Optimized"
                    : results?.resourceMetrics?.requests < 60
                      ? "Average"
                      : "High"}
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  results?.resourceMetrics?.requests < 30
                    ? "text-[#3FBF47]"
                    : results?.resourceMetrics?.requests < 60
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {results?.resourceMetrics?.requests || 0}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className={`bg-white p-4 rounded-lg shadow ${
                results?.seo?.headings?.h1 === 1
                  ? "border-l-4 border-[#3FBF47]"
                  : results?.seo?.headings?.h1 === 0
                    ? "border-l-4 border-[#EF6B60]"
                    : "border-l-4 border-[#FEB301]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiSearch
                    className={`mr-2 ${
                      results?.seo?.headings?.h1 === 1
                        ? "text-[#3FBF47]"
                        : results?.seo?.headings?.h1 === 0
                          ? "text-[#EF6B60]"
                          : "text-[#FEB301]"
                    }`}
                  />
                  <h3 className="font-medium">SEO Status</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results?.seo?.headings?.h1 === 1
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results?.seo?.headings?.h1 === 0
                        ? "bg-[#EF6B60]/10 text-[#EF6B60]"
                        : "bg-[#FEB301]/10 text-[#FEB301]"
                  }`}
                >
                  {results?.seo?.headings?.h1 === 1
                    ? "Good"
                    : results?.seo?.headings?.h1 === 0
                      ? "Critical"
                      : "Needs Improvement"}
                </span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  results?.seo?.headings?.h1 === 1
                    ? "text-[#3FBF47]"
                    : results?.seo?.headings?.h1 === 0
                      ? "text-[#EF6B60]"
                      : "text-[#FEB301]"
                }`}
              >
                {results?.seo?.headings?.h1 || 0} H1s,{" "}
                {results?.seo?.links?.total || 0} Links
              </p>
            </div>
          </div>
          <div
            className={`bg-gray-50 p-4 rounded-lg ${
              results?.performanceScore >= 90
                ? "border-l-4 border-[#3FBF47]"
                : results?.performanceScore >= 50
                  ? "border-l-4 border-[#FEB301]"
                  : "border-l-4 border-[#EF6B60]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FiTrendingUp
                  className={`mr-2 ${
                    results?.performanceScore >= 90
                      ? "text-[#3FBF47]"
                      : results?.performanceScore >= 50
                        ? "text-[#FEB301]"
                        : "text-[#EF6B60]"
                  }`}
                />
                <h3 className="font-medium">Performance Score</h3>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  results?.performanceScore >= 90
                    ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                    : results?.performanceScore >= 50
                      ? "bg-[#FEB301]/10 text-[#FEB301]"
                      : "bg-[#EF6B60]/10 text-[#EF6B60]"
                }`}
              >
                {results?.performanceScore >= 90
                  ? "Good"
                  : results?.performanceScore >= 50
                    ? "Needs Improvement"
                    : "Poor"}
              </span>
            </div>
            <p
              className={`text-2xl font-bold ${
                results?.performanceScore >= 90
                  ? "text-[#3FBF47]"
                  : results?.performanceScore >= 50
                    ? "text-[#FEB301]"
                    : "text-[#EF6B60]"
              }`}
            >
              {results?.performanceScore || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas ref={loadTimeChartRef} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas ref={resourceChartRef} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas ref={domChartRef} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas ref={scoreChartRef} />
        </div>
      </div>

      {/* Google PageSpeed Insights Section */}
      {pageSpeedData && (
        <div className="mb-8 text-black">
          {/* <h3 className="text-xl font-semibold mb-4 text-black flex items-center">
            <FaGoogle className="mr-2 text-[#4285F4]" />
            PageSpeed Insights
          </h3> */}

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <BsSpeedometer2 className="text-3xl mr-3 text-[#4285F4]" />
                <div>
                  <h4 className="font-medium text-lg">Performance Score</h4>
                  <p className="text-sm text-gray-600">
                    Google&apos;s assessment of your page performance
                  </p>
                </div>
              </div>
              <div className="relative h-24 w-24">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      pageSpeedData.lighthouseResult.categories.performance
                        .score >= 0.9
                        ? "#3FBF47"
                        : pageSpeedData.lighthouseResult.categories.performance
                              .score >= 0.5
                          ? "#FEB301"
                          : "#EF6B60"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${pageSpeedData.lighthouseResult.categories.performance.score * 100}, 100`}
                    strokeLinecap="round"
                  />
                  <text
                    x="18"
                    y="20.5"
                    textAnchor="middle"
                    className="text-lg font-bold"
                  >
                    {Math.round(
                      pageSpeedData.lighthouseResult.categories.performance
                        .score * 100,
                    )}
                  </text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      pageSpeedData.lighthouseResult.categories.performance
                        .score >= 0.9
                        ? "bg-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.categories.performance
                              .score >= 0.5
                          ? "bg-[#FEB301]"
                          : "bg-[#EF6B60]"
                    }`}
                  ></div>
                  <h5 className="text-sm font-medium">Performance</h5>
                </div>
                <p className="text-xl font-bold">
                  {Math.round(
                    pageSpeedData.lighthouseResult.categories.performance
                      .score * 100,
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      pageSpeedData.lighthouseResult.categories.accessibility
                        .score >= 0.9
                        ? "bg-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.categories
                              .accessibility.score >= 0.5
                          ? "bg-[#FEB301]"
                          : "bg-[#EF6B60]"
                    }`}
                  ></div>
                  <h5 className="text-sm font-medium">Accessibility</h5>
                </div>
                <p className="text-xl font-bold">
                  {Math.round(
                    pageSpeedData.lighthouseResult.categories.accessibility
                      .score * 100,
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      pageSpeedData.lighthouseResult.categories[
                        "best-practices"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.categories[
                              "best-practices"
                            ].score >= 0.5
                          ? "bg-[#FEB301]"
                          : "bg-[#EF6B60]"
                    }`}
                  ></div>
                  <h5 className="text-sm font-medium">Best Practices</h5>
                </div>
                <p className="text-xl font-bold">
                  {Math.round(
                    pageSpeedData.lighthouseResult.categories["best-practices"]
                      .score * 100,
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      pageSpeedData.lighthouseResult.categories.seo.score >= 0.9
                        ? "bg-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.categories.seo.score >=
                            0.5
                          ? "bg-[#FEB301]"
                          : "bg-[#EF6B60]"
                    }`}
                  ></div>
                  <h5 className="text-sm font-medium">SEO</h5>
                </div>
                <p className="text-xl font-bold">
                  {Math.round(
                    pageSpeedData.lighthouseResult.categories.seo.score * 100,
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <FiSmartphone className="mr-2" />
                  Core Web Vitals
                </h4>
                <div className="space-y-3">
                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits[
                        "largest-contentful-paint"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "largest-contentful-paint"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Largest Contentful Paint</p>
                        <p className="text-xs text-gray-600">
                          Time to render largest content element
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            pageSpeedData.lighthouseResult.audits[
                              "largest-contentful-paint"
                            ].score >= 0.9
                              ? "text-[#3FBF47]"
                              : pageSpeedData.lighthouseResult.audits[
                                    "largest-contentful-paint"
                                  ].score >= 0.5
                                ? "text-[#FEB301]"
                                : "text-[#EF6B60]"
                          }`}
                        >
                          {
                            pageSpeedData.lighthouseResult.audits[
                              "largest-contentful-paint"
                            ].displayValue
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits[
                        "cumulative-layout-shift"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "cumulative-layout-shift"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Cumulative Layout Shift</p>
                        <p className="text-xs text-gray-600">
                          Measures visual stability
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            pageSpeedData.lighthouseResult.audits[
                              "cumulative-layout-shift"
                            ].score >= 0.9
                              ? "text-[#3FBF47]"
                              : pageSpeedData.lighthouseResult.audits[
                                    "cumulative-layout-shift"
                                  ].score >= 0.5
                                ? "text-[#FEB301]"
                                : "text-[#EF6B60]"
                          }`}
                        >
                          {
                            pageSpeedData.lighthouseResult.audits[
                              "cumulative-layout-shift"
                            ].displayValue
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits[
                        "total-blocking-time"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "total-blocking-time"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Total Blocking Time</p>
                        <p className="text-xs text-gray-600">
                          Measures interactivity
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            pageSpeedData.lighthouseResult.audits[
                              "total-blocking-time"
                            ].score >= 0.9
                              ? "text-[#3FBF47]"
                              : pageSpeedData.lighthouseResult.audits[
                                    "total-blocking-time"
                                  ].score >= 0.5
                                ? "text-[#FEB301]"
                                : "text-[#EF6B60]"
                          }`}
                        >
                          {
                            pageSpeedData.lighthouseResult.audits[
                              "total-blocking-time"
                            ].displayValue
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <FiZap className="mr-2" />
                  Optimization Opportunities
                </h4>
                <div className="space-y-3">
                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits[
                        "render-blocking-resources"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "render-blocking-resources"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <p className="font-medium">
                      Eliminate Render-Blocking Resources
                    </p>
                    <p className="text-sm text-gray-600">
                      {
                        pageSpeedData.lighthouseResult.audits[
                          "render-blocking-resources"
                        ].displayValue
                      }
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits["unused-css-rules"]
                        .score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "unused-css-rules"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <p className="font-medium">Remove Unused CSS</p>
                    <p className="text-sm text-gray-600">
                      {
                        pageSpeedData.lighthouseResult.audits[
                          "unused-css-rules"
                        ].displayValue
                      }
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-l-4 ${
                      pageSpeedData.lighthouseResult.audits[
                        "uses-optimized-images"
                      ].score >= 0.9
                        ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                        : pageSpeedData.lighthouseResult.audits[
                              "uses-optimized-images"
                            ].score >= 0.5
                          ? "bg-[#FEB301]/10 border-[#FEB301]"
                          : "bg-[#EF6B60]/10 border-[#EF6B60]"
                    }`}
                  >
                    <p className="font-medium">Efficiently Encode Images</p>
                    <p className="text-sm text-gray-600">
                      {
                        pageSpeedData.lighthouseResult.audits[
                          "uses-optimized-images"
                        ].displayValue
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core Web Vitals Section */}
      {results?.coreWebVitals && (
        <div className="mb-8 text-black">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Core Web Vitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.coreWebVitals.TTFB.score === "good"
                  ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                  : results.coreWebVitals.TTFB.score === "needs-improvement"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#EF6B60]/10 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">TTFB</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results.coreWebVitals.TTFB.score === "good"
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results.coreWebVitals.TTFB.score === "needs-improvement"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results.coreWebVitals.TTFB.score === "good"
                    ? "Good"
                    : results.coreWebVitals.TTFB.score === "needs-improvement"
                      ? "Needs Improvement"
                      : "Poor"}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  results.coreWebVitals.TTFB.score === "good"
                    ? "text-[#3FBF47]"
                    : results.coreWebVitals.TTFB.score === "needs-improvement"
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {(results.webVitals?.TTFB / 1000).toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500 mt-1">Time to First Byte</p>
            </div>

            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.coreWebVitals.FCP.score === "good"
                  ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                  : results.coreWebVitals.FCP.score === "needs-improvement"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#EF6B60]/10 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">FCP</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results.coreWebVitals.FCP.score === "good"
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results.coreWebVitals.FCP.score === "needs-improvement"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results.coreWebVitals.FCP.score === "good"
                    ? "Good"
                    : results.coreWebVitals.FCP.score === "needs-improvement"
                      ? "Needs Improvement"
                      : "Poor"}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  results.coreWebVitals.FCP.score === "good"
                    ? "text-[#3FBF47]"
                    : results.coreWebVitals.FCP.score === "needs-improvement"
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {(results.webVitals?.FCP / 1000).toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500 mt-1">
                First Contentful Paint
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.coreWebVitals.LCP.score === "good"
                  ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                  : results.coreWebVitals.LCP.score === "needs-improvement"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#EF6B60]/10 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">LCP</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results.coreWebVitals.LCP.score === "good"
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results.coreWebVitals.LCP.score === "needs-improvement"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results.coreWebVitals.LCP.score === "good"
                    ? "Good"
                    : results.coreWebVitals.LCP.score === "needs-improvement"
                      ? "Needs Improvement"
                      : "Poor"}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  results.coreWebVitals.LCP.score === "good"
                    ? "text-[#3FBF47]"
                    : results.coreWebVitals.LCP.score === "needs-improvement"
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {(results.webVitals?.LCP / 1000).toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Largest Contentful Paint
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.coreWebVitals.CLS.score === "good"
                  ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                  : results.coreWebVitals.CLS.score === "needs-improvement"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#EF6B60]/10 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">CLS</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results.coreWebVitals.CLS.score === "good"
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results.coreWebVitals.CLS.score === "needs-improvement"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results.coreWebVitals.CLS.score === "good"
                    ? "Good"
                    : results.coreWebVitals.CLS.score === "needs-improvement"
                      ? "Needs Improvement"
                      : "Poor"}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  results.coreWebVitals.CLS.score === "good"
                    ? "text-[#3FBF47]"
                    : results.coreWebVitals.CLS.score === "needs-improvement"
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {results.webVitals?.CLS.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Cumulative Layout Shift
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.coreWebVitals.TBT.score === "good"
                  ? "bg-[#3FBF47]/10 border-[#3FBF47]"
                  : results.coreWebVitals.TBT.score === "needs-improvement"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#EF6B60]/10 border-[#EF6B60]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">TBT</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    results.coreWebVitals.TBT.score === "good"
                      ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                      : results.coreWebVitals.TBT.score === "needs-improvement"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#EF6B60]/10 text-[#EF6B60]"
                  }`}
                >
                  {results.coreWebVitals.TBT.score === "good"
                    ? "Good"
                    : results.coreWebVitals.TBT.score === "needs-improvement"
                      ? "Needs Improvement"
                      : "Poor"}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  results.coreWebVitals.TBT.score === "good"
                    ? "text-[#3FBF47]"
                    : results.coreWebVitals.TBT.score === "needs-improvement"
                      ? "text-[#FEB301]"
                      : "text-[#EF6B60]"
                }`}
              >
                {results.webVitals?.TBT}ms
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Blocking Time</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#2C95CB]">
            <h4 className="font-medium mb-2 flex items-center">
              <span className="w-2 h-2 bg-[#2C95CB] rounded-full mr-2"></span>
              Understanding Core Web Vitals
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Core Web Vitals are Google&apos;s metrics for measuring user
              experience quality factors that are crucial to delivering a great
              user experience on the web.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-xs font-medium">Ideal Thresholds:</p>
                <ul className="text-xs text-gray-600 list-disc ml-4 mt-1 space-y-1">
                  <li>
                    <span className="text-[#3FBF47] font-medium">TTFB:</span>{" "}
                    &lt; 200ms
                  </li>
                  <li>
                    <span className="text-[#3FBF47] font-medium">FCP:</span>{" "}
                    &lt; 1s
                  </li>
                  <li>
                    <span className="text-[#3FBF47] font-medium">LCP:</span>{" "}
                    &lt; 2.5s
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium">Ideal Thresholds:</p>
                <ul className="text-xs text-gray-600 list-disc ml-4 mt-1 space-y-1">
                  <li>
                    <span className="text-[#3FBF47] font-medium">CLS:</span>{" "}
                    &lt; 0.1
                  </li>
                  <li>
                    <span className="text-[#3FBF47] font-medium">TBT:</span>{" "}
                    &lt; 300ms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Analysis Section */}
      {results?.seo && (
        <div className="mb-8 text-black">
          <h3 className="text-xl font-semibold mb-4 text-black">
            SEO Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Meta Information</h4>
              <div className="space-y-2">
                <p>
                  <strong>Title:</strong> {results.seo.title}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {results.seo.metaTags.description || "Missing"}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Content Structure</h4>
              <div className="space-y-2">
                <p>
                  <strong>H1 Tags:</strong> {results.seo.headings.h1}
                </p>
                <p>
                  <strong>H2 Tags:</strong> {results.seo.headings.h2}
                </p>
                <p>
                  <strong>H3 Tags:</strong> {results.seo.headings.h3}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Links Analysis</h4>
              <div className="space-y-2">
                <p>
                  <strong>Total Links:</strong> {results.seo.links.total}
                </p>
                <p>
                  <strong>Internal Links:</strong> {results.seo.links.internal}
                </p>
                <p>
                  <strong>External Links:</strong> {results.seo.links.external}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Image Optimization</h4>
              <div className="space-y-2">
                <p>
                  <strong>Total Images:</strong> {results.seo.images.length}
                </p>
                <p>
                  <strong>Images with Alt:</strong>{" "}
                  {results.seo.images.filter((img) => img.hasAlt).length}
                </p>
                <p>
                  <strong>Images without Alt:</strong>{" "}
                  {results.seo.images.filter((img) => !img.hasAlt).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UI/UX Analysis Section */}
      {results && uiUxScore && (
        <div className="mb-8 text-black">
          <h3 className="text-xl font-semibold mb-4 text-black">
            UI/UX Analysis
          </h3>
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-lg flex items-center">
                <FiLayout className="mr-2" />
                Overall UI/UX Score
              </h4>
              <div
                className={`text-2xl font-bold px-4 py-2 rounded-full ${
                  uiUxScore.score >= 80
                    ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                    : uiUxScore.score >= 60
                      ? "bg-[#FEB301]/10 text-[#FEB301]"
                      : "bg-[#EF6B60]/10 text-[#EF6B60]"
                }`}
              >
                {uiUxScore.score}/100
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-2">Score Breakdown</h5>
                <div className="space-y-2">
                  {Object.entries(uiUxScore.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{key}</span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          value.score >= 80
                            ? "bg-[#3FBF47]/10 text-[#3FBF47]"
                            : value.score >= 60
                              ? "bg-[#FEB301]/10 text-[#FEB301]"
                              : "bg-[#EF6B60]/10 text-[#EF6B60]"
                        }`}
                      >
                        {value.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Recommendations</h5>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {uiUxScore.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technical Analysis Section */}
      {results?.technical && (
        <div className="mb-8 text-black">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Technical Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Responsive Design</h4>
              <div className="space-y-2">
                <p>
                  <strong>Viewport Meta:</strong>{" "}
                  {results.technical.responsive.hasViewportMeta ? (
                    <span className="text-[#3FBF47]">✓</span>
                  ) : (
                    <span className="text-[#EF6B60]">✗</span>
                  )}
                </p>
                <p>
                  <strong>Media Queries:</strong>{" "}
                  {results.technical.responsive.mediaQueries}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Security</h4>
              <div className="space-y-2">
                <p>
                  <strong>HTTPS:</strong>{" "}
                  {results.technical.security.hasHttps ? (
                    <span className="text-[#3FBF47]">✓</span>
                  ) : (
                    <span className="text-[#EF6B60]">✗</span>
                  )}
                </p>
                <p>
                  <strong>Content Security Policy:</strong>{" "}
                  {results.technical.security.hasCsp ? (
                    <span className="text-[#3FBF47]">✓</span>
                  ) : (
                    <span className="text-[#EF6B60]">✗</span>
                  )}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">Technologies</h4>
              <div className="space-y-2">
                {Object.entries(results.technical.technologies).map(
                  ([key, value]) => {
                    // Only show technologies that are detected (value is true)
                    if (!value) return null;

                    // Format the technology name (e.g., hasReact -> React)
                    let techName = key.replace(/^has/, "");

                    // Format common technology names for better readability
                    const techNameMap = {
                      React: "React",
                      jQuery: "jQuery",
                      GoogleAnalytics: "Google Analytics",
                      GoogleTagManager: "Google Tag Manager",
                      Bootstrap: "Bootstrap",
                      Tailwind: "Tailwind CSS",
                      WordPress: "WordPress",
                      NextJS: "Next.js",
                      VueJS: "Vue.js",
                      Angular: "Angular",
                      Gatsby: "Gatsby",
                      GraphQL: "GraphQL",
                      TypeScript: "TypeScript",
                      Firebase: "Firebase",
                      Shopify: "Shopify",
                      Wix: "Wix",
                      Webflow: "Webflow",
                      Contentful: "Contentful",
                      Prismic: "Prismic",
                      Sanity: "Sanity",
                      Cloudflare: "Cloudflare",
                    };

                    if (techNameMap[techName]) {
                      techName = techNameMap[techName];
                    } else {
                      // Add spaces before capital letters for unlisted technologies
                      techName = techName.replace(/([A-Z])/g, " $1").trim();
                    }

                    return (
                      <p key={key} className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-[#3FBF47] rounded-full mr-2"></span>
                        <strong>{techName}</strong>
                      </p>
                    );
                  },
                )}
                {!Object.values(results.technical.technologies).some(
                  Boolean,
                ) && (
                  <p className="text-gray-500 italic">
                    No specific technologies detected on this site
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 text-black">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Insights & Recommendations
        </h3>
        <div className="space-y-4">
          {results?.insights?.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === "error"
                  ? "bg-[#EF6B60]/10 border-[#EF6B60]"
                  : insight.type === "warning"
                    ? "bg-[#FEB301]/10 border-[#FEB301]"
                    : "bg-[#3FBF47]/10 border-[#3FBF47]"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{insight.message}</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    insight.type === "error"
                      ? "bg-[#EF6B60]/10 text-[#EF6B60]"
                      : insight.type === "warning"
                        ? "bg-[#FEB301]/10 text-[#FEB301]"
                        : "bg-[#3FBF47]/10 text-[#3FBF47]"
                  }`}
                >
                  {insight.type === "error"
                    ? "Critical"
                    : insight.type === "warning"
                      ? "Warning"
                      : "Good"}
                </span>
              </div>
              <p className="text-sm text-gray-600">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {results?.accessibility?.length > 0 && (
        <div className="mb-8 text-black">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Accessibility Issues
          </h3>
          <div className="space-y-2">
            {results?.accessibility?.map((issue, index) => (
              <div
                key={index}
                className="p-3 bg-[#EF6B60]/10 rounded border-l-4 border-[#EF6B60]"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-[#EF6B60]">
                    {issue.type} on {issue.element}
                  </p>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#EF6B60]/10 text-[#EF6B60]">
                    Critical
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full transition-colors"
        >
          Close Analysis
        </button>
      </div>
    </motion.div>
  );
};

// Calculate UI/UX score based on heuristics
const calculateUIUXScore = (results) => {
  // Initialize metrics object
  const metrics = {
    "Font Usage": { score: 0, weight: 0.125 },
    "Element Density": { score: 0, weight: 0.125 },
    "Color Contrast": { score: 0, weight: 0.15 },
    Accessibility: { score: 0, weight: 0.175 },
    "Layout Stability": { score: 0, weight: 0.125 },
    "Interactive Elements": { score: 0, weight: 0.125 },
    "PageSpeed Performance": { score: 0, weight: 0.175 },
  };

  const recommendations = [];

  // 1. Font Usage (1-3 fonts is good, >5 is bad)
  const fontCount = results?.technical?.fonts?.length || 0;
  if (fontCount <= 3) {
    metrics["Font Usage"].score = 100;
  } else if (fontCount <= 5) {
    metrics["Font Usage"].score = 70;
    recommendations.push(
      "Consider reducing the number of different fonts to 3 or fewer for better visual consistency.",
    );
  } else {
    metrics["Font Usage"].score = 40;
    recommendations.push(
      "Too many fonts detected. Reduce to 3 or fewer for better visual hierarchy and consistency.",
    );
  }

  // 2. Element Density (100-300 elements is good, >800 is bad)
  const elementCount = results?.technical?.domStats?.elementCount || 0;
  if (elementCount >= 100 && elementCount <= 300) {
    metrics["Element Density"].score = 100;
  } else if (elementCount < 100) {
    metrics["Element Density"].score = 80;
  } else if (elementCount <= 800) {
    metrics["Element Density"].score = 70;
    recommendations.push(
      "Page contains many DOM elements. Consider simplifying the page structure.",
    );
  } else {
    metrics["Element Density"].score = 40;
    recommendations.push(
      "Very high element count detected. This may lead to poor performance and user experience.",
    );
  }

  // 3. Color Contrast (0 issues is good, >5 is bad)
  const contrastIssues = results?.accessibility?.contrastIssues || 0;
  if (contrastIssues === 0) {
    metrics["Color Contrast"].score = 100;
  } else if (contrastIssues <= 2) {
    metrics["Color Contrast"].score = 80;
    recommendations.push(
      "Minor contrast issues detected. Ensure text is readable against its background.",
    );
  } else if (contrastIssues <= 5) {
    metrics["Color Contrast"].score = 60;
    recommendations.push(
      "Several contrast issues detected. Improve text readability by increasing contrast ratios.",
    );
  } else {
    metrics["Color Contrast"].score = 30;
    recommendations.push(
      "Significant contrast issues detected. Users may struggle to read content. Fix contrast ratios.",
    );
  }

  // 4. Accessibility violations (0 is good, >5 is bad)
  const accessibilityViolations =
    results?.accessibility?.violations?.length || 0;
  if (accessibilityViolations === 0) {
    metrics["Accessibility"].score = 100;
  } else if (accessibilityViolations <= 2) {
    metrics["Accessibility"].score = 80;
    recommendations.push(
      "Fix minor accessibility issues to improve usability for all users.",
    );
  } else if (accessibilityViolations <= 5) {
    metrics["Accessibility"].score = 60;
    recommendations.push(
      "Several accessibility issues detected. Address these to improve inclusivity.",
    );
  } else {
    metrics["Accessibility"].score = 30;
    recommendations.push(
      "Significant accessibility issues found. Your site may be difficult for many users to navigate.",
    );
  }

  // 5. Layout shifts/CLS (<0.1 is good, >0.25 is bad)
  const cls = results?.webVitals?.CLS || 0;
  if (cls < 0.1) {
    metrics["Layout Stability"].score = 100;
  } else if (cls < 0.25) {
    metrics["Layout Stability"].score = 70;
    recommendations.push(
      "Some layout shifts detected. Improve stability by setting dimensions for images and embeds.",
    );
  } else {
    metrics["Layout Stability"].score = 40;
    recommendations.push(
      "High layout shift score. Users may experience disruptive page movement during loading.",
    );
  }

  // 6. Interactive elements (1-10 visible buttons is good, 0 or >20 is bad)
  const buttonCount = results?.technical?.interactiveElements?.buttons || 0;
  if (buttonCount >= 1 && buttonCount <= 10) {
    metrics["Interactive Elements"].score = 100;
  } else if (buttonCount === 0) {
    metrics["Interactive Elements"].score = 60;
    recommendations.push(
      "No interactive buttons detected. Consider adding clear calls-to-action.",
    );
  } else if (buttonCount <= 20) {
    metrics["Interactive Elements"].score = 70;
    recommendations.push(
      "Many interactive elements detected. Consider simplifying the interface.",
    );
  } else {
    metrics["Interactive Elements"].score = 40;
    recommendations.push(
      "Too many interactive elements. Users may experience choice overload.",
    );
  }

  // Add mobile responsiveness recommendation if needed
  if (results?.technical?.responsive?.hasViewportMeta === false) {
    recommendations.push(
      "Missing viewport meta tag. Your site may not display correctly on mobile devices.",
    );
  }

  if (results?.technical?.responsive?.mediaQueries === 0) {
    recommendations.push(
      "No media queries detected. Your site may not be responsive to different screen sizes.",
    );
  }

  // Add PageSpeed Performance score if available
  if (results?.pageSpeedInsights?.performance) {
    const pageSpeedScore = Math.round(
      results.pageSpeedInsights.performance * 100,
    );
    metrics["PageSpeed Performance"].score = pageSpeedScore;

    if (pageSpeedScore < 50) {
      recommendations.push(
        "Your PageSpeed score is low. Focus on improving page load performance.",
      );
    } else if (pageSpeedScore < 90) {
      recommendations.push(
        "Consider optimizing resources to improve your PageSpeed performance score.",
      );
    }
  }

  // Calculate weighted score
  let finalScore = 0;
  let totalWeight = 0;

  Object.values(metrics).forEach((metric) => {
    finalScore += metric.score * metric.weight;
    totalWeight += metric.weight;
  });

  finalScore = Math.round(finalScore / totalWeight);

  // Ensure we have at least one recommendation
  if (recommendations.length === 0) {
    if (finalScore >= 90) {
      recommendations.push(
        "Excellent UI/UX! Consider user testing to identify any remaining pain points.",
      );
    } else if (finalScore >= 70) {
      recommendations.push(
        "Good UI/UX overall. Review the metrics for specific areas to improve.",
      );
    } else {
      recommendations.push(
        "Consider a UI/UX review to identify and address usability issues.",
      );
    }
  }

  return {
    score: finalScore,
    metrics,
    recommendations: recommendations.slice(0, 5), // Limit to top 5 recommendations
  };
};

export default AnalysisResults;
