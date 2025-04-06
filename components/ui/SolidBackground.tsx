'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function SolidBackground() {
  const { theme } = useTheme()

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500
                dark:bg-gradient-to-b dark:from-dark-background dark:to-dark-background
                bg-gradient-to-b from-light-background to-light-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
} 