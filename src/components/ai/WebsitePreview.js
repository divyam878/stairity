"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

export default function WebsitePreview({ html }) {
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'

  return (
    <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('desktop')}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
            viewMode === 'desktop'
              ? 'bg-black text-white'
              : 'bg-[#F6F6F6] text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Monitor className="w-5 h-5" />
          Desktop
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
            viewMode === 'mobile'
              ? 'bg-black text-white'
              : 'bg-[#F6F6F6] text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Smartphone className="w-5 h-5" />
          Mobile
        </button>
      </div>

      {/* Preview Frame */}
      <div className="bg-[#F6F6F6] rounded-3xl p-4 overflow-hidden">
        <div className={`mx-auto transition-all duration-300 ${
          viewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'
        }`}>
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl" style={{
            height: viewMode === 'mobile' ? '667px' : '600px'
          }}>
            <iframe
              srcDoc={html}
              className="w-full h-full border-0"
              title="Website Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Preview your website above. Download the HTML file to deploy it anywhere!
        </p>
      </div>
    </div>
  );
}
