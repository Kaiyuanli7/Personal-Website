'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Animation variants for content
const contentVariants = {
  initial: { 
    opacity: 0,
    y: 30,  // Starting position is below the viewport
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Smooth ease-out
      staggerChildren: 0.05,  // Stagger children animations
    }
  },
  exit: { 
    opacity: 0,
    y: -30, // Exit upward
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// Overlay animation
const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.9,
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Dark overlay for transition */}
      <motion.div
        className="fixed inset-0 bg-gray-950 z-[100] pointer-events-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={overlayVariants}
      />
      
      {/* Page content with upward fade transition */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  )
} 