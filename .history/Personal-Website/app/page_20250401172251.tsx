'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Animation values
  const y = useMotionValue(0)
  const rotateX = useTransform(scrollY, [0, windowHeight * 0.5], [0, -10])
  const rotateY = useTransform(scrollY, [0, windowHeight * 0.5], [0, 10])
  const scale = useTransform(scrollY, [0, windowHeight * 0.3], [1, 0.8])
  const opacity = useTransform(scrollY, [0, windowHeight * 0.6], [1, 0])
  
  // Parallax effect
  const textY = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.3])
  const textSpacing = useTransform(scrollY, [0, windowHeight * 0.5], [0, 100])
  const textOpacity = useTransform(scrollY, [windowHeight * 0.3, windowHeight * 0.5], [1, 0])
  
  // Options container animation
  const optionsY = useTransform(scrollY, [0, windowHeight * 0.3, windowHeight * 0.7], 
                                [windowHeight * 0.5, windowHeight * 0.3, 0])
  const optionsOpacity = useTransform(scrollY, [windowHeight * 0.3, windowHeight * 0.6], [0, 1])
  const optionsScale = useTransform(scrollY, [windowHeight * 0.4, windowHeight * 0.7], [0.8, 1])
    
  // 3D model rotation based on mouse position
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const mouseXSpring = useSpring(0, { stiffness: 50, damping: 15 })
  const mouseYSpring = useSpring(0, { stiffness: 50, damping: 15 })
  
  const modelRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10])
  const modelRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10])
  
  // Scroll indicator animation
  const scrollIndicatorOpacity = useTransform(
    scrollY, 
    [0, windowHeight * 0.1], 
    [1, 0]
  )
  
  // Split text for animation
  const welcomeText = "WELCOME TO MY PORTFOLIO"
  const letters = welcomeText.split('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMouseX(x)
        setMouseY(y)
        mouseXSpring.set(x)
        mouseYSpring.set(y)
      }
      
      window.addEventListener('mousemove', handleMouseMove)
      
      const handleScroll = () => {
        if (window.scrollY > 50 && !hasScrolled) {
          setHasScrolled(true)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [hasScrolled, mouseXSpring, mouseYSpring])
  
  return (
    <main 
      ref={containerRef} 
      className="h-[300vh] relative bg-gray-950 overflow-hidden"
    >
      {/* Initial hero section with 3D text */}
      <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ 
            y: textY,
            perspective: 1000,
          }}
          className="flex flex-col items-center justify-center relative z-10"
        >
          {/* 3D rotating cube */}
          <motion.div
            className="mb-16 relative w-48 h-48"
            style={{
              rotateX: modelRotateX,
              rotateY: modelRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                type: "spring",
                stiffness: 50,
              }}
              style={{
                rotateX,
                rotateY,
                scale,
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Cube faces */}
              <div className="absolute w-full h-full transform translate-z-[6rem] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">K</span>
              </div>
              <div className="absolute w-full h-full transform -translate-z-[6rem] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">K</span>
              </div>
              <div className="absolute w-full h-full transform translate-x-[6rem] rotate-y-90 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">A</span>
              </div>
              <div className="absolute w-full h-full transform -translate-x-[6rem] -rotate-y-90 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">A</span>
              </div>
              <div className="absolute w-full h-full transform translate-y-[6rem] rotate-x-90 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">I</span>
              </div>
              <div className="absolute w-full h-full transform -translate-y-[6rem] -rotate-x-90 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">I</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Welcome text that deconstructs */}
          <motion.div 
            className="flex flex-wrap justify-center text-center px-4"
            style={{
              opacity: textOpacity,
            }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={`letter-${index}`}
                className="text-4xl md:text-7xl font-bold text-white inline-block origin-center"
                initial={{ opacity: 0, y: 20, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                style={{
                  margin: letter === " " ? "0 0.5rem" : "0 0.1rem",
                  letterSpacing: useTransform(scrollY, [0, windowHeight * 0.5], [0, index * 5]),
                  y: useTransform(scrollY, [0, windowHeight * 0.5], [0, (index % 2 === 0 ? -100 : 100) + (index * 10)]),
                  opacity: useTransform(scrollY, [windowHeight * 0.2, windowHeight * 0.5], [1, 0]),
                  rotateZ: useTransform(scrollY, [0, windowHeight * 0.5], [0, (index % 2 === 0 ? -45 : 45)]),
                  filter: `blur(${useTransform(scrollY, [windowHeight * 0.2, windowHeight * 0.5], [0, index * 2])})`,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mt-8 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{ 
              opacity: textOpacity,
              y: useTransform(scrollY, [0, windowHeight * 0.3], [0, 50])
            }}
          >
            Scroll to explore my creative universe
          </motion.p>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                className="w-1 h-3 bg-white/70 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Options that appear on scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            y: optionsY,
            opacity: optionsOpacity,
            scale: optionsScale,
          }}
        >
          <div className="max-w-4xl w-full space-y-12 px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Choose Your Experience
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Select how you'd like to explore my portfolio
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
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
                    <h2 className="text-3xl font-bold text-white mb-4">Professional</h2>
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
                    <h2 className="text-3xl font-bold text-white mb-4">Casual</h2>
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
