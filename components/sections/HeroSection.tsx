'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const SECTION_HEIGHT = 1500
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export default function HeroSection() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const color = useMotionValue(COLORS_TOP[0])
  
  // Parallax scrolling for the showcase section
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })

  // Transform values for parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.8, 1], [0.4, 1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0, 0.04, 0.85, 1], [0.4, 1, 1, 0.2])

  useEffect(() => {
    if (!sectionRef.current) return

    // Initially hide the section
    gsap.set(sectionRef.current, {
      opacity: 0,
      y: 100,
    })

    // Show the section when scrolling past the hero
    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        toggleActions: 'play none none reverse',
      },
    })

    // Animate the aurora color
    animate(color, COLORS_TOP, {
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
    <motion.section
      ref={sectionRef}
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen overflow-hidden bg-gray-950"
    >
      <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
        <StarsBackground />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-center mb-8"
          >
            Kaiyuan Li
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center mb-12"
          >
            Senior High School Student | AI/ML Developer | Financial Analyst
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              href="/projects"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* Parallax Showcase Section */}
        <div 
          ref={parallaxRef}
          className="sticky top-0 h-screen overflow-hidden z-20"
        >
          {/* Floating shapes */}
          <div className="absolute inset-0 z-0">
            {/* Tech icons floating with parallax */}
            <motion.div 
              className="absolute top-1/4 left-[10%] md:left-1/4 w-16 h-16 md:w-20 md:h-20 bg-blue-600/20 rounded-xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="text-white text-xl md:text-3xl">AI</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 right-[10%] md:right-1/4 w-16 h-16 md:w-24 md:h-24 bg-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-lg"
              style={{ y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="text-white text-xl md:text-3xl">ML</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 md:bottom-1/4 left-[15%] md:left-1/3 w-20 h-20 md:w-28 md:h-28 bg-green-600/20 rounded-2xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y3, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="text-white text-xl md:text-3xl">Web3</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/4 right-[15%] md:right-1/4 w-24 h-24 md:w-32 md:h-32 bg-yellow-600/20 rounded-3xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y1, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="text-white text-xl md:text-3xl">Finance</span>
            </motion.div>
          </div>
          
          {/* Animated lines connecting elements - adjusted for mobile */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-30 hidden md:block">
            <motion.path 
              d="M200,100 C300,50 400,150 500,200" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              style={{ pathLength: scrollYProgress }}
            />
            <motion.path 
              d="M600,200 C500,300 300,400 200,300" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          
          {/* Text overlay - adjusted for mobile */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.h2 
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-[90vw] md:max-w-none mx-auto"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
              >
                 "The best way to predict the future is to invent it." - Alan Kay
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4 md:px-0"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
              >
              
              </motion.p>
            </motion.div>
          </div>
          
          {/* Decorative glowing orbs - adjusted for mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/2 w-32 md:w-64 h-32 md:h-64 rounded-full bg-blue-500/10 blur-3xl"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, -100]), scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]) }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-40 md:w-80 h-40 md:h-80 rounded-full bg-purple-500/10 blur-3xl"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: useTransform(scrollYProgress, [0, 1], [1, 0.7]) }}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-gray-950/0 to-gray-950" />
      </div>
    </motion.section>
  )
} 