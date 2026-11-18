/**
 * React Bits Pro — Application UI (integrations-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_81515 = [["path",{d:"M5.062 13C3.83229 13.6824 3 14.994 3 16.5C3 18.7091 4.79086 20.5 7 20.5C9.20914 20.5 11 18.7091 11 16.5H17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7.5L15.0571 13.0027C15.6323 12.6825 16.2949 12.5 17 12.5C19.2091 12.5 21 14.2909 21 16.5C21 18.7091 19.2091 20.5 17 20.5C16.0541 20.5 15.1848 20.1716 14.5 19.6227",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 8.5C12.5523 8.5 13 8.05228 13 7.5C13 6.94772 12.5523 6.5 12 6.5M12 8.5C11.4477 8.5 11 8.05228 11 7.5C11 6.94772 11.4477 6.5 12 6.5M12 8.5V6.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.5C7.55228 17.5 8 17.0523 8 16.5C8 15.9477 7.55228 15.5 7 15.5M7 17.5C6.44772 17.5 6 17.0523 6 16.5C6 15.9477 6.44772 15.5 7 15.5M7 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 17.5C17.5523 17.5 18 17.0523 18 16.5C18 15.9477 17.5523 15.5 17 15.5M17 17.5C16.4477 17.5 16 17.0523 16 16.5C16 15.9477 16.4477 15.5 17 15.5M17 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}],["path",{d:"M16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.004 8.83007 10.3141 10.0571 10.9973L7 16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_54500 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.2073 3 18.0227 4.67765 19.6166 7.20327M20.7066 3.00076L20.5344 5.05452C20.4104 6.53384 20.3484 7.27349 19.8664 7.68914C19.3844 8.10479 18.6733 8.03185 17.251 7.88595L15.2066 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900/62 dark:text-neutral-100/62";

let _ = "text-[14px]/[20px] font-medium";

let x = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let es = (...e)=>e.filter(Boolean).join(" ");

let ec = "text-neutral-900/62 dark:text-neutral-100/62";

let ed = "border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let e_ = "font-mono text-[12px]/[16px] tabular-nums";

let ex = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let eb = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eu = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ep = "inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center whitespace-nowrap rounded-[calc(var(--rb-r-md,8px))] px-2 font-mono text-[12px]/[16px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100";

let eh = "bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10";

let ek = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let em = "cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10";

let eg = "rounded-[var(--rb-r-4xl,18px)]";

let ev = es("text-[14px]/[20px] font-medium",ec);

let ef = es("text-[13px]/[16px] font-semibold tabular-nums",ec);

let ew = [{id:"e1",url:"https://hooks.northwind.dev/halcyon/usage",events:["usage.rollup","usage.threshold"],enabled:true,rate:99.8},{id:"e2",url:"https://api.cedarlabs.io/v2/events",events:["deploy.failed","deploy.succeeded","check.completed"],enabled:true,rate:97.1},{id:"e3",url:"https://harbor.internal/ingest/audit",events:["member.invited","member.removed","role.changed"],enabled:false,rate:100}];

let ey = {e1:[{id:"d1",event:"usage.rollup",status:200,at:"09:41:02",ms:128,attempts:1,body:'{ "workspace": "wrk_2f81", "units": 41822, "window": 10000 }'},{id:"d2",event:"usage.threshold",status:200,at:"09:40:11",ms:96,attempts:1,body:'{ "workspace": "wrk_2f81", "threshold": 0.8, "plan": "scale" }'},{id:"d3",event:"usage.rollup",status:500,at:"09:38:44",ms:4021,attempts:3,body:'{ "workspace": "wrk_71ab", "units": 1204, "window": 10000 }'}],e2:[{id:"d4",event:"deploy.failed",status:202,at:"09:33:19",ms:211,attempts:1,body:'{ "env": "production", "sha": "8fc2a41", "check": "migrations" }'},{id:"d5",event:"check.completed",status:429,at:"09:31:07",ms:88,attempts:2,body:'{ "env": "staging", "sha": "2ad7f60", "result": "pass" }'}],e3:[]};


export default function integrations_4__Sorbet__Component(){
  let e=useId(),[r,a]=useState(ew),[l,i]=useState("e1"),[c,d]=useState("d1"),_=r.find(e=>e.id===l)??r[0],x=ey[_.id]??[];
  return (
    <div className={es("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden lg:flex-row")}>
        <aside className={es(ed,"flex shrink-0 flex-col lg:w-[320px] lg:border-r lg:border-b-0")}>
          <div className={es(ed,"flex h-[52px] shrink-0 items-center justify-between gap-2 px-5")}>
            <span className="text-[15px]/[20px] font-bold">Endpoints</span>
            <button type="button" aria-label="Add endpoint" className={es(eb,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {r.map(e=>{
              let r=e.id===l;
              return (
                <button key={e.id} type="button" onClick={()=>{
                            i(e.id),d(ey[e.id]?.[0]?.id??null)
                          }} aria-current={r?"true":undefined} className={es(ek,eg,r?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":em,ex,"mb-1 px-3 py-2.5")}>
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={Icon_81515} size={16} strokeWidth={2} aria-hidden="true" className={es(ec,"shrink-0")} />
                                <span className={es(e_,"min-w-0 flex-1 truncate")}>{e.url.replace(/^https:\/\//,"")}</span>
                              </div>
                              <p className={es(ev,"flex flex-wrap items-baseline gap-x-3")}>
                                <span>
                                  {e.events.length}
                                  {" events"}
                                </span>
                                <span>
                                  <span className="tabular-nums">
                                    {e.rate}
                                    %
                                  </span>
                                  {" delivered"}
                                </span>
                                <span className={es("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",e.enabled?"text-neutral-900/78 dark:text-neutral-100/78":"text-neutral-900/62 dark:text-neutral-100/62","ms-auto")}>{e.enabled?"Enabled":"Paused"}</span>
                              </p>
                            </div>
                          </button>
              );
            })}
          </div>
        </aside>
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className={es(ed,"flex shrink-0 flex-wrap items-start justify-between gap-3 px-5 py-3.5")}>
            <div className="min-w-0">
              <p className={es("font-mono text-[13px]/[20px] tabular-nums","truncate")}>{_.url}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">{_.events.map(e=><span key={e} className={es(ep,eh)}>{e}</span>)}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className={es(eb,eu)}>
                <HugeiconsIcon icon={Icon_54500} size={18} strokeWidth={2} aria-hidden="true" />
                Send test
              </button>
              <button type="button" role="switch" aria-checked={_.enabled} aria-label="Endpoint enabled" onClick={()=>a(e=>e.map(e=>e.id===_.id?{...e,enabled:!e.enabled}:e))} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
                <span aria-hidden="true" className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
              </button>
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {x.length>0?<ul className={es("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-2")}>
              {x.map(e=>{
                let r,a=e.id===c;
                return (
                  <li key={e.id}>
                                <button type="button" aria-expanded={a} onClick={()=>d(a?null:e.id)} className={es(ek,eg,em,ex,"group px-3 py-3")}>
                                  <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                  <span className={es(ep,(r=e.status)>=500?"bg-[oklch(95.5%_0.03_26)] dark:bg-[oklch(30%_0.065_26)] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":r>=400?"bg-[oklch(96%_0.045_82)] dark:bg-[oklch(32%_0.06_72)] text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":eh,"w-9")}>{e.status}</span>
                                  <span className={es(e_,"min-w-0 flex-1 truncate")}>{e.event}</span>
                                  <span className={es(ef,"w-[72px] shrink-0 text-right max-sm:hidden")}>
                                    {e.attempts}
                                    {" "}
                                    {1===e.attempts?"attempt":"attempts"}
                                  </span>
                                  <span className={es(ef,"w-[56px] shrink-0 text-right")}>
                                    {e.ms}
                                    {" ms"}
                                  </span>
                                  <span className={es(ef,"w-[56px] shrink-0 text-right")}>{e.at}</span>
                                </button>
                                {a&&<div className="px-3 pt-1 pb-4">
                                  <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]">
                                    <pre className={es("overflow-auto bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] py-3.5 font-mono text-[13px]/[21px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-950/60","px-3")}>{e.body}</pre>
                                  </div>
                                  {e.status>=400&&<button type="button" className={es(eb,eu,"mt-3")}>
                                    <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                                    Replay delivery
                                  </button>}
                                </div>}
                              </li>
                );
              })}
            </ul>:<div className="flex flex-col items-center px-6 py-20 text-center">
              <HugeiconsIcon icon={Icon_81515} size={18} strokeWidth={2} aria-hidden="true" className="text-neutral-900/78 dark:text-neutral-100/78" />
              <p className={es("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-3")}>No deliveries yet</p>
              <p className={es("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                This endpoint is paused. Enable it, or send a test event to confirm the receiver responds.
              </p>
            </div>}
          </div>
          <p className="sr-only" aria-live="polite" id={`${e}-live`}>
            {x.length}
            {" deliveries shown"}
          </p>
        </section>
      </div>
  );
}
