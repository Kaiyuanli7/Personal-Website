/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#888888',
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
        luxurious: ['var(--font-luxurious)', 'serif'],
      },
      animation: {
        'aurora-slow': 'aurora 15s linear infinite',
        'aurora-medium': 'aurora 12s linear infinite',
        'aurora-fast': 'aurora 10s linear infinite',
        'aurora-medium-reverse': 'aurora-reverse 12s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        'aurora-reverse': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 50px) scale(1.2)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 