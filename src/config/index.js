const fs = require('fs');
const path = require('path');
const { resolveWorkspacePaths } = require('./workspace');

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
  const workspace = resolveWorkspacePaths({
    workspaceDir: customOverrides.workspaceDir || customOverrides.rootDir,
    outputDir: customOverrides.outputDir
  });

  let fileConfig = {};
  const workspaceConfigPath = path.join(workspace.workspaceRoot, 'cloner.config.json');
  const cwdConfigPath = path.join(process.cwd(), 'cloner.config.json');
  const configPath = fs.existsSync(workspaceConfigPath) ? workspaceConfigPath : cwdConfigPath;

  if (fs.existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ [Config] Erro ao ler cloner.config.json, usando valores padrão.');
    }
  }

  const cleanOverrides = Object.fromEntries(
    Object.entries(customOverrides).filter(([_, v]) => v !== undefined)
  );

  const resolvedOutputDir = cleanOverrides.outputDir
    || fileConfig.outputDir
    || workspace.copiasDir;

  return {
    ...DEFAULT_CONFIG,
    ...fileConfig,
    ...cleanOverrides,
    outputDir: path.resolve(resolvedOutputDir),
    workspaceRoot: workspace.workspaceRoot,
    clientesDir: workspace.clientesDir,
    dataDir: workspace.dataDir,
    designVaultDir: workspace.designVaultDir,
    viewport: {
      ...DEFAULT_CONFIG.viewport,
      ...(fileConfig.viewport || {}),
      ...(cleanOverrides.viewport || {})
    }
  };
}

module.exports = {
  DEFAULT_CONFIG,
  loadConfig
};
