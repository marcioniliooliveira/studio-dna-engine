/**
 * React Bits Pro — Application UI (analytics-10 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { height, left, top, useMemo, useRef, useState, width } from 'react';
import { arc } from 'd3-shape';

let ak = (...e)=>e.filter(Boolean).join(" ");

let af = "text-neutral-900 dark:text-neutral-100";

let ag = "text-neutral-900/62 dark:text-neutral-100/62";

let av = "text-[17px]/[22px] font-extrabold";

let aw = "text-[14px]/[20px] font-medium";

let ay = "text-[13px]/[16px] font-semibold tabular-nums";

let aj = ["Q1","Q2","Q3","Q4"];

let aN = {Q1:[{label:"Net new ARR",kind:"money",actual:4.2,target:5},{label:"Expansion revenue",kind:"money",actual:1.3,target:1.2},{label:"Logo retention",kind:"percent",actual:91,target:93}],Q2:[{label:"Net new ARR",kind:"money",actual:4.6,target:5},{label:"Expansion revenue",kind:"money",actual:.9,target:1.2},{label:"Logo retention",kind:"percent",actual:94,target:93}],Q3:[{label:"Net new ARR",kind:"money",actual:5.3,target:5},{label:"Expansion revenue",kind:"money",actual:1.1,target:1.4},{label:"Logo retention",kind:"percent",actual:89,target:93}],Q4:[{label:"Net new ARR",kind:"money",actual:3.9,target:6},{label:"Expansion revenue",kind:"money",actual:1.5,target:1.4},{label:"Logo retention",kind:"percent",actual:92,target:93}]};

let aM = {Q1:8,Q2:14,Q3:11,Q4:5};

let aA = (e,a)=>"money"===e?`$${a.toFixed(1)}M`:`${a.toFixed(0)}%`;

let aS = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=t.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?t.length-1:(r+a+t.length)%t.length;
  t[l].focus(),t[l].click()
};


export default function analytics_10__Sorbet__Component(){
  let e,[a,t]=useState("Q1"),[n,s]=useState(null),[i,o]=useState({x:0,y:0,ring:0}),c=useRef(null),d=useRef(null),x=aN[a],_=useMemo(()=>x.map(e=>({goal:e,pct:e.actual/e.target})), [x]),u=_.reduce((e,a)=>e+a.pct,0)/_.length*100,h=(e,a,t)=>{
    let r=c.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),n=(d.current?.offsetWidth??144)/2,i=d.current?.offsetHeight??76,x=e-left,_=a-top;
    s(t),o({x:Math.min(Math.max(width-n,n),Math.max(n,x)),y:_-i-12>=0?_-i-12:Math.min(_+20,height-i),ring:t})
  },p=_[n??i.ring].goal;
  return (
    <div className={ak("bg-white dark:bg-neutral-950",af,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={ak("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={ak("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={ak(av,af)}>Quarterly goals</h2>
                <p className={ak(aw,ag,"mt-0.5 truncate")}>
                  {"Attainment against plan, "}
                  {aM[a]}
                  {" days left in"}
                  {" "}
                  {a}
                  .
                </p>
              </div>
              <div role="radiogroup" aria-label="Quarter" onKeyDown={aS} className={ak("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                {aj.map(e=>(
                  <button key={e} type="button" role="radio" aria-checked={e===a} tabIndex={e===a?0:-1} onClick={()=>{
                                t(e),s(null)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e}</button>
                ))}
              </div>
            </div>
            <div className="px-5 py-8">
              <div ref={c} className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
                {_.map((e,a)=>{
                  let t=n===a?13:10,l=82-t,i=arc().innerRadius(l).outerRadius(82).startAngle(0).endAngle(2*Math.PI)({})??"",o=arc().innerRadius(l).outerRadius(82).cornerRadius(t/2).startAngle(0).endAngle(2*Math.PI*e.pct)({})??"";
                  return (
                    <div key={e.goal.label} tabIndex={0} role="button" aria-label={`${e.goal.label}: ${(100*e.pct).toFixed(1)} percent of target. ${aA(e.goal.kind,e.goal.actual)} of ${aA(e.goal.kind,e.goal.target)}.`} onPointerMove={e=>h(e.clientX,e.clientY,a)} onPointerLeave={()=>s(null)} onFocus={e=>{
                                    let t=e.currentTarget.getBoundingClientRect();
                                    h(t.left+t.width/2,t.top+t.height/2,a)
                                  }} onBlur={()=>s(null)} className={ak("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","flex flex-col items-center px-2 py-2")}>
                                    <div className="relative" style={{width:168,height:168}}>
                                      <svg width={168} height={168} viewBox="0 0 168 168" className="overflow-visible" aria-hidden="true">
                                        <g transform="translate(84 84)">
                                          <path d={i} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                                          <path d={o} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]" />
                                        </g>
                                      </svg>
                                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={ak("text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums",af)}>
                                          {(100*e.pct).toFixed(0)}
                                          %
                                        </span>
                                        <span className={ak(ay,ag,"mt-0.5 max-w-[6.5rem] truncate text-center")}>of target</span>
                                      </div>
                                    </div>
                                    <p className={ak("text-[15px]/[20px] font-bold",af,"mt-3")}>{e.goal.label}</p>
                                    <p className={ak(aw,ag,"mt-0.5 tabular-nums")}>
                                      {aA(e.goal.kind,e.goal.actual)}
                                      {" of"}
                                      {" "}
                                      {aA(e.goal.kind,e.goal.target)}
                                    </p>
                                  </div>
                  );
                })}
                <div ref={d} aria-hidden="true" style={{left:i.x,top:i.y}} className={ak("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===n?"opacity-0":"opacity-100")}>
                  <p className={ak(ay,"whitespace-nowrap")}>{p.label}</p>
                  <p className="whitespace-nowrap">
                    {(e=p.target-p.actual)<=0?"money"===p.kind?`$${Math.abs(e).toFixed(1)}M over target`:`${Math.abs(e).toFixed(1)} pts over target`:"money"===p.kind?`$${e.toFixed(1)}M to target`:`${e.toFixed(1)} pts to target`}
                  </p>
                  <p className={ak(ay,"whitespace-nowrap")}>
                    {aM[a]}
                    {" days left in "}
                    {a}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <span className={ak(aw,ag)}>Blended attainment</span>
              <span className={ak(av,af,"tabular-nums")}>
                {u.toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}
