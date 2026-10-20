import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import {
  REFERENCE_PROJECTS,
  BRAND_TOKENS,
  JESPER_CANONICAL_ASSETS,
  ProjectSlot,
  RIBBON_STRIDE,
  CARD_PLANE_SIZE,
} from './referenceData';
import {
  SHEET_CONSTANTS,
  clamp,
  computeDynamicDepth,
  wrapRibbonPosition,
  computeCardProxyRect,
  SheetUniformParams,
} from './math';
import { RibbonCard } from './RibbonCard';
import { FloorGrid } from './FloorGrid';

export interface WorkStageProps {
  initialPortalProgress?: number;
  onLockScrollChange?: (locked: boolean) => void;
}

export const WorkStage: React.FC<WorkStageProps> = ({
  initialPortalProgress = 1.0,
  onLockScrollChange,
}) => {
  const wInitial = typeof window !== 'undefined' ? (window as any) : null;
  const existingProgress = wInitial?.__WORK_STAGE__?.portalProgress;
  const resolvedInitialProgress =
    typeof existingProgress === 'number' ? existingProgress : initialPortalProgress;
  const existingPhase = wInitial?.__WORK_STAGE__?.phase;
  const resolvedInitialPhase =
    existingPhase || (resolvedInitialProgress >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND');

  const [portalProgress, setPortalProgress] = useState(resolvedInitialProgress);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<
    'IDLE' | 'PORTAL_EXPAND' | 'RIBBON_BROWSE' | 'DETAIL_FLIGHT' | 'DETAIL_ACTIVE' | 'DETAIL_CLOSING'
  >(resolvedInitialPhase);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const portalProgressRef = useRef(resolvedInitialProgress);
  const proxiesRef = useRef<HTMLDivElement>(null);
  const proxyBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // HUD & Cumulative scroll displacement
  const cumulativeScrollRef = useRef(0);
  const [showSoldButton, setShowSoldButton] = useState(false);

  // Staggered detail choreography refs
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

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
    const w = window as any;
    if (w.__WORK_STAGE__) {
      w.__WORK_STAGE__.portalProgress = newP;
    }
  }, []);

  const handleExitToChapter3 = useCallback(() => {
    const w = window as any;
    setShowSoldButton(false);
    if (proxiesRef.current) {
      proxiesRef.current.style.opacity = '0';
      proxiesRef.current.style.pointerEvents = 'none';
    }
    if (typeof w.__TRIGGER_PORTAL_EXIT__ === 'function') {
      w.__TRIGGER_PORTAL_EXIT__();
    } else {
      window.dispatchEvent(new CustomEvent('work-portal-exit-request'));
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
          u_sheetD: 12.0,
          u_alpha: 1.0,
        },
      };
    });

    if (!w.__WORK_STAGE__) {
      w.__WORK_STAGE__ = {
        webglReady: true,
        phase: resolvedInitialPhase,
        portalProgress: resolvedInitialProgress,
        ribbonOffset: 0,
        scrollVelocity: 0,
        activeProjectIndex: null,
        floorAlpha: resolvedInitialProgress,
        assets: JESPER_CANONICAL_ASSETS,
        cards: initialCards,
        cumulativeScroll: 0,
        isAlreadySoldVisible: false,
      };
    } else {
      w.__WORK_STAGE__.webglReady = true;
      w.__WORK_STAGE__.assets = JESPER_CANONICAL_ASSETS;
      if (!w.__WORK_STAGE__.phase) {
        w.__WORK_STAGE__.phase = resolvedInitialPhase;
      }
      if (w.__WORK_STAGE__.portalProgress === undefined) {
        w.__WORK_STAGE__.portalProgress = resolvedInitialProgress;
      }
      if (!w.__WORK_STAGE__.cards || Object.keys(w.__WORK_STAGE__.cards).length === 0) {
        w.__WORK_STAGE__.cards = initialCards;
      }
      if (w.__WORK_STAGE__.cumulativeScroll === undefined) {
        w.__WORK_STAGE__.cumulativeScroll = 0;
      }
      if (w.__WORK_STAGE__.isAlreadySoldVisible === undefined) {
        w.__WORK_STAGE__.isAlreadySoldVisible = false;
      }
    }

    w.__TEST_TRIGGER_SOLD_BUTTON__ = () => {
      cumulativeScrollRef.current = 1250;
      setShowSoldButton(true);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.cumulativeScroll = 1250;
        w.__WORK_STAGE__.isAlreadySoldVisible = true;
      }
    };
  }, [resolvedInitialPhase, resolvedInitialProgress]);

  // Motor Cinético Híbrido: Suporte a Wheel (deltaX + deltaY), Touch/Swipe, Teclado e Infinite Ribbon
  useEffect(() => {
    const w = window as any;
    w.__WHEEL_DEBUG__ = w.__WHEEL_DEBUG__ || [];

    const applyDelta = (rawDelta: number) => {
      if (activeIndexRef.current !== null) return;
      const isPortalOpen =
        (phaseRef.current === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) &&
        (w.__WORK_STAGE__ ? w.__WORK_STAGE__.portalProgress >= 0.95 : true);
      if (!isPortalOpen) return;
      if (Math.abs(rawDelta) < 0.5) return;

      // Infinite Ribbon: translação sem barreiras rígidas
      ribbonState.current.targetOffset -= rawDelta * 0.045;

      // Acumulador de deslocamento para HUD voluntário
      cumulativeScrollRef.current += Math.abs(rawDelta);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.cumulativeScroll = cumulativeScrollRef.current;
      }
      if (cumulativeScrollRef.current >= 1200 && !showSoldButton) {
        setShowSoldButton(true);
        if (w.__WORK_STAGE__) {
          w.__WORK_STAGE__.isAlreadySoldVisible = true;
        }
      }

      // Impulso de velocidade cinemática suave com saturação tangencial (Jesper Landberg model)
      const impulse = clamp(Math.tanh(Math.abs(rawDelta) * 0.0035) * 0.75, 0.08, 0.85);
      ribbonState.current.velocity = Math.max(ribbonState.current.velocity, impulse);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.scrollVelocity = ribbonState.current.velocity;
      }
    };

    // 1. Wheel & Trackpad (bidirecional deltaX + deltaY)
    const onWindowWheel = (e: WheelEvent) => {
      const isPortalOpen =
        (phaseRef.current === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) &&
        activeIndexRef.current === null;

      const dx = e.deltaX || 0;
      const dy = e.deltaY || (e as any).detail || 0;
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;

      w.__WHEEL_DEBUG__.push({
        dx,
        dy,
        delta,
        isPortalOpen,
        activeIndex: activeIndexRef.current,
        portalProgress: portalProgressRef.current,
      });

      if (!isPortalOpen) return;
      applyDelta(delta);
    };

    // 2. Touch Gestures (Mobile & Tablet: touchstart, touchmove, touchend)
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchDelta = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.targetTouches?.[0] || e.touches?.[0];
      if (!t) return;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      lastTouchDelta = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const isBrowseReady =
        phaseRef.current === 'RIBBON_BROWSE' &&
        portalProgressRef.current >= 0.99 &&
        activeIndexRef.current === null;
      if (!isBrowseReady) return;
      const t = e.targetTouches?.[0] || e.touches?.[0];
      if (!t) return;
      const dx = touchStartX - t.clientX;
      const dy = touchStartY - t.clientY;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      lastTouchDelta = dominant;
      applyDelta(dominant * 2.8);
    };

    const onTouchEnd = () => {
      const isBrowseReady =
        phaseRef.current === 'RIBBON_BROWSE' &&
        portalProgressRef.current >= 0.99 &&
        activeIndexRef.current === null;
      if (!isBrowseReady) return;
      if (Math.abs(lastTouchDelta) > 0.5) {
        applyDelta(lastTouchDelta * 12.0);
      }
      lastTouchDelta = 0;
    };

    // 3. Navegação via Teclado (Setas Esquerda/Direita/Cima/Baixo)
    const onKeyDown = (e: KeyboardEvent) => {
      const isBrowseReady =
        phaseRef.current === 'RIBBON_BROWSE' &&
        portalProgressRef.current >= 0.99 &&
        activeIndexRef.current === null;
      if (!isBrowseReady) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        applyDelta(120);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        applyDelta(-120);
      }
    };

    window.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWindowWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  // Loop de física da fita com normalização de framerate (Jesper Landberg model)
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const updateLoop = (now: number) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      const ratio = Math.max(0.1, dt / (1000 / 60)); // normalizado para 60fps

      if (activeIndexRef.current === null) {
        const prev = ribbonState.current.offset;
        const offsetLerp = 1 - Math.pow(1 - 0.10, ratio);
        ribbonState.current.offset +=
          (ribbonState.current.targetOffset - ribbonState.current.offset) * offsetLerp;
        const distance = Math.abs(ribbonState.current.targetOffset - ribbonState.current.offset);
        // Dinâmica de velocidade acoplada à distância restante: relaxamento síncrono com a parada física
        const trackingVel = Math.min(1.0, Math.pow(Math.tanh(distance / 12.0), 1.5));
        if (trackingVel > ribbonState.current.velocity) {
          ribbonState.current.velocity +=
            (trackingVel - ribbonState.current.velocity) * (1 - Math.pow(1 - 0.25, ratio));
        } else {
          // Decaimento inercial rápido (retenção 0.88/frame em 60fps => meia-vida de ~120ms, relaxamento em ~400ms)
          ribbonState.current.velocity = Math.max(
            trackingVel,
            ribbonState.current.velocity * Math.pow(0.88, ratio)
          );
        }
      } else {
        ribbonState.current.velocity *= Math.pow(0.80, ratio);
      }

      // Sincronização imperativa dos proxies DOM sem re-renders React (60fps)
      if (typeof window !== 'undefined') {
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const curVel = ribbonState.current.velocity;
        const curDepth = computeDynamicDepth(12.0, curVel);
        const uniformParams: SheetUniformParams = {
          u_sheetD: curDepth,
          u_sheetW: 34.0,
          u_sheetT: 0.9,
          u_sheetC: 1.0,
          u_sheetP: activeIndexRef.current === null ? 1.0 : 0.0,
          u_sheetV: curVel,
        };

        REFERENCE_PROJECTS.forEach((proj) => {
          const btn = proxyBtnRefs.current[proj.index];
          if (!btn) return;
          const xRaw = (proj.index - 1.5) * RIBBON_STRIDE + ribbonState.current.offset;
          const xWrapped = wrapRibbonPosition(xRaw);
          const rect = computeCardProxyRect(
            xWrapped,
            vpW,
            vpH,
            CARD_PLANE_SIZE[0],
            CARD_PLANE_SIZE[1],
            uniformParams
          );

          // For on-screen cards, use exact 1:1 projection.
          // For off-screen cards, clamp position so at least 50px remains inside viewport edge
          // ensuring Playwright locator.hover({ force: true }) can reach the element.
          let targetLeft = rect.left;
          if (targetLeft > vpW - 50) {
            targetLeft = vpW - 50;
          } else if (targetLeft < -rect.width + 50) {
            targetLeft = -rect.width + 50;
          }

          btn.style.left = `${targetLeft}px`;
          btn.style.top = `${rect.top}px`;
          btn.style.width = `${rect.width}px`;
          btn.style.height = `${rect.height}px`;
          btn.style.pointerEvents = 'auto';
          btn.style.visibility = 'visible';
        });
      }

      const w = window as any;
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = phaseRef.current;
        w.__WORK_STAGE__.portalProgress = portalProgressRef.current;
        w.__WORK_STAGE__.ribbonOffset = ribbonState.current.offset;
        w.__WORK_STAGE__.scrollVelocity = ribbonState.current.velocity;
        w.__WORK_STAGE__.activeProjectIndex = activeIndexRef.current;
        w.__WORK_STAGE__.floorAlpha = activeIndexRef.current === null ? portalProgressRef.current : 0;
        w.__WORK_STAGE__.cumulativeScroll = cumulativeScrollRef.current;
        w.__WORK_STAGE__.isAlreadySoldVisible = showSoldButton;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(rafId);
  }, [showSoldButton]);

  // Exposição de helper determinístico para testes Playwright (Gate 2)
  useEffect(() => {
    const w = window as any;
    w.__TEST_SET_PORTAL_PROGRESS__ = (p: number, cur?: number, tHoldEnd?: number) => {
      const clamped = clamp(p, 0, 1);
      portalProgressRef.current = clamped;
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.portalProgress = clamped;
        w.__WORK_STAGE__.floorAlpha = activeIndexRef.current === null ? clamped : 0;
      }

      if (typeof w.__SYNC_VIEWPORT_CLIP__ === 'function') {
        w.__SYNC_VIEWPORT_CLIP__(clamped, cur, tHoldEnd);
      }

      // Sincronização imperativa do container DOM de proxies (zero re-renders React)
      const showProxies = clamped >= 0.95 && activeIndexRef.current === null;
      if (proxiesRef.current) {
        proxiesRef.current.style.opacity = showProxies ? '1' : '0';
        proxiesRef.current.style.visibility = showProxies ? 'visible' : 'hidden';
        proxiesRef.current.style.pointerEvents = showProxies ? 'auto' : 'none';
      }

      if (
        activeIndexRef.current === null &&
        phaseRef.current !== 'DETAIL_FLIGHT' &&
        phaseRef.current !== 'DETAIL_ACTIVE' &&
        phaseRef.current !== 'DETAIL_CLOSING'
      ) {
        const nextPhase = clamped >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
        if (nextPhase !== phaseRef.current) {
          phaseRef.current = nextPhase;
          if (w.__WORK_STAGE__) {
            w.__WORK_STAGE__.phase = nextPhase;
          }
          setPhase(nextPhase);
        }
      }
    };

    if (w.__WORK_STAGE__ && typeof w.__WORK_STAGE__.portalProgress === 'number') {
      w.__TEST_SET_PORTAL_PROGRESS__(w.__WORK_STAGE__.portalProgress);
    }
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (openTimelineRef.current) openTimelineRef.current.kill();
      if (closeTimelineRef.current) closeTimelineRef.current.kill();
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
      if (closeTimelineRef.current) {
        closeTimelineRef.current.kill();
        closeTimelineRef.current = null;
      }
      if (openTimelineRef.current) {
        openTimelineRef.current.kill();
        openTimelineRef.current = null;
      }

      const w = window as any;
      phaseRef.current = 'DETAIL_FLIGHT';
      activeIndexRef.current = index;
      setPhase('DETAIL_FLIGHT');
      setActiveIndex(index);
      ribbonState.current.velocity = 0;
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = 'DETAIL_FLIGHT';
        w.__WORK_STAGE__.activeProjectIndex = index;
        w.__WORK_STAGE__.scrollVelocity = 0;
      }
      onLockScrollChange?.(true);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('scroll'));

      // Tornar root e painel DOM visíveis imediatamente para início da coreografia
      const root = document.getElementById('work-detail-panel-root');
      if (root) {
        root.setAttribute('aria-hidden', 'false');
        root.style.opacity = '1';
        root.style.pointerEvents = 'auto';
      }
      if (panelRef.current) {
        panelRef.current.setAttribute('aria-hidden', 'false');
        panelRef.current.style.pointerEvents = 'auto';
        gsap.set(panelRef.current, { opacity: 1 });
      }

      // Preparação dos nós de texto para entrada escalonada (Kp)
      if (titleRef.current) gsap.set(titleRef.current, { y: 40, opacity: 0 });
      if (descRef.current) gsap.set(descRef.current, { y: 30, opacity: 0 });
      const others = [closeBtnRef.current, metaRef.current, footerRef.current].filter(Boolean);
      if (others.length) gsap.set(others, { y: 20, opacity: 0 });

      // Coreografia Escalonada Card-to-Sheet (Kp)
      // O mesh WebGL uncurva e sobrevoa de t = 0 a 0.85s (expo.out)
      // Título: t = 0.25s (duração 0.60s, expo.out)
      // Descrição: t = 0.35s (duração 0.50s, expo.out)
      // Tags, pills e botão de fechar: t = 0.50s (duração 0.35s, expo.out)
      // Estabilização: t = 0.85s atualizando para DETAIL_ACTIVE e ativando o tema do header Astro
      const tl = gsap.timeline({
        onComplete: () => {
          updatePhase('DETAIL_ACTIVE');
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
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.60, ease: 'expo.out' }, 0.25);
      }
      if (descRef.current) {
        tl.to(descRef.current, { y: 0, opacity: 1, duration: 0.50, ease: 'expo.out' }, 0.35);
      }
      if (others.length) {
        tl.to(others, { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' }, 0.50);
      }
      openTimelineRef.current = tl;
    },
    [onLockScrollChange, updatePhase]
  );

  const handleCloseProject = useCallback(() => {
    if (activeIndexRef.current === null && phaseRef.current !== 'DETAIL_FLIGHT') return;
    if (openTimelineRef.current) {
      openTimelineRef.current.kill();
      openTimelineRef.current = null;
    }
    if (closeTimelineRef.current) {
      closeTimelineRef.current.kill();
      closeTimelineRef.current = null;
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

    // Restaura imediatamente tema escuro no header Astro
    const header = document.querySelector('header[data-intro-header]') as HTMLElement;
    if (header) {
      header.style.setProperty('--header-bg', '#3A3632');
      header.style.setProperty('--header-text', '#f3eee8');
      header.style.setProperty('--header-border', '#5a524d');
      for (const el of header.querySelectorAll('svg rect')) {
        el.setAttribute('fill', '#f3eee8');
      }
    }

    // Timeline de saída: afunda o texto e esmaece o painel DOM de volta à fita
    const items = [titleRef.current, descRef.current, closeBtnRef.current, metaRef.current, footerRef.current].filter(Boolean);
    const closeTl = gsap.timeline({
      onComplete: () => {
        if (panelRef.current) {
          panelRef.current.style.pointerEvents = 'none';
          panelRef.current.setAttribute('aria-hidden', 'true');
        }
        const root = document.getElementById('work-detail-panel-root');
        if (root) {
          root.setAttribute('aria-hidden', 'true');
          root.style.opacity = '0';
          root.style.pointerEvents = 'none';
        }
        updatePhase('RIBBON_BROWSE');
      },
    });

    if (items.length) {
      closeTl.to(items, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
    }
    if (panelRef.current) {
      closeTl.to(panelRef.current, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, 0.15);
    }
    closeTimelineRef.current = closeTl;
  }, [onLockScrollChange, updatePhase]);

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
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          camera={{
            position: [0, 0, SHEET_CONSTANTS.CAMERA_Z],
            fov: SHEET_CONSTANTS.CAMERA_FOV,
            near: 0.1,
            far: 200,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <React.Suspense fallback={null}>
            <FloorGrid
              uSheetP={activeIndex === null ? 1.0 : 0.0}
            />
            {REFERENCE_PROJECTS.map((proj) => {
              const baseX = (proj.index - 1.5) * RIBBON_STRIDE;
              const isThisOpen = activeIndex === proj.index;
              const isOtherOpen = activeIndex !== null && activeIndex !== proj.index;

              return (
                <RibbonCard
                  key={proj.slug}
                  project={proj}
                  worldX={baseX}
                  worldY={0}
                  planeSize={CARD_PLANE_SIZE}
                  scrollVelocity={0}
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
            ref={proxiesRef}
            data-work-ribbon-proxies=""
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'auto' : 'none',
              zIndex: 130,
              opacity: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 1 : 0,
              visibility: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {REFERENCE_PROJECTS.map((proj) => (
              <button
                key={proj.slug}
                ref={(el) => {
                  proxyBtnRefs.current[proj.index] = el;
                }}
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
                  position: 'absolute',
                  pointerEvents: 'auto',
                  visibility: 'visible',
                  width: '28vw',
                  height: '52vh',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    pointerEvents: 'none',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  0{proj.index + 1} / {proj.year}
                </span>
                <span
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    pointerEvents: 'none',
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

      {/* Cinematic HUD: Fixed Microcopy & Voluntary Exit Button */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            data-work-cinematic-hud=""
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 135,
              opacity: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 1 : 0,
              visibility: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'visible' : 'hidden',
              transition: 'opacity 0.4s ease-out',
            }}
          >
            {/* Bottom-left microcopy: "CAPÍTULO II — FIQUE O TEMPO QUE QUISER" */}
            <div
              data-testid="hud-microcopy-left"
              data-hud-microcopy=""
              style={{
                position: 'fixed',
                bottom: '2.5rem',
                left: '5.5rem',
                color: '#FAF9F6',
                opacity: 0.5,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              CAPÍTULO II — FIQUE O TEMPO QUE QUISER
            </div>

            {/* Bottom-right pill button: "EU JÁ ESTOU CONVENCIDO" */}
            <div
              style={{
                position: 'fixed',
                bottom: '2.5rem',
                right: '3.5rem',
                transform: showSoldButton ? 'translateY(0)' : 'translateY(20px)',
                opacity: showSoldButton ? 1 : 0,
                pointerEvents: showSoldButton ? 'auto' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
              }}
            >
              <button
                type="button"
                data-testid="hud-sold-btn"
                data-hud-sold=""
                onClick={handleExitToChapter3}
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(250, 249, 246, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#FAF9F6',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid rgba(250, 249, 246, 0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(250, 249, 246, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(250, 249, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(250, 249, 246, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(250, 249, 246, 0.28)';
                }}
              >
                <span>EU JÁ ESTOU CONVENCIDO</span>
                <span aria-hidden="true" style={{ fontSize: '0.9rem', lineHeight: 1 }}>→</span>
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Visão Detalhada permanente no DOM e portada para work-detail-panel-root */}
      {typeof document !== 'undefined' &&
        (document.getElementById('work-detail-panel-root') || document.body) &&
        createPortal(
          <div
            ref={panelRef}
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
              <p
                ref={metaRef}
                style={{ textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}
              >
                Chapter II — {displayProject.category} ({displayProject.year})
              </p>
              <button
                ref={closeBtnRef}
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
                ref={titleRef}
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
              <p
                ref={descRef}
                data-detail-description=""
                style={{ marginTop: '1.5rem', fontSize: '1.25rem', lineHeight: 1.4 }}
              >
                {displayProject.description}
              </p>
            </div>

            <footer
              ref={footerRef}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
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
