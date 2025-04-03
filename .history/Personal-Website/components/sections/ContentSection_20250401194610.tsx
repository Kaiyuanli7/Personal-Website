'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import Image from 'next/image'

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
  const resumeRef = useRef<HTMLDivElement>(null)
  
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
  
  // Setup scroll progress for resume section
  const { scrollYProgress: resumeProgress } = useScroll({
    target: resumeRef,
    offset: ["start end", "end start"]
  })
  
  // Setup general scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
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
      {/* Space to Sky transition background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-600 to-blue-400"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
        }}
      />

      {/* Stars fading out */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: top + '%',
                  left: left + '%',
                  opacity: Math.random() * 0.7 + 0.3,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </div>
      </motion.div>

      {/* Clouds parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Far clouds layer */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0, 1, 0.7]),
            y: useTransform(scrollYProgress, [0.1, 0.7], ["30%", "0%"])
          }}
        >
          <div className="absolute left-[10%] top-[15%]">
            <motion.div
              className="relative w-64 h-40 opacity-30"
              style={{
                x: useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-20%"])
              }}
            >
              <Image
                src="/images/cloud1.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="absolute right-[20%] top-[25%]">
            <motion.div
              className="relative w-80 h-56 opacity-30"
              style={{
                x: useTransform(scrollYProgress, [0.1, 0.7], ["0%", "10%"])
              }}
            >
              <Image
                src="/images/cloud2.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Middle clouds layer */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0.6]),
            y: useTransform(scrollYProgress, [0.2, 0.8], ["50%", "5%"])
          }}
        >
          <div className="absolute left-[25%] top-[35%]">
            <motion.div
              className="relative w-96 h-60 opacity-50"
              style={{
                x: useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-30%"])
              }}
            >
              <Image
                src="/images/cloud3.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="absolute right-[15%] top-[42%]">
            <motion.div
              className="relative w-80 h-56 opacity-40"
              style={{
                x: useTransform(scrollYProgress, [0.2, 0.8], ["0%", "15%"])
              }}
            >
              <Image
                src="/images/cloud1.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Close clouds layer - these will pass by faster */}
        <motion.div 
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.9], [0, 1, 0]),
            y: useTransform(scrollYProgress, [0.3, 0.9], ["70%", "10%"])
          }}
        >
          <div className="absolute left-[5%] top-[60%]">
            <motion.div
              className="relative w-[500px] h-[300px] opacity-90"
              style={{
                x: useTransform(scrollYProgress, [0.3, 0.9], ["0%", "-50%"])
              }}
            >
              <Image
                src="/images/cloud2.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="absolute right-[5%] top-[65%]">
            <motion.div
              className="relative w-[600px] h-[350px] opacity-80"
              style={{
                x: useTransform(scrollYProgress, [0.3, 0.9], ["0%", "30%"])
              }}
            >
              <Image
                src="/images/cloud3.png"
                alt="Cloud"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* White background for resume section */}
      <motion.div 
        className="absolute inset-0 bg-white rounded-[50px]"
        style={{
          opacity: useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
        }}
      />
      
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
    </section>
  )
}