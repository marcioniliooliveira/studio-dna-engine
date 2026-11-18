/**
 * React Bits Pro — Application UI (analytics-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { height, left, top, useMemo, useRef, useState, width } from 'react';

let b = (...e)=>e.filter(Boolean).join(" ");

let e5 = (...e)=>e.filter(Boolean).join(" ");

let e6 = "text-neutral-900 dark:text-neutral-100";

let e4 = "text-neutral-900/62 dark:text-neutral-100/62";

let e8 = "rounded-[var(--rb-r-sm,6px)]";

let e3 = "text-[17px]/[22px] font-extrabold";

let e9 = "text-[14px]/[20px] font-medium";

let e7 = "text-[13px]/[16px] font-semibold tabular-nums";

let ae = "text-right tabular-nums";

let aa = ["Visited pricing","Started trial","Invited a teammate","Connected a repo","Converted to paid"];

let at = ["All traffic","Organic","Paid"];

let ar = {"All traffic":[24e3,8400,5100,3600,2050],Organic:[9800,4900,1850,1300,880],Paid:[14200,5400,3500,2600,900]};


export default function analytics_8__Sorbet__Component(){
  let[e,a]=useState("All traffic"),[t,n]=useState(null),s=useRef(null),i=useRef(null),[o,c]=useState({x:0,y:0,row:0}),d=ar[e],x=useMemo(()=>{
    let e=d[0];
    return d.map((a,t)=>({stage:aa[t],count:a,ratio:a/e,fromTop:a/e*100,fromPrev:0===t?100:a/d[t-1]*100,lost:0===t?0:d[t-1]-a,dropPct:0===t?0:(d[t-1]-a)/d[t-1]*100}));
  }, [d]),_=useMemo(()=>{
    let e=1;
    for(let a=2;a<x.length;a++)x[a].dropPct>x[e].dropPct&&(e=a);
    return e;
  }, [x]),u=x[x.length-1].fromTop,h=(e,a,t)=>{
    let r=s.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),o=(i.current?.offsetWidth??256)/2,d=i.current?.offsetHeight??76,x=e-left,_=a-top;
    n(t),c({x:Math.min(Math.max(width-o,o),Math.max(o,x)),y:_-d-12>=0?_-d-12:Math.min(_+20,height-d),row:t})
  },p=x[t??o.row],b=e=>{
    a(e),n(null)
  };
  return (
    <div className={e5("bg-white dark:bg-neutral-950",e6,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={e5("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={e5("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={e5(e3,e6)}>Signup funnel</h2>
                <p className={e5(e9,e4,"mt-0.5 truncate")}>Self-serve activation, pricing page to paid.</p>
              </div>
              <div role="radiogroup" aria-label="Cohort" onKeyDown={a=>{
                var t,r,l;
                let n;
                return t=at.length,r=at.indexOf(e),l=e=>b(at[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(r+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(r-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
              }} className={e5("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                {at.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>b(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
              </div>
            </div>
            <div className="px-5 py-4">
              <div ref={s} className="relative">
                {x.map((e,a)=>(
                  <div key={e.stage}>
                                {a>0&&<div className={e5(e7,e4,"flex h-4 items-center gap-1.5")}>
                                  <span>
                                    −
                                    {e.lost.toLocaleString("en-US")}
                                    {" lost"}
                                  </span>
                                  <span>
                                    {e.dropPct.toFixed(1)}
                                    % drop
                                  </span>
                                  {a===_&&<span className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]">Steepest fall</span>}
                                </div>}
                                <div tabIndex={0} role="button" aria-label={`${e.stage}: ${e.count.toLocaleString("en-US")} users, ${e.fromTop.toFixed(1)} percent of visitors.`} onPointerMove={e=>h(e.clientX,e.clientY,a)} onPointerLeave={()=>n(null)} onFocus={e=>{
                                  let t=e.currentTarget.getBoundingClientRect();
                                  h(t.left+t.width/2,t.top,a)
                                }} onBlur={()=>n(null)} style={{touchAction:"pan-y"}} className={e5("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-4xl,18px)]",t===a&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","-mx-2 cursor-default px-2 py-1.5")}>
                                  <div className="mb-1 flex items-baseline justify-between gap-3">
                                    <span className={e5("text-[15px]/[20px] font-bold",e6,"min-w-0 truncate")}>{e.stage}</span>
                                    <span className={e5(e9,e4,ae,"flex shrink-0 gap-2")}>
                                      <span className={e6}>{e.count.toLocaleString("en-US")}</span>
                                      <span>
                                        {e.fromTop.toFixed(1)}
                                        %
                                      </span>
                                    </span>
                                  </div>
                                  <div className={e5("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8",e8,"h-7 w-full overflow-hidden")}>
                                    <div className={e5("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]",e8,"h-full bg-current")} style={{width:`${100*e.ratio}%`}} />
                                  </div>
                                </div>
                              </div>
                ))}
                <div ref={i} aria-hidden="true" style={{left:o.x,top:o.y}} className={e5("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={e5(e7,"whitespace-nowrap")}>{p.stage}</p>
                  <p className="whitespace-nowrap">
                    {p.count.toLocaleString("en-US")}
                    {" users"}
                  </p>
                  <p className={e5(e7,"flex gap-2 whitespace-nowrap")}>
                    <span>
                      {p.fromPrev.toFixed(1)}
                      % from previous
                    </span>
                    <span>
                      {p.fromTop.toFixed(1)}
                      % from top
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <span className={e5(e9,e4)}>Visitor to paid conversion</span>
              <span className={e5(e3,e6,ae)}>
                {u.toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}
