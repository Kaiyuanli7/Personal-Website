'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  
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
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className={`text-4xl font-luxurious tracking-wide transition-colors duration-300 ${
                isOnDarkBackground ? 'text-white' : 'text-black'
              }`}
            >
              Kai
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/about"
              className={`transition-all duration-300 hover:opacity-80 ${
                isOnDarkBackground 
                  ? 'text-white' 
                  : 'text-black'
              } ${
                pathname === '/about' ? 'font-medium' : 'opacity-80'
              }`}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`transition-all duration-300 hover:opacity-80 ${
                isOnDarkBackground 
                  ? 'text-white' 
                  : 'text-black'
              } ${
                pathname === '/projects' ? 'font-medium' : 'opacity-80'
              }`}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className={`transition-all duration-300 hover:opacity-80 ${
                isOnDarkBackground 
                  ? 'text-white' 
                  : 'text-black'
              } ${
                pathname === '/contact' ? 'font-medium' : 'opacity-80'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 