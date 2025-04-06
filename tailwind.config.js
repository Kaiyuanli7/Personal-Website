/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#888888',
        dark: {
          background: '#0a0a0a',
          foreground: '#ededed',
          accent: '#2563eb',       // Base blue for dark mode (part of the gradient)
          accentSecondary: '#8b5cf6', // Purple for dark mode (part of the gradient)
          muted: '#888888',
        },
        light: {
          // Light theme colors based on the Nite Riot website
          background: '#f7f7f2', // Light cream/off-white background
          foreground: '#1a1a1a', // Dark text for contrast
          accent: '#3b82f6',     // Base blue for light mode (part of the gradient)
          accentSecondary: '#8b5cf6', // Purple for light mode (part of the gradient)
          muted: '#7c6f64',      // Muted brown for secondary text
          red: '#cc241d',        // Red
          green: '#98971a',      // Green
          yellow: '#d79921',     // Yellow
          blue: '#458588',       // Blue
          purple: '#b16286',     // Purple
          aqua: '#689d6a',       // Aqua
          orange: '#d65d0e',     // Orange
        }
      },
      backgroundImage: {
        'gradient-accent-light': 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        'gradient-accent-dark': 'linear-gradient(90deg, #2563eb, #8b5cf6)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        luxurious: ['var(--font-luxurious)'],
        sans: ['var(--font-titillium)', 'sans-serif'],
        display: ['var(--font-titillium)', 'sans-serif'],
        body: ['var(--font-titillium)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.transform-3d': {
          'transform-style': 'preserve-3d',
        },
        '.size-full': {
          'width': '100%',
          'height': '100%',
        },
        '.size-\\[1720px\\]': {
          'width': '1720px',
          'height': '1720px',
        },
        '.text-gradient-light': {
          'background': 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-dark': {
          'background': 'linear-gradient(90deg, #2563eb, #8b5cf6)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text', 
          'color': 'transparent',
        }
      }
      addUtilities(newUtilities)
    },
  ],
} 