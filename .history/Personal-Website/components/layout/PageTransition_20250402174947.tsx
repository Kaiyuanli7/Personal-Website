'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionKey, setTransitionKey] = useState(pathname)
  const particlesRef = useRef<HTMLDivElement>(null)

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

  // Create particles along the transition line
  useEffect(() => {
    if (pathname !== transitionKey && particlesRef.current) {
      const container = particlesRef.current
      container.innerHTML = ''
      
      // Create particles
      const particleCount = 15
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        const size = Math.random() * 4 + 2
        
        // Position particles randomly along the line
        particle.style.position = 'absolute'
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.borderRadius = '50%'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = '0'
        particle.style.backgroundColor = 'white'
        particle.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.7)'
        particle.style.transform = 'translateY(-50%)'
        particle.style.opacity = `${Math.random() * 0.7 + 0.3}`
        
        // Animate particle position
        const duration = 1200 + (Math.random() * 500)
        const delay = Math.random() * 200
        
        particle.animate(
          [
            { top: '0%' },
            { top: '100%' }
          ],
          {
            duration,
            delay,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            fill: 'forwards'
          }
        )
        
        container.appendChild(particle)
      }
    }
  }, [pathname, transitionKey])

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
                background: 'linear-gradient(90deg, #1E67C6, #13FFAA, #CE84CF, #1E67C6)',
                backgroundSize: '300% 100%'
              }}
              initial={{ top: '0%' }}
              animate={{ 
                top: '100%',
                backgroundPosition: ['0% 50%', '100% 50%'] 
              }}
              transition={{ 
                top: {
                  duration: 1.2, 
                  ease: [0.33, 1, 0.68, 1]
                },
                backgroundPosition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'linear'
                }
              }}
            />
            
            {/* Particles container */}
            <div 
              ref={particlesRef}
              className="absolute inset-0 overflow-hidden"
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