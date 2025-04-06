'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import Button from '@/components/ui/Button'

const SolidBackground = dynamic(() => import('@/components/ui/SolidBackground'), {
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
      className="relative min-h-screen overflow-hidden transition-colors duration-300 dark:bg-dark-background bg-light-background"
    >
      <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
        <SolidBackground />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold text-center mb-8 dark:text-white text-light-foreground transition-colors duration-300"
          >
            Kaiyuan Li
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center mb-12 dark:text-white/80 text-light-foreground/80 transition-colors duration-300"
          >
            Senior High School Student | AI/ML Developer | Financial Analyst
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <Button href="/projects">View Projects</Button>
          </motion.div>
        </div>

        {/* Parallax Showcase Section */}
        <div 
          ref={parallaxRef}
          className="sticky top-0 h-screen overflow-hidden z-20"
        >
          {/* Floating shapes */}
          <div className="absolute inset-0 z-0">
            {/* Tech icons floating with parallax - responsive positioning and sizing */}
            <motion.div 
              className="absolute top-[15%] md:top-1/4 left-[8%] md:left-1/4 w-14 h-14 md:w-20 md:h-20 dark:bg-blue-600/20 bg-blue-600/10 rounded-xl flex items-center justify-center backdrop-blur-lg transform-gpu transition-colors duration-300"
              style={{ y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="dark:text-white text-light-foreground text-base md:text-3xl font-medium transition-colors duration-300">AI</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-[25%] md:top-1/3 right-[8%] md:right-1/4 w-14 h-14 md:w-24 md:h-24 dark:bg-purple-600/20 bg-purple-600/10 rounded-full flex items-center justify-center backdrop-blur-lg transform-gpu transition-colors duration-300"
              style={{ y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="dark:text-white text-light-foreground text-base md:text-3xl font-medium transition-colors duration-300">ML</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[35%] md:bottom-1/4 left-[12%] md:left-1/3 w-16 h-16 md:w-28 md:h-28 dark:bg-green-600/20 bg-green-600/10 rounded-2xl flex items-center justify-center backdrop-blur-lg transform-gpu transition-colors duration-300"
              style={{ y: y3, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="dark:text-white text-light-foreground text-base md:text-3xl font-medium transition-colors duration-300">Web3</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[20%] md:bottom-1/4 right-[12%] md:right-1/4 w-18 h-18 md:w-32 md:h-32 dark:bg-yellow-600/20 bg-yellow-600/10 rounded-3xl flex items-center justify-center backdrop-blur-lg transform-gpu transition-colors duration-300"
              style={{ y: y1, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="dark:text-white text-light-foreground text-base md:text-3xl font-medium transition-colors duration-300">Finance</span>
            </motion.div>
          </div>
          
          {/* Animated lines connecting elements - only shown on larger screens */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-30 hidden md:block">
            <motion.path 
              d="M200,100 C300,50 400,150 500,200" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              style={{ pathLength: scrollYProgress }}
              className="dark:stroke-white/30 stroke-black/20 transition-colors duration-300"
            />
            <motion.path 
              d="M600,200 C500,300 300,400 200,300" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              style={{ pathLength: scrollYProgress }}
              className="dark:stroke-white/30 stroke-black/20 transition-colors duration-300"
            />
          </svg>
          
          {/* Text overlay - improved mobile responsiveness */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.h2 
                className="text-2xl md:text-4xl lg:text-5xl font-bold dark:text-white text-light-foreground mb-6 max-w-[90vw] md:max-w-none mx-auto transition-colors duration-300"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
              >
                 "The best way to predict the future is to invent it." - Alan Kay
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl dark:text-white/80 text-light-foreground/80 max-w-2xl mx-auto px-4 md:px-0 transition-colors duration-300"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
              >
              
              </motion.p>
            </motion.div>
          </div>
          
          {/* Decorative glowing orbs - adjusted for mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/2 w-32 md:w-64 h-32 md:h-64 rounded-full dark:bg-blue-500/10 bg-blue-400/5 blur-3xl transition-colors duration-300"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, -100]), scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]) }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-40 md:w-80 h-40 md:h-80 rounded-full dark:bg-purple-500/10 bg-purple-400/5 blur-3xl transition-colors duration-300"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: useTransform(scrollYProgress, [0, 1], [1, 0.7]) }}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b dark:from-dark-background/0 dark:to-dark-background from-light-background/0 to-light-background transition-colors duration-300" />
      </div>
    </motion.section>
  )
} 