'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Instagram, Mail } from 'lucide-react'

const SteamIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="currentColor" 
    className="bi bi-steam" 
    viewBox="0 0 16 16"
  >
    <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/>
    <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Kaiyuanli7', icon: Github },
    { name: 'Instagram', href: 'https://www.instagram.com/kaiyuansz/', icon: Instagram },
    { name: 'Steam', href: 'https://steamcommunity.com/profiles/76561199062478777/', icon: SteamIcon },
    { name: 'Email', href: 'mailto:kaiyuan.li@outlook.com', icon: Mail },
  ]

  return (
    <footer className="py-16 mt-16 border-t border-zinc-800/30 dark:border-zinc-300/20 transition-colors duration-300 relative">
      <div className="bg-light-background/50 dark:bg-dark-background/50 absolute inset-0 backdrop-blur-sm z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-foreground dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-light-foreground/70 dark:text-white/70 hover:text-light-foreground dark:hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-foreground dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-foreground/70 dark:text-white/70 hover:text-light-foreground dark:hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-foreground dark:text-white">Contact</h3>
            <p className="text-light-foreground/70 dark:text-white/70">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>
            <a 
              href="mailto:kaiyuan.li@outlook.com"
              className="text-light-foreground/70 dark:text-white/70 hover:text-light-foreground dark:hover:text-white transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>kaiyuan.li@outlook.com</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-800/30 dark:border-zinc-300/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-light-foreground/70 dark:text-white/70 text-sm">
              &copy; {currentYear} Kaiyuan Li. All rights reserved.
            </p>
            <p className="text-light-foreground/50 dark:text-white/50 text-sm">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 