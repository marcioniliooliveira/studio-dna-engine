/**
 * React Bits Pro — Application UI (dashboard-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  h = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  p = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  m = "text-right tabular-nums",
  b = "stroke-neutral-900 dark:stroke-neutral-100",
  f = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  v = [700,525,350,175,0],
  k = {"7 days":{total:3102,delta:"+8.2%",positive:true,series:[412,388,455,470,521,498,543],xLabels:["Mar 3","Mar 5","Mar 7","Mar 9"]},"30 days":{total:12847,delta:"+12.4%",positive:true,series:[360,402,388,430,455,470,442,498,512,505,548,560,595,610,640],xLabels:["Feb 8","Feb 15","Feb 22","Mar 1","Mar 8"]},"90 days":{total:41530,delta:"−1.6%",positive:false,series:[520,505,540,560,548,590,575,610,600,585,560,540,505,480,455],xLabels:["Dec 8","Jan 7","Feb 6","Mar 8"]}},
  g = [{source:"Organic search",pct:.4,conv:"3.9%",trend:[30,34,33,38,42,46,51]},{source:"Direct",pct:.24,conv:"5.1%",trend:[40,41,39,43,42,45,47]},{source:"Referral",pct:.17,conv:"2.8%",trend:[22,24,23,21,25,24,26]},{source:"Social",pct:.112,conv:"1.6%",trend:[18,20,24,22,19,17,15]},{source:"Email",pct:.078,conv:"6.4%",trend:[12,13,12,14,15,16,18]}],
  _ = Object.keys(k);

function j(e){
  let a=100/(e.length-1);
  return e.map((e,t)=>`${0===t?"M":"L"}${(t*a).toFixed(2)} ${(100-e/700*100).toFixed(2)}`).join(" ");
}

function w({value:e,onChange:a,baseId:t,panelId:s}){
  let n=useRef([]),i=e=>{
    let t=(e+_.length)%_.length;
    a(_[t]),n.current[t]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="Date range" onKeyDown={a=>{
        let t=_.indexOf(e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),i(t+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),i(t-1)):"Home"===a.key?(a.preventDefault(),i(0)):"End"===a.key&&(a.preventDefault(),i(_.length-1))
      }} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
        {_.map((l,i)=>{
          let o=l===e;
          return (
            <button key={l} ref={e=>{
                    n.current[i]=e
                  }} type="button" role="radio" id={`${t}-${i}`} aria-checked={o} aria-controls={s} tabIndex={o?0:-1} onClick={()=>a(l)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{l}</button>
          );
        })}
      </div>
  );
}

function N(){
  var e;
  let a,[t,N]=useState("30 days"),y=k[t],M=useId(),A=`${M}-panel`,$=(a=y.delta,/^[−-]/.test(a)),S=useMemo(()=>{
    let e=function(e,a){
      let t=a.map(a=>e*a),r=t.map(Math.floor),l=r.reduce((e,a)=>e+a,0),s=t.map((e,a)=>({i:a,frac:e-Math.floor(e)})).sort((e,a)=>a.frac-e.frac);
      for(let a=0;a<e-l;a++)r[s[a].i]++;
      return r;
    }(y.total,g.map(e=>e.pct));
    return g.map((a,t)=>({...a,count:e[t],share:(100*a.pct).toFixed(1)}));
  }, [y.total]);
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={o("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d)}>Signups</h1>
          <w value={t} onChange={N} baseId={M} panelId={A} />
        </header>
        <div role="region" id={A} aria-labelledby={`${M}-${_.indexOf(t)}`} tabIndex={0} className={o("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6")}>
          <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1 p-4 sm:p-5")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={o("text-[40px]/[44px] font-[450] tabular-nums",d)}>{y.total.toLocaleString("en-US")}</p>
                <p className={o("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                  <HugeiconsIcon icon={$?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                  <span className="sr-only">{$?"Down":"Up"}</span>
                  {y.delta}
                  <span className={u}>
                    {"vs. previous "}
                    {t}
                  </span>
                </p>
              </div>
              <div className={o(x,u,"flex items-center gap-4 pt-1")}>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible"><line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} className={b} /></svg>
                  Signups
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} strokeDasharray="6 4" className={f} />
                  </svg>
                  Target
                </span>
              </div>
            </div>
            <div className="mt-5 flex min-h-0 flex-1 gap-3">
              <div className={o(x,u,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{v.map(e=><span key={e}>{e}</span>)}</div>
              <div className="relative min-h-0 flex-1">
                <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                  {v.map(e=>{
                    let a=100-e/700*100;
                    return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />;
                  })}
                  <line x1="0" x2="100" y1={28.57142857142857} y2={28.57142857142857} strokeDasharray="6 4" vectorEffect="non-scaling-stroke" className={f} strokeWidth={2} />
                  <path d={e=y.series,`${j(e)} L100 100 L0 100 Z`} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                  <path d={j(y.series)} fill="none" vectorEffect="non-scaling-stroke" className={b} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="w-10 shrink-0" aria-hidden />
              <div className={o(x,u,"flex min-w-0 flex-1 justify-between")}>{y.xLabels.map(e=><span key={e}>{e}</span>)}</div>
            </div>
          </div>
          <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","shrink-0")}>
            <table className="w-full border-separate border-spacing-0 text-left text-[14px]/[20px]">
              <caption className="sr-only">Signups by source</caption>
              <thead>
                <tr>
                  <th scope="col" className={o(h,"h-9 sm:first:pl-5")}>Source</th>
                  <th scope="col" className={o(h,m,"h-9")}>Signups</th>
                  <th scope="col" className={o(h,m,"hidden h-9 sm:table-cell")}>Share</th>
                  <th scope="col" className={o(h,m,"h-9")}>Conv. rate</th>
                  <th scope="col" className={o(h,"hidden h-9 text-right sm:table-cell sm:last:pr-5")}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {S.map(e=>{
                  var a;
                  let t,l;
                  return (
                    <tr key={e.source} className={o("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                    <td className={o(p,"sm:first:pl-5")}>{e.source}</td>
                                    <td className={o(p,m)}>{e.count.toLocaleString("en-US")}</td>
                                    <td className={o(p,m,"hidden sm:table-cell")}>
                                      <span className={c}>
                                        {e.share}
                                        %
                                      </span>
                                    </td>
                                    <td className={o(p,m)}><span className={c}>{e.conv}</span></td>
                                    <td className={o(p,"hidden text-right sm:table-cell sm:last:pr-5")}>
                                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="ml-auto h-5 w-16">
                                        <polyline points={t=Math.min(...a=e.trend),l=Math.max(...a)-t||1,a.map((e,r)=>{
                                          let s=r/(a.length-1)*100;
                                          return `${s.toFixed(2)},${(100-(e-t)/l*100).toFixed(2)}`;
                                        }).join(" ")} fill="none" vectorEffect="non-scaling-stroke" className={f} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </td>
                                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}


export default N;
