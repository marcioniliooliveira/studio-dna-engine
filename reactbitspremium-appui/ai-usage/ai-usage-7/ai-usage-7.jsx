/**
 * React Bits Pro — Application UI (ai-usage-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "font-mono text-[12px]/[16px] tabular-nums",
  b = c(x,u),
  h = c("text-[12px]/[16px] font-normal tabular-nums",u),
  m = e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${e}`,
  k = [{id:"req_8f21c4",time:"14:32:08",endpoint:"/v1/messages",model:"Atlas Pro",input:12480,output:1940,ms:4180,cost:.0666,status:"ok"},{id:"req_8f21b0",time:"14:31:54",endpoint:"/v1/messages",model:"Atlas",input:3120,output:806,ms:1240,cost:.0142,status:"ok"},{id:"req_8f2196",time:"14:31:41",endpoint:"/v1/embeddings",model:"Ember",input:48200,output:0,ms:610,cost:.0048,status:"ok"},{id:"req_8f2183",time:"14:31:22",endpoint:"/v1/messages",model:"Atlas Long",input:184600,output:2310,ms:12940,cost:.5884,status:"capped"},{id:"req_8f2170",time:"14:30:58",endpoint:"/v1/messages",model:"Atlas Pro",input:9040,output:1120,ms:3210,cost:.0439,status:"ok"},{id:"req_8f215d",time:"14:30:31",endpoint:"/v1/rerank",model:"Ember Mini",input:22800,output:0,ms:380,cost:.0011,status:"error"},{id:"req_8f214a",time:"14:30:12",endpoint:"/v1/messages",model:"Quill",input:5640,output:1408,ms:1980,cost:.0225,status:"ok"},{id:"req_8f2137",time:"14:29:47",endpoint:"/v1/embeddings",model:"Ember",input:31400,output:0,ms:520,cost:.0031,status:"ok"}],
  f = ["All","Capped","Errors"],
  _ = {ok:"Completed",capped:"Truncated at max tokens",error:"Upstream timeout"};

function g(){
  let[e,a]=useState("All"),[r,g]=useState("req_8f2183"),v=useMemo(()=>k.filter(a=>"All"===e||("Capped"===e?"capped"===a.status:"error"===a.status)), [e]),w=v.reduce((e,a)=>e+a.cost,0);
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[820px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Request log</h2>
              <p className={c(b,"mt-0.5 flex gap-x-3 truncate")}>
                <span>
                  {"Last "}
                  {v.length}
                  {" calls"}
                </span>
                <span className="tabular-nums">
                  $
                  {w.toFixed(4)}
                  {" billed"}
                </span>
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter" onKeyDown={r=>{
              var t,l,n;
              let s;
              return t=f.length,l=f.indexOf(e),n=e=>a(f[e]),void(!((s="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(s),r.currentTarget.querySelectorAll('[role="radio"]')[s]?.focus()));
            }} className={c("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {f.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1 min-h-[340px]")}>
              <div className={c(h,"hidden grid-cols-[68px_minmax(0,1.4fr)_minmax(0,1fr)_72px_72px_76px_20px] items-center gap-3 px-3 py-2.5 sm:grid")}>
                <span>Time</span>
                <span className="ps-6">Request</span>
                <span>Model</span>
                <span className="text-right">Tokens</span>
                <span className="text-right">Latency</span>
                <span className="text-right">Cost</span>
                <span />
              </div>
              {0===v.length?<div className="flex h-[300px] flex-col items-center justify-center gap-1 px-6 text-center">
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Nothing to show</p>
                <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">No calls matched this filter in the current window.</p>
              </div>:v.map(e=>{
                let a=r===e.id;
                return (
                  <div key={e.id} className={c(a&&"bg-neutral-900/9 dark:bg-neutral-100/9")}>
                                <button type="button" aria-expanded={a} onClick={()=>g(a?null:e.id)} className={c(!a&&"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto_20px] items-center gap-x-3 gap-y-1 px-3 py-3 text-left sm:grid-cols-[68px_minmax(0,1.4fr)_minmax(0,1fr)_72px_72px_76px_20px] sm:py-2.5")}>
                                  <span className={c(b,"hidden tabular-nums sm:block")}>{e.time}</span>
                                  <span className="flex min-w-0 items-center gap-2">
                                    <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                                      {"ok"===e.status&&<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} className={u} />}
                                      {"capped"===e.status&&<HugeiconsIcon icon={Icon_36474} size={12} strokeWidth={1.8} className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]" />}
                                      {"error"===e.status&&<HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} className="text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]" />}
                                    </span>
                                    <span className="sr-only">{_[e.status]}</span>
                                    <span className="min-w-0">
                                      <span className={c(p,"block truncate")}>{e.endpoint}</span>
                                      <span className={c(h,"flex gap-x-3 truncate sm:hidden")}>
                                        <span>{e.time}</span>
                                        <span>{e.model}</span>
                                      </span>
                                    </span>
                                  </span>
                                  <span className={c(b,"hidden truncate sm:block")}>{e.model}</span>
                                  <span className={c(b,"hidden text-right tabular-nums sm:block")}>{m(e.input+e.output)}</span>
                                  <span className={c(b,"hidden text-right tabular-nums sm:block")}>
                                    {(e.ms/1e3).toFixed(1)}
                                    s
                                  </span>
                                  <span className={c("text-[14px]/[16px] font-[450]","text-right tabular-nums")}>
                                    $
                                    {e.cost.toFixed(4)}
                                  </span>
                                  <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className={c("shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90","justify-self-end")} />
                                </button>
                                {a&&<div className="grid gap-x-6 gap-y-3 px-3 pt-1 pb-3 sm:grid-cols-3">
                                  {[["Request ID",e.id],["Model",e.model],["Status",_[e.status]],["Input tokens",m(e.input)],["Output tokens",m(e.output)],["Latency",`${(e.ms/1e3).toFixed(2)}s`]].map(([e,a])=>(
                                    <div key={e} className="flex min-w-0 flex-col gap-1">
                                                      <p className={h}>{e}</p>
                                                      <p className={c("Request ID"===e?p:x,"truncate tabular-nums")}>{a}</p>
                                                    </div>
                                  ))}
                                </div>}
                              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
