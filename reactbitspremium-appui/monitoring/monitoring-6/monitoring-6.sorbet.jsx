/**
 * React Bits Pro — Application UI (monitoring-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let eZ = (...e)=>e.filter(Boolean).join(" ");

let e0 = "text-neutral-900 dark:text-neutral-100";

let e1 = "text-neutral-900/78 dark:text-neutral-100/78";

let e2 = "text-neutral-900/62 dark:text-neutral-100/62";

let e5 = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]";

let e6 = "text-[14px]/[20px] font-medium";

let e8 = eZ(e6,e2);

let e4 = [30,60,90];

let e9 = [{id:"api",name:"API",seed:3},{id:"dash",name:"Dashboard",seed:11},{id:"pay",name:"Payments",seed:5},{id:"web",name:"Webhooks",seed:17},{id:"search",name:"Search",seed:23},{id:"cdn",name:"Asset CDN",seed:29}];

let e3 = {up:"bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",partial:"bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]",down:"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]"};

let e7 = {up:e1,partial:e5,down:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let ae = {up:"Operational",partial:"Degraded",down:"Outage"};

let aa = {api:[{at:"Jun 02",text:"Elevated 5xx for 18 minutes after a bad deploy."}],pay:[{at:"Jun 09",text:"Checkout latency above budget for 37 minutes."},{at:"May 21",text:"Vendor 503s caused a retry storm for 12 minutes."}],search:[{at:"May 28",text:"Embeddings index read latency degraded for 11 minutes."}]};


export default function monitoring_6__Sorbet__Component(){
  let[e,a]=useState(90),[r,l]=useState(null),[i,s]=useState(null),{ref:c,edges:d,onScroll:_}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),x=useMemo(()=>e9.map(a=>{
    var r;
    let t=(r=a.seed,Array.from({length:e},(e,a)=>{
      let t=(37*a+53*r)%101;
      return 0===t||13===t?"down":t<6?"partial":"up";
    })),n=100-t.filter(e=>"up"!==e).length/e*.9;
    return {...a,list:t,uptime:n,incidents:aa[a.id]??[]};
  }), [e]);
  useEffect(()=>_(), [x,r,_]);
  let u=x.filter(e=>e.list.slice(-1).some(e=>"up"!==e)).length,b=x.reduce((e,a)=>e+a.uptime,0)/x.length;
  return (
    <div className={eZ("bg-white dark:bg-neutral-950",e0,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={eZ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {u>0&&<HugeiconsIcon icon={Icon_36474} size={18} strokeWidth={2} aria-hidden="true" className={eZ(e5,"shrink-0")} />}
                <h2 className={eZ("text-[17px]/[22px] font-extrabold","truncate")}>{u>0?`${u} service${u>1?"s":""} degraded`:"All systems operational"}</h2>
              </div>
              <p className={eZ(e8,"mt-0.5 truncate")}>
                {b.toFixed(3)}
                {"% average uptime over "}
                {e}
                {" days"}
              </p>
            </div>
            <div role="radiogroup" aria-label="History window" className={eZ("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {e4.map(r=>(
                <button key={r} type="button" role="radio" aria-checked={r===e} onClick={()=>{
                            a(r),s(null)
                          }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">
                            {r}
                            d
                          </button>
              ))}
            </div>
          </div>
          <div className={eZ("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
            <div ref={c} onScroll={_} className="h-full overflow-y-auto">
              <ul className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                {x.map(a=>{
                  let n=r===a.id,c=i?.id===a.id?i.i:null,d=null===c?"up":a.list[c];
                  return (
                    <li key={a.id} className="px-3 pt-1 pb-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <button type="button" aria-expanded={n} onClick={()=>l(n?null:a.id)} className="group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]">
                                        <span className="flex size-4 shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                        </span>
                                        <span className={eZ("text-[15px]/[20px] font-bold",e0,"truncate")}>{a.name}</span>
                                      </button>
                                      <p className={eZ("text-[13px]/[16px] font-semibold tabular-nums","grid shrink-0 justify-items-end text-right whitespace-nowrap")}>
                                        <span aria-hidden={null!==c} className={eZ(e2,"col-start-1 row-start-1 justify-self-end",null!==c&&"invisible")}>
                                          {a.uptime.toFixed(2)}
                                          % uptime
                                        </span>
                                        <span aria-hidden={null===c} className={eZ("col-start-1 row-start-1 inline-flex items-center justify-end gap-1.5 justify-self-end",null===c&&"invisible")}>
                                          <span className={e7[d]}>{ae[d]}</span>
                                          <span className={e2}>
                                            {null===c?e:e-c}
                                            d ago
                                          </span>
                                        </span>
                                      </p>
                                    </div>
                                    <div role="img" aria-label={`${a.name} daily status for the last ${e} days, ${a.uptime.toFixed(2)}% uptime`} onPointerLeave={()=>s(null)} className="mt-1 flex h-7 items-stretch gap-px sm:gap-[2px]">
                                      {a.list.map((e,r)=><span key={r} onPointerEnter={()=>s({id:a.id,i:r})} className={eZ("min-w-0 flex-1 rounded-[2px]",e3[e],c===r&&"border-2 border-neutral-900/30 dark:border-neutral-100/34")} />)}
                                    </div>
                                    {n&&<div className="mt-3">
                                      {0===a.incidents.length?<p className={eZ(e6,e1)}>No incidents recorded in this window.</p>:<ul className="space-y-2">
                                        {a.incidents.map(e=>(
                                          <li key={e.at} className={eZ(e6,"flex gap-3")}>
                                                                <span className={eZ(e2,"w-[52px] shrink-0")}>{e.at}</span>
                                                                <span className={eZ(e1,"min-w-0 flex-1")}>{e.text}</span>
                                                              </li>
                                        ))}
                                      </ul>}
                                    </div>}
                                  </li>
                  );
                })}
              </ul>
            </div>
            <div aria-hidden="true" className={eZ("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eZ("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={eZ("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","flex-wrap justify-between")}>
            <p>
              {e}
              {" days ago"}
            </p>
            <ul className="flex flex-wrap items-center gap-3 max-sm:order-last max-sm:basis-full">
              {["up","partial","down"].map(e=>(
                <li key={e} className="inline-flex items-center gap-1.5">
                            <span aria-hidden className={eZ("inline-block size-2.5 shrink-0 rounded-full",e3[e],"size-[6px]")} />
                            {ae[e]}
                          </li>
              ))}
            </ul>
            <p>Today</p>
          </div>
        </div>
      </div>
  );
}
