/**
 * React Bits Pro — Application UI (navbar-14 (Sorbet))
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

let p = (...e)=>e.filter(Boolean).join(" ");

let h = [.2,0,0,1];

let k = {type:"spring",bounce:0,duration:.35};

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let tb = (...e)=>e.filter(Boolean).join(" ");

let tx = [.2,0,0,1];

let tu = "text-neutral-900/78 dark:text-neutral-100/78";

let tp = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let th = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let tk = [{id:"budgets",title:"Error budgets are a scheduling tool",body:"A budget only changes behaviour if it is allowed to run out. When it does, the team stops shipping features and spends the week on reliability instead. That trade has to be agreed before the incident, not during it."},{id:"windows",title:"Pick the window before the target",body:"A thirty-day rolling window forgives a bad Tuesday by the end of the month. A calendar quarter does not. Choose the window that matches how the team plans, then set a target you are willing to defend in a review."},{id:"alerts",title:"Alert on burn rate, not on breach",body:"By the time the objective is breached the conversation is already about blame. Multi-window burn-rate alerts fire while there is still budget left to spend, which keeps the response technical."},{id:"review",title:"Review the objective, not just the misses",body:"If an objective has never been close to breaching in a year, it is measuring something nobody depends on. Retire it and write one that would actually change a decision."}];


export default function navbar_14__Sorbet__Component(){
  let e=useReducedMotion(),[a,r]=useState(0),[c,d]=useState(tk[0].id),[_,b]=useState(false),[x,u]=useState(false),[p,h]=useState(false),k=useRef(null),m=useRef(null);
  return useEffect(()=>{
    let e=m.current;
    if(!e)return;
    let a=()=>{
      let a=e.scrollHeight-e.clientHeight;
      r(a>0?Math.min(1,e.scrollTop/a):0);
      let t=e.scrollTop+.3*e.clientHeight,n=tk[0].id;
      for(let a of tk){
        let r=e.querySelector(`[data-section="${a.id}"]`);
        r&&r.offsetTop<=t&&(n=a.id)
      }
      d(n)
    };
    return a(),e.addEventListener("scroll",a,{passive:true}),()=>e.removeEventListener("scroll",a);
  }, []),useEffect(()=>{
    if(!_)return;
    let e=k.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      let a=e.target;
      a?.closest?.("[data-menu-root]")||b(false)
    },r=e=>{
      "Escape"===e.key&&b(false)
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",r),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",r)
    };
  }, [_]),useEffect(()=>{
    if(!p)return;
    let e=k.current?.ownerDocument.defaultView,a=e?.setTimeout(()=>h(false),1600);
    return ()=>{
      undefined!==a&&e?.clearTimeout(a)
    };
  }, [p]),<div ref={k} className={tb("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
    <header className={tb("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","relative z-20 shrink-0")}>
      <div className="flex h-14 items-center gap-2 px-2 sm:px-3">
        <button type="button" aria-label="Back to journal" className={tb(tp,th)}>
          <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <p className={tb("text-[15px]/[20px] font-bold","truncate")}>Error budgets that actually change behaviour</p>
          <p className={tb("text-[13px]/[16px] font-semibold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","flex min-w-0 gap-x-3")}>
            <span className="truncate">Priya Raman</span>
            <span className="shrink-0">9 min read</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <div className="relative" data-menu-root>
            <button type="button" aria-haspopup="menu" aria-expanded={_} aria-label="Contents" onClick={()=>{
              b(e=>!e)
            }} className={tb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
              <HugeiconsIcon icon={Icon_48240} size={18} strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">Contents</span>
            </button>
            <AnimatePresence>
              {_&&<motion.div {...{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:tx}},transition:{duration:.16*!e,ease:tx}}} role="menu" className={tb("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute top-full right-0 z-30 mt-1.5 w-[260px] origin-top-right")}>
                {tk.map(a=>(
                  <button key={a.id} type="button" role="menuitem" aria-current={a.id===c?"location":undefined} onClick={()=>{
                                    var r;
                                    let t,n;
                                    return r=a.id,t=m.current,n=t?.querySelector(`[data-section="${r}"]`),void(t&&n&&t.scrollTo({top:offsetTop-16,behavior:e?"auto":"smooth"}),b(false));
                                  }} className={tb("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","ps-9")}>
                                    {a.id===c&&<span className="pointer-events-none absolute start-3 flex size-[18px] items-center justify-center">
                                      <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                                    </span>}
                                    <span className="min-w-0 flex-1">{a.title}</span>
                                  </button>
                ))}
              </motion.div>}
            </AnimatePresence>
          </div>
          <button type="button" aria-label={x?"Remove bookmark":"Bookmark article"} aria-pressed={x} onClick={()=>u(e=>!e)} className={tb(tp,th)}>
            <HugeiconsIcon icon={Icon_2139} size={18} strokeWidth={2} aria-hidden="true" className={tb(x&&"[&_path]:fill-current")} />
          </button>
          <button type="button" aria-label="Copy link" onClick={()=>h(true)} className={tb(tp,th)}>
            <HugeiconsIcon icon={p?Icon_90987:Icon_33786} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <span role="status" className="sr-only">{p?"Link copied":""}</span>
          <button type="button" aria-label="Share article" className={tb(tp,th,"max-sm:hidden")}>
            <HugeiconsIcon icon={Icon_71497} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px]">
        <div style={{width:`${100*a}%`}} className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />
      </div>
    </header>
    <div ref={m} className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[600px] px-5 py-7">
        <h1 className="text-[26px]/[32px] font-extrabold tracking-[-0.015em]">Error budgets that actually change behaviour</h1>
        <p className={tb("text-[15px]/[22px] font-medium",tu,"mt-3")}>
          Most teams publish an objective, watch the number, and change nothing when it slips. A budget is only useful if spending it is expensive.
        </p>
        {tk.map(e=>(
          <section key={e.id} data-section={e.id} className="mt-7">
                    <h2 className="text-[17px]/[22px] font-extrabold">{e.title}</h2>
                    <p className={tb("text-[14px]/[20px] font-medium",tu,"mt-2")}>{e.body}</p>
                    <div className={tb("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8","mt-3 h-[90px]")} />
                  </section>
        ))}
      </div>
    </div>
  </div>;
}
