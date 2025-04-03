'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'

interface PageIndicatorProps {
  sections: {
    id: string;
    name: string;
  }[];
}

export default function PageIndicator({ sections }: PageIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)
  const { lenis } = useLenisScroll()

  // Update active section based on scroll position
  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const scrollPos = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Get positions of each section
      const positions = sections.map(section => {
        const element = document.getElementById(section.id)
        if (!element) return 0
        return element.offsetTop
      })

      // Determine which section is in view
      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollPos >= positions[i] - viewportHeight / 2) {
          setActiveSection(i)
          break
        }
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener
    lenis.on('scroll', handleScroll)
    
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, sections])

  // Scroll to section when indicator is clicked
  const scrollToSection = (index: number) => {
    const sectionId = sections[index].id
    const element = document.getElementById(sectionId)
    
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          className="group relative flex items-center"
          onClick={() => scrollToSection(index)}
          whileHover="hover"
          animate={activeSection === index ? "active" : "inactive"}
        >
          <motion.div
            className="w-1 h-8 rounded-full backdrop-blur-sm overflow-hidden"
            variants={{
              inactive: { 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                height: "32px"
              },
              active: { 
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                height: "48px"
              },
              hover: { 
                backgroundColor: activeSection === index 
                  ? "rgba(255, 255, 255, 0.8)" 
                  : "rgba(255, 255, 255, 0.4)"
              }
            }}
          />
          
          {/* Label that appears on hover */}
          <motion.div
            className="absolute right-full mr-4 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md whitespace-nowrap"
            variants={{
              inactive: { opacity: 0, x: 10, pointerEvents: "none" },
              hover: { opacity: 1, x: 0, pointerEvents: "auto" },
              active: { opacity: 0, x: 10, pointerEvents: "none" }
            }}
          >
            <span className="text-white text-sm font-medium">{section.name}</span>
          </motion.div>
        </motion.button>
      ))}
    </motion.div>
  )
} 