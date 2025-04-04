import Link from 'next/link'
import { GlowingEffect } from './glowing-effect'

interface ButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ href, children, className = '', size = 'md' }: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <div className="relative inline-block rounded-2xl border border-white/10 p-2 transition-all duration-300 hover:border-white/20">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <Link
        href={href}
        className={`relative rounded-xl border-white/10 inline-block bg-black/40 backdrop-blur-sm text-white font-medium transition-colors ${sizeClasses[size]} ${className}`}
      >
        {children}
      </Link>
    </div>
  )
} 