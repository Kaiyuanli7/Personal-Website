'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'
import ContentSection from '@/components/sections/ContentSection'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const color = useMotionValue(COLORS[0])

  useEffect(() => {
    if (!sectionRef.current || !heroRef.current || !contentRef.current) return

    // Initially hide the section
    gsap.set(sectionRef.current, {
      opacity: 0,
      y: 50,
    })

    // Show the section when page loads
    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Animate the aurora color
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [lenis, color])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  return (
    <>
      <motion.div
        ref={sectionRef}
        style={{
          backgroundImage,
        }}
        className="min-h-screen bg-gray-950"
      >
        <div className="opacity-50">
          <StarsBackground />
        </div>
        
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className="relative min-h-screen overflow-hidden flex items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center">
            {/* Title with animated reveal */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mb-4"
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative inline-block"
                >
                  <motion.span
                    className="text-7xl md:text-9xl font-bold text-white font-display"
                    style={{ 
                      textShadow: boxShadow 
                    }}
                  >
                    About
                  </motion.span>
                </motion.div>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative inline-block ml-6"
                >
                  <motion.span 
                    className="text-7xl md:text-9xl font-bold font-display"
                    style={{ 
                      color,
                      textShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)" 
                    }}
                  >
                    Me
                  </motion.span>
                </motion.div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl text-white/70 max-w-xl mx-auto mt-8 px-6"
              >
                Exploring the intersection of technology, business, and creativity
              </motion.p>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="w-24 h-1 mx-auto mt-8"
                style={{ backgroundColor: color }}
              />
            </div>
            
            {/* Scroll hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
            >
              <motion.p 
                className="text-white/50 text-sm"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                Scroll down to learn more about me
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Content Section */}
        <div ref={contentRef}>
          <ContentSection />
        </div>
      </motion.div>
    </>
  )
} 
