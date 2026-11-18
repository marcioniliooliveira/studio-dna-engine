/**
 * React Bits Pro — Application UI (monitoring-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_69844 = [["path",{d:"M12 16V3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 21H18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7 12C7 12 10.6824 17 12 17C13.3176 17 17 12 17 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_41772 = [["path",{d:"M8.73792 7.78021L4.84693 11.7574C3.67722 12.953 3.09236 13.5508 3.01263 14.2802C2.99579 14.4343 2.99579 14.5899 3.01263 14.744C3.09236 15.4733 3.67722 16.0711 4.84693 17.2668L4.99601 17.4191C5.62049 18.0575 5.93274 18.3766 6.30638 18.5911C6.5236 18.7157 6.75482 18.8134 6.99505 18.882C7.40827 19 7.85149 19 8.73792 19C9.62436 19 10.0676 19 10.4808 18.882C10.721 18.8134 10.9522 18.7157 11.1695 18.5911C11.5431 18.3766 11.8554 18.0575 12.4798 17.4191L15.3239 14.5121M8.73792 7.78021L12.3199 4.12313C13.7065 2.70754 14.3997 1.99974 15.2627 2C16.1256 2.00026 16.8185 2.70846 18.2042 4.12487L18.9473 4.8845C20.3159 6.28342 21.0002 6.98288 21 7.85008C20.9997 8.71728 20.315 9.41633 18.9456 10.8144L15.3239 14.5121M8.73792 7.78021L15.3239 14.5121",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 22L21 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  p = u("text-[13px]/[18px] font-normal",x),
  b = [{id:"all",label:"All"},{id:"error",label:"Error"},{id:"warn",label:"Warn"},{id:"info",label:"Info"},{id:"debug",label:"Debug"}],
  m = {error:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warn:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",info:x,debug:x},
  f = [{level:"info",service:"api-gateway",message:"GET /v2/orders 200 in 42ms",context:'{ "route": "/v2/orders", "region": "eu-west-1", "cache": "hit" }'},{level:"debug",service:"catalog-api",message:"cache warm complete for tenant 4821",context:'{ "keys": 1284, "took_ms": 612 }'},{level:"warn",service:"invoice-worker",message:"vendor responded 503, scheduling retry 2 of 5",context:'{ "vendor": "northwind-billing", "backoff_ms": 4000 }'},{level:"info",service:"payments-edge",message:"charge authorised for ORD-99214",context:'{ "amount": "1240.00", "currency": "EUR", "took_ms": 388 }'},{level:"error",service:"payments-edge",message:"charge timed out after 8s, releasing the hold",context:'{ "order": "ORD-99187", "attempt": 3, "pool": "exhausted" }'},{level:"info",service:"search-api",message:"reindex batch 18/64 committed",context:'{ "docs": 4200, "lag_s": 1.2 }'},{level:"debug",service:"edge-proxy",message:"upstream health probe ok",context:'{ "upstream": "orders-db", "rtt_ms": 3 }'},{level:"warn",service:"search-api",message:"embeddings index read latency 1.9s",context:'{ "shard": 7, "threshold_ms": 1200 }'}],
  g = e=>{
  let t,r,a;
  return {...f[e%f.length],id:e,at:(r=Math.floor((t=32640+7*e)/3600)%24,a=Math.floor(t%3600/60),`${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`)};
},
  k = Array.from({length:22},(e,t)=>g(t)),
  v = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function w(){
  let e=useRef(null),[t,r]=useState(k),[f,w]=useState(true),[_,j]=useState(true),[y,N]=useState("all"),[S,z]=useState(""),[A,R]=useState(null),C=useRef(k.length),{ref:E,edges:M,onScroll:D}=function(){
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
  }();
  useEffect(()=>{
    if(!f)return;
    let t=e.current?.ownerDocument.defaultView??window,a=t.setInterval(()=>{
      r(e=>{
        let t=g(C.current);
        return C.current+=1,[...e.slice(-140),t];
      })
    },1200);
    return ()=>t.clearInterval(a);
  }, [f]);
  let W=useMemo(()=>{
    let e=S.trim().toLowerCase();
    return t.filter(t=>("all"===y||t.level===y)&&(!e||t.message.toLowerCase().includes(e)||t.service.toLowerCase().includes(e)));
  }, [t,y,S]);
  useEffect(()=>{
    let e=E.current;
    e&&_&&(e.scrollTop=e.scrollHeight)
  }, [W,_,E]),useEffect(()=>D(), [W,A,D]);
  let P=t.filter(e=>"error"===e.level).length;
  return (
    <div ref={e} className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[680px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Live tail</h2>
                  <span className={u("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",f?"text-neutral-900 dark:text-neutral-100":"text-neutral-900/66 dark:text-neutral-100/66")}>
                    {f&&<span className="flex h-lh shrink-0 items-center">
                      <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                    </span>}
                    {f?"Streaming":"Paused"}
                  </span>
                </div>
                <p className={u(p,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>production</span>
                  <span>all services</span>
                  <span>
                    {P}
                    {" errors in view"}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={()=>j(e=>!e)} aria-pressed={_} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                  <HugeiconsIcon icon={Icon_69844} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Follow
                </button>
                <button type="button" onClick={()=>w(e=>!e)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                  <HugeiconsIcon icon={f?Icon_81520:Icon_48318} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {f?"Pause":"Resume"}
                </button>
                <button type="button" aria-label="Clear the buffer" onClick={()=>{
                  r([]),R(null)
                }} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                  <HugeiconsIcon icon={Icon_41772} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Log level" onKeyDown={v} className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                {b.map(e=><button key={e.id} type="button" role="radio" aria-checked={e.id===y} tabIndex={e.id===y?0:-1} onClick={()=>N(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
              </div>
              <div className="relative min-w-0 flex-1 max-sm:basis-full sm:max-w-[280px]">
                <label htmlFor="monitoring-5-search" className="sr-only">Filter log lines</label>
                <div className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <input id="monitoring-5-search" value={S} onChange={e=>z(e.target.value)} placeholder="Filter by message or service" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                </div>
              </div>
            </div>
          </div>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={E} onScroll={D} className="h-full overflow-y-auto py-1.5">
              {0===W.length?<div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No lines in view</p>
                <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                  {0===t.length?"The buffer is empty. Resume the stream to start collecting again.":"Nothing matches the current level and filter."}
                </p>
              </div>:<ul>
                {W.map(e=>(
                  <li key={e.id}>
                                <button type="button" aria-expanded={A===e.id} onClick={()=>R(A===e.id?null:e.id)} className={u("font-mono text-[13px]/[20px] tabular-nums","error"===e.level?"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex w-full min-w-full cursor-pointer items-start gap-3 px-3 py-[5px] text-left")}>
                                  <span className={u(x,"shrink-0")}>{e.at}</span>
                                  <span className={u("inline-flex w-[5ch] shrink-0",m[e.level])}>{e.level}</span>
                                  <span className={u(x,"hidden w-[120px] shrink-0 truncate sm:block")}>{e.service}</span>
                                  <span className={u("text-neutral-900/80 dark:text-neutral-100/80","min-w-0 flex-1 truncate")}>{e.message}</span>
                                </button>
                                {A===e.id&&<pre className={u("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","mx-3 mb-1")}>{e.context}</pre>}
                              </li>
                ))}
              </ul>}
            </div>
            <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",M.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",M.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={u("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","flex-wrap justify-between")}>
            <p className={u(h,"flex flex-wrap gap-x-3")}>
              <span>
                {W.length}
                {" of "}
                {t.length}
                {" lines"}
              </span>
              <span>buffer capped at 140</span>
            </p>
            <p className={h}>~50 lines/min</p>
          </div>
        </div>
      </div>
  );
}


export default w;
