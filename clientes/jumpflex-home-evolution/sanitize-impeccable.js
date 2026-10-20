const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'JumpPlay — Family Reveal & Kinetic Range.html');
let content = fs.readFileSync(targetPath, 'utf8');

console.log('[Sanitize] Reading target file:', targetPath);
const originalLength = content.length;

// 1. Clean Tailwind font family tokens
content = content.replace(
  `"body-lg": ["'Manrope'", "'Space Grotesk'", "sans-serif"],`,
  `"body-lg": ["'Manrope'", "sans-serif"],`
);
content = content.replace(
  `"body-md": ["'Manrope'", "'Space Grotesk'", "sans-serif"],`,
  `"body-md": ["'Manrope'", "sans-serif"],`
);
content = content.replace(
  `"label-mono": ["'Space Grotesk'", "monospace"],`,
  `"label-mono": ["'JetBrains Mono'", "monospace"],`
);
content = content.replace(
  `"jakarta": ["'Plus Jakarta Sans'", "sans-serif"],`,
  `"jakarta": ["'Manrope'", "sans-serif"],`
);

// 2. Eliminate bounce-easing in CSS root variables
content = content.replace(
  `--ease-elastic:  cubic-bezier(0.34, 1.56, 0.64, 1);`,
  `--ease-elastic:  cubic-bezier(0.16, 1, 0.3, 1);`
);

// 3. Page level font family
content = content.replace(
  `font-family: 'Space Grotesk', 'Manrope', sans-serif;`,
  `font-family: 'Manrope', sans-serif;`
);

// 4. Eliminate layout-transition on width in drawer shipping progress bar
content = content.replace(
  `transition: width 0.4s ease;`,
  `transform-origin: left; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);`
);

// 5. Replace all occurrences of Plus Jakarta Sans with Manrope
content = content.replace(/'Plus Jakarta Sans'/g, `'Manrope'`);
content = content.replace(/"Plus Jakarta Sans"/g, `"Manrope"`);

// 6. Replace dark-glow box-shadow on btn-checkout-jump and btn-confirm-order
content = content.replace(
  `box-shadow: 0 4px 18px rgba(169, 229, 44, 0.35);`,
  `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);`
);
content = content.replace(
  `box-shadow: 0 6px 22px rgba(169, 229, 44, 0.45);`,
  `box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);`
);
// In case of multiple occurrences:
content = content.replace(
  `box-shadow: 0 4px 18px rgba(169, 229, 44, 0.35);`,
  `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);`
);
content = content.replace(
  `box-shadow: 0 6px 22px rgba(169, 229, 44, 0.45);`,
  `box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);`
);
content = content.replace(
  `box-shadow: 0 0 20px rgba(169,229,44,0.4);`,
  `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.38);`
);

// 7. Eliminate bounce-easing in .hspot-tip
content = content.replace(
  `transition:opacity .24s cubic-bezier(.34,1.56,.64,1), transform .28s cubic-bezier(.34,1.56,.64,1);`,
  `transition:opacity .24s cubic-bezier(0.16, 1, 0.3, 1), transform .28s cubic-bezier(0.16, 1, 0.3, 1);`
);

// 8. Eliminate dark-glow shadow on B2B CTA button
content = content.replace(
  `shadow-[0_8px_32px_rgba(169,229,44,.35)] hover:shadow-[0_12px_48px_rgba(169,229,44,.55)]`,
  `shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.45)]`
);

// 9. Eliminate decorative pulsing dot in B2B card header
content = content.replace(
  `<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt-lime opacity-60"></span>\r\n                    <span class="relative inline-flex rounded-full h-2 w-2 bg-volt-lime"></span>`,
  `<span class="inline-flex rounded-full h-2 w-2 bg-volt-lime"></span>`
);
content = content.replace(
  `<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt-lime opacity-60"></span>\n                    <span class="relative inline-flex rounded-full h-2 w-2 bg-volt-lime"></span>`,
  `<span class="inline-flex rounded-full h-2 w-2 bg-volt-lime"></span>`
);

// 10. Clean numbered section labels 01, 02, 03, 04 in B2B form
content = content.replace(
  `<span class="text-volt-lime mr-1">01</span>`,
  ``
);
content = content.replace(
  `<span class="text-volt-lime mr-1">02</span>`,
  ``
);
content = content.replace(
  `<span class="text-volt-lime mr-1">03</span>`,
  ``
);
content = content.replace(
  `<span class="text-volt-lime mr-1">04</span>`,
  ``
);
// 11. Eliminate remaining chromatic zero-offset glow shadows
content = content.replace(
  `box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(169, 229, 44, 0.1);`,
  `box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.25);`
);
content = content.replaceAll(
  `shadow-[0_4px_15px_rgba(169,229,44,0.3)]`,
  `shadow-[0_4px_14px_rgba(0,0,0,0.3)]`
);
content = content.replace(
  `box-shadow: 0 0 0 3px rgba(169, 229, 44, 0.15);`,
  `box-shadow: 0 0 0 2px #A9E52C;`
);

// Write back
fs.writeFileSync(targetPath, content, 'utf8');
console.log('[Sanitize] File updated successfully! New length:', content.length, 'Delta:', content.length - originalLength);
