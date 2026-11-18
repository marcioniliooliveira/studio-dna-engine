/**
 * React Bits Pro — Application UI (data-table-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_24513 = [["path",{d:"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let p = "bg-white dark:bg-neutral-950";

let b = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let m = "text-neutral-900/78 dark:text-neutral-100/78";

let k = "text-[15px]/[20px] font-bold";

let rk = (...e)=>e.filter(Boolean).join(" ");

let rf = "bg-white dark:bg-neutral-950";

let rv = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let rg = "text-neutral-900/78 dark:text-neutral-100/78";

let rw = "border-r border-transparent";

let rj = "text-[15px]/[20px] font-bold";

let ry = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let rN = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let rC = "text-right tabular-nums";

let rS = "sm:first:ps-6 sm:last:pe-6";

let rA = [{site:"Atlanta Fulfillment",dock:"Bay 14",days:[86,91,77,83,94,61,40],peak:94,risk:"Watch"},{site:"Reno Crossdock",dock:"Bay 03",days:[72,70,69,74,81,58,35],peak:81,risk:"Clear"},{site:"Long Beach Import Annex With Extended Customs Queue",dock:"Yard 9",days:[97,98,95,92,89,84,70],peak:98,risk:"High"},{site:"Columbus Returns Hub",dock:"Bay 21",days:[64,68,71,73,76,52,30],peak:76,risk:"Clear"},{site:"Dallas Regional Depot",dock:"Bay 07",days:[88,84,90,92,96,66,44],peak:96,risk:"Watch"},{site:"Newark Gateway",dock:"Bay 12",days:[79,82,85,88,91,60,38],peak:91,risk:"Watch"},{site:"Phoenix Sortation",dock:"Bay 05",days:[61,63,66,70,74,49,28],peak:74,risk:"Clear"},{site:"Chicago Inbound",dock:"Bay 18",days:[93,95,97,96,98,78,55],peak:98,risk:"High"},{site:"Denver Cold Storage",dock:"Bay 02",days:[70,72,74,71,80,57,33],peak:80,risk:"Clear"},{site:"Seattle Import Yard",dock:"Yard 4",days:[83,85,81,87,90,62,41],peak:90,risk:"Watch"},{site:"Miami Cross-Border",dock:"Bay 09",days:[76,78,80,82,85,55,36],peak:85,risk:"Clear"}];

let rL = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

let rM = {Clear:"text-neutral-900/78 dark:text-neutral-100/78",Watch:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",High:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function rD({risk:e}){
  return <span className={rk("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",rM[e],"whitespace-nowrap")}>{e}</span>;
}

function rz({label:e,sortKey:r,sort:a,onSort:n,align:c="left"}){
  let d=a.key===r,u=d?"asc"===a.dir?Icon_24513:Icon_20148:Icon_31517;
  return (
    <button type="button" data-sorted={d?"true":undefined} onClick={()=>n(r)} className={rk("-mx-1.5 inline-flex h-8 min-w-0 cursor-pointer items-center gap-1 rounded-[calc(var(--rb-r-full,999px))] px-1.5 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100","max-w-full","right"===c&&"flex-row-reverse")}>
        <span className="truncate">{e}</span>
        <HugeiconsIcon icon={u} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
      </button>
  );
}


export default function data_table_8__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[o,s]=useState(""),[i,c]=useState(null),[u,x]=useState(false),[h,p]=useState({key:"peak",dir:"desc"}),b=e=>p(r=>r.key===e?{key:e,dir:"asc"===r.dir?"desc":"asc"}:{key:e,dir:"site"===e?"asc":"desc"}),m=useMemo(()=>{
    let e=o.trim().toLowerCase(),r=e?rA.filter(r=>r.site.toLowerCase().includes(e)||r.dock.toLowerCase().includes(e)):rA,a="asc"===h.dir?1:-1;
    return [...r].sort((e,r)=>"peak"===h.key?(e.peak-r.peak)*a:e.site.localeCompare(r.site)*a);
  }, [o,h]),k=rA.filter(e=>e.peak>=95).length;
  return (
    <div className={rk(rf,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={rk(rv,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className="min-w-0 flex-1">
              <h2 className={rk("text-[17px]/[22px] font-extrabold","truncate")}>Dock capacity</h2>
              <p className={rk("text-[14px]/[20px] font-medium",rg,"truncate")}>Utilization by site, this week</p>
            </div>
            <label className={rk("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","max-sm:hidden sm:w-48")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input value={o} onChange={e=>s(e.target.value)} placeholder="Search sites" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
              <span className="sr-only">Search sites</span>
            </label>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={e=>{
              a(),x(e.currentTarget.scrollLeft>0)
            }} className="h-full overflow-auto">
              <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                <caption className="sr-only">Weekly dock utilization by site</caption>
                <thead className={rk(rv,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" aria-sort={"site"===h.key?"asc"===h.dir?"ascending":"descending":"none"} className={rk(ry,rv,rw,rS,"sticky left-0 z-10")}><rz label="Site" sortKey="site" sort={h} onSort={b} /></th>
                    {rL.map(e=><th key={e} scope="col" className={rk(ry,"min-w-[64px] text-right")}>{e}</th>)}
                    <th scope="col" aria-sort={"peak"===h.key?"asc"===h.dir?"ascending":"descending":"none"} className={rk(ry,"min-w-[72px] text-right")}><rz label="Peak" sortKey="peak" sort={h} onSort={b} align="right" /></th>
                    <th scope="col" className={rk(ry,"w-[120px]")}>Risk</th>
                    <th scope="col" className={rk(ry,rS,"w-[100px] text-right")}>Dock</th>
                  </tr>
                </thead>
                <tbody>
                  {m.map(e=>(
                    <tr key={e.site} onPointerEnter={()=>c(e.site)} onPointerLeave={()=>c(r=>r===e.site?null:r)} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                    <th scope="row" className={rk(rN,(u||i!==e.site)&&rf,rw,rj,rS,"sticky left-0 z-10 max-w-[220px] text-left")}>
                                      <span className="block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">{e.site}</span>
                                    </th>
                                    {e.days.map((e,r)=>(
                                      <td key={r} className={rk(rN,rC)}>
                                                        <span className={e>=95?rj:rg}>
                                                          {e}
                                                          %
                                                        </span>
                                                      </td>
                                    ))}
                                    <td className={rk(rN,rC,rj)}>
                                      {e.peak}
                                      %
                                    </td>
                                    <td className={rN}><rD risk={e.risk} /></td>
                                    <td className={rk(rN,rC,rS)}><span className={rg}>{e.dock}</span></td>
                                  </tr>
                  ))}
                </tbody>
              </table>
              {0===m.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={rk(rg,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={2} /></span>
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No sites match that search</p>
                <p className={rk("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a site name or a dock number.</p>
                <button type="button" onClick={()=>s("")} className={rk("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>Clear search</button>
              </div>}
            </div>
            <div aria-hidden="true" className={rk("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={rk(rv,"text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <span>
              {m.length}
              {" of "}
              {rA.length}
              {" sites"}
            </span>
            <span>
              {k}
              {" above 95% peak"}
            </span>
          </footer>
        </div>
      </div>
  );
}
