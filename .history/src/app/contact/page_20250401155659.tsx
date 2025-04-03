'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'
import TypewriterText from '@/components/ui/TypewriterText'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

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

export default function Contact() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const color = useMotionValue(COLORS[0])
  const formRef = useRef<HTMLDivElement>(null)
  
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
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values for parallax elements
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  
  useEffect(() => {
    if (!sectionRef.current) return

    // Initially hide the section
    gsap.set(sectionRef.current, {
      opacity: 0,
      y: 50,
    })

    // Show the section when page loads
    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Animate the aurora color
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [lenis, color])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
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

  return (
    <motion.main
      ref={sectionRef}
      style={{
        backgroundImage,
      }}
      className="min-h-screen overflow-hidden bg-gray-950"
    >
      <div className="opacity-50">
        <StarsBackground />
      </div>
      
      {/* Header with parallax effect */}
      <div className="relative z-10 pt-24 mb-16">
        <motion.div
          style={{ y: headerY }}
          className="container mx-auto px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-display"
          >
            <TypewriterText 
              text="Get in Touch"
              delay={0.2}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
          >
            <TypewriterText 
              text="Have a project in mind or want to discuss potential opportunities? I'd love to hear from you."
              delay={0.8}
              duration={0.03}
            />
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-1 bg-white mx-auto"
          />
        </motion.div>
      </div>
      
      {/* Contact Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Contact Form */}
              <motion.div 
                ref={formRef} 
                className="lg:w-2/3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div 
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
                  style={{ boxShadow }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 font-display">
                    <TypewriterText 
                      text="Send a Message"
                      delay={0.4}
                    />
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        rows={6}
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
                className="lg:w-1/3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="space-y-8">
                  <motion.div 
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
                    style={{ boxShadow }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-6 font-display">
                      <TypewriterText 
                        text="Contact Info"
                        delay={0.6}
                      />
                    </h2>
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <motion.a
                          key={method.title}
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mr-4">
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
                    className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
                    style={{ boxShadow }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 font-display">
                      <TypewriterText 
                        text="Location"
                        delay={0.8}
                      />
                    </h2>
                    <p className="text-white/70 mb-2">
                      <TypewriterText 
                        text="San Jose, California"
                        delay={1}
                      />
                    </p>
                    <p className="text-white/70">
                      <TypewriterText 
                        text="Available for remote work and collaborations worldwide"
                        delay={1.2}
                        duration={0.03}
                      />
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-0" />
    </motion.main>
  )
} 