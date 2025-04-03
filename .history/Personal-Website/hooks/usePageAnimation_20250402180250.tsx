'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/context/TransitionContext'

// This hook helps components manage their animations during page transitions
export function usePageAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const pathname = usePathname()
  const { isTransitioning } = useTransition()
  
  useEffect(() => {
    // Only start animations when the page is fully visible and not in transition
    if (!isTransitioning) {
      // A small delay to ensure transition is complete before starting animations
      const timeout = setTimeout(() => {
        setShouldAnimate(true)
      }, 200) // Increased delay to ensure transition is complete
      
      return () => clearTimeout(timeout)
    } else {
      setShouldAnimate(false)
    }
  }, [pathname, isTransitioning])
  
  // Handle component scroll visibility
  const [isInView, setIsInView] = useState(false)
  
  // Return a ref to attach to elements for scroll animations
  const scrollRef = (element: HTMLElement | null) => {
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger animations if page is fully visible and element is in view
        if (entry.isIntersecting && shouldAnimate) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of element is visible
    )
    
    observer.observe(element)
    
    return () => observer.disconnect()
  }

  // Helper function to pause animations during transitions
  const getAnimationState = (defaultState: any, pausedState: any) => {
    return isTransitioning ? pausedState : defaultState
  }
  
  return {
    shouldAnimate,
    isInView,
    scrollRef,
    isTransitioning,
    getAnimationState
  }
} 