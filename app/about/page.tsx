'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'
import AboutNavigation from '@/app/AboutNavigation'
import dynamic from 'next/dynamic'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null
})

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentSectionRef = useRef<HTMLDivElement>(null)
  
  // Create state for section elements instead of directly using refs
  const [introBannerElement, setIntroBannerElement] = useState<HTMLElement | null>(null)
  const [aboutMeElement, setAboutMeElement] = useState<HTMLElement | null>(null)
  const [whatIDoElement, setWhatIDoElement] = useState<HTMLElement | null>(null)
  const [capabilitiesElement, setCapabilitiesElement] = useState<HTMLElement | null>(null)
  
  // State to track active section
  const [activeSection, setActiveSection] = useState<string | null>('intro-section')
  
  // Setup scroll progress for each section
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
  
  // Function to find and set section elements
  const findSectionElements = useCallback(() => {
    if (!contentSectionRef.current) return
    
    const introSection = document.getElementById('intro-section')
    const aboutMeSection = document.getElementById('about-me-section')
    const whatIDoSection = document.getElementById('what-i-do-section')
    const capabilitiesSection = document.getElementById('capabilities-section')
    
    if (introSection) setIntroBannerElement(introSection)
    if (aboutMeSection) setAboutMeElement(aboutMeSection)
    if (whatIDoSection) setWhatIDoElement(whatIDoSection)
    if (capabilitiesSection) setCapabilitiesElement(capabilitiesSection)
  }, [])
  
  // This effect sets up intersection observers to track which section is currently in view
  useEffect(() => {
    // Wait for the ContentSection to render, then find the section elements
    const timer = setTimeout(() => {
      findSectionElements()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [findSectionElements])

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
      <div className="relative z-10" ref={contentSectionRef}>
        <ContentSection 
          skipRenderNavigation={true}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </motion.div>
  )
} 
