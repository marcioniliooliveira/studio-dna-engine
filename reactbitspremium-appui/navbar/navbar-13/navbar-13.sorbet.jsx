/**
 * React Bits Pro — Application UI (navbar-13 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let r6 = (...e)=>e.filter(Boolean).join(" ");

let r8 = [.2,0,0,1];

let r4 = "bg-white dark:bg-neutral-950";

let r9 = "rounded-[var(--rb-r-4xl,18px)]";

let r3 = "text-neutral-900 dark:text-neutral-100";

let r7 = "text-neutral-900/62 dark:text-neutral-100/62";

let te = "text-[17px]/[22px] font-extrabold";

let ta = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let tr = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let tt = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let tn = "cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10";

let tl = "shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let ti = ["Work","Studio","Journal"];

let to = ["Services","Careers","Contact"];

let ts = [{label:"Work",note:"24 selected projects"},{label:"Studio",note:"How we operate"},{label:"Journal",note:"Notes and process"},{label:"Services",note:"Brand, product, motion"},{label:"Careers",note:"Three open roles"},{label:"Contact",note:"Start a project"}];

let tc = [{name:"Harbor Coffee",kind:"Brand identity",year:"2024"},{name:"Meridian",kind:"Product design",year:"2024"},{name:"Cedar Labs",kind:"Site and motion",year:"2023"},{name:"Northwind",kind:"Design system",year:"2023"}];


export default function navbar_13__Sorbet__Component(){
  let e=useReducedMotion(),[a,r]=useState(false),[c,d]=useState("Work"),_=useRef(null);
  useEffect(()=>{
    if(!a)return;
    let e=_.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      "Escape"===e.key&&r(false)
    };
    return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t);
  }, [a]);
  let b=e=>(
    <button key={e} type="button" aria-current={e===c?"page":undefined} onClick={()=>d(e)} className={r6("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
        {e===c&&<span aria-hidden="true" className={r6("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","absolute inset-0 rounded-[inherit]")} />}
        <span className={r6("relative",e===c&&r3)}>{e}</span>
      </button>
  );
  return (
    <div ref={_} className={r6(r4,r3,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className={r6("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","relative z-20 grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:px-5")}>
          <nav aria-label="Primary left" className="hidden items-center gap-1 md:flex">{ti.map(e=>b(e))}</nav>
          <button type="button" aria-label="Open menu" aria-expanded={a} onClick={()=>r(true)} className={r6(tr,tt,"justify-self-start md:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
          <a href="#" className={r6(te,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","justify-self-center px-2")}>Alder</a>
          <div className="flex items-center justify-end gap-1">
            <nav aria-label="Primary right" className="hidden items-center gap-1 md:flex">{to.map(e=>b(e))}</nav>
            <button type="button" aria-label="Open menu" aria-expanded={a} onClick={()=>r(true)} className={r6(tr,tt,"max-md:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[760px] px-5 py-10">
            <p className={r6("text-[13px]/[16px] font-semibold tabular-nums",r7)}>{c}</p>
            <h1 className={r6("text-[34px]/[40px] font-extrabold tracking-[-0.02em]","mt-2 max-w-[18ch]")}>A studio for careful, long-lived work.</h1>
            <ul className={r6("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-8 py-1")}>
              {tc.map(e=>(
                <li key={e.name} className="px-2 py-1">
                            <a href="#" className={r6("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",tn,r9,ta,"group px-2")}>
                              <span className={r6("text-[15px]/[22px] font-medium","min-w-0 flex-1 truncate")}>{e.name}</span>
                              <span className={r6("text-[14px]/[20px] font-medium",r7,"hidden shrink-0 sm:inline")}>{e.kind}</span>
                              <span className={tl}>{e.year}</span>
                              <HugeiconsIcon icon={Icon_1497} size={18} strokeWidth={2} aria-hidden="true" className={r6("flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[180ms]",r7,"shrink-0")} />
                            </a>
                          </li>
              ))}
            </ul>
          </div>
        </div>
        <AnimatePresence>
          {a&&<motion.div role="dialog" aria-modal="true" aria-label="Site menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:r8}}} transition={{duration:.18*!e,ease:r8}} className={r6(r4,"absolute inset-0 z-40 flex flex-col")}>
            <div className="flex h-16 shrink-0 items-center justify-between px-3 sm:px-5">
              <span className={r6(te,"px-2")}>Alder</span>
              <button type="button" aria-label="Close menu" onClick={()=>{
                r(false)
              }} className={r6(tr,tt)}>
                <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Site" className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 sm:px-5">
              {ts.map(e=>(
                <button key={e.label} type="button" onClick={()=>{
                            d(e.label),r(false)
                          }} className={r6("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",tn,r9,ta,"group px-3")}>
                            <span className={r6("text-[26px]/[32px] font-extrabold tracking-[-0.015em]","min-w-0 flex-1 truncate")}>{e.label}</span>
                            <span className={r6(tl,"hidden sm:inline")}>{e.note}</span>
                          </button>
              ))}
            </nav>
          </motion.div>}
        </AnimatePresence>
      </div>
  );
}
