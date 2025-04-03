'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTransition } from '@/context/TransitionContext'

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isTransitioning, startTransition, completeTransition } = useTransition()
  const [previousPath, setPreviousPath] = useState(pathname)
  const [transitionKey, setTransitionKey] = useState(pathname + searchParams.toString())
  const [displayChild, setDisplayChild] = useState(children)
  const [nextChild, setNextChild] = useState<ReactNode | null>(null)
  const [oldChild, setOldChild] = useState<ReactNode | null>(null)

  // Create a key from the current path and search params
  const fullPath = pathname + searchParams.toString()

  // Handle path changes
  useEffect(() => {
    // If the path has changed and we're not currently animating
    if (previousPath !== pathname && !isTransitioning) {
      // Store the current child as the old one before updating
      setOldChild(displayChild)
      setNextChild(children)
      startTransition()
      setPreviousPath(pathname)
      setTransitionKey(fullPath)
    }
  }, [pathname, searchParams, previousPath, children, fullPath, isTransitioning, startTransition, displayChild])

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    if (isTransitioning) {
      setDisplayChild(nextChild)
      setNextChild(null)
      setOldChild(null)
      completeTransition()
    }
  }, [isTransitioning, nextChild, completeTransition])

  return (
    <>
      <div className="transition-container">
        {/* Old page that stays visible below the line */}
        {isTransitioning && oldChild && (
          <div className="old-page">
            {oldChild}
          </div>
        )}
        
        {/* New page that's revealed from top to bottom */}
        <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
          <motion.div
            key={transitionKey}
            className="new-page"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{
              duration: 1.2,
              ease: [0.645, 0.045, 0.355, 1.000], // Cubic bezier easing
            }}
          >
            {isTransitioning && nextChild ? nextChild : displayChild}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .transition-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }
        
        .old-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100vh;
          z-index: 1;
          pointer-events: none;
        }
        
        .new-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100vh;
          z-index: 2;
          will-change: clip-path;
          background-color: inherit;
        }
        
        /* Fix for potential stacking issues */
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  )
} 