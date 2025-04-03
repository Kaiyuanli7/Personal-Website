'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll } from '@/context/ScrollContext'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const { lenis } = useScroll()
  const sectionRef = useRef<HTMLElement>(null)

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
    <section ref={sectionRef} className="relative py-48">
      <div className="absolute inset-0 bg-white rounded-[100px]" />
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto">
          {/* About Me */}
          <div className="text-center mb-32">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-xl text-secondary mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm a passionate developer with a keen eye for design and a love for creating
              seamless user experiences. My journey in web development started with a simple
              curiosity about how websites work, and it has evolved into a professional
              pursuit of excellence in digital craftsmanship.
            </motion.p>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <motion.div
              className="p-6 bg-black/5 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-black mb-4">Technical Skills</h3>
              <ul className="space-y-2 text-secondary">
                <li>• React & Next.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Node.js</li>
                <li>• Git & GitHub</li>
                <li>• Responsive Design</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-black/5 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-black mb-4">Soft Skills</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Problem Solving</li>
                <li>• Team Collaboration</li>
                <li>• Communication</li>
                <li>• Time Management</li>
                <li>• Attention to Detail</li>
                <li>• Continuous Learning</li>
              </ul>
            </motion.div>
          </div>

          {/* Experience */}
          <div className="text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Experience
            </motion.h2>
            <motion.p
              className="text-xl text-secondary mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With several years of experience in web development, I've worked on various
              projects ranging from small business websites to complex web applications.
              My focus is always on creating efficient, scalable, and user-friendly solutions.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
} 