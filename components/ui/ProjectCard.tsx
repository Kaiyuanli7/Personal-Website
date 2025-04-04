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
        <div className="relative rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex flex-col overflow-hidden rounded-xl border-white/10 bg-black/40 backdrop-blur-sm">
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
                <p className="text-sm text-white/70">{category}</p>
              )}
              <h3 className="text-xl font-medium text-white transition-colors duration-300">
                {title}
              </h3>
              <p className="text-white/70">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 