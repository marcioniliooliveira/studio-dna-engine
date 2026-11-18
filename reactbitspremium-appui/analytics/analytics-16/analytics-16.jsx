/**
 * React Bits Pro — Application UI (analytics-16)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { line } from 'd3-shape';

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  c = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  d = "ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  u = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  x = "fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900",
  h = (e,t,a)=>Math.min(a,Math.max(t,e)),
  p = [{label:"60s",seconds:60},{label:"5m",seconds:300},{label:"15m",seconds:900}],
  m = e=>e<60?`${e}s`:Number.isInteger(e/60)?`${e/60}m`:`${(e/60).toFixed(1)}m`,
  f = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function b(){
  let[e,t]=function(){
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
  }(),[a,b]=useState(60),[k,g]=useState(false),[v,w]=useState(60),[y,j]=useState(null),[N,_]=useState(59),M=useRef(false),A=useRef(false);
  useEffect(()=>{
    let e=setInterval(()=>{
      M.current||A.current||b(e=>e+1)
    },1e3);
    return ()=>clearInterval(e);
  }, []);
  let S=v/60,$=useMemo(()=>Array.from({length:60},(e,t)=>{
    var r;
    let l;
    return Math.round(980+340*(.5*Math.sin(.7*(l=.11*(r=a-59+t)*S)+3.7)+.34*Math.sin(.23*l+2.1*3.7)+.12*Math.sin(1.9*l+2.22))+40*Math.sin(.5*r));
  }), [a,S]),R=t.width,L=Math.max(R-34-1,1),D=258,{top:C,ticks:z}=useMemo(()=>(function(e,t=4){
    let a=1500/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(1500/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(0), []),E=useCallback(e=>34+e/59*L, [L]),F=useCallback(e=>10+D-e/C*D, [D,C]),B=line().x((e,t)=>E(t)).y(e=>F(e)).curve(s.G)($)??"",U=$[59],W=null===y?U:$[y],P=Math.max(...$),H=Math.round($.reduce((e,t)=>e+t,0)/$.length),O=()=>{
    A.current=false,j(null)
  },T=Math.round((59-N)*S);
  return (
    <div className={i("bg-white dark:bg-neutral-950",o,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={c}>Requests per second</p>
                    <span className={i("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",k?"text-neutral-900/66 dark:text-neutral-100/66":"text-neutral-900 dark:text-neutral-100")}>
                      {!k&&<span className="flex h-lh shrink-0 items-center">
                        <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      </span>}
                      {k?"Paused":"Live"}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={i("text-[40px]/[44px] font-[450] tabular-nums",o,"flex items-baseline gap-x-1")}>
                      <span className="inline-block" style={{minWidth:"4.4ch"}}>{W.toLocaleString("en-US")}</span>
                      <span className={d}>rps</span>
                    </p>
                    {null!==y&&<p className={i("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66","tabular-nums")}>{0===T?"now":`${T}s ago`}</p>}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button type="button" onClick={()=>g(e=>(M.current=!e,!e))} aria-pressed={k} className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>{k?"Resume":"Pause"}</button>
                  <div role="radiogroup" aria-label="Window" onKeyDown={f} className={i("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                    {p.map(e=><button key={e.label} type="button" role="radio" aria-checked={e.seconds===v} tabIndex={e.seconds===v?0:-1} onClick={()=>w(e.seconds)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
                  </div>
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`Live requests per second over the last ${m(v)}. Currently ${U.toLocaleString("en-US")} requests per second.`} onPointerMove={t=>(t=>{
                let a=e.current;
                if(!a)return;
                A.current=true;
                let r=a.getBoundingClientRect(),l=L/59,n=h(Math.round((t-r.left-34)/l),0,59);
                j(n),_(n)
              })(t.clientX)} onPointerLeave={O} onBlur={O} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault(),A.current=true;
                  let t=h((y??59)+("ArrowLeft"===e.key?-1:1),0,59);
                  j(t),_(t)
                }
                "Home"===e.key&&(A.current=true,j(0),_(0)),"End"===e.key&&(A.current=true,j(59),_(59)),"Escape"===e.key&&O()
              }} style={{height:288,touchAction:"pan-y"}} className={i("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
                {R>0&&<svg width={R} height={288} className="overflow-visible">
                  {z.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={R-1} y1={F(e)} y2={F(e)} shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />
                                    <text x={0} y={F(e)} dy={-4} className={u}>
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {[0,30,59].map(e=><text key={e} x={E(e)} y={284} textAnchor={0===e?"start":59===e?"end":"middle"} className={u}>{59===e?"now":m(Math.round((59-e)*S))}</text>)}
                  <g>
                    <path d={B} fill="none" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  {null!==y&&<line x1={E(y)} x2={E(y)} y1={10} y2={10+D} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />}
                  <rect x={E(59)-4} y={F(U)-4} width={8} height={8} className={x} />
                  {null!==y&&59!==y&&<rect x={E(y)-4} y={F($[y])-4} width={8} height={8} className={x} />}
                </svg>}
                {R>0&&<div aria-hidden="true" style={{left:h(E(N),72,Math.max(R-72,72)),top:4}} className={i("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===y?"opacity-0":"opacity-100")}>
                  <p className={i("text-[12px]/[16px] font-normal tabular-nums","whitespace-nowrap")}>{0===T?"now":`${T}s ago`}</p>
                  <p className="whitespace-nowrap">
                    {$[N].toLocaleString("en-US")}
                    {" rps"}
                  </p>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"Current",value:U.toLocaleString("en-US")},{label:"Window peak",value:P.toLocaleString("en-US")},{label:"Window mean",value:H.toLocaleString("en-US")}].map(e=>(
                <div key={e.label} className={i("flex min-w-0 flex-col gap-2 px-4 py-3","rounded-[var(--rb-r-sm,6px)]","ps-3 pe-3")}>
                            <p className={i(c,"truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              <span className="inline-block" style={{minWidth:"4ch"}}>{e.value}</span>
                              <span className={d}>rps</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default b;
