'use client'

import { motion } from 'framer-motion'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import dynamic from 'next/dynamic'
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useContact } from '@/context/ContactContext'

// Dynamically import background
const SolidBackground = dynamic(() => import('@/components/ui/SolidBackground'), {
  ssr: false,
  loading: () => null,
})

// We don't need actual image paths anymore, just pass empty strings as placeholders
// The number of items determines how many project cards will be shown
const projectPlaceholders = Array(12).fill("");

export default function Projects() {
  // Get the contact context to open the sidebar
  const { openContact } = useContact()

  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-300 dark:bg-dark-background bg-light-background">
      {/* Background elements */}
      <div className="absolute inset-0">
        <SolidBackground />
      </div>
      
      {/* Header section */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold dark:text-white text-light-foreground mb-6 font-display"
          >
            My Projects
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-1 dark:bg-gradient-accent-dark bg-gradient-accent-light mx-auto"
          />
        </div>
      </div>
      
      {/* Projects Section with 3D Marquee - Centered */}
      <div className="relative z-10 py-2">
        <div className="container mx-auto px-6 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full"
          >
            {/* Ensure ThreeDMarquee is centered */}
            <div className="flex justify-center">
              <ThreeDMarquee cardCount={12}/>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16 mb-8"
            >
              <p className="dark:text-white/80 text-light-foreground/80 text-lg max-w-2xl mx-auto transition-colors duration-300">
                These are placeholder cards for my upcoming projects. Check back soon for more details!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="relative z-10 py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold dark:text-white text-light-foreground mb-6 font-display transition-colors duration-300"
          >
            Interested in Working Together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl dark:text-white/80 text-light-foreground/80 max-w-2xl mx-auto mb-10 transition-colors duration-300"
          >
            Let's build something amazing together
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button onClick={openContact} size="lg">Contact Me</Button>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 dark:bg-gradient-to-t dark:from-dark-background dark:to-transparent bg-gradient-to-t from-light-background to-transparent z-0 transition-colors duration-300" />
    </main>
  )
}