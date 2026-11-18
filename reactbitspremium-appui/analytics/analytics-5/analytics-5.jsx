/**
 * React Bits Pro — Application UI (analytics-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, length, map, mark, observe, outlined, slice, useEffect, useMemo, useRef, useState } from 'react';
import { arc, pie } from 'd3-shape';

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "text-right tabular-nums",
  u = ["Sessions","Revenue"],
  x = [{name:"Organic search",sessions:5842,revenue:84200},{name:"Direct",sessions:3210,revenue:47900},{name:"Referral",sessions:1680,revenue:22300},{name:"Email",sessions:1145,revenue:12600},{name:"Paid social",sessions:968,revenue:61500}],
  h = [{mark:"text-neutral-900 dark:text-neutral-100",outlined:false},{mark:"text-neutral-900/80 dark:text-neutral-100/80",outlined:false},{mark:"text-neutral-900/66 dark:text-neutral-100/66",outlined:false},{mark:"text-neutral-900/40 dark:text-neutral-100/40",outlined:false},{mark:i("fill-neutral-900/5 dark:fill-neutral-100/5","stroke-neutral-900/66 dark:stroke-neutral-100/66"),outlined:true}];

function p(){
  let[e,t]=useState("Sessions"),[a,p]=useState(null),[m,f]=function(){
    let e=useRef(null),[t,a]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let t=e.contentRect;
        a({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),b=useMemo(()=>{
    let t="Sessions"===e?"sessions":"revenue",a=[...x].sort((e,a)=>a[t]-e[t]),r=a.reduce((e,a)=>e+a[t],0),l=a.map(e=>Math.round(e[t]/r*1e3)/10),n=slice(0, -1).reduce((e,t)=>e+t,0);
    return {sorted:a,total:r,shares:map((e,t)=>t===length-1?Math.round((100-n)*10)/10:e),key:t};
  }, [e]),k=Math.min(300,Math.max(200,f.width>0?Math.min(f.width,300):260)),g=k/2-4,v=.62*g,w=useMemo(()=>{
    let e=pie().value(e=>e[b.key]).sort(null).padAngle(.012)(b.sorted),t=arc().innerRadius(v).outerRadius(g).cornerRadius(2);
    return e.map((e,a)=>{
      let r=(e.startAngle+e.endAngle)/2;
      return {path:t(e)??"",lx:4*Math.sin(r),ly:-(4*Math.cos(r)),index:a};
    });
  }, [b,v,g]),y="Sessions"===e?"sessions":"revenue",j="Revenue"===e,N=e=>j?`$${e.toLocaleString("en-US")}`:e.toLocaleString("en-US"),_=null===a?N(b.total):N(b.sorted[a][b.key]),M=null===a?e:`${b.shares[a].toFixed(1)}% of ${y}`,A=e=>{
    t(e),p(null)
  };
  return (
    <div className={i("bg-white dark:bg-neutral-950",o,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={i("text-[16px]/[20px] font-[450] tracking-[-0.015em]",o)}>Traffic by channel</h2>
                <p className={i("text-[13px]/[18px] font-normal",c,"mt-0.5 truncate")}>Where visitors came from over the last 30 days.</p>
              </div>
              <div role="radiogroup" aria-label="Metric" onKeyDown={t=>{
                var a,r,l;
                let n;
                return a=u.length,r=u.indexOf(e),l=e=>A(u[e]),void(!((n="ArrowRight"===t.key||"ArrowDown"===t.key?(r+1)%a:"ArrowLeft"===t.key||"ArrowUp"===t.key?(r-1+a)%a:"Home"===t.key?0:"End"===t.key?a-1:-1)<0)&&(t.preventDefault(),l(n),t.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
              }} className={i("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                {u.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>A(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
              </div>
            </div>
            <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-6">
              <div ref={m} className="relative mx-auto w-full max-w-[300px]">
                {f.width>0&&<svg width={k} height={k} viewBox={`0 0 ${k} ${k}`} role="img" aria-label={`${e} by acquisition channel. Total ${N(b.total)}.`} className="mx-auto block overflow-visible" onPointerLeave={()=>p(null)}>
                  <g transform={`translate(${k/2} ${k/2})`}>
                    {w.map(e=>{
                      let t=a===e.index;
                      return <path key={e.index} d={e.path} fill="currentColor" strokeWidth={1} className={i(h[e.index].mark,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","cursor-pointer")} style={{opacity:null===a||t?1:.4,transform:t?`translate(${e.lx}px, ${e.ly}px)`:"translate(0px, 0px)"}} onPointerEnter={()=>p(e.index)} />;
                    })}
                  </g>
                </svg>}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className={i("text-[32px]/[36px] font-[450] tabular-nums",o)}>{_}</p>
                  <p className={i("text-[12px]/[16px] font-normal tabular-nums",c,"mt-0.5 max-w-[9rem] truncate text-center")}>{M}</p>
                </div>
              </div>
              <ul className="flex flex-col gap-0.5">
                {b.sorted.map((e,t)=>{
                  let l=h[t];
                  return (
                    <li key={e.name}>
                                    <button type="button" onPointerEnter={()=>p(t)} onPointerLeave={()=>p(null)} onFocus={()=>p(t)} onBlur={()=>p(null)} className={i("flex h-7 min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900/5 aria-[pressed=false]:text-neutral-900/66 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:aria-[pressed=false]:text-neutral-100/66",a===t&&"bg-neutral-900/9 dark:bg-neutral-100/9","w-full text-left")}>
                                      <svg aria-hidden="true" viewBox="0 0 8 8" className="inline-block size-2 shrink-0">
                                        {outlined?<rect x={.5} y={.5} width={7} height={7} strokeWidth={1} className={mark} />:<rect width={8} height={8} fill="currentColor" className={mark} />}
                                      </svg>
                                      <span className={i("text-neutral-900/80 dark:text-neutral-100/80","min-w-0 flex-1 truncate")}>{e.name}</span>
                                      <span className={i(d,o,"shrink-0")}>{N(e[b.key])}</span>
                                      <span className={i(d,c,"w-12 shrink-0")}>
                                        {b.shares[t].toFixed(1)}
                                        %
                                      </span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}


export default p;
