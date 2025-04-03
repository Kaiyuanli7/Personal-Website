'use client'

import { motion } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import { useEffect, useState } from 'react'

interface PageIndicatorProps {
  currentSection: number
  totalSections: number
}

export function PageIndicator({ currentSection, totalSections }: PageIndicatorProps) {
  const { lenis } = useLenisScroll()
  const [isVisible, setIsVisible] = useState(true)

  const scrollToSection = (index: number) => {
    if (!lenis) return
    
    const sectionHeight = window.innerHeight
    const targetPosition = sectionHeight * index
    
    lenis.scrollTo(targetPosition, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
  }

  // Hide indicator when scrolling
  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      setIsVisible(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsVisible(true), 1000)
    }

    let timeout: NodeJS.Timeout
    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [lenis])

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full bg-white/20 relative cursor-pointer"
            onClick={() => scrollToSection(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
              initial={false}
              animate={{
                scale: currentSection === index ? 1 : 0,
                opacity: currentSection === index ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
} 