/**
 * React Bits Pro — Application UI (ai-usage-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';

let n = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  i = "text-neutral-900/66 dark:text-neutral-100/66",
  o = "inline-block size-2 shrink-0",
  d = n("text-[13px]/[18px] font-normal",i),
  c = n("text-neutral-900 dark:text-neutral-100","bg-current"),
  u = n("text-neutral-900/66 dark:text-neutral-100/66","bg-current"),
  x = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`,
  p = e=>e>=100?`$${e.toLocaleString("en-US",{maximumFractionDigits:0})}`:`$${e.toFixed(2)}`,
  b = ["7d","30d","90d"],
  h = {"7d":[{label:"Mon",input:4.1,output:1.6},{label:"Tue",input:5.3,output:2.2},{label:"Wed",input:6.8,output:2.6},{label:"Thu",input:5.9,output:2.4},{label:"Fri",input:8.2,output:3.4},{label:"Sat",input:2.4,output:.9},{label:"Sun",input:1.9,output:.7}],"30d":[{label:"W1",input:22.4,output:8.8},{label:"W2",input:26.1,output:10.4},{label:"W3",input:31.7,output:12.9},{label:"W4",input:34.6,output:13.8}],"90d":[{label:"Apr",input:71.2,output:27.9},{label:"May",input:88.4,output:35.1},{label:"Jun",input:96.8,output:39.4}]};

function m(){
  let[e,a]=useState("7d"),[r,m]=useState(null),k=h[e],f=useMemo(()=>{
    let e=1e6*k.reduce((e,a)=>e+a.input,0),a=1e6*k.reduce((e,a)=>e+a.output,0);
    return {input:e,output:a,tokens:e+a,cost:3e-6*e+15e-6*a};
  }, [k]),_=Math.max(...k.map(e=>e.input+e.output)),g=null===r?null:k[r],v=g?1e6*g.input*3e-6+1e6*g.output*15e-6:null,w=e=>{
    a(e),m(null)
  };
  return (
    <div className={n("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[480px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[840px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Token usage</h2>
              <p className={n(d,"mt-0.5 truncate")}>Input and output tokens billed to this workspace.</p>
            </div>
            <div role="radiogroup" aria-label="Range" onKeyDown={a=>{
              var r,t,l;
              let n;
              return r=b.length,t=b.indexOf(e),l=e=>w(b[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(t+1)%r:"ArrowLeft"===a.key||"ArrowUp"===a.key?(t-1+r)%r:"Home"===a.key?0:"End"===a.key?r-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
            }} className={n("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {b.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>w(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {[["Total tokens",x(f.tokens)],["Input",x(f.input)],["Output",x(f.output)],["Spend",p(f.cost)]].map(([e,a])=>(
                  <div key={e} className="flex min-w-0 flex-col gap-1 p-3">
                                <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e}</p>
                                <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{a}</p>
                              </div>
                ))}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className={n(d,"inline-flex items-center gap-1.5")}>
                      <span aria-hidden="true" className={n(o,c)} />
                      Input
                    </span>
                    <span className={n(d,"inline-flex items-center gap-1.5")}>
                      <span aria-hidden="true" className={n(o,u)} />
                      Output
                    </span>
                  </div>
                  <p className={n(d,"flex min-w-0 gap-x-3 truncate")}>
                    {g?<>
                      <span>{g.label}</span>
                      <span className="tabular-nums">{x((g.input+g.output)*1e6)}</span>
                      <span className="tabular-nums">{p(v??0)}</span>
                    </>:"Hover a bar for detail"}
                  </p>
                </div>
                <div className="mt-4 flex h-44 items-end gap-2" onMouseLeave={()=>m(null)}>
                  {k.map((e,a)=>{
                    let l=e.input+e.output,o=r===a;
                    return (
                      <button key={e.label} type="button" aria-label={`${e.label}: ${x(1e6*l)} tokens`} onMouseEnter={()=>m(a)} onFocus={()=>m(a)} onBlur={()=>m(null)} className={n("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]",o&&"bg-neutral-900/9 dark:bg-neutral-100/9","group flex h-full flex-1 cursor-pointer flex-col justify-end gap-1")}>
                                        <div className="mx-auto flex w-full max-w-[36px] flex-col justify-end" style={{height:`${l/_*100}%`}}>
                                          <div className={n(u,"w-full")} style={{height:`${e.output/l*100}%`}} />
                                          <div className={n(c,"w-full")} style={{height:`${e.input/l*100}%`}} />
                                        </div>
                                        <span className={n("text-[12px]/[16px] font-normal tabular-nums",o?s:i)}>{e.label}</span>
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


export default m;
