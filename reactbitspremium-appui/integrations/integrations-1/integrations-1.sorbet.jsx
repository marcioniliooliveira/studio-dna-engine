/**
 * React Bits Pro — Application UI (integrations-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900/62 dark:text-neutral-100/62";

let _ = "text-[14px]/[20px] font-medium";

let x = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let b = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let u = c(_,d);

let p = c(_,"text-neutral-900/78 dark:text-neutral-100/78");

let h = c("text-[13px]/[16px] font-semibold tabular-nums",d);

let k = [{name:"Northwind",mark:"NW",group:"Analytics",blurb:"Stream product events into Northwind dashboards.",connected:true},{name:"Cedar Labs",mark:"CL",group:"Developer",blurb:"Open an issue whenever a deploy check fails.",connected:true},{name:"Harbor",mark:"HB",group:"Messaging",blurb:"Post alerts and approvals into a shared channel."},{name:"Meridian",mark:"MD",group:"Storage",blurb:"Archive exports to a bucket you control."},{name:"Alder",mark:"AL",group:"Analytics",blurb:"Warehouse sync for usage and billing tables."},{name:"Fernrock",mark:"FR",group:"Developer",blurb:"Run a workflow when an environment is promoted."},{name:"Tidepool",mark:"TP",group:"Messaging",blurb:"Route incidents to the on-call rotation."},{name:"Quarry",mark:"QR",group:"Storage",blurb:"Mirror audit logs to cold storage nightly."},{name:"Lantern",mark:"LN",group:"Security",blurb:"Send sign-in anomalies to your SIEM."}];

let m = ["All","Analytics","Developer","Messaging","Storage","Security"];

let L = (...e)=>e.filter(Boolean).join(" ");


export default function integrations_1__Sorbet__Component(){
  let[e,r]=useState("All"),[a,d]=useState(""),[_,g]=useState(()=>Object.fromEntries(k.filter(e=>e.connected).map(e=>[e.name,true]))),v=useMemo(()=>{
    let r=a.trim().toLowerCase();
    return k.filter(a=>("All"===e||a.group===e)&&(!r||a.name.toLowerCase().includes(r)||a.blurb.toLowerCase().includes(r)));
  }, [e,a]),f=Object.values(_).filter(Boolean).length,{ref:w,edges:y,onScroll:j}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),o=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:o}=e;
      t({start:a>1,end:Math.ceil(a+o)<n-1})
    }, []);
    return useEffect(()=>{
      o();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(o);
      return t.observe(e),()=>t.disconnect();
    }, [e,o]),{ref:r,edges:a,onScroll:o};
  }(`${e}|${a}`),{ref:C,edges:N,onScroll:L}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:o}=r;
      a({start:t>1,end:Math.ceil(t+o)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[700px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-3 px-5">
            <div>
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Integrations</h2>
              <p className={c(u,"mt-1 flex flex-wrap gap-x-3")}>
                <span>
                  <span className="tabular-nums">{f}</span>
                  {" connected"}
                </span>
                <span>
                  <span className="tabular-nums">{k.length}</span>
                  {" available"}
                </span>
              </p>
            </div>
            <div className={c("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","sm:w-[248px]")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input value={a} onChange={e=>d(e.target.value)} placeholder="Search integrations" aria-label="Search integrations" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
            </div>
          </div>
          <div className="relative mt-3.5">
            <div ref={C} onScroll={L} role="tablist" aria-label="Category" onKeyDown={a=>{
              var t,n,o;
              let l;
              return t=m.length,n=m.indexOf(e),o=e=>r(m[e]),void(!((l="ArrowRight"===a.key||"ArrowDown"===a.key?(n+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(n-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),o(l),a.currentTarget.querySelectorAll('[role="tab"]')[l]?.focus()));
            }} className={c("flex max-w-full min-w-0 items-center gap-1.5 overflow-x-auto shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] [scrollbar-width:none] dark:shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--color-neutral-100)_9%,transparent)]","px-5")}>
              {m.map(a=>{
                let n=a===e;
                return <button key={a} role="tab" type="button" aria-selected={n} tabIndex={n?0:-1} onClick={()=>r(a)} className="relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40">{a}</button>;
              })}
            </div>
            <div aria-hidden="true" className={c("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute top-0 bottom-px left-0 w-8",N.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute top-0 right-0 bottom-px w-8",N.end?"opacity-100":"opacity-0")} />
          </div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={w} onScroll={j} className="h-full overflow-y-auto px-5 py-4">
            {v.length>0?<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {v.map(e=>{
                let r=!!_[e.name];
                return (
                  <article key={e.name} className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","p-4")}>
                                <div className="flex items-center gap-3">
                                  <span aria-hidden="true" className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-9")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.mark}</span>
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <h3 className={c("text-[15px]/[20px] font-bold","truncate")}>{e.name}</h3>
                                    <p className={c(h,"mt-0.5")}>{e.group}</p>
                                  </div>
                                </div>
                                <p className={c(p,"mt-3 flex-1")}>{e.blurb}</p>
                                <button type="button" onClick={()=>g(r=>({...r,[e.name]:!r[e.name]}))} className={c(x,b,"mt-4")}>
                                  <HugeiconsIcon icon={r?Icon_90987:Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                                  {r?"Connected":"Connect"}
                                </button>
                              </article>
                );
              })}
            </div>:<div className="flex flex-col items-center px-6 py-20 text-center">
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No integrations match</p>
              <p className={c("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a different category, or clear the search to see everything available.</p>
              <button type="button" onClick={()=>{
                d(""),r("All")
              }} className={c(x,b,"mt-4")}>Reset filters</button>
            </div>}
          </div>
          <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
