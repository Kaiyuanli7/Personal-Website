'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import dynamic from 'next/dynamic'

const StarsBackground = dynamic(() => import('@/components/ui/StarsBackground'), {
  ssr: false,
  loading: () => null,
})

gsap.registerPlugin(ScrollTrigger)

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export default function About() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const color = useMotionValue(COLORS[0])
  
  // Reference for the bio section to apply parallax
  const bioRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  
  // Parallax effects for bio section
  const { scrollYProgress: bioProgress } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effects for skills section
  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effects for education section
  const { scrollYProgress: educationProgress } = useScroll({
    target: educationRef,
    offset: ["start end", "end start"]
  })

  // Transform values for various elements
  const bioY = useTransform(bioProgress, [0, 1], [0, -100])
  const bioOpacity = useTransform(bioProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const skillsY = useTransform(skillsProgress, [0, 1], [100, 0])
  const skillsOpacity = useTransform(skillsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const educationY = useTransform(educationProgress, [0, 1], [100, 0])
  const educationOpacity = useTransform(educationProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
      
      {/* Title with animated reveal */}
      <div className="relative z-10 pt-24 mb-16">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-center text-white font-display"
          >
            About Me
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-24 h-1 bg-white mx-auto mt-6"
          />
        </div>
      </div>
      
      {/* Bio Section with Parallax */}
      <div ref={bioRef} className="relative z-10 min-h-[100vh] mb-32">
        <div className="container mx-auto px-6">
          <motion.div
            style={{ 
              y: bioY,
              opacity: bioOpacity
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
              style={{ boxShadow }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Professional Summary</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Ambitious and self-motivated senior high school student with proven success in financial analysis, 
                AI/ML development, and technical leadership. Trilingual communicator skilled in building collaborative 
                technical projects. Dedicated to excellence with a strong track record of growth-oriented initiatives.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-white">Experience</h3>
              <div className="space-y-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">Independent Stock Market Investor</h4>
                  <p className="text-white/70 mb-4">2023 - Present</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-white/80">Researched stock trends, conducted technical analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-white/80">Developed Python-based market analysis algorithms</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">Intern | Phanta Field (AI Tech Startup)</h4>
                  <p className="text-white/70 mb-4">2023</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-white/80">Collaborated with development team using GitHub for version control and project management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-white/80">Contributed to successful launch of an image generation application on Apple App Store</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">Education</h3>
              <div className="space-y-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">Archbishop Mitty High School</h4>
                  <p className="text-white/70 mb-4">2021 - 2025</p>
                  <p className="text-white/80">San Jose, CA</p>
                  <p className="text-white/80">Senior, Expected Graduation: 2025</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">Northeastern University</h4>
                  <p className="text-white/70 mb-4">2025 - 2029</p>
                  <p className="text-white/80">Boston, MA</p>
                  <p className="text-white/80">Incoming Freshman, Fall 2025</p>
                  <p className="text-white/80">Combined Major: Business and Computer Science</p>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Programming Languages</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Python</span>
                        <span className="text-white/70">Advanced</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "90%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 1 }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Java</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 1 }}
                          className="bg-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">JavaScript</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="bg-yellow-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Web Development</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">React.js</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 1 }}
                          className="bg-cyan-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">HTML/CSS</span>
                        <span className="text-white/70">Advanced</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="bg-orange-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Node.js</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6, duration: 1 }}
                          className="bg-green-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Databases & Cloud</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">MongoDB</span>
                        <span className="text-white/70">Beginner</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "45%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="bg-green-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">AWS</span>
                        <span className="text-white/70">Beginner</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "40%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6, duration: 1 }}
                          className="bg-orange-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">PostgreSQL</span>
                        <span className="text-white/70">Beginner</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "35%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, duration: 1 }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">AI/ML & Finance</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Hugging Face</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "65%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6, duration: 1 }}
                          className="bg-yellow-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Trading Algorithms</span>
                        <span className="text-white/70">Intermediate</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, duration: 1 }}
                          className="bg-red-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">Technical Analysis</span>
                        <span className="text-white/70">Advanced</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "80%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className="bg-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">Languages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6 text-center"
                >
                  <h4 className="text-xl font-semibold mb-4 text-white">English</h4>
                  <p className="text-white/70">Native</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6 text-center"
                >
                  <h4 className="text-xl font-semibold mb-4 text-white">Chinese (Mandarin)</h4>
                  <p className="text-white/70">Fluent</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="backdrop-blur-md bg-white/10 rounded-xl p-6 text-center"
                >
                  <h4 className="text-xl font-semibold mb-4 text-white">Cantonese</h4>
                  <p className="text-white/70">Beginner</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-0" />
    </motion.main>
  )
} 