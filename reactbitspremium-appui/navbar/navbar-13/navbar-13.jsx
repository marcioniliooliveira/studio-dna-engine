/**
 * React Bits Pro — Application UI (navbar-13)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = [.2,0,0,1],
  h = "bg-white dark:bg-neutral-950",
  p = "rounded-[var(--rb-r-sm,6px)]",
  m = "text-neutral-900 dark:text-neutral-100",
  _ = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  k = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  g = "size-8 rounded-[var(--rb-r-sm,6px)]",
  w = "cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",
  j = "shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  y = ["Work","Studio","Journal"],
  N = ["Services","Careers","Contact"],
  z = [{label:"Work",note:"24 selected projects"},{label:"Studio",note:"How we operate"},{label:"Journal",note:"Notes and process"},{label:"Services",note:"Brand, product, motion"},{label:"Careers",note:"Three open roles"},{label:"Contact",note:"Start a project"}],
  A = [{name:"Harbor Coffee",kind:"Brand identity",year:"2024"},{name:"Meridian",kind:"Product design",year:"2024"},{name:"Cedar Labs",kind:"Site and motion",year:"2023"},{name:"Northwind",kind:"Design system",year:"2023"}];

function S(){
  let e=useReducedMotion(),[t,r]=useState(false),[S,C]=useState("Work"),W=useRef(null);
  useEffect(()=>{
    if(!t)return;
    let e=W.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      "Escape"===e.key&&r(false)
    };
    return e.addEventListener("keydown",a),()=>e.removeEventListener("keydown",a);
  }, [t]);
  let E=e=>(
    <button key={e} type="button" aria-current={e===S?"page":undefined} onClick={()=>C(e)} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
        {e===S&&<span aria-hidden="true" className={x("bg-neutral-900/9 dark:bg-neutral-100/9","absolute inset-0 rounded-[inherit]")} />}
        <span className={x("relative",e===S&&m)}>{e}</span>
      </button>
  );
  return (
    <div ref={W} className={x(h,m,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className={x("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:px-5")}>
          <nav aria-label="Primary left" className="hidden items-center gap-1 md:flex">{y.map(e=>E(e))}</nav>
          <button type="button" aria-label="Open menu" aria-expanded={t} onClick={()=>r(true)} className={x(f,g,"justify-self-start md:hidden")}>
            <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <a href="#" className={x(v,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","justify-self-center px-2")}>Alder</a>
          <div className="flex items-center justify-end gap-1">
            <nav aria-label="Primary right" className="hidden items-center gap-1 md:flex">{N.map(e=>E(e))}</nav>
            <button type="button" aria-label="Open menu" aria-expanded={t} onClick={()=>r(true)} className={x(f,g,"max-md:hidden")}>
              <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[760px] px-5 py-10">
            <p className={x("text-[12px]/[16px] font-normal tabular-nums",_)}>{S}</p>
            <h1 className={x("text-[32px]/[36px] font-[450] tracking-[-0.015em]","mt-2 max-w-[18ch]")}>A studio for careful, long-lived work.</h1>
            <ul className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-8 py-1")}>
              {A.map(e=>(
                <li key={e.name} className="px-2 py-1">
                            <a href="#" className={x("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]",w,p,k,"group px-2")}>
                              <span className={x("text-[14px]/[20px] font-normal","min-w-0 flex-1 truncate")}>{e.name}</span>
                              <span className={x("text-[13px]/[18px] font-normal",_,"hidden shrink-0 sm:inline")}>{e.kind}</span>
                              <span className={j}>{e.year}</span>
                              <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" className={x("flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]",_,"shrink-0")} />
                            </a>
                          </li>
              ))}
            </ul>
          </div>
        </div>
        <AnimatePresence>
          {t&&<motion.div role="dialog" aria-modal="true" aria-label="Site menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:b}}} transition={{duration:.18*!e,ease:b}} className={x(h,"absolute inset-0 z-40 flex flex-col")}>
            <div className="flex h-16 shrink-0 items-center justify-between px-3 sm:px-5">
              <span className={x(v,"px-2")}>Alder</span>
              <button type="button" aria-label="Close menu" onClick={()=>{
                r(false)
              }} className={x(f,g)}>
                <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Site" className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 sm:px-5">
              {z.map(e=>(
                <button key={e.label} type="button" onClick={()=>{
                            C(e.label),r(false)
                          }} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",w,p,k,"group px-3")}>
                            <span className={x("text-[24px]/[28px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>{e.label}</span>
                            <span className={x(j,"hidden sm:inline")}>{e.note}</span>
                          </button>
              ))}
            </nav>
          </motion.div>}
        </AnimatePresence>
      </div>
  );
}


export default S;
