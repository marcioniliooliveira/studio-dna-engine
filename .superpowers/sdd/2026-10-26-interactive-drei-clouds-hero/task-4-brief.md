# Task 4 Brief: Complete Interactive Cloud Hero Assembly

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/InteractiveCloudHero.jsx`
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/index.js`
- Create: `studio-dna-engine/copias/21st-dev/interactive-cloud-hero/dna.json`
- Test: `studio-dna-engine/test/heroAssembly.test.js`

**Interfaces:**
- Consumes:
  - `<InteractiveClouds />` from `./three/InteractiveClouds.jsx`
  - `<Projectiles />` from `./three/Projectiles.jsx`
- Produces:
  - Exported `<InteractiveCloudHero />` component from `index.js`
  - `dna.json` metadata entry in `copias/21st-dev/interactive-cloud-hero/`

**Requirements:**
1. `InteractiveCloudHero.jsx`:
   - Fullscreen container `relative w-full h-screen overflow-hidden bg-black`.
   - SSR safety: `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []);`.
   - `<Canvas>` wrapper positioned `absolute inset-0 pointer-events-none` with camera `[0, 0, 8]`, `fov: 60`.
   - 3D Scene setup:
     - Ambient light: `intensity={0.4}`
     - Directional light: `position={[5, 10, 5]} intensity={0.8} color="#ffd199"`
     - `<InteractiveClouds clusters={DEFAULT_CLUSTERS} projectilesRef={projectilesRef} />`
     - `<Projectiles count={4} onUpdate={(states) => { projectilesRef.current = states; }} />`
   - UI Overlay layer `absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 pointer-events-auto`:
     - Trust badge pill with icon array and `bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full`.
     - Headline line 1: `bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent`.
     - Headline line 2: `bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent`.
     - Subtitle paragraph `text-orange-100/90 font-light`.
     - Primary button: gradient orange/yellow with hover scale and orange shadow.
     - Secondary button: glassmorphic `bg-orange-500/10 border-orange-300/30` with backdrop-blur.
2. `index.js`:
   - Exports `InteractiveCloudHero`, `InteractiveClouds`, `Projectiles`, `wakeEngine`, `cloudGenerator`, and `projectileMath`.
3. `dna.json`:
   - Categorized as `hero`, framework `react-three-fiber`, tags including `clouds`, `projectiles`, `interactive`, `hero`, `3d`.
4. Unit tests in `studio-dna-engine/test/heroAssembly.test.js`:
   - Verifies exports, default cluster configurations (5 independent clusters, bounded positions), and metadata consistency.
   - Run with `node --test studio-dna-engine/test/heroAssembly.test.js`.
