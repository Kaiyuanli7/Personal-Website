'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import AnimatedText from '../ui/AnimatedText'
import { useContact } from '@/context/ContactContext'
import { Menu, X, Github, Instagram, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
    
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      document.body.style.overflow = ''
    }
  }, [pathname, isMobileMenuOpen])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  // Link animation variants
  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1]
      }
    }
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
              className={`text-4xl font-luxurious tracking-wide transition-colors duration-300 overflow-visible z-[60]`}
              onMouseEnter={() => setHoveredLink('home')}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AnimatedText
                text="Kai"
                isHovered={hoveredLink === 'home'}
                className={isOnDarkBackground || isMobileMenuOpen ? 'text-white' : 'text-black'}
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-full ${
                isOnDarkBackground || isMobileMenuOpen ? 'text-white' : 'text-black'
              } hover:bg-gray-100/10 z-[60] ${isMobileMenuOpen ? 'bg-white/10' : ''}`}
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
        
        {/* Fullscreen Mobile Menu with Opaque Background */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 md:hidden z-50 flex flex-col"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {/* Solid Background */}
              <motion.div 
                className={`absolute inset-0 ${
                  isOnDarkBackground 
                    ? 'bg-gray-950' 
                    : 'bg-gray-100'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Content Container */}
              <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-10">
                <div className="w-full max-w-md space-y-10 py-10">
                  {/* Main Navigation Links */}
                  <motion.div className="space-y-8" variants={linkVariants}>
                    <Link 
                      href="/about"
                      className={`group flex items-center justify-between w-full px-4 py-4 rounded-xl text-3xl font-medium ${
                        isOnDarkBackground ? 'text-white' : 'text-gray-800'
                      } hover:scale-105 transition-all duration-300`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>About</span>
                      <span className={`transform group-hover:translate-x-1 transition-transform ${
                        isOnDarkBackground ? 'text-white/50' : 'text-gray-500'
                      }`}>→</span>
                    </Link>
                    
                    <motion.div variants={linkVariants}>
                      <Link 
                        href="/projects"
                        className={`group flex items-center justify-between w-full px-4 py-4 rounded-xl text-3xl font-medium ${
                          isOnDarkBackground ? 'text-white' : 'text-gray-800'
                        } hover:scale-105 transition-all duration-300`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Projects</span>
                        <span className={`transform group-hover:translate-x-1 transition-transform ${
                          isOnDarkBackground ? 'text-white/50' : 'text-gray-500'
                        }`}>→</span>
                      </Link>
                    </motion.div>
                    
                    <motion.div variants={linkVariants}>
                      <button 
                        onClick={() => {
                          openContact();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`group flex items-center justify-between w-full px-4 py-4 rounded-xl text-3xl font-medium ${
                          isOnDarkBackground ? 'text-white' : 'text-gray-800'
                        } hover:scale-105 transition-all duration-300`}
                      >
                        <span>Contact</span>
                        <span className={`transform group-hover:translate-x-1 transition-transform ${
                          isOnDarkBackground ? 'text-white/50' : 'text-gray-500'
                        }`}>→</span>
                      </button>
                    </motion.div>
                  </motion.div>
                  
                  {/* Social Links */}
                  <motion.div 
                    className="pt-8 border-t border-gray-800/20 space-y-4"
                    variants={linkVariants}
                  >
                    <h3 className={`text-sm uppercase font-bold mb-6 ${
                      isOnDarkBackground ? 'text-white/50' : 'text-gray-500'
                    }`}>Connect</h3>
                    
                    <div className="flex gap-6">
                      <a 
                        href="https://github.com/Kaiyuanli7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-4 rounded-full ${
                          isOnDarkBackground 
                            ? 'bg-white/10 text-white hover:bg-white/20' 
                            : 'bg-black/10 text-gray-700 hover:bg-black/20'
                        } transition-all duration-300 hover:scale-110`}
                        aria-label="GitHub Profile"
                      >
                        <Github size={24} />
                      </a>
                      
                      <a 
                        href="https://www.instagram.com/kaiyuansz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-4 rounded-full ${
                          isOnDarkBackground 
                            ? 'bg-white/10 text-white hover:bg-white/20' 
                            : 'bg-black/10 text-gray-700 hover:bg-black/20'
                        } transition-all duration-300 hover:scale-110`}
                        aria-label="Instagram Profile"
                      >
                        <Instagram size={24} />
                      </a>
                      
                      <a 
                        href="https://steamcommunity.com/profiles/76561199062478777/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-4 rounded-full ${
                          isOnDarkBackground 
                            ? 'bg-white/10 text-white hover:bg-white/20' 
                            : 'bg-black/10 text-gray-700 hover:bg-black/20'
                        } transition-all duration-300 hover:scale-110`}
                        aria-label="Steam Profile"
                      >
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 