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
    <span className={`inline-block relative overflow-hidden ${className}`} style={{ minWidth: 'fit-content' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? 'hovered' : 'original'}
          className="inline-block whitespace-nowrap"
          initial={{ y: isHovered ? 20 : -20 }}
          animate={{ y: 0 }}
          exit={{ y: isHovered ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: i * 0.02,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
} 