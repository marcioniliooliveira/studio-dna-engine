/**
 * React Bits Pro — Application UI (navbar-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_96022 = [["path",{d:"M7.99978 3.5H6.60021C4.43183 3.5 3.34764 3.5 2.67399 4.17362C2.00034 4.84724 2.00029 5.93144 2.00021 8.09982L2 13.3998C1.99992 15.5684 1.99987 16.6526 2.67353 17.3263C3.34719 18 4.43146 18 6.6 18H8.95042C10.4329 18 11.7092 19.0464 11.9999 20.5V5.5C11.0556 4.24097 9.99989 3.5 7.99978 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.0001 3.5H17.3997C19.5681 3.5 20.6523 3.5 21.3259 4.17362C21.9996 4.84724 21.9996 5.93144 21.9997 8.09982L21.9999 13.3998C22 15.5684 22 16.6526 21.3264 17.3263C20.6527 18 19.5684 18 17.3999 18H15.0495C13.567 18 12.2907 19.0464 12 20.5V5.5C12.9443 4.24097 14 3.5 16.0001 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48419 = [["path",{d:"M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_80469 = [["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_3367 = [["path",{d:"M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  f = [.2,0,0,1],
  g = "text-neutral-900 dark:text-neutral-100",
  w = "text-neutral-900/66 dark:text-neutral-100/66",
  j = "text-[14px]/[16px] font-[450]",
  y = "text-[13px]/[18px] font-normal",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  A = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  S = "size-8 rounded-[var(--rb-r-sm,6px)]",
  C = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  W = k(y,w),
  E = ["v4.2 (latest)","v4.1","v3.8 (LTS)","Canary"],
  P = ["Docs","Reference","Guides","Changelog"],
  L = [{title:"Getting started",items:["Installation","Project structure","First request"]},{title:"Core concepts",items:["Routing","Data loading","Caching","Streaming"]},{title:"Deployment",items:["Runtimes","Edge regions","Observability"]}];

function R(){
  let e=useReducedMotion(),[t,r]=useState(null),[R,D]=useState(E[0]),[M,B]=useState(true),[O,H]=useState("Docs"),[I,T]=useState(false),[F,q]=useState("Core concepts"),G=useRef(null);
  return useEffect(()=>{
    if(!t&&!I)return;
    let e=G.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||r(null)
    },n=e=>{
      "Escape"===e.key&&(r(null),T(false))
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",n),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",n)
    };
  }, [t,I]),<div ref={G} className={k("bg-white dark:bg-neutral-950",g,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
    <header className={k("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 shrink-0")}>
      <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
        <button type="button" aria-label="Open navigation" aria-expanded={I} onClick={()=>T(true)} className={k(z,S,"lg:hidden")}>
          <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <a href="#" className={k("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","inline-flex shrink-0 items-center gap-2")}>
          <span aria-hidden="true" className={k("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-7")}><HugeiconsIcon icon={Icon_96022} size={14} strokeWidth={1.8} /></span>
          <span className={k(j,"hidden sm:block")}>Meridian</span>
        </a>
        <div className="relative shrink-0" data-menu-root>
          <button type="button" aria-haspopup="menu" aria-expanded={"version"===t} onClick={()=>{
            r(e=>"version"===e?null:"version")
          }} className={k(N,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
            {R.split(" ")[0]}
            <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <AnimatePresence>
            {"version"===t&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:f}},transition:{duration:.16*!e,ease:f}}} role="menu" className={k("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-full left-0 z-30 mt-1.5 w-[170px] min-w-[170px] origin-top-left")}>
              {E.map(e=>(
                <button key={e} type="button" role="menuitemradio" aria-checked={e===R} onClick={()=>{
                                D(e),r(null)
                              }} className={k("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","ps-8")}>
                                {e===R&&<span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
                                  <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                </span>}
                                <span className="min-w-0 flex-1 truncate">{e}</span>
                              </button>
              ))}
            </motion.div>}
          </AnimatePresence>
        </div>
        <nav aria-label="Documentation" className="ml-2 hidden items-center gap-0.5 md:flex">
          {P.map(e=>(
            <button key={e} type="button" aria-current={e===O?"page":undefined} onClick={()=>H(e)} className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",A)}>
                        {e===O&&<span aria-hidden="true" className={k("bg-neutral-900/9 dark:bg-neutral-100/9","absolute inset-0 rounded-[inherit]")} />}
                        <span className={k("relative",e===O&&g)}>{e}</span>
                      </button>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button type="button" className={k(N,A,"w-[190px] max-sm:hidden")}>
            <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className={w} />
            <span className={k("text-neutral-900/66 dark:text-neutral-100/66","min-w-0 flex-1 text-left")}>Search docs</span>
            <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">/</kbd>
          </button>
          <button type="button" aria-label="Search docs" className={k(z,S,"sm:hidden")}>
            <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button type="button" aria-label={M?"Switch to light theme":"Switch to dark theme"} aria-pressed={M} onClick={()=>B(e=>!e)} className={k(z,S)}>
            <HugeiconsIcon icon={M?Icon_48419:Icon_80469} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <a href="#" aria-label="Source repository" className={k(z,S)}>
            <HugeiconsIcon icon={Icon_3367} size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-[880px] gap-8 px-4 py-5 sm:px-6">
        <nav aria-label="Section" className="hidden w-[190px] shrink-0 lg:block">
          {L.map(e=>(
            <div key={e.title} className="mb-4">
                        <p className="px-2 pt-4 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.title}</p>
                        <ul className="mt-1.5 space-y-0.5">{e.items.map(e=><li key={e}><a href="#" className={C}>{e}</a></li>)}</ul>
                      </div>
          ))}
        </nav>
        <article className="min-w-0 flex-1">
          <p className={k(W,"flex flex-wrap gap-x-3")}>
            <span>{O}</span>
            <span>{R}</span>
          </p>
          <h1 className={k("text-[24px]/[28px] font-[450] tracking-[-0.015em]","mt-1")}>Data loading</h1>
          <p className={k(y,"text-neutral-900/80 dark:text-neutral-100/80","mt-2 max-w-[54ch]")}>
            Loaders run on the server before a route renders. They can stream partial results, revalidate on a schedule, and share a cache with every nested segment on the same request.
          </p>
          <div className={k("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4 py-1")}>
            {["Reading from a loader","Revalidation","Streaming"].map(e=>(
              <div key={e} className="px-2 py-1">
                            <a href="#" className={k("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",y,"justify-between px-2")}>
                              {e}
                              <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className={k(w,"shrink-0")} />
                            </a>
                          </div>
            ))}
          </div>
        </article>
      </div>
    </div>
    <AnimatePresence>
      {I&&<>
        <motion.div aria-hidden="true" onClick={()=>T(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:f}}} transition={{duration:.18*!e,ease:f}} className={k("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 lg:hidden")} />
        <motion.aside aria-label="Documentation navigation" initial={{opacity:0,x:e?0:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:e?0:-8,transition:{duration:.12,ease:f}}} transition={{duration:.18*!e,ease:f}} className={k("border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","absolute inset-y-0 left-0 z-40 flex w-[280px] max-w-[85%] flex-col lg:hidden")}>
          <div className={k("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between px-3")}>
            <span className={j}>{O}</span>
            <button type="button" aria-label="Close navigation" onClick={()=>{
              T(false)
            }} className={k(z,S)}>
              <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            <div className="mb-2 flex flex-wrap gap-1">
              {P.map(e=><button key={e} type="button" aria-pressed={e===O} onClick={()=>H(e)} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">{e}</button>)}
            </div>
            {L.map(e=>(
              <div key={e.title}>
                            <button type="button" aria-expanded={F===e.title} onClick={()=>q(t=>t===e.title?null:e.title)} className={k(C,"justify-between")}>
                              {e.title}
                              <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={1.8} aria-hidden="true" className={k(F===e.title&&"rotate-180")} />
                            </button>
                            {F===e.title&&<ul className="mb-1 space-y-0.5 overflow-hidden pl-2.5">{e.items.map(e=><li key={e}><a href="#" className={C}>{e}</a></li>)}</ul>}
                          </div>
            ))}
          </div>
        </motion.aside>
      </>}
    </AnimatePresence>
  </div>;
}


export default R;
