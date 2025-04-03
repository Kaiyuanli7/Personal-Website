'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import PageTransition from './PageTransition'

interface PageTransitionProviderProps {
  children: ReactNode
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isFirstMount, setIsFirstMount] = useState(true)
  
  // Create a key that changes on route change
  const routeKey = pathname + searchParams.toString()
  
  // Skip initial animation on first mount
  useEffect(() => {
    // After first mount, set to false
    if (isFirstMount) setIsFirstMount(false)
  }, [isFirstMount])
  
  return (
    <AnimatePresence mode="wait" initial={isFirstMount}>
      <PageTransition key={routeKey}>
        <main>{children}</main>
      </PageTransition>
    </AnimatePresence>
  )
} 