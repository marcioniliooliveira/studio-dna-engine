/**
 * React Bits Pro — Application UI (analytics-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  f = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",
  b = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  k = (e,t,a)=>Math.min(a,Math.max(t,e));

function g({value:e}){
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

let v = ["7D","30D","12M"],
  w = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function y(){
  let[e,t]=useState("30D"),[a,o]=useState(null),[c,d]=useState(0),[u,y]=function(){
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
  }(),{values:j,labels:N}=useMemo(()=>(function(e){
    let{count:t,base:a,drift:r}={"7D":{count:7,base:41200,drift:.14},"30D":{count:30,base:36800,drift:.31},"12M":{count:12,base:268e3,drift:.72}}[e];
    return {values:Array.from({length:t},(e,l)=>Math.round(a*(1+l/(t-1)*r)*(1+.085*(.5*Math.sin(.7*l+2.4)+.34*Math.sin(.23*l+5.04)+.12*Math.sin(1.9*l+1.44))))),labels:Array.from({length:t},(t,a)=>"12M"===e?w[a]:"7D"===e?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][a]:`Jun ${a+1}`)};
  })(e), [e]),_=y.width,M=Math.max(_-36-1,1),A=202,{top:S,ticks:$}=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...j)), [j]),R=useCallback(e=>36+e/(j.length-1)*M, [M,j.length]),L=useCallback(e=>10+A-e/S*A, [A,S]),D=line().x((e,t)=>R(t)).y(e=>L(e)).curve(s.G)(j)??"",C=area().x((e,t)=>R(t)).y0(10+A).y1(e=>L(e)).curve(s.G)(j)??"",z=j[j.length-1],E=null===a?z:j[a],F=(z-j[0])/j[0]*100,B=k(Math.floor(M/56),2,7),U=Math.ceil(j.length/B),W=Math.max(...j),P=Math.min(...j),H=Math.round(j.reduce((e,t)=>e+t,0)/j.length),O=e=>{
    t(e),o(null),d(0)
  };
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={m}>Net revenue</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={x("text-[40px]/[44px] font-[450] tabular-nums",h)}>
                      $
                      {E.toLocaleString("en-US")}
                    </p>
                    {null===a?<p className={f}>
                      <g value={F} />
                      <span className={p}>
                        {"over "}
                        {"12M"===e?"12 months":`${e} period`}
                      </span>
                    </p>:<p className={f}><span className={p}>{N[a]}</span></p>}
                  </div>
                </div>
                <div role="radiogroup" aria-label="Range" onKeyDown={t=>{
                  var a,r,l;
                  let n;
                  return a=v.length,r=v.indexOf(e),l=e=>O(v[e]),void(!((n="ArrowRight"===t.key||"ArrowDown"===t.key?(r+1)%a:"ArrowLeft"===t.key||"ArrowUp"===t.key?(r-1+a)%a:"Home"===t.key?0:"End"===t.key?a-1:-1)<0)&&(t.preventDefault(),l(n),t.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                  {v.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>O(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
                </div>
              </div>
              <div ref={u} role="img" tabIndex={0} aria-label={`Net revenue over the last ${e}. Latest ${z.toLocaleString("en-US")} dollars.`} onPointerMove={e=>(e=>{
                let t=u.current;
                if(!t)return;
                let a=t.getBoundingClientRect(),r=M/(j.length-1),l=k(Math.round((e-a.left-36)/r),0,j.length-1);
                o(l),d(l)
              })(e.clientX)} onPointerLeave={()=>o(null)} onBlur={()=>o(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let t=k((a??j.length-1)+("ArrowLeft"===e.key?-1:1),0,j.length-1);
                  o(t),d(t)
                }
                "Home"===e.key&&(o(0),d(0)),"End"===e.key&&(o(j.length-1),d(j.length-1)),"Escape"===e.key&&o(null)
              }} style={{height:232,touchAction:"pan-y"}} className={x("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
                {_>0&&<svg width={_} height={232} className="overflow-visible">
                  {$.map(e=>(
                    <g key={e}>
                                    <line x1={36} x2={_-1} y1={L(e)} y2={L(e)} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} />
                                    <text x={0} y={L(e)} dy={-4} className={b}>
                                      $
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {N.map((e,t)=>t%U==0?<text key={e} x={R(t)} y={228} textAnchor={0===t?"start":t===j.length-1?"end":"middle"} className={b}>{e}</text>:null)}
                  <path d={C} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
                  <path d={D} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
                  {null!==a&&<g>
                    <line x1={R(a)} x2={R(a)} y1={10} y2={10+A} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />
                    <rect x={R(a)-4} y={L(j[a])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />
                  </g>}
                </svg>}
                {_>0&&<div aria-hidden="true" style={{left:k(R(c),72,Math.max(_-72,72)),top:k(L(j[c]??0)-64,0,164)}} className={x("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={x("text-[12px]/[16px] font-normal tabular-nums","whitespace-nowrap")}>{N[c]}</p>
                  <p className="whitespace-nowrap">
                    $
                    {(j[c]??0).toLocaleString("en-US")}
                  </p>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"Peak",value:W},{label:"Daily average",value:H},{label:"Lowest",value:P}].map(e=>(
                <div key={e.label} className={x("flex min-w-0 flex-col gap-2 px-4 py-3","rounded-[var(--rb-r-sm,6px)]","ps-3 pe-3")}>
                            <p className={x(m,"truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              $
                              {e.value.toLocaleString("en-US")}
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default y;
