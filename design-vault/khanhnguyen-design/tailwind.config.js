/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './site/**/*.{html,js,astro}',
    './*.html'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#262220',
          dark: '#2E2B28'
        },
        obsidian: '#1F1D1B',
        graphite: '#3A3632',
        linen: '#FAF9F6',
        sand: '#EDEAE6',
        ivory: '#F3EEE8',
        muted: '#8A8178'
      },
      fontFamily: {
        serif: ['"PP Editorial Old"', 'Georgia', 'serif'],
        'serif-2': ['"PP Editorial Old"', 'serif'],
        sans: ['"PP Neue Montreal"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.04em'
      }
    }
  },
  plugins: []
};
