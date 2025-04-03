'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Animation variants for page transitions
const variants = {
  initial: { 
    opacity: 0,
    y: 40,  // Start from below
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth motion
    }
  },
  exit: { 
    opacity: 0,
    y: -40, // Exit upward
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// Overlay animation for page transitions
const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1
    }
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page transition overlay */}
      <motion.div
        className="fixed inset-0 bg-gray-950 z-[100] pointer-events-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={overlayVariants}
      />
      
      {/* Page content with transition */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  )
} 