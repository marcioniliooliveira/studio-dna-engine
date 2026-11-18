/**
 * React Bits Pro — Application UI (navbar-14)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { offsetTop, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48240 = [["path",{d:"M8 5.5L20 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L20 12.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 19.5L20 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_2139 = [["path",{d:"M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 7H20",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  m = [.2,0,0,1],
  _ = "text-neutral-900/80 dark:text-neutral-100/80",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  k = "size-8 rounded-[var(--rb-r-sm,6px)]",
  f = [{id:"budgets",title:"Error budgets are a scheduling tool",body:"A budget only changes behaviour if it is allowed to run out. When it does, the team stops shipping features and spends the week on reliability instead. That trade has to be agreed before the incident, not during it."},{id:"windows",title:"Pick the window before the target",body:"A thirty-day rolling window forgives a bad Tuesday by the end of the month. A calendar quarter does not. Choose the window that matches how the team plans, then set a target you are willing to defend in a review."},{id:"alerts",title:"Alert on burn rate, not on breach",body:"By the time the objective is breached the conversation is already about blame. Multi-window burn-rate alerts fire while there is still budget left to spend, which keeps the response technical."},{id:"review",title:"Review the objective, not just the misses",body:"If an objective has never been close to breaching in a year, it is measuring something nobody depends on. Retire it and write one that would actually change a decision."}];

function g(){
  let e=useReducedMotion(),[t,r]=useState(0),[g,w]=useState(f[0].id),[j,y]=useState(false),[N,z]=useState(false),[A,S]=useState(false),C=useRef(null),W=useRef(null);
  return useEffect(()=>{
    let e=W.current;
    if(!e)return;
    let t=()=>{
      let t=e.scrollHeight-e.clientHeight;
      r(t>0?Math.min(1,e.scrollTop/t):0);
      let a=e.scrollTop+.3*e.clientHeight,n=f[0].id;
      for(let t of f){
        let r=e.querySelector(`[data-section="${t.id}"]`);
        r&&r.offsetTop<=a&&(n=t.id)
      }
      w(n)
    };
    return t(),e.addEventListener("scroll",t,{passive:true}),()=>e.removeEventListener("scroll",t);
  }, []),useEffect(()=>{
    if(!j)return;
    let e=C.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||y(false)
    },r=e=>{
      "Escape"===e.key&&y(false)
    };
    return e.addEventListener("pointerdown",t),e.addEventListener("keydown",r),()=>{
      e.removeEventListener("pointerdown",t),e.removeEventListener("keydown",r)
    };
  }, [j]),useEffect(()=>{
    if(!A)return;
    let e=C.current?.ownerDocument.defaultView,t=e?.setTimeout(()=>S(false),1600);
    return ()=>{
      undefined!==t&&e?.clearTimeout(t)
    };
  }, [A]),<div ref={C} className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
    <header className={p("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 shrink-0")}>
      <div className="flex h-14 items-center gap-2 px-2 sm:px-3">
        <button type="button" aria-label="Back to journal" className={p(v,k)}>
          <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <p className={p("text-[14px]/[16px] font-[450]","truncate")}>Error budgets that actually change behaviour</p>
          <p className={p("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/66 dark:text-neutral-100/66","flex min-w-0 gap-x-3")}>
            <span className="truncate">Priya Raman</span>
            <span className="shrink-0">9 min read</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <div className="relative" data-menu-root>
            <button type="button" aria-haspopup="menu" aria-expanded={j} aria-label="Contents" onClick={()=>{
              y(e=>!e)
            }} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
              <HugeiconsIcon icon={Icon_48240} size={16} strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden sm:inline">Contents</span>
            </button>
            <AnimatePresence>
              {j&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:m}},transition:{duration:.16*!e,ease:m}}} role="menu" className={p("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-full right-0 z-30 mt-1.5 w-[260px] origin-top-right")}>
                {f.map(t=>(
                  <button key={t.id} type="button" role="menuitem" aria-current={t.id===g?"location":undefined} onClick={()=>{
                                    var r;
                                    let a,n;
                                    return r=t.id,a=W.current,n=a?.querySelector(`[data-section="${r}"]`),void(a&&n&&a.scrollTo({top:offsetTop-16,behavior:e?"auto":"smooth"}),y(false));
                                  }} className={p("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","ps-8")}>
                                    {t.id===g&&<span className="pointer-events-none absolute start-2 flex size-4 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </span>}
                                    <span className="min-w-0 flex-1">{t.title}</span>
                                  </button>
                ))}
              </motion.div>}
            </AnimatePresence>
          </div>
          <button type="button" aria-label={N?"Remove bookmark":"Bookmark article"} aria-pressed={N} onClick={()=>z(e=>!e)} className={p(v,k)}>
            <HugeiconsIcon icon={Icon_2139} size={16} strokeWidth={1.8} aria-hidden="true" className={p(N&&"[&_path]:fill-current")} />
          </button>
          <button type="button" aria-label="Copy link" onClick={()=>S(true)} className={p(v,k)}>
            <HugeiconsIcon icon={A?Icon_90987:Icon_33786} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <span role="status" className="sr-only">{A?"Link copied":""}</span>
          <button type="button" aria-label="Share article" className={p(v,k,"max-sm:hidden")}>
            <HugeiconsIcon icon={Icon_71497} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px]">
        <div style={{width:`${100*t}%`}} className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" />
      </div>
    </header>
    <div ref={W} className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[600px] px-5 py-7">
        <h1 className="text-[24px]/[28px] font-[450] tracking-[-0.015em]">Error budgets that actually change behaviour</h1>
        <p className={p("text-[14px]/[20px] font-normal",_,"mt-3")}>
          Most teams publish an objective, watch the number, and change nothing when it slips. A budget is only useful if spending it is expensive.
        </p>
        {f.map(e=>(
          <section key={e.id} data-section={e.id} className="mt-7">
                    <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">{e.title}</h2>
                    <p className={p("text-[13px]/[18px] font-normal",_,"mt-2")}>{e.body}</p>
                    <div className={p("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8","mt-3 h-[90px]")} />
                  </section>
        ))}
      </div>
    </div>
  </div>;
}


export default g;
