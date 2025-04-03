'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function MouseOutline() {
  const [isHovering, setIsHovering] = useState(false)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [targetRadius, setTargetRadius] = useState(0)
  const outlineRef = useRef<HTMLDivElement>(null)

  // Smooth spring animations for position and size
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  const width = useSpring(0, { stiffness: 300, damping: 30 })
  const height = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const opacity = useSpring(0, { stiffness: 300, damping: 30 })
  const radius = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        x.set(e.clientX)
        y.set(e.clientY)
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Find the closest interactive element (link or button)
      const interactiveElement = target.tagName === 'A' || target.tagName === 'BUTTON' 
        ? target 
        : target.closest('a') || target.closest('button')

      if (interactiveElement) {
        // Find the first child div with rounded corners
        const roundedDiv = interactiveElement.querySelector('div[class*="rounded"]')
        const elementToTrack = roundedDiv || interactiveElement
        
        setIsHovering(true)
        const rect = elementToTrack.getBoundingClientRect()
        setTargetRect(rect)
        
        // Get the computed border radius
        const computedStyle = window.getComputedStyle(elementToTrack)
        const borderRadius = computedStyle.borderRadius
        
        // Parse the border radius value - handle multiple values if present
        const radiusValues = borderRadius.split(' ').map(value => parseInt(value))
        const radiusValue = radiusValues[0] || 0 // Use first value if multiple are present
        
        // For rounded-2xl, we want to match Tailwind's 1rem (16px) border radius
        if (elementToTrack.classList.contains('rounded-2xl')) {
          setTargetRadius(16)
        } else {
          setTargetRadius(radiusValue)
        }
        
        opacity.set(1)
        scale.set(1.05) // Reduced scale for a more subtle effect
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveElement = target.tagName === 'A' || target.tagName === 'BUTTON' 
        ? target 
        : target.closest('a') || target.closest('button')

      if (interactiveElement) {
        setIsHovering(false)
        setTargetRect(null)
        setTargetRadius(0)
        opacity.set(0)
        scale.set(1)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter, true)
    window.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter, true)
      window.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [isHovering, x, y, opacity, scale])

  // Update outline position and size when hovering over a target
  useEffect(() => {
    if (isHovering && targetRect) {
      x.set(targetRect.left)
      y.set(targetRect.top)
      width.set(targetRect.width)
      height.set(targetRect.height)
      radius.set(targetRadius)
    }
  }, [isHovering, targetRect, targetRadius, x, y, width, height, radius])

  return (
    <motion.div
      ref={outlineRef}
      className="fixed pointer-events-none z-50"
      style={{
        x: useTransform(x, (value) => value - (isHovering ? 4 : 16)), // Reduced padding
        y: useTransform(y, (value) => value - (isHovering ? 4 : 16)), // Reduced padding
        width: useTransform(width, (value) => value + (isHovering ? 8 : 0)), // Reduced padding
        height: useTransform(height, (value) => value + (isHovering ? 8 : 0)), // Reduced padding
        scale,
        opacity,
      }}
    >
      <motion.div 
        className="w-full h-full border border-white/20 backdrop-blur-sm"
        style={{
          borderRadius: useTransform(radius, (value) => isHovering ? `${value}px` : '50%')
        }}
      />
    </motion.div>
  )
} 