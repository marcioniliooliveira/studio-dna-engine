/**
 * React Bits Pro — Application UI (analytics-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, left, observe, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let eW = (...e)=>e.filter(Boolean).join(" ");

let eP = "text-neutral-900 dark:text-neutral-100";

let eO = "text-neutral-900/62 dark:text-neutral-100/62";

let eT = "text-[13px]/[16px] font-semibold tabular-nums";

let eq = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let eH = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let eI = "ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78";

let eK = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let eQ = (e,a,t)=>Math.min(t,Math.max(a,e));

function eJ({value:e}){
  return (
    <>
        <span>
          <HugeiconsIcon icon={e>0?Icon_1497:e<0?Icon_37502:Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="inline-block align-middle" />
        </span>
        <span className="sr-only">{e>0?"Up":e<0?"Down":"No change"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </>
  );
}

let eV = ["1h","24h","7d"];

let eG = {"1h":12,"24h":24,"7d":28};

let eX = [{id:"req",label:"Request rate",unit:"req/s",good:"up",base:4820,seed:1.4,amp:.1,delta:6.4,decimals:0},{id:"p95",label:"p95 latency",unit:"ms",good:"down",base:182,seed:3.1,amp:.16,delta:8.1,decimals:0},{id:"err",label:"Error rate",unit:"%",good:"down",base:.42,seed:5.2,amp:.34,delta:14.3,decimals:2},{id:"cpu",label:"CPU saturation",unit:"%",good:"down",base:63,seed:7.7,amp:.12,delta:-4.2,decimals:0}];

function eY(e,a){
  if("req/s"===e.unit){
    let e;
    return Math.abs(e=Math.round(a))>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;
  }
  return e.decimals?a.toFixed(e.decimals):`${Math.round(a)}`;
}

function eZ({data:e,width:a,height:t,active:o,baseline:c}){
  let d=Math.min(...e),x=Math.max(...e),_=.18*(x-d||1),u=t-2,h=useCallback(t=>t/(e.length-1)*Math.max(a-2,1)+1, [e.length,a]),p=useCallback(e=>u-(e-d+_)/(x-d+2*_)*(u-6), [u,6,x,d,_]),b=line().x((e,a)=>h(a)).y(e=>p(e)).curve(s.G)(e)??"",m=area().x((e,a)=>h(a)).y0(t).y1(e=>p(e)).curve(s.G)(e)??"";
  return (
    <svg width={a} height={t} className="overflow-visible">
        {null!==o&&<line x1={h(o)} x2={h(o)} y1={2} y2={t} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />}
        <path d={m} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
        {c&&<line x1={0} x2={a} y1={t-.5} y2={t-.5} className="stroke-neutral-900/12 dark:stroke-neutral-100/14" strokeWidth={1} shapeRendering="crispEdges" />}
        <path d={b} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
        {null!==o&&<rect x={h(o)-4} y={p(e[o])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />}
      </svg>
  );
}

function e0(e){
  let[a,t]=function(){
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
  }(),[r,n]=useState(null);
  return {ref:a,size:t,active:r,setActive:n,move:t=>{
    let r=a.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),s=width/(e-1);
    n(eQ(Math.round((t-left)/s),0,e-1))
  },onKey:a=>{
    ("ArrowLeft"===a.key||"ArrowRight"===a.key)&&(a.preventDefault(),n(t=>eQ((t??e-1)+("ArrowLeft"===a.key?-1:1),0,e-1))),"Home"===a.key&&n(0),"End"===a.key&&n(e-1),"Escape"===a.key&&n(null)
  }};
}

function e1({metric:e,data:a,selected:t,onToggle:l}){
  let{ref:n,size:s,active:i,setActive:o,move:c,onKey:d}=e0(a.length),x=a[a.length-1],_=null===i?x:a[i];
  return (
    <button type="button" aria-pressed={t} aria-label={`${e.label}, latest ${eY(e,x)} ${e.unit}. ${t?"Selected":"Select to expand"}.`} onClick={l} onPointerMove={e=>c(e.clientX)} onPointerLeave={()=>o(null)} onKeyDown={d} style={{touchAction:"pan-y"}} className={eW(eq,eK,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","group isolate cursor-pointer p-4 text-left")}>
        {t&&<span aria-hidden="true" className={eW("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","pointer-events-none absolute inset-0 -z-10")} />}
        <div className="flex items-center justify-between gap-2">
          <span className={eW("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","min-w-0 truncate")}>{e.label}</span>
          <span className={eW("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","shrink-0")}><eJ value={e.delta} /></span>
        </div>
        <div className={eW(eH,"mt-1")}>
          <span>{eY(e,_)}</span>
          <span className={eI}>{e.unit}</span>
        </div>
        <div ref={n} className="-mx-4 -mb-4 mt-3 h-11">{s.width>0&&<eZ data={a} width={s.width} height={44} active={i} />}</div>
      </button>
  );
}

function e2({metric:e,data:a,range:t}){
  let{ref:l,size:n,active:s,setActive:i,move:o,onKey:c}=e0(a.length),d=a[a.length-1],x=null===s?d:a[s],_=Math.max(...a),u=Math.min(...a),h=a.reduce((e,a)=>e+a,0)/a.length;
  return (
    <div className={eW(eq,"p-4")}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <h3 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{e.label}</h3>
            <span className={eW(eT,eO)}>
              {"last "}
              {t}
            </span>
          </div>
          <p className={eH}>
            {eY(e,x)}
            <span className={eI}>{e.unit}</span>
          </p>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_170px]">
          <div ref={l} role="img" tabIndex={0} aria-label={`${e.label} over the last ${t}. Latest ${eY(e,d)} ${e.unit}.`} onPointerMove={e=>o(e.clientX)} onPointerLeave={()=>i(null)} onBlur={()=>i(null)} onKeyDown={c} style={{touchAction:"pan-y"}} className={eW(eK,"relative min-h-[88px] cursor-crosshair")}>
            {n.width>0&&n.height>0&&<div className="absolute inset-0"><eZ data={a} width={n.width} height={n.height} active={s} baseline /></div>}
          </div>
          <dl className={eW("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-4xl,18px)]","flex flex-col justify-center px-3 py-1.5")}>
            {[{label:"Peak",value:_},{label:"Average",value:h},{label:"Low",value:u}].map(a=>(
              <div key={a.label} className="flex items-baseline justify-between gap-3 py-1.5">
                        <dt className={eW(eT,eO,"truncate")}>{a.label}</dt>
                        <dd className={eW("text-[15px]/[20px] font-bold",eP,"shrink-0 tabular-nums")}>
                          {eY(e,a.value)}
                          <span className={eW(eT,eO,"ml-1")}>{e.unit}</span>
                        </dd>
                      </div>
            ))}
          </dl>
        </div>
      </div>
  );
}


export default function analytics_7__Sorbet__Component(){
  let[e,a]=useState("24h"),[t,n]=useState("req"),s=eG[e],i=useMemo(()=>eX.map(e=>Array.from({length:s},(a,t)=>{
    let r,l=e.base*(1+e.amp*(.5*Math.sin(.7*t+(r=e.seed))+.34*Math.sin(.23*t+2.1*r)+.12*Math.sin(1.9*t+.6*r))),n=10**e.decimals;
    return Math.max(e.decimals?.01:1,Math.round(l*n)/n);
  })), [s]),o=eX.findIndex(e=>e.id===t),c=o>=0;
  return (
    <div className={eW("bg-white dark:bg-neutral-950",eP,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className={eW("text-[17px]/[22px] font-extrabold",eP)}>Service health</h2>
              <p className={eW("text-[14px]/[20px] font-medium",eO,"mt-0.5 truncate")}>Live signals from the ingest tier. Select a card for detail.</p>
            </div>
            <div role="radiogroup" aria-label="Range" onKeyDown={t=>{
              var r,l,n;
              let s;
              return r=eV.length,l=eV.indexOf(e),n=e=>a(eV[e]),void(!((s="ArrowRight"===t.key||"ArrowDown"===t.key?(l+1)%r:"ArrowLeft"===t.key||"ArrowUp"===t.key?(l-1+r)%r:"Home"===t.key?0:"End"===t.key?r-1:-1)<0)&&(t.preventDefault(),n(s),t.currentTarget.querySelectorAll('[role="radio"]')[s]?.focus()));
            }} className={eW("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {eV.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>a(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{t}</button>)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {eX.map((e,a)=><e1 key={e.id} metric={e} data={i[a]} selected={e.id===t} onToggle={()=>n(a=>a===e.id?null:e.id)} />)}
          </div>
          <div className={eW("-mx-3 -mb-6 grid",c?"grid-rows-[1fr]":"grid-rows-[0fr]")}>
            <div className="min-h-0 overflow-hidden">
              <div className="px-3 pt-3 pb-6">{c&&<e2 metric={eX[o]} data={i[o]} range={e} />}</div>
            </div>
          </div>
        </div>
      </div>
  );
}
