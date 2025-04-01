import Link from 'next/link'

interface ButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function Button({ href, children, className = '' }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </Link>
  )
} 