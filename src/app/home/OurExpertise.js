import Underline from "../../components/Underline";
export default function OurExpertise() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-12 px-4">
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Corner squares */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-gray-200 z-10 bg-white"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gray-200 z-10 bg-white"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-gray-200 z-10 bg-white"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-gray-200 z-10 bg-white"></div>
        
        {/* Dotted pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
            maskImage: 'linear-gradient(to bottom, black, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, black)'
          }}
        />
        
        <div 
          className="relative z-10 p-8" 
          style={{
            border: '1px dashed rgba(0,0,0,0.1)',
            background: 'white'
          }}
        >
          {/* Section Label */}
          <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
            OUR EXPERTISE
          </div>
          
          {/* Main Heading with Underline */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-light leading-tight text-gray-500 relative ">
            Elevate Your Brand with Our <br />
            </h1>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-medium font-hello leading-tight text-black relative mb-12">
            Comprehensive Design & Development <br />
            <span className="relative inline-block font-hello">
                Services
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  style={{ width: "100%" }}
                >
                  <Underline color="#5FD6C1" width="100%" thickness="4" />
                </div>
              </span>

          </h1>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="relative border border-gray-200 p-8 flex items-center min-h-[180px] bg-white">
              {/* Corner squares */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              
              {/* Dotted background */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)'
              }}></div>
              
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 mr-6">
                <div className="w-12 h-12 rounded-full bg-[#8C7AE6] flex items-center justify-center">
                  {/* Pen SVG */}
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M18 4l6 6-14 14H4v-6L18 4z" />
                    <path d="M16 6l6 6" />
                  </svg>
                </div>
              </div>
              {/* Text */}
              <div className="relative z-10">
                <div className="text-lg font-medium text-gray-900">Branding &<br />UI/UX</div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="relative border border-gray-200 p-8 flex items-center min-h-[180px] bg-white">
              {/* Corner squares */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)'
              }}></div>
              
              <div className="relative z-10 flex-shrink-0 mr-6">
                <div className="w-12 h-12 rounded-full bg-[#8C7AE6] flex items-center justify-center">
                  {/* Marketing SVG */}
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect x="4" y="8" width="20" height="12" rx="2" />
                    <path d="M8 8V6a4 4 0 018 0v2" />
                    <path d="M12 14h4" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-lg font-medium text-gray-900">SEO &<br />Digital Marketing</div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="relative border border-gray-200 p-8 flex items-center min-h-[180px] bg-white">
              {/* Corner squares */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)'
              }}></div>
              
              <div className="relative z-10 flex-shrink-0 mr-6">
                <div className="w-12 h-12 rounded-full bg-[#8C7AE6] flex items-center justify-center">
                  {/* Code SVG */}
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M10 12l-4 4 4 4" />
                    <path d="M18 12l4 4-4 4" />
                    <path d="M14 4v16" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-lg font-medium text-gray-900">Web Design &<br />Development</div>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="relative border border-gray-200 p-8 flex items-center min-h-[180px] bg-white">
              {/* Corner squares */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border border-gray-300 z-10 bg-white"></div>
              
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)'
              }}></div>
              
              <div className="relative z-10 flex-shrink-0 mr-6">
                <div className="w-12 h-12 rounded-full bg-[#8C7AE6] flex items-center justify-center">
                  {/* Laptop SVG */}
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect x="4" y="6" width="20" height="12" rx="2" />
                    <path d="M2 20h24" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-lg font-medium text-gray-900">E-commerce &<br />Landing Pages</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  