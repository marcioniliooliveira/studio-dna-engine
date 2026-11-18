/**
 * React Bits Pro — Application UI (dashboard-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, label, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99519 = [["path",{d:"M15.5 2V6M8.5 6V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 17V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11 9H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  h = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  p = "@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900",
  m = "grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8",
  b = "flex min-w-0 flex-col gap-2 px-4 py-3",
  f = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  v = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",
  k = "rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8",
  g = [{key:"ready",label:"Ready"},{key:"loading",label:"Loading"},{key:"empty",label:"Empty"}],
  _ = [160,120,80,40,0],
  j = [109,112,118,121,127,131,136,140,144,148],
  w = ["Jun","Sep","Dec","Mar"],
  N = [{label:"New business",value:"$9.1K",delta:"+12.4%",positive:true},{label:"Expansion",value:"$3.6K",delta:"+4.8%",positive:true},{label:"Churn",value:"$8.5K",delta:"+6.1%",positive:false}];

function y(e){
  let a=100/(e.length-1);
  return e.map((e,t)=>`${0===t?"M":"L"}${(t*a).toFixed(2)} ${(100-e/160*100).toFixed(2)}`).join(" ");
}

function M({className:e}){
  return <span className={d(k,"block",e)} />;
}

function A({value:e,onChange:a,baseId:t,panelId:s}){
  let n=useRef([]),i=e=>{
    let t=(e+g.length)%g.length;
    a(g[t].key),n.current[t]?.focus({preventScroll:true})
  };
  return (
    <div role="radiogroup" aria-label="View state" onKeyDown={a=>{
        let t=g.findIndex(a=>a.key===e);
        "ArrowRight"===a.key||"ArrowDown"===a.key?(a.preventDefault(),i(t+1)):"ArrowLeft"===a.key||"ArrowUp"===a.key?(a.preventDefault(),i(t-1)):"Home"===a.key?(a.preventDefault(),i(0)):"End"===a.key&&(a.preventDefault(),i(g.length-1))
      }} className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
        {g.map((l,i)=>{
          let o=key===e;
          return (
            <button key={key} ref={e=>{
                    n.current[i]=e
                  }} type="button" role="radio" id={`${t}-${i}`} aria-checked={o} aria-controls={s} tabIndex={o?0:-1} onClick={()=>a(key)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{label}</button>
          );
        })}
      </div>
  );
}

function $(){
  let[e,a]=useState("ready"),t=useId(),$=`${t}-panel`;
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className={d("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={d("text-[20px]/[24px] font-[450] tracking-[-0.015em]",c,"truncate")}>Recurring revenue</h1>
          <A value={e} onChange={a} baseId={t} panelId={$} />
        </header>
        <div role="region" id={$} aria-labelledby={`${t}-${g.findIndex(a=>a.key===e)}`} tabIndex={0} className={d("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex min-h-0 flex-1 flex-col")}>
          {"empty"===e&&<div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <HugeiconsIcon icon={Icon_99519} size={20} strokeWidth={1.8} aria-hidden="true" className={d("text-neutral-900/80 dark:text-neutral-100/80","mb-3")} />
            <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No revenue data yet</p>
            <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs")}>
              Connect your billing provider to track recurring revenue, expansion, and churn in one place.
            </p>
            <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Connect billing</button>
          </div>}
          {"loading"===e&&<div aria-hidden className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className={d(h,"min-h-0 flex-1 p-4")}>
              <M className="my-0.5 h-3 w-40" />
              <M className="mt-2.5 mb-1.5 h-8 w-48" />
              <div className={d(k,"mt-4 min-h-0 flex-1")} />
              <div className="mt-2 flex justify-between">
                <M className="my-0.5 h-3 w-8" />
                <M className="my-0.5 h-3 w-8" />
              </div>
            </div>
            <div className={p}>
              <div className={m}>
                {N.map(e=>(
                  <div key={e.label} className={b}>
                                <M className="my-0.5 h-3 w-20" />
                                <M className="my-1.5 h-6 w-16" />
                                <M className="my-0.5 h-3 w-12" />
                              </div>
                ))}
              </div>
            </div>
          </div>}
          {"ready"===e&&<div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className={d(h,"min-h-0 flex-1 p-4")}>
              <div>
                <p className={f}>Monthly recurring revenue</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <p className={d("text-[40px]/[44px] font-[450] tabular-nums",c)}>$148.2K</p>
                  <p className={v}>
                    <HugeiconsIcon icon={Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                    <span className="sr-only">Up</span>
                    +$4.2K
                    <span className={u}>(+2.9%) vs. last month</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 gap-3">
                <div className={d(x,u,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{_.map(e=><span key={e}>{0===e?"$0":`$${e}k`}</span>)}</div>
                <div className="relative min-h-0 flex-1">
                  <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    {_.map(e=>{
                      let a=100-e/160*100;
                      return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />;
                    })}
                    <path d={`${y(j)} L100 100 L0 100 Z`} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                    <path d={y(j)} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 flex gap-3">
                <div className="w-10 shrink-0" aria-hidden />
                <div className={d(x,u,"flex min-w-0 flex-1 justify-between")}>{w.map(e=><span key={e}>{e}</span>)}</div>
              </div>
            </div>
            <div className={p}>
              <div className={m}>
                {N.map(e=>{
                  let a,t=(a=e.delta,/^[−-]/.test(a));
                  return (
                    <div key={e.label} className={b}>
                                    <p className={d(f,"text-pretty")}>{e.label}</p>
                                    <p className={d("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto truncate")}>{e.value}</p>
                                    <p className={d(v,"truncate")}>
                                      <HugeiconsIcon icon={t?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                      <span className="sr-only">{t?"Down":"Up"}</span>
                                      {e.delta}
                                      <span className={d(u,"hidden sm:inline")}>vs. last month</span>
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


export default $;
