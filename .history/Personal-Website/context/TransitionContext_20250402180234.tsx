'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'

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
    // Add transitioning class to body to disable scrolling
    document.documentElement.classList.add('transitioning')
    document.body.classList.add('transitioning')
  }, [])

  const completeTransition = useCallback(() => {
    setIsTransitioning(false)
    // Remove transitioning class when complete
    document.documentElement.classList.remove('transitioning')
    document.body.classList.remove('transitioning')
  }, [])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('transitioning')
      document.body.classList.remove('transitioning')
    }
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