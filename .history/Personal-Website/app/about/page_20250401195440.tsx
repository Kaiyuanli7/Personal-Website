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
  const sectionRef = useRef<HTMLElement>(null)
  const color = useMotionValue(COLORS[0])

  useEffect(() => {
    if (!sectionRef.current) return

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

  return (
    <>
      <motion.main
        ref={sectionRef}
        style={{
          backgroundImage,
        }}
        className="min-h-screen relative overflow-hidden bg-gray-950"
      >
        <div className="absolute inset-0 z-0 opacity-50">
          <StarsBackground />
        </div>
        
        {/* Title with animated reveal */}
        <div className="relative z-10 pt-24 mb-16">
          <div className="container mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-center text-white font-display"
            >
              About Me
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              className="w-24 h-1 bg-white mx-auto mt-6"
            />
          </div>
        </div>
      </motion.main>
      
      {/* Content Section with Resume - connected seamlessly to the space background */}
      <div className="relative">
        <ContentSection />
      </div>
    </>
  )
} 
