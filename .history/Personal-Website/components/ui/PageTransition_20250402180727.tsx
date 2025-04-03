'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const transitionVariants = {
  initial: {
    opacity: 0,
    y: 5,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.98,
    transition: {
      duration: 0.2
    }
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // On first render, don't animate
  if (!isClient) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
          duration: 0.3
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 