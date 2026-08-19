const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  outputDir: path.join(process.cwd(), 'copias'),
  headless: true,
  timeout: 45000,
  viewport: {
    width: 1920,
    height: 1080
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  previewPort: 4000,
  proxy: null
};

function loadConfig(customOverrides = {}) {
  let fileConfig = {};
  const configPath = path.join(process.cwd(), 'cloner.config.json');

  if (fs.existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ [Config] Erro ao ler cloner.config.json, usando valores padrão.');
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...fileConfig,
    ...customOverrides,
    viewport: {
      ...DEFAULT_CONFIG.viewport,
      ...(fileConfig.viewport || {}),
      ...(customOverrides.viewport || {})
    }
  };
}

module.exports = {
  DEFAULT_CONFIG,
  loadConfig
};
