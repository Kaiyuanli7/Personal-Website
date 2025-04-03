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
      }
      addUtilities(newUtilities)
    },
  ],
} 