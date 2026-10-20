'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export interface ChatOrbProps {
  position?: 'bottom-right' | 'bottom-left' | 'inline';
  teaser?: string;
  teaserDelay?: number;
  defaultOpen?: boolean;
  chat?: {
    title?: string;
    subtitle?: string;
    script?: Array<{ role: 'user' | 'assistant'; text: string; steps?: string[] }>;
  };
  panelClassName?: string;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

const MORPH_SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 34,
  mass: 0.8
};

// Sub-component: The living Orb Face with pupils and eyelid blink
export function OrbFace({
  size = 64,
  isBlinking = false,
  lookX,
  lookY,
  className = ''
}: {
  size?: number;
  isBlinking?: boolean;
  lookX?: any;
  lookY?: any;
  className?: string;
}) {
  const pupilStyle = {
    width: 0.17 * size,
    height: 0.17 * size,
    borderRadius: size
  };

  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 rounded-full select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 38% 32%, #ffffff 0%, #f4f4f5 28%, #d4d4d8 62%, #a1a1aa 100%)',
        boxShadow: `inset ${-(0.06 * size)}px ${-(0.08 * size)}px ${0.18 * size}px rgba(0,0,0,0.18), inset ${0.03 * size}px ${0.04 * size}px ${0.1 * size}px rgba(255,255,255,0.9)`
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: lookX, y: lookY }}
      >
        {[0.27, 0.56].map((offsetFactor) => (
          <motion.span
            key={offsetFactor}
            className="absolute block bg-zinc-950"
            style={{
              ...pupilStyle,
              left: size * offsetFactor,
              top: 0.36 * size
            }}
            animate={{ scaleY: isBlinking ? 0.08 : 1 }}
            transition={{
              duration: isBlinking ? 0.08 : 0.14,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function ChatOrb({
  position = 'bottom-right',
  teaser = 'Hi there! Need a hand?',
  teaserDelay = 1400,
  defaultOpen = false,
  chat,
  panelClassName = '',
  className = '',
  onOpenChange
}: ChatOrbProps) {
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [hasTeaser, setHasTeaser] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(defaultOpen);
  const [isBlinking, setIsBlinking] = useState(false);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; steps?: string[] }>>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const orbRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const instanceId = useId();

  // Natural randomized blink loop
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const triggerBlink = (done?: () => void) => {
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => {
        setIsBlinking(false);
        done?.();
      }, 110);
    };

    const scheduleNext = (delay = 2200 + Math.random() * 2600) => {
      blinkTimeout = setTimeout(() => {
        triggerBlink(() => {
          if (Math.random() < 0.22) {
            blinkTimeout = setTimeout(() => triggerBlink(() => scheduleNext()), 170);
          } else {
            scheduleNext();
          }
        });
      }, delay);
    };

    scheduleNext(700);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Eye cursor tracking with smooth spring
  const mouseMotionX = useMotionValue(0);
  const mouseMotionY = useMotionValue(0);
  const springX = useSpring(mouseMotionX, { stiffness: 380, damping: 34, mass: 0.8 });
  const springY = useSpring(mouseMotionY, { stiffness: 380, damping: 34, mass: 0.8 });
  const eyeX = useTransform(springX, (val) => val * (isOpen ? 4 : 8));
  const eyeY = useTransform(springY, (val) => val * (isOpen ? 4 : 8));

  useEffect(() => {
    if (isOpen || prefersReduced) {
      mouseMotionX.set(0);
      mouseMotionY.set(0);
      return;
    }

    let centerX = 0;
    let centerY = 0;
    const updateCenter = () => {
      const rect = orbRef.current?.getBoundingClientRect();
      if (rect) {
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }
    };
    updateCenter();

    const handlePointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > 340) {
        mouseMotionX.set(0);
        mouseMotionY.set(0);
        return;
      }

      const intensity = Math.min(1, distance / 80);
      mouseMotionX.set((dx / distance || 0) * intensity);
      mouseMotionY.set((dy / distance || 0) * intensity);
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('resize', updateCenter, { passive: true });
    window.addEventListener('scroll', updateCenter, { passive: true, capture: true });

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('scroll', updateCenter, { capture: true });
    };
  }, [isOpen, prefersReduced, mouseMotionX, mouseMotionY]);

  // Teaser entrance
  useEffect(() => {
    if (!teaser || hasInteracted) return;
    const t = setTimeout(() => setHasTeaser(true), teaserDelay);
    return () => clearTimeout(t);
  }, [teaser, teaserDelay, hasInteracted]);

  // Escape key dismiss
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleOpen = () => {
    setHasInteracted(true);
    setHasTeaser(false);
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    setInputText('');

    const newMsgs = [...messages, { role: 'user' as const, text }];
    setMessages(newMsgs);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          text: 'Update the UI immediately and send the request in the background. That is an optimistic update: you assume success, render the new state right away, and only reconcile once the server responds.',
          steps: [
            'Analyze incoming prompt and state requirements',
            'Compare optimistic updates vs server roundtrips',
            'Determine rollback criteria upon network failure'
          ]
        }
      ]);
    }, 900);
  };

  const isLeft = position === 'bottom-left';
  const isInline = position === 'inline';

  return (
    <div
      className={`flex ${
        !isInline ? 'z-50' : 'relative h-full w-full items-center justify-center pointer-events-none'
      } ${position === 'bottom-right' ? 'fixed bottom-5 right-5' : ''} ${
        position === 'bottom-left' ? 'fixed bottom-5 left-5' : ''
      } ${className}`}
    >
      <motion.div
        initial={!prefersReduced && { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className={`pointer-events-auto relative flex flex-col-reverse ${
          isLeft ? 'items-start' : 'items-end'
        }`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isOpen ? (
            <div
              key="panel"
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-label={chat?.title ?? 'Assistant'}
              className={`relative h-[560px] outline-none max-h-[90svh] w-[380px] max-w-[90vw] ${
                isInline ? 'max-h-full' : ''
              } ${panelClassName}`}
            >
              {/* Morphing Shell Background */}
              <motion.div
                layoutId={`${instanceId}-shell`}
                transition={MORPH_SPRING}
                style={{ borderRadius: 28 }}
                className="absolute inset-0 border border-zinc-200 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950"
              />

              {/* Chat Dialog Contents */}
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={
                  prefersReduced
                    ? { duration: 0.15 }
                    : { ...MORPH_SPRING, opacity: { duration: 0.18, delay: 0.12, ease: [0.22, 1, 0.36, 1] } }
                }
                style={{ borderRadius: 28 }}
                className="relative flex h-full flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 dark:border-zinc-800/70 px-5 py-4 shrink-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div layoutId={`${instanceId}-face`} transition={MORPH_SPRING}>
                      <OrbFace size={36} isBlinking={isBlinking} lookX={eyeX} lookY={eyeY} />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {chat?.title ?? 'Assistant'}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {chat?.subtitle ?? 'Typically replies instantly'}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      aria-label="New chat"
                      onClick={() => setMessages([])}
                      className="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Close chat"
                      onClick={handleClose}
                      className="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages Log */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-left">
                  {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center px-4 py-8 text-center text-zinc-500">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-3 text-zinc-800 dark:text-zinc-200 shadow-sm">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 3h2M16 19h-2M2 12v-2M2 16v5.3a.7.7 0 0 0 1.2.5l1.1-1.1M20 19a2 2 0 0 0 2-2v-1M22 10v2M22 6V5a2 2 0 0 0-2-2M4 3a2 2 0 0 0-2 2v1M8 19h2M8 3h2" />
                        </svg>
                      </span>
                      <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Let's build something.</h4>
                      <p className="mt-1 text-xs text-zinc-400">Send a message to start the conversation.</p>
                    </div>
                  ) : (
                    messages.map((m, idx) => (
                      <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'user' ? (
                          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50">
                            {m.text}
                          </p>
                        ) : (
                          <div className="space-y-2 max-w-[90%]">
                            {m.steps && (
                              <div className="text-xs text-zinc-400 space-y-1 bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                                <span className="font-medium text-zinc-500 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 18V5M15 13a4 4 0 0 1-3-4 4 4 0 0 1-3 4" />
                                  </svg>
                                  Reasoning Trace
                                </span>
                                {m.steps.map((st, sIdx) => (
                                  <p key={sIdx} className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                                    • {st}
                                  </p>
                                ))}
                              </div>
                            )}
                            <p className="text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
                              {m.text}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {isThinking && (
                    <div className="flex items-center gap-2 text-xs text-zinc-400 italic">
                      <span className="size-2 rounded-full bg-indigo-500 animate-ping" />
                      Thinking...
                    </div>
                  )}
                </div>

                {/* Prompt Composer */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white/95 dark:bg-zinc-950/95 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="relative rounded-[19px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-600 transition">
                    <textarea
                      rows={2}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Message the assistant..."
                      className="block w-full resize-none bg-transparent px-4 pb-2 pt-3 text-sm leading-5 text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400"
                    />
                    <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <button type="button" aria-label="Attach file" className="p-1 hover:text-zinc-200 transition">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m16 6-8.4 8.6a2 2 0 0 0 2.8 2.8l8.4-8.6a4 4 0 1 0-5.6-5.6l-8.4 8.5a6 6 0 1 0 8.5 8.5l8.4-8.5" />
                          </svg>
                        </button>
                        <span className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-500 dark:text-zinc-400">
                          Claude Opus 4.8
                        </span>
                      </div>
                      <button
                        type="submit"
                        aria-label="Send message"
                        className="inline-flex size-7 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 transition active:scale-95 hover:opacity-90"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="m5 12 7-7 7 7M12 19V5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          ) : (
            <motion.button
              key="button"
              ref={orbRef}
              type="button"
              aria-label="Open chat"
              aria-haspopup="dialog"
              aria-expanded={false}
              onClick={handleOpen}
              whileHover={prefersReduced ? undefined : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex size-16 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
            >
              {/* Outer Shell Morph */}
              <motion.div
                layoutId={`${instanceId}-shell`}
                transition={MORPH_SPRING}
                style={{ borderRadius: 999 }}
                className="absolute inset-[2px] border border-zinc-200 bg-white shadow-[0_14px_34px_-12px_rgba(0,0,0,0.5)] dark:border-zinc-800 dark:bg-zinc-950"
              />

              {/* Orb Face */}
              <motion.div layoutId={`${instanceId}-face`} transition={MORPH_SPRING} className="relative">
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, -2, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <OrbFace size={64} isBlinking={isBlinking} lookX={eyeX} lookY={eyeY} />
                </motion.div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Teaser Bubble */}
        <AnimatePresence>
          {hasTeaser && !isOpen && (
            <motion.button
              key="teaser"
              type="button"
              onClick={handleOpen}
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(6px) scale(0.96)' }
              }
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              exit={{ opacity: 0, transform: 'translateY(4px) scale(0.98)', transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className={`absolute bottom-full z-10 -mb-2 w-max max-w-[220px] rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-left text-sm leading-5 text-zinc-900 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                isLeft ? '-ml-3 left-full rounded-bl-md' : '-mr-3 right-full rounded-br-md'
              }`}
            >
              {teaser}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ChatOrb;
