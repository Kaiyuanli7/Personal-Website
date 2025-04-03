'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose how you'd like to explore my work and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Professional Version */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <Link href="/professional" className="block">
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 border border-white/10 group-hover:border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">Professional</h2>
                <p className="text-gray-300 mb-6">
                  A clean, traditional portfolio showcasing my experience, skills, and achievements in a formal manner.
                </p>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span>View Professional Portfolio</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Casual Version */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group"
          >
            <Link href="/casual" className="block">
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 border border-white/10 group-hover:border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">Casual</h2>
                <p className="text-gray-300 mb-6">
                  An experimental, interactive experience with modern animations and creative design elements.
                </p>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span>View Casual Portfolio</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
