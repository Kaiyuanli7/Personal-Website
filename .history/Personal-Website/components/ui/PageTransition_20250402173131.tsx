'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

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

// Overlay animation variants
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeInOut",
      delay: 0.2
    }
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  
  // Show overlay briefly during transitions
  useEffect(() => {
    setShowOverlay(true)
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      {/* Transition overlay */}
      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate={showOverlay ? "animate" : "exit"}
        className="fixed inset-0 bg-gray-950 z-[100] pointer-events-none"
      />
      
      {/* Page content with transition */}
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  )
} 