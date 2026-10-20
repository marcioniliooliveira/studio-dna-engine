/**
 * test/m4-compiler-dualstack.test.js
 * 
 * Requirement R4 Verification Suite:
 * - KineticGrammarSchema: Zod composition schema, 5 kinetic primitives, slots, donut scope isolation
 * - AntiSlopTransformer: Deterministic Cheerio AST transformer, zero AI slop, zero brand leaks, +-15% budget
 * - EdgeStaticCompiler: Standalone Edge CDN package, W3C overflow-x: clip !important, <15KB micro-runtime
 * - NextJsRscCompiler: Next.js 15 App Router, 0-bundle RSC KineticSection, isolated 'use client' islands
 * - Dual-Stack Integration & Equivalence: Upstream contract integration across both deployment stacks
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const {
  KINETIC_PRIMITIVES,
  SLOT_TYPES,
  TEXTURE_COMPRESSION_TYPES,
  MAX_ASSET_DISK_BYTES,
  MAX_ASSET_VRAM_BYTES,
  validateCompositionGrammar,
  parseCompositionGrammar,
  generateDonutScopeRule,
  buildScopedPreludes,
  validateStrictDonutScope,
  validateDonutScopeInvariants,
  createStage,
  createSlot
} = require('../src/compiler/kinetic-grammar-schema');

const {
  AntiSlopTransformer,
  BANNED_SLOP_PATTERNS
} = require('../src/compiler/anti-slop-transformer');

const {
  EdgeStaticCompiler,
  generateMicroRuntimeSource,
  MAX_MICRO_RUNTIME_BYTES
} = require('../src/compiler/edge-static-compiler');

const {
  NextJsRscCompiler
} = require('../src/compiler/nextjs-rsc-compiler');

// ============================================================================
// Fixture Helpers
// ============================================================================

function createValidAssetManifest(overrides = {}) {
  return {
    modelPath: 'assets/models/product-hero.glb',
    diskSizeBytes: 1850000, // ~1.76MB (<3MB)
    vramFootprintBytes: 3200000, // ~3.05MB (<4MB)
    geometryBytes: 850000,
    textureBytes: 1000000,
    textureCompression: 'KTX2_ASTC',
    meshQuantization: true,
    meshoptCompression: true,
    isWebKitCertified: true,
    ...overrides
  };
}

function createValidCompositionSpec(overrides = {}) {
  return {
    schemaVersion: '2.0.0',
    brandSpec: {
      brandName: 'Aura Kinetic',
      tagline: 'Dimensional Precision',
      theme: {
        bgBase: '#0b0c10',
        accent: '#66fcf1',
        textPrimary: '#ffffff',
        textSecondary: '#c5c6c7',
        surface: '#1f2833',
        fontFamily: 'Inter, sans-serif'
      },
      meta: {
        title: 'Aura Kinetic | Dimensional Audio System',
        description: 'Next-generation acoustic engineering rendered in real-time kinetic 3D',
        canonicalUrl: 'https://aurakinetic.example.com'
      }
    },
    viewport: {
      width: 1440,
      height: 900,
      dpr: 1
    },
    assets: [createValidAssetManifest()],
    stages: [
      {
        id: 'stage-hero',
        type: 'HeroCinematicStage',
        title: 'Hero Cinematic Experience',
        cssScope: {
          rootSelector: '.kinetic-stage',
          boundarySelector: '[data-kinetic-slot]',
          allowPiercing: false
        },
        kineticConfig: {
          cameraTrajectory: [
            { scrollProgress: 0, position: [0, 0, 5], target: [0, 0, 0] },
            { scrollProgress: 1, position: [2, 1, 3], target: [0, 0, 0] }
          ],
          orbitFov: 45,
          pinDuration: 1.5
        },
        slots: [
          {
            slotId: 'HERO_TITLE',
            slotType: 'heading',
            targetSelector: '[data-kinetic-slot="HERO_TITLE"]',
            characterBudget: { target: 35, tolerance: 0.15 },
            content: 'Sculpted Acoustics in Motion'
          },
          {
            slotId: 'HERO_DESC',
            slotType: 'text',
            targetSelector: '[data-kinetic-slot="HERO_DESC"]',
            characterBudget: { target: 80, tolerance: 0.15 },
            content: 'Pure spatial fidelity designed for audiophiles with continuous 60fps telemetry.'
          }
        ],
        opticalAnchors: [
          {
            id: 'anchor-driver',
            worldPoint: [0.5, 0.2, 0.1],
            normal: [0, 0, 1],
            title: 'Planar Transducer',
            description: 'Ultra-thin graphene diaphragm with zero magnetic distortion',
            safeArea: { xMin: 20, xMax: 400, yMin: 50, yMax: 300 }
          }
        ]
      },
      {
        id: 'stage-canvas',
        type: 'ThreeJsCanvasStage',
        title: 'Interactive 3D Product Stage',
        cssScope: {
          rootSelector: '.kinetic-stage',
          boundarySelector: '[data-kinetic-slot]',
          allowPiercing: false
        },
        kineticConfig: {
          canvasSelector: '.kinetic-webgl-canvas',
          antialias: true,
          alpha: true,
          dprLimit: 2,
          modelRef: 'assets/models/product-hero.glb'
        },
        slots: [
          {
            slotId: 'CANVAS_CAPTION',
            slotType: 'text',
            targetSelector: '[data-kinetic-slot="CANVAS_CAPTION"]',
            content: 'Explore every millimeter in orbital perspective.'
          }
        ]
      },
      {
        id: 'stage-bento',
        type: 'InteractiveBento',
        title: 'Architectural Bento Grid',
        slots: [
          {
            slotId: 'BENTO_CARD_1',
            slotType: 'rich-text',
            targetSelector: '[data-kinetic-slot="BENTO_CARD_1"]',
            content: 'Titanium Acoustic Enclosure'
          }
        ]
      }
    ],
    ...overrides
  };
}

// ============================================================================
// 1. Kinetic Grammar Schema Tests
// ============================================================================

describe('Suite 1: Kinetic Grammar Schema & Donut Isolation', () => {
  test('validates fully compliant kinetic composition spec', () => {
    const spec = createValidCompositionSpec();
    const result = validateCompositionGrammar(spec);

    assert.equal(result.success, true);
    assert.ok(result.data);
    assert.equal(result.errors.length, 0);
    assert.equal(result.data.stages.length, 3);
    assert.equal(result.data.brandSpec.brandName, 'Aura Kinetic');
  });

  test('validates all 5 kinetic primitives defined in PROJECT.md', () => {
    assert.deepEqual(KINETIC_PRIMITIVES, [
      'HeroCinematicStage',
      'HorizontalPinRail',
      'InteractiveBento',
      'ThreeJsCanvasStage',
      'StickyStoryChapters'
    ]);

    for (const prim of KINETIC_PRIMITIVES) {
      const stage = createStage(prim, `stage-${prim}`);
      assert.equal(stage.type, prim);
      assert.ok(stage.id.startsWith('stage-'));
      assert.equal(stage.cssScope.rootSelector, '.kinetic-stage');
      assert.equal(stage.cssScope.boundarySelector, '[data-kinetic-slot]');
    }
  });

  test('validates all slot types and rejects invalid slot types', () => {
    assert.deepEqual(SLOT_TYPES, [
      'text',
      'heading',
      'rich-text',
      'image',
      'video',
      'badge',
      'button',
      'canvas'
    ]);

    const validSlot = createSlot('TEST_SLOT', 'heading', { content: 'Headline' });
    assert.equal(validSlot.slotId, 'TEST_SLOT');
    assert.equal(validSlot.slotType, 'heading');

    assert.throws(() => {
      createSlot('BAD_SLOT', 'unsupported-type');
    }, /Invalid slot type/);
  });

  test('enforces M3 hardware limits on asset manifests (<3MB disk, <4MB VRAM)', () => {
    // Valid asset
    const validAsset = createValidAssetManifest();
    const validSpec = createValidCompositionSpec({ assets: [validAsset] });
    assert.equal(validateCompositionGrammar(validSpec).success, true);

    // Asset exceeding 3MB disk budget
    const oversizedDiskAsset = createValidAssetManifest({ diskSizeBytes: 3.5 * 1024 * 1024 });
    const invalidDiskSpec = createValidCompositionSpec({ assets: [oversizedDiskAsset] });
    const diskRes = validateCompositionGrammar(invalidDiskSpec);
    assert.equal(diskRes.success, false);
    assert.ok(diskRes.errors.some(e => e.path.includes('diskSizeBytes')));

    // Asset exceeding 4MB VRAM budget
    const oversizedVramAsset = createValidAssetManifest({ vramFootprintBytes: 4.5 * 1024 * 1024 });
    const invalidVramSpec = createValidCompositionSpec({ assets: [oversizedVramAsset] });
    const vramRes = validateCompositionGrammar(invalidVramSpec);
    assert.equal(vramRes.success, false);
    assert.ok(vramRes.errors.some(e => e.path.includes('vramFootprintBytes')));
  });

  test('rejects composition spec with empty stages array', () => {
    const emptyStagesSpec = createValidCompositionSpec({ stages: [] });
    const res = validateCompositionGrammar(emptyStagesSpec);
    assert.equal(res.success, false);
    assert.ok(res.errors.some(e => e.message.includes('at least one stage')));
  });

  test('generates CSS @scope donut isolation rule and fallback prefixing', () => {
    const cssBody = 'position: relative;\ncolor: red;';
    const scopedCss = generateDonutScopeRule('HeroCinematicStage', cssBody);

    assert.ok(scopedCss.includes('@scope (.kinetic-stage.HeroCinematicStage) to ([data-kinetic-slot])'));
    assert.ok(scopedCss.includes('@supports not (scope: default)'));
    assert.ok(scopedCss.includes('.kinetic-stage.HeroCinematicStage:not([data-kinetic-slot])'));
  });

  test('validates donut scoping invariants and catches piercing selectors', () => {
    const cleanCss = `
      @scope (.kinetic-stage) to ([data-kinetic-slot]) {
        .stage-inner { display: flex; }
      }
    `;
    const cleanCheck = validateDonutScopeInvariants(cleanCss);
    assert.equal(cleanCheck.compliant, true);
    assert.equal(cleanCheck.violations.length, 0);

    const piercingCss = `
      @scope (.kinetic-stage) to ([data-kinetic-slot]) {
        [data-kinetic-slot] h1 { font-size: 20px; }
      }
    `;
    const piercingCheck = validateDonutScopeInvariants(piercingCss);
    assert.equal(piercingCheck.compliant, false);
    assert.ok(piercingCheck.violations.some(v => v.includes('Donut piercing violation')));
  });

  test('TASK-C1: buildScopedPreludes supports 5 W3C Cascade Level 6 topologies', () => {
    assert.equal(buildScopedPreludes({ root: '.hero', limit: '.slot', mode: 'donut' }), '@scope (.hero) to (.slot)');
    assert.equal(buildScopedPreludes({ root: '.hero', mode: 'root-only' }), '@scope (.hero)');
    assert.equal(buildScopedPreludes({ limit: '.slot', mode: 'limit-only' }), '@scope to (.slot)');
    assert.equal(buildScopedPreludes({ root: '.hero', limit: '.slot', mode: 'scoped-is' }), '@scope (:is(.hero)) to (:is(.slot))');
    assert.equal(buildScopedPreludes({ root: '.hero', limit: '.slot', mode: 'fallback' }), '.hero:not(.slot)');
  });

  test('TASK-C1: validateStrictDonutScope catches all piercing combinators and allows self-styling', () => {
    // Child combinator piercing
    const childCheck = validateStrictDonutScope('[data-kinetic-slot] > h1 { color: red; }');
    assert.equal(childCheck.compliant, false);

    // Attribute value piercing
    const attrCheck = validateStrictDonutScope('[data-kinetic-slot="title"] span { font-weight: bold; }');
    assert.equal(attrCheck.compliant, false);

    // Self-styling
    const selfCheck = validateStrictDonutScope('[data-kinetic-slot] { all: unset; }');
    assert.equal(selfCheck.compliant, true);
  });
});

// ============================================================================
// 2. Deterministic Anti-Slop AST Transformer Tests
// ============================================================================

describe('Suite 2: Deterministic AST Anti-Slop Transformer', () => {
  test('replaces {SLOT_...} placeholders deterministically in Cheerio AST', () => {
    const htmlFixture = `
      <section class="kinetic-stage">
        <h1>{SLOT_HERO_TITLE}</h1>
        <p>{SLOT_HERO_DESC}</p>
        <div data-kinetic-slot="HERO_CTA">Old CTA</div>
      </section>
    `;

    const transformer = new AntiSlopTransformer({
      contentSlots: {
        HERO_TITLE: 'Precision Audio Engine',
        HERO_DESC: 'Crafted without distortion for true spatial presence.',
        HERO_CTA: '<a href="#explore">Discover</a>'
      }
    });

    const result = transformer.transform(htmlFixture);
    assert.equal(result.passed, true);
    assert.equal(result.replacedSlotsCount >= 3, true);
    assert.ok(result.html.includes('Precision Audio Engine'));
    assert.ok(result.html.includes('Crafted without distortion'));
    assert.ok(result.html.includes('<a href="#explore">Discover</a>'));
    assert.ok(!result.html.includes('{SLOT_HERO_TITLE}'));
  });

  test('preserves all kinetic data attributes during AST transformation', () => {
    const htmlFixture = `
      <section class="kinetic-stage" data-kinetic-stage="true" data-scroll="sticky" data-deep-scrutiny="gate-1">
        <div data-kinetic-slot="TITLE" data-speed="0.5" data-lag="0.2" data-anchor="hero-title">
          Original Text
        </div>
      </section>
    `;

    const transformer = new AntiSlopTransformer({
      contentSlots: {
        TITLE: 'Preserved Kinetic Velocity'
      }
    });

    const result = transformer.transform(htmlFixture);
    assert.equal(result.passed, true);
    assert.ok(result.html.includes('data-kinetic-stage="true"'));
    assert.ok(result.html.includes('data-scroll="sticky"'));
    assert.ok(result.html.includes('data-deep-scrutiny="gate-1"'));
    assert.ok(result.html.includes('data-speed="0.5"'));
    assert.ok(result.html.includes('data-lag="0.2"'));
    assert.ok(result.html.includes('data-anchor="hero-title"'));
    assert.ok(result.html.includes('data-kinetic-slot="TITLE"'));
  });

  test('detects and flags banned AI slop keywords (lorem ipsum, chunk cognitivo, etc.)', () => {
    const slopExamples = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Analise o chunk cognitivo do usuário durante o fluxo.',
      'Esta página aplica metalinguagem arquitetural avançada.',
      'Ativando modo auditoria para verificação visual.',
      'Inspeção por raio-x dos nós DOM em execução.'
    ];

    for (const text of slopExamples) {
      const check = AntiSlopTransformer.checkSlop(text);
      assert.equal(check.hasSlop, true, `Expected slop detection for: "${text}"`);
    }

    const htmlWithSlop = '<div><h1>{SLOT_TITLE}</h1></div>';
    const transformer = new AntiSlopTransformer({
      contentSlots: {
        TITLE: 'Lorem ipsum dolor sit amet'
      }
    });

    const result = transformer.transform(htmlWithSlop);
    assert.equal(result.passed, false);
    assert.ok(result.violations.some(v => v.includes('AI slop pattern detected')));
  });

  test('detects and neutralizes reference brand residual leaks', () => {
    const htmlFixture = `
      <html>
        <head><title>Original Reference by Jesper Landberg</title></head>
        <body>
          <h1>Welcome to Elyse Residence</h1>
          <img src="house.jpg" alt="Elyse Residence Interior" />
        </body>
      </html>
    `;

    const transformer = new AntiSlopTransformer({
      brandSpec: { brandName: 'Aura Kinetic' },
      originalBrandKeywords: ['Elyse Residence', 'Jesper Landberg']
    });

    const result = transformer.transform(htmlFixture);
    assert.ok(result.html.includes('Aura Kinetic Interior'));
    assert.ok(result.stats.residualMatches > 0);
  });

  test('flags unfilled template placeholders when slot is missing from dictionary', () => {
    const htmlFixture = '<div><h1>{SLOT_TITLE}</h1><p>{SLOT_UNMAPPED_FIELD}</p></div>';
    const transformer = new AntiSlopTransformer({
      contentSlots: {
        TITLE: 'Provided Title'
      }
    });

    const result = transformer.transform(htmlFixture);
    assert.equal(result.passed, false);
    assert.ok(result.violations.some(v => v.includes("'{SLOT_UNMAPPED_FIELD}'")));
    assert.equal(result.stats.unfilledSlots, 1);
  });

  test('enforces strict character budgeting (+-15% tolerance)', () => {
    // Reference text length = 100 characters
    const refText = 'A'.repeat(100);

    // Case A: 105 characters (+5% deviation) -> Compliant
    const compliantCheck = AntiSlopTransformer.checkBudget(105, 100, 0.15);
    assert.equal(compliantCheck.compliant, true);
    assert.equal(compliantCheck.deviationPercent, 5.0);

    // Case B: 125 characters (+25% deviation) -> Violation
    const overCheck = AntiSlopTransformer.checkBudget(125, 100, 0.15);
    assert.equal(overCheck.compliant, false);
    assert.equal(overCheck.deviationPercent, 25.0);

    // Case C: 80 characters (-20% deviation) -> Violation
    const underCheck = AntiSlopTransformer.checkBudget(80, 100, 0.15);
    assert.equal(underCheck.compliant, false);

    // Test transformer integration with budget violation
    const html = '<h1>{SLOT_HEAD}</h1>';
    const transformer = new AntiSlopTransformer({
      contentSlots: {
        HEAD: 'Too short' // 9 chars vs target 50 chars -> ~82% deviation
      },
      referenceSlots: {
        HEAD: 50
      },
      budgetTolerance: 0.15
    });

    const res = transformer.transform(html);
    assert.equal(res.passed, false);
    assert.ok(res.violations.some(v => v.includes("Character budget violation on slot 'HEAD'")));
  });

  test('is deterministic and idempotent across multiple runs (hash match)', () => {
    const html = '<div><h1>{SLOT_A}</h1><p>{SLOT_B}</p></div>';
    const slots = {
      A: 'Deterministic Title Alpha',
      B: 'Deterministic Description Beta'
    };

    const t1 = new AntiSlopTransformer({ contentSlots: slots });
    const t2 = new AntiSlopTransformer({ contentSlots: slots });

    const r1 = t1.transform(html);
    const r2 = t2.transform(html);

    assert.equal(r1.html, r2.html);
    const hash1 = AntiSlopTransformer.computeHash(r1.html);
    const hash2 = AntiSlopTransformer.computeHash(r2.html);
    assert.equal(hash1, hash2);
  });
});

// ============================================================================
// 3. Edge CDN Static Compiler Tests
// ============================================================================

describe('Suite 3: Edge CDN Static Compiler', () => {
  test('compiles composition spec to standalone Edge CDN assets', () => {
    const compiler = new EdgeStaticCompiler();
    const spec = createValidCompositionSpec();

    const result = compiler.compile(spec);
    assert.equal(result.success, true);
    assert.ok(result.files['index.html']);
    assert.ok(result.files['styles.css']);
    assert.ok(result.files['runtime/kinetic-micro.js']);
    assert.ok(result.files['assets/manifest.json']);
  });

  test('strictly enforces micro-runtime size budget (<15KB)', () => {
    const runtimeSrc = generateMicroRuntimeSource();
    const sizeBytes = Buffer.byteLength(runtimeSrc, 'utf8');

    assert.ok(
      sizeBytes < MAX_MICRO_RUNTIME_BYTES,
      `Micro-runtime size ${sizeBytes} bytes must be strictly < ${MAX_MICRO_RUNTIME_BYTES} bytes (15KB)`
    );

    // Also assert compiler returns size strictly < 15KB
    const compiler = new EdgeStaticCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    assert.ok(res.runtimeSizeBytes < 15360);
  });

  test('enforces W3C mobile safeguard: overflow-x: clip !important in HTML & CSS', () => {
    const compiler = new EdgeStaticCompiler();
    const res = compiler.compile(createValidCompositionSpec());

    const html = res.files['index.html'];
    const css = res.files['styles.css'];

    assert.ok(html.includes('overflow-x: clip !important'));
    assert.ok(css.includes('overflow-x: clip !important'));
    assert.ok(css.includes('max-width: 100vw'));
  });

  test('verifies CSS contains @scope (.kinetic-stage) to ([data-kinetic-slot]) and fallback', () => {
    const compiler = new EdgeStaticCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    const css = res.files['styles.css'];

    assert.ok(css.includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'));
    assert.ok(css.includes('@supports not (scope: default)'));
    assert.ok(css.includes('[data-kinetic-slot]'));
  });

  test('renders semantic stages, slots, canvas, and optical anchors into index.html', () => {
    const compiler = new EdgeStaticCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    const html = res.files['index.html'];

    assert.ok(html.includes('<!DOCTYPE html>'));
    assert.ok(html.includes('<meta name="viewport"'));
    assert.ok(html.includes('data-stage-id="stage-hero"'));
    assert.ok(html.includes('data-kinetic-slot="HERO_TITLE"'));
    assert.ok(html.includes('Sculpted Acoustics in Motion'));
    assert.ok(html.includes('class="kinetic-webgl-canvas"'));
    assert.ok(html.includes('class="kinetic-anchor-badge"'));
    assert.ok(html.includes('data-anchor-id="anchor-driver"'));
    assert.ok(html.includes('src="./runtime/kinetic-micro.js"'));
  });

  test('writes Edge CDN compilation outputs to physical disk directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-cdn-test-'));
    try {
      const compiler = new EdgeStaticCompiler();
      const res = compiler.compile(createValidCompositionSpec(), {
        writeToDisk: true,
        outDir: tmpDir
      });

      assert.equal(res.success, true);
      assert.ok(fs.existsSync(path.join(tmpDir, 'index.html')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'styles.css')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'runtime', 'kinetic-micro.js')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'assets', 'manifest.json')));

      const statRuntime = fs.statSync(path.join(tmpDir, 'runtime', 'kinetic-micro.js'));
      assert.ok(statRuntime.size < 15360);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

// ============================================================================
// 4. Next.js 15 App Router RSC Compiler Tests
// ============================================================================

describe('Suite 4: Next.js 15 App Router RSC Compiler', () => {
  test('compiles composition spec to Next.js 15 App Router files', () => {
    const compiler = new NextJsRscCompiler();
    const res = compiler.compile(createValidCompositionSpec());

    assert.equal(res.success, true);
    assert.ok(res.files['app/layout.tsx']);
    assert.ok(res.files['app/page.tsx']);
    assert.ok(res.files['app/globals.css']);
    assert.ok(res.files['components/server/KineticSection.tsx']);
    assert.ok(res.files['components/client/KineticSceneIsland.tsx']);
    assert.ok(res.files['components/client/OpticalAnchorIsland.tsx']);
    assert.ok(res.files['components/client/ScrollControllerIsland.tsx']);
  });

  test('verifies KineticSection.tsx is a pure Server Component (0 client bundle)', () => {
    const compiler = new NextJsRscCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    const sectionTsx = res.files['components/server/KineticSection.tsx'];

    // Invariant: Server Component MUST NOT have 'use client'
    assert.ok(
      !sectionTsx.includes("'use client'"),
      'KineticSection.tsx must not contain "use client" directive'
    );
    assert.ok(
      !sectionTsx.includes('"use client"'),
      'KineticSection.tsx must not contain "use client" directive'
    );
    assert.ok(sectionTsx.includes('export default function KineticSection'));
    assert.ok(sectionTsx.includes('data-stage-id={id}'));
  });

  test('verifies client islands strictly begin with "use client" directive', () => {
    const compiler = new NextJsRscCompiler();
    const res = compiler.compile(createValidCompositionSpec());

    const islands = [
      'components/client/KineticSceneIsland.tsx',
      'components/client/OpticalAnchorIsland.tsx',
      'components/client/ScrollControllerIsland.tsx'
    ];

    for (const islandPath of islands) {
      const content = res.files[islandPath];
      assert.ok(
        content.trim().startsWith("'use client'"),
        `${islandPath} must start with 'use client' directive`
      );
    }
  });

  test('verifies app/layout.tsx exports Next.js 15 Metadata, Viewport, and JSON-LD', () => {
    const compiler = new NextJsRscCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    const layoutTsx = res.files['app/layout.tsx'];

    assert.ok(layoutTsx.includes('export const viewport: Viewport'));
    assert.ok(layoutTsx.includes('export const metadata: Metadata'));
    assert.ok(layoutTsx.includes('openGraph:'));
    assert.ok(layoutTsx.includes('application/ld+json'));
    assert.ok(layoutTsx.includes('Aura Kinetic'));
    assert.ok(layoutTsx.includes('overflow-x-clip'));
  });

  test('verifies app/page.tsx orchestrates section hierarchy with RSC and client islands', () => {
    const compiler = new NextJsRscCompiler();
    const res = compiler.compile(createValidCompositionSpec());
    const pageTsx = res.files['app/page.tsx'];

    assert.ok(pageTsx.includes("import KineticSection from '@/components/server/KineticSection'"));
    assert.ok(pageTsx.includes("import KineticSceneIsland from '@/components/client/KineticSceneIsland'"));
    assert.ok(pageTsx.includes("import OpticalAnchorIsland from '@/components/client/OpticalAnchorIsland'"));
    assert.ok(pageTsx.includes("import ScrollControllerIsland from '@/components/client/ScrollControllerIsland'"));
    assert.ok(pageTsx.includes('id="stage-hero"'));
    assert.ok(pageTsx.includes('id="stage-canvas"'));
    assert.ok(pageTsx.includes('id="stage-bento"'));
  });

  test('writes Next.js 15 App Router outputs to physical disk directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nextjs15-test-'));
    try {
      const compiler = new NextJsRscCompiler();
      const res = compiler.compile(createValidCompositionSpec(), {
        writeToDisk: true,
        outDir: tmpDir
      });

      assert.equal(res.success, true);
      assert.ok(fs.existsSync(path.join(tmpDir, 'app', 'layout.tsx')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'app', 'page.tsx')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'app', 'globals.css')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'components', 'server', 'KineticSection.tsx')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'components', 'client', 'KineticSceneIsland.tsx')));
      assert.ok(fs.existsSync(path.join(tmpDir, 'public', 'assets', 'manifest.json')));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

// ============================================================================
// 5. Dual-Stack Equivalence & Upstream Integration Tests
// ============================================================================

describe('Suite 5: Dual-Stack Equivalence & Upstream Integration', () => {
  test('both compilers accept the same kinetic composition spec identically', () => {
    const spec = createValidCompositionSpec();

    const edgeCompiler = new EdgeStaticCompiler();
    const nextCompiler = new NextJsRscCompiler();

    const edgeRes = edgeCompiler.compile(spec);
    const nextRes = nextCompiler.compile(spec);

    assert.equal(edgeRes.success, true);
    assert.equal(nextRes.success, true);

    // Both contain all stage IDs
    for (const stage of spec.stages) {
      assert.ok(edgeRes.files['index.html'].includes(stage.id));
      assert.ok(nextRes.files['app/page.tsx'].includes(stage.id));
    }

    // Both contain all slot IDs
    for (const stage of spec.stages) {
      for (const slot of stage.slots) {
        assert.ok(edgeRes.files['index.html'].includes(slot.slotId));
        assert.ok(nextRes.files['app/page.tsx'].includes(slot.slotId));
      }
    }

    // Both contain all optical anchor IDs
    for (const stage of spec.stages) {
      for (const anchor of stage.opticalAnchors || []) {
        assert.ok(edgeRes.files['index.html'].includes(anchor.id));
        assert.ok(nextRes.files['app/page.tsx'].includes(anchor.id));
      }
    }
  });

  test('both compilers enforce anti-slop rules on corrupted inputs', () => {
    const slopSpec = createValidCompositionSpec({
      stages: [
        {
          id: 'slop-stage',
          type: 'HeroCinematicStage',
          slots: [
            {
              slotId: 'SLOP_SLOT',
              slotType: 'text',
              targetSelector: '[data-kinetic-slot="SLOP_SLOT"]',
              content: 'Lorem ipsum dolor sit amet in production code'
            }
          ]
        }
      ]
    });

    const edgeCompiler = new EdgeStaticCompiler();
    const nextCompiler = new NextJsRscCompiler();

    assert.throws(() => {
      edgeCompiler.compile(slopSpec);
    }, /Anti-slop violation/);

    assert.throws(() => {
      nextCompiler.compile(slopSpec);
    }, /Anti-slop violation/);
  });
});
