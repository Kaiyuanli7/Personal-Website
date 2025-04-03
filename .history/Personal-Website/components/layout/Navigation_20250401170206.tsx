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
              className="relative group"
              onMouseEnter={() => setHoveredLink('Kai')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <AnimatedText
                text="Kai"
                isHovered={hoveredLink === 'Kai'}
                className={`text-4xl font-luxurious tracking-wide transition-colors duration-300 overflow-visible`}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
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
              className="relative group"
              onMouseEnter={() => setHoveredLink('About')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <AnimatedText
                text="About"
                isHovered={hoveredLink === 'About'}
                className="text-lg font-medium tracking-wide"
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/projects"
              className="relative group"
              onMouseEnter={() => setHoveredLink('Projects')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <AnimatedText
                text="Projects"
                isHovered={hoveredLink === 'Projects'}
                className="text-lg font-medium tracking-wide"
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/contact"
              className="relative group"
              onMouseEnter={() => setHoveredLink('Contact')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <AnimatedText
                text="Contact"
                isHovered={hoveredLink === 'Contact'}
                className="text-lg font-medium tracking-wide"
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 