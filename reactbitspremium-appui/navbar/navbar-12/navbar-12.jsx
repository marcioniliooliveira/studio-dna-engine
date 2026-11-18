/**
 * React Bits Pro — Application UI (navbar-12)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_71344 = [["path",{d:"M10.5279 7.13967C11.3077 5.71322 11.6977 5 11.9958 5C12.294 5 12.6839 5.71322 13.4638 7.13967C14.2665 8.60787 15.3392 9.69316 16.8489 10.52C18.2778 11.3026 18.9922 11.6938 18.9922 11.9923C18.9922 12.2908 18.2773 12.6825 16.8475 13.4658C15.3808 14.2693 14.2966 15.3432 13.4706 16.8545C12.6889 18.2848 12.298 19 11.9998 19C11.7017 19 11.3104 18.2844 10.5279 16.853C9.7252 15.3848 8.65247 14.2995 7.14272 13.4727C5.70903 12.6875 4.99219 12.2949 4.99219 11.9964C4.99219 11.6978 5.70903 11.3052 7.14272 10.52C8.65247 9.69316 9.7252 8.60787 10.5279 7.13967Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  h = {type:"spring",bounce:0,duration:.35},
  p = [.2,0,0,1],
  m = "text-neutral-900 dark:text-neutral-100",
  _ = "text-[14px]/[16px] font-[450]",
  v = "shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  g = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "size-8 rounded-[var(--rb-r-sm,6px)]",
  j = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  y = ["Product","Customers","Pricing","Docs"],
  N = [{id:"Product",heading:"One workspace for the whole release",body:"Plan, review and ship from a single timeline. Every change carries its own context, so nobody has to reconstruct the story later."},{id:"Customers",heading:"Teams that ship weekly",body:"Harbor Coffee, Cedar Labs and Northwind run their release process here. Median cycle time dropped by a third in the first quarter."},{id:"Pricing",heading:"Priced per released change",body:"No seat minimums and no upgrade gate on collaborators. You pay for what actually reaches production."},{id:"Docs",heading:"Start in under five minutes",body:"Install the CLI, point it at a repository, and the first release timeline builds itself from your existing history."}];

function z(){
  let e=useReducedMotion(),t=useId(),[r,z]=useState("Product"),[A,S]=useState(false),[C,W]=useState(false),E=useRef(null),P=useRef(null);
  useEffect(()=>{
    let e=P.current;
    if(!e)return;
    let t=()=>S(e.scrollTop>8);
    return e.addEventListener("scroll",t,{passive:true}),()=>e.removeEventListener("scroll",t);
  }, []),useEffect(()=>{
    if(!C)return;
    let e=E.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      "Escape"===e.key&&W(false)
    };
    return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t);
  }, [C]);
  let L=N.find(e=>e.id===r)??N[0];
  return (
    <div ref={E} className={b("bg-white dark:bg-neutral-950",m,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
          <header className={b(j,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",A&&v,"pointer-events-auto w-full max-w-[680px] p-1.5")}>
            <div className="flex min-w-0 items-center gap-2">
              <a href="#" className={b("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","inline-flex shrink-0 items-center gap-2 pr-1 pl-1.5")}>
                <span aria-hidden="true" className={b("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-7")}><HugeiconsIcon icon={Icon_71344} size={14} strokeWidth={1.8} /></span>
                <span className={_}>Halcyon</span>
              </a>
              <nav aria-label="Primary" className="mx-auto hidden items-center gap-0.5 sm:flex">
                {y.map(n=>(
                  <button key={n} type="button" aria-current={n===r?"page":undefined} onClick={()=>z(n)} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",g)}>
                                {n===r&&<motion.span aria-hidden="true" layoutId={`${t}-nav`} transition={e?{duration:0}:h} className={b("bg-neutral-900/9 dark:bg-neutral-100/9","absolute inset-0 rounded-[inherit]")} />}
                                <span className={b("relative",n===r&&m)}>{n}</span>
                              </button>
                ))}
              </nav>
              <button type="button" className={b(k,g,"ml-auto max-sm:hidden")}>
                Get started
                <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Open menu" aria-expanded={C} onClick={()=>W(true)} className={b(f,w,"ml-auto sm:hidden")}>
                <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </header>
        </div>
        <div ref={P} className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[680px] px-5 pt-24 pb-10">
            <p className={b("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/66 dark:text-neutral-100/66")}>{L.id}</p>
            <h1 className={b("text-[32px]/[36px] font-[450] tracking-[-0.015em]","mt-2")}>{L.heading}</h1>
            <p className={b("text-[14px]/[20px] font-normal","text-neutral-900/80 dark:text-neutral-100/80","mt-3 max-w-[52ch]")}>{L.body}</p>
            <div className="mt-6 space-y-3">
              {[0,1,2,3].map(e=><div key={e} className={b("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8","h-[110px]")} />)}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {C&&<>
            <motion.div aria-hidden="true" onClick={()=>W(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:p}}} transition={{duration:.18*!e,ease:p}} className={b("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 sm:hidden")} />
            <motion.div initial={{opacity:0,y:e?0:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:e?0:-8,transition:{duration:.12,ease:p}}} transition={{duration:.18*!e,ease:p}} className="absolute inset-x-3 top-3 z-40 origin-top sm:hidden">
              <div className={b(j,v,"p-2")}>
                <div className="flex min-h-8 items-center justify-between pl-1.5">
                  <span className={_}>Halcyon</span>
                  <button type="button" aria-label="Close menu" onClick={()=>{
                    W(false)
                  }} className={b(f,w)}>
                    <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <nav aria-label="Primary" className="mt-1">
                  {y.map(e=>(
                    <button key={e} type="button" onClick={()=>{
                                    z(e),W(false)
                                  }} className="flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100">{e}</button>
                  ))}
                </nav>
                <button type="button" className={b(k,"h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]","mt-1 w-full")}>
                  Get started
                  <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>}
        </AnimatePresence>
      </div>
  );
}


export default z;
