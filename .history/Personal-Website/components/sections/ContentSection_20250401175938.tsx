'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import StarsBackground from '@/components/StarsBackground'

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
      <div className="absolute inset-0 bg-white rounded-[50px]">
        {/* Add stars background inside the rounded container */}
        <div className="absolute inset-0 rounded-[50px] overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            <StarsBackground />
          </div>
        </div>
      </div>
      <div className="container-custom relative">
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
                <h2 className="text-7xl md:text-9xl font-bold text-black font-display">
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
                  <h2 className="text-4xl md:text-6xl font-bold text-black font-display">
                    About Me
                  </h2>
                </motion.div>
                <div className="w-3/5 relative">
                  {/* Vertical Divider with Parallax */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/40 to-black/20"
                    style={{
                      y: useTransform(aboutMeProgress, [0.1, 0.95], [0, 50]),
                      scaleY: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1])
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1])
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-black/20 blur-sm"
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
                        className="text-2xl text-black text-left leading-relaxed font-body"
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
                        className="text-2xl text-black text-left leading-relaxed font-body"
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
                  <h2 className="text-4xl md:text-6xl font-bold text-black font-display">
                    What I Do
                  </h2>
                </motion.div>
                <div className="w-3/5 relative pl-8">
                  {/* Vertical Divider with Parallax */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/40 to-black/20"
                    style={{
                      y: useTransform(aboutMeProgress, [0.65, 0.9], [0, 50]),
                      scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-black/20 blur-sm"
                      style={{
                        scaleY: useTransform(aboutMeProgress, [0.65, 0.72], [0, 1])
                      }}
                    />
                  </motion.div>
                  
                  <div className="overflow-hidden">
                    <motion.p 
                      className="text-2xl text-black text-left leading-relaxed font-body"
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
                      className="text-2xl text-black space-y-4 text-left leading-relaxed font-body"
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
              className="text-3xl md:text-5xl font-bold text-black mb-12 text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Capabilities
            </motion.h2>
            <p className="text-xl text-black mb-16 text-center max-w-xl mx-auto font-body">
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
                    className="bg-black/5 backdrop-blur-sm rounded-2xl p-6 h-40 flex items-center justify-center flex-shrink-0 w-72"
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
                      backgroundColor: "rgba(0, 0, 0, 0.1)" 
                    }}
                  >
                    <h3 className="text-xl font-medium text-black text-center font-body">
                      {capability}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Gradient fade on edges */}
              <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="flex justify-center items-center mt-10 text-black"
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