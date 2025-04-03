'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import SettingsDropdown from '../ui/SettingsDropdown'
import AnimatedText from '../ui/AnimatedText'

export default function Navigation() {
  const pathname = usePathname()
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  
  useEffect(() => {
    // Simplified approach: directly use scroll position to determine background
    const detectBackgroundFromScroll = () => {
      // On home page, we check if we've scrolled enough to hit the white content section
      if (pathname === '/') {
        // Get viewport height
        const viewportHeight = window.innerHeight
        const scrollPosition = window.scrollY
        
        // Check if white section is visible based on known layout
        // ContentSection starts roughly at viewport height
        const isInWhiteSection = scrollPosition > (viewportHeight * 0.8)
        
        // Update state
        setIsOnDarkBackground(!isInWhiteSection)
      } else {
        // On other pages, we're typically starting with a dark background
        // You might need custom logic per page if they have different layouts
        const scrollPosition = window.scrollY
        setIsOnDarkBackground(scrollPosition < 200)
      }
    }
    
    // Initial detection
    detectBackgroundFromScroll()
    
    // Set up scroll listener
    window.addEventListener('scroll', detectBackgroundFromScroll)
    window.addEventListener('resize', detectBackgroundFromScroll)
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', detectBackgroundFromScroll)
      window.removeEventListener('resize', detectBackgroundFromScroll)
    }
  }, [pathname])
  
  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          {/* Left side */}
          <div className="flex-1 flex items-center">
            <Link 
              href="/" 
              className={`text-5xl font-luxurious tracking-wide transition-colors duration-300 overflow-hidden`}
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
          
          {/* Center - Settings Dropdown */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <SettingsDropdown />
          </div>
          
          {/* Right side */}
          <div className="flex-1 flex items-center justify-end space-x-8">
            <Link
              href="/about"
              className={`transition-all duration-300 overflow-hidden ${
                pathname === '/about' ? 'font-medium' : 'opacity-80'
              }`}
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
              className={`transition-all duration-300 overflow-hidden ${
                pathname === '/projects' ? 'font-medium' : 'opacity-80'
              }`}
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
              className={`transition-all duration-300 overflow-hidden ${
                pathname === '/contact' ? 'font-medium' : 'opacity-80'
              }`}
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