'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor, CURSOR_COLORS, CursorColorType, TRAIL_COLORS, TrailColorType } from '@/context/CursorContext'

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    cursorEnabled, 
    setCursorEnabled, 
    cursorColor, 
    setCursorColor, 
    trailColor, 
    setTrailColor,
    trailEnabled,
    setTrailEnabled
  } = useCursor()
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

  // Color name display mapping
  const cursorColorNames: Record<CursorColorType, string> = {
    white: 'White',
    blue: 'Blue',
    green: 'Green',
    purple: 'Purple',
    pink: 'Pink'
  }

  // Trail color name display mapping
  const trailColorNames: Record<TrailColorType, string> = {
    red: 'Red',
    blue: 'Blue',
    green: 'Green',
    purple: 'Purple',
    pink: 'Pink'
  }
  
  // Static color classes for the buttons
  const cursorButtonColors = {
    white: 'bg-white',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500'
  }

  // Trail color button colors based on the base color
  const trailButtonColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500'
  }
  
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
            
            <div className="p-4 space-y-5">
              {/* Cursor Trail Toggle - Renamed to Normal Cursor */}
              <div className="flex items-center justify-between">
                <label htmlFor="trail-toggle" className="text-white text-sm cursor-hover">
                  Normal Cursor
                </label>
                <button 
                  id="trail-toggle"
                  onClick={() => setTrailEnabled(!trailEnabled)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full p-1
                    transition-all duration-300 ease-in-out cursor-hover
                    ${!trailEnabled 
                      ? 'bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/10 hover:bg-white/15'
                    }
                  `}
                  aria-checked={!trailEnabled}
                  role="switch"
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      x: !trailEnabled ? "20px" : "0px"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35
                    }}
                    className={`
                      h-4 w-4 rounded-full shadow-md
                      transform transition-colors duration-200
                      ${!trailEnabled 
                        ? 'bg-gray-950' 
                        : 'bg-white'
                      }
                    `}
                  >
                    <div className={`
                      absolute inset-1 rounded-full transition-opacity duration-200
                      ${!trailEnabled 
                        ? 'bg-white/10 opacity-100' 
                        : 'bg-black/5 opacity-0'
                      }
                    `} />
                  </motion.div>
                </button>
              </div>
              
              {/* Cursor Outline Toggle */}
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
              
              {/* Trail Color Selection - Only if trail is enabled */}
              {trailEnabled && (
                <div>
                  <p className="text-white text-sm mb-3">Cursor Trail Color</p>
                  <div className="flex flex-wrap gap-3">
                    {/* Ensure all colors are explicitly included for Tailwind */}
                    <div className="hidden bg-red-500 bg-blue-500 bg-green-500 bg-purple-500 bg-pink-500" />
                    
                    {(Object.keys(TRAIL_COLORS) as TrailColorType[]).map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setTrailColor(color);
                        }}
                        className={`
                          w-8 h-8 rounded-full transition-all duration-200
                          ${trailButtonColors[color]}
                          ${trailColor === color 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-950 scale-110' 
                            : 'opacity-70 hover:opacity-100'
                          }
                        `}
                        aria-label={`Set trail color to ${trailColorNames[color]}`}
                        title={trailColorNames[color]}
                      />
                    ))}
                  </div>
                  
                  {/* Current Selection Display */}
                  <div className="mt-2 flex items-center">
                    <div className="text-white/50 text-xs">
                      Current: <span className="text-white">{trailColorNames[trailColor]}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Cursor Color Selection - Only visible if cursor is enabled */}
              {cursorEnabled && (
                <div>
                  <p className="text-white text-sm mb-3">Cursor Outline Color</p>
                  <div className="flex flex-wrap gap-3">
                    {/* Ensure all colors are explicitly included for Tailwind */}
                    <div className="hidden bg-white bg-blue-500 bg-green-500 bg-purple-500 bg-pink-500" />
                    
                    {(Object.keys(CURSOR_COLORS) as CursorColorType[]).map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setCursorColor(color);
                        }}
                        className={`
                          w-8 h-8 rounded-full transition-all duration-200
                          ${cursorButtonColors[color]}
                          ${cursorColor === color 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-950 scale-110' 
                            : 'opacity-70 hover:opacity-100'
                          }
                        `}
                        aria-label={`Set cursor outline color to ${cursorColorNames[color]}`}
                        title={cursorColorNames[color]}
                      />
                    ))}
                  </div>
                  
                  {/* Current Selection Display */}
                  <div className="mt-2 flex items-center">
                    <div className="text-white/50 text-xs">
                      Current: <span className="text-white">{cursorColorNames[cursorColor]}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 