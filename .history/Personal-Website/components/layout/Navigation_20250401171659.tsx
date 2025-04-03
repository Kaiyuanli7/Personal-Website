'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import AnimatedText from '../ui/AnimatedText'

export default function Navigation() {
  const pathname = usePathname()
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  
  useEffect(() => {
    // Show navigation immediately on non-home pages
    if (pathname !== '/') {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // On home page, show after 20% of viewport height is scrolled
      if (pathname === '/') {
        setIsVisible(scrollPosition > viewportHeight * 0.2)
      }

      // Background detection logic
      if (pathname === '/') {
        const isInWhiteSection = scrollPosition > (viewportHeight * 0.8)
        setIsOnDarkBackground(!isInWhiteSection)
      } else {
        setIsOnDarkBackground(scrollPosition < 200)
      }
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])
  
  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          {/* Left side */}
          <div className="flex-1 flex items-center">
            <Link 
              href="/" 
              className={`text-4xl font-luxurious tracking-wide transition-colors duration-300 overflow-visible`}
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="Kai"
                isHovered={hoveredLink === 'home'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </Link>
          </div>
          
          {/* Right side */}
          <div className="flex-1 flex items-center justify-end gap-8">
            <Link 
              href="/about"
              className={`text-lg transition-colors duration-300`}
              onMouseEnter={() => setHoveredLink('about')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="About"
                isHovered={hoveredLink === 'about'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </Link>
            <Link 
              href="/projects"
              className={`text-lg transition-colors duration-300`}
              onMouseEnter={() => setHoveredLink('projects')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="Projects"
                isHovered={hoveredLink === 'projects'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </Link>
            <Link 
              href="/contact"
              className={`text-lg transition-colors duration-300`}
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="Contact"
                isHovered={hoveredLink === 'contact'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 