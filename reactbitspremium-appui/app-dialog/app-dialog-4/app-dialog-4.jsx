/**
 * React Bits Pro — Application UI (app-dialog-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "bg-neutral-900/5 dark:bg-neutral-100/5",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[14px]/[16px] font-[450]",
  _ = "rounded-[var(--rb-r-sm,6px)]",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  g = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  w = "min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66",
  y = "flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]",
  j = [.2,0,0,1],
  N = [{title:"Workspace"},{title:"Region"},{title:"Team"}],
  S = ["United States (iad1)","Europe (fra1)","Asia Pacific (syd1)","South America (gru1)"];

function z(e){
  return Array.from(e?.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
}

function E(){
  let e,t,r,{ref:E,edges:C,onScroll:D}=function(){
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
  }(),R=useReducedMotion(),[A,T]=useState(true),[P,I]=useState(0),[W,K]=useState(false),[L,M]=useState("Northwind"),[H,F]=useState(S[0]),[O,B]=useState(""),V=useRef(false),[q,U]=useState(false),$=useCallback(()=>T(false), []),{panelRef:J,triggerRef:Y}=(e=useRef(null),t=useRef(null),r=useRef(A),useEffect(()=>{
    if(!A)return;
    let t=e.current,r=t?.ownerDocument??document;
    (z(t)[0]??t)?.focus({preventScroll:true});
    let a=e=>{
      if("Escape"===e.key){
        e.preventDefault(),$();
        return
      }
      if("Tab"!==e.key)return;
      let a=z(t);
      if(0===a.length)return;
      let n=a[0],l=a[a.length-1],i=r.activeElement;
      e.shiftKey&&i===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||i!==l||(e.preventDefault(),focus({preventScroll:true}))
    };
    return r.addEventListener("keydown",a),()=>{
      r.removeEventListener("keydown",a)
    };
  }, [A,P,$]),useEffect(()=>{
    r.current&&!A&&t.current?.focus({preventScroll:true}),r.current=A
  }, [A]),{panelRef:e,triggerRef:t});
  useEffect(()=>{
    if(!W)return;
    let e=setTimeout(()=>K(false),2e3);
    return ()=>clearTimeout(e);
  }, [W]);
  let G=P===N.length-1,Q=L.trim().toLowerCase().replace(/\s+/g,"-")||"workspace",X=!R&&!q;
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={Y} type="button" onPointerDown={()=>{
          V.current=false
        }} onKeyDown={e=>{
          ("Enter"===e.key||" "===e.key)&&(V.current=true)
        }} onClick={()=>{
          I(0),K(false),U(V.current),T(true)
        }} className={x(m,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>New workspace</button>
        <AnimatePresence initial={false}>
          {A&&<>
            <motion.div aria-hidden="true" className={x("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40")} onClick={$} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:j}}} transition={{duration:.18*!!X,ease:j}} />
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div ref={J} role="dialog" aria-modal="true" aria-labelledby="app-dialog-4-title" tabIndex={-1} className={x("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","pointer-events-auto max-h-full w-full max-w-md")} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:j}}} transition={{duration:.18*!!X,ease:j}}>
                <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
                  <header className={x("relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0","shrink-0")}>
                    <div className="min-w-0 flex-1">
                      <p className={x("text-[12px]/[16px] font-normal tabular-nums",p)}>
                        {"Step "}
                        {P+1}
                        {" of "}
                        {N.length}
                      </p>
                      <h2 id="app-dialog-4-title" className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-0.5")}>{N[P].title}</h2>
                    </div>
                    <div className="absolute end-4 top-6 flex">
                      <button type="button" aria-label="Close dialog" onClick={$} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                        <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                      </button>
                    </div>
                  </header>
                  <div className="mt-4 flex shrink-0 items-center gap-1.5 px-5" aria-hidden="true">
                    {N.map((e,t)=>(
                      <span key={e.title} className={x("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","flex-1")}>
                                        <span className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:t<=P?"100%":"0%"}} />
                                      </span>
                    ))}
                  </div>
                  <div className="relative min-h-0 flex-1">
                    <div ref={E} onScroll={D} className={x("flex min-w-0 flex-col gap-4 p-5 pt-6","h-full overflow-y-auto")}>
                      {0===P&&<div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="app-dialog-4-name" className={k}>Workspace name</label>
                          <div className={x("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                            <input id="app-dialog-4-name" value={L} onChange={e=>M(e.target.value)} placeholder="Acme" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className={k}>Workspace URL</span>
                          <div className={x(b,_,"h-8","text-[14px]/[20px] font-normal","flex items-center px-3")}>
                            <span className={p}>northwind.app/</span>
                            <span className={x(h,"truncate")}>{Q}</span>
                          </div>
                          <p className={g}>You can change this later in settings.</p>
                        </div>
                      </div>}
                      {1===P&&<div className="flex flex-col gap-2">
                        <span className={k}>Primary region</span>
                        <p className={g}>Choose where your workspace data is stored.</p>
                        <ul className="-mx-3 mt-2 flex flex-col gap-0.5">
                          {S.map(e=>{
                            let t=e===H;
                            return (
                              <li key={e}>
                                                        <button type="button" onClick={()=>F(e)} aria-pressed={t} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",t?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",_,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","justify-between px-3")}>
                                                          <span className={x(h,"truncate")}>{e}</span>
                                                          {t&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                                                        </button>
                                                      </li>
                            );
                          })}
                        </ul>
                      </div>}
                      {2===P&&<div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="app-dialog-4-emails" className={k}>Invite teammates</label>
                          <textarea id="app-dialog-4-emails" value={O} onChange={e=>B(e.target.value)} rows={3} placeholder="priya@northwind.io, marcus@northwind.io" className={x("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","min-h-[80px]")} />
                          <p className={g}>Separate addresses with a comma. You can skip this and invite people later.</p>
                        </div>
                        <dl className={x(b,_,"space-y-2 px-4 py-3")}>
                          <div className="flex items-center justify-between gap-3">
                            <dt className={x(w,"shrink-0")}>Workspace</dt>
                            <dd className={y}>{L.trim()||"Untitled"}</dd>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <dt className={x(w,"shrink-0")}>Region</dt>
                            <dd className={y}>{H}</dd>
                          </div>
                        </dl>
                      </div>}
                    </div>
                    <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",C.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",C.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <footer className={x("flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2","shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                  {P>0?<button type="button" onClick={()=>I(e=>Math.max(e-1,0))} className={x(f,v,"w-full sm:w-auto")}>
                    <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    Back
                  </button>:<button type="button" onClick={$} className={x(f,v,"w-full sm:w-auto")}>Cancel</button>}
                  <button type="button" onClick={()=>{
                    if(G){
                      K(true),T(false);
                      return
                    }
                    I(e=>Math.min(e+1,N.length-1))
                  }} className={x(m,v,"w-full sm:w-auto")}>{G?"Create workspace":"Continue"}</button>
                </footer>
              </motion.div>
            </div>
          </>}
        </AnimatePresence>
        <div aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
          {W&&<div className={x("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none")}>
            <div className="min-w-0">
              <p className="text-[14px]/[16px] font-[450]">Workspace created</p>
              <p className="mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                {"Redirecting you to "}
                {Q}
                .
              </p>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default E;
