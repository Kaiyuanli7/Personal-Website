'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'
import AboutNavigation from '@/app/AboutNavigation'
import dynamic from 'next/dynamic'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null
})

// Declare the window property
declare global {
  interface Window {
    aboutNavSectionState?: {
      active: string | null;
      update: (section: string) => void;
    };
  }
}

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Create state for section elements
  const [introBannerElement, setIntroBannerElement] = useState<HTMLElement | null>(null)
  const [aboutMeElement, setAboutMeElement] = useState<HTMLElement | null>(null)
  const [whatIDoElement, setWhatIDoElement] = useState<HTMLElement | null>(null)
  const [capabilitiesElement, setCapabilitiesElement] = useState<HTMLElement | null>(null)
  
  // State to track active section
  const [activeSection, setActiveSection] = useState<string | null>('intro-section')
  
  // Set up scroll progress trackers for each section using state variables
  const { scrollYProgress: introBannerProgress } = useScroll({
    target: introBannerElement ? { current: introBannerElement } : undefined,
    offset: ["start end", "end start"]
  })
  
  const { scrollYProgress: aboutMeProgress } = useScroll({
    target: aboutMeElement ? { current: aboutMeElement } : undefined,
    offset: ["start end", "end start"]
  })
  
  const { scrollYProgress: whatIDoProgress } = useScroll({
    target: whatIDoElement ? { current: whatIDoElement } : undefined,
    offset: ["start end", "end start"]
  })
  
  const { scrollYProgress: capabilitiesProgress } = useScroll({
    target: capabilitiesElement ? { current: capabilitiesElement } : undefined,
    offset: ["start end", "end start"]
  })
  
  // Initialize the section elements and scroll to top on first load
  useEffect(() => {
    // Store these elements in state once the page is loaded
    const findElements = () => {
      const introSection = document.getElementById('intro-section')
      const aboutMeSection = document.getElementById('about-me-section')
      const whatIDoSection = document.getElementById('what-i-do-section')
      const capabilitiesSection = document.getElementById('capabilities-section')
      
      if (introSection) setIntroBannerElement(introSection)
      if (aboutMeSection) setAboutMeElement(aboutMeSection)
      if (whatIDoSection) setWhatIDoElement(whatIDoSection)
      if (capabilitiesSection) setCapabilitiesElement(capabilitiesSection)
    }
    
    // Try to find elements immediately
    findElements()
    
    // Ensure we're at the top of the page
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    
    // Also try after a short delay to ensure content is rendered
    const timer = setTimeout(findElements, 500)
    
    return () => clearTimeout(timer)
  }, [lenis])
  
  // Ensure lenis is properly initialized
  useEffect(() => {
    // Add a window object to track our section switching
    window.aboutNavSectionState = {
      active: activeSection,
      update: setActiveSection
    };
    
    return () => {
      // Cleanup window object
      delete window.aboutNavSectionState;
    }
  }, [activeSection]);

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen bg-gray-950 relative"
    >
      <div className="absolute inset-0 z-0">
        <StarsBackground />
      </div>
      
      {/* AboutNavigation positioned independently of ContentSection */}
      <AboutNavigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        introBannerProgress={introBannerProgress}
        aboutMeProgress={aboutMeProgress}
        whatIDoProgress={whatIDoProgress}
        capabilitiesProgress={capabilitiesProgress}
      />
      
      {/* ContentSection with refs */}
      <div className="relative z-10">
        <ContentSection 
          skipRenderNavigation={true}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </motion.div>
  )
} 
