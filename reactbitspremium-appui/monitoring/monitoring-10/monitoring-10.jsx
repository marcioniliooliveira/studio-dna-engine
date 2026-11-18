/**
 * React Bits Pro — Application UI (monitoring-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { area, line } from 'd3-shape';

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  u = "text-[13px]/[18px] font-normal",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  h = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  p = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  b = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  m = o(u,d),
  f = o(x,d),
  g = ["7d","30d","90d"],
  k = {"7d":7,"30d":30,"90d":26},
  v = [{id:"s1",name:"Checkout availability",indicator:"Successful charges / attempted charges",target:99.9,current:99.62,remaining:12,burn:4.2,seed:1.7},{id:"s2",name:"API latency",indicator:"Requests served under 500ms",target:99,current:99.24,remaining:64,burn:1.1,seed:4.3},{id:"s3",name:"Search freshness",indicator:"Documents indexed within 60s",target:99.5,current:99.44,remaining:38,burn:1.9,seed:6.9},{id:"s4",name:"Webhook delivery",indicator:"Events delivered within 5 minutes",target:99.9,current:99.97,remaining:88,burn:.4,seed:9.5},{id:"s5",name:"Dashboard uptime",indicator:"Successful page loads",target:99.95,current:99.99,remaining:92,burn:.2,seed:12.1}],
  w = e=>e<20?"danger":e<45?"warning":"ok",
  _ = {danger:o("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full rounded-[inherit]"),warning:o("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full rounded-[inherit]"),ok:"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"},
  j = {danger:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",ok:"text-neutral-900/80 dark:text-neutral-100/80"},
  y = {danger:"Budget critical",warning:"Burning fast",ok:"Healthy"},
  N = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function S(){
  let[e,t]=useState("30d"),[r,S]=useState("s1"),{ref:z,edges:A,onScroll:R}=function(){
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
  }(),C=v.find(e=>e.id===r)??v[0],E=useMemo(()=>{
    let t;
    return Array.from({length:t=k[e]},(e,r)=>{
      let a=r/(t-1);
      return Math.max(0,Math.min(100,100-(100-C.remaining)*a+(2.2*Math.sin(.8*r+C.seed)+1.4*Math.sin(.27*r+2*C.seed))*(1-.4*a)));
    });
  }, [C,e]),M=w(C.remaining),[D,W]=function(){
    let e=useRef(null),[t,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(([e])=>{
        let t=e.contentRect;
        r({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),P=useCallback(e=>e/(E.length-1)*Math.max(W.width-2,1)+1, [E.length,W.width]),L=useCallback(e=>146-e/100*138, []),O=line().x((e,t)=>P(t)).y(e=>L(e)).curve(s.G)(E)??"",$=area().x((e,t)=>P(t)).y0(150).y1(e=>L(e)).curve(s.G)(E)??"",T=`M ${P(0)} ${L(100)} L ${P(E.length-1)} ${L(0)}`;
  return (
    <div className={o("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Service level objectives</h2>
              <p className={o(m,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {v.length}
                  {" objectives"}
                </span>
                <span>
                  {v.filter(e=>"ok"!==w(e.remaining)).length}
                  {" spending budget faster than planned"}
                </span>
              </p>
            </div>
            <div role="radiogroup" aria-label="Compliance window" onKeyDown={N} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {g.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>t(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
          </div>
          <div className={o(h,"p-4")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className={o("text-[14px]/[16px] font-[450]","flex min-w-0 gap-x-2")}>
                  <span className="min-w-0 truncate">{C.name}</span>
                  <span className="shrink-0">error budget</span>
                </h3>
                <p className={o(m,"mt-0.5 truncate")}>{C.indicator}</p>
              </div>
              <div className="flex shrink-0 items-baseline gap-4">
                <p className="text-right">
                  <span className={o(x,d,"block")}>Remaining</span>
                  <span className={o(p,"justify-end")}>
                    <span className={o("danger"===M&&c)}>
                      {C.remaining}
                      %
                    </span>
                  </span>
                </p>
                <p className="text-right">
                  <span className={o(x,d,"block")}>Burn rate</span>
                  <span className={o(p,"justify-end")}>
                    {C.burn.toFixed(1)}
                    ×
                  </span>
                </p>
              </div>
            </div>
            <div ref={D} role="img" aria-label={`Error budget burn-down for ${C.name}, ${C.remaining}% remaining`} style={{height:150}} className="mt-3">
              {W.width>0&&<svg width={W.width} height={150} className="overflow-visible">
                {[.25,.5,.75].map(e=><line key={e} x1={0} x2={W.width} y1={150*e} y2={150*e} className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} shapeRendering="crispEdges" />)}
                <path d={T} fill="none" strokeWidth={1} strokeDasharray="6 4" className={b} />
                <path d={$} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                <path d={O} fill="none" stroke={"danger"===M?"currentColor":undefined} className={"danger"===M?c:"stroke-neutral-900 dark:stroke-neutral-100"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
            </div>
            <div className={o(f,"mt-2 flex items-center justify-between")}>
              <span>Window start</span>
              <span className="inline-flex items-center gap-1.5">
                <svg aria-hidden width={16} height={2} className="overflow-visible">
                  <line x1={0} x2={16} y1={1} y2={1} strokeWidth={1} strokeDasharray="6 4" className={b} />
                </svg>
                Planned burn
              </span>
              <span>Today</span>
            </div>
          </div>
          <div className={o(h,"relative min-h-0 flex-1")}>
            <div ref={z} onScroll={R} className="h-full overflow-y-auto">
              <ul className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","p-1")}>
                {v.map(e=>{
                  let t=w(e.remaining),n=e.id===r;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-pressed={n} onClick={()=>S(e.id)} className={o("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",n?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","cursor-pointer px-2")}>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="min-w-0 truncate">{e.name}</span></span>
                                        <span className={o(m,"flex flex-wrap gap-x-3")}>
                                          <span>
                                            {"Target "}
                                            {e.target}
                                            %
                                          </span>
                                          <span>
                                            {"current "}
                                            {e.current}
                                            %
                                          </span>
                                        </span>
                                      </span>
                                      <span className="hidden w-[140px] shrink-0 sm:block">
                                        <span role="progressbar" aria-valuenow={e.remaining} aria-valuemin={0} aria-valuemax={100} aria-label={`${e.name} budget remaining`} className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7"><span style={{width:`${e.remaining}%`}} className={_[t]} /></span>
                                        <span className={o(x,d,"mt-1 block")}>
                                          {e.remaining}
                                          % budget left
                                        </span>
                                      </span>
                                      <span className={o("text-right tabular-nums",u,"text-neutral-900/80 dark:text-neutral-100/80","w-[52px] shrink-0")}>
                                        {e.burn.toFixed(1)}
                                        ×
                                      </span>
                                      <span className={o("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",j[t],"w-[112px] shrink-0 justify-end max-md:hidden")}>{y[t]}</span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
            </div>
            <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",A.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",A.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default S;
