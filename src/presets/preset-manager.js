/**
 * Studio DNA Engine — Preset Manager
 * Carrega, valida e converte os presets de design em tokens CSS e configurações de runtime
 */

const fs = require('fs');
const path = require('path');

const PRESETS_FILE = path.join(__dirname, 'design-presets.json');

function loadDesignPresets() {
  const raw = fs.readFileSync(PRESETS_FILE, 'utf8');
  return JSON.parse(raw);
}

function getPresetById(id) {
  const presets = loadDesignPresets();
  const found = presets.find(p => p.id === id);
  if (!found) {
    throw new Error(`Preset with id "${id}" not found. Available: ${presets.map(p => p.id).join(', ')}`);
  }
  return found;
}

function generatePresetCssTokens(presetId) {
  const preset = getPresetById(presetId);
  return `
/* Studio DNA Preset: ${preset.name} (${preset.id}) */
:root {
  --dna-bg: ${preset.colors.background};
  --dna-surface: ${preset.colors.surface};
  --dna-primary: ${preset.colors.primary};
  --dna-accent: ${preset.colors.accent};
  --dna-text: ${preset.colors.text};
  --dna-muted: ${preset.colors.muted};
  --dna-font-heading: ${preset.typography.family};
  --dna-tracking-heading: ${preset.typography.tracking};
  --dna-weight-heading: ${preset.typography.headingWeight};
  --dna-motion-scrub: ${preset.motion.scrub}s;
  --dna-motion-ease: ${preset.motion.ease};
  --dna-stage-safe-height: ${Math.round(preset.stageDefaults.safeZoneHeight * 100)}%;
  --dna-stage-bottom-margin: ${Math.round(preset.stageDefaults.bottomMargin * 100)}%;
}
  `.trim();
}

module.exports = {
  loadDesignPresets,
  getPresetById,
  generatePresetCssTokens
};
