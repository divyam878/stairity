// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const WebsiteAnalyzer = () => {
//   const [url, setUrl] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!url) {
//       setError("Please enter a website URL");
//       return;
//     }

//     // URL validation
//     try {
//       new URL(url);
//     } catch (err) {
//       setError("Please enter a valid URL (e.g., https://example.com)");
//       return;
//     }

//     setIsAnalyzing(true);
//     setError("");

//     // In a real application, you would call your backend API here
//     // For demo purposes, we'll simulate a response after a delay
//     try {
//       // Simulated API call
//       setTimeout(() => {
//         const mockResults = {
//           performance: {
//             score: 85,
//             loadTime: "1.2s",
//             issues: [
//               "Optimize images",
//               "Minify JavaScript",
//               "Reduce server response time",
//             ],
//           },
//           seo: {
//             score: 92,
//             issues: [
//               "Missing meta description on 2 pages",
//               "Improve heading structure",
//             ],
//           },
//           accessibility: {
//             score: 78,
//             issues: [
//               "Low contrast text",
//               "Missing alt attributes",
//               "Keyboard navigation issues",
//             ],
//           },
//           security: {
//             score: 88,
//             issues: [
//               "Update SSL configuration",
//               "Add Content-Security-Policy header",
//             ],
//           },
//           contentQuality: {
//             score: 90,
//             issues: ["Improve readability on 3 pages", "Fix spelling errors"],
//           },
//           responsiveness: {
//             mobile: 95,
//             tablet: 98,
//             desktop: 100,
//             issues: [
//               "Improve touch targets on mobile",
//               "Fix overflow issues on small screens",
//             ],
//           },
//         };

//         setResults(mockResults);
//         setIsAnalyzing(false);
//       }, 3000);
//     } catch (err) {
//       setError("An error occurred during analysis. Please try again.");
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
//       <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//         Website Analyzer
//       </h2>

//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-grow relative">
//             <input
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="Enter Website URL"
//               className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </div>
//           <button
//             type="submit"
//             disabled={isAnalyzing}
//             className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {isAnalyzing ? "Analyzing..." : "Analyze"}
//           </button>
//         </div>
//       </form>

//       {isAnalyzing && (
//         <div className="flex flex-col items-center justify-center py-12">
//           <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">
//             Analyzing website performance, SEO, accessibility, and more...
//           </p>
//         </div>
//       )}

//       {results && !isAnalyzing && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-8"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <ScoreCard
//               title="Performance"
//               score={results.performance.score}
//               color="blue"
//             />
//             <ScoreCard title="SEO" score={results.seo.score} color="green" />
//             <ScoreCard
//               title="Accessibility"
//               score={results.accessibility.score}
//               color="yellow"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <ScoreCard
//               title="Security"
//               score={results.security.score}
//               color="red"
//             />
//             <ScoreCard
//               title="Content Quality"
//               score={results.contentQuality.score}
//               color="purple"
//             />
//             <ScoreCard
//               title="Mobile Friendly"
//               score={results.responsiveness.mobile}
//               color="indigo"
//             />
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-4">
//               Improvement Suggestions
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <IssuesList
//                 title="Performance Issues"
//                 issues={results.performance.issues}
//               />
//               <IssuesList title="SEO Issues" issues={results.seo.issues} />
//               <IssuesList
//                 title="Accessibility Issues"
//                 issues={results.accessibility.issues}
//               />
//               <IssuesList
//                 title="Security Issues"
//                 issues={results.security.issues}
//               />
//               <IssuesList
//                 title="Content Issues"
//                 issues={results.contentQuality.issues}
//               />
//               <IssuesList
//                 title="Responsive Design Issues"
//                 issues={results.responsiveness.issues}
//               />
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors">
//               Download Full Report
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// const ScoreCard = ({ title, score, color }) => {
//   const colorClasses = {
//     blue: "text-blue-600 border-blue-200 bg-blue-50",
//     green: "text-green-600 border-green-200 bg-green-50",
//     yellow: "text-yellow-600 border-yellow-200 bg-yellow-50",
//     red: "text-red-600 border-red-200 bg-red-50",
//     purple: "text-purple-600 border-purple-200 bg-purple-50",
//     indigo: "text-indigo-600 border-indigo-200 bg-indigo-50",
//   };

//   return (
//     <div className={`rounded-lg border p-6 text-center ${colorClasses[color]}`}>
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <div className="text-4xl font-bold">{score}/100</div>
//     </div>
//   );
// };

// const IssuesList = ({ title, issues }) => {
//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//       <h4 className="font-semibold mb-2">{title}</h4>
//       <ul className="space-y-1">
//         {issues.map((issue, index) => (
//           <li key={index} className="text-sm text-gray-700 flex items-start">
//             <span className="text-red-500 mr-2">•</span>
//             {issue}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebsiteAnalyzer;
