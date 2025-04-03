'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-16 border-t border-zinc-900">
      <div className="container-custom">
        <div className="flex justify-center">
          <p className="text-secondary">&copy; {currentYear} Kaiyuan Li</p>
        </div>
      </div>
    </footer>
  )
} 