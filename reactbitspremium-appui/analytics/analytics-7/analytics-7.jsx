/**
 * React Bits Pro — Application UI (analytics-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, left, observe, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  b = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  k = "ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  g = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  v = (e,t,a)=>Math.min(a,Math.max(t,e));

function w({value:e}){
  return (
    <>
        <span>
          <HugeiconsIcon icon={e>0?Icon_1497:e<0?Icon_37502:Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="inline-block align-middle" />
        </span>
        <span className="sr-only">{e>0?"Up":e<0?"Down":"No change"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </>
  );
}

let y = ["1h","24h","7d"],
  j = {"1h":12,"24h":24,"7d":28},
  N = [{id:"req",label:"Request rate",unit:"req/s",good:"up",base:4820,seed:1.4,amp:.1,delta:6.4,decimals:0},{id:"p95",label:"p95 latency",unit:"ms",good:"down",base:182,seed:3.1,amp:.16,delta:8.1,decimals:0},{id:"err",label:"Error rate",unit:"%",good:"down",base:.42,seed:5.2,amp:.34,delta:14.3,decimals:2},{id:"cpu",label:"CPU saturation",unit:"%",good:"down",base:63,seed:7.7,amp:.12,delta:-4.2,decimals:0}];

function _(e,t){
  if("req/s"===e.unit){
    let e;
    return Math.abs(e=Math.round(t))>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;
  }
  return e.decimals?t.toFixed(e.decimals):`${Math.round(t)}`;
}

function M({data:e,width:t,height:a,active:o,baseline:c}){
  let d=Math.min(...e),u=Math.max(...e),x=.18*(u-d||1),h=a-2,p=useCallback(a=>a/(e.length-1)*Math.max(t-2,1)+1, [e.length,t]),m=useCallback(e=>h-(e-d+x)/(u-d+2*x)*(h-6), [h,6,u,d,x]),f=line().x((e,t)=>p(t)).y(e=>m(e)).curve(s.G)(e)??"",b=area().x((e,t)=>p(t)).y0(a).y1(e=>m(e)).curve(s.G)(e)??"";
  return (
    <svg width={t} height={a} className="overflow-visible">
        {null!==o&&<line x1={p(o)} x2={p(o)} y1={2} y2={a} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />}
        <path d={b} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
        {c&&<line x1={0} x2={t} y1={a-.5} y2={a-.5} className="stroke-neutral-900/8 dark:stroke-neutral-100/8" strokeWidth={1} shapeRendering="crispEdges" />}
        <path d={f} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
        {null!==o&&<rect x={p(o)-4} y={m(e[o])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />}
      </svg>
  );
}

function A(e){
  let[t,a]=function(){
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
  }(),[r,n]=useState(null);
  return {ref:t,size:a,active:r,setActive:n,move:a=>{
    let r=t.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),s=width/(e-1);
    n(v(Math.round((a-left)/s),0,e-1))
  },onKey:t=>{
    ("ArrowLeft"===t.key||"ArrowRight"===t.key)&&(t.preventDefault(),n(a=>v((a??e-1)+("ArrowLeft"===t.key?-1:1),0,e-1))),"Home"===t.key&&n(0),"End"===t.key&&n(e-1),"Escape"===t.key&&n(null)
  }};
}

function S({metric:e,data:t,selected:a,onToggle:l}){
  let{ref:n,size:s,active:i,setActive:o,move:c,onKey:d}=A(t.length),u=t[t.length-1],h=null===i?u:t[i];
  return (
    <button type="button" aria-pressed={a} aria-label={`${e.label}, latest ${_(e,u)} ${e.unit}. ${a?"Selected":"Select to expand"}.`} onClick={l} onPointerMove={e=>c(e.clientX)} onPointerLeave={()=>o(null)} onKeyDown={d} style={{touchAction:"pan-y"}} className={x(f,g,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","group isolate cursor-pointer p-4 text-left")}>
        {a&&<span aria-hidden="true" className={x("bg-neutral-900/9 dark:bg-neutral-100/9","pointer-events-none absolute inset-0 -z-10")} />}
        <div className="flex items-center justify-between gap-2">
          <span className={x("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","min-w-0 truncate")}>{e.label}</span>
          <span className={x("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}><w value={e.delta} /></span>
        </div>
        <div className={x(b,"mt-1")}>
          <span>{_(e,h)}</span>
          <span className={k}>{e.unit}</span>
        </div>
        <div ref={n} className="-mx-4 -mb-4 mt-3 h-11">{s.width>0&&<M data={t} width={s.width} height={44} active={i} />}</div>
      </button>
  );
}

function $({metric:e,data:t,range:a}){
  let{ref:l,size:n,active:s,setActive:i,move:o,onKey:c}=A(t.length),d=t[t.length-1],u=null===s?d:t[s],v=Math.max(...t),w=Math.min(...t),y=t.reduce((e,t)=>e+t,0)/t.length;
  return (
    <div className={x(f,"p-4")}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e.label}</h3>
            <span className={x(m,p)}>
              {"last "}
              {a}
            </span>
          </div>
          <p className={b}>
            {_(e,u)}
            <span className={k}>{e.unit}</span>
          </p>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_170px]">
          <div ref={l} role="img" tabIndex={0} aria-label={`${e.label} over the last ${a}. Latest ${_(e,d)} ${e.unit}.`} onPointerMove={e=>o(e.clientX)} onPointerLeave={()=>i(null)} onBlur={()=>i(null)} onKeyDown={c} style={{touchAction:"pan-y"}} className={x(g,"relative min-h-[88px] cursor-crosshair")}>
            {n.width>0&&n.height>0&&<div className="absolute inset-0"><M data={t} width={n.width} height={n.height} active={s} baseline /></div>}
          </div>
          <dl className={x("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","flex flex-col justify-center px-3 py-1.5")}>
            {[{label:"Peak",value:v},{label:"Average",value:y},{label:"Low",value:w}].map(t=>(
              <div key={t.label} className="flex items-baseline justify-between gap-3 py-1.5">
                        <dt className={x(m,p,"truncate")}>{t.label}</dt>
                        <dd className={x("text-[14px]/[16px] font-[450]",h,"shrink-0 tabular-nums")}>
                          {_(e,t.value)}
                          <span className={x(m,p,"ml-1")}>{e.unit}</span>
                        </dd>
                      </div>
            ))}
          </dl>
        </div>
      </div>
  );
}

function R(){
  let[e,t]=useState("24h"),[a,n]=useState("req"),s=j[e],i=useMemo(()=>N.map(e=>Array.from({length:s},(t,a)=>{
    let r,l=e.base*(1+e.amp*(.5*Math.sin(.7*a+(r=e.seed))+.34*Math.sin(.23*a+2.1*r)+.12*Math.sin(1.9*a+.6*r))),n=10**e.decimals;
    return Math.max(e.decimals?.01:1,Math.round(l*n)/n);
  })), [s]),o=N.findIndex(e=>e.id===a),c=o>=0;
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className={x("text-[16px]/[20px] font-[450] tracking-[-0.015em]",h)}>Service health</h2>
              <p className={x("text-[13px]/[18px] font-normal",p,"mt-0.5 truncate")}>Live signals from the ingest tier. Select a card for detail.</p>
            </div>
            <div role="radiogroup" aria-label="Range" onKeyDown={a=>{
              var r,l,n;
              let s;
              return r=y.length,l=y.indexOf(e),n=e=>t(y[e]),void(!((s="ArrowRight"===a.key||"ArrowDown"===a.key?(l+1)%r:"ArrowLeft"===a.key||"ArrowUp"===a.key?(l-1+r)%r:"Home"===a.key?0:"End"===a.key?r-1:-1)<0)&&(a.preventDefault(),n(s),a.currentTarget.querySelectorAll('[role="radio"]')[s]?.focus()));
            }} className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {y.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>t(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {N.map((e,t)=><S key={e.id} metric={e} data={i[t]} selected={e.id===a} onToggle={()=>n(t=>t===e.id?null:e.id)} />)}
          </div>
          <div className={x("-mx-3 -mb-6 grid",c?"grid-rows-[1fr]":"grid-rows-[0fr]")}>
            <div className="min-h-0 overflow-hidden">
              <div className="px-3 pt-3 pb-6">{c&&<$ metric={N[o]} data={i[o]} range={e} />}</div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default R;
