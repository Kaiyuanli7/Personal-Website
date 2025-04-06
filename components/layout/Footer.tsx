'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-12 mt-16 border-t border-zinc-800/30 dark:border-zinc-300/20 transition-colors duration-300 relative">
      <div className="bg-light-background/50 dark:bg-dark-background/50 absolute inset-0 backdrop-blur-sm z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <p className="text-light-foreground dark:text-white font-medium transition-colors duration-300">
            &copy; {currentYear} Kaiyuan Li
          </p>
        </div>
      </div>
    </footer>
  )
} 