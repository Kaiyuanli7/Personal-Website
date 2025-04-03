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
  const heroRef = useRef<HTMLDivElement>(null)
  const color = useMotionValue(COLORS[0])

  useEffect(() => {
    if (!sectionRef.current || !heroRef.current) return

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

    // Hero section parallax effect
    gsap.to(heroRef.current.querySelector('.hero-content'), {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
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
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  return (
    <>
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
        
        {/* Hero Section with Parallax */}
        <div 
          ref={heroRef}
          className="relative h-screen overflow-hidden"
        >
          <div className="hero-content absolute inset-0 flex flex-col justify-center items-center">
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
            
            {/* Scroll indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ 
                opacity: { delay: 1.5, duration: 1 },
                y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <p className="text-white/50 mb-2 text-sm">Scroll to discover</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* Brief summary with visual design */}
        <div className="relative z-10 py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div 
                className="absolute -top-10 -left-10 w-20 h-20 opacity-50"
                style={{ border }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              
              <motion.blockquote 
                className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 relative z-10"
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                I'm Kaiyuan Li, a high school senior from San Jose with a passion at the 
                intersection of <span className="font-semibold">technology</span>, 
                <span className="font-semibold"> business</span>, and 
                <span className="font-semibold"> creativity</span>.
              </motion.blockquote>
              
              <motion.div 
                className="absolute -bottom-10 -right-10 w-20 h-20 opacity-50"
                style={{ border }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.main>
      
      {/* Content Section with Resume */}
      <div className="relative bg-gray-950">
        <ContentSection />
      </div>
    </>
  )
} 
