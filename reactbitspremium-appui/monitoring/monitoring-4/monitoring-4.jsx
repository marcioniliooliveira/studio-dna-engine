/**
 * React Bits Pro — Application UI (monitoring-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_33212 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 3.12589C8.88491 2.48978 9.95074 2.08864 11.1071 2.01285C11.3031 2 11.5353 2 11.9995 2C12.4638 2 12.696 2 12.892 2.01285C15.8965 2.20977 18.2898 4.60304 18.4867 7.60758C18.4995 7.80358 18.4995 8.03572 18.4995 8.5V9.8056C18.4995 10.5353 18.4995 10.9002 18.5356 11.254C18.6477 12.354 19.0187 13.4119 19.6184 14.3409C19.8113 14.6397 20.0392 14.9246 20.4951 15.4944L20.6648 15.7066C20.7508 15.814 20.8286 15.9113 20.8986 16",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 18H4.43654C3.70878 18 3.3449 18 3.13431 17.8951C2.72509 17.6913 2.50621 17.2359 2.60268 16.789C2.65233 16.559 2.87964 16.2749 3.33427 15.7066L3.50401 15.4944C3.95985 14.9246 4.18779 14.6397 4.38067 14.3409C4.98035 13.4119 5.35143 12.354 5.46349 11.254C5.49954 10.9002 5.49954 10.5353 5.49954 9.8056V8.5C5.49954 8.03572 5.49954 7.80358 5.51239 7.60758C5.54913 7.04701 5.66232 6.50772 5.84168 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 2L22 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  m = c(h,x),
  f = c("text-[12px]/[16px] font-[450] tabular-nums",x),
  g = [{id:"a1",rule:"Checkout p99 above budget",service:"payments-edge",severity:"Critical",condition:"p99 latency > 8s for 5m",observed:"11.4s",duration:"38m",state:"firing",seed:1.2,runbook:"Drain the failing region, then raise the charge worker pool to 240."},{id:"a2",rule:"Error rate spike",service:"api-gateway",severity:"Critical",condition:"5xx rate > 2% for 3m",observed:"4.1%",duration:"12m",state:"firing",seed:3.4,runbook:"Check the last deploy, roll back if the spike matches the release marker."},{id:"a3",rule:"Queue depth climbing",service:"invoice-worker",severity:"Warning",condition:"depth > 5,000 for 10m",observed:"7,318",duration:"1h 04m",state:"firing",seed:5.6,runbook:"Scale consumers to 12 and confirm the vendor webhook is responding."},{id:"a4",rule:"Disk usage nearing limit",service:"search-api",severity:"Warning",condition:"disk > 85% for 15m",observed:"88%",duration:"22m",state:"pending",seed:7.8,runbook:"Rotate the index snapshots older than 14 days."},{id:"a5",rule:"Certificate expiring",service:"edge-proxy",severity:"Info",condition:"expiry < 14d",observed:"9 days",duration:"2d",state:"pending",seed:9.1,runbook:"Renewal is automated; confirm the ACME job ran on Sunday."},{id:"a6",rule:"Cache hit ratio dropped",service:"catalog-api",severity:"Warning",condition:"hit ratio < 90% for 10m",observed:"94%",duration:"resolved 14:02",state:"resolved",seed:11.3,runbook:"Warm the catalog cache after a bulk import."},{id:"a7",rule:"Replication lag",service:"orders-db",severity:"Critical",condition:"lag > 30s for 5m",observed:"4s",duration:"resolved 11:47",state:"resolved",seed:13.7,runbook:"Lag clears on its own once the nightly vacuum finishes."}],
  k = [{id:"all",label:"All"},{id:"firing",label:"Firing"},{id:"pending",label:"Pending"},{id:"resolved",label:"Resolved"}],
  v = {Critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",Warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Info:"text-neutral-900/66 dark:text-neutral-100/66"};

function w({seed:e,alarming:t}){
  let r=useMemo(()=>Array.from({length:24},(t,r)=>.35+.32*Math.sin(.55*r+e)+.22*Math.sin(.19*r+2.3*e)), [e]);
  return (
    <span aria-hidden className="flex h-6 items-end gap-[2px]">
        {r.map((e,n)=><span key={n} style={{height:`${Math.max(12,Math.min(100,100*e))}%`}} className={c("w-[3px] rounded-[1px]",t&&n>r.length-7?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":"bg-neutral-900/8 dark:bg-neutral-100/8")} />)}
      </span>
  );
}

function _(){
  let[e,t]=useState("firing"),[r,_]=useState(""),[j,y]=useState("a1"),[N,S]=useState(Object.fromEntries(g.map(e=>[e.id,e.state]))),{ref:z,edges:A,onScroll:R}=function(){
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
  }(),C=useMemo(()=>{
    let t=r.trim().toLowerCase();
    return g.filter(r=>{
      let a=N[r.id];
      return ("all"===e||a===e)&&(!t||r.rule.toLowerCase().includes(t)||r.service.toLowerCase().includes(t));
    });
  }, [e,r,N]);
  useEffect(()=>R(), [C,j,R]);
  let E=e=>"all"===e?g.length:g.filter(t=>N[t.id]===e).length;
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Alerts</h2>
                <p className={c(m,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>
                    {E("firing")}
                    {" firing"}
                  </span>
                  <span>
                    {E("pending")}
                    {" pending"}
                  </span>
                  <span>evaluated every 30s</span>
                </p>
              </div>
              <button type="button" onClick={()=>S(e=>{
                let t={...e};
                return g.forEach(e=>{
                  "firing"===t[e.id]&&(t[e.id]="silenced")
                }),t;
              })} className={c(p,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_33212} size={16} strokeWidth={1.8} aria-hidden="true" />
                Silence firing
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Alert state" className={c("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                {k.map(r=>(
                  <button key={r.id} type="button" role="radio" aria-checked={r.id===e} onClick={()=>t(r.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">
                                {r.label}
                                <span className={f}>{E(r.id)}</span>
                              </button>
                ))}
              </div>
              <div className="relative min-w-0 flex-1 sm:max-w-[260px]">
                <label htmlFor="monitoring-4-search" className="sr-only">Search alerts</label>
                <div className={c("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input id="monitoring-4-search" value={r} onChange={e=>_(e.target.value)} placeholder="Search rule or service" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                </div>
              </div>
            </div>
          </div>
          <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={z} onScroll={R} className="h-full overflow-y-auto">
              {0===C.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={x} />
                <p className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>Nothing to look at</p>
                <p className={c("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>No alerts match this view. Quiet is the expected state.</p>
              </div>:<ul className={c("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","p-1")}>
                {C.map(e=>{
                  let t=N[e.id],r=j===e.id,n="firing"===t;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-expanded={r} onClick={()=>y(r?null:e.id)} className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","group px-2")}>
                                      <span className="flex size-4 shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </span>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className={c("flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                          <span className="min-w-0 truncate">{e.rule}</span>
                                          <span className={c("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",v[e.severity])}>{e.severity}</span>
                                        </span>
                                        <span className={c(m,"flex flex-wrap gap-x-3")}>
                                          <span>{e.service}</span>
                                          <span>{e.condition}</span>
                                        </span>
                                      </span>
                                      <span className="hidden shrink-0 sm:block"><w seed={e.seed} alarming={n} /></span>
                                      <span className={c("text-right tabular-nums","w-[96px] shrink-0")}>
                                        <span className={c("text-[14px]/[16px] font-[450]",n?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":u,"block")}>{e.observed}</span>
                                        <span className={c("text-[12px]/[16px] font-normal tabular-nums",x,"mt-0.5 block truncate")}>{"silenced"===t?"silenced":e.duration}</span>
                                      </span>
                                    </button>
                                    {r&&<div className="px-2 pb-3 pl-9">
                                      <p className={c(h,"text-neutral-900/80 dark:text-neutral-100/80")}>{e.runbook}</p>
                                      <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <button type="button" onClick={()=>S(t=>({...t,[e.id]:"resolved"}))} className={c(p,b)}>
                                          <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          Mark resolved
                                        </button>
                                        <button type="button" onClick={()=>S(t=>({...t,[e.id]:"silenced"===t[e.id]?e.state:"silenced"}))} className={c(p,b)}>
                                          <HugeiconsIcon icon={Icon_33212} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          {"silenced"===t?"Unsilence":"Silence 2h"}
                                        </button>
                                      </div>
                                    </div>}
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={c("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","flex-wrap")}>
            <p className={c("text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","me-auto")}>
              {"Showing "}
              {C.length}
              {" of "}
              {g.length}
              {" rules"}
            </p>
            <button type="button" onClick={()=>S(Object.fromEntries(g.map(e=>[e.id,e.state])))} className={c(p,b)}>Reset states</button>
          </div>
        </div>
      </div>
  );
}


export default _;
