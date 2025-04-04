'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    if (!starsRef.current) return
    
    // Get initial dimensions
    const updateDimensions = () => {
      const { width, height } = document.body.getBoundingClientRect()
      setDimensions({ width, height })
    }
    
    // Initial update
    updateDimensions()
    
    // Listen to resize events
    window.addEventListener('resize', updateDimensions)
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])
  
  useEffect(() => {
    if (!starsRef.current || dimensions.width === 0) return
    
    // Clear previous stars
    while (starsRef.current.firstChild) {
      starsRef.current.removeChild(starsRef.current.firstChild)
    }

    const createStar = (size: number = 1, opacity: number = 0.5) => {
      const star = document.createElement('div')
      star.className = 'absolute bg-white rounded-full'
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      
      // Calculate positions based on viewport width and window.innerHeight
      // This ensures consistent density regardless of page length
      const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const viewHeight = window.innerHeight
      
      // Calculate position to ensure stars cover the visible area and a bit beyond
      // Use Math.random() * viewportWidth for x-position to ensure consistent horizontal spacing
      star.style.left = `${Math.random() * viewportWidth}px`
      
      // For y-position, calculate a position relative to the viewport height,
      // repeating stars at regular intervals throughout the page
      const totalRows = Math.ceil(dimensions.height / viewHeight)
      const rowHeight = viewHeight / 40 // 40 stars per viewport height
      const row = Math.floor(Math.random() * 40 * totalRows)
      star.style.top = `${row * rowHeight}px`
      
      star.style.opacity = `${Math.random() * opacity + 0.2}`
      
      // Add a subtle twinkle animation to some stars
      if (Math.random() > 0.7) {
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`
      }
      
      return star
    }

    const createShootingStar = () => {
      const star = document.createElement('div')
      star.className = 'absolute rounded-full'
      star.style.width = `${Math.random() * 3 + 1}px`
      star.style.height = `${Math.random() * 60 + 20}px`
      
      // Position shooting stars throughout the page height
      const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      star.style.left = `${Math.random() * viewportWidth}px`
      star.style.top = `${Math.random() * dimensions.height}px`
      
      star.style.transform = `rotate(${Math.random() * 60 - 30}deg)`
      star.style.background = 'linear-gradient(90deg, transparent, #fff, transparent)'
      star.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff'
      
      // Add a shooting animation
      const duration = Math.random() * 10 + 5
      star.style.animation = `shoot ${duration}s linear infinite`
      star.style.animationDelay = `-${Math.random() * duration}s`
      
      return star
    }

    // Calculate how many stars to generate based on viewport dimensions
    // This ensures consistent density across different screen sizes
    const viewportArea = window.innerWidth * window.innerHeight
    const starsPerSquarePx = 180 / (1920 * 1080) // Base density (180 stars for a 1080p viewport)
    
    const totalStars = Math.floor(viewportArea * starsPerSquarePx)
    
    // Distribute stars by size/distance
    const distantCount = Math.floor(totalStars * 0.4)
    const backgroundCount = Math.floor(totalStars * 0.4)
    const foregroundCount = Math.floor(totalStars * 0.2)
    
    // Calculate shooting stars based on page height
    // More shooting stars for longer pages, but cap the maximum
    const shootingStarCount = Math.min(15, Math.max(5, Math.floor(dimensions.height / window.innerHeight * 5)))

    // Create stars with different sizes for depth perception
    const distantStars = Array.from({ length: distantCount }, () => createStar(0.8, 0.3))
    const backgroundStars = Array.from({ length: backgroundCount }, () => createStar(1.2, 0.6))
    const foregroundStars = Array.from({ length: foregroundCount }, () => createStar(2, 0.9))
    const shootingStars = Array.from({ length: shootingStarCount }, createShootingStar)
    
    // Append all stars in order from background to foreground
    distantStars.forEach(star => starsRef.current?.appendChild(star))
    backgroundStars.forEach(star => starsRef.current?.appendChild(star))
    foregroundStars.forEach(star => starsRef.current?.appendChild(star))
    shootingStars.forEach(star => starsRef.current?.appendChild(star))

    // Insert CSS for animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      @keyframes shoot {
        0% { 
          transform: translateX(-100px) translateY(-100px) rotate(-45deg);
          opacity: 0;
        }
        5% { opacity: 1; }
        15% { opacity: 0; }
        100% { 
          transform: translateX(200px) translateY(200px) rotate(-45deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      while (starsRef.current?.firstChild) {
        starsRef.current.removeChild(starsRef.current.firstChild)
      }
      style.remove()
    }
  }, [dimensions])

  return (
    <motion.div
      ref={starsRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ height: Math.max(dimensions.height, window.innerHeight) }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
} 