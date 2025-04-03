import { useAnimationDelay } from '@/components/layout/PageTransition'
import { useEffect, useState } from 'react'

/**
 * Hook to delay animations based on page transitions
 * @param defaultDelay Optional additional delay in ms (after the page transition completes)
 * @returns An object containing whether animations should be delayed
 */
export function useDelayedAnimation(defaultDelay: number = 0) {
  const [isReady, setIsReady] = useState(false)
  const animationDelay = useAnimationDelay()
  
  useEffect(() => {
    // If the page transition is delaying animations, wait
    if (!animationDelay?.shouldDelayAnimation) {
      // Only apply the additional delay if specified
      if (defaultDelay > 0) {
        const timeout = setTimeout(() => {
          setIsReady(true)
        }, defaultDelay)
        
        return () => clearTimeout(timeout)
      } else {
        setIsReady(true)
      }
    } else {
      setIsReady(false)
    }
  }, [animationDelay?.shouldDelayAnimation, defaultDelay])
  
  return {
    isReady,
    shouldDelay: !isReady
  }
} 