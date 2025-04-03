'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export default function Typewriter({ text, className = '', delay = 0, speed = 0.05 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const startTyping = () => {
      setIsTyping(true)
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(typeNextChar, speed * 1000)
        } else {
          setIsTyping(false)
        }
      }
      typeNextChar()
    }

    timeout = setTimeout(startTyping, delay * 1000)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [text, delay, speed])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </motion.span>
  )
} 