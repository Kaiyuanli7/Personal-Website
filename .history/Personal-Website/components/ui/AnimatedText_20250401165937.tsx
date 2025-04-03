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
    <span 
      className={`inline-block relative ${className}`} 
      style={{ 
        minWidth: 'fit-content',
        padding: '0 4px', // Add padding to prevent cutting
      }}
    >
      <div 
        className="relative overflow-visible whitespace-nowrap" 
        style={{ margin: '0 -4px' }} // Negative margin to compensate for padding
      >
        {/* Original text */}
        <span className="block">
          {text.split('').map((char, i) => (
            <motion.span
              key={`original-${i}`}
              initial={{ opacity: 1, y: 0 }}
              animate={{ 
                opacity: isHovered ? 0 : 1,
                y: isHovered ? -20 : 0
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                ease: "easeInOut"
              }}
              className="inline-block"
              style={{ 
                display: 'inline-block',
                width: 'auto',
                marginLeft: char === ' ' ? '0.25em' : '0',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>

        {/* Hovered text */}
        <span className="absolute top-0 left-0 w-full block">
          {text.split('').map((char, i) => (
            <motion.span
              key={`hovered-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                ease: "easeInOut"
              }}
              className="inline-block"
              style={{ 
                display: 'inline-block',
                width: 'auto',
                marginLeft: char === ' ' ? '0.25em' : '0',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </div>
    </span>
  )
} 