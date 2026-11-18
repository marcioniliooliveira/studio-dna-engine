/**
 * React Bits Pro — Application UI (tool-calls-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900 dark:text-neutral-100";

let x = "text-neutral-900/78 dark:text-neutral-100/78";

let p = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[13px]/[16px] font-semibold tabular-nums";

let W = (...e)=>e.filter(Boolean).join(" ");

let q = "text-neutral-900 dark:text-neutral-100";

let H = "text-neutral-900/62 dark:text-neutral-100/62";

let D = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let O = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let F = "text-neutral-900 dark:text-neutral-100";

let B = "text-neutral-900/78 dark:text-neutral-100/78";

let P = "text-neutral-900/62 dark:text-neutral-100/62";

let $ = W("text-[17px]/[22px] font-extrabold",q);

let V = W("text-[13px]/[16px] font-semibold tabular-nums",H);

let K = [{id:"call_01",name:"read_file",target:"app/api/checkout/route.ts",duration:"38ms",status:"done"},{id:"call_02",name:"codebase_search",target:"where is the retry backoff configured",duration:"1.24s",status:"done"},{id:"call_03",name:"grep",target:"RETRY_BACKOFF_MS across the services directory",duration:"112ms",status:"done"},{id:"call_04",name:"edit_file",target:"services/payments/retry.ts",duration:"0.94s",status:"running"},{id:"call_05",name:"run_terminal",target:"pnpm test payments --runInBand",status:"streaming"},{id:"call_06",name:"web_search",target:"Halcyon Pay idempotency key best practices",duration:"2.10s",status:"done"},{id:"call_07",name:"fetch_url",target:"https://docs.halcyonpay.com/api/idempotent_requests",status:"failed"},{id:"call_08",name:"apply_patch",target:"services/payments/idempotency.ts",duration:"0.61s",status:"approved"},{id:"call_09",name:"read_file",target:"services/payments/__tests__/retry.test.ts",duration:"41ms",status:"done"},{id:"call_10",name:"run_terminal",target:"pnpm lint --filter payments",duration:"3.40s",status:"failed"},{id:"call_11",name:"send_email",target:"Q3 renewal summary to 4 recipients",status:"awaiting"},{id:"call_12",name:"delete_file",target:"services/payments/legacy/backoff.ts",status:"skipped"}];

let U = {streaming:"Streaming",running:"Running",awaiting:"Needs approval",approved:"Approved",done:"Done",failed:"Failed",stopped:"Stopped",skipped:"Skipped"};

let Y = {streaming:F,running:F,awaiting:F,approved:B,done:B,failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",stopped:P,skipped:P};

let Q = e=>"streaming"===e||"running"===e;

function Z({status:e}){
  if(Q(e))return <span aria-hidden="true" className={W("inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none","text-neutral-900/78 dark:text-neutral-100/78")} />;
  if("awaiting"===e)return null;
  let t="failed"===e,r="stopped"===e||"skipped"===e;
  return <HugeiconsIcon icon={t?Icon_89289:r?Icon_99199:Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className={t?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":H} />;
}

let J = [{id:"all",label:"All"},{id:"running",label:"Running"},{id:"failed",label:"Failed"}];

let G = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};


export default function tool_calls_2__Sorbet__Component(){
  let[e,t]=useState(K),[r,i]=useState("all"),{ref:l,edges:c,onScroll:d}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),u=e.some(e=>Q(e.status)),_=useMemo(()=>"all"===r?e:"running"===r?e.filter(e=>Q(e.status)):e.filter(e=>"failed"===e.status), [e,r]),x=useCallback(()=>{
    t(e=>e.map(e=>Q(e.status)?{...e,status:"stopped"}:e))
  }, []),p=useRef([]);
  useEffect(()=>()=>{
    p.current.forEach(window.clearTimeout)
  }, []);
  let b=useCallback(e=>{
    t(t=>t.map(t=>t.id===e?{...t,status:"running",duration:undefined}:t)),p.current.push(window.setTimeout(()=>{
      t(t=>t.map(t=>t.id===e?{...t,status:"done",duration:"0.80s"}:t))
    },900))
  }, []);
  return (
    <div className={W("bg-white dark:bg-neutral-950",q,"relative flex h-full min-h-[760px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 shrink-0">
          <div className="flex min-h-8 items-center justify-between gap-3">
            <h2 className={$}>Tool activity</h2>
            {u?<button type="button" onClick={x} className={W(D,O)}>
              <HugeiconsIcon icon={Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
              Stop
            </button>:<span className={V}>
              {e.length}
              {" calls"}
            </span>}
          </div>
          <div role="radiogroup" aria-label="Filter calls" onKeyDown={G} className={W("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","mt-3")}>
            {J.map(e=><button key={e.id} type="button" role="radio" aria-checked={r===e.id} tabIndex={r===e.id?0:-1} onClick={()=>i(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
          </div>
        </header>
        <div className={W("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={W("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            {0===_.length?<div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">
                {"No "}
                {"running"===r?"running":"failed"}
                {" calls."}
              </p>
              <button type="button" onClick={()=>i("all")} className={W(D,O)}>Show all calls</button>
            </div>:<div ref={l} onScroll={d} className={W("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]")}>
              {_.map(e=>(
                <div key={e.id} className="p-1">
                            <div className={W("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","failed"===e.status&&"bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]","rounded-[var(--rb-r-4xl,18px)]","text-[14px]/[20px] font-medium","h-8 content-center px-2")}>
                              <span className="flex size-[18px] shrink-0 items-center justify-center"><Z status={e.status} /></span>
                              <span className="flex min-w-0 flex-1 items-baseline gap-3">
                                <span className={W("shrink-0 text-neutral-900/78 dark:text-neutral-100/78","font-mono text-[12px]/[16px] tabular-nums","truncate sm:w-32")}>{e.name}</span>
                                <span className={W("min-w-[6ch] truncate font-bold text-neutral-900 dark:text-neutral-100","hidden flex-1 sm:block")}>{e.target}</span>
                              </span>
                              <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
                                <span className="hidden w-12 text-right sm:block">{e.duration}</span>
                                {"awaiting"===e.status?<span className="flex w-28 justify-end">
                                  <span className="inline-flex h-5.5 shrink-0 items-center whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] bg-white px-2.5 text-[12px]/[16px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800">{U[e.status]}</span>
                                </span>:<span className={W("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",Y[e.status],"w-28 justify-end")}>{U[e.status]}</span>}
                              </span>
                              <div className="flex w-7 shrink-0 justify-end">
                                {"failed"===e.status&&<button type="button" onClick={()=>b(e.id)} title="Retry" aria-label={`Retry ${e.name}`} className={W("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]")}>
                                  <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                                </button>}
                              </div>
                            </div>
                          </div>
              ))}
            </div>}
            <div aria-hidden="true" className={W("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={W("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
