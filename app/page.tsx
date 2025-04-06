'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, Palette, Laptop, Sparkles, Code } from "lucide-react"
import dynamic from 'next/dynamic'

const SolidBackground = dynamic(() => import('@/components/ui/SolidBackground'), {
  ssr: false,
  loading: () => null,
})

export default function LandingPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  
  // Text state management
  const [showOptions, setShowOptions] = useState(false)
  
  // Animation values
  const y = useMotionValue(0)
  
  useEffect(() => {
    // Prefetch the portfolio pages for faster navigation
    router.prefetch('/professional')
    router.prefetch('/casual')
    
    // Add class to body to hide footer
    document.body.classList.add('hide-footer')
    
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      
      const handleResize = () => setWindowHeight(window.innerHeight)
      window.addEventListener('resize', handleResize)
      
      // Show options after a delay
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 500);
      
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer)
        // Remove class when component unmounts
        document.body.classList.remove('hide-footer')
      }
    }
  }, [router])
  
  return (
    <main 
      ref={containerRef} 
      className="h-screen relative overflow-hidden transition-colors duration-300 dark:bg-dark-background bg-light-background"
    >
      {/* Solid background */}
      <div className="absolute inset-0 z-0">
        <SolidBackground />
      </div>

      {/* Initial hero section */}
      <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden relative z-10">
        <motion.div
          style={{ 
            y: y,
            perspective: 1000,
          }}
          className="flex flex-col items-center justify-center relative z-10"
        >
          {/* Options that appear after animation */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                className="w-full flex items-center justify-center px-4"
              >
                <div className="max-w-7xl w-full">
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <h1 className="text-6xl md:text-6xl font-bold dark:text-white text-light-foreground mb-2 transition-colors duration-300">
                      Viewing Experience
                    </h1>
                  </motion.div>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 lg:gap-6 py-8">
                    {/* Professional Portfolio Card */}
                    <GridItem
                      area="md:[grid-area:1/1/3/7]"
                      icon={<Box className="h-4 w-4 dark:text-white text-light-foreground" />}
                      title="Professional"
                      description="A clean, traditional portfolio showcasing my skills, experience, and achievements in a formal manner."
                      href="/professional"
                      buttonText="View Professional →"
                    />
                    
                    {/* Casual Portfolio Card */}
                    <GridItem
                      area="md:[grid-area:1/7/3/13]"
                      icon={<Palette className="h-4 w-4 dark:text-white text-light-foreground" />}
                      title="Casual"
                      description="An experimental, interactive experience with modern animations and creative design elements."
                      href="/casual"
                      buttonText="View Casual →"
                    />
                    

                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  href: string;
  buttonText: string;
}

const GridItem = ({ area, icon, title, description, href, buttonText }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <Link href={href} className="block h-full">
        <div className="relative h-full rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 dark:bg-black/40 bg-white/60 backdrop-blur-sm transition-colors duration-300">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-white/5 bg-light-accent/5 transition-colors duration-300">
                {icon}
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl font-semibold font-sans tracking-tight md:text-2xl dark:text-white text-light-foreground transition-colors duration-300">
                  {title}
                </h3>
                <p className="font-sans text-sm md:text-base dark:text-white/70 text-light-foreground/70 transition-colors duration-300">
                  {description}
                </p>
              </div>
              <div className="dark:text-white/80 text-light-foreground/80 dark:hover:text-white hover:text-light-foreground text-sm font-medium transition-colors">
                {buttonText}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
