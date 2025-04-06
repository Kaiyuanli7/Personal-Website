'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll as useLenisScroll } from '@/context/ScrollContext'
import Image from 'next/image'
import { CodeCard } from '@/components/ui/CodeCard'
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, Palette, Laptop, Sparkles, Code, User, Briefcase } from "lucide-react"
import './no-scrollbar.css'
import AboutNavigation from "@/components/layout/AboutNavigation"

gsap.registerPlugin(ScrollTrigger)

// Scroll configuration - adjust these values to control scroll amounts
const scrollConfig = {
  introSection: { height: '100vh', tailwindHeight: 'min-h-screen' },
  aboutMeSection: { height: '200vh', tailwindHeight: 'min-h-[200vh]' },
  whatIDoSection: { height: '200vh', tailwindHeight: 'min-h-[200vh]' },
  capabilitiesSection: { height: '500vh', tailwindHeight: 'min-h-[500vh]' },
  // Animation ranges for each section
  animations: {
    aboutMe: {
      title: { start: 0, end: 0.1 },
      firstCard: { start: 0.1, end: 0.2 },
      secondCard: { start: 0.2, end: 0.3 },
      fadeOut: { start: 0.6, end: 0.7 }
    },
    whatIDo: {
      fadeIn: { start: 0, end: 0.2 },
      firstCard: { start: 0.1, end: 0.2 },
      secondCard: { start: 0.2, end: 0.3 },
      fadeOut: { start: 0.7, end: 0.95 }
    },
    capabilities: {
      scroll: {
        start: 0, 
        scrollStart: 0.1, 
        scrollEnd: 0.9, 
        end: 1
      }
    }
  }
}

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

interface ContentSectionProps {
  skipRenderNavigation?: boolean;
  activeSection?: string | null;
  setActiveSection?: (section: string) => void;
}

export default function ContentSection({
  skipRenderNavigation = false,
  activeSection: externalActiveSection = null,
  setActiveSection: externalSetActiveSection
}: ContentSectionProps) {
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
  const [internalActiveSection, setInternalActiveSection] = useState<string | null>('intro-section');
  
  // Use external or internal active section state
  const activeSection = externalActiveSection !== null ? externalActiveSection : internalActiveSection;
  const setActiveSection = externalSetActiveSection || setInternalActiveSection;
  
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

    // Show the section when scrolling past the hero - but only once
    const showAnimation = gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      paused: true, // Start paused
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        toggleActions: 'play none none reverse',
        // Important: once true prevents the animation from replaying
        // when navigating back to this section
        once: true, 
      },
    })

    // Play the animation (triggered by scrollTrigger)
    showAnimation.play();

    // Set up a manual wheel event handler to detect user scrolling
    const handleWheel = () => {
      lastScrollTime.current = Date.now();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Add a touch event handler for mobile
    const handleTouch = () => {
      lastScrollTime.current = Date.now();
    };

    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Set up scroll snap observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Don't process if we're currently in a cooling down period
        if (isScrolling) return;
        
        // Only process if user hasn't scrolled manually in the last 800ms
        const now = Date.now();
        if (now - lastScrollTime.current < 800) return;

        entries.forEach((entry) => {
          // Only process when a section is substantially visible (70%+)
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            const id = entry.target.getAttribute('data-section') || entry.target.id;
            if (id && id !== activeSection) {
              // Just update the active section without triggering scroll
              setActiveSection(id);
            }
          }
        });
      },
      { 
        // Higher threshold makes it less aggressive, only snap when section is clearly visible
        threshold: [0.7, 0.8, 0.9],
        rootMargin: "-10% 0px -10% 0px" // Slightly shrink the effective viewport for more reliable detection
      }
    );

    // Observe the sections
    if (introBannerRef.current) {
      introBannerRef.current.setAttribute('data-section', 'intro-section');
      observer.observe(introBannerRef.current);
    }
    if (aboutMeRef.current) {
      aboutMeRef.current.setAttribute('data-section', 'about-me-section');
      observer.observe(aboutMeRef.current);
    }
    if (whatIDoRef.current) {
      whatIDoRef.current.setAttribute('data-section', 'what-i-do-section');
      observer.observe(whatIDoRef.current);
    }
    if (capabilitiesRef.current) {
      capabilitiesRef.current.setAttribute('data-section', 'capabilities-section');
      observer.observe(capabilitiesRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouch);
      // Clean up GSAP animations
      showAnimation.kill();
    };
  }, [/* Empty dependency array ensures this only runs once */]);

  return (
    <section ref={sectionRef} className="relative pt-0 pb-48 scroll-smooth">
      {/* Use the new AboutNavigation component */}
      {!skipRenderNavigation && (
        <AboutNavigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          introBannerProgress={introBannerProgress}
          aboutMeProgress={aboutMeProgress}
          whatIDoProgress={whatIDoProgress}
          capabilitiesProgress={capabilitiesProgress}
        />
      )}

      <div className="container-custom relative">
        {/* Intro Banner Section */}
        <div ref={introBannerRef} className={`${scrollConfig.introSection.tailwindHeight} mb-32 snap-start`} id="intro-section">
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl">
              <motion.div 
                className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="flex flex-col px-4 md:px-0" 
                  style={{
                    y: useTransform(introBannerProgress, [0, 0.5], [0, -50])
                  }}
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold dark:text-white text-light-foreground font-display leading-tight mb-8 transition-colors duration-300"
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
                    <br></br>
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
                    className="text-xl md:text-2xl dark:text-white/80 text-light-foreground/80 font-body mb-10 max-w-lg transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    My dream is to innovate through entrepreneurship and contribute meaningful solutions to society.
                  </motion.p>

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
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div 
          ref={aboutMeRef} 
          className={`relative ${scrollConfig.aboutMeSection.tailwindHeight} mb-32 snap-start scroll-mt-24`}
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
                  opacity: useTransform(
                    aboutMeProgress, 
                    [scrollConfig.animations.aboutMe.title.start, scrollConfig.animations.aboutMe.title.end], 
                    [1, 0]
                  ),
                  filter: useTransform(
                    aboutMeProgress, 
                    [scrollConfig.animations.aboutMe.title.start, scrollConfig.animations.aboutMe.title.end], 
                    ["blur(0px)", "blur(20px)"]
                  ),
                  scale: useTransform(
                    aboutMeProgress, 
                    [scrollConfig.animations.aboutMe.title.start, scrollConfig.animations.aboutMe.title.end], 
                    [1, 1.5]
                  )
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
                      repeat: 0 
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
                className="relative rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
                style={{ 
                  opacity: useTransform(
                    aboutMeProgress, 
                    [
                      scrollConfig.animations.aboutMe.firstCard.start, 
                      scrollConfig.animations.aboutMe.firstCard.end, 
                      scrollConfig.animations.aboutMe.fadeOut.start, 
                      scrollConfig.animations.aboutMe.fadeOut.end
                    ], 
                    [0, 1, 1, 0]
                  ),
                  y: useTransform(
                    aboutMeProgress, 
                    [
                      scrollConfig.animations.aboutMe.firstCard.start, 
                      scrollConfig.animations.aboutMe.firstCard.end, 
                      scrollConfig.animations.aboutMe.fadeOut.start, 
                      scrollConfig.animations.aboutMe.fadeOut.end
                    ], 
                    [50, 0, 0, -50]
                  ),
                  rotateX: useTransform(
                    aboutMeProgress, 
                    [
                      scrollConfig.animations.aboutMe.firstCard.start, 
                      scrollConfig.animations.aboutMe.firstCard.end, 
                      0.55, 0.65
                    ], 
                    [10, 0, 0, 10]
                  ),
                  rotateY: useTransform(
                    aboutMeProgress, 
                    [0.2, 0.3, 0.55, 0.65], 
                    [-5, 0, 0, 5]
                  ),
                  scale: useTransform(
                    aboutMeProgress, 
                    [
                      scrollConfig.animations.aboutMe.firstCard.start, 
                      scrollConfig.animations.aboutMe.firstCard.end - 0.05, 
                      0.55, 0.65
                    ], 
                    [0.9, 1, 1, 0.9]
                  ),
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
                
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-6 relative z-10">
                    {/* Space for a photo */}
                    <div className="hidden md:flex items-center justify-center rounded-2xl border dark:border-white/10 border-light-accent/20 dark:bg-black/20 bg-white/50 backdrop-blur-sm transition-colors duration-300">
                      {/* Photo will go here */}
                    </div>
                    
                    <div className="space-y-6">
                      <motion.div 
                        className="relative border dark:border-white/10 border-light-accent/20 p-2 rounded-2xl transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
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
                        <div className="relative rounded-xl border-white/10 p-4 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                          <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-white/5 bg-light-accent/5 mb-3 transition-colors duration-300">
                            <User className="h-4 w-4 dark:text-white text-light-foreground transition-colors duration-300" />
                          </div>
                          <h4 className="text-xl font-medium dark:text-white/90 text-light-foreground mb-3 font-display transition-colors duration-300">About Me</h4>
                          <p className="dark:text-white/80 text-light-foreground/80 leading-relaxed font-body transition-colors duration-300">
                            Hi! I'm Kaiyuan Li, a senior from San Jose, California. I was born in China and moved to the US when I was 10.
                            I'll be heading to Northeastern University this fall to study Business and Computer Science.
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative border dark:border-white/10 border-light-accent/20 p-2 rounded-2xl transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
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
                        <div className="relative rounded-xl border-white/10 p-4 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                          <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-white/5 bg-light-accent/5 mb-3 transition-colors duration-300">
                            <Sparkles className="h-4 w-4 dark:text-white text-light-foreground transition-colors duration-300" />
                          </div>
                          <h4 className="text-xl font-medium dark:text-white/90 text-light-foreground mb-3 font-display transition-colors duration-300">Interests</h4>
                          <p className="dark:text-white/80 text-light-foreground/80 leading-relaxed font-body transition-colors duration-300">
                            I really like listening to music and play percussion for my school's Wind Ensemble. 
                            Some of my favorite artists are Malcolm Todd, The Neighborhood, Chase Atlantic, and Travis Scott.
                            If you enjoy playing video games, I highly recommend you try out Deep Rock Galactic, Terraria, Risk of Rain 2, and Palworld.
                            Add me on Steam by clicking my socials at the bottom right of the page.
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
          className={`relative ${scrollConfig.whatIDoSection.tailwindHeight} mb-32 snap-start scroll-mt-24`}
          id="what-i-do-section"
        >
          <div className="sticky top-0 py-24 flex items-center justify-center min-h-screen">
            <div className="container-custom w-full max-w-6xl relative">
              <motion.div 
                className="relative rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
                style={{ 
                  opacity: useTransform(whatIDoProgress, 
                    [
                      scrollConfig.animations.whatIDo.fadeIn.start, 
                      scrollConfig.animations.whatIDo.fadeIn.end, 
                      scrollConfig.animations.whatIDo.fadeOut.start, 
                      scrollConfig.animations.whatIDo.fadeOut.end
                    ], 
                    [0, 1, 1, 0]
                  ),
                  y: useTransform(whatIDoProgress, 
                    [
                      scrollConfig.animations.whatIDo.fadeIn.start, 
                      scrollConfig.animations.whatIDo.fadeIn.end, 
                      scrollConfig.animations.whatIDo.fadeOut.start, 
                      scrollConfig.animations.whatIDo.fadeOut.end
                    ], 
                    [100, 0, 0, -50]
                  ),
                  scale: useTransform(whatIDoProgress, 
                    [
                      scrollConfig.animations.whatIDo.fadeIn.start, 
                      scrollConfig.animations.whatIDo.fadeIn.start + 0.1, 
                      scrollConfig.animations.whatIDo.fadeOut.start, 
                      scrollConfig.animations.whatIDo.fadeOut.start + 0.2
                    ], 
                    [0.9, 1, 1, 0.9]
                  ),
                  rotateX: useTransform(whatIDoProgress, 
                    [
                      scrollConfig.animations.whatIDo.fadeIn.start, 
                      scrollConfig.animations.whatIDo.fadeIn.end, 
                      scrollConfig.animations.whatIDo.fadeOut.start, 
                      scrollConfig.animations.whatIDo.fadeOut.start + 0.2
                    ], 
                    [10, 0, 0, -10]
                  )
                }}
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                  <div className="grid md:grid-cols-[3fr_2fr] gap-6 relative z-10">
                    <div className="space-y-6">
                      <motion.div 
                        className="relative border dark:border-white/10 border-light-accent/20 p-2 rounded-2xl transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
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
                        <div className="relative rounded-xl border-white/10 p-4 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                          <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-white/5 bg-light-accent/5 mb-3 transition-colors duration-300">
                            <Code className="h-4 w-4 dark:text-white text-light-foreground transition-colors duration-300" />
                          </div>
                          <h4 className="text-xl font-medium dark:text-white/90 text-light-foreground mb-3 font-display transition-colors duration-300">Ling Gang Guli Guli</h4>
                          <p className="dark:text-white/80 text-light-foreground/80 leading-relaxed font-body transition-colors duration-300">
                            blah-blah-blah-blu-blu-blu-ling-gang-guli
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative border dark:border-white/10 border-light-accent/20 p-2 rounded-2xl transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30"
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
                        <div className="relative rounded-xl border-white/10 p-4 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                          <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-white/5 bg-light-accent/5 mb-3 transition-colors duration-300">
                            <Briefcase className="h-4 w-4 dark:text-white text-light-foreground transition-colors duration-300" />
                          </div>
                          <h4 className="text-xl font-medium dark:text-white/90 text-light-foreground mb-3 font-display transition-colors duration-300">Future Projects</h4>
                          <ul className="space-y-2 dark:text-white/80 text-light-foreground/80 font-body transition-colors duration-300">
                            {[
                              "3D Tetris",
                              "Ran out of ideas",
                              "If you got any",
                              "Lemme know"
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
                    
                    {/* Empty space for a photo */}
                    <div className="hidden md:flex items-center justify-center rounded-2xl border dark:border-white/10 border-light-accent/20 dark:bg-black/20 bg-white/50 backdrop-blur-sm transition-colors duration-300">
                      {/* Photo will go here */}
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
          className={`py-32 ${scrollConfig.capabilitiesSection.tailwindHeight} snap-start scroll-mt-24`}
          id="capabilities-section"
        >
          <div className="sticky top-0 py-24 flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="container-custom w-full max-w-6xl relative">
              {/* Modern title card with enhanced visual effects */}
              <div className="relative rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30 mb-16 shadow-lg">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-8 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                  {/* Remove all background effect divs */}
                  
                  <motion.h2
                    className="text-5xl md:text-7xl font-bold dark:text-white text-light-foreground mb-6 text-center font-display z-10 relative transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Capabilities
                  </motion.h2>

                  <motion.p 
                    className="text-xl md:text-2xl dark:text-white/80 text-light-foreground/80 text-center max-w-xl mx-auto font-body relative z-10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Here's what I bring to the table
                  </motion.p>
                </div>
              </div>
            
              {/* Enhanced horizontal scrolling container */}
              <div className="relative w-full overflow-hidden">
                <motion.div 
                  className="flex space-x-6 px-4 py-4"
                  style={{
                    x: useTransform(capabilitiesProgress, 
                      [
                        scrollConfig.animations.capabilities.scroll.start,
                        scrollConfig.animations.capabilities.scroll.scrollStart,
                        scrollConfig.animations.capabilities.scroll.scrollEnd,
                        scrollConfig.animations.capabilities.scroll.end
                      ],
                      [100, 0, -2400, -2500])
                  }}
                >
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={capability}
                      className="relative border dark:border-white/10 border-light-accent/20 p-2 rounded-2xl transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] flex-shrink-0 w-80 h-40"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: Math.min(index * 0.1, 0.5),
                        ease: "easeOut" 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5
                      }}
                    >
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                      />
                      {/* Card with floating elements and better spacing */}
                      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-white/10 p-6 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
                        
                        <div className="w-fit rounded-lg border dark:border-white/20 border-light-accent/20 p-2 dark:bg-black/30 bg-white/50 backdrop-blur-md transition-colors duration-300">
                          <span className="dark:text-white/80 text-light-foreground/80 text-xl transition-colors duration-300">{index % 3 === 0 ? '⚙️' : index % 3 === 1 ? '💻' : '🚀'}</span>
                        </div>
                        
                        <h3 className="text-xl font-medium dark:text-white text-light-foreground font-body relative z-10 transition-colors duration-300">
                          {capability}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Enhanced gradient fade on edges */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r dark:from-gray-950 from-light-background to-transparent z-10 transition-colors duration-300"></div>
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l dark:from-gray-950 from-light-background to-transparent z-10 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's Collaborate Section */}
        <div className="max-w-4xl mx-auto text-center pb-24 snap-start">
          <motion.h2
            className="text-3xl md:text-4xl font-bold dark:text-white text-light-foreground mb-12 font-display transition-colors duration-300"
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
            <div className="relative inline-block rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <a
                href="/contact"
                className="relative rounded-xl border-white/10 inline-block dark:bg-black/40 bg-white/70 backdrop-blur-sm dark:text-white text-light-foreground px-8 py-4 text-lg font-medium transition-colors duration-300 font-body"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}