/**
 * React Bits Pro — Application UI (ai-usage-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';

let n = (...e)=>e.filter(Boolean).join(" ");

let o = "text-neutral-900 dark:text-neutral-100";

let i = "text-neutral-900/62 dark:text-neutral-100/62";

let s = "inline-block size-2.5 shrink-0 rounded-full";

let c = n("text-[14px]/[20px] font-medium",i);

let d = n("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","bg-current");

let _ = n("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","bg-current");

let x = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;

let b = e=>e>=100?`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`:`$${e.toFixed(2)}`;

let u = ["7d","30d","90d"];

let p = {"7d":[{label:"Mon",input:4.1,output:1.6},{label:"Tue",input:5.3,output:2.2},{label:"Wed",input:6.8,output:2.6},{label:"Thu",input:5.9,output:2.4},{label:"Fri",input:8.2,output:3.4},{label:"Sat",input:2.4,output:.9},{label:"Sun",input:1.9,output:.7}],"30d":[{label:"W1",input:22.4,output:8.8},{label:"W2",input:26.1,output:10.4},{label:"W3",input:31.7,output:12.9},{label:"W4",input:34.6,output:13.8}],"90d":[{label:"Apr",input:71.2,output:27.9},{label:"May",input:88.4,output:35.1},{label:"Jun",input:96.8,output:39.4}]};

let v = (...e)=>e.filter(Boolean).join(" ");

let g = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[15px]/[20px] font-bold";

let w = v("text-[14px]/[20px] font-medium",g);


export default function ai_usage_1__Sorbet__Component(){
  let[e,a]=useState("7d"),[r,h]=useState(null),m=p[e],k=useMemo(()=>{
    let e=1e6*m.reduce((e,a)=>e+a.input,0),a=1e6*m.reduce((e,a)=>e+a.output,0);
    return {input:e,output:a,tokens:e+a,cost:3e-6*e+15e-6*a};
  }, [m]),v=Math.max(...m.map(e=>e.input+e.output)),g=null===r?null:m[r],f=g?1e6*g.input*3e-6+1e6*g.output*15e-6:null,w=e=>{
    a(e),h(null)
  };
  return (
    <div className={n("bg-white dark:bg-neutral-950",o,"flex h-full min-h-[480px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[840px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px]/[22px] font-extrabold">Token usage</h2>
              <p className={n(c,"mt-0.5 truncate")}>Input and output tokens billed to this workspace.</p>
            </div>
            <div role="radiogroup" aria-label="Range" onKeyDown={a=>{
              var r,t,l;
              let n;
              return r=u.length,t=u.indexOf(e),l=e=>w(u[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(t+1)%r:"ArrowLeft"===a.key||"ArrowUp"===a.key?(t-1+r)%r:"Home"===a.key?0:"End"===a.key?r-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
            }} className={n("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {u.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>w(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {[["Total tokens",x(k.tokens)],["Input",x(k.input)],["Output",x(k.output)],["Spend",b(k.cost)]].map(([e,a])=>(
                  <div key={e} className="flex min-w-0 flex-col gap-1 p-3">
                                <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">{e}</p>
                                <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">{a}</p>
                              </div>
                ))}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className={n(c,"inline-flex items-center gap-1.5")}>
                      <span aria-hidden="true" className={n(s,d)} />
                      Input
                    </span>
                    <span className={n(c,"inline-flex items-center gap-1.5")}>
                      <span aria-hidden="true" className={n(s,_)} />
                      Output
                    </span>
                  </div>
                  <p className={n(c,"flex min-w-0 gap-x-3 truncate")}>
                    {g?<>
                      <span>{g.label}</span>
                      <span className="tabular-nums">{x((g.input+g.output)*1e6)}</span>
                      <span className="tabular-nums">{b(f??0)}</span>
                    </>:"Hover a bar for detail"}
                  </p>
                </div>
                <div className="mt-4 flex h-44 items-end gap-2" onMouseLeave={()=>h(null)}>
                  {m.map((e,a)=>{
                    let l=e.input+e.output,s=r===a;
                    return (
                      <button key={e.label} type="button" aria-label={`${e.label}: ${x(1e6*l)} tokens`} onMouseEnter={()=>h(a)} onFocus={()=>h(a)} onBlur={()=>h(null)} className={n("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-4xl,18px)]",s&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","group flex h-full flex-1 cursor-pointer flex-col justify-end gap-1")}>
                                        <div className="mx-auto flex w-full max-w-[36px] flex-col justify-end" style={{height:`${l/v*100}%`}}>
                                          <div className={n(_,"w-full")} style={{height:`${e.output/l*100}%`}} />
                                          <div className={n(d,"w-full")} style={{height:`${e.input/l*100}%`}} />
                                        </div>
                                        <span className={n("text-[13px]/[16px] font-semibold tabular-nums",s?o:i)}>{e.label}</span>
                                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
