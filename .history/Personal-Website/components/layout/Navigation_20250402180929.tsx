'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useCycle } from 'framer-motion'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import { useCursor } from '@/context/CursorContext'
import AnimatedText from '@/components/ui/AnimatedText'
import { usePageTransition } from '@/components/ui/PageTransitionProvider'
import { useContact } from '@/context/ContactContext'

export default function Navigation() {
  const pathname = usePathname()
  const { isTransitioning, transitionToPage } = usePageTransition()
  const { lenis } = useLenisScroll()
  const { setCursorType } = useCursor()
  const { openContact } = useContact()
  
  const prevScrollY = useRef(0)
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, toggleMenu] = useCycle(false, true)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  
  // Determine if we're on a dark background page
  const darkBackgroundRoutes = ['/', '/about']
  const isOnDarkBackground = darkBackgroundRoutes.includes(pathname)
  
  useEffect(() => {
    if (!lenis) return
    
    const handleScroll = () => {
      const currentScrollY = lenis.scroll
      const isScrollingDown = currentScrollY > prevScrollY.current && currentScrollY > 100
      
      if (isScrollingDown !== !isVisible) {
        setIsVisible(!isScrollingDown)
      }
      
      prevScrollY.current = currentScrollY
    }
    
    // Listen for scroll
    lenis.on('scroll', handleScroll)
    
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, isVisible])
  
  // Handle link clicks with the page transition
  const handleNavLinkClick = (href: string, e: React.MouseEvent) => {
    if (pathname === href) return // Don't transition to the same page
    
    e.preventDefault()
    if (menuOpen) toggleMenu(0) // Close menu when navigating
    
    // Use the transition system
    transitionToPage(href)
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
            <a 
              href="/"
              onClick={(e) => handleNavLinkClick('/', e)}
              className={`text-4xl font-luxurious tracking-wide transition-colors duration-300 overflow-visible`}
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <AnimatedText
                text="Kai"
                isHovered={hoveredLink === 'home'}
                className={isOnDarkBackground ? 'text-white' : 'text-black'}
              />
            </a>
          </div>
          
          {/* Right side */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8">
              {['about', 'casual', 'professional', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  onClick={(e) => handleNavLinkClick(`/${item}`, e)}
                  className={`${
                    pathname === `/${item}` 
                      ? isOnDarkBackground ? 'text-white' : 'text-black' 
                      : isOnDarkBackground ? 'text-white/70' : 'text-black/70'
                  } hover:${isOnDarkBackground ? 'text-white' : 'text-black'} transition-colors duration-300 px-3 py-2 text-sm font-medium relative`}
                  onMouseEnter={() => {
                    setHoveredLink(item)
                    setCursorType('hover')
                  }}
                  onMouseLeave={() => {
                    setHoveredLink(null)
                    setCursorType('default')
                  }}
                >
                  <AnimatedText
                    text={item.charAt(0).toUpperCase() + item.slice(1)}
                    isHovered={hoveredLink === item}
                    className=""
                  />
                  
                  {pathname === `/${item}` && (
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 ${isOnDarkBackground ? 'bg-white' : 'bg-black'}`}
                      layoutId="navigation-underline"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => toggleMenu()}
              className={`${isOnDarkBackground ? 'text-white' : 'text-black'} focus:outline-none`}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              <span className="sr-only">Open menu</span>
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden ${isOnDarkBackground ? 'bg-gray-900' : 'bg-white'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['about', 'casual', 'professional', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  onClick={(e) => handleNavLinkClick(`/${item}`, e)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === `/${item}` 
                      ? isOnDarkBackground ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black' 
                      : isOnDarkBackground ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 