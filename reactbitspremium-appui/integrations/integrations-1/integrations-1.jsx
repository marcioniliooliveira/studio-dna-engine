/**
 * React Bits Pro — Application UI (integrations-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[13px]/[18px] font-normal",
  x = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  p = d(u,c),
  h = d(u,"text-neutral-900/80 dark:text-neutral-100/80"),
  m = d("text-[12px]/[16px] font-normal tabular-nums",c),
  _ = [{name:"Northwind",mark:"NW",group:"Analytics",blurb:"Stream product events into Northwind dashboards.",connected:true},{name:"Cedar Labs",mark:"CL",group:"Developer",blurb:"Open an issue whenever a deploy check fails.",connected:true},{name:"Harbor",mark:"HB",group:"Messaging",blurb:"Post alerts and approvals into a shared channel."},{name:"Meridian",mark:"MD",group:"Storage",blurb:"Archive exports to a bucket you control."},{name:"Alder",mark:"AL",group:"Analytics",blurb:"Warehouse sync for usage and billing tables."},{name:"Fernrock",mark:"FR",group:"Developer",blurb:"Run a workflow when an environment is promoted."},{name:"Tidepool",mark:"TP",group:"Messaging",blurb:"Route incidents to the on-call rotation."},{name:"Quarry",mark:"QR",group:"Storage",blurb:"Mirror audit logs to cold storage nightly."},{name:"Lantern",mark:"LN",group:"Security",blurb:"Send sign-in anomalies to your SIEM."}],
  k = ["All","Analytics","Developer","Messaging","Storage","Security"];

function f(){
  let[e,r]=useState("All"),[a,c]=useState(""),[u,f]=useState(()=>Object.fromEntries(_.filter(e=>e.connected).map(e=>[e.name,true]))),v=useMemo(()=>{
    let r=a.trim().toLowerCase();
    return _.filter(a=>("All"===e||a.group===e)&&(!r||a.name.toLowerCase().includes(r)||a.blurb.toLowerCase().includes(r)));
  }, [e,a]),g=Object.values(u).filter(Boolean).length,{ref:w,edges:j,onScroll:y}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),s=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=e;
      t({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      s();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(s);
      return t.observe(e),()=>t.disconnect();
    }, [e,s]),{ref:r,edges:a,onScroll:s};
  }(`${e}|${a}`),{ref:N,edges:z,onScroll:A}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:s}=r;
      a({start:t>1,end:Math.ceil(t+s)<n-1})
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
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-3 px-5">
            <div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Integrations</h2>
              <p className={d(p,"mt-1 flex flex-wrap gap-x-3")}>
                <span>
                  <span className="tabular-nums">{g}</span>
                  {" connected"}
                </span>
                <span>
                  <span className="tabular-nums">{_.length}</span>
                  {" available"}
                </span>
              </p>
            </div>
            <div className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","sm:w-[248px]")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input value={a} onChange={e=>c(e.target.value)} placeholder="Search integrations" aria-label="Search integrations" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
            </div>
          </div>
          <div className="relative mt-3.5">
            <div ref={N} onScroll={A} role="tablist" aria-label="Category" onKeyDown={a=>{
              var t,n,s;
              let l;
              return t=k.length,n=k.indexOf(e),s=e=>r(k[e]),void(!((l="ArrowRight"===a.key||"ArrowDown"===a.key?(n+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(n-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),s(l),a.currentTarget.querySelectorAll('[role="tab"]')[l]?.focus()));
            }} className={d("flex max-w-full min-w-0 items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-900)_8%,transparent)] [scrollbar-width:none] dark:shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-100)_8%,transparent)]","px-5")}>
              {k.map(a=>{
                let n=a===e;
                return <button key={a} role="tab" type="button" aria-selected={n} tabIndex={n?0:-1} onClick={()=>r(a)} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">{a}</button>;
              })}
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute top-0 bottom-px left-0 w-8",z.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute top-0 right-0 bottom-px w-8",z.end?"opacity-100":"opacity-0")} />
          </div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={w} onScroll={y} className="h-full overflow-y-auto px-5 py-4">
            {v.length>0?<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {v.map(e=>{
                let r=!!u[e.name];
                return (
                  <article key={e.name} className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","p-4")}>
                                <div className="flex items-center gap-3">
                                  <span aria-hidden="true" className={d("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-9")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.mark}</span>
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <h3 className={d("text-[14px]/[16px] font-[450]","truncate")}>{e.name}</h3>
                                    <p className={d(m,"mt-0.5")}>{e.group}</p>
                                  </div>
                                </div>
                                <p className={d(h,"mt-3 flex-1")}>{e.blurb}</p>
                                <button type="button" onClick={()=>f(r=>({...r,[e.name]:!r[e.name]}))} className={d(x,b,"mt-4")}>
                                  <HugeiconsIcon icon={r?Icon_90987:Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                                  {r?"Connected":"Connect"}
                                </button>
                              </article>
                );
              })}
            </div>:<div className="flex flex-col items-center px-6 py-20 text-center">
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No integrations match</p>
              <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a different category, or clear the search to see everything available.</p>
              <button type="button" onClick={()=>{
                c(""),r("All")
              }} className={d(x,b,"mt-4")}>Reset filters</button>
            </div>}
          </div>
          <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default f;
