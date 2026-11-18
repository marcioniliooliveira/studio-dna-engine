/**
 * React Bits Pro — Application UI (integrations-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_81515 = [["path",{d:"M5.062 13C3.83229 13.6824 3 14.994 3 16.5C3 18.7091 4.79086 20.5 7 20.5C9.20914 20.5 11 18.7091 11 16.5H17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 7.5L15.0571 13.0027C15.6323 12.6825 16.2949 12.5 17 12.5C19.2091 12.5 21 14.2909 21 16.5C21 18.7091 19.2091 20.5 17 20.5C16.0541 20.5 15.1848 20.1716 14.5 19.6227",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 8.5C12.5523 8.5 13 8.05228 13 7.5C13 6.94772 12.5523 6.5 12 6.5M12 8.5C11.4477 8.5 11 8.05228 11 7.5C11 6.94772 11.4477 6.5 12 6.5M12 8.5V6.5",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.5C7.55228 17.5 8 17.0523 8 16.5C8 15.9477 7.55228 15.5 7 15.5M7 17.5C6.44772 17.5 6 17.0523 6 16.5C6 15.9477 6.44772 15.5 7 15.5M7 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 17.5C17.5523 17.5 18 17.0523 18 16.5C18 15.9477 17.5523 15.5 17 15.5M17 17.5C16.4477 17.5 16 17.0523 16 16.5C16 15.9477 16.4477 15.5 17 15.5M17 17.5V15.5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}],["path",{d:"M16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.004 8.83007 10.3141 10.0571 10.9973L7 16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_54500 = [["path",{d:"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.2073 3 18.0227 4.67765 19.6166 7.20327M20.7066 3.00076L20.5344 5.05452C20.4104 6.53384 20.3484 7.27349 19.8664 7.68914C19.3844 8.10479 18.6733 8.03185 17.251 7.88595L15.2066 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  p = "font-mono text-[12px]/[16px] tabular-nums",
  h = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = "inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100",
  f = "bg-neutral-900/9 dark:bg-neutral-100/9",
  v = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  g = "cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",
  w = "rounded-[var(--rb-r-sm,6px)]",
  j = u("text-[13px]/[18px] font-normal",x),
  y = u("text-[12px]/[16px] font-normal tabular-nums",x),
  N = [{id:"e1",url:"https://hooks.northwind.dev/halcyon/usage",events:["usage.rollup","usage.threshold"],enabled:true,rate:99.8},{id:"e2",url:"https://api.cedarlabs.io/v2/events",events:["deploy.failed","deploy.succeeded","check.completed"],enabled:true,rate:97.1},{id:"e3",url:"https://harbor.internal/ingest/audit",events:["member.invited","member.removed","role.changed"],enabled:false,rate:100}],
  z = {e1:[{id:"d1",event:"usage.rollup",status:200,at:"09:41:02",ms:128,attempts:1,body:'{ "workspace": "wrk_2f81", "units": 41822, "window": 10000 }'},{id:"d2",event:"usage.threshold",status:200,at:"09:40:11",ms:96,attempts:1,body:'{ "workspace": "wrk_2f81", "threshold": 0.8, "plan": "scale" }'},{id:"d3",event:"usage.rollup",status:500,at:"09:38:44",ms:4021,attempts:3,body:'{ "workspace": "wrk_71ab", "units": 1204, "window": 10000 }'}],e2:[{id:"d4",event:"deploy.failed",status:202,at:"09:33:19",ms:211,attempts:1,body:'{ "env": "production", "sha": "8fc2a41", "check": "migrations" }'},{id:"d5",event:"check.completed",status:429,at:"09:31:07",ms:88,attempts:2,body:'{ "env": "staging", "sha": "2ad7f60", "result": "pass" }'}],e3:[]};

function A(){
  let e=useId(),[r,a]=useState(N),[A,S]=useState("e1"),[C,R]=useState("d1"),W=r.find(e=>e.id===A)??r[0],L=z[W.id]??[];
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden lg:flex-row")}>
        <aside className={u(b,"flex shrink-0 flex-col lg:w-[320px] lg:border-r lg:border-b-0")}>
          <div className={u(b,"flex h-[52px] shrink-0 items-center justify-between gap-2 px-5")}>
            <span className="text-[14px]/[16px] font-[450]">Endpoints</span>
            <button type="button" aria-label="Add endpoint" className={u(m,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {r.map(e=>{
              let r=e.id===A;
              return (
                <button key={e.id} type="button" onClick={()=>{
                            S(e.id),R(z[e.id]?.[0]?.id??null)
                          }} aria-current={r?"true":undefined} className={u(v,w,r?"bg-neutral-900/9 dark:bg-neutral-100/9":g,h,"mb-1 px-3 py-2.5")}>
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={Icon_81515} size={14} strokeWidth={1.8} aria-hidden="true" className={u(x,"shrink-0")} />
                                <span className={u(p,"min-w-0 flex-1 truncate")}>{e.url.replace(/^https:\/\//,"")}</span>
                              </div>
                              <p className={u(j,"flex flex-wrap items-baseline gap-x-3")}>
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
                                <span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",e.enabled?"text-neutral-900/80 dark:text-neutral-100/80":"text-neutral-900/66 dark:text-neutral-100/66","ms-auto")}>{e.enabled?"Enabled":"Paused"}</span>
                              </p>
                            </div>
                          </button>
              );
            })}
          </div>
        </aside>
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className={u(b,"flex shrink-0 flex-wrap items-start justify-between gap-3 px-5 py-3.5")}>
            <div className="min-w-0">
              <p className={u("font-mono text-[13px]/[20px] tabular-nums","truncate")}>{W.url}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">{W.events.map(e=><span key={e} className={u(k,f)}>{e}</span>)}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className={u(m,_)}>
                <HugeiconsIcon icon={Icon_54500} size={16} strokeWidth={1.8} aria-hidden="true" />
                Send test
              </button>
              <button type="button" role="switch" aria-checked={W.enabled} aria-label="Endpoint enabled" onClick={()=>a(e=>e.map(e=>e.id===W.id?{...e,enabled:!e.enabled}:e))} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                <span aria-hidden="true" className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
              </button>
            </div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {L.length>0?<ul className={u("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","p-2")}>
              {L.map(e=>{
                let r,a=e.id===C;
                return (
                  <li key={e.id}>
                                <button type="button" aria-expanded={a} onClick={()=>R(a?null:e.id)} className={u(v,w,g,h,"group px-3 py-3")}>
                                  <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                  <span className={u(k,(r=e.status)>=500?"border border-[oklch(60%_0.236_26)] dark:border-[oklch(65.2%_0.219_26)] bg-neutral-900/9 dark:bg-neutral-100/9":r>=400?"border border-[oklch(62%_0.132_68)] dark:border-[oklch(80%_0.152_68)] bg-neutral-900/9 dark:bg-neutral-100/9":f,"w-9")}>{e.status}</span>
                                  <span className={u(p,"min-w-0 flex-1 truncate")}>{e.event}</span>
                                  <span className={u(y,"w-[72px] shrink-0 text-right max-sm:hidden")}>
                                    {e.attempts}
                                    {" "}
                                    {1===e.attempts?"attempt":"attempts"}
                                  </span>
                                  <span className={u(y,"w-[56px] shrink-0 text-right")}>
                                    {e.ms}
                                    {" ms"}
                                  </span>
                                  <span className={u(y,"w-[56px] shrink-0 text-right")}>{e.at}</span>
                                </button>
                                {a&&<div className="px-3 pt-1 pb-4">
                                  <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
                                    <pre className={u("overflow-auto bg-neutral-900/5 py-3 font-mono text-[13px]/[20px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-100/5","px-3")}>{e.body}</pre>
                                  </div>
                                  {e.status>=400&&<button type="button" className={u(m,_,"mt-3")}>
                                    <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    Replay delivery
                                  </button>}
                                </div>}
                              </li>
                );
              })}
            </ul>:<div className="flex flex-col items-center px-6 py-20 text-center">
              <HugeiconsIcon icon={Icon_81515} size={18} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
              <p className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>No deliveries yet</p>
              <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                This endpoint is paused. Enable it, or send a test event to confirm the receiver responds.
              </p>
            </div>}
          </div>
          <p className="sr-only" aria-live="polite" id={`${e}-live`}>
            {L.length}
            {" deliveries shown"}
          </p>
        </section>
      </div>
  );
}


export default A;
