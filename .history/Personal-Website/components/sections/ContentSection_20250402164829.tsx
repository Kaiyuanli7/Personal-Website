'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'

gsap.registerPlugin(ScrollTrigger)

export default function ContentSection() {
  const { lenis } = useLenisScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  
  // Setup scroll progress for resume section
  const { scrollYProgress: resumeProgress } = useScroll({
    target: resumeRef,
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
    <section ref={sectionRef} className="relative pt-12 pb-48">
      {/* Add a gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/50 to-white" />
      <div className="absolute inset-0 bg-white rounded-[50px]" />
      <div className="container-custom relative">
        {/* Resume Section */}
        <div ref={resumeRef} className="relative min-h-screen">
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl">
              <motion.div 
                className="space-y-16"
                style={{ 
                  opacity: useTransform(resumeProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
                }}
              >
                {/* Professional Experience */}
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4">
                    Professional Experience
                  </h2>
                  
                  <div className="space-y-12">
                    {/* Stock Market Investor */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold text-gray-900">Independent Stock Market Investor</h3>
                        <p className="text-gray-600 mt-1">2023 - Present</p>
                      </div>
                      <div className="md:w-2/3">
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>Researched stock trends and conducted technical analysis</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>Developed Python-based market analysis algorithms</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>

                    {/* Phanta Field Internship */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold text-gray-900">AI Tech Startup Intern</h3>
                        <p className="text-gray-600 mt-1">Phanta Field, 2023</p>
                      </div>
                      <div className="md:w-2/3">
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>Collaborated with development team using GitHub for version control and project management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>Contributed to successful launch of an image generation application on Apple App Store</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4">
                    Education
                  </h2>
                  
                  <div className="space-y-12">
                    {/* High School */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold text-gray-900">Archbishop Mitty High School</h3>
                        <p className="text-gray-600 mt-1">2021 - 2025</p>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-700">San Jose, CA</p>
                        <p className="text-gray-600 mt-2">Senior, Expected Graduation: 2025</p>
                      </div>
                    </motion.div>

                    {/* University */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold text-gray-900">Northeastern University</h3>
                        <p className="text-gray-600 mt-1">2025 - 2029</p>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-700">Boston, MA</p>
                        <p className="text-gray-600 mt-2">Incoming Freshman, Fall 2025</p>
                        <p className="text-gray-700 mt-2">Combined Major: Business and Computer Science</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4">
                    Skills
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Technical Skills */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>Python Programming</li>
                        <li>JavaScript/React.js</li>
                        <li>Node.js Development</li>
                        <li>MongoDB & PostgreSQL</li>
                        <li>AI/ML Applications</li>
                      </ul>
                    </motion.div>

                    {/* Finance Skills */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Finance</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>Stock Market Analysis</li>
                        <li>Technical Analysis</li>
                        <li>Trading Algorithms</li>
                        <li>Financial Research</li>
                        <li>Market Trends Analysis</li>
                      </ul>
                    </motion.div>
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4">
                    Languages
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">English</h3>
                      <p className="text-gray-600 mt-2">Native</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Chinese (Mandarin)</h3>
                      <p className="text-gray-600 mt-2">Fluent</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Cantonese</h3>
                      <p className="text-gray-600 mt-2">Beginner</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Let's Collaborate Section */}
        <div className="max-w-4xl mx-auto text-center pb-24">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black mb-12 font-display"
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
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black/90 transition-colors duration-300 font-body"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}