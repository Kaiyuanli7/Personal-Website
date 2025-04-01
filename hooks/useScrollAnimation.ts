'use client'

import { useEffect, useRef } from 'react'
import { useAnimation } from 'framer-motion'

interface ScrollAnimationOptions {
  animation?: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale'
  threshold?: number
  triggerOnce?: boolean
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const { threshold = 0.1, triggerOnce = true, animation = 'fadeUp' } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible')
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, threshold, triggerOnce])

  return ref
} 