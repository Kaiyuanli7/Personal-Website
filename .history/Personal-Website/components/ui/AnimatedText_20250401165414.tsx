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
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        {/* Original text */}
        <motion.span
          key="original"
          className="inline-block"
          initial={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          animate={{ y: isHovered ? -20 : 0, opacity: isHovered ? 0 : 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'inline-block' }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={`original-${i}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
              }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>

        {/* Hovered text */}
        {isHovered && (
          <motion.span
            key="hovered"
            className="absolute inset-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {text.split('').map((char, i) => (
              <motion.span
                key={`hovered-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
} 