'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
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

export default function ContentPage() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const color = useMotionValue(COLORS[0])

  // For parallax scrolling on the header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values for header parallax
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -100])

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

    // Set up scroll triggers for parallax effects
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: "30%",
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }

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
    <motion.main
      ref={sectionRef}
      style={{
        backgroundImage,
      }}
      className="min-h-screen overflow-hidden bg-gray-950"
    >
      <div className="opacity-50">
        <StarsBackground />
      </div>
      
      {/* Page title with parallax effect */}
      <div className="relative z-10 pt-24 mb-8 h-[40vh] flex items-center justify-center">
        <motion.div
          ref={headerRef}
          style={{ y: headerY }}
          className="container mx-auto px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-display"
          >
            Resume
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-1 bg-white mx-auto"
          />
        </motion.div>
      </div>
      
      {/* Content Section with proper scroll context */}
      <div className="relative z-10">
        <ContentSection />
      </div>
    </motion.main>
  )
} 