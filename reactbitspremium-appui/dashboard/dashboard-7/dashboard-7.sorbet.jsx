/**
 * React Bits Pro — Application UI (dashboard-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, label, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99519 = [["path",{d:"M15.5 2V6M8.5 6V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 17V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11 9H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let e2 = (...e)=>e.filter(Boolean).join(" ");

let e5 = "text-neutral-900 dark:text-neutral-100";

let e6 = "text-neutral-900/62 dark:text-neutral-100/62";

let e8 = "text-[13px]/[16px] font-semibold tabular-nums";

let e4 = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let e9 = "@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1";

let e3 = "grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto";

let e7 = "flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4";

let ae = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let aa = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78";

let ar = "rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8";

let at = [{key:"ready",label:"Ready"},{key:"loading",label:"Loading"},{key:"empty",label:"Empty"}];

let al = [160,120,80,40,0];

let an = [109,112,118,121,127,131,136,140,144,148];

let as = ["Jun","Sep","Dec","Mar"];

let ai = [{label:"New business",value:"$9.1K",delta:"+12.4%",positive:true},{label:"Expansion",value:"$3.6K",delta:"+4.8%",positive:true},{label:"Churn",value:"$8.5K",delta:"+6.1%",positive:false}];

function ao(e){
  let a=100/(e.length-1);
  return e.map((e,r)=>`${0===r?"M":"L"}${(r*a).toFixed(2)} ${(100-e/160*100).toFixed(2)}`).join(" ");
}

function ac({className:e}){
  return <span className={e2(ar,"block",e)} />;
}

function ad({value:e,onChange:a,baseId:r,panelId:n}){
  let s=useRef([]),i=e=>{
    let r=(e+at.length)%at.length;
    a(at[r].key),s.current[r]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="View state" onKeyDown={a=>{
        let r=at.findIndex(a=>a.key===e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),i(r+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),i(r-1)):"Home"===a.key?(a.preventDefault(),i(0)):"End"===a.key&&(a.preventDefault(),i(at.length-1))
      }} className={e2("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
        {at.map((l,i)=>{
          let o=key===e;
          return (
            <button key={key} ref={e=>{
                    s.current[i]=e
                  }} type="button" role="radio" id={`${r}-${i}`} aria-checked={o} aria-controls={n} tabIndex={o?0:-1} onClick={()=>a(key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{label}</button>
          );
        })}
      </div>
  );
}


export default function dashboard_7__Sorbet__Component(){
  let[e,a]=useState("ready"),r=useId(),s=`${r}-panel`;
  return (
    <div className={e2("bg-white dark:bg-neutral-950",e5,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className={e2("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={e2("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",e5,"truncate")}>Recurring revenue</h1>
          <ad value={e} onChange={a} baseId={r} panelId={s} />
        </header>
        <div role="region" id={s} aria-labelledby={`${r}-${at.findIndex(a=>a.key===e)}`} tabIndex={0} className={e2("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex min-h-0 flex-1 flex-col")}>
          {"empty"===e&&<div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <HugeiconsIcon icon={Icon_99519} size={20} strokeWidth={2} aria-hidden="true" className={e2("text-neutral-900/78 dark:text-neutral-100/78","mb-3")} />
            <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No revenue data yet</p>
            <p className={e2("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-xs")}>
              Connect your billing provider to track recurring revenue, expansion, and churn in one place.
            </p>
            <button type="button" className={e2("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>Connect billing</button>
          </div>}
          {"loading"===e&&<div aria-hidden className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className={e2(e4,"min-h-0 flex-1 p-4")}>
              <ac className="my-0.5 h-3 w-40" />
              <ac className="mt-2.5 mb-1.5 h-8 w-48" />
              <div className={e2(ar,"mt-4 min-h-0 flex-1")} />
              <div className="mt-2 flex justify-between">
                <ac className="my-0.5 h-3 w-8" />
                <ac className="my-0.5 h-3 w-8" />
              </div>
            </div>
            <div className={e9}>
              <div className={e3}>
                {ai.map(e=>(
                  <div key={e.label} className={e7}>
                                <ac className="my-0.5 h-3 w-20" />
                                <ac className="my-1.5 h-6 w-16" />
                                <ac className="my-0.5 h-3 w-12" />
                              </div>
                ))}
              </div>
            </div>
          </div>}
          {"ready"===e&&<div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className={e2(e4,"min-h-0 flex-1 p-4")}>
              <div>
                <p className={ae}>Monthly recurring revenue</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <p className={e2("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",e5)}>$148.2K</p>
                  <p className={aa}>
                    <HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">Up</span>
                    +$4.2K
                    <span className={e6}>(+2.9%) vs. last month</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 gap-3">
                <div className={e2(e8,e6,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{al.map(e=><span key={e}>{0===e?"$0":`$${e}k`}</span>)}</div>
                <div className="relative min-h-0 flex-1">
                  <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    {al.map(e=>{
                      let a=100-e/160*100;
                      return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/12 dark:stroke-neutral-100/14":"stroke-neutral-900/6 dark:stroke-neutral-100/8"} strokeWidth={1} />;
                    })}
                    <path d={`${ao(an)} L100 100 L0 100 Z`} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                    <path d={ao(an)} fill="none" vectorEffect="non-scaling-stroke" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 flex gap-3">
                <div className="w-10 shrink-0" aria-hidden />
                <div className={e2(e8,e6,"flex min-w-0 flex-1 justify-between")}>{as.map(e=><span key={e}>{e}</span>)}</div>
              </div>
            </div>
            <div className={e9}>
              <div className={e3}>
                {ai.map(e=>{
                  let a,r=(a=e.delta,/^[−-]/.test(a));
                  return (
                    <div key={e.label} className={e7}>
                                    <p className={e2(ae,"text-pretty")}>{e.label}</p>
                                    <p className={e2("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto truncate")}>{e.value}</p>
                                    <p className={e2(aa,"truncate")}>
                                      <HugeiconsIcon icon={r?Icon_37502:Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                                      <span className="sr-only">{r?"Down":"Up"}</span>
                                      {e.delta}
                                      <span className={e2(e6,"hidden sm:inline")}>vs. last month</span>
                                    </p>
                                  </div>
                  );
                })}
              </div>
            </div>
          </div>}
        </div>
      </div>
  );
}
