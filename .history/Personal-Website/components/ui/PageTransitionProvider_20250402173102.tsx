'use client'

import { ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import PageTransition from './PageTransition'

interface PageTransitionProviderProps {
  children: ReactNode
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        <main>{children}</main>
      </PageTransition>
    </AnimatePresence>
  )
} 