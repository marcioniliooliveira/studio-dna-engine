'use strict';

const fs = require('node:fs');
const path = require('node:path');

const TOOL_ROOT = path.resolve(__dirname, '..', '..');

function isPathInsideToolRoot(candidatePath) {
  const rel = path.relative(TOOL_ROOT, path.resolve(candidatePath));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

/**
 * Resolves runtime workspace directories separating the Studio DNA engine (TOOL_ROOT)
 * from user projects/scrapes (workspaceRoot).
 *
 * Resolution priority:
 * 1. options.workspaceDir / options.rootDir
 * 2. process.env.STUDIO_DNA_WORKSPACE
 * 3. process.cwd()
 */
function resolveWorkspacePaths(options = {}) {
  const rawRoot = options.workspaceDir || options.rootDir || process.env.STUDIO_DNA_WORKSPACE || process.cwd();
  const workspaceRoot = path.resolve(rawRoot);
  const isExternalWorkspace = !isPathInsideToolRoot(workspaceRoot);

  const copiesOverride = options.copiasDir || options.outputDir;
  const copiasDir = path.resolve(copiesOverride || path.join(workspaceRoot, 'copias'));
  const clientesDir = path.resolve(options.clientesDir || path.join(workspaceRoot, 'clientes'));
  const dataDir = path.resolve(options.dataDir || path.join(workspaceRoot, 'data'));
  const qaReportsDir = path.resolve(options.qaReportsDir || path.join(workspaceRoot, 'qa-reports'));

  const localVault = path.join(workspaceRoot, 'design-vault');
  const toolVault = path.join(TOOL_ROOT, 'design-vault');
  const designVaultDir = path.resolve(
    options.vaultDir || (fs.existsSync(localVault) ? localVault : toolVault)
  );

  return {
    toolRoot: TOOL_ROOT,
    workspaceRoot,
    isExternalWorkspace,
    copiasDir,
    clientesDir,
    dataDir,
    qaReportsDir,
    designVaultDir
  };
}

/**
 * Initializes an external workspace folder with clean project directories and manifest.
 */
function ensureWorkspaceStructure(workspaceDir) {
  const paths = resolveWorkspacePaths({ workspaceDir });

  fs.mkdirSync(paths.copiasDir, { recursive: true });
  fs.mkdirSync(paths.clientesDir, { recursive: true });
  fs.mkdirSync(paths.dataDir, { recursive: true });
  fs.mkdirSync(paths.qaReportsDir, { recursive: true });

  const manifestPath = path.join(paths.workspaceRoot, 'studio-dna.workspace.json');
  if (!fs.existsSync(manifestPath)) {
    const manifest = {
      schemaVersion: 1,
      tool: 'studio-dna-engine',
      createdAt: new Date().toISOString(),
      directories: {
        copias: 'copias',
        clientes: 'clientes',
        data: 'data',
        qaReports: 'qa-reports'
      }
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  }

  return paths;
}

module.exports = {
  TOOL_ROOT,
  resolveWorkspacePaths,
  ensureWorkspaceStructure
};
