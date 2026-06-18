/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          DEFAULT: '#2E4036',
          light: '#3F584A',
          dark: '#1E2B24',
        },
        clay: {
          DEFAULT: '#CC5833',
          light: '#E06B46',
          dark: '#B04724',
        },
        cream: {
          DEFAULT: '#F2F0E9',
          light: '#FAF9F6',
          dark: '#E5E2D5',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2E2E2E',
          dark: '#0D0D0D',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
