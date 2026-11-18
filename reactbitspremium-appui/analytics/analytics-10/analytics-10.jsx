/**
 * React Bits Pro — Application UI (analytics-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { height, left, top, useMemo, useRef, useState, width } from 'react';
import { arc } from 'd3-shape';

let s = (...e)=>e.filter(Boolean).join(" "),
  i = "text-neutral-900 dark:text-neutral-100",
  o = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  d = "text-[13px]/[18px] font-normal",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = ["Q1","Q2","Q3","Q4"],
  h = {Q1:[{label:"Net new ARR",kind:"money",actual:4.2,target:5},{label:"Expansion revenue",kind:"money",actual:1.3,target:1.2},{label:"Logo retention",kind:"percent",actual:91,target:93}],Q2:[{label:"Net new ARR",kind:"money",actual:4.6,target:5},{label:"Expansion revenue",kind:"money",actual:.9,target:1.2},{label:"Logo retention",kind:"percent",actual:94,target:93}],Q3:[{label:"Net new ARR",kind:"money",actual:5.3,target:5},{label:"Expansion revenue",kind:"money",actual:1.1,target:1.4},{label:"Logo retention",kind:"percent",actual:89,target:93}],Q4:[{label:"Net new ARR",kind:"money",actual:3.9,target:6},{label:"Expansion revenue",kind:"money",actual:1.5,target:1.4},{label:"Logo retention",kind:"percent",actual:92,target:93}]},
  p = {Q1:8,Q2:14,Q3:11,Q4:5},
  m = (e,t)=>"money"===e?`$${t.toFixed(1)}M`:`${t.toFixed(0)}%`,
  f = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function b(){
  let e,[t,a]=useState("Q1"),[b,k]=useState(null),[g,v]=useState({x:0,y:0,ring:0}),w=useRef(null),y=useRef(null),j=h[t],N=useMemo(()=>j.map(e=>({goal:e,pct:e.actual/e.target})), [j]),_=N.reduce((e,t)=>e+t.pct,0)/N.length*100,M=(e,t,a)=>{
    let r=w.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),n=(y.current?.offsetWidth??144)/2,s=y.current?.offsetHeight??76,i=e-left,o=t-top;
    k(a),v({x:Math.min(Math.max(width-n,n),Math.max(n,i)),y:o-s-12>=0?o-s-12:Math.min(o+20,height-s),ring:a})
  },A=N[b??g.ring].goal;
  return (
    <div className={s("bg-white dark:bg-neutral-950",i,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={s("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={s(c,i)}>Quarterly goals</h2>
                <p className={s(d,o,"mt-0.5 truncate")}>
                  {"Attainment against plan, "}
                  {p[t]}
                  {" days left in"}
                  {" "}
                  {t}
                  .
                </p>
              </div>
              <div role="radiogroup" aria-label="Quarter" onKeyDown={f} className={s("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                {x.map(e=>(
                  <button key={e} type="button" role="radio" aria-checked={e===t} tabIndex={e===t?0:-1} onClick={()=>{
                                a(e),k(null)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>
                ))}
              </div>
            </div>
            <div className="px-5 py-8">
              <div ref={w} className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
                {N.map((e,t)=>{
                  let a=b===t?13:10,l=82-a,c=arc().innerRadius(l).outerRadius(82).startAngle(0).endAngle(2*Math.PI)({})??"",x=arc().innerRadius(l).outerRadius(82).cornerRadius(a/2).startAngle(0).endAngle(2*Math.PI*e.pct)({})??"";
                  return (
                    <div key={e.goal.label} tabIndex={0} role="button" aria-label={`${e.goal.label}: ${(100*e.pct).toFixed(1)} percent of target. ${m(e.goal.kind,e.goal.actual)} of ${m(e.goal.kind,e.goal.target)}.`} onPointerMove={e=>M(e.clientX,e.clientY,t)} onPointerLeave={()=>k(null)} onFocus={e=>{
                                    let a=e.currentTarget.getBoundingClientRect();
                                    M(a.left+a.width/2,a.top+a.height/2,t)
                                  }} onBlur={()=>k(null)} className={s("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","flex flex-col items-center px-2 py-2")}>
                                    <div className="relative" style={{width:168,height:168}}>
                                      <svg width={168} height={168} viewBox="0 0 168 168" className="overflow-visible" aria-hidden="true">
                                        <g transform="translate(84 84)">
                                          <path d={c} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                                          <path d={x} className="fill-neutral-900 dark:fill-neutral-100" />
                                        </g>
                                      </svg>
                                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={s("text-[32px]/[36px] font-[450] tabular-nums",i)}>
                                          {(100*e.pct).toFixed(0)}
                                          %
                                        </span>
                                        <span className={s(u,o,"mt-0.5 max-w-[6.5rem] truncate text-center")}>of target</span>
                                      </div>
                                    </div>
                                    <p className={s("text-[14px]/[16px] font-[450]",i,"mt-3")}>{e.goal.label}</p>
                                    <p className={s(d,o,"mt-0.5 tabular-nums")}>
                                      {m(e.goal.kind,e.goal.actual)}
                                      {" of"}
                                      {" "}
                                      {m(e.goal.kind,e.goal.target)}
                                    </p>
                                  </div>
                  );
                })}
                <div ref={y} aria-hidden="true" style={{left:g.x,top:g.y}} className={s("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===b?"opacity-0":"opacity-100")}>
                  <p className={s(u,"whitespace-nowrap")}>{A.label}</p>
                  <p className="whitespace-nowrap">
                    {(e=A.target-A.actual)<=0?"money"===A.kind?`$${Math.abs(e).toFixed(1)}M over target`:`${Math.abs(e).toFixed(1)} pts over target`:"money"===A.kind?`$${e.toFixed(1)}M to target`:`${e.toFixed(1)} pts to target`}
                  </p>
                  <p className={s(u,"whitespace-nowrap")}>
                    {p[t]}
                    {" days left in "}
                    {t}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <span className={s(d,o)}>Blended attainment</span>
              <span className={s(c,i,"tabular-nums")}>
                {_.toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}


export default b;
