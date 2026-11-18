/**
 * React Bits Pro — Application UI (ai-usage-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let n = (...e)=>e.filter(Boolean).join(" ");

let o = "text-neutral-900 dark:text-neutral-100";

let i = "text-neutral-900/62 dark:text-neutral-100/62";

let v = (...e)=>e.filter(Boolean).join(" ");

let g = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[15px]/[20px] font-bold";

let w = v("text-[14px]/[20px] font-medium",g);

let j = v("text-[13px]/[16px] font-semibold tabular-nums",g);

let N = v("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","bg-current");

let y = e=>e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${e}`;

let C = e=>`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

let A = [{name:"Atlas Pro",provider:"Meridian Labs",requests:48210,input:2148e5,output:614e5,cost:1565.4,delta:12.4},{name:"Atlas",provider:"Meridian Labs",requests:126940,input:3882e5,output:947e5,cost:812.06,delta:-4.1},{name:"Atlas Long",provider:"Meridian Labs",requests:6480,input:5126e5,output:189e5,cost:704.28,delta:31.7},{name:"Quill",provider:"Northwind AI",requests:71360,input:1421e5,output:403e5,cost:356.72,delta:2.8},{name:"Ember",provider:"Orbital",requests:213780,input:964e5,output:221e5,cost:118.94,delta:-18.3},{name:"Ember Mini",provider:"Orbital",requests:402150,input:617e5,output:148e5,cost:42.6,delta:46.2}];

let M = [{key:"cost",label:"Cost"},{key:"requests",label:"Requests"},{key:"tokens",label:"Tokens"}];

let L = (e,a)=>"cost"===a?e.cost:"requests"===a?e.requests:e.input+e.output;

function S({delta:e,className:a}){
  let r=e>=0;
  return (
    <span className={v("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78",a)}>
        <HugeiconsIcon icon={r?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">{r?"Up":"Down"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </span>
  );
}


export default function ai_usage_2__Sorbet__Component(){
  let[e,a]=useState("cost"),r=useMemo(()=>[...A].sort((a,r)=>L(r,e)-L(a,e)), [e]),n=r.reduce((e,a)=>e+a.cost,0),o=L(r[0],e),i=M.map(e=>e.key);
  return (
    <div className={v("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[940px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px]/[22px] font-extrabold">Spend by model</h2>
              <p className={v(w,"mt-0.5 truncate")}>
                {C(n)}
                {" across "}
                {r.length}
                {" models this billing period."}
              </p>
            </div>
            <div role="radiogroup" aria-label="Sort by" onKeyDown={r=>{
              var t,l,n;
              let o;
              return t=i.length,l=i.indexOf(e),n=e=>a(i[e]),void(!((o="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(o),r.currentTarget.querySelectorAll('[role="radio"]')[o]?.focus()));
            }} className={v("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {M.map(r=><button key={r.key} type="button" role="radio" aria-checked={r.key===e} tabIndex={r.key===e?0:-1} onClick={()=>a(r.key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r.label}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={v("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
              <div className={v(j,"hidden grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,0.8fr))_72px_minmax(0,0.8fr)_56px] items-center gap-4 px-3 py-2.5 sm:grid")}>
                <span>Model</span>
                <span className="text-right">Requests</span>
                <span className="text-right">Input</span>
                <span className="text-right">Output</span>
                <span>Share</span>
                <span className="text-right">Cost</span>
                <span />
              </div>
              {r.map(a=>{
                let r=L(a,e)/o;
                return (
                  <div key={a.name} className={v("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","flex flex-col gap-2 px-3 py-3 sm:grid sm:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,0.8fr))_72px_minmax(0,0.8fr)_56px] sm:items-center sm:gap-x-4 sm:gap-y-0 sm:py-2.5")}>
                                <div className="flex items-center justify-between gap-3 sm:block">
                                  <div className="min-w-0">
                                    <p className={v(f,"truncate")}>{a.name}</p>
                                    <p className={v(j,"truncate")}>{a.provider}</p>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-2 sm:hidden">
                                    <span className={v(f,"tabular-nums")}>{C(a.cost)}</span>
                                    <S delta={a.delta} />
                                  </div>
                                </div>
                                <p className={v(j,"flex flex-wrap gap-x-3 sm:hidden")}>
                                  <span>
                                    {y(a.requests)}
                                    {" req"}
                                  </span>
                                  <span>
                                    {y(a.input)}
                                    {" in"}
                                  </span>
                                  <span>
                                    {y(a.output)}
                                    {" out"}
                                  </span>
                                </p>
                                <p className={v(w,"hidden text-right tabular-nums sm:block")}>{y(a.requests)}</p>
                                <p className={v(w,"hidden text-right tabular-nums sm:block")}>{y(a.input)}</p>
                                <p className={v(w,"hidden text-right tabular-nums sm:block")}>{y(a.output)}</p>
                                <div className={v("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","h-1.5")} role="presentation">
                                  <div className={r>=.5?"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]":v(N,"block h-full")} style={{width:`${100*r}%`}} />
                                </div>
                                <p className={v(f,"hidden text-right tabular-nums sm:block")}>{C(a.cost)}</p>
                                <div className="hidden justify-end sm:flex"><S delta={a.delta} className="shrink-0" /></div>
                              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}
