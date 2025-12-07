/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      colors: {
        'aura-black': 'var(--color-aura-black)',
        'aura-gray': 'var(--color-aura-gray)',
        'aura-gold': 'var(--color-aura-gold)',
        'aura-gold-light': 'var(--color-aura-gold-light)',
      }
    },
  },
  plugins: [],
}