/**
 * React Bits Pro — Application UI (dashboard-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  b = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  f = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  v = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  k = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  g = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  _ = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  j = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  w = "text-right tabular-nums",
  N = {operational:p,degraded:m,down:b,maintenance:"text-neutral-900/66 dark:text-neutral-100/66"},
  y = {operational:"Operational",degraded:"Degraded",down:"Down",maintenance:"Maintenance"},
  M = [{label:"Uptime, 30 days",value:"99.98%",delta:"+0.02 pp",positive:true,spark:[96,97,95,98,97,99,98,99]},{label:"Open incidents",value:"2",delta:"+1",positive:false,spark:[1,0,1,2,1,1,2,2]},{label:"P95 latency",value:"142 ms",delta:"+18 ms",positive:false,spark:[118,124,121,130,128,135,138,142]},{label:"Error rate",value:"0.04%",delta:"−0.01 pp",positive:true,spark:[6,7,5,6,4,5,4,4]}];

function A({values:e}){
  let a=Math.min(...e),t=Math.max(...e)-a||1,l=e.map((r,l)=>{
    let s=l/(e.length-1)*100;
    return `${s.toFixed(2)},${(92-(r-a)/t*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

let $ = [{name:"REST API",region:"us-east-1",latency:"142 ms",uptime:"99.98%",status:"operational"},{name:"REST API",region:"eu-west-1",latency:"168 ms",uptime:"99.95%",status:"operational"},{name:"Web app",region:"global edge",latency:"61 ms",uptime:"100.00%",status:"operational"},{name:"Auth service",region:"us-east-1",latency:"118 ms",uptime:"99.99%",status:"operational"},{name:"Postgres primary",region:"us-east-1",latency:"4 ms",uptime:"99.97%",status:"operational"},{name:"Search cluster",region:"us-west-2",latency:"402 ms",uptime:"99.62%",status:"degraded"},{name:"Webhooks worker",region:"us-east-1",latency:null,uptime:"96.20%",status:"down"},{name:"Object storage",region:"eu-west-1",latency:"33 ms",uptime:"99.99%",status:"operational"},{name:"Analytics pipeline",region:"us-west-2",latency:null,uptime:null,status:"maintenance"}],
  S = [{title:"Elevated search latency in us-west-2",state:"Investigating",when:"14 min ago",tone:m},{title:"Webhook delivery failures",state:"Identified",when:"38 min ago",tone:b},{title:"Analytics backfill maintenance",state:"Scheduled",when:"2 hours ago",tone:"text-neutral-900 dark:text-neutral-100"},{title:"Auth latency spike",state:"Resolved",when:"Yesterday",tone:p},{title:"CDN cache purge delays",state:"Resolved",when:"2 days ago",tone:p},{title:"Postgres failover drill",state:"Resolved",when:"Mar 4",tone:p},{title:"Rate limit errors on /v1/events",state:"Resolved",when:"Mar 2",tone:p}];

function z(){
  let{ref:e,edges:a,onScroll:t}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:r,scrollHeight:l,clientHeight:s}=a;
      t({start:r>1,end:Math.ceil(r+s)<l-1})
    }, []);
    return useEffect(()=>{
      r();
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let l=new t.ResizeObserver(r);
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }(),[p,b]=useState(false),[z,D]=useState(false),R=useRef(undefined);
  return useEffect(()=>()=>window.clearTimeout(R.current), []),<div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
    <header className={d("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
      <div className="flex min-w-0 items-center gap-3">
        <h1 className={d("text-[20px]/[24px] font-[450] tracking-[-0.015em]",c)}>System status</h1>
        <span className={d(h,m,"max-sm:hidden")}>2 incidents open</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span aria-live="polite" className={d("text-[13px]/[18px] font-normal",x,"hidden sm:inline")}>{p?"Refreshing…":z?"Updated just now":"Updated 2 min ago"}</span>
        <button type="button" onClick={()=>{
          window.clearTimeout(R.current),b(true),R.current=window.setTimeout(()=>{
            b(false),D(true)
          },900)
        }} disabled={p} aria-busy={p} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
          <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" className={p?"animate-spin [animation-duration:800ms] motion-reduce:animate-none":undefined} />
          Refresh
        </button>
      </div>
    </header>
    <div className="relative min-h-0 flex-1">
      <div ref={e} onScroll={t} className="h-full overflow-y-auto p-4 sm:p-6">
        <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
          <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
            {M.map(e=>{
              let a,t=(a=e.delta,/^[−-]/.test(a));
              return (
                <div key={e.label} className={d("flex min-w-0 flex-col gap-2 px-4 py-3","@container")}>
                                <p className={d("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","text-pretty")}>{e.label}</p>
                                <div className="mt-auto flex items-end justify-between gap-3">
                                  <p className={d("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","truncate")}>{e.value}</p>
                                  <A values={e.spark} />
                                </div>
                                <p className={d("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","truncate")}>
                                  <HugeiconsIcon icon={t?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                  <span className="sr-only">{t?"Down":"Up"}</span>
                                  {e.delta}
                                  <span className={d(x,"hidden sm:inline")}>vs. prior period</span>
                                </p>
                              </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={v}>
            <div className={d(k,"h-12")}><h2 className={f}>Services</h2></div>
            <div className={d(g,"flex-1")}>
              <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
                <caption className="sr-only">Service health</caption>
                <thead>
                  <tr>
                    <th scope="col" className={d(_,"h-9")}>Service</th>
                    <th scope="col" className={d(_,w,"hidden h-9 sm:table-cell")}>Latency</th>
                    <th scope="col" className={d(_,w,"hidden h-9 sm:table-cell")}>Uptime</th>
                    <th scope="col" className={d(_,"h-9 text-right")}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {$.map((e,a)=>(
                    <tr key={`${e.name}-${a}`} className={d("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                        <td className={d(j,"min-w-0")}>
                                          <p className="truncate">{e.name}</p>
                                          <p className={d("font-mono text-[12px]/[16px] tabular-nums",x,"truncate")}>{e.region}</p>
                                        </td>
                                        <td className={d(j,w,"hidden sm:table-cell")}>{e.latency&&<span className={u}>{e.latency}</span>}</td>
                                        <td className={d(j,w,"hidden sm:table-cell")}>{e.uptime&&<span className={u}>{e.uptime}</span>}</td>
                                        <td className={d(j,"text-right")}><span className={d(h,N[e.status])}>{y[e.status]}</span></td>
                                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={v}>
            <div className={d(k,"h-12 justify-between")}>
              <h2 className={f}>Incidents</h2>
              <span className={d("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{S.length}</span>
            </div>
            <ul className={d(g,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex-1")}>
              {S.map((e,a)=>(
                <li key={a} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-3")}>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.title}</span></p>
                                  <p data-description className="flex min-w-0 items-baseline gap-2">
                                    <span className={d("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",e.tone)}>{e.state}</span>
                                    <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.when}</span>
                                  </p>
                                </div>
                              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
    </div>
  </div>;
}


export default z;
