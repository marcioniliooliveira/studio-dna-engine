const fs = require('fs');
const path = require('path');

/**
 * Gera um arquivo tailwind.config.js a partir dos tokens de cores e tipografia extraídos
 */
function generateTailwindConfig(dna, outputPath = null) {
  const colors = {};
  
  if (dna && dna.colors && dna.colors.variables) {
    Object.entries(dna.colors.variables).forEach(([key, val]) => {
      const cleanKey = key.replace(/^--/, '').replace(/[^a-zA-Z0-9-_]/g, '-');
      if (val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl')) {
        colors[cleanKey] = val;
      }
    });
  }

  const fonts = {};
  if (dna && dna.typography) {
    Object.entries(dna.typography).forEach(([key, val]) => {
      if (val.fontFamily) {
        const familyName = val.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        fonts[key] = [familyName, 'sans-serif'];
      }
    });
  }

  const tailwindContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8).replace(/"/g, "'")},
      fontFamily: ${JSON.stringify(fonts, null, 8).replace(/"/g, "'")},
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
`;

  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, tailwindContent, 'utf8');
  }

  return tailwindContent;
}

module.exports = {
  generateTailwindConfig
};
