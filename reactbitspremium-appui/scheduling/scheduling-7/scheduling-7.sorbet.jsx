/**
 * React Bits Pro — Application UI (scheduling-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89462 = [["path",{d:"M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11.5",cy:"9.5",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let e4 = (...e)=>e.filter(Boolean).join(" ");

let e9 = "text-neutral-900 dark:text-neutral-100";

let e3 = "text-neutral-900/78 dark:text-neutral-100/78";

let e7 = "text-neutral-900/62 dark:text-neutral-100/62";

let re = "text-[14px]/[20px] font-medium";

let rr = "text-[13px]/[16px] font-semibold tabular-nums";

let ra = "text-[17px]/[22px] font-extrabold";

let rt = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let rl = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let ro = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let rn = [{id:"mon",label:"Mon",date:8,free:6},{id:"tue",label:"Tue",date:9,free:2},{id:"wed",label:"Wed",date:10,free:9},{id:"thu",label:"Thu",date:11,free:0},{id:"fri",label:"Fri",date:12,free:4},{id:"sat",label:"Sat",date:13,free:0},{id:"mon2",label:"Mon",date:15,free:7},{id:"tue2",label:"Tue",date:16,free:5}];

let ri = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00"];

let rs = [{icon:Icon_29635,label:"30 minutes"},{icon:Icon_89462,label:"Video call, link on confirm"},{icon:Icon_78805,label:"Europe/Lisbon",meta:"WEST"}];

let rc = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[l].focus(),a[l].click()
};


export default function scheduling_7__Sorbet__Component(){
  let[e,r]=useState("wed"),[a,n]=useState("10:00"),{ref:i,edges:s,onScroll:c}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:l,clientWidth:o}=r;
      a({start:t>1,end:Math.ceil(t+o)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),d=rn.find(r=>r.id===e)??rn[0];
  return (
    <div className={e4("bg-white dark:bg-neutral-950",e9,"relative h-full min-h-[640px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={e4("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-4xl")}>
          <div className={e4("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1")}>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-[260px_1fr]">
              <div className="flex flex-col p-4">
                <span aria-hidden="true" className={e4("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                  <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">JV</span>
                </span>
                <p className={e4(rr,e7,"mt-3")}>Jonas Vieira</p>
                <h2 className={e4(ra,"mt-0.5")}>Intro call</h2>
                <p className={e4("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1.5")}>A short call to work out whether we are a fit. Bring anything you already have.</p>
                <dl className="mt-4 space-y-2.5">
                  {rs.map(e=>(
                    <div key={e.label} className="flex items-start gap-2">
                                    <dt className="shrink-0 pt-px">
                                      <HugeiconsIcon icon={e.icon} size={16} strokeWidth={2} aria-hidden="true" className={e7} />
                                      <span className="sr-only">Detail</span>
                                    </dt>
                                    <dd className={e4(re,e3,"flex min-w-0 flex-wrap gap-x-2")}>
                                      <span>{e.label}</span>
                                      {e.meta&&<span>{e.meta}</span>}
                                    </dd>
                                  </div>
                  ))}
                </dl>
                <p className={e4(re,e7,"mt-auto pt-4")}>Rescheduling stays open until an hour before the call.</p>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className={e4(rr,e7)}>Pick a day</h3>
                  <p className={e4(rr,e7)}>June 2026</p>
                </div>
                <div className="relative -mx-1 mt-1.5">
                  <div ref={i} onScroll={c} role="radiogroup" aria-label="Available days" onKeyDown={rc} className="-mb-1.5 flex gap-2 overflow-x-auto p-1 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {rn.map(a=>{
                      let l=a.id===e,o=0===a.free,n=!l&&!o;
                      return (
                        <button key={a.id} type="button" role="radio" aria-checked={l} tabIndex={l?0:-1} disabled={o} onClick={()=>r(a.id)} className={e4(l?rt:rl,"rounded-[var(--rb-r-4xl,18px)]","w-[72px] shrink-0 flex-col gap-0.5 px-2 py-2.5")}>
                                            <span className={e4(rr,n&&e7)}>{a.label}</span>
                                            <span className={e4(ra,"tabular-nums")}>{a.date}</span>
                                            <span className={e4(rr,n&&e7)}>{o?"Full":`${a.free} free`}</span>
                                          </button>
                      );
                    })}
                  </div>
                  <div aria-hidden="true" className={e4("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",s.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={e4("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",s.end?"opacity-100":"opacity-0")} />
                </div>
                <h3 className={e4(rr,e7,"mt-5")}>
                  {"Times on June "}
                  {d.date}
                </h3>
                <div role="radiogroup" aria-label="Available times" onKeyDown={rc} className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ri.map(e=>{
                    let r=e===a;
                    return <button key={e} type="button" role="radio" aria-checked={r} tabIndex={r?0:-1} onClick={()=>n(e)} className={e4(r?rt:rl,ro,"tabular-nums")}>{e}</button>;
                  })}
                </div>
                <div className={e4("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[max(calc(var(--rb-r-full,999px)_+_min(8px,var(--rb-r-full,999px))))]","mt-5 flex items-center justify-between gap-3 py-2 ps-3 pe-2")}>
                  <p className={e4(re,e3,"min-w-0 truncate")}>
                    {"June "}
                    {d.date}
                    {" at"}
                    {" "}
                    <span className={e4(e9,"tabular-nums")}>{a}</span>
                  </p>
                  <button type="button" className={e4(rt,ro)}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
