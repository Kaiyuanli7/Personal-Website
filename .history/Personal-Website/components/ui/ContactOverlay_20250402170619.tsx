'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { useClickAway } from '@/hooks/useClickAway'
import { useContact } from '@/context/ContactContext'

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

// Contact methods data
const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "kaiyuanli07@gmail.com",
    link: "mailto:kaiyuanli07@gmail.com"
  },
  {
    icon: "🔗",
    title: "LinkedIn",
    value: "linkedin.com/in/kaiyuanli",
    link: "https://linkedin.com/in/kaiyuanli"
  },
  {
    icon: "💻",
    title: "GitHub",
    value: "github.com/kaiyuanli7",
    link: "https://github.com/kaiyuanli7"
  }
]

export default function ContactOverlay() {
  const { isContactOpen, closeContact } = useContact()
  const color = useMotionValue(COLORS[0])
  const overlayRef = useRef<HTMLDivElement>(null)
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({ name: '', email: '', message: '' })
        setFormStatus('idle')
      }, 3000)
    }, 1500)
  }
  
  useEffect(() => {
    // Animate the aurora color
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [])

  // Close overlay when clicking outside
  useClickAway(overlayRef, closeContact)

  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`
  
  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isContactOpen])

  return (
    <AnimatePresence>
      {isContactOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={closeContact}
          />
          
          {/* Contact panel */}
          <motion.div
            ref={overlayRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              mass: 1,
              opacity: { duration: 0.4 }
            }}
            className="fixed top-0 right-0 h-full w-full sm:w-[550px] md:w-[650px] lg:w-[750px] bg-gray-950 z-50 overflow-y-auto shadow-2xl"
          >
            {/* Content container with smooth reveal animations */}
            <motion.div 
              className="relative h-full p-8 md:p-10 lg:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Close button */}
              <motion.button 
                onClick={closeContact}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-white/70 transition-colors"
                aria-label="Close contact overlay"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
              
              {/* Header */}
              <div className="pt-8 mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display"
                >
                  Get in Touch
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg text-white/80 max-w-xl"
                >
                  Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                  className="w-32 h-1 bg-white mt-6"
                  style={{ background: useMotionTemplate`linear-gradient(to right, ${color}, white)` }}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <motion.div 
                  className="space-y-8 mb-12 lg:mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
                    style={{ boxShadow }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 font-display">Send a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div 
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                      >
                        <label htmlFor="name" className="block text-white/80 font-medium mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                          placeholder="Your Name"
                          disabled={formStatus === 'submitting'}
                          required
                        />
                      </motion.div>
                      
                      <motion.div 
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                      >
                        <label htmlFor="email" className="block text-white/80 font-medium mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                          placeholder="your.email@example.com"
                          disabled={formStatus === 'submitting'}
                          required
                        />
                      </motion.div>
                      
                      <motion.div 
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                      >
                        <label htmlFor="message" className="block text-white/80 font-medium mb-2">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors resize-none"
                          placeholder="Tell me about your project or inquiry..."
                          disabled={formStatus === 'submitting'}
                          required
                        />
                      </motion.div>
                      
                      <motion.div 
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={formStatus === 'submitting' || formStatus === 'success'}
                          className={`w-full py-3 rounded-lg backdrop-blur-sm text-white font-medium transition-all ${
                            formStatus === 'success' 
                              ? 'bg-green-500/20 border border-green-500/30' 
                              : formStatus === 'submitting'
                                ? 'bg-white/10 border border-white/20 opacity-70'
                                : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 hover:border-white/30'
                          }`}
                        >
                          {formStatus === 'idle' && 'Send Message'}
                          {formStatus === 'submitting' && 'Sending...'}
                          {formStatus === 'success' && 'Message Sent!'}
                          {formStatus === 'error' && 'Try Again'}
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                </motion.div>
                
                {/* Contact Information */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div 
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
                    style={{ boxShadow }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 font-display">Contact Info</h2>
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <motion.a
                          key={method.title}
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center group"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl mr-4">
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{method.title}</h3>
                            <p className="text-white/70 group-hover:text-white/90 transition-colors">{method.value}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10" 
                    style={{ boxShadow }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 font-display">Location</h2>
                    <p className="text-white/70 mb-2">San Jose, California</p>
                    <p className="text-white/70">Available for remote work and collaborations worldwide</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 