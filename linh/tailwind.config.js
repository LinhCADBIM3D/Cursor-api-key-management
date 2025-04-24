/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        notification: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '10%': { transform: 'translateY(0)', opacity: '1' },
          '90%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fontFamily: {
          sans: ['var(--font-inter)'],
        },
      },
      animation: {
        'notification': 'notification 2s ease-out forwards',
      }
    },
  },
  plugins: [],
} 