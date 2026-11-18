/**
 * React Bits Pro — Application UI (tool-calls-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  h = "text-neutral-900 dark:text-neutral-100",
  f = "text-neutral-900/80 dark:text-neutral-100/80",
  k = "text-neutral-900/66 dark:text-neutral-100/66",
  v = u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",x),
  g = u("text-[12px]/[16px] font-normal tabular-nums",p),
  _ = [{id:"call_01",name:"read_file",target:"app/api/checkout/route.ts",duration:"38ms",status:"done"},{id:"call_02",name:"codebase_search",target:"where is the retry backoff configured",duration:"1.24s",status:"done"},{id:"call_03",name:"grep",target:"RETRY_BACKOFF_MS across the services directory",duration:"112ms",status:"done"},{id:"call_04",name:"edit_file",target:"services/payments/retry.ts",duration:"0.94s",status:"running"},{id:"call_05",name:"run_terminal",target:"pnpm test payments --runInBand",status:"streaming"},{id:"call_06",name:"web_search",target:"Halcyon Pay idempotency key best practices",duration:"2.10s",status:"done"},{id:"call_07",name:"fetch_url",target:"https://docs.halcyonpay.com/api/idempotent_requests",status:"failed"},{id:"call_08",name:"apply_patch",target:"services/payments/idempotency.ts",duration:"0.61s",status:"approved"},{id:"call_09",name:"read_file",target:"services/payments/__tests__/retry.test.ts",duration:"41ms",status:"done"},{id:"call_10",name:"run_terminal",target:"pnpm lint --filter payments",duration:"3.40s",status:"failed"},{id:"call_11",name:"send_email",target:"Q3 renewal summary to 4 recipients",status:"awaiting"},{id:"call_12",name:"delete_file",target:"services/payments/legacy/backoff.ts",status:"skipped"}],
  w = {streaming:"Streaming",running:"Running",awaiting:"Needs approval",approved:"Approved",done:"Done",failed:"Failed",stopped:"Stopped",skipped:"Skipped"},
  y = {streaming:h,running:h,awaiting:h,approved:f,done:f,failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",stopped:k,skipped:k},
  j = e=>"streaming"===e||"running"===e;

function N({status:e}){
  if(j(e))return <span aria-hidden="true" className={u("inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none","text-neutral-900/80 dark:text-neutral-100/80")} />;
  if("awaiting"===e)return null;
  let t="failed"===e,r="stopped"===e||"skipped"===e;
  return <HugeiconsIcon icon={t?Icon_89289:r?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={t?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":p} />;
}

let z = [{id:"all",label:"All"},{id:"running",label:"Running"},{id:"failed",label:"Failed"}],
  S = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function A(){
  let[e,t]=useState(_),[r,i]=useState("all"),{ref:l,edges:o,onScroll:p}=function(){
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
  }(),h=e.some(e=>j(e.status)),f=useMemo(()=>"all"===r?e:"running"===r?e.filter(e=>j(e.status)):e.filter(e=>"failed"===e.status), [e,r]),k=useCallback(()=>{
    t(e=>e.map(e=>j(e.status)?{...e,status:"stopped"}:e))
  }, []),A=useRef([]);
  useEffect(()=>()=>{
    A.current.forEach(window.clearTimeout)
  }, []);
  let R=useCallback(e=>{
    t(t=>t.map(t=>t.id===e?{...t,status:"running",duration:undefined}:t)),A.current.push(window.setTimeout(()=>{
      t(t=>t.map(t=>t.id===e?{...t,status:"done",duration:"0.80s"}:t))
    },900))
  }, []);
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 shrink-0">
          <div className="flex min-h-8 items-center justify-between gap-3">
            <h2 className={v}>Tool activity</h2>
            {h?<button type="button" onClick={k} className={u(m,b)}>
              <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
              Stop
            </button>:<span className={g}>
              {e.length}
              {" calls"}
            </span>}
          </div>
          <div role="radiogroup" aria-label="Filter calls" onKeyDown={S} className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","mt-3")}>
            {z.map(e=><button key={e.id} type="button" role="radio" aria-checked={r===e.id} tabIndex={r===e.id?0:-1} onClick={()=>i(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
          </div>
        </header>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            {0===f.length?<div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                {"No "}
                {"running"===r?"running":"failed"}
                {" calls."}
              </p>
              <button type="button" onClick={()=>i("all")} className={u(m,b)}>Show all calls</button>
            </div>:<div ref={l} onScroll={p} className={u("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]")}>
              {f.map(e=>(
                <div key={e.id} className="p-1">
                            <div className={u("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","failed"===e.status&&"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]","rounded-[var(--rb-r-sm,6px)]","text-[13px]/[18px] font-normal","h-8 content-center px-2")}>
                              <span className="flex size-4 shrink-0 items-center justify-center"><N status={e.status} /></span>
                              <span className="flex min-w-0 flex-1 items-baseline gap-3">
                                <span className={u("shrink-0 text-neutral-900/80 dark:text-neutral-100/80","font-mono text-[12px]/[16px] tabular-nums","truncate sm:w-32")}>{e.name}</span>
                                <span className={u("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100","hidden flex-1 sm:block")}>{e.target}</span>
                              </span>
                              <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                                <span className="hidden w-12 text-right sm:block">{e.duration}</span>
                                {"awaiting"===e.status?<span className="flex w-28 justify-end">
                                  <span className="inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{w[e.status]}</span>
                                </span>:<span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",y[e.status],"w-28 justify-end")}>{w[e.status]}</span>}
                              </span>
                              <div className="flex w-7 shrink-0 justify-end">
                                {"failed"===e.status&&<button type="button" onClick={()=>R(e.id)} title="Retry" aria-label={`Retry ${e.name}`} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                                  <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                </button>}
                              </div>
                            </div>
                          </div>
              ))}
            </div>}
            <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",o.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",o.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default A;
