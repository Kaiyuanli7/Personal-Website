'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlowingEffect } from './glowing-effect'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  slug: string
  category?: string
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  slug,
  category 
}: ProjectCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/work/${slug}`} className="block cursor-hover">
        <div className="relative rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex flex-col overflow-hidden rounded-xl border-white/10 dark:bg-black/40 bg-white/70 backdrop-blur-sm transition-colors duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-6 space-y-2">
              {category && (
                <p className="text-sm dark:text-white/70 text-light-foreground/70 transition-colors duration-300">{category}</p>
              )}
              <h3 className="text-xl font-medium dark:text-white text-light-foreground transition-colors duration-300">
                {title}
              </h3>
              <p className="dark:text-white/70 text-light-foreground/70 transition-colors duration-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 