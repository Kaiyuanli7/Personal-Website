'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)

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
  }, [lenis])

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen bg-gray-950"
    >
      <ContentSection />
    </motion.div>
  )
} 