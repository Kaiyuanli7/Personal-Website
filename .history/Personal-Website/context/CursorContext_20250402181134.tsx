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

export type CursorColorType = keyof typeof CURSOR_COLORS

interface CursorContextType {
  isHovering: boolean
  setIsHovering: (value: boolean) => void
  cursorEnabled: boolean
  setCursorEnabled: (value: boolean) => void
  cursorColor: CursorColorType
  setCursorColor: (value: CursorColorType) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [cursorColor, setCursorColor] = useState<CursorColorType>('white')
  
  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cursorEnabled) {
        localStorage.setItem('cursorEnabled', 'true')
      } else {
        localStorage.setItem('cursorEnabled', 'false')
      }
      
      localStorage.setItem('cursorColor', cursorColor)
    }
  }, [cursorEnabled, cursorColor])
  
  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCursorEnabled = localStorage.getItem('cursorEnabled')
      if (savedCursorEnabled === 'true') {
        setCursorEnabled(true)
      }
      
      const savedCursorColor = localStorage.getItem('cursorColor') as CursorColorType
      if (savedCursorColor && CURSOR_COLORS[savedCursorColor]) {
        setCursorColor(savedCursorColor)
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
      setCursorColor
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