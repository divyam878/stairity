// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const ResponsiveChecker = ({ url }) => {
//   const [activeDevice, setActiveDevice] = useState('desktop');
  
//   const devices = [
//     { id: 'mobile', name: 'Mobile', width: 375, height: 667 },
//     { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
//     { id: 'desktop', name: 'Desktop', width: 1440, height: 900 }
//   ];

//   return (
//     <div className="w-full bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Responsive Design Checker</h2>
      
//       <div className="flex space-x-4 mb-6">
//         {devices.map(device => (
//           <button
//             key={device.id}
//             onClick={() => setActiveDevice(device.id)}
//             className={`px-4 py-2 rounded-md transition-colors ${activeDevice === device.id 
//               ? 'bg-gray-800 text-white' 
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//           >
//             {device.name}
//           </button>
//         ))}
//       </div>
      
//       <div className="relative overflow-hidden bg-gray-100 rounded-lg border border-gray-300">
//         {devices.map(device => {
//           const isActive = activeDevice === device.id;
//           const scale = isActive ? 1 : 0;
          
//           return (
//             <motion.div
//               key={device.id}
//               animate={{ scale: scale, opacity: isActive ? 1 : 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute inset-0 flex items-center justify-center"
//               style={{ display: isActive ? 'flex' : 'none' }}
//             >
//               <div 
//                 className={`bg-white border-2 border-gray-400 rounded-md overflow-hidden shadow-lg ${device.id === 'mobile' ? 'w-[375px] h-[667px]' : device.id === 'tablet' ? 'w-[768px] h-[1024px] max-h-[80vh]' : 'w-full max-w-[1440px] h-[900px] max-h-[80vh]'}`}
//                 style={{ 
//                   transform: device.id === 'desktop' ? 'scale(0.5)' : device.id === 'tablet' ? 'scale(0.4)' : 'scale(0.7)',
//                   transformOrigin: 'top center'
//                 }}
//               >
//                 {url ? (
//                   <iframe 
//                     src={url} 
//                     title={`${device.name} preview`}
//                     className="w-full h-full border-0"
//                     sandbox="allow-same-origin allow-scripts"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
//                     <p>Enter a URL to preview</p>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
      
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">Responsive Design Tips</h3>
//         <ul className="space-y-2 text-gray-700">
//           <li className="flex items-start">
//             <span className="text-green-500 mr-2">✓</span>
//             Use flexible grid layouts and relative units (%, em, rem)
//           </li>
//           <li className="flex items-start">
//             <span className="text-green-500 mr-2">✓</span>
//             Implement media queries for different screen sizes
//           </li>
//           <li className="flex items-start">
//             <span className="text-green-500 mr-2">✓</span>
//             Test on real devices when possible
//           </li>
//           <li className="flex items-start">
//             <span className="text-green-500 mr-2">✓</span>
//             Ensure touch targets are at least 44x44 pixels on mobile
//           </li>
//           <li className="flex items-start">
//             <span className="text-green-500 mr-2">✓</span>
//             Optimize images for different screen resolutions
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ResponsiveChecker;