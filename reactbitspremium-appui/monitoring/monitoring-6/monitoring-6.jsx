/**
 * React Bits Pro — Application UI (monitoring-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",
  h = "text-[13px]/[18px] font-normal",
  p = o(h,u),
  b = [30,60,90],
  m = [{id:"api",name:"API",seed:3},{id:"dash",name:"Dashboard",seed:11},{id:"pay",name:"Payments",seed:5},{id:"web",name:"Webhooks",seed:17},{id:"search",name:"Search",seed:23},{id:"cdn",name:"Asset CDN",seed:29}],
  f = {up:"bg-neutral-900/8 dark:bg-neutral-100/8",partial:"bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]",down:"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]"},
  g = {up:c,partial:x,down:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  k = {up:"Operational",partial:"Degraded",down:"Outage"},
  v = {api:[{at:"Jun 02",text:"Elevated 5xx for 18 minutes after a bad deploy."}],pay:[{at:"Jun 09",text:"Checkout latency above budget for 37 minutes."},{at:"May 21",text:"Vendor 503s caused a retry storm for 12 minutes."}],search:[{at:"May 28",text:"Embeddings index read latency degraded for 11 minutes."}]};

function w(){
  let[e,t]=useState(90),[r,w]=useState(null),[_,j]=useState(null),{ref:y,edges:N,onScroll:S}=function(){
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
  }(),z=useMemo(()=>m.map(t=>{
    var r;
    let a=(r=t.seed,Array.from({length:e},(e,t)=>{
      let a=(37*t+53*r)%101;
      return 0===a||13===a?"down":a<6?"partial":"up";
    })),n=100-a.filter(e=>"up"!==e).length/e*.9;
    return {...t,list:a,uptime:n,incidents:v[t.id]??[]};
  }), [e]);
  useEffect(()=>S(), [z,r,S]);
  let A=z.filter(e=>e.list.slice(-1).some(e=>"up"!==e)).length,R=z.reduce((e,t)=>e+t.uptime,0)/z.length;
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[600px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {A>0&&<HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={1.8} aria-hidden="true" className={o(x,"shrink-0")} />}
                <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>{A>0?`${A} service${A>1?"s":""} degraded`:"All systems operational"}</h2>
              </div>
              <p className={o(p,"mt-0.5 truncate")}>
                {R.toFixed(3)}
                {"% average uptime over "}
                {e}
                {" days"}
              </p>
            </div>
            <div role="radiogroup" aria-label="History window" className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {b.map(r=>(
                <button key={r} type="button" role="radio" aria-checked={r===e} onClick={()=>{
                            t(r),j(null)
                          }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">
                            {r}
                            d
                          </button>
              ))}
            </div>
          </div>
          <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={y} onScroll={S} className="h-full overflow-y-auto">
              <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                {z.map(t=>{
                  let n=r===t.id,s=_?.id===t.id?_.i:null,x=null===s?"up":t.list[s];
                  return (
                    <li key={t.id} className="px-3 pt-1 pb-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <button type="button" aria-expanded={n} onClick={()=>w(n?null:t.id)} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                                        <span className="flex size-4 shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                        </span>
                                        <span className={o("text-[14px]/[16px] font-[450]",d,"truncate")}>{t.name}</span>
                                      </button>
                                      <p className={o("text-[12px]/[16px] font-normal tabular-nums","grid shrink-0 justify-items-end text-right whitespace-nowrap")}>
                                        <span aria-hidden={null!==s} className={o(u,"col-start-1 row-start-1 justify-self-end",null!==s&&"invisible")}>
                                          {t.uptime.toFixed(2)}
                                          % uptime
                                        </span>
                                        <span aria-hidden={null===s} className={o("col-start-1 row-start-1 inline-flex items-center justify-end gap-1.5 justify-self-end",null===s&&"invisible")}>
                                          <span className={g[x]}>{k[x]}</span>
                                          <span className={u}>
                                            {null===s?e:e-s}
                                            d ago
                                          </span>
                                        </span>
                                      </p>
                                    </div>
                                    <div role="img" aria-label={`${t.name} daily status for the last ${e} days, ${t.uptime.toFixed(2)}% uptime`} onPointerLeave={()=>j(null)} className="mt-1 flex h-7 items-stretch gap-px sm:gap-[2px]">
                                      {t.list.map((e,r)=><span key={r} onPointerEnter={()=>j({id:t.id,i:r})} className={o("min-w-0 flex-1 rounded-[2px]",f[e],s===r&&"border border-neutral-900/50 dark:border-neutral-100/50")} />)}
                                    </div>
                                    {n&&<div className="mt-3">
                                      {0===t.incidents.length?<p className={o(h,c)}>No incidents recorded in this window.</p>:<ul className="space-y-2">
                                        {t.incidents.map(e=>(
                                          <li key={e.at} className={o(h,"flex gap-3")}>
                                                                <span className={o(u,"w-[52px] shrink-0")}>{e.at}</span>
                                                                <span className={o(c,"min-w-0 flex-1")}>{e.text}</span>
                                                              </li>
                                        ))}
                                      </ul>}
                                    </div>}
                                  </li>
                  );
                })}
              </ul>
            </div>
            <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",N.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",N.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={o("flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2","flex-wrap justify-between")}>
            <p>
              {e}
              {" days ago"}
            </p>
            <ul className="flex flex-wrap items-center gap-3 max-sm:order-last max-sm:basis-full">
              {["up","partial","down"].map(e=>(
                <li key={e} className="inline-flex items-center gap-1.5">
                            <span aria-hidden className={o("inline-block size-2 shrink-0",f[e],"size-[6px]")} />
                            {k[e]}
                          </li>
              ))}
            </ul>
            <p>Today</p>
          </div>
        </div>
      </div>
  );
}


export default w;
