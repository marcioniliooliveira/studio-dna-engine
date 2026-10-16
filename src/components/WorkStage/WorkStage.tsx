import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { REFERENCE_PROJECTS, BRAND_TOKENS, JESPER_CANONICAL_ASSETS, ProjectSlot } from './referenceData';
import { SHEET_CONSTANTS, clamp } from './math';
import { RibbonCard } from './RibbonCard';
import { FloorGrid } from './FloorGrid';

export interface WorkStageProps {
  initialPortalProgress?: number;
  onLockScrollChange?: (locked: boolean) => void;
}

const RIBBON_STRIDE = 18.5;

export const WorkStage: React.FC<WorkStageProps> = ({
  initialPortalProgress = 1.0,
  onLockScrollChange,
}) => {
  const [portalProgress, setPortalProgress] = useState(initialPortalProgress);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<
    'IDLE' | 'PORTAL_EXPAND' | 'RIBBON_BROWSE' | 'DETAIL_FLIGHT' | 'DETAIL_ACTIVE' | 'DETAIL_CLOSING'
  >(initialPortalProgress >= 1 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND');

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const portalProgressRef = useRef(portalProgress);
  portalProgressRef.current = portalProgress;

  const updatePhase = useCallback(
    (newPhase: 'IDLE' | 'PORTAL_EXPAND' | 'RIBBON_BROWSE' | 'DETAIL_FLIGHT' | 'DETAIL_ACTIVE' | 'DETAIL_CLOSING') => {
      phaseRef.current = newPhase;
      setPhase(newPhase);
      const w = window as any;
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = newPhase;
      }
    },
    []
  );

  const updateActiveIndex = useCallback((newIndex: number | null) => {
    activeIndexRef.current = newIndex;
    setActiveIndex(newIndex);
    const w = window as any;
    if (w.__WORK_STAGE__) {
      w.__WORK_STAGE__.activeProjectIndex = newIndex;
    }
  }, []);

  const updatePortalProgress = useCallback((newP: number) => {
    portalProgressRef.current = newP;
    setPortalProgress(newP);
    const w = window as any;
    if (w.__WORK_STAGE__) {
      w.__WORK_STAGE__.portalProgress = newP;
    }
  }, []);

  const ribbonState = useRef({
    offset: 0,
    targetOffset: 0,
    velocity: 0,
  });

  // Inicialização do objeto global de telemetria
  useEffect(() => {
    const w = window as any;
    const initialCards: Record<number, any> = {};
    REFERENCE_PROJECTS.forEach((proj) => {
      const baseX = (proj.index - 1.5) * RIBBON_STRIDE;
      initialCards[proj.index] = {
        index: proj.index,
        slug: proj.slug,
        title: proj.title,
        worldX: baseX,
        uniforms: {
          u_sheetP: 1.0,
          u_hover: 0.0,
          u_white: 0.0,
          u_shade: 1.0,
          u_scrim: 0.85,
          u_sheetV: 0.0,
          u_alpha: 1.0,
        },
      };
    });

    if (!w.__WORK_STAGE__) {
      w.__WORK_STAGE__ = {
        webglReady: true,
        phase: initialPortalProgress >= 1 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND',
        portalProgress: initialPortalProgress,
        ribbonOffset: 0,
        scrollVelocity: 0,
        activeProjectIndex: null,
        floorAlpha: 1.0,
        assets: JESPER_CANONICAL_ASSETS,
        cards: initialCards,
      };
    } else {
      w.__WORK_STAGE__.webglReady = true;
      w.__WORK_STAGE__.assets = JESPER_CANONICAL_ASSETS;
      if (!w.__WORK_STAGE__.phase) {
        w.__WORK_STAGE__.phase = initialPortalProgress >= 1 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
      }
      if (w.__WORK_STAGE__.portalProgress === undefined) {
        w.__WORK_STAGE__.portalProgress = initialPortalProgress;
      }
      if (!w.__WORK_STAGE__.cards || Object.keys(w.__WORK_STAGE__.cards).length === 0) {
        w.__WORK_STAGE__.cards = initialCards;
      }
    }
  }, [initialPortalProgress]);

  // Escuta wheel a nível de window e document (capture phase) quando o portal está ativo
  useEffect(() => {
    const w = window as any;
    w.__WHEEL_DEBUG__ = w.__WHEEL_DEBUG__ || [];

    const onWindowWheel = (e: WheelEvent) => {
      const isPortalOpen =
        portalProgressRef.current >= 0.95 ||
        (w.__WORK_STAGE__ && w.__WORK_STAGE__.portalProgress >= 0.95);

      const deltaY = e.deltaY || (e as any).detail || 0;
      w.__WHEEL_DEBUG__.push({
        deltaY,
        isPortalOpen,
        activeIndex,
        portalProgress: portalProgressRef.current,
        wsPortalProgress: w.__WORK_STAGE__?.portalProgress,
      });

      if (activeIndex !== null || !isPortalOpen) return;
      if (Math.abs(deltaY) < 1) return;

      const maxOffset = ((REFERENCE_PROJECTS.length - 1) * RIBBON_STRIDE) / 2;
      ribbonState.current.targetOffset = clamp(
        ribbonState.current.targetOffset - deltaY * 0.025,
        -maxOffset,
        maxOffset
      );

      // Impulso físico instantâneo amortecido pelo loop
      const impulse = clamp(Math.abs(deltaY) * 0.0012, 0.08, 1.0);
      ribbonState.current.velocity = Math.max(ribbonState.current.velocity, impulse);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.scrollVelocity = ribbonState.current.velocity;
      }
    };

    window.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
    document.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
    return () => {
      window.removeEventListener('wheel', onWindowWheel, { capture: true });
      document.removeEventListener('wheel', onWindowWheel, { capture: true });
    };
  }, [activeIndex]);

  // Loop de física da fita (amortecimento de scroll e cálculo de u_sheetV)
  useEffect(() => {
    let rafId: number;
    const updateLoop = () => {
      if (activeIndex === null) {
        const prev = ribbonState.current.offset;
        ribbonState.current.offset +=
          (ribbonState.current.targetOffset - ribbonState.current.offset) * 0.1;
        const delta = Math.abs(ribbonState.current.offset - prev);
        const targetVel = clamp(delta * 1.6, 0, 1);
        ribbonState.current.velocity += (targetVel - ribbonState.current.velocity) * 0.15;
      } else {
        ribbonState.current.velocity *= 0.85;
      }

      const w = window as any;
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = phaseRef.current;
        w.__WORK_STAGE__.portalProgress = portalProgressRef.current;
        w.__WORK_STAGE__.ribbonOffset = ribbonState.current.offset;
        w.__WORK_STAGE__.scrollVelocity = ribbonState.current.velocity;
        w.__WORK_STAGE__.activeProjectIndex = activeIndexRef.current;
        w.__WORK_STAGE__.floorAlpha = activeIndexRef.current === null ? portalProgressRef.current : 0;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Exposição de helper determinístico para testes Playwright (Gate 2)
  useEffect(() => {
    const w = window as any;
    w.__TEST_SET_PORTAL_PROGRESS__ = (p: number) => {
      const clamped = clamp(p, 0, 1);
      portalProgressRef.current = clamped;
      setPortalProgress(clamped);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.portalProgress = clamped;
      }
      if (
        activeIndexRef.current === null &&
        phaseRef.current !== 'DETAIL_FLIGHT' &&
        phaseRef.current !== 'DETAIL_ACTIVE' &&
        phaseRef.current !== 'DETAIL_CLOSING'
      ) {
        const nextPhase = clamped >= 0.90 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
        if (w.__WORK_STAGE__) {
          w.__WORK_STAGE__.phase = nextPhase;
        }
      }
    };
  }, []);

  const [mounted, setMounted] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'DETAIL_FLIGHT' || phase === 'DETAIL_ACTIVE') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }, [phase]);

  const handleOpenProject = useCallback(
    (index: number) => {
      if (activeIndexRef.current !== null) return;
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      const w = window as any;
      phaseRef.current = 'DETAIL_FLIGHT';
      activeIndexRef.current = index;
      setPhase('DETAIL_FLIGHT');
      setActiveIndex(index);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = 'DETAIL_FLIGHT';
        w.__WORK_STAGE__.activeProjectIndex = index;
      }
      onLockScrollChange?.(true);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('scroll'));

      openTimeoutRef.current = setTimeout(() => {
        phaseRef.current = 'DETAIL_ACTIVE';
        setPhase('DETAIL_ACTIVE');
        if (w.__WORK_STAGE__) {
          w.__WORK_STAGE__.phase = 'DETAIL_ACTIVE';
        }
        const root = document.getElementById('work-detail-panel-root');
        if (root) {
          root.setAttribute('aria-hidden', 'false');
          root.style.opacity = '1';
          root.style.pointerEvents = 'auto';
        }
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        const header = document.querySelector('header[data-intro-header]') as HTMLElement;
        if (header) {
          header.style.setProperty('--header-bg', '#faf9f6');
          header.style.setProperty('--header-text', '#2e2b28');
          header.style.setProperty('--header-border', '#b8b3ac');
          for (const el of header.querySelectorAll('svg rect')) {
            el.setAttribute('fill', '#2e2b28');
          }
        }
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
      }, 900);
    },
    [onLockScrollChange]
  );

  const handleCloseProject = useCallback(() => {
    if (activeIndexRef.current === null && phaseRef.current !== 'DETAIL_FLIGHT') return;
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    const w = window as any;
    phaseRef.current = 'DETAIL_CLOSING';
    activeIndexRef.current = null;
    setPhase('DETAIL_CLOSING');
    setActiveIndex(null);
    if (w.__WORK_STAGE__) {
      w.__WORK_STAGE__.phase = 'DETAIL_CLOSING';
      w.__WORK_STAGE__.activeProjectIndex = null;
    }
    onLockScrollChange?.(false);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    const root = document.getElementById('work-detail-panel-root');
    if (root) {
      root.setAttribute('aria-hidden', 'true');
      root.style.opacity = '0';
      root.style.pointerEvents = 'none';
    }
    const header = document.querySelector('header[data-intro-header]') as HTMLElement;
    if (header) {
      header.style.setProperty('--header-bg', '#3A3632');
      header.style.setProperty('--header-text', '#f3eee8');
      header.style.setProperty('--header-border', '#5a524d');
      for (const el of header.querySelectorAll('svg rect')) {
        el.setAttribute('fill', '#f3eee8');
      }
    }
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));

    closeTimeoutRef.current = setTimeout(() => {
      phaseRef.current = 'RIBBON_BROWSE';
      setPhase('RIBBON_BROWSE');
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = 'RIBBON_BROWSE';
      }
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, 800);
  }, [onLockScrollChange]);

  // Fecho via tecla Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeIndex !== null) {
        handleCloseProject();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, handleCloseProject]);

  // Manter tema do header Astro ativo e imune a sobrescritas durante DETAIL_ACTIVE
  useEffect(() => {
    if (phase !== 'DETAIL_ACTIVE') return;
    const header = document.querySelector('header[data-intro-header]') as HTMLElement;
    if (!header) return;

    let updating = false;
    const enforceTheme = () => {
      if (updating) return;
      const bg = header.style.getPropertyValue('--header-bg').toLowerCase().trim();
      const text = header.style.getPropertyValue('--header-text').toLowerCase().trim();
      const border = header.style.getPropertyValue('--header-border').toLowerCase().trim();
      const needsBg = bg !== '#faf9f6' && bg !== 'rgb(250, 249, 246)';
      const needsText = text !== '#2e2b28' && text !== 'rgb(46, 43, 40)';
      const needsBorder = border !== '#b8b3ac' && border !== 'rgb(184, 179, 172)';

      if (needsBg || needsText || needsBorder) {
        updating = true;
        header.style.setProperty('--header-bg', '#FAF9F6');
        header.style.setProperty('--header-text', '#2E2B28');
        header.style.setProperty('--header-border', '#b8b3ac');
        for (const el of header.querySelectorAll('svg rect')) {
          el.setAttribute('fill', '#2E2B28');
        }
        updating = false;
      }
    };

    enforceTheme();
    const interval = setInterval(enforceTheme, 100);
    const observer = new MutationObserver(enforceTheme);
    observer.observe(header, { attributes: true, attributeFilter: ['style'] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [phase]);

  // Manter scroll lock durante DETAIL_FLIGHT e DETAIL_ACTIVE
  useEffect(() => {
    if (phase !== 'DETAIL_ACTIVE' && phase !== 'DETAIL_FLIGHT') return;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const interval = setInterval(() => {
      if (document.documentElement.style.overflow !== 'hidden') {
        document.documentElement.style.overflow = 'hidden';
      }
      if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  const handleWheel = (e: React.WheelEvent) => {
    if (activeIndex !== null || portalProgress < 0.95) return;
    const maxOffset = ((REFERENCE_PROJECTS.length - 1) * RIBBON_STRIDE) / 2;
    ribbonState.current.targetOffset = clamp(
      ribbonState.current.targetOffset - e.deltaY * 0.025,
      -maxOffset,
      maxOffset
    );
  };

  const lastActiveProjectRef = useRef<ProjectSlot>(REFERENCE_PROJECTS[0]);
  if (activeIndex !== null) {
    lastActiveProjectRef.current = REFERENCE_PROJECTS[activeIndex];
  }
  const displayProject = lastActiveProjectRef.current;
  const isDetailOpen = activeIndex !== null;

  return (
    <>
      <div
        data-work-webgl-stage=""
        onWheel={handleWheel}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: BRAND_TOKENS.bgDark,
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, SHEET_CONSTANTS.CAMERA_Z],
            fov: SHEET_CONSTANTS.CAMERA_FOV,
            near: 0.1,
            far: 200,
          }}
        >
          <React.Suspense fallback={null}>
            <FloorGrid
              alpha={activeIndex === null ? portalProgress : 0.0}
              uSheetP={activeIndex === null ? 1.0 : 0.0}
            />
            {REFERENCE_PROJECTS.map((proj) => {
              const baseX = (proj.index - 1.5) * RIBBON_STRIDE + ribbonState.current.offset;
              const isThisOpen = activeIndex === proj.index;
              const isOtherOpen = activeIndex !== null && activeIndex !== proj.index;

              return (
                <RibbonCard
                  key={proj.slug}
                  project={proj}
                  worldX={baseX}
                  worldY={0}
                  planeSize={[16, 10]}
                  scrollVelocity={ribbonState.current.velocity}
                  isDetailOpen={isThisOpen}
                  isHidden={isOtherOpen}
                  onSelect={handleOpenProject}
                />
              );
            })}
          </React.Suspense>
        </Canvas>
      </div>

      {/* Camada de Proxies DOM para acessibilidade, hover e cliques determinísticos nos 4 projetos portaled para document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            data-work-ribbon-proxies=""
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5vw',
              pointerEvents: 'none',
              zIndex: 130,
              opacity: portalProgress >= 0.95 && activeIndex === null ? 1 : 0,
              visibility: portalProgress >= 0.95 && activeIndex === null ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {REFERENCE_PROJECTS.map((proj) => (
              <button
                key={proj.slug}
                type="button"
                data-testid={`work-card-proxy-${proj.index}`}
                data-work-card-proxy={proj.index}
                aria-label={`View ${proj.shortName} project details`}
                onClick={() => handleOpenProject(proj.index)}
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('work-card-hover', { detail: { index: proj.index, hover: 1 } })
                  );
                }}
                onMouseLeave={() => {
                  window.dispatchEvent(
                    new CustomEvent('work-card-hover', { detail: { index: proj.index, hover: 0 } })
                  );
                }}
                onPointerEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('work-card-hover', { detail: { index: proj.index, hover: 1 } })
                  );
                }}
                onPointerLeave={() => {
                  window.dispatchEvent(
                    new CustomEvent('work-card-hover', { detail: { index: proj.index, hover: 0 } })
                  );
                }}
                style={{
                  pointerEvents: activeIndex === null && portalProgress >= 0.95 ? 'auto' : 'none',
                  width: '21vw',
                  height: '28vh',
                  background: 'transparent',
                  border: 'none',
                  color: BRAND_TOKENS.textLight,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '0.75rem', opacity: 0.75, textTransform: 'uppercase' }}>
                  0{proj.index + 1} / {proj.year}
                </span>
                <span
                  style={{
                    fontFamily: 'PP Editorial Old, serif',
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {proj.shortName}
                </span>
              </button>
            ))}
          </div>,
          document.body
        )}

          {/* Visão Detalhada permanente no DOM e portada para work-detail-panel-root */}
      {typeof document !== 'undefined' &&
        (document.getElementById('work-detail-panel-root') || document.body) &&
        createPortal(
          <div
            data-testid="work-detail-panel"
            data-work-detail-panel=""
            data-header-bg="#FAF9F6"
            data-header-text="#2E2B28"
            data-header-border="#b8b3ac"
            aria-hidden={activeIndex === null ? 'true' : 'false'}
            aria-label={`${displayProject.shortName} project details`}
            style={{
              position: 'fixed',
              inset: 0,
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 120,
              pointerEvents: activeIndex === null ? 'none' : 'auto',
              opacity: activeIndex === null ? 0 : 1,
              transition: 'opacity 0.4s ease-out',
              backgroundColor: BRAND_TOKENS.bgSurface,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '3.5rem',
              paddingLeft: '5.5rem',
              color: BRAND_TOKENS.textDark,
            }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                Chapter II — {displayProject.category} ({displayProject.year})
              </p>
              <button
                type="button"
                data-testid="detail-close-btn"
                data-detail-close=""
                onClick={handleCloseProject}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '9999px',
                  backgroundColor: BRAND_TOKENS.textDark,
                  color: BRAND_TOKENS.bgSurface,
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Close
              </button>
            </header>

            <div style={{ maxWidth: '48rem' }}>
              <h2
                data-detail-title=""
                style={{
                  fontFamily: 'PP Editorial Old, serif',
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                }}
              >
                {displayProject.shortName} — {displayProject.title}
              </h2>
              <p style={{ marginTop: '1.5rem', fontSize: '1.25rem', lineHeight: 1.4 }}>
                {displayProject.description}
              </p>
            </div>

            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', textTransform: 'uppercase' }}>
                Project 0{displayProject.index + 1} / 0{REFERENCE_PROJECTS.length}
              </span>
              <a
                href={displayProject.link}
                className="to-link-underline"
                style={{ fontSize: '1.125rem', fontWeight: 500 }}
              >
                Solicitar estudo de caso →
              </a>
            </footer>
          </div>,
          document.getElementById('work-detail-panel-root') || document.body
        )}
    </>
  );
};
