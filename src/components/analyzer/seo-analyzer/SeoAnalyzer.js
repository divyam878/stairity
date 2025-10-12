// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const SeoAnalyzer = ({ url }) => {
//   const [seoData, setSeoData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // In a real application, this would be an API call to your backend
//   const analyzeSeo = () => {
//     if (!url) return;
    
//     setIsLoading(true);
    
//     // Simulating API call with timeout
//     setTimeout(() => {
//       const mockSeoData = {
//         title: {
//           value: 'Example Website - Home Page',
//           length: 28,
//           optimal: true,
//           recommendation: 'Good title length (between 50-60 characters is ideal)'
//         },
//         metaDescription: {
//           value: 'This is an example meta description for the website that describes the content of the page.',
//           length: 85,
//           optimal: true,
//           recommendation: 'Good meta description length (between 120-158 characters is ideal)'
//         },
//         headings: {
//           h1Count: 1,
//           h2Count: 3,
//           h3Count: 5,
//           optimal: true,
//           recommendation: 'Good heading structure with a single H1 tag'
//         },
//         keywords: {
//           primary: 'example website',
//           secondary: ['web design', 'development', 'services'],
//           density: '2.3%',
//           optimal: true,
//           recommendation: 'Good keyword density (between 1-3% is ideal)'
//         },
//         images: {
//           total: 12,
//           withAlt: 10,
//           withoutAlt: 2,
//           optimal: false,
//           recommendation: '2 images missing alt text. Add descriptive alt text to all images.'
//         },
//         links: {
//           total: 24,
//           internal: 18,
//           external: 6,
//           broken: 1,
//           optimal: false,
//           recommendation: '1 broken link detected. Fix or remove broken links.'
//         },
//         mobileOptimized: {
//           status: true,
//           optimal: true,
//           recommendation: 'Website is mobile-friendly'
//         },
//         pageSpeed: {
//           score: 85,
//           optimal: true,
//           recommendation: 'Good page speed score (above 80 is good)'
//         },
//         ssl: {
//           secure: true,
//           optimal: true,
//           recommendation: 'Website is secure with HTTPS'
//         },
//         socialTags: {
//           hasFacebook: true,
//           hasTwitter: true,
//           optimal: true,
//           recommendation: 'Social meta tags are properly implemented'
//         },
//         structuredData: {
//           present: false,
//           optimal: false,
//           recommendation: 'No structured data found. Add schema markup for better search results.'
//         }
//       };
      
//       setSeoData(mockSeoData);
//       setIsLoading(false);
//     }, 2000);
//   };
  
//   // Trigger analysis when URL changes
//   useState(() => {
//     if (url) {
//       analyzeSeo();
//     }
//   }, [url]);

//   return (
//     <div className="w-full bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">SEO Analyzer</h2>
      
//       {isLoading && (
//         <div className="flex flex-col items-center justify-center py-12">
//           <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
//           <p className="mt-4 text-gray-600">Analyzing SEO factors...</p>
//         </div>
//       )}
      
//       {!isLoading && !seoData && (
//         <div className="text-center py-12 text-gray-500">
//           {url ? 'Click Analyze to check SEO factors' : 'Enter a URL to analyze SEO factors'}
//         </div>
//       )}
      
//       {!isLoading && seoData && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-6"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <SeoScoreCard 
//               title="Page Title" 
//               value={seoData.title.value}
//               details={`Length: ${seoData.title.length} characters`}
//               status={seoData.title.optimal ? 'good' : 'warning'}
//               recommendation={seoData.title.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Meta Description" 
//               value={seoData.metaDescription.value}
//               details={`Length: ${seoData.metaDescription.length} characters`}
//               status={seoData.metaDescription.optimal ? 'good' : 'warning'}
//               recommendation={seoData.metaDescription.recommendation}
//             />
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <SeoScoreCard 
//               title="Heading Structure" 
//               value={`H1: ${seoData.headings.h1Count}, H2: ${seoData.headings.h2Count}, H3: ${seoData.headings.h3Count}`}
//               status={seoData.headings.optimal ? 'good' : 'warning'}
//               recommendation={seoData.headings.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Keyword Usage" 
//               value={`Primary: ${seoData.keywords.primary}`}
//               details={`Density: ${seoData.keywords.density}`}
//               status={seoData.keywords.optimal ? 'good' : 'warning'}
//               recommendation={seoData.keywords.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Images" 
//               value={`${seoData.images.withAlt}/${seoData.images.total} with alt text`}
//               status={seoData.images.optimal ? 'good' : 'warning'}
//               recommendation={seoData.images.recommendation}
//             />
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <SeoScoreCard 
//               title="Links" 
//               value={`${seoData.links.total} total (${seoData.links.internal} internal, ${seoData.links.external} external)`}
//               details={`${seoData.links.broken} broken links`}
//               status={seoData.links.optimal ? 'good' : 'error'}
//               recommendation={seoData.links.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Mobile Optimization" 
//               value={seoData.mobileOptimized.status ? 'Mobile-friendly' : 'Not mobile-friendly'}
//               status={seoData.mobileOptimized.optimal ? 'good' : 'error'}
//               recommendation={seoData.mobileOptimized.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Page Speed" 
//               value={`Score: ${seoData.pageSpeed.score}/100`}
//               status={seoData.pageSpeed.optimal ? 'good' : 'warning'}
//               recommendation={seoData.pageSpeed.recommendation}
//             />
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <SeoScoreCard 
//               title="Security" 
//               value={seoData.ssl.secure ? 'HTTPS Enabled' : 'HTTPS Not Enabled'}
//               status={seoData.ssl.optimal ? 'good' : 'error'}
//               recommendation={seoData.ssl.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Social Meta Tags" 
//               value={seoData.socialTags.hasFacebook && seoData.socialTags.hasTwitter ? 'Implemented' : 'Missing'}
//               status={seoData.socialTags.optimal ? 'good' : 'warning'}
//               recommendation={seoData.socialTags.recommendation}
//             />
            
//             <SeoScoreCard 
//               title="Structured Data" 
//               value={seoData.structuredData.present ? 'Implemented' : 'Not implemented'}
//               status={seoData.structuredData.optimal ? 'good' : 'warning'}
//               recommendation={seoData.structuredData.recommendation}
//             />
//           </div>
          
//           <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h3 className="text-lg font-semibold text-blue-800 mb-2">SEO Improvement Tips</h3>
//             <ul className="space-y-2">
//               <li className="flex items-start text-blue-700">
//                 <span className="text-blue-500 mr-2">•</span>
//                 Ensure all images have descriptive alt text
//               </li>
//               <li className="flex items-start text-blue-700">
//                 <span className="text-blue-500 mr-2">•</span>
//                 Fix any broken links
//               </li>
//               <li className="flex items-start text-blue-700">
//                 <span className="text-blue-500 mr-2">•</span>
//                 Add schema markup for better search results
//               </li>
//               <li className="flex items-start text-blue-700">
//                 <span className="text-blue-500 mr-2">•</span>
//                 Optimize page loading speed
//               </li>
//               <li className="flex items-start text-blue-700">
//                 <span className="text-blue-500 mr-2">•</span>
//                 Create high-quality, relevant content regularly
//               </li>
//             </ul>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// const SeoScoreCard = ({ title, value, details, status, recommendation }) => {
//   const statusColors = {
//     good: 'bg-green-50 border-green-200 text-green-800',
//     warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
//     error: 'bg-red-50 border-red-200 text-red-800'
//   };
  
//   const statusIcons = {
//     good: (
//       <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//       </svg>
//     ),
//     warning: (
//       <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//       </svg>
//     ),
//     error: (
//       <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//       </svg>
//     )
//   };

//   return (
//     <div className={`rounded-lg border p-4 ${statusColors[status]}`}>
//       <div className="flex justify-between items-start mb-2">
//         <h3 className="font-semibold">{title}</h3>
//         {statusIcons[status]}
//       </div>
//       <p className="text-sm font-medium mb-1 truncate" title={value}>{value}</p>
//       {details && <p className="text-xs mb-2">{details}</p>}
//       <p className="text-xs mt-2 italic">{recommendation}</p>
//     </div>
//   );
// };

// export default SeoAnalyzer;