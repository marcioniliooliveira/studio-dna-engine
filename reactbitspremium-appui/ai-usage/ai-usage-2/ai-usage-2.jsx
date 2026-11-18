/**
 * React Bits Pro — Application UI (ai-usage-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[14px]/[16px] font-[450]",
  u = o("text-[13px]/[18px] font-normal",d),
  x = o("text-[12px]/[16px] font-normal tabular-nums",d),
  p = o("text-neutral-900/66 dark:text-neutral-100/66","bg-current"),
  b = e=>e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${e}`,
  h = e=>`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,
  m = [{name:"Atlas Pro",provider:"Meridian Labs",requests:48210,input:2148e5,output:614e5,cost:1565.4,delta:12.4},{name:"Atlas",provider:"Meridian Labs",requests:126940,input:3882e5,output:947e5,cost:812.06,delta:-4.1},{name:"Atlas Long",provider:"Meridian Labs",requests:6480,input:5126e5,output:189e5,cost:704.28,delta:31.7},{name:"Quill",provider:"Northwind AI",requests:71360,input:1421e5,output:403e5,cost:356.72,delta:2.8},{name:"Ember",provider:"Orbital",requests:213780,input:964e5,output:221e5,cost:118.94,delta:-18.3},{name:"Ember Mini",provider:"Orbital",requests:402150,input:617e5,output:148e5,cost:42.6,delta:46.2}],
  k = [{key:"cost",label:"Cost"},{key:"requests",label:"Requests"},{key:"tokens",label:"Tokens"}],
  f = (e,a)=>"cost"===a?e.cost:"requests"===a?e.requests:e.input+e.output;

function _({delta:e,className:a}){
  let r=e>=0;
  return (
    <span className={o("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",a)}>
        <HugeiconsIcon icon={r?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" />
        <span className="sr-only">{r?"Up":"Down"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </span>
  );
}

function g(){
  let[e,a]=useState("cost"),r=useMemo(()=>[...m].sort((a,r)=>f(r,e)-f(a,e)), [e]),n=r.reduce((e,a)=>e+a.cost,0),s=f(r[0],e),i=k.map(e=>e.key);
  return (
    <div className={o("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[940px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Spend by model</h2>
              <p className={o(u,"mt-0.5 truncate")}>
                {h(n)}
                {" across "}
                {r.length}
                {" models this billing period."}
              </p>
            </div>
            <div role="radiogroup" aria-label="Sort by" onKeyDown={r=>{
              var t,l,n;
              let s;
              return t=i.length,l=i.indexOf(e),n=e=>a(i[e]),void(!((s="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(s),r.currentTarget.querySelectorAll('[role="radio"]')[s]?.focus()));
            }} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {k.map(r=><button key={r.key} type="button" role="radio" aria-checked={r.key===e} tabIndex={r.key===e?0:-1} onClick={()=>a(r.key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r.label}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div className={o(x,"hidden grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,0.8fr))_72px_minmax(0,0.8fr)_56px] items-center gap-4 px-3 py-2.5 sm:grid")}>
                <span>Model</span>
                <span className="text-right">Requests</span>
                <span className="text-right">Input</span>
                <span className="text-right">Output</span>
                <span>Share</span>
                <span className="text-right">Cost</span>
                <span />
              </div>
              {r.map(a=>{
                let r=f(a,e)/s;
                return (
                  <div key={a.name} className={o("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","flex flex-col gap-2 px-3 py-3 sm:grid sm:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,0.8fr))_72px_minmax(0,0.8fr)_56px] sm:items-center sm:gap-x-4 sm:gap-y-0 sm:py-2.5")}>
                                <div className="flex items-center justify-between gap-3 sm:block">
                                  <div className="min-w-0">
                                    <p className={o(c,"truncate")}>{a.name}</p>
                                    <p className={o(x,"truncate")}>{a.provider}</p>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-2 sm:hidden">
                                    <span className={o(c,"tabular-nums")}>{h(a.cost)}</span>
                                    <_ delta={a.delta} />
                                  </div>
                                </div>
                                <p className={o(x,"flex flex-wrap gap-x-3 sm:hidden")}>
                                  <span>
                                    {b(a.requests)}
                                    {" req"}
                                  </span>
                                  <span>
                                    {b(a.input)}
                                    {" in"}
                                  </span>
                                  <span>
                                    {b(a.output)}
                                    {" out"}
                                  </span>
                                </p>
                                <p className={o(u,"hidden text-right tabular-nums sm:block")}>{b(a.requests)}</p>
                                <p className={o(u,"hidden text-right tabular-nums sm:block")}>{b(a.input)}</p>
                                <p className={o(u,"hidden text-right tabular-nums sm:block")}>{b(a.output)}</p>
                                <div className={o("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","h-1.5")} role="presentation">
                                  <div className={r>=.5?"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100":o(p,"block h-full")} style={{width:`${100*r}%`}} />
                                </div>
                                <p className={o(c,"hidden text-right tabular-nums sm:block")}>{h(a.cost)}</p>
                                <div className="hidden justify-end sm:flex"><_ delta={a.delta} className="shrink-0" /></div>
                              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
