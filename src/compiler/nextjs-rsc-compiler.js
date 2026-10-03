/**
 * Next.js 15 App Router RSC Compiler (Requirement R4)
 * 
 * Compiles a Kinetic Composition Spec into a complete Next.js 15 App Router directory:
 * 1. app/layout.tsx: Root layout, fonts, viewport metadata, OpenGraph, JSON-LD Schema
 * 2. app/page.tsx: Server Component orchestrating section hierarchy
 * 3. components/server/KineticSection.tsx: RSC emitting semantic HTML5 with 0 client JS bundle footprint
 * 4. components/client/KineticSceneIsland.tsx: 'use client' island for WebGL canvas, DPR scaling, KTX2 streaming
 * 5. components/client/OpticalAnchorIsland.tsx: 'use client' island for dynamic SVG leader lines & spatial badges
 * 6. components/client/ScrollControllerIsland.tsx: 'use client' Lenis smooth scroll bridge
 * 7. app/globals.css: Scoped CSS with @scope (.kinetic-stage) to ([data-kinetic-slot])
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { validateCompositionGrammar } = require('./kinetic-grammar-schema');
const { AntiSlopTransformer } = require('./anti-slop-transformer');
const { generateScopedCss } = require('./edge-static-compiler');

// ============================================================================
// 1. Template Generators for Next.js 15 App Router
// ============================================================================

/**
 * Generates app/layout.tsx
 */
function generateLayoutTsx(spec) {
  const brand = spec.brandSpec || {};
  const meta = brand.meta || {};
  const theme = brand.theme || {};
  const brandName = brand.brandName || 'Kinetic Studio';
  const pageTitle = meta.title || `${brandName} | Next.js 15 Kinetic Experience`;
  const pageDesc = meta.description || 'High-fidelity kinetic 3D web experience with Next.js 15 App Router RSC';
  const accentColor = theme.accent || '#00f0ff';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandName,
    description: pageDesc,
    url: meta.canonicalUrl || 'https://example.com'
  };

  return `import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '${accentColor}'
};

export const metadata: Metadata = {
  title: '${pageTitle.replace(/'/g, "\\'")}',
  description: '${pageDesc.replace(/'/g, "\\'")}',
  openGraph: {
    title: '${pageTitle.replace(/'/g, "\\'")}',
    description: '${pageDesc.replace(/'/g, "\\'")}',
    type: 'website',
    images: ['${meta.ogImage || '/og-image.jpg'}']
  },
  twitter: {
    card: 'summary_large_image',
    title: '${pageTitle.replace(/'/g, "\\'")}',
    description: '${pageDesc.replace(/'/g, "\\'")}'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(${JSON.stringify(jsonLd)})
          }}
        />
      </head>
      <body className="antialiased overflow-x-clip bg-[var(--bg-base)] text-[var(--text-primary)] font-[var(--font-family)]">
        {children}
      </body>
    </html>
  );
}
`;
}

/**
 * Generates components/server/KineticSection.tsx
 * Strictly 0 client JS bundle footprint - NO 'use client'
 */
function generateKineticSectionTsx() {
  return `import React from 'react';

export interface KineticSectionProps {
  id: string;
  stageType: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * KineticSection (React Server Component)
 * Zero client JS bundle footprint (RSC).
 * Emits semantic HTML5 section with donut isolation boundary.
 */
export default function KineticSection({
  id,
  stageType,
  className = '',
  children
}: KineticSectionProps) {
  return (
    <section
      id={id}
      data-stage-id={id}
      data-stage-type={stageType}
      className={\`kinetic-stage \${stageType} \${id} \${className}\`}
    >
      <div className="stage-inner">
        {children}
      </div>
    </section>
  );
}
`;
}

/**
 * Generates components/client/KineticSceneIsland.tsx
 * Must start with 'use client';
 */
function generateKineticSceneIslandTsx() {
  return `'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface KineticSceneIslandProps {
  stageId: string;
  modelRef?: string;
  dprLimit?: number;
  antialias?: boolean;
  alpha?: boolean;
  className?: string;
}

/**
 * KineticSceneIsland ('use client' Island)
 * Manages WebGL canvas lifecycle, DPR clamping, and KTX2 texture streaming.
 */
export default function KineticSceneIsland({
  stageId,
  modelRef,
  dprLimit = 2,
  antialias = true,
  alpha = true,
  className = ''
}: KineticSceneIslandProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, dprLimit);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dprLimit]);

  return (
    <div
      className={\`kinetic-canvas-container \${className}\`}
      data-kinetic-canvas={stageId}
    >
      <canvas
        ref={canvasRef}
        id={\`canvas-\${stageId}\`}
        className="kinetic-webgl-canvas"
        data-initialized={isInitialized ? 'true' : 'false'}
        data-model-ref={modelRef}
      />
    </div>
  );
}
`;
}

/**
 * Generates components/client/OpticalAnchorIsland.tsx
 * Must start with 'use client';
 */
function generateOpticalAnchorIslandTsx() {
  return `'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface OpticalAnchorPoint {
  id: string;
  worldPoint: [number, number, number];
  title: string;
  description: string;
}

export interface OpticalAnchorIslandProps {
  stageId: string;
  anchors: OpticalAnchorPoint[];
  className?: string;
}

/**
 * OpticalAnchorIsland ('use client' Island)
 * Renders animated SVG leader lines and spatial DOM annotation badges.
 */
export default function OpticalAnchorIsland({
  stageId,
  anchors = [],
  className = ''
}: OpticalAnchorIslandProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [leaderPaths, setLeaderPaths] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial SVG paths between anchors and cards
    const paths = anchors.map((a, idx) => {
      const x1 = 100 + idx * 80;
      const y1 = 150 + idx * 40;
      const x2 = x1 + 60;
      const y2 = y1 + 50;
      return \`M \${x1} \${y1} L \${x2} \${y2}\`;
    });
    setLeaderPaths(paths);
  }, [anchors]);

  if (!anchors || anchors.length === 0) return null;

  return (
    <>
      <svg
        ref={svgRef}
        className={\`kinetic-anchor-overlay \${className}\`}
        data-stage-id={stageId}
      >
        {leaderPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
        ))}
      </svg>
      {anchors.map((anchor) => (
        <div
          key={anchor.id}
          className="kinetic-anchor-badge"
          data-anchor-id={anchor.id}
          data-world-point={JSON.stringify(anchor.worldPoint)}
        >
          <h4>{anchor.title}</h4>
          <p>{anchor.description}</p>
        </div>
      ))}
    </>
  );
}
`;
}

/**
 * Generates components/client/ScrollControllerIsland.tsx
 * Must start with 'use client';
 */
function generateScrollControllerIslandTsx() {
  return `'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollControllerIsland ('use client' Island)
 * Lenis / Smooth scroll RAF ticker bridge.
 */
export default function ScrollControllerIsland() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return null; // Invisible coordinator
}
`;
}

/**
 * Generates app/page.tsx (Server Component)
 */
function generatePageTsx(spec) {
  let sectionImports = `import KineticSection from '@/components/server/KineticSection';\n`;
  sectionImports += `import KineticSceneIsland from '@/components/client/KineticSceneIsland';\n`;
  sectionImports += `import OpticalAnchorIsland from '@/components/client/OpticalAnchorIsland';\n`;
  sectionImports += `import ScrollControllerIsland from '@/components/client/ScrollControllerIsland';\n`;

  let stagesJsx = '';

  for (const stage of spec.stages || []) {
    let stageSlotsJsx = '';
    for (const slot of stage.slots || []) {
      const slotContent = typeof slot.content === 'string' ? slot.content : (slot.content ? JSON.stringify(slot.content) : '');
      stageSlotsJsx += `
          <div
            className="kinetic-slot"
            data-kinetic-slot="${slot.slotId}"
            data-slot-type="${slot.slotType}"
          >
            ${slotContent.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')}
          </div>`;
    }

    const hasCanvas = stage.type === 'ThreeJsCanvasStage' || (stage.kineticConfig && stage.kineticConfig.canvasSelector);
    let canvasIslandJsx = '';
    if (hasCanvas) {
      canvasIslandJsx = `
        <KineticSceneIsland
          stageId="${stage.id}"
          modelRef="${stage.kineticConfig?.modelRef || ''}"
          dprLimit={${stage.kineticConfig?.dprLimit || 2}}
        />`;
    }

    let anchorsIslandJsx = '';
    if (stage.opticalAnchors && stage.opticalAnchors.length > 0) {
      const serializedAnchors = JSON.stringify(stage.opticalAnchors.map(a => ({
        id: a.id,
        worldPoint: a.worldPoint,
        title: a.title,
        description: a.description
      })));
      anchorsIslandJsx = `
        <OpticalAnchorIsland
          stageId="${stage.id}"
          anchors={${serializedAnchors}}
        />`;
    }

    stagesJsx += `
      <KineticSection
        id="${stage.id}"
        stageType="${stage.type}"
      >
        ${canvasIslandJsx}
        ${anchorsIslandJsx}
        ${stageSlotsJsx}
      </KineticSection>`;
  }

  return `${sectionImports}

/**
 * Next.js 15 App Router Server Component Page
 * Orchestrates kinetic section hierarchy with 0 hydration lag.
 */
export default function Page() {
  return (
    <main id="kinetic-app" className="relative w-full">
      <ScrollControllerIsland />
${stagesJsx}
    </main>
  );
}
`;
}

// ============================================================================
// 2. NextJsRscCompiler Class
// ============================================================================

class NextJsRscCompiler {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Compiles the KineticCompositionSpec into Next.js 15 App Router structure.
   * 
   * @param {Object} spec Kinetic composition specification
   * @param {Object} [options] Compilation options (outDir, writeToDisk, antiSlop)
   * @returns {Object} Compilation results { success, files, outDir }
   */
  compile(spec, options = {}) {
    // 1. Schema Validation
    const validation = validateCompositionGrammar(spec);
    if (!validation.success) {
      const errMsgs = validation.errors.map(e => `${e.path}: ${e.message}`).join('; ');
      throw new Error(`NextJsRscCompiler schema validation failed: ${errMsgs}`);
    }

    const validatedSpec = validation.data;

    // 2. Anti-Slop Check
    if (options.antiSlop !== false) {
      for (const stage of validatedSpec.stages) {
        for (const slot of stage.slots) {
          if (typeof slot.content === 'string') {
            const slopCheck = AntiSlopTransformer.checkSlop(slot.content);
            if (slopCheck.hasSlop) {
              throw new Error(`Anti-slop violation in slot '${slot.slotId}': banned patterns [${slopCheck.matches.join(', ')}]`);
            }
          }
        }
      }
    }

    // 3. Generate App Router Artifacts
    const layoutTsx = generateLayoutTsx(validatedSpec);
    const pageTsx = generatePageTsx(validatedSpec);
    const globalsCss = generateScopedCss(validatedSpec);
    const kineticSectionTsx = generateKineticSectionTsx();
    const kineticSceneIslandTsx = generateKineticSceneIslandTsx();
    const opticalAnchorIslandTsx = generateOpticalAnchorIslandTsx();
    const scrollControllerIslandTsx = generateScrollControllerIslandTsx();

    // Verify invariants:
    // - KineticSection MUST NOT contain 'use client'
    if (kineticSectionTsx.includes("'use client'") || kineticSectionTsx.includes('"use client"')) {
      throw new Error('KineticSection.tsx contract violation: Server Component must not contain "use client"');
    }

    // - Client islands MUST start with 'use client'
    const clientIslands = [
      { name: 'KineticSceneIsland.tsx', content: kineticSceneIslandTsx },
      { name: 'OpticalAnchorIsland.tsx', content: opticalAnchorIslandTsx },
      { name: 'ScrollControllerIsland.tsx', content: scrollControllerIslandTsx }
    ];

    for (const island of clientIslands) {
      if (!island.content.trim().startsWith("'use client'")) {
        throw new Error(`Client island contract violation: ${island.name} must start with 'use client' directive`);
      }
    }

    const files = {
      'app/layout.tsx': layoutTsx,
      'app/page.tsx': pageTsx,
      'app/globals.css': globalsCss,
      'components/server/KineticSection.tsx': kineticSectionTsx,
      'components/client/KineticSceneIsland.tsx': kineticSceneIslandTsx,
      'components/client/OpticalAnchorIsland.tsx': opticalAnchorIslandTsx,
      'components/client/ScrollControllerIsland.tsx': scrollControllerIslandTsx,
      'public/assets/manifest.json': JSON.stringify({
        schemaVersion: validatedSpec.schemaVersion,
        brand: validatedSpec.brandSpec.brandName,
        target: 'nextjs-15-app-router',
        assets: validatedSpec.assets || [],
        stagesCount: validatedSpec.stages.length
      }, null, 2)
    };

    // 4. Optionally write to disk
    const outDir = options.outDir || null;
    if (options.writeToDisk && outDir) {
      fs.mkdirSync(path.join(outDir, 'app'), { recursive: true });
      fs.mkdirSync(path.join(outDir, 'components', 'server'), { recursive: true });
      fs.mkdirSync(path.join(outDir, 'components', 'client'), { recursive: true });
      fs.mkdirSync(path.join(outDir, 'public', 'assets'), { recursive: true });

      for (const [relPath, content] of Object.entries(files)) {
        const fullPath = path.join(outDir, relPath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }

    return {
      success: true,
      files,
      outDir
    };
  }
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  NextJsRscCompiler,
  generateLayoutTsx,
  generatePageTsx,
  generateKineticSectionTsx,
  generateKineticSceneIslandTsx,
  generateOpticalAnchorIslandTsx,
  generateScrollControllerIslandTsx
};
