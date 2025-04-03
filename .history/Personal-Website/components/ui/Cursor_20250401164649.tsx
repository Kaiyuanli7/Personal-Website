'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'

export default function Cursor() {
  const { isHovering, setIsHovering } = useCursor()
  const cursorRef = useRef<HTMLDivElement>(null)
  const [targetShape, setTargetShape] = useState({ width: 0, height: 0, borderRadius: 0 })
  const [buttonCenter, setButtonCenter] = useState({ x: 0, y: 0 })
  const lastHoveredElement = useRef<HTMLElement | null>(null)
  
  // Use motion values for direct cursor movement
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Function to update button position
  const updateButtonPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + (rect.width / 2)
    const centerY = rect.top + (rect.height / 2)
    setButtonCenter({ x: centerX, y: centerY })
  }

  useEffect(() => {
    // Don't initialize on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if element is interactive
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('cursor-hover') ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.cursor-hover') !== null
      
      if (isInteractive) {
        // Store the hovered element
        lastHoveredElement.current = target
        
        // Get the target element's dimensions and styles
        const rect = target.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(target)
        
        // Get all relevant styles for accurate shape
        const borderRadius = computedStyle.borderRadius
        const paddingTop = parseFloat(computedStyle.paddingTop)
        const paddingRight = parseFloat(computedStyle.paddingRight)
        const paddingBottom = parseFloat(computedStyle.paddingBottom)
        const paddingLeft = parseFloat(computedStyle.paddingLeft)
        const borderTop = parseFloat(computedStyle.borderTopWidth)
        const borderRight = parseFloat(computedStyle.borderRightWidth)
        const borderBottom = parseFloat(computedStyle.borderBottomWidth)
        const borderLeft = parseFloat(computedStyle.borderLeftWidth)
        
        // Calculate total dimensions including padding and border
        const totalWidth = rect.width + paddingLeft + paddingRight + borderLeft + borderRight
        const totalHeight = rect.height + paddingTop + paddingBottom + borderTop + borderBottom
        
        // Add extra padding to make the outline larger
        const outlinePadding = 4 // pixels of extra padding
        const outlineWidth = totalWidth + (outlinePadding * 2)
        const outlineHeight = totalHeight + (outlinePadding * 2)
        
        // Calculate center position of the target
        const centerX = rect.left + (rect.width / 2)
        const centerY = rect.top + (rect.height / 2)
        
        // Parse border radius values (handle different units)
        const parseBorderRadius = (value: string) => {
          if (value.includes('px')) return parseFloat(value)
          if (value.includes('%')) return parseFloat(value) * Math.min(totalWidth, totalHeight) / 100
          if (value.includes('rem')) return parseFloat(value) * 16 // Assuming 1rem = 16px
          if (value.includes('em')) {
            const parentFontSize = parseFloat(window.getComputedStyle(target.parentElement || document.body).fontSize)
            return parseFloat(value) * parentFontSize
          }
          return parseFloat(value)
        }
        
        // Handle different border radius formats (single value, multiple values)
        let borderRadiusValue = 0
        if (borderRadius.includes(' ')) {
          // For multiple values, extract all values and use them for specific corners
          const radiusValues = borderRadius.split(' ').map(parseBorderRadius)
          // Use max value for now, but ideally we'd apply each corner radius separately
          borderRadiusValue = Math.max(...radiusValues)
        } else {
          borderRadiusValue = parseBorderRadius(borderRadius)
        }

        // Add a bit more precision to border radius for fully rounded elements
        const isFullyRounded = borderRadiusValue >= Math.min(totalWidth, totalHeight) / 2
        const finalBorderRadius = isFullyRounded 
          ? Math.min(totalWidth, totalHeight) / 2 + outlinePadding
          : borderRadiusValue + outlinePadding
        
        // Update target shape and position
        setTargetShape({
          width: outlineWidth,
          height: outlineHeight,
          borderRadius: finalBorderRadius
        })
        
        // Set button center position
        setButtonCenter({ x: centerX, y: centerY })
      } else {
        setTargetShape({ width: 6, height: 6, borderRadius: 50 })
        lastHoveredElement.current = null
      }
      
      // Only update if the hover state is actually changing
      if (isInteractive !== isHovering) {
        setIsHovering(isInteractive)
      }
    }

    const handleScroll = () => {
      if (lastHoveredElement.current && isHovering) {
        updateButtonPosition(lastHoveredElement.current)
      }
    }
    
    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Ensure cursor is visible when it enters the window
    document.addEventListener('mouseenter', () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    })
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    })
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseenter', () => {})
      document.removeEventListener('mouseleave', () => {})
    }
  }, [cursorX, cursorY, isHovering, setIsHovering])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Expanding ring with spring animation */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: isHovering ? buttonCenter.x : cursorX,
          y: isHovering ? buttonCenter.y : cursorY,
          transformOrigin: 'center center',
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{
          width: targetShape.width,
          height: targetShape.height,
          borderRadius: `${targetShape.borderRadius}px`,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: 'tween',
          duration: 0.3,
          ease: 'easeInOut'
        }}
      >
        <div className="w-full h-full border border-white" 
          style={{ borderRadius: `${targetShape.borderRadius}px` }}></div>
      </motion.div>

      {/* Small outline around the red dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          transformOrigin: 'center center',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: 6,
          height: 6,
          borderRadius: 50,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'tween',
          duration: 0.1,
          ease: 'easeInOut'
        }}
      >
        <div className="w-full h-full border border-white rounded-full"></div>
      </motion.div>

      <style jsx global>{`
        * {
          cursor: none !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        body {
          cursor: none !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        html {
          cursor: none !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        a, button, input, textarea, select {
          cursor: none !important;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </>
  )
} 