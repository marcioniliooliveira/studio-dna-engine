/**
 * React Bits Pro — Application UI (monitoring-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  b = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  m = "ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  f = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  g = x(p,h),
  k = x("text-[12px]/[16px] font-normal tabular-nums",h),
  v = [{id:"rps",label:"Requests",unit:"/s",base:4200,spread:480,seed:1.1,threshold:5200,thresholdLabel:"Autoscale at 5,200/s",decimals:0},{id:"p99",label:"p99 latency",unit:"ms",base:340,spread:90,seed:4.6,threshold:500,thresholdLabel:"SLO ceiling 500ms",decimals:0},{id:"err",label:"Errors",unit:"%",base:.42,spread:.26,seed:8.3,threshold:1,thresholdLabel:"Page on-call above 1%",decimals:2}],
  w = (e,t)=>t.toLocaleString("en-US",{minimumFractionDigits:e.decimals,maximumFractionDigits:e.decimals}),
  _ = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function j(){
  let e=useRef(null),[t,r]=useState("rps"),[j,y]=useState(true),[N,S]=useState(0),z=v.find(e=>e.id===t)??v[0];
  useEffect(()=>{
    if(!j)return;
    let t=e.current?.ownerDocument.defaultView??window,r=t.setInterval(()=>S(e=>e+1),1e3);
    return ()=>t.clearInterval(r);
  }, [j]);
  let A=useMemo(()=>Array.from({length:60},(e,t)=>{
    let r;
    return r=N+t,Math.max(0,z.base+z.spread*(.52*Math.sin(.21*r+z.seed)+.33*Math.sin(.071*r+3.1*z.seed)+.15*Math.sin(.53*r+1.7*z.seed)));
  }), [z,N]),R=A[A.length-1],C=Math.min(...A),E=Math.max(...A),M=A.reduce((e,t)=>e+t,0)/A.length,D=R>z.threshold,[W,P]=function(){
    let e=useRef(null),[t,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(([e])=>{
        let t=e.contentRect;
        r({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),L=P.height,O=.94*Math.min(C,z.threshold),$=1.06*Math.max(E,z.threshold),T=useCallback(e=>e/59*Math.max(P.width-2,1)+1, [P.width]),I=useCallback(e=>L-4-(e-O)/($-O||1)*(L-12), [L,$,O]),F=line().x((e,t)=>T(t)).y(e=>I(e)).curve(s.G)(A)??"",H=area().x((e,t)=>T(t)).y0(L).y1(e=>I(e)).curve(s.G)(A)??"",B=[{label:"Now",value:w(z,R)},{label:"Average",value:w(z,M)},{label:"Peak",value:w(z,E)},{label:"Floor",value:w(z,C)}];
  return (
    <div ref={e} className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Live stream</h2>
                <span className={x("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",j?"text-neutral-900 dark:text-neutral-100":"text-neutral-900/66 dark:text-neutral-100/66")}>
                  {j&&<span className="flex h-lh shrink-0 items-center">
                    <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                  </span>}
                  {j?"Streaming":"Paused"}
                </span>
              </div>
              <p className={x(g,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>api-gateway</span>
                <span>eu-west-1</span>
                <span>1s resolution</span>
              </p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Metric" onKeyDown={_} className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                {v.map(e=><button key={e.id} type="button" role="radio" aria-checked={e.id===t} tabIndex={e.id===t?0:-1} onClick={()=>r(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
              </div>
              <button type="button" onClick={()=>y(e=>!e)} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={j?Icon_81520:Icon_48318} size={16} strokeWidth={1.8} aria-hidden="true" />
                {j?"Pause":"Resume"}
              </button>
            </div>
          </div>
          <div className={x(b,"flex shrink-0 grow flex-col p-4")}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-1">
                <p className="text-[40px]/[44px] font-[450] tabular-nums">{w(z,R)}</p>
                <span className={m}>{z.unit}</span>
              </div>
              <p className={x(p,D?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":h,"inline-flex items-center gap-1.5")}>
                {D?<>
                  <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  <span className="sr-only">Over threshold.</span>
                </>:<svg aria-hidden="true" width={16} height={2} className="shrink-0 overflow-visible">
                  <line x1={0} x2={16} y1={1} y2={1} strokeWidth={1} strokeDasharray="6 4" className={f} />
                </svg>}
                {z.thresholdLabel}
              </p>
            </div>
            <div ref={W} role="img" aria-label={`${z.label} over the last 60 seconds, currently ${w(z,R)}${z.unit}`} className="relative mt-4 min-h-[120px] flex-1 sm:min-h-[220px]">
              {P.width>0&&P.height>0&&<svg width={P.width} height={L} className="absolute inset-0 overflow-visible">
                {[.25,.5,.75].map(e=><line key={e} x1={0} x2={P.width} y1={L*e} y2={L*e} className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} shapeRendering="crispEdges" />)}
                <line x1={0} x2={P.width} y1={I(z.threshold)} y2={I(z.threshold)} className={f} strokeWidth={1} strokeDasharray="6 4" shapeRendering="crispEdges" />
                <path d={H} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                <path d={F} fill="none" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <rect x={T(59)-4} y={I(R)-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />
              </svg>}
            </div>
            <div className={x(k,"mt-2 flex justify-between")}>
              <span>−60s</span>
              <span>−45s</span>
              <span>−30s</span>
              <span>−15s</span>
              <span>now</span>
            </div>
          </div>
          <div className={x(b,"@container p-0.75")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {B.map(e=>(
                <div key={e.label} className={x("flex min-w-0 flex-col gap-2 px-4 py-3","ps-3 pe-3")}>
                            <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.value}
                              <span className={m}>{z.unit}</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default j;
