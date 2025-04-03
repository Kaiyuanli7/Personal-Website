'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// Available cursor colors
export const CURSOR_COLORS = {
  white: 'border-white',
  blue: 'border-blue-500',
  green: 'border-green-500',
  purple: 'border-purple-500',
  pink: 'border-pink-500',
}

// Available trail colors
export const TRAIL_COLORS = {
  red: [[255, 61, 61], [243, 160, 160]],    // Default red
  blue: [[61, 61, 255], [160, 160, 243]],   // Blue
  green: [[61, 255, 61], [160, 243, 160]],  // Green
  purple: [[163, 61, 255], [200, 160, 243]], // Purple
  pink: [[255, 61, 213], [243, 160, 231]]   // Pink
}

export type CursorColorType = keyof typeof CURSOR_COLORS
export type TrailColorType = keyof typeof TRAIL_COLORS

interface CursorContextType {
  isHovering: boolean
  setIsHovering: (value: boolean) => void
  cursorEnabled: boolean
  setCursorEnabled: (value: boolean) => void
  cursorColor: CursorColorType
  setCursorColor: (value: CursorColorType) => void
  trailColor: TrailColorType
  setTrailColor: (value: TrailColorType) => void
  trailEnabled: boolean
  setTrailEnabled: (value: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [trailEnabled, setTrailEnabled] = useState(false)
  const [trailColor, setTrailColor] = useState<TrailColorType>('green')
  const [cursorColor, setCursorColor] = useState<CursorColorType>('white')
  
  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cursorEnabled) {
        localStorage.setItem('cursorEnabled', 'true')
      } else {
        localStorage.setItem('cursorEnabled', 'false')
      }
      
      if (trailEnabled) {
        localStorage.setItem('trailEnabled', 'true')
      } else {
        localStorage.setItem('trailEnabled', 'false')
      }
      
      localStorage.setItem('cursorColor', cursorColor)
      localStorage.setItem('trailColor', trailColor)
    }
  }, [cursorEnabled, cursorColor, trailColor, trailEnabled])
  
  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCursorEnabled = localStorage.getItem('cursorEnabled')
      if (savedCursorEnabled === 'true') {
        setCursorEnabled(true)
      }
      
      const savedTrailEnabled = localStorage.getItem('trailEnabled')
      if (savedTrailEnabled === 'false') {
        setTrailEnabled(false)
      }
      
      const savedCursorColor = localStorage.getItem('cursorColor') as CursorColorType
      if (savedCursorColor && CURSOR_COLORS[savedCursorColor]) {
        setCursorColor(savedCursorColor)
      }

      const savedTrailColor = localStorage.getItem('trailColor') as TrailColorType
      if (savedTrailColor && TRAIL_COLORS[savedTrailColor]) {
        setTrailColor(savedTrailColor)
      }
    }
  }, [])

  return (
    <CursorContext.Provider value={{ 
      isHovering, 
      setIsHovering, 
      cursorEnabled, 
      setCursorEnabled,
      cursorColor,
      setCursorColor,
      trailColor,
      setTrailColor,
      trailEnabled,
      setTrailEnabled
    }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
} 