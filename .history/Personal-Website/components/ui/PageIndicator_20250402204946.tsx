'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import { RefObject } from 'react'

interface PageIndicatorProps {
  sections: {
    ref: RefObject<HTMLElement>;
    progress: MotionValue<number>;
    label: string;
  }[];
  overallProgress: MotionValue<number>; // To control overall visibility
}

export default function PageIndicator({ sections, overallProgress }: PageIndicatorProps) {
  const { lenis } = useLenisScroll()

  const handleClick = (ref: RefObject<HTMLElement>) => {
    if (lenis && ref.current) {
      lenis.scrollTo(ref.current, { offset: -100, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  }

  // Determine active section based on which progress is closest to 0.5 (middle of the viewport)
  // This logic might need refinement based on actual scroll behavior and section lengths
  const activeIndex = sections.findIndex((section, index) => {
    const currentProg = section.progress.get()
    const nextProg = sections[index + 1]?.progress.get() ?? 1.1 // Default next progress to > 1
    
    // A simple logic: if current section is past start and next section hasn't started yet
    // Adjust thresholds as needed (e.g., 0.1 to 0.9)
    return currentProg > 0.1 && currentProg < 0.9 && nextProg < 0.1;
  });
  
  // Fallback if no section strictly matches, check which section is most "active" (closest to middle)
  let mostActiveIndex = 0;
  if (activeIndex === -1) {
     let minDiff = 1;
     sections.forEach((section, index) => {
       const diff = Math.abs(section.progress.get() - 0.5);
       if (diff < minDiff) {
         minDiff = diff;
         mostActiveIndex = index;
       }
     });
  } else {
      mostActiveIndex = activeIndex;
  }


  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 bg-black/30 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg"
      style={{
        opacity: useTransform(overallProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]), // Fade in/out at start/end
        y: useTransform(overallProgress, [0, 0.05], [20, 0]) // Slide up animation
      }}
      initial={{ opacity: 0, y: 20 }}
    >
      {sections.map((section, index) => (
        <button
          key={section.label}
          onClick={() => handleClick(section.ref)}
          className="relative group flex items-center"
          aria-label={`Scroll to ${section.label}`}
        >
          <motion.div
            className="w-3 h-3 rounded-full transition-colors duration-300"
            animate={{ 
              backgroundColor: mostActiveIndex === index ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
              scale: mostActiveIndex === index ? 1.2 : 1
            }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
          />
          <span 
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
          >
            {section.label}
          </span>
        </button>
      ))}
    </motion.div>
  )
} 