/**
 * React Bits Pro — Application UI (app-dialog-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  x = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  b = [.2,0,0,1],
  p = [{label:"Deployments",value:"1,204"},{label:"Environment variables",value:"38"},{label:"Custom domains",value:"3"},{label:"Team members",value:"11"}];

function h(e){
  return Array.from(e?.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
}

function _(){
  let e,t,r,{ref:_,edges:m,onScroll:f}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),v=useReducedMotion(),[k,g]=useState(true),[w,y]=useState(""),j=useRef(false),[N,S]=useState(false),[z,E]=useState(false),C=useCallback(()=>g(false), []),{panelRef:D,triggerRef:R}=(e=useRef(null),t=useRef(null),r=useRef(k),useEffect(()=>{
    if(!k)return;
    let t=e.current,r=t?.ownerDocument??document;
    (h(t)[0]??t)?.focus({preventScroll:true});
    let a=e=>{
      if("Escape"===e.key){
        e.preventDefault(),C();
        return
      }
      if("Tab"!==e.key)return;
      let a=h(t);
      if(0===a.length)return;
      let n=a[0],l=a[a.length-1],i=r.activeElement;
      e.shiftKey&&i===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||i!==l||(e.preventDefault(),focus({preventScroll:true}))
    };
    return r.addEventListener("keydown",a),()=>r.removeEventListener("keydown",a);
  }, [k,C]),useEffect(()=>{
    r.current&&!k&&t.current?.focus({preventScroll:true}),r.current=k
  }, [k]),{panelRef:e,triggerRef:t});
  useEffect(()=>{
    if(!z)return;
    let e=setTimeout(()=>E(false),2600);
    return ()=>clearTimeout(e);
  }, [z]);
  let A="atlas-production"===w.trim(),T=!v&&!N;
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={R} type="button" onPointerDown={()=>{
          j.current=false
        }} onKeyDown={e=>{
          ("Enter"===e.key||" "===e.key)&&(j.current=true)
        }} onClick={()=>{
          y(""),E(false),S(j.current),g(true)
        }} className={c(u,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Delete project</button>
        <AnimatePresence initial={false}>
          {k&&<>
            <motion.div aria-hidden="true" className={c("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40")} onClick={C} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:b}}} transition={{duration:.18*!!T,ease:b}} />
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div ref={D} role="dialog" aria-modal="true" aria-labelledby="app-dialog-2-title" aria-describedby="app-dialog-2-desc" tabIndex={-1} className={c("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","pointer-events-auto max-h-full w-full max-w-sm")} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:b}}} transition={{duration:.18*!!T,ease:b}}>
                <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
                  <header className={c("relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0","shrink-0")}>
                    <h2 id="app-dialog-2-title" className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Delete atlas-production?</h2>
                    <p id="app-dialog-2-desc" className="text-[14px]/[20px] text-neutral-900/80 dark:text-neutral-100/80">This permanently removes the project and everything in it. It can't be undone.</p>
                    <div className="absolute end-4 top-4 flex">
                      <button type="button" aria-label="Close dialog" onClick={C} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                        <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                      </button>
                    </div>
                  </header>
                  <div className="relative min-h-0 flex-1">
                    <div ref={_} onScroll={f} className={c("flex min-w-0 flex-col gap-4 p-5 pt-6","h-full overflow-y-auto")}>
                      <dl className={c("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","grid grid-cols-2 gap-x-6 gap-y-4 px-4 py-3.5")}>
                        {p.map(e=>(
                          <div key={e.label} className="flex min-w-0 flex-col-reverse">
                                                <dt className={c("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{e.label}</dt>
                                                <dd className={c("text-[14px]/[16px] font-[450]","tabular-nums")}>{e.value}</dd>
                                              </div>
                        ))}
                      </dl>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="app-dialog-2-confirm" className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">
                          <span>
                            Type
                            {" "}
                            <code className="rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5">atlas-production</code>
                            {" "}
                            to confirm
                          </span>
                        </label>
                        <div className={c("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                          <input id="app-dialog-2-confirm" value={w} onChange={e=>y(e.target.value)} autoComplete="off" spellCheck={false} placeholder="atlas-production" className={c("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","font-mono text-[13px]/[20px] tabular-nums")} />
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",m.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",m.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <footer className={c("flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2","shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                  <button type="button" onClick={C} className={c(u,x,"w-full sm:w-auto")}>Cancel</button>
                  <button type="button" disabled={!A} onClick={()=>{
                    E(true),g(false)
                  }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x,"w-full sm:w-auto")}>Delete project</button>
                </footer>
              </motion.div>
            </div>
          </>}
        </AnimatePresence>
        <div aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
          {z&&<div className={c("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none")}>
            <div className="min-w-0">
              <p className="text-[14px]/[16px] font-[450]">Project deleted</p>
              <p className="mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">atlas-production and its 1,204 deployments were removed.</p>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default _;
