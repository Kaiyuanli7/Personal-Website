'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import Image from 'next/image'
import { CodeCard } from '@/components/ui/CodeCard'

gsap.registerPlugin(ScrollTrigger)

// Define capabilities to display with parallax effect
const capabilities = [
  "Python Programming",
  "Java Development",
  "JavaScript/React.js",
  "Machine Learning",
  "Hugging Face APIs",
  "Financial Analysis",
  "Stock Market Analysis",
  "Node.js Development",
  "MongoDB & PostgreSQL",
  "Technical Analysis",
  "AI Applications",
  "Expo Development"
]

export default function ContentSection() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)
  const introBannerRef = useRef<HTMLDivElement>(null)
  
  // Setup parallax scroll for capabilities
  const { scrollYProgress: capabilitiesProgress } = useScroll({
    target: capabilitiesRef,
    offset: ["start end", "end start"]
  })

  // Setup scroll progress for About Me section
  const { scrollYProgress: aboutMeProgress } = useScroll({
    target: aboutMeRef,
    offset: ["start end", "end start"]
  })

  // Setup scroll progress for Intro Banner
  const { scrollYProgress: introBannerProgress } = useScroll({
    target: introBannerRef,
    offset: ["start end", "end start"]
  })
  
  useEffect(() => {
    if (!sectionRef.current) return

    // Initially hide the section
    gsap.set(sectionRef.current, {
      opacity: 0,
      y: 100,
    })

    // Show the section when scrolling past the hero
    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        toggleActions: 'play none none reverse',
      },
    })
  }, [lenis])

  return (
    <section ref={sectionRef} className="relative pt-24 pb-48 bg-gray-950">
      <div className="container-custom relative">
        {/* Intro Banner Section */}
        <div ref={introBannerRef} className="min-h-screen mb-32">
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl">
              <motion.div 
                className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="flex flex-col"
                  style={{
                    y: useTransform(introBannerProgress, [0, 0.5], [0, -50])
                  }}
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <motion.span 
                      className="relative inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                    <span className="block">Passionate</span>
                    </motion.span>
                    <motion.span 
                      className="relative inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>About</span>
                    </motion.span>
                    <br></br>
                    <motion.span 
                      className="relative inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                    <span className="block">Creating</span>
                    </motion.span>
                  </motion.h1>

                  <motion.p 
                    className="text-xl md:text-2xl text-white/80 font-body mb-10 max-w-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    My dream is to innovate through entrepreneurship and contribute meaningful solutions to society.
                  </motion.p>

                  <motion.div 
                    className="flex gap-4 mt-4 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    {['Honest', 'Enterprising', 'Reliable', 'Innovative'].map((tag, index) => (
                      <motion.div 
                        key={tag}
                        className="bg-white/10 rounded-full px-6 py-2 text-white font-medium"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                      >
                        {tag}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="relative"
                  style={{
                    y: useTransform(introBannerProgress, [0, 0.5], [0, -30])
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <CodeCard />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Scroll indicator */}
              <motion.div 
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                style={{ opacity: useTransform(introBannerProgress, [0, 0.3], [1, 0]) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <p className="text-white/70 mb-2 font-body">Scroll to explore</p>
                <motion.div 
                  className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
                  initial={{ opacity: 0.5 }}
                >
                  <motion.div 
                    className="w-1.5 h-1.5 bg-white/50 rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div ref={aboutMeRef} className="relative min-h-[1000vh] mb-32">
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl relative">
              {/* Initial Center Animation - Visible only at the start */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0, 0.1], [1, 0]),
                  filter: "blur(0px)",
                  scale: useTransform(aboutMeProgress, [0, 0.1], [1, 0.8])
                }}
              >
                <h2 className="text-7xl md:text-9xl font-bold text-white font-display">
                  About Me
                </h2>
              </motion.div>
              
              {/* Content that appears as you scroll */}
              <motion.div 
                className="flex gap-8"
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0, 0.1, 0.45, 0.55], [0, 1, 1, 0])
                }}
              >
                <motion.div 
                  className="w-2/5 flex items-center justify-end pr-4"
                  style={{ 
                    x: useTransform(aboutMeProgress, [0, 0.1, 0.45, 0.55], ["-100%", "0%", "0%", "-100%"])
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
                    About Me
                  </h2>
                </motion.div>
                <div className="w-3/5 relative">
                  {/* Vertical Divider with Parallax */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/40 to-white/20"
                    style={{
                      y: useTransform(aboutMeProgress, [0.1, 0.95], [0, 50]),
                      scaleY: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1])
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1])
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-white/20 blur-sm"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1])
                      }}
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-8 pl-8 h-full max-w-[800px] overflow-hidden"
                    style={{
                      opacity: useTransform(aboutMeProgress, [0.1, 0.2, 0.45, 0.55], [0, 1, 1, 0]),
                      x: useTransform(aboutMeProgress, [0.1, 0.2, 0.45, 0.55], ["10%", "0%", "0%", "-10%"])
                    }}
                  >
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-2xl text-white text-left leading-relaxed font-body"
                        style={{
                          clipPath: "inset(0 0 0 0)",
                          WebkitClipPath: "inset(0 0 0 0)",
                          width: useTransform(aboutMeProgress, [0.15, 0.3], ["0%", "100%"])
                        }}
                      >
                        Hey, I'm Kaiyuan Li, a senior from San Jose, California, with a passion for tech, business, and creativity. 
                        I'll be heading to Northeastern University this fall to study Business and Computer Science.
                      </motion.p>
                    </div>
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-2xl text-white text-left leading-relaxed font-body"
                        style={{
                          clipPath: "inset(0 0 0 0)",
                          WebkitClipPath: "inset(0 0 0 0)",
                          width: useTransform(aboutMeProgress, [0.3, 0.4], ["0%", "100%"])
                        }}
                      >
                        Outside of my academic work, I'm into music, gaming, and cooking. I play drums in my school's Wind Ensemble, 
                        perform at local events, and also love to unwind by gaming—ranked nationally in a few games! When I'm not immersed 
                        in tech, I enjoy experimenting in the kitchen and trying out new recipes.
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* What I Do Section - Appears after About Me */}
              <motion.div 
                className="flex gap-8 absolute inset-0"
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                }}
              >
                <motion.div 
                  className="w-2/5 flex items-center justify-end pr-4"
                  style={{ 
                    x: useTransform(aboutMeProgress, [0.65, 0.72], ["100%", "0%"])
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
                    What I Do
                  </h2>
                </motion.div>
                <div className="w-3/5 relative pl-8">
                  {/* Vertical Divider with Parallax */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/40 to-white/20"
                    style={{
                      y: useTransform(aboutMeProgress, [0.65, 0.9], [0, 50]),
                      scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-white/20 blur-sm"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                      }}
                    />
                  </motion.div>
                  
                  <div className="overflow-hidden">
                    <motion.p 
                      className="text-2xl text-white text-left leading-relaxed font-body"
                      style={{
                        clipPath: "inset(0 0 0 0)",
                        WebkitClipPath: "inset(0 0 0 0)",
                        width: useTransform(aboutMeProgress, [0.72, 0.77], ["0%", "100%"])
                      }}
                    >
                      I'm all about using technology to solve problems and bring ideas to life. I've developed a strong skill set in programming, primarily with Python, Java, and JavaScript.
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.ul 
                      className="text-2xl text-white space-y-4 text-left leading-relaxed font-body"
                      style={{
                        clipPath: "inset(0 0 0 0)",
                        WebkitClipPath: "inset(0 0 0 0)",
                        width: useTransform(aboutMeProgress, [0.77, 0.82], ["0%", "100%"])
                      }}
                    >
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Built a song recommendation system using the Spotify and Cyanite APIs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Led teams to develop a web app for AI-generated pickup lines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Helped launch an image generation app for an AI startup</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Applied technical analysis tools to grow my personal investment portfolio</span>
                      </li>
                    </motion.ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Capabilities Section with Sticky Parallax */}
        <div 
          ref={capabilitiesRef} 
          className="py-32 min-h-[1000vh]"
        >
          <div className="sticky top-0 py-24 flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-12 text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Capabilities
            </motion.h2>
            <p className="text-xl text-white mb-16 text-center max-w-xl mx-auto font-body">
              Here's what I bring to the table
            </p>
            
            {/* Horizontal scrolling container */}
            <div className="relative w-full max-w-6xl overflow-hidden">
              <motion.div 
                className="flex space-x-8 px-4"
                style={{
                  x: useTransform(capabilitiesProgress, 
                    [0, 0.1, 0.9, 1],
                    [100, 0, -2400, -2500])
                }}
              >
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-40 flex items-center justify-center flex-shrink-0 w-72"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: Math.min(index * 0.1, 0.5),
                      ease: "easeOut" 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.15)" 
                    }}
                  >
                    <h3 className="text-xl font-medium text-white text-center font-body">
                      {capability}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Gradient fade on edges */}
              <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="flex justify-center items-center mt-10 text-white"
              initial={{ opacity: 1 }}
              style={{ opacity: useTransform(capabilitiesProgress, [0, 0.8], [1, 0]) }}
            >
              <p className="text-sm mr-2 font-body">Scroll to explore more</p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Let's Collaborate Section */}
        <div className="max-w-4xl mx-auto text-center pb-24">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-12 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let's Collaborate
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="bg-white text-gray-950 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors duration-300 font-body"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}