'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  // Handle route changes
  useEffect(() => {
    setIsTransitioning(true)
    
    // Update the children after transition starts
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
    }, 600) // Half of the animation time
    
    return () => clearTimeout(timeout)
  }, [pathname, children])

  return (
    <div className="relative w-full h-full">
      {/* Current page content */}
      {displayChildren}
      
      {/* Page transition overlay */}
      <AnimatePresence mode="wait" onExitComplete={() => setIsTransitioning(false)}>
        {isTransitioning && (
          <motion.div
            key={pathname}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            exit={{ height: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {/* Transition line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-1 bg-white"
              style={{ boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.5)' }}
              animate={{ 
                top: ['0%', '100%'] 
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            />
            
            {/* Top mask (old page being erased) */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gray-950"
              animate={{ 
                height: ['0%', '100%'] 
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 