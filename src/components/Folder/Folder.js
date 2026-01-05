import { useState, useEffect } from "react";
import "./Folder.css";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder = ({
  color = "#5227FF",
  size = 1,
  items = [],
  className = "",
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";

  // Handle animation state to fix pixelation
  useEffect(() => {
    if (activeCard !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 350); // wait for transition to finish
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
       const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeCard]);

  const handleFolderClick = () => {
    if (activeCard !== null) return; // Prevent closing folder if a card is active
    
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      setActiveCard(null);
    }
  };

  const handleCardClick = (e, index) => {
    e.stopPropagation();
    if (!open) {
      setOpen(true);
      return;
    }

    if (activeCard === index) {
      setActiveCard(null); // Close active card
    } else {
      setActiveCard(index); // Open clicked card
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open || activeCard !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  };

  const folderClassName = `folder ${open ? "open" : ""} ${activeCard !== null ? "has-active-card" : ""}`.trim();
  const scaleStyle = { transform: `scale(${size})`, backfaceVisibility: 'hidden' };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onClick={handleFolderClick}
      >
        <div className="folder__back">
          {papers.map((item, i) => {
             const isActive = activeCard === i;
             return (
              <div
                key={i}
                className={`paper paper-${i + 1} ${isActive ? 'active-card' : ''}`}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                onClick={(e) => handleCardClick(e, i)}
                style={
                  open
                    ? {
                        "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
                        "--magnet-y": `${paperOffsets[i]?.y || 0}px`,
                        transform: isActive 
                          ? `translate(-50%, -150%) scale(1.1) rotate(0deg)` 
                          : undefined,
                        zIndex: isActive ? 100 : undefined,
                        cursor: 'pointer',
                        backfaceVisibility: 'hidden',
                        willChange: isActive && isAnimating ? 'transform' : 'auto', // Optimize only during animation
                        filter: !isAnimating && isActive ? 'blur(0px)' : undefined // Hack to force repaint?
                      }
                    : {}
                }
              >
                {/* Content */}
                {item && (
                  <div className="w-full h-full p-2 relative antialiased leading-none">
                    {/* Title (Always visible, Top Left) */}
                     <h4 className={`absolute top-1 left-2 text-[3px] md:text-[6px] font-bold text-white leading-tight transition-all duration-300 ${isActive ? 'text-[6px] md:text-[10px] top-2' : ''} text-left subpixel-antialiased`}>
                      {item.title || "Untitled"}
                    </h4>

                    {/* Content (Visible only when active) */}
                    <div className={`w-full h-full flex flex-col items-center justify-center pt-6 transition-opacity duration-300 ${isActive ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                       <p className={`text-[3px] md:text-[6px] text-white mb-1 leading-tight text-center px-1 subpixel-antialiased ${!isAnimating && isActive ? 'scale-[1.0001]' : ''}`}>{item.description}</p>
                       <div className={`w-full h-[2px] rounded-full mt-1 ${item.color || 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
