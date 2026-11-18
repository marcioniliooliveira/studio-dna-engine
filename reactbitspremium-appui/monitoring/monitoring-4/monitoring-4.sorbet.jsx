/**
 * React Bits Pro — Application UI (monitoring-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_33212 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 3.12589C8.88491 2.48978 9.95074 2.08864 11.1071 2.01285C11.3031 2 11.5353 2 11.9995 2C12.4638 2 12.696 2 12.892 2.01285C15.8965 2.20977 18.2898 4.60304 18.4867 7.60758C18.4995 7.80358 18.4995 8.03572 18.4995 8.5V9.8056C18.4995 10.5353 18.4995 10.9002 18.5356 11.254C18.6477 12.354 19.0187 13.4119 19.6184 14.3409C19.8113 14.6397 20.0392 14.9246 20.4951 15.4944L20.6648 15.7066C20.7508 15.814 20.8286 15.9113 20.8986 16",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 18H4.43654C3.70878 18 3.3449 18 3.13431 17.8951C2.72509 17.6913 2.50621 17.2359 2.60268 16.789C2.65233 16.559 2.87964 16.2749 3.33427 15.7066L3.50401 15.4944C3.95985 14.9246 4.18779 14.6397 4.38067 14.3409C4.98035 13.4119 5.35143 12.354 5.46349 11.254C5.49954 10.9002 5.49954 10.5353 5.49954 9.8056V8.5C5.49954 8.03572 5.49954 7.80358 5.51239 7.60758C5.54913 7.04701 5.66232 6.50772 5.84168 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 2L22 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let eR = (...e)=>e.filter(Boolean).join(" ");

let eC = "text-neutral-900 dark:text-neutral-100";

let eE = "text-neutral-900/62 dark:text-neutral-100/62";

let eM = "text-[14px]/[20px] font-medium";

let eD = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eW = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eP = eR(eM,eE);

let eL = eR("text-[13px]/[16px] font-bold tabular-nums",eE);

let eO = [{id:"a1",rule:"Checkout p99 above budget",service:"payments-edge",severity:"Critical",condition:"p99 latency > 8s for 5m",observed:"11.4s",duration:"38m",state:"firing",seed:1.2,runbook:"Drain the failing region, then raise the charge worker pool to 240."},{id:"a2",rule:"Error rate spike",service:"api-gateway",severity:"Critical",condition:"5xx rate > 2% for 3m",observed:"4.1%",duration:"12m",state:"firing",seed:3.4,runbook:"Check the last deploy, roll back if the spike matches the release marker."},{id:"a3",rule:"Queue depth climbing",service:"invoice-worker",severity:"Warning",condition:"depth > 5,000 for 10m",observed:"7,318",duration:"1h 04m",state:"firing",seed:5.6,runbook:"Scale consumers to 12 and confirm the vendor webhook is responding."},{id:"a4",rule:"Disk usage nearing limit",service:"search-api",severity:"Warning",condition:"disk > 85% for 15m",observed:"88%",duration:"22m",state:"pending",seed:7.8,runbook:"Rotate the index snapshots older than 14 days."},{id:"a5",rule:"Certificate expiring",service:"edge-proxy",severity:"Info",condition:"expiry < 14d",observed:"9 days",duration:"2d",state:"pending",seed:9.1,runbook:"Renewal is automated; confirm the ACME job ran on Sunday."},{id:"a6",rule:"Cache hit ratio dropped",service:"catalog-api",severity:"Warning",condition:"hit ratio < 90% for 10m",observed:"94%",duration:"resolved 14:02",state:"resolved",seed:11.3,runbook:"Warm the catalog cache after a bulk import."},{id:"a7",rule:"Replication lag",service:"orders-db",severity:"Critical",condition:"lag > 30s for 5m",observed:"4s",duration:"resolved 11:47",state:"resolved",seed:13.7,runbook:"Lag clears on its own once the nightly vacuum finishes."}];

let e$ = [{id:"all",label:"All"},{id:"firing",label:"Firing"},{id:"pending",label:"Pending"},{id:"resolved",label:"Resolved"}];

let eT = {Critical:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",Warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Info:"text-neutral-900/62 dark:text-neutral-100/62"};

function eI({seed:e,alarming:a}){
  let r=useMemo(()=>Array.from({length:24},(a,r)=>.35+.32*Math.sin(.55*r+e)+.22*Math.sin(.19*r+2.3*e)), [e]);
  return (
    <span aria-hidden className="flex h-6 items-end gap-[2px]">
        {r.map((e,n)=><span key={n} style={{height:`${Math.max(12,Math.min(100,100*e))}%`}} className={eR("w-[3px] rounded-[1px]",a&&n>r.length-7?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":"bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8")} />)}
      </span>
  );
}


export default function monitoring_4__Sorbet__Component(){
  let[e,a]=useState("firing"),[r,l]=useState(""),[i,s]=useState("a1"),[c,d]=useState(Object.fromEntries(eO.map(e=>[e.id,e.state]))),{ref:_,edges:x,onScroll:u}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),b=useMemo(()=>{
    let a=r.trim().toLowerCase();
    return eO.filter(r=>{
      let t=c[r.id];
      return ("all"===e||t===e)&&(!a||r.rule.toLowerCase().includes(a)||r.service.toLowerCase().includes(a));
    });
  }, [e,r,c]);
  useEffect(()=>u(), [b,i,u]);
  let h=e=>"all"===e?eO.length:eO.filter(a=>c[a.id]===e).length;
  return (
    <div className={eR("bg-white dark:bg-neutral-950",eC,"flex h-full min-h-[720px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={eR("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="px-4 py-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className={eR("text-[17px]/[22px] font-extrabold","truncate")}>Alerts</h2>
                <p className={eR(eP,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>
                    {h("firing")}
                    {" firing"}
                  </span>
                  <span>
                    {h("pending")}
                    {" pending"}
                  </span>
                  <span>evaluated every 30s</span>
                </p>
              </div>
              <button type="button" onClick={()=>d(e=>{
                let a={...e};
                return eO.forEach(e=>{
                  "firing"===a[e.id]&&(a[e.id]="silenced")
                }),a;
              })} className={eR(eD,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                <HugeiconsIcon icon={Icon_33212} size={18} strokeWidth={2} aria-hidden="true" />
                Silence firing
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Alert state" className={eR("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                {e$.map(r=>(
                  <button key={r.id} type="button" role="radio" aria-checked={r.id===e} onClick={()=>a(r.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">
                                {r.label}
                                <span className={eL}>{h(r.id)}</span>
                              </button>
                ))}
              </div>
              <div className="relative min-w-0 flex-1 sm:max-w-[260px]">
                <label htmlFor="monitoring-4-search" className="sr-only">Search alerts</label>
                <div className={eR("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <input id="monitoring-4-search" value={r} onChange={e=>l(e.target.value)} placeholder="Search rule or service" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                </div>
              </div>
            </div>
          </div>
          <div className={eR("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
            <div ref={_} onScroll={u} className="h-full overflow-y-auto">
              {0===b.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={2} aria-hidden="true" className={eE} />
                <p className={eR("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-3")}>Nothing to look at</p>
                <p className={eR("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>No alerts match this view. Quiet is the expected state.</p>
              </div>:<ul className={eR("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-1")}>
                {b.map(e=>{
                  let a=c[e.id],r=i===e.id,n="firing"===a;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-expanded={r} onClick={()=>s(r?null:e.id)} className={eR("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","rounded-[var(--rb-r-4xl,18px)]","group px-2")}>
                                      <span className="flex size-4 shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </span>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className={eR("flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                          <span className="min-w-0 truncate">{e.rule}</span>
                                          <span className={eR("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",eT[e.severity])}>{e.severity}</span>
                                        </span>
                                        <span className={eR(eP,"flex flex-wrap gap-x-3")}>
                                          <span>{e.service}</span>
                                          <span>{e.condition}</span>
                                        </span>
                                      </span>
                                      <span className="hidden shrink-0 sm:block"><eI seed={e.seed} alarming={n} /></span>
                                      <span className={eR("text-right tabular-nums","w-[96px] shrink-0")}>
                                        <span className={eR("text-[15px]/[20px] font-bold",n?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":eC,"block")}>{e.observed}</span>
                                        <span className={eR("text-[13px]/[16px] font-semibold tabular-nums",eE,"mt-0.5 block truncate")}>{"silenced"===a?"silenced":e.duration}</span>
                                      </span>
                                    </button>
                                    {r&&<div className="px-2 pb-3 pl-9">
                                      <p className={eR(eM,"text-neutral-900/78 dark:text-neutral-100/78")}>{e.runbook}</p>
                                      <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <button type="button" onClick={()=>d(a=>({...a,[e.id]:"resolved"}))} className={eR(eD,eW)}>
                                          <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                                          Mark resolved
                                        </button>
                                        <button type="button" onClick={()=>d(a=>({...a,[e.id]:"silenced"===a[e.id]?e.state:"silenced"}))} className={eR(eD,eW)}>
                                          <HugeiconsIcon icon={Icon_33212} size={18} strokeWidth={2} aria-hidden="true" />
                                          {"silenced"===a?"Unsilence":"Silence 2h"}
                                        </button>
                                      </div>
                                    </div>}
                                  </li>
                  );
                })}
              </ul>}
            </div>
            <div aria-hidden="true" className={eR("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eR("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={eR("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","flex-wrap")}>
            <p className={eR("text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","me-auto")}>
              {"Showing "}
              {b.length}
              {" of "}
              {eO.length}
              {" rules"}
            </p>
            <button type="button" onClick={()=>d(Object.fromEntries(eO.map(e=>[e.id,e.state])))} className={eR(eD,eW)}>Reset states</button>
          </div>
        </div>
      </div>
  );
}
