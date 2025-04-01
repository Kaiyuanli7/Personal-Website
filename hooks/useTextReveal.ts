'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

export function useTextReveal() {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = new SplitType(textRef.current, { types: 'chars' })
    const chars = text.chars

    gsap.from(chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })

    return () => {
      text.revert()
    }
  }, [])

  return textRef
} 