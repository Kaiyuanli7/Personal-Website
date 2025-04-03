'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface CursorContextType {
  isHovering: boolean
  setIsHovering: (value: boolean) => void
  cursorEnabled: boolean
  setCursorEnabled: (value: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(true)
  
  // Save preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cursorEnabled) {
        localStorage.setItem('cursorEnabled', 'true')
      } else {
        localStorage.setItem('cursorEnabled', 'false')
      }
    }
  }, [cursorEnabled])
  
  // Load preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('cursorEnabled')
      if (savedPreference === 'false') {
        setCursorEnabled(false)
      }
    }
  }, [])

  return (
    <CursorContext.Provider value={{ isHovering, setIsHovering, cursorEnabled, setCursorEnabled }}>
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