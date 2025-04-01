'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
      className="group cursor-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/work/${slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden mb-6">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="space-y-2">
          {category && (
            <p className="text-sm text-secondary">{category}</p>
          )}
          <h3 className="text-xl font-medium group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-secondary">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
} 