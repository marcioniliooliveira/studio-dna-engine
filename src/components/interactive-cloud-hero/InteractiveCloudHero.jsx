'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { InteractiveClouds } from './three/InteractiveClouds.jsx';
import { Projectiles } from './three/Projectiles.jsx';
import { DEFAULT_CLUSTERS } from './defaultClusters.js';

export { DEFAULT_CLUSTERS };

/**
 * Interactive Cloud Hero Component
 *
 * Fullscreen hero combining Drei-style independent volumetric clouds with
 * aerodynamic projectile wakes and dynamic lighting, integrated with the
 * 21st.dev dark obsidian aesthetic, warm amber/yellow headline gradients,
 * trust badge pill, and glassmorphic CTAs.
 *
 * @param {object} props
 * @param {object} [props.trustBadge] - Trust badge pill data { text, icons }
 * @param {object} [props.headline] - Dual-line headline texts { line1, line2 }
 * @param {string} [props.subtitle] - Hero paragraph text
 * @param {object} [props.buttons] - Call-to-action button configurations { primary, secondary }
 * @param {Array<object>} [props.clusters] - Optional custom cloud cluster configurations
 * @param {number} [props.projectileCount=4] - Number of energetic glowing projectiles
 * @param {string} [props.className=""] - Additional CSS classes
 */
export function InteractiveCloudHero({
  trustBadge = { text: "Trusted by forward-thinking teams.", icons: ["✨"] },
  headline = { line1: "Launch Your", line2: "Workflow Into Orbit" },
  subtitle = "Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless.",
  buttons = {
    primary: { text: "Get Started for Free" },
    secondary: { text: "Explore Features" }
  },
  clusters = DEFAULT_CLUSTERS,
  projectileCount = 4,
  className = ""
}) {
  const [mounted, setMounted] = useState(false);
  const projectilesRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      {/* 3D WebGL Canvas Layer */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffd199" />

            {/* Independent Volumetric Clouds */}
            <InteractiveClouds
              clusters={clusters || DEFAULT_CLUSTERS}
              projectilesRef={projectilesRef}
            />

            {/* Glowing Projectiles with Wake Output */}
            <Projectiles
              count={projectileCount}
              onUpdate={(states) => {
                projectilesRef.current = states;
              }}
            />
          </Canvas>
        </div>
      )}

      {/* UI Content Layer (Preserved from 21st.dev reference) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 pointer-events-auto">
        {trustBadge && (
          <div className="mb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, i) => (
                    <span key={i} className="text-amber-300">{icon}</span>
                  ))}
                </div>
              )}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 max-w-5xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              {headline.line1}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {headline.line2}
            </h1>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {buttons.primary && (
                <button
                  type="button"
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 cursor-pointer"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  type="button"
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveCloudHero;
