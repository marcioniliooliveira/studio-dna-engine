const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const heroModule = require('../src/components/interactive-cloud-hero/index.js');
const {
  InteractiveCloudHero,
  InteractiveClouds,
  Projectiles,
  wakeEngine,
  cloudGenerator,
  projectileMath,
  DEFAULT_CLUSTERS
} = heroModule;

test('heroAssembly: exports InteractiveCloudHero and all underlying system modules', () => {
  assert.equal(typeof InteractiveCloudHero, 'function', 'InteractiveCloudHero must be exported as a function/component');
  assert.equal(typeof InteractiveClouds, 'function', 'InteractiveClouds must be exported as a function/component');
  assert.equal(typeof Projectiles, 'function', 'Projectiles must be exported as a function/component');

  assert.ok(wakeEngine, 'wakeEngine must be exported');
  assert.equal(typeof wakeEngine.computeProjectileWake, 'function', 'wakeEngine must export computeProjectileWake');
  assert.equal(typeof wakeEngine.applySpringRelaxation, 'function', 'wakeEngine must export applySpringRelaxation');

  assert.ok(cloudGenerator, 'cloudGenerator must be exported');
  assert.equal(typeof cloudGenerator.generateCloudClusterSegments, 'function', 'cloudGenerator must export generateCloudClusterSegments');

  assert.ok(projectileMath, 'projectileMath must be exported');
  assert.equal(typeof projectileMath.calculateProjectileTrajectory, 'function', 'projectileMath must export calculateProjectileTrajectory');
  assert.equal(typeof projectileMath.getProjectileStates, 'function', 'projectileMath must export getProjectileStates');
  assert.ok(Array.isArray(projectileMath.PROJECTILE_COLORS), 'projectileMath must export PROJECTILE_COLORS array');

  assert.ok(Array.isArray(DEFAULT_CLUSTERS), 'DEFAULT_CLUSTERS must be exported as an array');
  assert.equal(heroModule.default, InteractiveCloudHero, 'Default export should equal InteractiveCloudHero');
});

test('heroAssembly: default cluster configurations define exactly 5 independent 3D cloud clusters', () => {
  assert.equal(DEFAULT_CLUSTERS.length, 5, 'Must define exactly 5 independent clusters');

  const seenSeeds = new Set();
  let totalSegments = 0;

  DEFAULT_CLUSTERS.forEach((cluster, idx) => {
    assert.equal(typeof cluster.seed, 'number', `Cluster #${idx} must declare a numeric seed`);
    assert.ok(!seenSeeds.has(cluster.seed), `Cluster #${idx} seed (${cluster.seed}) must be unique`);
    seenSeeds.add(cluster.seed);

    assert.equal(typeof cluster.segments, 'number', `Cluster #${idx} must declare segments count`);
    assert.ok(cluster.segments >= 15 && cluster.segments <= 35, `Cluster #${idx} segments (${cluster.segments}) within range [15, 35]`);
    totalSegments += cluster.segments;

    assert.ok(Array.isArray(cluster.bounds), `Cluster #${idx} bounds must be an array`);
    assert.equal(cluster.bounds.length, 3, `Cluster #${idx} bounds must be 3D [bx, by, bz]`);
    assert.ok(cluster.bounds.every(b => typeof b === 'number' && b > 0), `Cluster #${idx} bounds must be positive numbers`);

    assert.ok(Array.isArray(cluster.center), `Cluster #${idx} center must be an array`);
    assert.equal(cluster.center.length, 3, `Cluster #${idx} center must be 3D [cx, cy, cz]`);
    assert.ok(cluster.center.every(c => typeof c === 'number' && Number.isFinite(c)), `Cluster #${idx} center components must be finite numbers`);
  });

  // Verify total puff count is within budget for 60 FPS performance floor (< 200 total segments)
  assert.ok(totalSegments < 200, `Total scene cloud segments (${totalSegments}) must be < 200 for 60 FPS target`);
  assert.equal(totalSegments, 112, 'Total segments across default clusters should equal 112');

  // Verify spatial independence: clusters are well-separated in 3D space
  for (let i = 0; i < DEFAULT_CLUSTERS.length; i++) {
    for (let j = i + 1; j < DEFAULT_CLUSTERS.length; j++) {
      const c1 = DEFAULT_CLUSTERS[i].center;
      const c2 = DEFAULT_CLUSTERS[j].center;
      const dist = Math.hypot(c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]);
      assert.ok(dist >= 2.0, `Clusters #${i} and #${j} must be spatially distinct (distance ${dist.toFixed(2)} >= 2.0)`);
    }
  }
});

test('heroAssembly: all cloud puffs in all 5 default clusters are strictly bounded', () => {
  DEFAULT_CLUSTERS.forEach((cluster, clusterIdx) => {
    const puffs = cloudGenerator.generateCloudClusterSegments(cluster);
    assert.equal(puffs.length, cluster.segments, `Cluster #${clusterIdx} generated segment count must match requested segments`);

    puffs.forEach((puff, puffIdx) => {
      const [x, y, z] = puff.pos;
      const [cx, cy, cz] = cluster.center;
      const [bx, by, bz] = cluster.bounds;

      assert.ok(
        Math.abs(x - cx) <= bx + 1e-6,
        `Cluster #${clusterIdx} Puff #${puffIdx} X (${x}) must be bounded within [${cx - bx}, ${cx + bx}]`
      );
      assert.ok(
        Math.abs(y - cy) <= by + 1e-6,
        `Cluster #${clusterIdx} Puff #${puffIdx} Y (${y}) must be bounded within [${cy - by}, ${cy + by}]`
      );
      assert.ok(
        Math.abs(z - cz) <= bz + 1e-6,
        `Cluster #${clusterIdx} Puff #${puffIdx} Z (${z}) must be bounded within [${cz - bz}, ${cz + bz}]`
      );

      assert.deepEqual(puff.disp, [0, 0, 0], 'Puff initial displacement must be [0, 0, 0]');
      assert.deepEqual(puff.vel, [0, 0, 0], 'Puff initial velocity must be [0, 0, 0]');
    });
  });
});

test('heroAssembly: projectile system integrates with cloud puffs and wake physics', () => {
  const projectiles = projectileMath.getProjectileStates(0.5, 4);
  assert.equal(projectiles.length, 4, 'Should retrieve 4 projectile states');

  const testPuffPos = [-4.5, 1.2, -3.0];
  let wakeTriggered = false;

  projectiles.forEach((proj) => {
    const wake = wakeEngine.computeProjectileWake(testPuffPos, proj.position, proj.velocity, {
      wakeRadius: 10.0,
      pushStrength: 0.5,
      swirlStrength: 0.2
    });

    if (wake.illumination > 0) {
      wakeTriggered = true;
      assert.equal(wake.displacement.length, 3, 'Displacement must have 3 dimensions');
      assert.ok(wake.displacement.every(Number.isFinite), 'Displacement components must be finite');
    }
  });

  assert.ok(wakeTriggered, 'At least one projectile should illuminate/affect the test puff volume');
});

test('heroAssembly: dna.json metadata exists and satisfies hero component contract', () => {
  const dnaPath = path.resolve(__dirname, '../copias/21st-dev/interactive-cloud-hero/dna.json');
  assert.ok(fs.existsSync(dnaPath), 'dna.json must exist in copias/21st-dev/interactive-cloud-hero/');

  const rawJson = fs.readFileSync(dnaPath, 'utf8');
  assert.doesNotThrow(() => JSON.parse(rawJson), 'dna.json must be valid JSON');

  const metadata = JSON.parse(rawJson);
  assert.equal(metadata.name, 'interactive-cloud-hero', 'Metadata name must be interactive-cloud-hero');
  assert.equal(metadata.category, 'hero', 'Category must be hero');
  assert.equal(metadata.framework, 'react-three-fiber', 'Framework must be react-three-fiber');

  assert.ok(Array.isArray(metadata.tags), 'Tags must be an array');
  const requiredTags = ['clouds', 'projectiles', 'interactive', 'hero', '3d'];
  requiredTags.forEach(tag => {
    assert.ok(metadata.tags.includes(tag), `Tags must include "${tag}"`);
  });

  assert.equal(typeof metadata.description, 'string', 'Metadata must have a description string');
  assert.ok(metadata.description.length > 10, 'Description should be descriptive');

  // Architecture anatomy contract
  assert.ok(metadata.anatomy, 'Metadata must declare anatomy');
  assert.equal(metadata.anatomy.rootRole, 'InteractiveCloudHeroContainer');
  assert.ok(Array.isArray(metadata.anatomy.subcomponents), 'Anatomy must declare subcomponents');
  const subRoles = metadata.anatomy.subcomponents.map(s => s.role);
  assert.ok(subRoles.includes('WebGLSceneViewport'), 'Subcomponents must include WebGLSceneViewport');
  assert.ok(subRoles.includes('UIOverlayContainer'), 'Subcomponents must include UIOverlayContainer');

  // Motion dynamics contract
  assert.ok(metadata.motionDynamics, 'Metadata must declare motion dynamics');
  assert.ok(Array.isArray(metadata.motionDynamics.transitions), 'Motion dynamics must declare transitions');
  const springTransition = metadata.motionDynamics.transitions.find(t => t.curveType === 'spring');
  assert.ok(springTransition, 'Must define spring curve transition for cloud physics');
  assert.equal(springTransition.curveParams.stiffness, 10.0);
  assert.equal(springTransition.curveParams.damping, 3.2);
});

test('heroAssembly: InteractiveCloudHero.jsx preserves required layout, SSR guard, and styling contracts', () => {
  const jsxPath = path.resolve(__dirname, '../src/components/interactive-cloud-hero/InteractiveCloudHero.jsx');
  assert.ok(fs.existsSync(jsxPath), 'InteractiveCloudHero.jsx must exist');

  const content = fs.readFileSync(jsxPath, 'utf8');

  // SSR safety
  assert.ok(content.includes('useState(false)'), 'Must contain useState(false) for SSR hydration safety');
  assert.ok(content.includes('setMounted(true)'), 'Must setMounted(true) on mount');

  // Fullscreen container
  assert.ok(content.includes('relative w-full h-screen overflow-hidden bg-black'), 'Must have fullscreen black container');

  // Canvas setup
  assert.ok(content.includes('camera={{ position: [0, 0, 8], fov: 60 }}'), 'Must set camera position [0, 0, 8] and fov: 60');
  assert.ok(content.includes('absolute inset-0 pointer-events-none'), 'Canvas wrapper must be absolute inset-0 pointer-events-none');

  // Lighting
  assert.ok(content.includes('<ambientLight intensity={0.4} />'), 'Must include ambientLight with intensity 0.4');
  assert.ok(content.includes('position={[5, 10, 5]}'), 'Must configure directionalLight position');
  assert.ok(content.includes('intensity={0.8}'), 'Must configure directionalLight intensity');
  assert.ok(content.includes('color="#ffd199"'), 'Must configure directionalLight warm color');

  // 3D child components
  assert.ok(content.includes('<InteractiveClouds'), 'Must mount <InteractiveClouds');
  assert.ok(content.includes('<Projectiles'), 'Must mount <Projectiles');
  assert.ok(content.includes('projectilesRef'), 'Must pass projectilesRef for wake coordination');

  // UI styling classes preserved from 21st.dev reference
  assert.ok(content.includes('bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full'), 'Must preserve trust badge pill styling');
  assert.ok(content.includes('from-orange-300 via-yellow-400 to-amber-300'), 'Must preserve headline line 1 gradient');
  assert.ok(content.includes('from-yellow-300 via-orange-400 to-red-400'), 'Must preserve headline line 2 gradient');
  assert.ok(content.includes('text-orange-100/90 font-light'), 'Must preserve subtitle styling');
  assert.ok(content.includes('hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25'), 'Must preserve primary CTA hover scale and shadow');
  assert.ok(content.includes('bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30'), 'Must preserve secondary CTA glassmorphic styling');
});
