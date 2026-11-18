/**
 * React Bits Pro — Application UI (data-table-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_24513 = [["path",{d:"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "bg-white dark:bg-neutral-950",
  h = "bg-neutral-50 dark:bg-neutral-900",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "border-r border-neutral-900/8 dark:border-neutral-100/8",
  m = "text-[14px]/[16px] font-[450]",
  k = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  f = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  g = "text-right tabular-nums",
  v = "sm:first:ps-6 sm:last:pe-6",
  w = [{site:"Atlanta Fulfillment",dock:"Bay 14",days:[86,91,77,83,94,61,40],peak:94,risk:"Watch"},{site:"Reno Crossdock",dock:"Bay 03",days:[72,70,69,74,81,58,35],peak:81,risk:"Clear"},{site:"Long Beach Import Annex With Extended Customs Queue",dock:"Yard 9",days:[97,98,95,92,89,84,70],peak:98,risk:"High"},{site:"Columbus Returns Hub",dock:"Bay 21",days:[64,68,71,73,76,52,30],peak:76,risk:"Clear"},{site:"Dallas Regional Depot",dock:"Bay 07",days:[88,84,90,92,96,66,44],peak:96,risk:"Watch"},{site:"Newark Gateway",dock:"Bay 12",days:[79,82,85,88,91,60,38],peak:91,risk:"Watch"},{site:"Phoenix Sortation",dock:"Bay 05",days:[61,63,66,70,74,49,28],peak:74,risk:"Clear"},{site:"Chicago Inbound",dock:"Bay 18",days:[93,95,97,96,98,78,55],peak:98,risk:"High"},{site:"Denver Cold Storage",dock:"Bay 02",days:[70,72,74,71,80,57,33],peak:80,risk:"Clear"},{site:"Seattle Import Yard",dock:"Yard 4",days:[83,85,81,87,90,62,41],peak:90,risk:"Watch"},{site:"Miami Cross-Border",dock:"Bay 09",days:[76,78,80,82,85,55,36],peak:85,risk:"Clear"}],
  _ = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  j = {Clear:"text-neutral-900/80 dark:text-neutral-100/80",Watch:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",High:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function N({risk:e}){
  return <span className={u("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",j[e],"whitespace-nowrap")}>{e}</span>;
}

function y({label:e,sortKey:t,sort:r,onSort:n,align:d="left"}){
  let c=r.key===t,x=c?"asc"===r.dir?Icon_24513:Icon_20148:Icon_31517;
  return (
    <button type="button" data-sorted={c?"true":undefined} onClick={()=>n(t)} className={u("-mx-1.5 inline-flex h-7 min-w-0 cursor-pointer items-center gap-1 rounded-[var(--rb-r-sm,6px)] px-1.5 hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100","max-w-full","right"===d&&"flex-row-reverse")}>
        <span className="truncate">{e}</span>
        <HugeiconsIcon icon={x} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
      </button>
  );
}

function S(){
  let{ref:e,edges:t,onScroll:r}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),[l,i]=useState(""),[o,j]=useState(null),[S,A]=useState(false),[C,D]=useState({key:"peak",dir:"desc"}),z=e=>D(t=>t.key===e?{key:e,dir:"asc"===t.dir?"desc":"asc"}:{key:e,dir:"site"===e?"asc":"desc"}),R=useMemo(()=>{
    let e=l.trim().toLowerCase(),t=e?w.filter(t=>t.site.toLowerCase().includes(e)||t.dock.toLowerCase().includes(e)):w,r="asc"===C.dir?1:-1;
    return [...t].sort((e,t)=>"peak"===C.key?(e.peak-t.peak)*r:e.site.localeCompare(t.site)*r);
  }, [l,C]),P=w.filter(e=>e.peak>=95).length;
  return (
    <div className={u(x,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={u(h,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className="min-w-0 flex-1">
              <h2 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Dock capacity</h2>
              <p className={u("text-[13px]/[18px] font-normal",p,"truncate")}>Utilization by site, this week</p>
            </div>
            <label className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","max-sm:hidden sm:w-48")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input value={l} onChange={e=>i(e.target.value)} placeholder="Search sites" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              <span className="sr-only">Search sites</span>
            </label>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={e=>{
              r(),A(e.currentTarget.scrollLeft>0)
            }} className="h-full overflow-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                <caption className="sr-only">Weekly dock utilization by site</caption>
                <thead className={u(h,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" aria-sort={"site"===C.key?"asc"===C.dir?"ascending":"descending":"none"} className={u(k,h,b,v,"sticky left-0 z-10")}><y label="Site" sortKey="site" sort={C} onSort={z} /></th>
                    {_.map(e=><th key={e} scope="col" className={u(k,"min-w-[64px] text-right")}>{e}</th>)}
                    <th scope="col" aria-sort={"peak"===C.key?"asc"===C.dir?"ascending":"descending":"none"} className={u(k,"min-w-[72px] text-right")}><y label="Peak" sortKey="peak" sort={C} onSort={z} align="right" /></th>
                    <th scope="col" className={u(k,"w-[120px]")}>Risk</th>
                    <th scope="col" className={u(k,v,"w-[100px] text-right")}>Dock</th>
                  </tr>
                </thead>
                <tbody>
                  {R.map(e=>(
                    <tr key={e.site} onPointerEnter={()=>j(e.site)} onPointerLeave={()=>j(t=>t===e.site?null:t)} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                    <th scope="row" className={u(f,(S||o!==e.site)&&x,b,m,v,"sticky left-0 z-10 max-w-[220px] text-left")}>
                                      <span className="block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">{e.site}</span>
                                    </th>
                                    {e.days.map((e,t)=>(
                                      <td key={t} className={u(f,g)}>
                                                        <span className={e>=95?m:p}>
                                                          {e}
                                                          %
                                                        </span>
                                                      </td>
                                    ))}
                                    <td className={u(f,g,m)}>
                                      {e.peak}
                                      %
                                    </td>
                                    <td className={f}><N risk={e.risk} /></td>
                                    <td className={u(f,g,v)}><span className={p}>{e.dock}</span></td>
                                  </tr>
                  ))}
                </tbody>
              </table>
              {0===R.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={u(p,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} /></span>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No sites match that search</p>
                <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a site name or a dock number.</p>
                <button type="button" onClick={()=>i("")} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Clear search</button>
              </div>}
            </div>
            <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={u(h,"text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <span>
              {R.length}
              {" of "}
              {w.length}
              {" sites"}
            </span>
            <span>
              {P}
              {" above 95% peak"}
            </span>
          </footer>
        </div>
      </div>
  );
}


export default S;
