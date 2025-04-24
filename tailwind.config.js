/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'modal-enter': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'modal-exit': {
          '0%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
        },
        'overlay-enter': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'overlay-exit': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      animation: {
        'modal-enter': 'modal-enter 0.2s ease-out',
        'modal-exit': 'modal-exit 0.2s ease-in',
        'overlay-enter': 'overlay-enter 0.2s ease-out',
        'overlay-exit': 'overlay-exit 0.2s ease-in',
        'blob': 'blob 7s infinite',
      }
    },
  },
  plugins: [],
} 