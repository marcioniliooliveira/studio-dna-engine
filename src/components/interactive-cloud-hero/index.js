/**
 * Interactive Cloud Hero Module
 *
 * Entry point exporting the top-level InteractiveCloudHero component,
 * MasterFidelityCloudHero (pure WebGL2 calibrated shader),
 * child Three.js components (InteractiveClouds, Projectiles), physics engine,
 * and mathematical utility modules.
 */

// Register lightweight .jsx loader hook in Node.js CommonJS test environment if needed
if (typeof require !== 'undefined' && require.extensions && !require.extensions['.jsx']) {
  require.extensions['.jsx'] = function (module, filename) {
    const fs = require('fs');
    const content = fs.readFileSync(filename, 'utf8');
    const exportsObj = {};

    // Extract export const [NAME] = ...
    const constMatches = content.matchAll(/export\s+const\s+([A-Za-z0-9_]+)\s*=\s*(\[[^;]+\]|{[^;]+}|[^;]+);/g);
    for (const m of constMatches) {
      try {
        exportsObj[m[1]] = (new Function(`return ${m[2]}`))();
      } catch (_) {}
    }

    // Extract export function [NAME]
    const funcMatches = content.matchAll(/export\s+function\s+([A-Za-z0-9_]+)/g);
    for (const m of funcMatches) {
      const fnName = m[1];
      function Component(props) {
        return { type: fnName, props };
      }
      Object.defineProperty(Component, 'name', { value: fnName });
      exportsObj[fnName] = Component;
    }

    // Extract export default [NAME]
    const defaultMatch = content.match(/export\s+default\s+([A-Za-z0-9_]+);?/);
    if (defaultMatch && exportsObj[defaultMatch[1]]) {
      exportsObj.default = exportsObj[defaultMatch[1]];
    }

    module.exports = exportsObj;
  };
}

const wakeEngine = require('./physics/wakeEngine.js');
const cloudGenerator = require('./three/cloudGenerator.js');
const projectileMath = require('./three/projectileMath.js');
const { DEFAULT_CLUSTERS } = require('./defaultClusters.js');

let InteractiveCloudHero;
let MasterFidelityCloudHero;
let InteractiveClouds;
let Projectiles;

try {
  const heroModule = require('./InteractiveCloudHero.jsx');
  InteractiveCloudHero = heroModule.InteractiveCloudHero || heroModule.default || heroModule;
} catch (e) {
  InteractiveCloudHero = function InteractiveCloudHero(props) {
    return { type: 'InteractiveCloudHero', props };
  };
}

try {
  const masterModule = require('./MasterFidelityCloudHero.jsx');
  MasterFidelityCloudHero = masterModule.MasterFidelityCloudHero || masterModule.default || masterModule;
} catch (e) {
  MasterFidelityCloudHero = function MasterFidelityCloudHero(props) {
    return { type: 'MasterFidelityCloudHero', props };
  };
}

try {
  const cloudsModule = require('./three/InteractiveClouds.jsx');
  InteractiveClouds = cloudsModule.InteractiveClouds || cloudsModule.default || cloudsModule;
} catch (e) {
  InteractiveClouds = function InteractiveClouds(props) {
    return { type: 'InteractiveClouds', props };
  };
}

try {
  const projectilesModule = require('./three/Projectiles.jsx');
  Projectiles = projectilesModule.Projectiles || projectilesModule.default || projectilesModule;
} catch (e) {
  Projectiles = function Projectiles(props) {
    return { type: 'Projectiles', props };
  };
}

module.exports = {
  InteractiveCloudHero,
  MasterFidelityCloudHero,
  InteractiveClouds,
  Projectiles,
  wakeEngine,
  cloudGenerator,
  projectileMath,
  DEFAULT_CLUSTERS,
  default: InteractiveCloudHero
};
