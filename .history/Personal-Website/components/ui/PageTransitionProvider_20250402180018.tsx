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

  // Create a key from the current path and search params
  const fullPath = pathname + searchParams.toString()

  // Handle path changes
  useEffect(() => {
    // If the path has changed and we're not currently animating
    if (previousPath !== pathname && !isTransitioning) {
      startTransition()
      setNextChild(children)
      setPreviousPath(pathname)
      setTransitionKey(fullPath)
    }
  }, [pathname, searchParams, previousPath, children, fullPath, isTransitioning, startTransition])

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    if (isTransitioning) {
      setDisplayChild(nextChild)
      setNextChild(null)
      completeTransition()
    }
  }, [isTransitioning, nextChild, completeTransition])

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
        <motion.div
          key={transitionKey}
          className="page-wrapper"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{
            duration: 1,
            ease: [0.645, 0.045, 0.355, 1.000], // Cubic bezier easing
          }}
        >
          {isTransitioning && nextChild ? nextChild : displayChild}
        </motion.div>
      </AnimatePresence>
      <style jsx global>{`
        .page-wrapper {
          position: absolute;
          width: 100%;
          min-height: 100vh;
          will-change: clip-path;
        }
        
        /* Fix for potential stacking issues */
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  )
} 