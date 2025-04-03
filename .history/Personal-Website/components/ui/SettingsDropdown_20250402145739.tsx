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
        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-hover"
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
            className="absolute bottom-full mb-2 right-0 w-64 bg-gray-950/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg z-50 overflow-hidden"
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
                    relative inline-flex h-6 w-11 items-center rounded-full p-1
                    transition-all duration-300 ease-in-out cursor-hover
                    ${cursorEnabled 
                      ? 'bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/10 hover:bg-white/15'
                    }
                  `}
                  aria-checked={cursorEnabled}
                  role="switch"
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      x: cursorEnabled ? "20px" : "0px"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35
                    }}
                    className={`
                      h-4 w-4 rounded-full shadow-md
                      transform transition-colors duration-200
                      ${cursorEnabled 
                        ? 'bg-gray-950' 
                        : 'bg-white'
                      }
                    `}
                  >
                    <div className={`
                      absolute inset-1 rounded-full transition-opacity duration-200
                      ${cursorEnabled 
                        ? 'bg-white/10 opacity-100' 
                        : 'bg-black/5 opacity-0'
                      }
                    `} />
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 