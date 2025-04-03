'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import Image from 'next/image'
import { CodeCard } from '@/components/ui/CodeCard'
import PageIndicator from '@/components/ui/PageIndicator'

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
  const whatIDoRef = useRef<HTMLDivElement>(null)
  
  // Setup overall scroll progress for the entire ContentSection
  const { scrollYProgress: overallProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

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

  // Setup scroll progress for What I Do section
  const { scrollYProgress: whatIDoProgress } = useScroll({
    target: whatIDoRef,
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

  // Define the sections for the PageIndicator
  const indicatorSections = [
    { ref: introBannerRef, progress: introBannerProgress, label: 'Intro' },
    { ref: aboutMeRef, progress: aboutMeProgress, label: 'About Me' },
    { ref: whatIDoRef, progress: whatIDoProgress, label: 'What I Do' },
    { ref: capabilitiesRef, progress: capabilitiesProgress, label: 'Capabilities' },
  ];

  return (
    <section ref={sectionRef} className="relative pt-0 pb-48 bg-gray-950">
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
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
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
              {/* 
                Initial Title Animation
                - Fades out between scroll progress 0-0.1
                - Blurs and scales up as it fades
                - Adjust these values to change when the title disappears
              */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                initial={{ opacity: 1 }}
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0, 0.1], [1, 0]),
                  filter: useTransform(aboutMeProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]),
                  scale: useTransform(aboutMeProgress, [0, 0.1], [1, 1.5])
                }}
              >
                <div className="relative">
                  <motion.h2 
                    className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-display"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ 
                      duration: 5, 
                      ease: "linear", 
                      repeat: Infinity 
                    }}
                    style={{ 
                      backgroundSize: "200% 200%"
                    }}
                  >
                    About Me
                  </motion.h2>
                  <motion.div 
                    className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{ 
                      duration: 3, 
                      ease: "easeInOut", 
                      repeat: Infinity 
                    }}
                  />
                </div>
              </motion.div>
              
              {/* 
                Main About Me Card
                - Appears between scroll progress 0.1-0.2
                - Stays visible until 0.4-0.5
                - Adjust these ranges to change when the card appears/disappears
                - Current animation sequence:
                  0.1-0.2: Fade in and slide up
                  0.2-0.3: Rotate into position
                  0.3-0.35: Stay stable
                  0.35-0.4: Rotate out
                  0.4-0.5: Fade out and slide up
              */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden backdrop-blur-lg border border-white/10"
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]),
                  y: useTransform(aboutMeProgress, [0.1, 0.2, 0.4, 0.5], [50, 0, 0, -50]),
                  rotateX: useTransform(aboutMeProgress, [0.1, 0.2, 0.35, 0.4], [10, 0, 0, 10]),
                  rotateY: useTransform(aboutMeProgress, [0.2, 0.3, 0.35, 0.4], [-5, 0, 0, 5]),
                  scale: useTransform(aboutMeProgress, [0.1, 0.15, 0.35, 0.4], [0.9, 1, 1, 0.9]),
                  perspective: "1000px"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
                
                <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-8 relative z-10">
                  <div className="flex flex-col justify-center items-center md:items-end">
                    <motion.div 
                      className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1"
                      style={{
                        rotate: useTransform(aboutMeProgress, [0.1, 0.35], [-5, 5]),
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <motion.div 
                          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                          style={{
                            scale: useTransform(aboutMeProgress, [0.15, 0.25], [0.9, 1]),
                          }}
                        >
                          KL
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-4xl font-bold text-white mt-6 font-display text-center md:text-right"
                      style={{
                        y: useTransform(aboutMeProgress, [0.1, 0.2], [20, 0]),
                        opacity: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1]),
                      }}
                    >
                      Kaiyuan Li
                    </motion.h3>
                    
                    <motion.div 
                      className="flex mt-4 gap-2 flex-wrap justify-center md:justify-end"
                      style={{
                        y: useTransform(aboutMeProgress, [0.15, 0.25], [20, 0]),
                        opacity: useTransform(aboutMeProgress, [0.15, 0.25], [0, 1]),
                      }}
                    >
                      {["Tech", "Business", "Creative"].map((tag, i) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10"
                      style={{
                        y: useTransform(aboutMeProgress, [0.1, 0.2], [30, 0]),
                        opacity: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1]),
                        rotateY: useTransform(aboutMeProgress, [0.15, 0.25, 0.35], [-5, 0, 5]),
                      }}
                    >
                      <h4 className="text-xl font-medium text-white/90 mb-3 font-display">About Me</h4>
                      <p className="text-white/80 leading-relaxed font-body">
                        Hey, I'm Kaiyuan Li, a senior from San Jose, California, with a passion for tech, business, and creativity. 
                        I'll be heading to Northeastern University this fall to study Business and Computer Science.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10"
                      style={{
                        y: useTransform(aboutMeProgress, [0.2, 0.3], [30, 0]),
                        opacity: useTransform(aboutMeProgress, [0.2, 0.3], [0, 1]),
                        rotateY: useTransform(aboutMeProgress, [0.25, 0.35], [5, -5]),
                      }}
                    >
                      <h4 className="text-xl font-medium text-white/90 mb-3 font-display">Interests</h4>
                      <p className="text-white/80 leading-relaxed font-body">
                        Outside of my academic work, I'm into music, gaming, and cooking. I play drums in my school's Wind Ensemble, 
                        perform at local events, and also love to unwind by gaming—ranked nationally in a few games! When I'm not immersed 
                        in tech, I enjoy experimenting in the kitchen and trying out new recipes.
                      </p>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-4 left-4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity 
                  }}
                />
                <motion.div 
                  className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ 
                    duration: 5, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* What I Do Section */}
        <div ref={whatIDoRef} className="relative min-h-[1000vh] mb-32">
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl relative">
              <motion.div 
                className="relative rounded-2xl overflow-hidden backdrop-blur-lg border border-white/10"
                style={{ 
                  opacity: useTransform(whatIDoProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                  y: useTransform(whatIDoProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]),
                  scale: useTransform(whatIDoProgress, [0, 0.1, 0.7, 0.8], [0.9, 1, 1, 0.9]),
                  rotateX: useTransform(whatIDoProgress, [0, 0.2, 0.6, 0.8], [10, 0, 0, -10])
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10" />
                
                <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-8 relative z-10">
                  <div className="flex flex-col justify-center items-center md:items-end">
                    <motion.div 
                      className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-green-500 to-blue-600 p-1"
                      style={{
                        rotate: useTransform(whatIDoProgress, [0.1, 0.4], [-5, 5]),
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <motion.div 
                          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                          style={{
                            scale: useTransform(whatIDoProgress, [0.2, 0.3], [0.9, 1]),
                          }}
                        >
                          WD
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-4xl font-bold text-white mt-6 font-display text-center md:text-right"
                      style={{
                        y: useTransform(whatIDoProgress, [0.1, 0.2], [20, 0]),
                        opacity: useTransform(whatIDoProgress, [0.1, 0.2], [0, 1]),
                      }}
                    >
                      What I Do
                    </motion.h3>
                    
                    <motion.div 
                      className="flex mt-4 gap-2 flex-wrap justify-center md:justify-end"
                      style={{
                        y: useTransform(whatIDoProgress, [0.2, 0.3], [20, 0]),
                        opacity: useTransform(whatIDoProgress, [0.2, 0.3], [0, 1]),
                      }}
                    >
                      {["Development", "Design", "Innovation"].map((tag, i) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10"
                      style={{
                        y: useTransform(whatIDoProgress, [0.1, 0.2], [30, 0]),
                        opacity: useTransform(whatIDoProgress, [0.1, 0.2], [0, 1]),
                        rotateY: useTransform(whatIDoProgress, [0.2, 0.3], [-5, 0]),
                      }}
                    >
                      <h4 className="text-xl font-medium text-white/90 mb-3 font-display">My Focus</h4>
                      <p className="text-white/80 leading-relaxed font-body">
                        I'm all about using technology to solve problems and bring ideas to life. I've developed a strong skill set in programming, primarily with Python, Java, and JavaScript.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10"
                      style={{
                        y: useTransform(whatIDoProgress, [0.2, 0.3], [30, 0]),
                        opacity: useTransform(whatIDoProgress, [0.2, 0.3], [0, 1]),
                        rotateY: useTransform(whatIDoProgress, [0.3, 0.4], [5, -5]),
                      }}
                    >
                      <h4 className="text-xl font-medium text-white/90 mb-3 font-display">My Projects</h4>
                      <ul className="space-y-2 text-white/80 font-body">
                        {[
                          "Built a song recommendation system using the Spotify and Cyanite APIs",
                          "Led teams to develop a web app for AI-generated pickup lines",
                          "Helped launch an image generation app for an AI startup",
                          "Applied technical analysis tools to grow my personal investment portfolio"
                        ].map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            <span className="inline-block mr-2 text-green-400">•</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-4 left-4 w-20 h-20 rounded-full bg-green-500/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity 
                  }}
                />
                <motion.div 
                  className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ 
                    duration: 5, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Capabilities Section with Sticky Parallax */}
        <div ref={capabilitiesRef} className="relative py-20 md:py-32">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center text-white font-display mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            My Capabilities
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {capabilities.map((capability, index) => {
              const y = useTransform(capabilitiesProgress, [0, 1], [Math.random() * -200 - 50, Math.random() * 200 + 50])
              const opacity = useTransform(capabilitiesProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
              
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 text-center shadow-lg backdrop-blur-sm"
                  style={{ y, opacity }}
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-white font-medium text-sm md:text-base">{capability}</p>
                </motion.div>
              )
            })}
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

      {/* Add the PageIndicator */}
      <PageIndicator sections={indicatorSections} overallProgress={overallProgress} />

    </section>
  )
}