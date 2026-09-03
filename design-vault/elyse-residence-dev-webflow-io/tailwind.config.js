/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./site/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgBase: '#080807',
        bgSurface: '#121210',
        bgCard: '#181816',
        accentGold: '#C5A880',
        textMain: '#F5F5F0',
        textMuted: '#A0A09A'
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
