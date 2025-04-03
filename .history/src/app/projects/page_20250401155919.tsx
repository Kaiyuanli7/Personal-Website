'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/src/context/ScrollContext'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const StarsBackground = dynamic(() => import('@/src/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

// Project data for the portfolio
const projects = [
  {
    title: "Song Sensei",
    description: "A song recommendation system built during AI Camp that uses Spotify and Cyanite APIs to analyze music patterns and suggest similar songs.",
    tags: ["Python", "API Integration", "Machine Learning"],
    category: "AI Camp Projects",
    image: "/images/projects/music-ai.jpg" // Add placeholder image
  },
  {
    title: "AI Pickup Lines Generator",
    description: "A web application that generates creative pickup lines using Hugging Face models, showcasing natural language processing capabilities.",
    tags: ["React", "Hugging Face", "NLP"],
    category: "AI Camp Projects",
    image: "/images/projects/nlp-app.jpg" // Add placeholder image
  },
  {
    title: "Stock Market Analysis",
    description: "Developed and deployed Python-based market analysis algorithms for technical trading, implementing VWAP, RSI, and MACD indicators.",
    tags: ["Python", "Financial Analysis", "Trading Algorithms"],
    category: "Professional Experience",
    image: "/images/projects/stock-market.jpg" // Add placeholder image
  },
  {
    title: "Phanta Field App",
    description: "Contributed to the development and successful launch of an image generation application on the Apple App Store during an internship.",
    tags: ["iOS", "GitHub", "App Store"],
    category: "Professional Experience",
    image: "/images/projects/mobile-app.jpg" // Add placeholder image
  }
]

export default function Projects() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const color = useMotionValue(COLORS[0])
  
  // Setup refs for project sections to apply parallax
  const headerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  
  // Setup parallax scrolling for the projects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // Create parallax scroll effects for sections
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
  
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
      <div ref={headerRef} className="relative z-10 min-h-[60vh] flex items-center justify-center">
        <motion.div
          style={{ 
            y: headerY,
            opacity: headerOpacity
          }}
          className="container mx-auto px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-display"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
          >
            A showcase of my work spanning AI, finance, and web development
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-1 bg-white mx-auto"
          />
        </motion.div>
      </div>
      
      {/* Projects Section */}
      <div ref={projectsRef} className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group backdrop-blur-lg bg-white/5 rounded-2xl overflow-hidden border border-white/10 h-full"
                  style={{ boxShadow }}
                >
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* If you have actual images, uncomment this */}
                      {/* <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      /> */}
                    </motion.div>
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* View Project Button */}
                  <div className="p-6 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-white border border-white/10 hover:border-white/20 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Featured Project with Parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-5xl mx-auto mt-32 backdrop-blur-lg bg-white/5 rounded-2xl overflow-hidden border border-white/10"
            style={{ boxShadow }}
          >
            <div className="p-10">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-6">Featured Project</h2>
                  <h3 className="text-2xl font-semibold text-white mb-4">Portfolio Website</h3>
                  <p className="text-white/80 mb-6">
                    This portfolio website showcases my skills in modern web development, including Next.js, React, Tailwind CSS, and Framer Motion for animations. 
                    The design focuses on creating an immersive, interactive experience with parallax scrolling and smooth transitions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">Next.js</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">React</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">Framer Motion</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm text-white border border-white/10 hover:border-white/20 transition-colors"
                  >
                    View GitHub
                  </motion.button>
                </div>
                <div className="md:w-1/2 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl relative overflow-hidden">
                  {/* If you have an actual image, uncomment this */}
                  {/* <Image
                    src="/images/projects/portfolio.jpg"
                    alt="Portfolio Website"
                    fill
                    className="object-cover"
                  /> */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/50 text-xl">Portfolio Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="relative z-10 py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 font-display"
          >
            Interested in Working Together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Let's build something amazing together
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-0" />
    </motion.main>
  )
} 