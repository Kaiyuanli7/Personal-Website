'use client'

import { motion } from 'framer-motion'
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function ProfessionalPortfolio() {
  return (
    <main className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20 mb-12">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative rounded-xl border-white/10 p-8 bg-black/40 backdrop-blur-sm">
              <h1 className="text-4xl font-bold text-white mb-4">Professional Portfolio</h1>
              <p className="text-white/80">Coming soon - A clean, professional portfolio showcasing my experience and achievements.</p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative h-full rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-3">Experience</h2>
                <p className="text-white/70">Coming soon</p>
              </div>
            </div>
            
            <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative h-full rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-3">Education</h2>
                <p className="text-white/70">Coming soon</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
} 