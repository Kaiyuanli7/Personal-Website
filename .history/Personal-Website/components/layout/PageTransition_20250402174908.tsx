'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionKey, setTransitionKey] = useState(pathname)

  // Handle route changes
  useEffect(() => {
    // Only update the key and start transition when the path changes
    if (pathname !== transitionKey) {
      setTransitionKey(pathname)
      
      // Update the children after the line has moved halfway down
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
      }, 600) // Half of the animation time
      
      return () => clearTimeout(timeout)
    }
  }, [pathname, children, transitionKey])

  return (
    <div className="relative w-full h-full">
      {/* Current page content */}
      {displayChildren}
      
      {/* Page transition overlay */}
      <AnimatePresence mode="wait">
        {pathname !== transitionKey && (
          <motion.div
            key={transitionKey}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {/* Transition line with glow effect */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-2 bg-white"
              style={{ 
                boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.7)',
                background: 'linear-gradient(90deg, #1E67C6, #13FFAA, #CE84CF, #1E67C6)'
              }}
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ 
                duration: 1.2, 
                ease: [0.33, 1, 0.68, 1],
                backgroundPosition: ['0% 50%', '100% 50%']
              }}
            />
            
            {/* Top mask - reveals new content as the line sweeps down */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gray-950"
              style={{ transformOrigin: 'top' }}
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 