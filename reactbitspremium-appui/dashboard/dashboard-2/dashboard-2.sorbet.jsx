/**
 * React Bits Pro — Application UI (dashboard-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let h = "text-[13px]/[16px] font-semibold tabular-nums";

let w = (...e)=>e.filter(Boolean).join(" ");

let j = "text-neutral-900 dark:text-neutral-100";

let N = "text-neutral-900/78 dark:text-neutral-100/78";

let y = "text-neutral-900/62 dark:text-neutral-100/62";

let A = "text-[13px]/[16px] font-semibold tabular-nums";

let M = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let S = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let z = "text-right tabular-nums";

let R = "stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]";

let $ = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let D = [700,525,350,175,0];

let W = {"7 days":{total:3102,delta:"+8.2%",positive:true,series:[412,388,455,470,521,498,543],xLabels:["Mar 3","Mar 5","Mar 7","Mar 9"]},"30 days":{total:12847,delta:"+12.4%",positive:true,series:[360,402,388,430,455,470,442,498,512,505,548,560,595,610,640],xLabels:["Feb 8","Feb 15","Feb 22","Mar 1","Mar 8"]},"90 days":{total:41530,delta:"−1.6%",positive:false,series:[520,505,540,560,548,590,575,610,600,585,560,540,505,480,455],xLabels:["Dec 8","Jan 7","Feb 6","Mar 8"]}};

let L = [{source:"Organic search",pct:.4,conv:"3.9%",trend:[30,34,33,38,42,46,51]},{source:"Direct",pct:.24,conv:"5.1%",trend:[40,41,39,43,42,45,47]},{source:"Referral",pct:.17,conv:"2.8%",trend:[22,24,23,21,25,24,26]},{source:"Social",pct:.112,conv:"1.6%",trend:[18,20,24,22,19,17,15]},{source:"Email",pct:.078,conv:"6.4%",trend:[12,13,12,14,15,16,18]}];

let C = Object.keys(W);

function I(e){
  let a=100/(e.length-1);
  return e.map((e,r)=>`${0===r?"M":"L"}${(r*a).toFixed(2)} ${(100-e/700*100).toFixed(2)}`).join(" ");
}

function B({value:e,onChange:a,baseId:r,panelId:n}){
  let s=useRef([]),i=e=>{
    let r=(e+C.length)%C.length;
    a(C[r]),s.current[r]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="Date range" onKeyDown={a=>{
        let r=C.indexOf(e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),i(r+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),i(r-1)):"Home"===a.key?(a.preventDefault(),i(0)):"End"===a.key&&(a.preventDefault(),i(C.length-1))
      }} className={w("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
        {C.map((l,i)=>{
          let o=l===e;
          return (
            <button key={l} ref={e=>{
                    s.current[i]=e
                  }} type="button" role="radio" id={`${r}-${i}`} aria-checked={o} aria-controls={n} tabIndex={o?0:-1} onClick={()=>a(l)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{l}</button>
          );
        })}
      </div>
  );
}


export default function dashboard_2__Sorbet__Component(){
  var e;
  let a,[r,s]=useState("30 days"),i=W[r],d=useId(),x=`${d}-panel`,_=(a=i.delta,/^[−-]/.test(a)),h=useMemo(()=>{
    let e=function(e,a){
      let r=a.map(a=>e*a),t=r.map(Math.floor),l=t.reduce((e,a)=>e+a,0),n=r.map((e,a)=>({i:a,frac:e-Math.floor(e)})).sort((e,a)=>a.frac-e.frac);
      for(let a=0;a<e-l;a++)t[n[a].i]++;
      return t;
    }(i.total,L.map(e=>e.pct));
    return L.map((a,r)=>({...a,count:e[r],share:(100*a.pct).toFixed(1)}));
  }, [i.total]);
  return (
    <div className={w("bg-white dark:bg-neutral-950",j,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={w("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={w("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",j)}>Signups</h1>
          <B value={r} onChange={s} baseId={d} panelId={x} />
        </header>
        <div role="region" id={x} aria-labelledby={`${d}-${C.indexOf(r)}`} tabIndex={0} className={w("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6")}>
          <div className={w("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","min-h-0 flex-1 p-4 sm:p-5")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={w("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",j)}>{i.total.toLocaleString("en-US")}</p>
                <p className={w("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>
                  <HugeiconsIcon icon={_?Icon_37502:Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                  <span className="sr-only">{_?"Down":"Up"}</span>
                  {i.delta}
                  <span className={y}>
                    {"vs. previous "}
                    {r}
                  </span>
                </p>
              </div>
              <div className={w(A,y,"flex items-center gap-4 pt-1")}>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible"><line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} className={R} /></svg>
                  Signups
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} strokeDasharray="6 4" className={$} />
                  </svg>
                  Target
                </span>
              </div>
            </div>
            <div className="mt-5 flex min-h-0 flex-1 gap-3">
              <div className={w(A,y,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{D.map(e=><span key={e}>{e}</span>)}</div>
              <div className="relative min-h-0 flex-1">
                <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                  {D.map(e=>{
                    let a=100-e/700*100;
                    return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/12 dark:stroke-neutral-100/14":"stroke-neutral-900/6 dark:stroke-neutral-100/8"} strokeWidth={1} />;
                  })}
                  <line x1="0" x2="100" y1={28.57142857142857} y2={28.57142857142857} strokeDasharray="6 4" vectorEffect="non-scaling-stroke" className={$} strokeWidth={2} />
                  <path d={e=i.series,`${I(e)} L100 100 L0 100 Z`} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                  <path d={I(i.series)} fill="none" vectorEffect="non-scaling-stroke" className={R} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="w-10 shrink-0" aria-hidden />
              <div className={w(A,y,"flex min-w-0 flex-1 justify-between")}>{i.xLabels.map(e=><span key={e}>{e}</span>)}</div>
            </div>
          </div>
          <div className={w("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shrink-0")}>
            <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
              <caption className="sr-only">Signups by source</caption>
              <thead>
                <tr>
                  <th scope="col" className={w(M,"h-9 sm:first:pl-5")}>Source</th>
                  <th scope="col" className={w(M,z,"h-9")}>Signups</th>
                  <th scope="col" className={w(M,z,"hidden h-9 sm:table-cell")}>Share</th>
                  <th scope="col" className={w(M,z,"h-9")}>Conv. rate</th>
                  <th scope="col" className={w(M,"hidden h-9 text-right sm:table-cell sm:last:pr-5")}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {h.map(e=>{
                  var a;
                  let r,l;
                  return (
                    <tr key={e.source} className={w("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                    <td className={w(S,"sm:first:pl-5")}>{e.source}</td>
                                    <td className={w(S,z)}>{e.count.toLocaleString("en-US")}</td>
                                    <td className={w(S,z,"hidden sm:table-cell")}>
                                      <span className={N}>
                                        {e.share}
                                        %
                                      </span>
                                    </td>
                                    <td className={w(S,z)}><span className={N}>{e.conv}</span></td>
                                    <td className={w(S,"hidden text-right sm:table-cell sm:last:pr-5")}>
                                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="ml-auto h-5 w-16">
                                        <polyline points={r=Math.min(...a=e.trend),l=Math.max(...a)-r||1,a.map((e,t)=>{
                                          let n=t/(a.length-1)*100;
                                          return `${n.toFixed(2)},${(100-(e-r)/l*100).toFixed(2)}`;
                                        }).join(" ")} fill="none" vectorEffect="non-scaling-stroke" className={$} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
