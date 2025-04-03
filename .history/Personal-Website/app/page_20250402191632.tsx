'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { GlowingCardsGrid } from '@/components/ui/GlowingCards'

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Text state management
  const [showOptions, setShowOptions] = useState(false)
  
  // Animation values
  const y = useMotionValue(0)
  const scale = useTransform(scrollY, [0, windowHeight * 0.3], [1, 0.8])
  const opacity = useTransform(scrollY, [0, windowHeight * 0.6], [1, 0])
  
  useEffect(() => {
    // Add class to body to hide footer
    document.body.classList.add('hide-footer')
    
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      // Show options after a delay
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 500);
      
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer)
        // Remove class when component unmounts
        document.body.classList.remove('hide-footer')
      }
    }
  }, [])
  
  return (
    <main 
      ref={containerRef} 
      className="min-h-screen relative bg-gray-950 overflow-hidden"
    >
      {/* Initial hero section */}
      <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden py-24">
        <motion.div
          style={{ 
            y: y,
            perspective: 1000,
          }}
          className="flex flex-col items-center justify-center relative z-10 w-full px-4"
        >
          {/* Options that appear after animation */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                className="w-full flex items-center justify-center"
              >
                <div className="max-w-7xl w-full">
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">
                      Viewing<br />Experience
                    </h2>
                  </motion.div>
                  
                  {/* Replace grid with GlowingCardsGrid */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <GlowingCardsGrid />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]" />
      </div>
      
      {/* Background mesh gradient */}
      <div className="fixed inset-0 bg-gray-950 bg-opacity-60 z-[-1]" />
    </main>
  )
}
