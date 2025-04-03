'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { cursorEnabled, setCursorEnabled } = useCursor()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-hover"
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-gray-950/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white text-sm font-medium">Display Settings</h3>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="cursor-toggle" className="text-white text-sm cursor-hover">
                  Cursor Outline
                </label>
                <button 
                  id="cursor-toggle"
                  onClick={() => setCursorEnabled(!cursorEnabled)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full 
                    transition-all duration-300 ease-in-out cursor-hover
                    ${cursorEnabled 
                      ? 'bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/10 hover:bg-white/15'
                    }
                  `}
                  aria-checked={cursorEnabled}
                  role="switch"
                >
                  {/* Track glow effect */}
                  <div 
                    className={`
                      absolute inset-0 rounded-full transition-opacity duration-300
                      bg-gradient-to-r from-white/20 to-white/30
                      ${cursorEnabled ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                  
                  {/* Toggle handle */}
                  <div
                    className="relative w-full h-full"
                  >
                    <motion.div
                      initial={false}
                      animate={{ 
                        x: cursorEnabled ? "calc(100% - 1.25rem)" : "0rem"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35
                      }}
                      className={`
                        absolute left-0 top-0.5 h-5 w-5 rounded-full 
                        transform transition-colors duration-200
                        ${cursorEnabled 
                          ? 'bg-gray-950 shadow-[0_0_8px_rgba(0,0,0,0.2)]' 
                          : 'bg-white'
                        }
                      `}
                    >
                      {/* Inner circle indicator */}
                      <div className={`
                        absolute inset-1 rounded-full transition-opacity duration-200
                        ${cursorEnabled 
                          ? 'bg-white/10 opacity-100' 
                          : 'bg-black/5 opacity-0'
                        }
                      `} />
                    </motion.div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 