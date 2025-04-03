'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Typewriter from '../Typewriter'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const SECTION_HEIGHT = 1600
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

  // Add refs for the showcase section
  const showcaseRef = useRef<HTMLDivElement>(null)
  const isShowcaseInView = useInView(showcaseRef, { once: true, margin: "-100px" })

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
      <div style={{ height: `calc(${SECTION_HEIGHT}px + 50vh)` }} className="relative w-full">
        <StarsBackground />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-extrabold text-center mb-8 text-white tracking-tight"
            style={{
              background: "linear-gradient(to right, #fff, #a5b4fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em"
            }}
          >
            Kaiyuan Li
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-center mb-12 text-white/90 font-light tracking-wide"
            style={{
              letterSpacing: "0.05em"
            }}
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
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg transition-colors backdrop-blur-sm"
            >
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* Parallax Showcase Section */}
        <div 
          ref={parallaxRef}
          className="sticky top-0 h-[80vh] overflow-hidden z-20"
        >
          {/* Floating shapes */}
          <div className="absolute inset-0 z-0">
            {/* Tech icons floating with parallax */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-600/20 rounded-xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="text-white text-3xl">AI</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-lg"
              style={{ y: y2, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="text-white text-3xl">ML</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-green-600/20 rounded-2xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y3, rotate: rotate1, scale: scale1, opacity: opacity1 }}
            >
              <span className="text-white text-3xl">Web3</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-600/20 rounded-3xl flex items-center justify-center backdrop-blur-lg"
              style={{ y: y1, rotate: rotate2, scale: scale2, opacity: opacity2 }}
            >
              <span className="text-white text-3xl">Finance</span>
            </motion.div>
          </div>
          
          {/* Animated lines connecting elements */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-30">
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
          
          {/* Text overlay */}
          <div 
            ref={showcaseRef}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isShowcaseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
              >
                <Typewriter 
                  text="Bridging Technology and Business" 
                  delay={isShowcaseInView ? 0.2 : 0} 
                  speed={0.02} 
                />
              </motion.h2>
              <motion.p 
                className="text-xl text-white/80 max-w-2xl mx-auto"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
              >
                <Typewriter 
                  text="Creating innovative solutions at the intersection of artificial intelligence, finance, and cutting-edge web technologies." 
                  delay={isShowcaseInView ? 0.4 : 0} 
                  speed={0.015} 
                />
              </motion.p>
            </motion.div>
          </div>
          
          {/* Decorative glowing orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, -100]), scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]) }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: useTransform(scrollYProgress, [0, 1], [1, 0.7]) }}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-gray-950/0 to-gray-950" />
      </div>
    </motion.section>
  )
} 