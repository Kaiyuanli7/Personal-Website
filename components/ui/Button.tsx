import Link from 'next/link'
import { GlowingEffect } from './glowing-effect'
import { useTheme } from '@/context/ThemeContext'

interface ButtonProps {
  href?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Button({ 
  href, 
  children, 
  className = '', 
  size = 'md',
  onClick
}: ButtonProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Common button styling with dark/light mode support and gradient backgrounds
  const buttonClasses = `relative rounded-xl border-white/10 inline-block 
    ${theme === 'dark' ? 'bg-gradient-accent-dark text-white' : 'bg-gradient-accent-light text-white'}
    transition-all duration-300 
    backdrop-blur-sm font-medium ${sizeClasses[size]} ${className}`

  return (
    <div className="relative inline-block rounded-2xl border dark:border-white/10 border-light-accent/20 p-2 transition-all duration-300 dark:hover:border-white/20 hover:border-light-accent/30">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      {onClick ? (
        // Render as button when onClick is provided
        <button
          onClick={onClick}
          className={buttonClasses}
        >
          {children}
        </button>
      ) : (
        // Render as Link when href is provided
        <Link
          href={href || '#'}
          className={buttonClasses}
        >
          {children}
        </Link>
      )}
    </div>
  )
} 