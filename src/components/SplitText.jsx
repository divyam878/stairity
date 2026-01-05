"use client";

import { useRef, useEffect, useState } from 'react';
// ❌ REMOVED: import { gsap } from 'gsap'; - Assuming global availability
// ❌ REMOVED: import { ScrollTrigger } from 'gsap/ScrollTrigger'; - Assuming global availability
// ❌ REMOVED: import { SplitText as GSAPSplitText } from 'gsap/SplitText'; - Assuming global availability
// ❌ REMOVED: import { useGSAP } from '@gsap/react'; - Assuming global availability

// We MUST assume that gsap, ScrollTrigger, and SplitText are available globally
// and use their global names (e.g., window.gsap, window.ScrollTrigger, window.SplitText)

const SplitText = ({
  text,
  className = '',
  delay = 100, // Stagger delay in milliseconds
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars', // Can be 'chars', 'words', or 'lines'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1, // ScrollTrigger threshold (percentage)
  rootMargin = '-100px', // ScrollTrigger root margin
  textAlign = 'center',
  tag = 'p', // HTML tag to render
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Use global references for the GSAP modules
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const GSAPSplitText = window.SplitText;


  // Wait for fonts to ensure accurate GSAP SplitText measurements
  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      }).catch(() => {
        // Fallback in case document.fonts.ready fails
        setFontsLoaded(true); 
      });
    }
  }, []);

  // ⚠️ Using standard useEffect instead of useGSAP to avoid import error
  useEffect(
    () => {
      // 1. Check for required globals and dependencies
      if (!gsap || !ScrollTrigger || !GSAPSplitText || !ref.current || !text || !fontsLoaded) return;
      
      const el = ref.current;

      // Clean up previous SplitText instance
      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* ignore */
        }
        el._rbsplitInstance = null;
      }

      // 2. Calculate ScrollTrigger 'start' position
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets;
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      // 3. Initialize SplitText and create the animation
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000, // Convert ms to seconds
              scrollTrigger: {
                trigger: el,
                start,
                once: true, 
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
        }
      });
      el._rbsplitInstance = splitInstance;

      // 4. Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* ignore */
        }
        el._rbsplitInstance = null;
      };
    },
    // The dependencies are the same, ensuring re-run on prop change
    [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ]
  );

  const renderTag = () => {
    const style = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
    
    const TagComponent = tag;
    return (
      <TagComponent ref={ref} style={style} className={classes}>
        {text}
      </TagComponent>
    );
  };
  return renderTag();
};

export default SplitText;
