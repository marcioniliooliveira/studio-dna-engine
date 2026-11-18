/**
 * React Bits Pro — Application UI (monitoring-10 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { area, line } from 'd3-shape';

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "text-[15px]/[20px] font-bold";

let m = "text-[14px]/[20px] font-medium";

let k = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let f = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let g = u(m,h);

let v = u("text-[13px]/[16px] font-semibold tabular-nums",h);

let re = (...e)=>e.filter(Boolean).join(" ");

let ra = "text-neutral-900/62 dark:text-neutral-100/62";

let rr = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let rt = "text-[14px]/[20px] font-medium";

let rn = "text-[13px]/[16px] font-semibold tabular-nums";

let rl = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let ri = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let rs = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let ro = re(rt,ra);

let rc = re(rn,ra);

let rd = ["7d","30d","90d"];

let r_ = {"7d":7,"30d":30,"90d":26};

let rx = [{id:"s1",name:"Checkout availability",indicator:"Successful charges / attempted charges",target:99.9,current:99.62,remaining:12,burn:4.2,seed:1.7},{id:"s2",name:"API latency",indicator:"Requests served under 500ms",target:99,current:99.24,remaining:64,burn:1.1,seed:4.3},{id:"s3",name:"Search freshness",indicator:"Documents indexed within 60s",target:99.5,current:99.44,remaining:38,burn:1.9,seed:6.9},{id:"s4",name:"Webhook delivery",indicator:"Events delivered within 5 minutes",target:99.9,current:99.97,remaining:88,burn:.4,seed:9.5},{id:"s5",name:"Dashboard uptime",indicator:"Successful page loads",target:99.95,current:99.99,remaining:92,burn:.2,seed:12.1}];

let ru = e=>e<20?"danger":e<45?"warning":"ok";

let rb = {danger:re("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full rounded-[inherit]"),warning:re("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full rounded-[inherit]"),ok:"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"};

let rh = {danger:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",ok:"text-neutral-900/78 dark:text-neutral-100/78"};

let rp = {danger:"Budget critical",warning:"Burning fast",ok:"Healthy"};

let rm = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=r.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(t+a+r.length)%r.length;
  r[n].focus(),r[n].click()
};


export default function monitoring_10__Sorbet__Component(){
  let[e,a]=useState("30d"),[r,o]=useState("s1"),{ref:c,edges:d,onScroll:_}=function(){
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
  }(),x=rx.find(e=>e.id===r)??rx[0],u=useMemo(()=>{
    let a;
    return Array.from({length:a=r_[e]},(e,r)=>{
      let t=r/(a-1);
      return Math.max(0,Math.min(100,100-(100-x.remaining)*t+(2.2*Math.sin(.8*r+x.seed)+1.4*Math.sin(.27*r+2*x.seed))*(1-.4*t)));
    });
  }, [x,e]),b=ru(x.remaining),[h,p]=function(){
    let e=useRef(null),[a,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(([e])=>{
        let a=e.contentRect;
        r({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),m=useCallback(e=>e/(u.length-1)*Math.max(p.width-2,1)+1, [u.length,p.width]),k=useCallback(e=>146-e/100*138, []),f=line().x((e,a)=>m(a)).y(e=>k(e)).curve(i.G)(u)??"",g=area().x((e,a)=>m(a)).y0(150).y1(e=>k(e)).curve(i.G)(u)??"",v=`M ${m(0)} ${k(100)} L ${m(u.length-1)} ${k(0)}`;
  return (
    <div className={re("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[700px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={re("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <h2 className={re("text-[17px]/[22px] font-extrabold","truncate")}>Service level objectives</h2>
              <p className={re(ro,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {rx.length}
                  {" objectives"}
                </span>
                <span>
                  {rx.filter(e=>"ok"!==ru(e.remaining)).length}
                  {" spending budget faster than planned"}
                </span>
              </p>
            </div>
            <div role="radiogroup" aria-label="Compliance window" onKeyDown={rm} className={re("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {rd.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
          </div>
          <div className={re(rl,"p-4")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className={re("text-[15px]/[20px] font-bold","flex min-w-0 gap-x-2")}>
                  <span className="min-w-0 truncate">{x.name}</span>
                  <span className="shrink-0">error budget</span>
                </h3>
                <p className={re(ro,"mt-0.5 truncate")}>{x.indicator}</p>
              </div>
              <div className="flex shrink-0 items-baseline gap-4">
                <p className="text-right">
                  <span className={re(rn,ra,"block")}>Remaining</span>
                  <span className={re(ri,"justify-end")}>
                    <span className={re("danger"===b&&rr)}>
                      {x.remaining}
                      %
                    </span>
                  </span>
                </p>
                <p className="text-right">
                  <span className={re(rn,ra,"block")}>Burn rate</span>
                  <span className={re(ri,"justify-end")}>
                    {x.burn.toFixed(1)}
                    ×
                  </span>
                </p>
              </div>
            </div>
            <div ref={h} role="img" aria-label={`Error budget burn-down for ${x.name}, ${x.remaining}% remaining`} style={{height:150}} className="mt-3">
              {p.width>0&&<svg width={p.width} height={150} className="overflow-visible">
                {[.25,.5,.75].map(e=><line key={e} x1={0} x2={p.width} y1={150*e} y2={150*e} className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} shapeRendering="crispEdges" />)}
                <path d={v} fill="none" strokeWidth={1} strokeDasharray="6 4" className={rs} />
                <path d={g} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                <path d={f} fill="none" stroke={"danger"===b?"currentColor":undefined} className={"danger"===b?rr:"stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
            </div>
            <div className={re(rc,"mt-2 flex items-center justify-between")}>
              <span>Window start</span>
              <span className="inline-flex items-center gap-1.5">
                <svg aria-hidden width={16} height={2} className="overflow-visible">
                  <line x1={0} x2={16} y1={1} y2={1} strokeWidth={1} strokeDasharray="6 4" className={rs} />
                </svg>
                Planned burn
              </span>
              <span>Today</span>
            </div>
          </div>
          <div className={re(rl,"relative min-h-0 flex-1")}>
            <div ref={c} onScroll={_} className="h-full overflow-y-auto">
              <ul className={re("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-1")}>
                {rx.map(e=>{
                  let a=ru(e.remaining),n=e.id===r;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-pressed={n} onClick={()=>o(e.id)} className={re("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",n?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","rounded-[var(--rb-r-4xl,18px)]","cursor-pointer px-2")}>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="min-w-0 truncate">{e.name}</span></span>
                                        <span className={re(ro,"flex flex-wrap gap-x-3")}>
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
                                        <span role="progressbar" aria-valuenow={e.remaining} aria-valuemin={0} aria-valuemax={100} aria-label={`${e.name} budget remaining`} className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]"><span style={{width:`${e.remaining}%`}} className={rb[a]} /></span>
                                        <span className={re(rn,ra,"mt-1 block")}>
                                          {e.remaining}
                                          % budget left
                                        </span>
                                      </span>
                                      <span className={re("text-right tabular-nums",rt,"text-neutral-900/78 dark:text-neutral-100/78","w-[52px] shrink-0")}>
                                        {e.burn.toFixed(1)}
                                        ×
                                      </span>
                                      <span className={re("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",rh[a],"w-[112px] shrink-0 justify-end max-md:hidden")}>{rp[a]}</span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
            </div>
            <div aria-hidden="true" className={re("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={re("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
