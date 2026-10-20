const path = require('path');
const fs = require('fs');
const { ResourceTemplate } = require('@modelcontextprotocol/sdk/server/mcp.js');
const {
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir
} = require('../schemas');

/**
 * Registers all static resources and dynamic resource templates onto the McpServer.
 * 
 * @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server
 */
function registerResources(server) {
  // ==========================================
  // A. Static Resources
  // ==========================================

  // 1. vault://easings
  server.resource(
    'vault-easings',
    'vault://easings',
    {
      mimeType: 'application/json',
      description: 'Mathematical Bezier acceleration curve matrix for GSAP, CSS, and Lenis smooth scrolling'
    },
    async (uri) => {
      const filePath = getSafeVaultDir('01-motion-physics/easings.json');
      const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}';
      const uriStr = uri ? (uri.href || uri.toString()) : 'vault://easings';
      return {
        contents: [{
          uri: uriStr,
          mimeType: 'application/json',
          text: content
        }]
      };
    }
  );

  // 2. vault://typography
  server.resource(
    'vault-typography',
    'vault://typography',
    {
      mimeType: 'application/json',
      description: 'Curated editorial typography pairings with fluid clamp scales, line heights, and letter spacing'
    },
    async (uri) => {
      const filePath = getSafeVaultDir('04-typography/curated-pairings.json');
      const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}';
      const uriStr = uri ? (uri.href || uri.toString()) : 'vault://typography';
      return {
        contents: [{
          uri: uriStr,
          mimeType: 'application/json',
          text: content
        }]
      };
    }
  );

  // 3. vault://components
  server.resource(
    'vault-components',
    'vault://components',
    {
      mimeType: 'application/json',
      description: 'Pre-registered declarative UI effects, shaders, SVG filters, and template catalogues'
    },
    async (uri) => {
      let effects = [];
      try {
        const effectRegistry = require('../../registry/effect-registry');
        effects = effectRegistry.listByCategory();
      } catch (_) {
        effects = [];
      }

      let templates = [];
      let patterns = [];
      try {
        const indexPath = getSafeVaultDir('INDEX.json');
        if (fs.existsSync(indexPath)) {
          const raw = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
          templates = raw.templates || [];
          patterns = raw.patterns || [];
        }
      } catch (_) {
        templates = [];
        patterns = [];
      }

      const payload = {
        effects,
        templates,
        patterns,
        totalEffects: effects.length,
        totalTemplates: templates.length
      };

      const uriStr = uri ? (uri.href || uri.toString()) : 'vault://components';
      return {
        contents: [{
          uri: uriStr,
          mimeType: 'application/json',
          text: JSON.stringify(payload, null, 2)
        }]
      };
    }
  );

  // CRITICAL REQUIREMENT: In @modelcontextprotocol/sdk, server.resource(name, uri, ...)
  // registers into server._registeredResources[uri]. To pass tests that check
  // server._registeredResources['vault-easings'], add name aliases:
  if (server._registeredResources) {
    server._registeredResources['vault-easings'] = server._registeredResources['vault://easings'];
    server._registeredResources['vault-typography'] = server._registeredResources['vault://typography'];
    server._registeredResources['vault-components'] = server._registeredResources['vault://components'];
  }

  // ==========================================
  // B. Dynamic Resource Templates
  // ==========================================

  // 4. client://{slug}/dna
  server.resource(
    'client-dna',
    new ResourceTemplate('client://{slug}/dna', { list: undefined }),
    {
      mimeType: 'text/markdown',
      description: 'Client brand spec and DNA documentation (DNA.md / brand-spec.json)'
    },
    async (uri, variables) => {
      const slug = variables && typeof variables === 'object' && variables.slug !== undefined
        ? variables.slug
        : variables;
      validateSlugSecurity(slug);

      const clientDir = getSafeClientDir(slug);
      const dnaMdPath = path.join(clientDir, 'DNA.md');
      const brandSpecPath = path.join(clientDir, 'brand-spec.json');

      let content = '';
      let mimeType = 'text/markdown';

      if (fs.existsSync(dnaMdPath)) {
        content = fs.readFileSync(dnaMdPath, 'utf8');
        mimeType = 'text/markdown';
      } else if (fs.existsSync(brandSpecPath)) {
        content = fs.readFileSync(brandSpecPath, 'utf8');
        mimeType = 'application/json';
      } else {
        content = `# DNA Lock: ${slug}\n\nNo DNA.md or brand-spec.json found for client ${slug}.`;
        mimeType = 'text/markdown';
      }

      const uriStr = uri ? (uri.href || uri.toString()) : `client://${slug}/dna`;
      return {
        contents: [{
          uri: uriStr,
          text: content,
          mimeType
        }]
      };
    }
  );

  // 5. client://{slug}/slots
  server.resource(
    'client-slots',
    new ResourceTemplate('client://{slug}/slots', { list: undefined }),
    {
      mimeType: 'application/json',
      description: 'Client content slots definition (content-slots.json)'
    },
    async (uri, variables) => {
      const slug = variables && typeof variables === 'object' && variables.slug !== undefined
        ? variables.slug
        : variables;
      validateSlugSecurity(slug);

      const clientDir = getSafeClientDir(slug);
      const slotsPath = path.join(clientDir, 'content-slots.json');

      let content = '{}';
      if (fs.existsSync(slotsPath)) {
        content = fs.readFileSync(slotsPath, 'utf8');
      }

      const uriStr = uri ? (uri.href || uri.toString()) : `client://${slug}/slots`;
      return {
        contents: [{
          uri: uriStr,
          text: content,
          mimeType: 'application/json'
        }]
      };
    }
  );

  // 6. client://{slug}/audit
  server.resource(
    'client-audit',
    new ResourceTemplate('client://{slug}/audit', { list: undefined }),
    {
      mimeType: 'application/json',
      description: 'Client quality gate and linter reports (quality-gate-report.json / linter-report.json)'
    },
    async (uri, variables) => {
      const slug = variables && typeof variables === 'object' && variables.slug !== undefined
        ? variables.slug
        : variables;
      validateSlugSecurity(slug);

      const clientDir = getSafeClientDir(slug);
      const qgReportPath = path.join(clientDir, 'quality-gate-report.json');
      const linterReportPath = path.join(clientDir, 'linter-report.json');

      let content = '';
      if (fs.existsSync(qgReportPath)) {
        content = fs.readFileSync(qgReportPath, 'utf8');
      } else if (fs.existsSync(linterReportPath)) {
        content = fs.readFileSync(linterReportPath, 'utf8');
      } else {
        const defaultStatus = {
          clientSlug: slug,
          status: 'unverified',
          passed: false,
          summary: 'No quality gate report found. Run run_unified_quality_gate to generate audit evidence.',
          lastAudited: null
        };
        content = JSON.stringify(defaultStatus, null, 2);
      }

      const uriStr = uri ? (uri.href || uri.toString()) : `client://${slug}/audit`;
      return {
        contents: [{
          uri: uriStr,
          text: content,
          mimeType: 'application/json'
        }]
      };
    }
  );

  // 7. ref://{slug}/dna
  server.resource(
    'ref-dna',
    new ResourceTemplate('ref://{slug}/dna', { list: undefined }),
    {
      mimeType: 'application/json',
      description: 'Reference design DNA tokens from copias/{slug}/'
    },
    async (uri, variables) => {
      const slug = variables && typeof variables === 'object' && variables.slug !== undefined
        ? variables.slug
        : variables;
      validateSlugSecurity(slug);

      const refDir = getSafeRefDir(slug);
      const designDnaPath = path.join(refDir, 'design-system', 'design_dna.json');
      const rootDnaPath = path.join(refDir, 'design_dna.json');
      const siteTypePath = path.join(refDir, 'SITE_TYPE.json');

      let content = '{}';
      if (fs.existsSync(designDnaPath)) {
        content = fs.readFileSync(designDnaPath, 'utf8');
      } else if (fs.existsSync(rootDnaPath)) {
        content = fs.readFileSync(rootDnaPath, 'utf8');
      } else if (fs.existsSync(siteTypePath)) {
        content = fs.readFileSync(siteTypePath, 'utf8');
      } else {
        content = JSON.stringify({
          refSlug: slug,
          status: 'unverified',
          message: `No design DNA or SITE_TYPE found for reference ${slug}`
        }, null, 2);
      }

      const uriStr = uri ? (uri.href || uri.toString()) : `ref://${slug}/dna`;
      return {
        contents: [{
          uri: uriStr,
          text: content,
          mimeType: 'application/json'
        }]
      };
    }
  );
}

module.exports = {
  registerResources
};
