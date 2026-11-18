/**
 * React Bits Pro — Application UI (ai-usage-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let n = (...e)=>e.filter(Boolean).join(" ");

let o = "text-neutral-900 dark:text-neutral-100";

let i = "text-neutral-900/62 dark:text-neutral-100/62";

let eg = (...e)=>e.filter(Boolean).join(" ");

let ef = "text-neutral-900/62 dark:text-neutral-100/62";

let ew = "text-[14px]/[20px] font-medium";

let ej = "font-mono text-[12px]/[16px] tabular-nums";

let eN = eg(ew,ef);

let ey = eg("text-[13px]/[16px] font-semibold tabular-nums",ef);

let eC = e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${e}`;

let eA = [{id:"req_8f21c4",time:"14:32:08",endpoint:"/v1/messages",model:"Atlas Pro",input:12480,output:1940,ms:4180,cost:.0666,status:"ok"},{id:"req_8f21b0",time:"14:31:54",endpoint:"/v1/messages",model:"Atlas",input:3120,output:806,ms:1240,cost:.0142,status:"ok"},{id:"req_8f2196",time:"14:31:41",endpoint:"/v1/embeddings",model:"Ember",input:48200,output:0,ms:610,cost:.0048,status:"ok"},{id:"req_8f2183",time:"14:31:22",endpoint:"/v1/messages",model:"Atlas Long",input:184600,output:2310,ms:12940,cost:.5884,status:"capped"},{id:"req_8f2170",time:"14:30:58",endpoint:"/v1/messages",model:"Atlas Pro",input:9040,output:1120,ms:3210,cost:.0439,status:"ok"},{id:"req_8f215d",time:"14:30:31",endpoint:"/v1/rerank",model:"Ember Mini",input:22800,output:0,ms:380,cost:.0011,status:"error"},{id:"req_8f214a",time:"14:30:12",endpoint:"/v1/messages",model:"Quill",input:5640,output:1408,ms:1980,cost:.0225,status:"ok"},{id:"req_8f2137",time:"14:29:47",endpoint:"/v1/embeddings",model:"Ember",input:31400,output:0,ms:520,cost:.0031,status:"ok"}];

let eM = ["All","Capped","Errors"];

let eL = {ok:"Completed",capped:"Truncated at max tokens",error:"Upstream timeout"};


export default function ai_usage_7__Sorbet__Component(){
  let[e,a]=useState("All"),[r,n]=useState("req_8f2183"),o=useMemo(()=>eA.filter(a=>"All"===e||("Capped"===e?"capped"===a.status:"error"===a.status)), [e]),i=o.reduce((e,a)=>e+a.cost,0);
  return (
    <div className={eg("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[820px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px]/[22px] font-extrabold">Request log</h2>
              <p className={eg(eN,"mt-0.5 flex gap-x-3 truncate")}>
                <span>
                  {"Last "}
                  {o.length}
                  {" calls"}
                </span>
                <span className="tabular-nums">
                  $
                  {i.toFixed(4)}
                  {" billed"}
                </span>
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter" onKeyDown={r=>{
              var t,l,n;
              let o;
              return t=eM.length,l=eM.indexOf(e),n=e=>a(eM[e]),void(!((o="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(o),r.currentTarget.querySelectorAll('[role="radio"]')[o]?.focus()));
            }} className={eg("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {eM.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={eg("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1 min-h-[340px]")}>
              <div className={eg(ey,"hidden grid-cols-[68px_minmax(0,1.4fr)_minmax(0,1fr)_72px_72px_76px_20px] items-center gap-3 px-3 py-2.5 sm:grid")}>
                <span>Time</span>
                <span className="ps-6">Request</span>
                <span>Model</span>
                <span className="text-right">Tokens</span>
                <span className="text-right">Latency</span>
                <span className="text-right">Cost</span>
                <span />
              </div>
              {0===o.length?<div className="flex h-[300px] flex-col items-center justify-center gap-1 px-6 text-center">
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Nothing to show</p>
                <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">No calls matched this filter in the current window.</p>
              </div>:o.map(e=>{
                let a=r===e.id;
                return (
                  <div key={e.id} className={eg(a&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]")}>
                                <button type="button" aria-expanded={a} onClick={()=>n(a?null:e.id)} className={eg(!a&&"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto_20px] items-center gap-x-3 gap-y-1 px-3 py-3 text-left sm:grid-cols-[68px_minmax(0,1.4fr)_minmax(0,1fr)_72px_72px_76px_20px] sm:py-2.5")}>
                                  <span className={eg(eN,"hidden tabular-nums sm:block")}>{e.time}</span>
                                  <span className="flex min-w-0 items-center gap-2">
                                    <span aria-hidden="true" className="flex size-[18px] shrink-0 items-center justify-center">
                                      {"ok"===e.status&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} className={ef} />}
                                      {"capped"===e.status&&<HugeiconsIcon icon={Icon_36474} size={14} strokeWidth={2} className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]" />}
                                      {"error"===e.status&&<HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} className="text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]" />}
                                    </span>
                                    <span className="sr-only">{eL[e.status]}</span>
                                    <span className="min-w-0">
                                      <span className={eg(ej,"block truncate")}>{e.endpoint}</span>
                                      <span className={eg(ey,"flex gap-x-3 truncate sm:hidden")}>
                                        <span>{e.time}</span>
                                        <span>{e.model}</span>
                                      </span>
                                    </span>
                                  </span>
                                  <span className={eg(eN,"hidden truncate sm:block")}>{e.model}</span>
                                  <span className={eg(eN,"hidden text-right tabular-nums sm:block")}>{eC(e.input+e.output)}</span>
                                  <span className={eg(eN,"hidden text-right tabular-nums sm:block")}>
                                    {(e.ms/1e3).toFixed(1)}
                                    s
                                  </span>
                                  <span className={eg("text-[15px]/[20px] font-bold","text-right tabular-nums")}>
                                    $
                                    {e.cost.toFixed(4)}
                                  </span>
                                  <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className={eg("shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90","justify-self-end")} />
                                </button>
                                {a&&<div className="grid gap-x-6 gap-y-3 px-3 pt-1 pb-3 sm:grid-cols-3">
                                  {[["Request ID",e.id],["Model",e.model],["Status",eL[e.status]],["Input tokens",eC(e.input)],["Output tokens",eC(e.output)],["Latency",`${(e.ms/1e3).toFixed(2)}s`]].map(([e,a])=>(
                                    <div key={e} className="flex min-w-0 flex-col gap-1">
                                                      <p className={ey}>{e}</p>
                                                      <p className={eg("Request ID"===e?ej:ew,"truncate tabular-nums")}>{a}</p>
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
