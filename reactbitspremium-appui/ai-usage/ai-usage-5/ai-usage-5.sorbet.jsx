/**
 * React Bits Pro — Application UI (ai-usage-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { left, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let n = (...e)=>e.filter(Boolean).join(" ");

let o = "text-neutral-900 dark:text-neutral-100";

let i = "text-neutral-900/62 dark:text-neutral-100/62";

let s = "inline-block size-2.5 shrink-0 rounded-full";

let c = n("text-[14px]/[20px] font-medium",i);

let d = n("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","bg-current");

let _ = n("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","bg-current");

let x = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;

let b = e=>e>=100?`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`:`$${e.toFixed(2)}`;

let G = (...e)=>e.filter(Boolean).join(" ");

let Y = "text-neutral-900 dark:text-neutral-100";

let ee = "text-[15px]/[20px] font-bold";

let ea = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let er = G("text-[14px]/[20px] font-medium","text-neutral-900/62 dark:text-neutral-100/62");

let et = e=>`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`;

function el({value:e,min:a,max:r,step:n,onChange:o,labelledBy:i}){
  let s=useRef(null),[c,d]=useState(false),_=(e-a)/(r-a)*100,x=e=>Math.min(r,Math.max(a,a+Math.round((e-a)/n)*n)),b=e=>{
    let t=s.current;
    if(!t)return;
    let l=t.getBoundingClientRect();
    width<=0||o(x(a+(e-left)/width*(r-a)))
  };
  return (
    <div className="relative flex h-4 min-w-0 flex-1 cursor-pointer touch-none items-center" onPointerDown={e=>{
        e.currentTarget.setPointerCapture(e.pointerId),e.currentTarget.querySelector('[role="slider"]')?.focus({preventScroll:true}),d(true),b(e.clientX)
      }} onPointerMove={e=>c&&b(e.clientX)} onPointerUp={()=>d(false)} onPointerCancel={()=>d(false)}>
        <div ref={s} className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className={G("absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]","left-0")} style={{width:`${_}%`}} />
          <span role="slider" tabIndex={0} aria-labelledby={i} aria-valuemin={a} aria-valuemax={r} aria-valuenow={e} aria-valuetext={et(e)} onKeyDown={t=>{
            let l="ArrowRight"===t.key||"ArrowUp"===t.key?e+n:"ArrowLeft"===t.key||"ArrowDown"===t.key?e-n:"PageUp"===t.key?e+4*n:"PageDown"===t.key?e-4*n:"Home"===t.key?a:"End"===t.key?r:null;
            null!==l&&(t.preventDefault(),o(x(l)))
          }} className="absolute top-1/2 block size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[scale] duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-110 active:cursor-grabbing motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-white" style={{left:`${_}%`}} />
        </div>
      </div>
  );
}

let en = [50,75,90];


export default function ai_usage_5__Sorbet__Component(){
  let[e,a]=useState(2500),[r,n]=useState([75,90]),[o,i]=useState(true),[s,c]=useState(false),d=Math.min(100,1840/e*100),_=Math.round(2612.7999999999997),x=_>e;
  return (
    <div className={G("bg-white dark:bg-neutral-950",Y,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[640px]">
          <div className="mb-3">
            <h2 className="text-[17px]/[22px] font-extrabold">Budget and alerts</h2>
            <p className={G(er,"mt-0.5")}>Cap monthly model spend and decide who hears about it.</p>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={G("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
              <div className="p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className={er}>This month</p>
                  <p className={G(er,"tabular-nums")}>
                    <span className={G("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",Y)}>{et(1840)}</span>
                    {" "}
                    {"of "}
                    {et(e)}
                  </p>
                </div>
                <div role="progressbar" aria-valuenow={Math.round(d)} aria-valuemin={0} aria-valuemax={100} aria-label="Budget consumed" className={G("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-3 h-2")}>
                  <div className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${d}%`}} />
                </div>
                <div className={G(er,"mt-3 flex items-start gap-2")}>
                  {x&&<HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={2} aria-hidden="true" className={G("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-0.5 shrink-0")} />}
                  <span className="min-w-0">
                    {"Projected "}
                    {et(_)}
                    {" at current pace"}
                    {x?", over budget on the 26th":", within budget"}
                    .
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p id="ai-usage-5-budget" className={ea}>Monthly cap</p>
                <div className="mt-2 flex items-center gap-3">
                  <el value={e} min={500} max={1e4} step={250} onChange={a} labelledBy="ai-usage-5-budget" />
                  <span className={G(ee,"w-16 shrink-0 text-right tabular-nums")}>{et(e)}</span>
                </div>
                <p className={G(ea,"mt-6")}>Notify at</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {en.map(e=>{
                    let a=r.includes(e);
                    return (
                      <button key={e} type="button" aria-pressed={a} onClick={()=>n(a=>a.includes(e)?a.filter(a=>a!==e):[...a,e].sort((e,a)=>e-a))} className={G("relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40","tabular-nums")}>
                                        {a&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />}
                                        {e}
                                        % of cap
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                {[["Pause requests at 100%","New calls return a quota error until the next cycle.",o,i],["Weekly spend digest","Sent to workspace admins every Monday.",s,c]].map(([e,a,r,l])=>(
                  <div key={e} className="flex items-center justify-between gap-4 px-3 py-3">
                                <div className="min-w-0">
                                  <p className={G(ee,"truncate")}>{e}</p>
                                  <p className={G(er,"truncate")}>{a}</p>
                                </div>
                                <button type="button" role="switch" aria-checked={r} aria-label={e} onClick={()=>l(!r)} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
                                  <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
                                </button>
                              </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
