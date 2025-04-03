'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pageTransition.css'

type TransitionContextType = {
  isTransitioning: boolean
  previousPath: string | null
  currentPath: string
  transitionToPage: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  previousPath: null,
  currentPath: '/',
  transitionToPage: () => {}
})

export const usePageTransition = () => useContext(TransitionContext)

export default function PageTransitionProvider({ 
  children 
}: { 
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  
  // Remember the current path for animations
  useEffect(() => {
    setPreviousPath((prev) => (prev !== pathname ? prev : null))
  }, [pathname])

  // Custom navigation with transition
  const transitionToPage = useCallback((href: string) => {
    setIsTransitioning(true)
    
    // Store current path before navigating
    setPreviousPath(pathname)
    
    // Small delay for animation to start
    setTimeout(() => {
      router.push(href)
      
      // End transition after the page loads
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 150)
  }, [pathname, router])
  
  // Performance optimizations for animations
  useEffect(() => {
    if (isTransitioning) {
      // Prevents scrolling during transitions
      document.body.style.overflow = 'hidden'
      
      // Add blur to main content
      document.documentElement.classList.add('blur-exit')
      
      return () => {
        document.body.style.overflow = ''
        document.documentElement.classList.remove('blur-exit')
        document.documentElement.classList.add('blur-enter')
        
        // Clean up blur class after animation completes
        const timer = setTimeout(() => {
          document.documentElement.classList.remove('blur-enter')
        }, 300)
        
        clearTimeout(timer)
      }
    }
  }, [isTransitioning])
  
  return (
    <TransitionContext.Provider 
      value={{ 
        isTransitioning, 
        previousPath, 
        currentPath: pathname,
        transitionToPage
      }}
    >
      <div className={`page-transition-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30,
              duration: 0.3
            }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  )
} 