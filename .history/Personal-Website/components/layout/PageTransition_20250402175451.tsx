'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'

// Create a custom context to delay the animations of child components
import { createContext, useContext } from 'react'

const AnimationDelayContext = createContext<{ shouldDelayAnimation: boolean }>({
  shouldDelayAnimation: false
})

export const useAnimationDelay = () => useContext(AnimationDelayContext)

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [previousChildren, setPreviousChildren] = useState(children)
  const [transitionKey, setTransitionKey] = useState(pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [shouldDelayAnimation, setShouldDelayAnimation] = useState(false)
  const [newChildrenKey, setNewChildrenKey] = useState(`page-${pathname}`)
  const particlesRef = useRef<HTMLDivElement>(null)
  const transitionLineRef = useRef<HTMLDivElement>(null)

  // Handle route changes
  useEffect(() => {
    // Only update the key and start transition when the path changes
    if (pathname !== transitionKey) {
      // Save previous children before starting transition
      setPreviousChildren(displayChildren)
      setIsTransitioning(true)
      setShouldDelayAnimation(true)
      setTransitionKey(pathname)
      setNewChildrenKey(`page-${pathname}`)
      
      // Don't update displayed content immediately - wait for the transition
      return () => {}
    }
  }, [pathname, displayChildren, transitionKey])

  // Create particles along the transition line
  useEffect(() => {
    if (isTransitioning && particlesRef.current) {
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
  }, [isTransitioning])

  // End transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      // First, allow animations to start after line has completely passed
      const enableAnimationTimeout = setTimeout(() => {
        setShouldDelayAnimation(false)
      }, 1200) // This should match the line transition duration
      
      // Then, end the transition after all animations should be complete
      const endTransitionTimeout = setTimeout(() => {
        setDisplayChildren(
          <AnimationDelayContext.Provider value={{ shouldDelayAnimation: false }}>
            <div key={newChildrenKey}>{children}</div>
          </AnimationDelayContext.Provider>
        )
        setIsTransitioning(false)
      }, 1600) // After the animations on the revealed page should have started
      
      return () => {
        clearTimeout(enableAnimationTimeout)
        clearTimeout(endTransitionTimeout)
      }
    }
  }, [isTransitioning, children, newChildrenKey, shouldDelayAnimation])

  // Create wrapped children with key to preserve instance and with animation delay context
  const wrappedNewChildren = (
    <AnimationDelayContext.Provider value={{ shouldDelayAnimation }}>
      <div key={newChildrenKey}>{children}</div>
    </AnimationDelayContext.Provider>
  )

  return (
    <div className="relative w-full h-full">
      {/* Content container - either showing previous or current content */}
      {isTransitioning ? (
        <div className="relative w-full h-full">
          {/* Previous content - visible during transition */}
          <motion.div
            className="absolute w-full h-full z-10"
            style={{ 
              filter: 'blur(1px)',
              transition: 'filter 0.4s cubic-bezier(0.33, 1, 0.68, 1)'
            }}
          >
            {previousChildren}
          </motion.div>
          
          {/* New content - will be progressively revealed by the mask */}
          <div 
            className="absolute w-full h-full z-5"
            style={{ 
              opacity: 0,  // Start hidden, will be revealed by the transition effect
              pointerEvents: 'none' // Ensure it doesn't intercept clicks during transition
            }}
          >
            {wrappedNewChildren}
          </div>
        </div>
      ) : (
        // Normal display when not transitioning
        displayChildren
      )}
      
      {/* Page transition overlay */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
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
              ref={transitionLineRef}
              className="absolute top-0 left-0 right-0 h-2"
              style={{ 
                boxShadow: '0 0 30px 8px rgba(255, 255, 255, 0.7)',
                background: 'linear-gradient(90deg, #1E67C6, #13FFAA, #CE84CF, #1E67C6)',
                backgroundSize: '300% 100%',
                zIndex: 52
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
              className="absolute inset-0 overflow-hidden z-52"
            />
            
            {/* Top mask - hides top portion of the OLD content */}
            <motion.div 
              className="absolute top-0 left-0 right-0 z-51"
              style={{ 
                transformOrigin: 'top', 
                background: 'transparent',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
                WebkitMaskSize: '100% 20px',
                maskSize: '100% 20px',
                WebkitMaskPosition: 'center top',
                maskPosition: 'center top',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
              }}
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="w-full h-full bg-gray-950" />
            </motion.div>

            {/* Bottom reveal mask - progressively reveals the NEW content as the line sweeps down */}
            <motion.div 
              className="absolute top-0 left-0 right-0 z-20"
              style={{ 
                background: 'rgba(0,0,0,0)',
                overflow: 'hidden',
                pointerEvents: 'none'
              }}
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              {wrappedNewChildren}
              
              {/* Dark content cover that moves up to reveal new content */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gray-950 z-30"
                style={{ transformOrigin: 'bottom' }}
                initial={{ height: '100%' }}
                animate={{ height: '0%' }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              />
            </motion.div>

            {/* Additional light rays effect along the line */}
            <motion.div 
              className="absolute left-0 right-0 h-[1px] overflow-hidden z-53"
              style={{ 
                boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.8)',
                height: '1px',
              }}
              initial={{ top: '0%', width: '0%', left: '50%' }}
              animate={{ 
                top: '100%',
                width: ['0%', '100%', '0%'],
                left: ['50%', '0%', '50%']
              }}
              transition={{ 
                top: {
                  duration: 1.2, 
                  ease: [0.33, 1, 0.68, 1]
                },
                width: {
                  duration: 1.2,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut'
                },
                left: {
                  duration: 1.2,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut'
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 