/**
 * STUDIO DNA ENGINE — Synchronized Dual-Gradient Engine
 * Bridges the 16 Three.js backdrop bars with the 16 central sequencer key materials (Grayscale step 01..16).
 * Enforces atomic preset application across typography, surfaces, lighting, and 3D hardware materials.
 */

function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function rgbToHex(r, g, b) {
  const to255 = v => Math.max(0, Math.min(255, Math.round(v * 255)));
  const toHex = v => to255(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getRelativeLuminance(r, g, b) {
  const toLinear = c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Computes a monotonic 16-step gradient array between start and end colors
 * @param {string} startHex
 * @param {string} endHex
 * @param {number} exponent - Curvature exponent (default: 1.3)
 * @returns {Array<{ index: number, hex: string, r: number, g: number, b: number, luminance: number }>}
 */
function compute16StepGradient(startHex, endHex, exponent = 1.3) {
  const c1 = hexToRgb(startHex);
  const c2 = hexToRgb(endHex);
  const STEPS = 16;
  const result = [];

  for (let i = 0; i < STEPS; i++) {
    const t = i / (STEPS - 1);
    const u = Math.pow(t, exponent);

    const r = c1.r + (c2.r - c1.r) * u;
    const g = c1.g + (c2.g - c1.g) * u;
    const b = c1.b + (c2.b - c1.b) * u;

    result.push({
      index: i,
      hex: rgbToHex(r, g, b),
      r: Number(r.toFixed(4)),
      g: Number(g.toFixed(4)),
      b: Number(b.toFixed(4)),
      luminance: Number(getRelativeLuminance(r, g, b).toFixed(4))
    });
  }

  return result;
}

const PRESETS = {
  swiss: {
    id: 'swiss',
    name: 'Swiss Alpine Obsidian',
    badge: 'OP–XY',
    flag: '🇨🇭',
    fonts: {
      sans: 'Geist',
      mono: 'Geist Mono'
    },
    colors: {
      '--bg': '#0c0d0e',
      '--surface': '#151618',
      '--surface-raised': '#1c1e22',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--border-strong': 'rgba(255, 255, 255, 0.18)',
      '--fg': '#e2e4e8',
      '--fg-dim': '#8b8f97',
      '--fg-muted': '#52565e',
      '--rec': '#ff3a2f',
      '--rec-dim': 'rgba(255, 58, 47, 0.22)',
      '--status-lens': '#00ffaa'
    },
    gradient: {
      startHex: '#121314',
      endHex: '#c0c8d2',
      toneRange: [0.01, 0.31]
    },
    textGradient: {
      startHex: '#555960',
      endHex: '#ffffff'
    },
    copy: {
      brand: 'OP–XY',
      price: '$2,299',
      claim: 'a synthesizer, a sampler and a sequencer. one instrument, all black.',
      sub: 'portable synthesizer · sampler · sequencer',
      word4: 'perform.',
      specs: 'four rows · 68 keys · one grayscale',
      desc: 'the whole instrument is a grid. one row of instruments, one row of steps, and a two-octave keyboard under your fingers.'
    }
  },

  berlin: {
    id: 'berlin',
    name: 'Berlin Dark Steel',
    badge: 'KRONOS–8',
    flag: '🇩🇪',
    fonts: {
      sans: 'Chakra Petch',
      mono: 'JetBrains Mono'
    },
    colors: {
      '--bg': '#070809',
      '--surface': '#0e1012',
      '--surface-raised': '#15191c',
      '--border': 'rgba(0, 255, 102, 0.12)',
      '--border-strong': 'rgba(0, 255, 102, 0.28)',
      '--fg': '#dce8e0',
      '--fg-dim': '#768c7e',
      '--fg-muted': '#45574c',
      '--rec': '#00ff66',
      '--rec-dim': 'rgba(0, 255, 102, 0.24)',
      '--status-lens': '#00ff66'
    },
    gradient: {
      startHex: '#09140d',
      endHex: '#4ee884',
      toneRange: [0.015, 0.38]
    },
    textGradient: {
      startHex: '#00ff66',
      endHex: '#dcfce7'
    },
    copy: {
      brand: 'KRONOS–8',
      price: '€2,450',
      claim: 'sixteen raw analog tracks. forged in dark steel, engineered for the floor.',
      sub: 'precision analog workstation · dual dsp core',
      word4: 'trigger.',
      specs: '68 microswitches · zero latency · phosphor display',
      desc: 'every tactile response is calibrated for club acoustics. velocity-sensitive mechanical pads and dedicated macro pots.'
    }
  },

  braun: {
    id: 'braun',
    name: 'Braun Functional Heritage',
    badge: 'MODUL–01',
    flag: '🇩🇪',
    fonts: {
      sans: 'Plus Jakarta Sans',
      mono: 'IBM Plex Mono'
    },
    colors: {
      '--bg': '#131211',
      '--surface': '#1c1a18',
      '--surface-raised': '#262320',
      '--border': 'rgba(235, 215, 195, 0.10)',
      '--border-strong': 'rgba(235, 215, 195, 0.22)',
      '--fg': '#f2ece2',
      '--fg-dim': '#a1978a',
      '--fg-muted': '#5c554c',
      '--rec': '#e8590c',
      '--rec-dim': 'rgba(232, 89, 12, 0.24)',
      '--status-lens': '#f59f00'
    },
    gradient: {
      startHex: '#161310',
      endHex: '#e8a964',
      toneRange: [0.012, 0.35]
    },
    textGradient: {
      startHex: '#e8590c',
      endHex: '#fef08a'
    },
    copy: {
      brand: 'MODUL–01',
      price: '$1,950',
      claim: 'order, clarity and restraint. an honest instrument for timeless sound design.',
      sub: 'electroacoustic sound system · intuitive composition',
      word4: 'articulate.',
      specs: '68 precision contacts · matte chassis · tactile feedback',
      desc: 'form derived strictly from acoustic purpose. tactile mechanical switches grouped by functional hierarchy.'
    }
  },

  tokyo: {
    id: 'tokyo',
    name: 'Tokyo Neo-Acoustic',
    badge: 'AETHEL–XY',
    flag: '🇯🇵',
    fonts: {
      sans: 'Syne',
      mono: 'Space Mono'
    },
    colors: {
      '--bg': '#090b10',
      '--surface': '#10141d',
      '--surface-raised': '#18202f',
      '--border': 'rgba(0, 229, 255, 0.12)',
      '--border-strong': 'rgba(0, 229, 255, 0.28)',
      '--fg': '#e2e9f5',
      '--fg-dim': '#7e90b0',
      '--fg-muted': '#4a5770',
      '--rec': '#00e5ff',
      '--rec-dim': 'rgba(0, 229, 255, 0.25)',
      '--status-lens': '#00e5ff'
    },
    gradient: {
      startHex: '#070f1a',
      endHex: '#00e5ff',
      toneRange: [0.015, 0.40]
    },
    textGradient: {
      startHex: '#00e5ff',
      endHex: '#38bdf8'
    },
    copy: {
      brand: 'AETHEL–XY',
      price: '¥348,000',
      claim: 'physical modeling meets generative sequencing. precision in every touch.',
      sub: 'neural polyphonic engine · multi-timbral studio',
      word4: 'compose.',
      specs: '68 micro-actuated keys · haptic feedback · dual neural dsp',
      desc: 'designed for fluid real-time improvisation. high-speed scanning matrix captures subtle finger velocity.'
    }
  },

  aura: {
    id: 'aura',
    name: 'Aura Precision',
    badge: 'AURA–XY',
    flag: '🇸🇪',
    fonts: {
      sans: 'Inter',
      mono: 'Geist Mono'
    },
    colors: {
      '--bg': '#0a0c10',
      '--surface': '#12151c',
      '--surface-raised': '#1a1f29',
      '--border': 'rgba(99, 102, 241, 0.14)',
      '--border-strong': 'rgba(99, 102, 241, 0.32)',
      '--fg': '#e2e8f0',
      '--fg-dim': '#818cf8',
      '--fg-muted': '#475569',
      '--rec': '#6366f1',
      '--rec-dim': 'rgba(99, 102, 241, 0.24)',
      '--status-lens': '#38bdf8'
    },
    gradient: {
      startHex: '#0c0f17',
      endHex: '#60a5fa',
      toneRange: [0.012, 0.36]
    },
    textGradient: {
      startHex: '#818cf8',
      endHex: '#ffffff'
    },
    copy: {
      brand: 'AURA–XY',
      price: '$2,199',
      claim: 'sculpted from raw aluminum. twenty-four voices in an ethereal sonic field.',
      sub: 'precision digital synthesizer · aura dsp engine',
      word4: 'transcend.',
      specs: '68 magnetic switches · ultra-low jitter · titanium casing',
      desc: 'every note flows through dual micro-controllers. tactile keys with continuous polyphonic aftertouch.'
    }
  }
};

/**
 * Resolves full preset configuration with precomputed gradient steps
 * @param {string} id
 * @returns {Object}
 */
function resolvePreset(id) {
  const p = PRESETS[id];
  if (!p) return null;
  const steps = compute16StepGradient(p.gradient.startHex, p.gradient.endHex);
  return {
    ...p,
    gradient: {
      ...p.gradient,
      steps
    }
  };
}

/**
 * Applies a 16-step gradient strictly to the sequencer step keys, leaving LEDs and physics intact.
 * @param {Object} controls - Map of key controls (e.g. OPXY.controls)
 * @param {Array<{ r: number, g: number, b: number }>} gradientSteps - 16 calculated steps
 * @returns {number} Updated control count
 */
function applyGradientToStepKeys(controls, gradientSteps) {
  if (!controls || !Array.isArray(gradientSteps)) return 0;
  let updatedCount = 0;

  for (let i = 0; i < 16; i++) {
    const keyId = `key-${22 + i}`;
    const control = controls[keyId];
    const stepColor = gradientSteps[i];
    if (!control || !stepColor) continue;

    control.traverse(o => {
      if (o.isMesh && o.material) {
        // Only update step cap and base meshes, preserve LED cavity!
        const isStepMesh = /base|cap/i.test(o.name) || /Grayscale step/i.test(o.material.name || '');
        const isLed = /LED|cavity/i.test(o.name) || /Soft white LED/i.test(o.material.name || '');

        if (isStepMesh && !isLed) {
          if (o.material.color && typeof o.material.color.setRGB === 'function') {
            o.material.color.setRGB(stepColor.r, stepColor.g, stepColor.b);
          }
        }
      }
    });

    updatedCount++;
  }

  return updatedCount;
}

module.exports = {
  PRESETS,
  compute16StepGradient,
  resolvePreset,
  applyGradientToStepKeys,
  hexToRgb,
  rgbToHex
};
