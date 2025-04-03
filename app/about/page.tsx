'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import ContentSection from '@/components/sections/ContentSection'
import dynamic from 'next/dynamic'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null
})

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // No need to manually update lenis in this simplified version
  }, [lenis])

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen bg-gray-950 relative"
    >
      <div className="absolute inset-0 z-0">
        <StarsBackground />
      </div>
      <div className="relative z-10">
        <ContentSection />
      </div>
    </motion.div>
  )
} 
