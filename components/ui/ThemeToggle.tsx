'use client'

import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  mini?: boolean
}

export default function ThemeToggle({ className = '', mini = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`${className} ${mini ? 'p-2' : 'p-3'} rounded-full transition-colors relative
        dark:bg-dark-background/20 dark:hover:bg-dark-background/40
        bg-light-background/20 hover:bg-light-background/40
        dark:text-dark-foreground text-light-foreground
        focus:outline-none
        hover:ring-gradient-light dark:hover:ring-gradient-dark`}
      aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {theme === 'dark' ? (
        <Sun size={mini ? 18 : 22} className="text-yellow-300" />
      ) : (
        <Moon size={mini ? 18 : 22} className="text-dark-accentSecondary" />
      )}
    </motion.button>
  )
} 