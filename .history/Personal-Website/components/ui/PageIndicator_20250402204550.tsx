'use client'

import { motion } from 'framer-motion'
import { useLenis } from '@/context/ScrollContext'

interface PageIndicatorProps {
  currentSection: number
  totalSections: number
}

export function PageIndicator({ currentSection, totalSections }: PageIndicatorProps) {
  const lenis = useLenis()

  const scrollToSection = (index: number) => {
    const sectionHeight = window.innerHeight
    lenis?.scrollTo(sectionHeight * index, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full bg-white/20 relative"
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
    </div>
  )
} 