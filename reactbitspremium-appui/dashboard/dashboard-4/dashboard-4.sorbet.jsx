/**
 * React Bits Pro — Application UI (dashboard-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let ea = (...e)=>e.filter(Boolean).join(" ");

let er = "text-neutral-900 dark:text-neutral-100";

let et = "text-neutral-900/78 dark:text-neutral-100/78";

let el = "text-neutral-900/62 dark:text-neutral-100/62";

let en = "inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums";

let es = "text-neutral-900/78 dark:text-neutral-100/78";

let ei = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]";

let eo = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let ec = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let ed = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let ex = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let e_ = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let eh = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eb = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let ep = "text-right tabular-nums";

let eu = {operational:es,degraded:ei,down:eo,maintenance:"text-neutral-900/62 dark:text-neutral-100/62"};

let em = {operational:"Operational",degraded:"Degraded",down:"Down",maintenance:"Maintenance"};

let ek = [{label:"Uptime, 30 days",value:"99.98%",delta:"+0.02 pp",positive:true,spark:[96,97,95,98,97,99,98,99]},{label:"Open incidents",value:"2",delta:"+1",positive:false,spark:[1,0,1,2,1,1,2,2]},{label:"P95 latency",value:"142 ms",delta:"+18 ms",positive:false,spark:[118,124,121,130,128,135,138,142]},{label:"Error rate",value:"0.04%",delta:"−0.01 pp",positive:true,spark:[6,7,5,6,4,5,4,4]}];

function ef({values:e}){
  let a=Math.min(...e),r=Math.max(...e)-a||1,l=e.map((t,l)=>{
    let n=l/(e.length-1)*100;
    return `${n.toFixed(2)},${(92-(t-a)/r*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

let ev = [{name:"REST API",region:"us-east-1",latency:"142 ms",uptime:"99.98%",status:"operational"},{name:"REST API",region:"eu-west-1",latency:"168 ms",uptime:"99.95%",status:"operational"},{name:"Web app",region:"global edge",latency:"61 ms",uptime:"100.00%",status:"operational"},{name:"Auth service",region:"us-east-1",latency:"118 ms",uptime:"99.99%",status:"operational"},{name:"Postgres primary",region:"us-east-1",latency:"4 ms",uptime:"99.97%",status:"operational"},{name:"Search cluster",region:"us-west-2",latency:"402 ms",uptime:"99.62%",status:"degraded"},{name:"Webhooks worker",region:"us-east-1",latency:null,uptime:"96.20%",status:"down"},{name:"Object storage",region:"eu-west-1",latency:"33 ms",uptime:"99.99%",status:"operational"},{name:"Analytics pipeline",region:"us-west-2",latency:null,uptime:null,status:"maintenance"}];

let eg = [{title:"Elevated search latency in us-west-2",state:"Investigating",when:"14 min ago",tone:ei},{title:"Webhook delivery failures",state:"Identified",when:"38 min ago",tone:eo},{title:"Analytics backfill maintenance",state:"Scheduled",when:"2 hours ago",tone:"text-neutral-900 dark:text-neutral-100"},{title:"Auth latency spike",state:"Resolved",when:"Yesterday",tone:es},{title:"CDN cache purge delays",state:"Resolved",when:"2 days ago",tone:es},{title:"Postgres failover drill",state:"Resolved",when:"Mar 4",tone:es},{title:"Rate limit errors on /v1/events",state:"Resolved",when:"Mar 2",tone:es}];


export default function dashboard_4__Sorbet__Component(){
  let{ref:e,edges:a,onScroll:r}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[s,i]=useState(false),[d,x]=useState(false),_=useRef(undefined);
  return useEffect(()=>()=>window.clearTimeout(_.current), []),<div className={ea("bg-white dark:bg-neutral-950",er,"relative flex h-full min-h-[760px] w-full flex-col overflow-hidden")}>
    <header className={ea("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
      <div className="flex min-w-0 items-center gap-3">
        <h1 className={ea("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",er)}>System status</h1>
        <span className={ea(en,ei,"max-sm:hidden")}>2 incidents open</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span aria-live="polite" className={ea("text-[14px]/[20px] font-medium",el,"hidden sm:inline")}>{s?"Refreshing…":d?"Updated just now":"Updated 2 min ago"}</span>
        <button type="button" onClick={()=>{
          window.clearTimeout(_.current),i(true),_.current=window.setTimeout(()=>{
            i(false),x(true)
          },900)
        }} disabled={s} aria-busy={s} className={ea("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
          <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" className={s?"animate-spin [animation-duration:700ms] motion-reduce:animate-none":undefined} />
          Refresh
        </button>
      </div>
    </header>
    <div className="relative min-h-0 flex-1">
      <div ref={e} onScroll={r} className="h-full overflow-y-auto p-4 sm:p-6">
        <div className="@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1">
          <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
            {ek.map(e=>{
              let a,r=(a=e.delta,/^[−-]/.test(a));
              return (
                <div key={e.label} className={ea("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","@container")}>
                                <p className={ea("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","text-pretty")}>{e.label}</p>
                                <div className="mt-auto flex items-end justify-between gap-3">
                                  <p className={ea("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","truncate")}>{e.value}</p>
                                  <ef values={e.spark} />
                                </div>
                                <p className={ea("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","truncate")}>
                                  <HugeiconsIcon icon={r?Icon_37502:Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                                  <span className="sr-only">{r?"Down":"Up"}</span>
                                  {e.delta}
                                  <span className={ea(el,"hidden sm:inline")}>vs. prior period</span>
                                </p>
                              </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={ed}>
            <div className={ea(ex,"h-12")}><h2 className={ec}>Services</h2></div>
            <div className={ea(e_,"flex-1")}>
              <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                <caption className="sr-only">Service health</caption>
                <thead>
                  <tr>
                    <th scope="col" className={ea(eh,"h-9")}>Service</th>
                    <th scope="col" className={ea(eh,ep,"hidden h-9 sm:table-cell")}>Latency</th>
                    <th scope="col" className={ea(eh,ep,"hidden h-9 sm:table-cell")}>Uptime</th>
                    <th scope="col" className={ea(eh,"h-9 text-right")}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ev.map((e,a)=>(
                    <tr key={`${e.name}-${a}`} className={ea("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                        <td className={ea(eb,"min-w-0")}>
                                          <p className="truncate">{e.name}</p>
                                          <p className={ea("font-mono text-[12px]/[16px] tabular-nums",el,"truncate")}>{e.region}</p>
                                        </td>
                                        <td className={ea(eb,ep,"hidden sm:table-cell")}>{e.latency&&<span className={et}>{e.latency}</span>}</td>
                                        <td className={ea(eb,ep,"hidden sm:table-cell")}>{e.uptime&&<span className={et}>{e.uptime}</span>}</td>
                                        <td className={ea(eb,"text-right")}><span className={ea(en,eu[e.status])}>{em[e.status]}</span></td>
                                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={ed}>
            <div className={ea(ex,"h-12 justify-between")}>
              <h2 className={ec}>Incidents</h2>
              <span className={ea("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{eg.length}</span>
            </div>
            <ul className={ea(e_,"divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex-1")}>
              {eg.map((e,a)=>(
                <li key={a} className={ea("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-3")}>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.title}</span></p>
                                  <p data-description className="flex min-w-0 items-baseline gap-2">
                                    <span className={ea("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",e.tone)}>{e.state}</span>
                                    <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.when}</span>
                                  </p>
                                </div>
                              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className={ea("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={ea("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
    </div>
  </div>;
}
