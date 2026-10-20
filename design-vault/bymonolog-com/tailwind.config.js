/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './site/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        "brand-1": "#000",
        "brand-2": "#0000",
        "brand-3": "#0000004d",
        "brand-4": "#000000e6",
        "brand-5": "#0006",
        "brand-6": "#0082f3",
        "brand-7": "#080807",
        "brand-8": "#080807a6",
        "brand-9": "#080807cc",
        "brand-10": "#146ef5",
        "brand-11": "#181715",
        "brand-12": "#1c1c1c"
},
      fontFamily: {
        sans: ["sans-serif","monospace","webflow-icons"]
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-out': 'cubic-bezier(0.2, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};
