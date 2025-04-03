'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [previousPath, setPreviousPath] = useState(pathname)
  const [transitionKey, setTransitionKey] = useState(pathname + searchParams.toString())
  const [displayChild, setDisplayChild] = useState(children)
  const [nextChild, setNextChild] = useState<ReactNode | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Create a key from the current path and search params
  const fullPath = pathname + searchParams.toString()

  // Handle path changes
  useEffect(() => {
    // If the path has changed and we're not currently animating
    if (previousPath !== pathname && !isAnimating) {
      setIsAnimating(true)
      setNextChild(children)
      setPreviousPath(pathname)
      setTransitionKey(fullPath)
    }
  }, [pathname, searchParams, previousPath, children, fullPath, isAnimating])

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    if (isAnimating) {
      setDisplayChild(nextChild)
      setNextChild(null)
      setIsAnimating(false)
    }
  }, [isAnimating, nextChild])

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
          {isAnimating && nextChild ? nextChild : displayChild}
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