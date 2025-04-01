'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxOptions {
  speed?: number
  start?: string
  end?: string
}

export function useParallax(options: ParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const { speed = 1, start = 'top bottom', end = 'bottom top' } = options

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [speed, start, end])

  return ref
} 