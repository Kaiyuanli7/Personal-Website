'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, User, Briefcase, Code } from "lucide-react"
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import { usePathname } from 'next/navigation'

// Section navigation data
const sectionNavItems = [
  { id: 'intro-section', label: 'Intro', icon: <Box className="h-4 w-4" /> },
  { id: 'about-me-section', label: 'About', icon: <User className="h-4 w-4" /> },
  { id: 'what-i-do-section', label: 'Work', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'capabilities-section', label: 'Skills', icon: <Code className="h-4 w-4" /> }
]

interface AboutNavigationProps {
  activeSection: string | null;
  setActiveSection: (section: string) => void;
  introBannerProgress: any;
  aboutMeProgress: any;
  whatIDoProgress: any;
  capabilitiesProgress: any;
}

export default function AboutNavigation({
  activeSection,
  setActiveSection,
  introBannerProgress,
  aboutMeProgress,
  whatIDoProgress,
  capabilitiesProgress
}: AboutNavigationProps) {
  const { lenis } = useLenisScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  
  // Track if we're in a programmatic jump between sections
  const [isProgrammaticJump, setIsProgrammaticJump] = useState(false);
  const lastJumpTime = useRef(0);

  // For debugging
  useEffect(() => {
    console.log("Current active section:", activeSection);
  }, [activeSection]);

  // Check if we're on the about page and make navigation visible immediately
  useEffect(() => {
    // Always visible on about page
    if (pathname === '/about') {
      setIsVisible(true);
    }
  }, [pathname]);

  // Function to handle navigation click - wrapped in useCallback to prevent recreating on each render
  const handleNavClick = useCallback((sectionId: string, event: React.MouseEvent) => {
    // Prevent default browser behavior
    event.preventDefault();
    event.stopPropagation();
    
    console.log(`Navigation clicked for section: ${sectionId}`);
    
    if (isScrolling) return;
    
    // Set active section first
    setActiveSection(sectionId);
    setIsScrolling(true);
    setIsProgrammaticJump(true);
    lastJumpTime.current = Date.now();
    
    // Small delay before scrolling to allow the navigation UI to update first
    setTimeout(() => {
      // Use requestAnimationFrame to avoid layout thrashing
      requestAnimationFrame(() => {
        const targetElement = document.getElementById(sectionId);
        console.log(`Target element found:`, !!targetElement);
        
        if (targetElement) {
          // Calculate offset based on section
          let offset = 0; // Default offset
          
          // Specific offsets for each section
          if (sectionId === 'intro-section') {
            offset = 0;
          } else if (sectionId === 'about-me-section') {
            offset = 0;
          } else if (sectionId === 'what-i-do-section') {
            offset = 0;
          } else if (sectionId === 'capabilities-section') {
            offset = 0;
          }
          
          console.log(`Scrolling to section with offset: ${offset}`);
          
          // Use lenis for smoother scrolling if available
          if (lenis) {
            lenis.scrollTo(targetElement, { 
              offset: offset,
              duration: 1.0,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            // Fallback to standard scrollIntoView with manual offset handling
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
          
          // Add a cooldown period to prevent rapid consecutive snaps
          setTimeout(() => {
            setIsScrolling(false);
            // Keep isProgrammaticJump true for a bit longer to allow animations to settle
            setTimeout(() => {
              setIsProgrammaticJump(false);
            }, 400);
            console.log("Navigation scrolling completed");
          }, 1000);
        } else {
          // If target not found, release the scrolling lock
          setIsScrolling(false);
          setIsProgrammaticJump(false);
          console.log("Target element not found!");
        }
      });
    }, 50);
  }, [isScrolling, lenis, setActiveSection]);

  // Add manual scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      // Don't process during programmatic scrolling
      if (isScrolling || isProgrammaticJump) return;
      
      // Don't process if we recently did a programmatic jump
      if (Date.now() - lastJumpTime.current < 1500) return;
      
      // Use RAF for smoother performance
      requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        // Get all sections
        const sections = [
          document.getElementById('intro-section'),
          document.getElementById('about-me-section'), 
          document.getElementById('what-i-do-section'),
          document.getElementById('capabilities-section')
        ].filter(Boolean) as HTMLElement[];
        
        // Find the section that's most visible in the viewport
        let bestVisibleSection = null;
        let bestVisibility = 0;
        
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          
          if (visibleBottom > visibleTop) {
            const visibleHeight = visibleBottom - visibleTop;
            const percentVisible = visibleHeight / rect.height;
            
            // Give preference to sections near the top of the viewport
            const weightedVisibility = percentVisible * (1 - (visibleTop / viewportHeight) * 0.5);
            
            if (weightedVisibility > bestVisibility) {
              bestVisibility = weightedVisibility;
              bestVisibleSection = section;
            }
          }
        }
        
        if (bestVisibleSection && bestVisibleSection.id !== activeSection) {
          console.log(`Manual scroll detected, changing to section: ${bestVisibleSection.id}`);
          setActiveSection(bestVisibleSection.id);
        }
      });
    };
    
    // Add debounced scroll listener using a more responsive approach
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeSection, isScrolling, isProgrammaticJump, setActiveSection]);

  return (
    <div className={`fixed top-16 md:top-4 left-1/2 -translate-x-1/2 z-50 w-auto mx-auto transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
    }`}>
      <motion.div 
        className="relative rounded-full border border-white/10 p-1 bg-black/40 backdrop-blur-sm shadow-lg will-change-transform"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          backfaceVisibility: 'hidden', // Prevent flickering in some browsers
          transform: 'translateZ(0)' // Force GPU acceleration
        }}
        key="navigation-bar"
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="flex items-center">
          {sectionNavItems.map((item) => (
            <div 
              key={item.id}
              className="relative"
            >
              {activeSection === item.id && (
                <>
                  <motion.div 
                    className="absolute inset-0 bg-white/10 rounded-full"
                    layoutId="activeSection"
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      duration: 0.3
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-3"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isProgrammaticJump ? 0 : 1 }}
                    style={{ 
                      transformOrigin: 'left',
                      scaleX: isProgrammaticJump ? 0 : (
                        activeSection === 'intro-section' 
                          ? introBannerProgress 
                          : activeSection === 'about-me-section' 
                            ? aboutMeProgress 
                            : activeSection === 'what-i-do-section' 
                              ? whatIDoProgress 
                              : activeSection === 'capabilities-section' 
                                ? capabilitiesProgress 
                                : 0
                      )
                    }}
                    transition={{ 
                      type: "tween", 
                      ease: "linear", 
                      duration: isProgrammaticJump ? 0 : 0.1 
                    }}
                  />
                </>
              )}
              <button 
                onClick={(event) => handleNavClick(item.id, event)}
                className={`relative px-3 md:px-6 py-2 md:py-3 transition-all duration-300 rounded-full w-full outline-none focus:outline-none
                  ${activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
                aria-label={`Navigate to ${item.label} section`}
                type="button"
              >
                <div className={`flex items-center space-x-1 md:space-x-2 ${activeSection === item.id ? 'transform scale-105' : 'hover:scale-105'} transition-transform duration-300`}>
                  <span className="transition-transform duration-300">{item.icon}</span>
                  <span className="font-medium text-xs md:text-sm">{item.label}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 