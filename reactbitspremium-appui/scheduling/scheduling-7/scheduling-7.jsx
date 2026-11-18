/**
 * React Bits Pro — Application UI (scheduling-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89462 = [["path",{d:"M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11.5",cy:"9.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "text-[12px]/[16px] font-normal tabular-nums",
  h = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  m = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  v = [{id:"mon",label:"Mon",date:8,free:6},{id:"tue",label:"Tue",date:9,free:2},{id:"wed",label:"Wed",date:10,free:9},{id:"thu",label:"Thu",date:11,free:0},{id:"fri",label:"Fri",date:12,free:4},{id:"sat",label:"Sat",date:13,free:0},{id:"mon2",label:"Mon",date:15,free:7},{id:"tue2",label:"Tue",date:16,free:5}],
  k = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00"],
  g = [{icon:Icon_29635,label:"30 minutes"},{icon:Icon_89462,label:"Video call, link on confirm"},{icon:Icon_78805,label:"Europe/Lisbon",meta:"WEST"}],
  w = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function y(){
  let[e,r]=useState("wed"),[a,i]=useState("10:00"),{ref:o,edges:s,onScroll:y}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:l,clientWidth:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),j=v.find(r=>r.id===e)??v[0];
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative h-full min-h-[640px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-4xl")}>
          <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1")}>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-[260px_1fr]">
              <div className="flex flex-col p-4">
                <span aria-hidden="true" className={d("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">JV</span>
                </span>
                <p className={d(p,b,"mt-3")}>Jonas Vieira</p>
                <h2 className={d(h,"mt-0.5")}>Intro call</h2>
                <p className={d("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>A short call to work out whether we are a fit. Bring anything you already have.</p>
                <dl className="mt-4 space-y-2.5">
                  {g.map(e=>(
                    <div key={e.label} className="flex items-start gap-2">
                                    <dt className="shrink-0 pt-px">
                                      <HugeiconsIcon icon={e.icon} size={14} strokeWidth={1.8} aria-hidden="true" className={b} />
                                      <span className="sr-only">Detail</span>
                                    </dt>
                                    <dd className={d(x,u,"flex min-w-0 flex-wrap gap-x-2")}>
                                      <span>{e.label}</span>
                                      {e.meta&&<span>{e.meta}</span>}
                                    </dd>
                                  </div>
                  ))}
                </dl>
                <p className={d(x,b,"mt-auto pt-4")}>Rescheduling stays open until an hour before the call.</p>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className={d(p,b)}>Pick a day</h3>
                  <p className={d(p,b)}>June 2026</p>
                </div>
                <div className="relative -mx-1 mt-1.5">
                  <div ref={o} onScroll={y} role="radiogroup" aria-label="Available days" onKeyDown={w} className="-mb-1.5 flex gap-2 overflow-x-auto p-1 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {v.map(a=>{
                      let l=a.id===e,n=0===a.free,i=!l&&!n;
                      return (
                        <button key={a.id} type="button" role="radio" aria-checked={l} tabIndex={l?0:-1} disabled={n} onClick={()=>r(a.id)} className={d(l?_:f,"rounded-[var(--rb-r-sm,6px)]","w-[72px] shrink-0 flex-col gap-0.5 px-2 py-2.5")}>
                                            <span className={d(p,i&&b)}>{a.label}</span>
                                            <span className={d(h,"tabular-nums")}>{a.date}</span>
                                            <span className={d(p,i&&b)}>{n?"Full":`${a.free} free`}</span>
                                          </button>
                      );
                    })}
                  </div>
                  <div aria-hidden="true" className={d("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",s.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={d("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",s.end?"opacity-100":"opacity-0")} />
                </div>
                <h3 className={d(p,b,"mt-5")}>
                  {"Times on June "}
                  {j.date}
                </h3>
                <div role="radiogroup" aria-label="Available times" onKeyDown={w} className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {k.map(e=>{
                    let r=e===a;
                    return <button key={e} type="button" role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>i(e)} className={d(r?_:f,m,"tabular-nums")}>{e}</button>;
                  })}
                </div>
                <div className={d("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-2xl,14px)]","mt-5 flex items-center justify-between gap-3 py-2 ps-3 pe-2")}>
                  <p className={d(x,u,"min-w-0 truncate")}>
                    {"June "}
                    {j.date}
                    {" at"}
                    {" "}
                    <span className={d(c,"tabular-nums")}>{a}</span>
                  </p>
                  <button type="button" className={d(_,m)}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}


export default y;
