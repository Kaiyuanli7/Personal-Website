'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import AnimatedText from '../ui/AnimatedText'
import { useContact } from '@/context/ContactContext'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { openContact } = useContact()
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
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
    
    // Initial checks
    checkMobile()
    handleScroll()
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [pathname])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
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
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${isOnDarkBackground ? 'text-white' : 'text-black'} hover:bg-gray-100/10`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
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
            <button 
              onClick={openContact}
              className={`text-lg transition-colors duration-300`}
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="Contact"
                isHovered={hoveredLink === 'contact'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </button>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden transition-all duration-300 ease-in-out">
            <div className={`px-2 pt-2 pb-4 space-y-4 backdrop-blur-lg rounded-lg mb-2 ${
              isOnDarkBackground ? 'bg-black/70' : 'bg-white/70'
            }`}>
              <Link 
                href="/about"
                className={`block px-3 py-2 rounded-md text-xl text-center ${
                  isOnDarkBackground ? 'text-white hover:bg-gray-700/50' : 'text-black hover:bg-gray-200/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/projects"
                className={`block px-3 py-2 rounded-md text-xl text-center ${
                  isOnDarkBackground ? 'text-white hover:bg-gray-700/50' : 'text-black hover:bg-gray-200/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <button 
                onClick={() => {
                  openContact();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-xl text-center ${
                  isOnDarkBackground ? 'text-white hover:bg-gray-700/50' : 'text-black hover:bg-gray-200/50'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 