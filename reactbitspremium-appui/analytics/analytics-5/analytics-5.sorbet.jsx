/**
 * React Bits Pro — Application UI (analytics-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, length, map, mark, observe, outlined, slice, useEffect, useMemo, useRef, useState } from 'react';
import { arc, pie } from 'd3-shape';

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let k = "text-neutral-900/62 dark:text-neutral-100/62";

let em = (...e)=>e.filter(Boolean).join(" ");

let ek = "text-neutral-900 dark:text-neutral-100";

let ef = "text-neutral-900/62 dark:text-neutral-100/62";

let eg = "text-right tabular-nums";

let ev = ["Sessions","Revenue"];

let ew = [{name:"Organic search",sessions:5842,revenue:84200},{name:"Direct",sessions:3210,revenue:47900},{name:"Referral",sessions:1680,revenue:22300},{name:"Email",sessions:1145,revenue:12600},{name:"Paid social",sessions:968,revenue:61500}];

let ey = [{mark:"text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]",outlined:false},{mark:"text-[var(--rb-accent,oklch(84%_0.15_165))] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_72%,transparent)]",outlined:false},{mark:"text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]",outlined:false},{mark:"text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_38%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_30%,transparent)]",outlined:false},{mark:em("fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]","stroke-neutral-900/40 dark:stroke-neutral-100/45"),outlined:true}];


export default function analytics_5__Sorbet__Component(){
  let[e,a]=useState("Sessions"),[t,n]=useState(null),[s,i]=function(){
    let e=useRef(null),[a,t]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let a=e.contentRect;
        t({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),o=useMemo(()=>{
    let a="Sessions"===e?"sessions":"revenue",t=[...ew].sort((e,t)=>t[a]-e[a]),r=t.reduce((e,t)=>e+t[a],0),l=t.map(e=>Math.round(e[a]/r*1e3)/10),n=slice(0, -1).reduce((e,a)=>e+a,0);
    return {sorted:t,total:r,shares:map((e,a)=>a===length-1?Math.round((100-n)*10)/10:e),key:a};
  }, [e]),c=Math.min(300,Math.max(200,i.width>0?Math.min(i.width,300):260)),d=c/2-4,x=.62*d,_=useMemo(()=>{
    let e=pie().value(e=>e[o.key]).sort(null).padAngle(.012)(o.sorted),a=arc().innerRadius(x).outerRadius(d).cornerRadius(2);
    return e.map((e,t)=>{
      let r=(e.startAngle+e.endAngle)/2;
      return {path:a(e)??"",lx:4*Math.sin(r),ly:-(4*Math.cos(r)),index:t};
    });
  }, [o,x,d]),u="Sessions"===e?"sessions":"revenue",h="Revenue"===e,p=e=>h?`$${e.toLocaleString("en-US")}`:e.toLocaleString("en-US"),b=null===t?p(o.total):p(o.sorted[t][o.key]),m=null===t?e:`${o.shares[t].toFixed(1)}% of ${u}`,k=e=>{
    a(e),n(null)
  };
  return (
    <div className={em("bg-white dark:bg-neutral-950",ek,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={em("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={em("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={em("text-[17px]/[22px] font-extrabold",ek)}>Traffic by channel</h2>
                <p className={em("text-[14px]/[20px] font-medium",ef,"mt-0.5 truncate")}>Where visitors came from over the last 30 days.</p>
              </div>
              <div role="radiogroup" aria-label="Metric" onKeyDown={a=>{
                var t,r,l;
                let n;
                return t=ev.length,r=ev.indexOf(e),l=e=>k(ev[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(r+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(r-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
              }} className={em("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                {ev.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>k(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
              </div>
            </div>
            <div className="grid gap-5 px-5 py-5 md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-6">
              <div ref={s} className="relative mx-auto w-full max-w-[300px]">
                {i.width>0&&<svg width={c} height={c} viewBox={`0 0 ${c} ${c}`} role="img" aria-label={`${e} by acquisition channel. Total ${p(o.total)}.`} className="mx-auto block overflow-visible" onPointerLeave={()=>n(null)}>
                  <g transform={`translate(${c/2} ${c/2})`}>
                    {_.map(e=>{
                      let a=t===e.index;
                      return <path key={e.index} d={e.path} fill="currentColor" strokeWidth={1} className={em(ey[e.index].mark,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","cursor-pointer")} style={{opacity:null===t||a?1:.4,transform:a?`translate(${e.lx}px, ${e.ly}px)`:"translate(0px, 0px)"}} onPointerEnter={()=>n(e.index)} />;
                    })}
                  </g>
                </svg>}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className={em("text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums",ek)}>{b}</p>
                  <p className={em("text-[13px]/[16px] font-semibold tabular-nums",ef,"mt-0.5 max-w-[9rem] truncate text-center")}>{m}</p>
                </div>
              </div>
              <ul className="flex flex-col gap-0.5">
                {o.sorted.map((e,a)=>{
                  let l=ey[a];
                  return (
                    <li key={e.name}>
                                    <button type="button" onPointerEnter={()=>n(a)} onPointerLeave={()=>n(null)} onFocus={()=>n(a)} onBlur={()=>n(null)} className={em("flex h-8 min-w-0 cursor-pointer items-center gap-2 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-[pressed=false]:text-neutral-900/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:aria-[pressed=false]:text-neutral-100/45",t===a&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","w-full text-left")}>
                                      <svg aria-hidden="true" viewBox="0 0 8 8" className="inline-block size-2.5 shrink-0 rounded-full">
                                        {outlined?<rect x={.5} y={.5} width={7} height={7} strokeWidth={1} className={mark} />:<rect width={8} height={8} fill="currentColor" className={mark} />}
                                      </svg>
                                      <span className={em("text-neutral-900/78 dark:text-neutral-100/78","min-w-0 flex-1 truncate")}>{e.name}</span>
                                      <span className={em(eg,ek,"shrink-0")}>{p(e[o.key])}</span>
                                      <span className={em(eg,ef,"w-12 shrink-0")}>
                                        {o.shares[a].toFixed(1)}
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
