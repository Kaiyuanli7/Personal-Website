'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-16 border-t border-zinc-900">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-secondary mb-2">&copy; {currentYear} Your Name</p>
            <p className="text-sm text-secondary">Creative Developer</p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <ul className="flex flex-wrap space-x-6">
              <li>
                <Link 
                  href="/" 
                  className="text-secondary hover:text-white transition-colors duration-300 cursor-hover"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/background" 
                  className="text-secondary hover:text-white transition-colors duration-300 cursor-hover"
                >
                  Background
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="text-secondary hover:text-white transition-colors duration-300 cursor-hover"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-secondary hover:text-white transition-colors duration-300 cursor-hover"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 