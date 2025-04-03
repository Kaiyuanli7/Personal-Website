'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CursorContextType {
  isHovering: boolean
  setIsHovering: (value: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <CursorContext.Provider value={{ isHovering, setIsHovering }}>
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