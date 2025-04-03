'use client'

import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [nextChildren, setNextChildren] = useState<React.ReactNode | null>(null)
  const previousPathname = useRef(pathname)
  
  // Combine pathname and search params to create a unique page key
  const currentKey = pathname + searchParams.toString()

  useEffect(() => {
    // If the path changed, start the transition
    if (previousPathname.current !== pathname) {
      setIsAnimating(true)
      setNextChildren(children)
    }
    previousPathname.current = pathname
  }, [pathname, children])

  const onAnimationComplete = () => {
    if (isAnimating) {
      setDisplayChildren(nextChildren)
      setIsAnimating(false)
      setNextChildren(null)
    }
  }

  // The transition container needs a key to force re-render when the page changes
  return (
    <div className="page-transition-container">
      <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
        <motion.div
          key={currentKey}
          initial={{ clipPath: isAnimating ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ 
            duration: 1.2, 
            ease: [0.645, 0.045, 0.355, 1.000] // Cubic bezier for smooth easing
          }}
          className="page-content"
        >
          {isAnimating ? nextChildren : displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 