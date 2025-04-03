'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Animation variants for page transitions
const variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  enter: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth easing
      when: "beforeChildren",
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1],
    }
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
} 