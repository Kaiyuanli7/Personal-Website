'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      // Show options after a delay
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 500); // Show options after 0.5 seconds
      
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer)
      }
    }
  }, [])
  
  return (
    <main 
      ref={containerRef} 
      className="h-screen relative bg-gray-950 overflow-hidden"
    >
      {/* Initial hero section */}
      <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ 
            y: y,
            perspective: 1000,
          }}
          className="flex flex-col items-center justify-center relative z-10"
        >
          {/* Options that appear after animation */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                className="w-full flex items-center justify-center px-4"
              >
                <div className="max-w-7xl w-full">
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <h2 className="text-6xl md:text-8xl font-bold text-white mb-6">
                      Choose<br />Your<br />Experience
                    </h2>
                    <p className="text-xl text-gray-300 mt-8">
                      Select how you'd like to explore my portfolio
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {/* Professional Version */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="group perspective-1000"
                    >
                      <Link href="/professional" className="block transform-gpu">
                        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 border border-white/10 group-hover:border-white/20 transform group-hover:-rotate-y-5 group-hover:translate-z-10">
                          <h2 className="text-4xl font-bold text-white mb-4">Professional</h2>
                          <p className="text-gray-300 mb-6">
                            A clean, traditional portfolio showcasing my experience, skills, and achievements in a formal manner.
                          </p>
                          <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                            <span>View Professional Portfolio</span>
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Casual Version */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      whileHover={{ scale: 1.05, rotateY: -5 }}
                      className="group perspective-1000"
                    >
                      <Link href="/casual" className="block transform-gpu">
                        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 border border-white/10 group-hover:border-white/20 transform group-hover:rotate-y-5 group-hover:translate-z-10">
                          <h2 className="text-4xl font-bold text-white mb-4">Casual</h2>
                          <p className="text-gray-300 mb-6">
                            An experimental, interactive experience with modern animations and creative design elements.
                          </p>
                          <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                            <span>View Casual Portfolio</span>
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
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
