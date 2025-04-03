'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize lenis scroll if needed
    lenis?.update()
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
