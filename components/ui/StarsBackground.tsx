'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!starsRef.current) return

    const createStar = (size: number = 1, opacity: number = 0.5) => {
      const star = document.createElement('div')
      star.className = 'absolute bg-white rounded-full'
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
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
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.transform = `rotate(${Math.random() * 60 - 30}deg)`
      // Add glowing effect
      star.style.background = 'linear-gradient(90deg, transparent, #fff, transparent)'
      star.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff'
      
      // Add a shooting animation
      const duration = Math.random() * 10 + 5
      star.style.animation = `shoot ${duration}s linear infinite`
      star.style.animationDelay = `-${Math.random() * duration}s`
      
      return star
    }

    // Create layers of stars with reduced counts for better performance
    const distantStars = Array.from({ length: 80 }, () => createStar(0.8, 0.3))
    const backgroundStars = Array.from({ length: 60 }, () => createStar(1.2, 0.6))
    const foregroundStars = Array.from({ length: 40 }, () => createStar(2, 0.9))
    const shootingStars = Array.from({ length: 15 }, createShootingStar)
    
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
      distantStars.forEach(star => star.remove())
      backgroundStars.forEach(star => star.remove())
      foregroundStars.forEach(star => star.remove())
      shootingStars.forEach(star => star.remove())
      style.remove()
    }
  }, [])

  // Create transform values using framer-motion's built-in transforms for better performance
  const distantY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const distantX = useTransform(scrollYProgress, [0, 1], [0, 20])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const backgroundX = useTransform(scrollYProgress, [0, 1], [0, 50])
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const foregroundX = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  useEffect(() => {
    if (!starsRef.current) return

    // Select star layers
    const distantStars = starsRef.current.querySelectorAll('div:nth-child(-n+80)')
    const backgroundStars = starsRef.current.querySelectorAll('div:nth-child(n+81):nth-child(-n+140)')
    const foregroundStars = starsRef.current.querySelectorAll('div:nth-child(n+141):nth-child(-n+180)')
    
    const updateStars = () => {
      const distantYValue = distantY.get()
      const distantXValue = distantX.get()
      const backgroundYValue = backgroundY.get()
      const backgroundXValue = backgroundX.get()
      const foregroundYValue = foregroundY.get()
      const foregroundXValue = foregroundX.get()
      
      // Distant stars (minimal movement)
      distantStars.forEach((star, i) => {
        const htmlStar = star as HTMLElement
        const direction = i % 2 // Simplified: just two directions
        const yOffset = distantYValue * (direction === 0 ? 1 : -1)
        const xOffset = distantXValue * (i % 4 < 2 ? 1 : -1)
        htmlStar.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })

      // Background stars (medium speed)
      backgroundStars.forEach((star, i) => {
        const htmlStar = star as HTMLElement
        const direction = i % 2
        const yOffset = backgroundYValue * (direction === 0 ? 1 : -1)
        const xOffset = backgroundXValue * (i % 4 < 2 ? 1 : -1)
        htmlStar.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })

      // Foreground stars (faster)
      foregroundStars.forEach((star, i) => {
        const htmlStar = star as HTMLElement
        const direction = i % 2
        const yOffset = foregroundYValue * (direction === 0 ? 1 : -1)
        const xOffset = foregroundXValue * (i % 4 < 2 ? 1 : -1)
        htmlStar.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    const unsubscribe = scrollYProgress.on('change', updateStars)
    
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, distantX, distantY, backgroundX, backgroundY, foregroundX, foregroundY])

  return (
    <motion.div
      ref={starsRef}
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
} 