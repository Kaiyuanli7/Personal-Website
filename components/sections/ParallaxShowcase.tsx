'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform values for parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.2])
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 -mt-96"
      style={{
        marginBottom: "-5rem", // Negative margin to pull the content section up
        zIndex: 1
      }}
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
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-600/20 rounded-3xl flex items-center justify-center backdrop-blur-lg"
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
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          >
            Bridging Technologies
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
          >
            Creating innovative solutions at the intersection of artificial intelligence, 
            finance, and cutting-edge web technologies.
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
    </motion.div>
  )
} 