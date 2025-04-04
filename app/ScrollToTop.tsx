'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'

export default function ScrollToTop() {
  const pathname = usePathname()
  const { lenis } = useLenisScroll()

  // This effect runs when the pathname changes
  useEffect(() => {
    // Scroll to top when the route changes
    if (lenis) {
      // Use lenis scroll for smooth behavior
      lenis.scrollTo(0, { immediate: true })
      console.log('Scrolled to top using Lenis on navigation to:', pathname)
    } else {
      // Fallback to window.scrollTo
      window.scrollTo(0, 0)
      console.log('Scrolled to top using window.scrollTo on navigation to:', pathname)
    }
  }, [pathname, lenis])

  // This component doesn't render anything visible
  return null
} 