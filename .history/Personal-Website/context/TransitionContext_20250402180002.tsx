'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

type TransitionContextType = {
  isTransitioning: boolean
  completeTransition: () => void
  startTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  completeTransition: () => {},
  startTransition: () => {}
})

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const completeTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        completeTransition,
        startTransition
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
} 