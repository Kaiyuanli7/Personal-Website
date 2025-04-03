'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import Image from 'next/image'
import { CodeCard } from '@/components/ui/CodeCard'
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, Palette, Laptop, Sparkles, Code, User, Briefcase } from "lucide-react"

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

  // State to track active section
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Add cooldown tracking to prevent rapid snapping
  const [isScrolling, setIsScrolling] = useState(false);
  // Ref to track the last scroll time
  const lastScrollTime = useRef(0);
  
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

    // Set up a manual wheel event handler to detect user scrolling
    const handleWheel = () => {
      lastScrollTime.current = Date.now();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Set up scroll snap observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Don't process if we're currently in a cooling down period
        if (isScrolling) return;
        
        // Only process if user hasn't scrolled manually in the last 500ms
        const now = Date.now();
        if (now - lastScrollTime.current < 500) return;

        entries.forEach((entry) => {
          // When a section is 60% visible, snap to it (higher threshold is less aggressive)
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const id = entry.target.getAttribute('data-section');
            if (id && id !== activeSection) {
              setActiveSection(id);
              setIsScrolling(true);
              
              // Use lenis for smoother scrolling if available
              if (lenis) {
                lenis.scrollTo(entry.target, { 
                  offset: 0,
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              } else {
                // Fallback to standard scrollIntoView
                entry.target.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
              
              // Add a cooldown period to prevent rapid consecutive snaps
              setTimeout(() => {
                setIsScrolling(false);
              }, 1500);
            }
          }
        });
      },
      { 
        // Higher threshold makes it less aggressive, only snap when section is clearly visible
        threshold: [0.6, 0.8] 
      }
    );

    // Observe the sections
    if (aboutMeRef.current) {
      aboutMeRef.current.setAttribute('data-section', 'about-me');
      observer.observe(aboutMeRef.current);
    }
    if (whatIDoRef.current) {
      whatIDoRef.current.setAttribute('data-section', 'what-i-do');
      observer.observe(whatIDoRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, [lenis, activeSection, isScrolling])

  return (
    <section ref={sectionRef} className="relative pt-0 pb-48 bg-gray-950 scroll-smooth">
      <div className="container-custom relative">
        {/* Intro Banner Section */}
        <div ref={introBannerRef} className="min-h-screen mb-32 snap-start">
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
        <div 
          ref={aboutMeRef} 
          className="relative min-h-[250vh] mb-32 snap-start scroll-mt-24" 
          id="about-me-section"
        >
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
                className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20"
                style={{ 
                  opacity: useTransform(aboutMeProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]),
                  y: useTransform(aboutMeProgress, [0.1, 0.2, 0.4, 0.5], [50, 0, 0, -50]),
                  rotateX: useTransform(aboutMeProgress, [0.1, 0.2, 0.35, 0.4], [10, 0, 0, 10]),
                  rotateY: useTransform(aboutMeProgress, [0.2, 0.3, 0.35, 0.4], [-5, 0, 0, 5]),
                  scale: useTransform(aboutMeProgress, [0.1, 0.15, 0.35, 0.4], [0.9, 1, 1, 0.9]),
                  perspective: "1000px"
                }}
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-6 relative z-10">
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
                        className="relative border border-white/10 p-2 rounded-2xl transition-all duration-300 hover:border-white/20"
                        style={{
                          y: useTransform(aboutMeProgress, [0.1, 0.2], [30, 0]),
                          opacity: useTransform(aboutMeProgress, [0.1, 0.2], [0, 1]),
                          rotateY: useTransform(aboutMeProgress, [0.15, 0.25, 0.35], [-5, 0, 5]),
                        }}
                      >
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                        />
                        <div className="relative rounded-xl border-white/10 p-4 bg-black/40 backdrop-blur-sm">
                          <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/5 mb-3">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-xl font-medium text-white/90 mb-3 font-display">About Me</h4>
                          <p className="text-white/80 leading-relaxed font-body">
                            Hey, I'm Kaiyuan Li, a senior from San Jose, California, with a passion for tech, business, and creativity. 
                            I'll be heading to Northeastern University this fall to study Business and Computer Science.
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative border border-white/10 p-2 rounded-2xl transition-all duration-300 hover:border-white/20"
                        style={{
                          y: useTransform(aboutMeProgress, [0.2, 0.3], [30, 0]),
                          opacity: useTransform(aboutMeProgress, [0.2, 0.3], [0, 1]),
                          rotateY: useTransform(aboutMeProgress, [0.25, 0.35], [5, -5]),
                        }}
                      >
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                        />
                        <div className="relative rounded-xl border-white/10 p-4 bg-black/40 backdrop-blur-sm">
                          <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/5 mb-3">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-xl font-medium text-white/90 mb-3 font-display">Interests</h4>
                          <p className="text-white/80 leading-relaxed font-body">
                            Outside of my academic work, I'm into music, gaming, and cooking. I play drums in my school's Wind Ensemble, 
                            perform at local events, and also love to unwind by gaming—ranked nationally in a few games! When I'm not immersed 
                            in tech, I enjoy experimenting in the kitchen and trying out new recipes.
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* What I Do Section */}
        <div 
          ref={whatIDoRef} 
          className="relative min-h-[250vh] mb-32 snap-start scroll-mt-24" 
          id="what-i-do-section"
        >
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl relative">
              <motion.div 
                className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20"
                style={{ 
                  opacity: useTransform(whatIDoProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                  y: useTransform(whatIDoProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]),
                  scale: useTransform(whatIDoProgress, [0, 0.1, 0.7, 0.8], [0.9, 1, 1, 0.9]),
                  rotateX: useTransform(whatIDoProgress, [0, 0.2, 0.6, 0.8], [10, 0, 0, -10])
                }}
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-6 relative z-10">
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
                        className="relative border border-white/10 p-2 rounded-2xl transition-all duration-300 hover:border-white/20"
                        style={{
                          y: useTransform(whatIDoProgress, [0.1, 0.2], [30, 0]),
                          opacity: useTransform(whatIDoProgress, [0.1, 0.2], [0, 1]),
                          rotateY: useTransform(whatIDoProgress, [0.2, 0.3], [-5, 0]),
                        }}
                      >
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                        />
                        <div className="relative rounded-xl border-white/10 p-4 bg-black/40 backdrop-blur-sm">
                          <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/5 mb-3">
                            <Code className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-xl font-medium text-white/90 mb-3 font-display">My Focus</h4>
                          <p className="text-white/80 leading-relaxed font-body">
                            I'm all about using technology to solve problems and bring ideas to life. I've developed a strong skill set in programming, primarily with Python, Java, and JavaScript.
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative border border-white/10 p-2 rounded-2xl transition-all duration-300 hover:border-white/20"
                        style={{
                          y: useTransform(whatIDoProgress, [0.2, 0.3], [30, 0]),
                          opacity: useTransform(whatIDoProgress, [0.2, 0.3], [0, 1]),
                          rotateY: useTransform(whatIDoProgress, [0.3, 0.4], [5, -5]),
                        }}
                      >
                        <GlowingEffect
                          spread={40}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                        />
                        <div className="relative rounded-xl border-white/10 p-4 bg-black/40 backdrop-blur-sm">
                          <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/5 mb-3">
                            <Briefcase className="h-4 w-4 text-white" />
                          </div>
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
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Capabilities Section */}
        <div 
          ref={capabilitiesRef} 
          className="py-32 min-h-[250vh] snap-start scroll-mt-24"
          id="capabilities-section"
        >
          <div className="sticky top-0 py-24 flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="container-custom w-full max-w-6xl relative">
              <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20 mb-16">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                  <motion.h2
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 mb-6 text-center font-display z-10 relative"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Capabilities
                  </motion.h2>

                  <motion.p 
                    className="text-xl text-white/80 text-center max-w-xl mx-auto font-body relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Here's what I bring to the table
                  </motion.p>
                </div>
              </div>
            
              {/* Horizontal scrolling container */}
              <div className="relative w-full overflow-hidden">
                <motion.div 
                  className="flex space-x-6 px-4"
                  style={{
                    x: useTransform(capabilitiesProgress, 
                      [0, 0.1, 0.9, 1],
                      [100, 0, -2400, -2500])
                  }}
                >
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={capability}
                      className="relative border border-white/10 p-2 rounded-2xl transition-all duration-300 hover:border-white/20 flex-shrink-0 w-80"
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
                      }}
                    >
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                      />
                      <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl border-white/10 p-6 bg-black/40 backdrop-blur-sm">
                        <div className="w-fit rounded-lg border border-white/20 p-2 bg-white/5">
                          <span className="text-white/70 text-xl">{index % 3 === 0 ? '⚙️' : index % 3 === 1 ? '💻' : '🚀'}</span>
                        </div>
                        
                        <h3 className="text-xl font-medium text-white font-body relative z-10">
                          {capability}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Gradient fade on edges */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
              </div>
              
              {/* Scroll indicator */}
              <motion.div 
                className="flex justify-center items-center mt-12 text-white"
                initial={{ opacity: 1 }}
                style={{ opacity: useTransform(capabilitiesProgress, [0, 0.8], [1, 0]) }}
              >
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center space-x-2">
                  <p className="text-sm font-body">Scroll to explore more</p>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Let's Collaborate Section */}
        <div className="max-w-4xl mx-auto text-center pb-24 snap-start">
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