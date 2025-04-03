'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  isHovered: boolean
}

export default function AnimatedText({ text, className = '', isHovered }: AnimatedTextProps) {
  return (
    <span className={`inline-block relative ${className}`} style={{ minWidth: 'fit-content' }}>
      <div className="relative overflow-hidden whitespace-nowrap">
        {/* Original text */}
        <motion.span
          className="inline-block"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -20 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={`original-${i}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{
                duration: 0.2,
                delay: i * 0.03,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>

        {/* Hovered text */}
        <motion.span
          className="absolute top-0 left-0"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={`hovered-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{
                duration: 0.2,
                delay: i * 0.03,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </div>
    </span>
  )
} 