'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Set up scroll-triggered animations
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return
    
    // Create timeline for the zoom effect
    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    })
    
    // Add animations to the timeline
    zoomTl
      // Start with normal scale
      .fromTo('.code-container', { 
        scale: 1,
        borderRadius: '16px',
      }, { 
        scale: 2.5, 
        borderRadius: '0px',
        duration: 1 
      })
      // Fade out text elements during zoom
      .to('.zoom-fade', { 
        opacity: 0,
        duration: 0.5
      }, 0)
      
    // Create separate timeline for revealing content
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 0.5,
      }
    })
    
    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [lenis])

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen bg-gray-950"
    >
      {/* Container for the sticky zoom effect */}
      <div ref={containerRef} className="h-[200vh] relative bg-gray-950">
        {/* Intro section with custom zoom classes */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col zoom-fade">
                <h1 className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mb-8">
                  <span className="block">Creating</span>
                  <span className="inline-block">Digital</span>
                  <span className="block">Experiences</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-body mb-10 max-w-lg">
                  Blending creativity with technology to build engaging, functional solutions that solve real-world problems.
                </p>
                <div className="flex gap-4 mt-4 flex-wrap">
                  {['Developer', 'Student', 'Designer', 'Innovator'].map((tag) => (
                    <div key={tag} className="bg-white/10 rounded-full px-6 py-2 text-white font-medium">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Code container that will zoom */}
              <div className="code-container relative">
                <div className="w-full h-[400px] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-1 overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                    
                    {/* Code snippet mockup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl bg-black w-[90%] h-[80%] p-6 shadow-lg relative overflow-hidden">
                        <div className="flex gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        
                        <div className="text-blue-400 font-mono text-sm">
                          <div>
                            <span className="text-pink-400">const</span> <span className="text-green-400">developer</span> = {"{"}
                          </div>
                          <div className="ml-4">
                            <span className="text-green-400">name</span>: <span className="text-yellow-300">'Kaiyuan Li'</span>,
                          </div>
                          <div className="ml-4">
                            <span className="text-green-400">skills</span>: [<span className="text-yellow-300">'JS'</span>, <span className="text-yellow-300">'Python'</span>, <span className="text-yellow-300">'React'</span>],
                          </div>
                          <div className="ml-4">
                            <span className="text-green-400">passionate</span>: <span className="text-yellow-300">true</span>
                          </div>
                          <div>{"};"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section that appears after the zoom effect */}
      <div 
        ref={contentRef} 
        className="opacity-0 transform translate-y-20 bg-gray-950"
      >
        <ContentSection skipIntro={true} />
      </div>
    </motion.div>
  )
} 
