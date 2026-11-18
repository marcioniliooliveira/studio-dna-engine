/**
 * React Bits Pro — Application UI (analytics-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  h = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  p = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  m = "fill-neutral-900 dark:fill-neutral-100",
  f = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  b = "fill-neutral-900/5 dark:fill-neutral-100/5",
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

function v({outlined:e,inverse:t=false}){
  return (
    <svg aria-hidden="true" viewBox="0 0 8 8" className="inline-block size-2 shrink-0">
        {e?t?<rect x={.5} y={.5} width={7} height={7} fill="none" stroke="currentColor" strokeWidth={1} />:<rect x={.5} y={.5} width={7} height={7} strokeWidth={1} className={c(b,f)} />:t?<rect width={8} height={8} fill="currentColor" />:<rect width={8} height={8} className={m} />}
      </svg>
  );
}

let w = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  y = [3120,2980,3340,3610,3180,2890,2760,3050,3480,3720,3910,3540],
  j = [2740,2610,2880,3020,2950,2680,2510,2790,3010,3180,3260,3040],
  N = [{id:"current",label:"This year",values:y,barClass:m,outlined:false},{id:"prior",label:"Last year",values:j,barClass:c(b,f),outlined:true}];

function _(){
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
  }(),[a,n]=useState(null),[s,i]=useState(11),[o,m]=useState({current:true,prior:true}),f=t.width,_=Math.max(f-34-1,1),M=250,A=w.length,S=useMemo(()=>y.reduce((e,t)=>e+t,0), []),$=useMemo(()=>j.reduce((e,t)=>e+t,0), []),R=(S-$)/$*100,L=useMemo(()=>Math.max(...y), []),D=Math.round(S/A),{top:C,ticks:z}=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...y,...j)), []),E=_/A,F=.72*E,B=Math.max((F-3)/2,1),U=useCallback(e=>34+e*E, [E]),W=useCallback(e=>10+M-e/C*M, [M,C]),P=Math.ceil(A/7),H=null===a?S:y[a],O=null===a?R:(y[a]-j[a])/j[a]*100,T=(y[s]-j[s])/j[s]*100;
  return (
    <div className={c("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={c(h,"flex flex-wrap gap-x-2")}>
                    <span>Ticket volume</span>
                    <span className={u}>{null===a?"This year":w[a]}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={c("text-[40px]/[44px] font-[450] tabular-nums",d)} style={{minWidth:"6ch"}}>{H.toLocaleString("en-US")}</p>
                    <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                      <g value={O} />
                      <span className={u}>{null===a?"vs last year":"YoY"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {N.map(e=>{
                    let t=o[e.id];
                    return (
                      <button key={e.id} type="button" aria-pressed={t} onClick={()=>m(t=>{
                                        let a={...t,[e.id]:!t[e.id]};
                                        return a.current||a.prior?a:t;
                                      })} className="flex h-7 min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900/5 aria-[pressed=false]:text-neutral-900/66 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:aria-[pressed=false]:text-neutral-100/66">
                                        <span className={c("inline-flex",t?"opacity-100":"opacity-40")}><v outlined={e.outlined} /></span>
                                        {e.label}
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`Ticket volume by month, this year versus last year. This year total ${S.toLocaleString("en-US")} tickets.`} onPointerMove={t=>(t=>{
                let a=e.current;
                if(!a)return;
                let r=k(Math.floor((t-a.getBoundingClientRect().left-34)/E),0,A-1);
                n(r),i(r)
              })(t.clientX)} onPointerLeave={()=>n(null)} onBlur={()=>n(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let t=k((a??A-1)+("ArrowLeft"===e.key?-1:1),0,A-1);
                  n(t),i(t)
                }
                "Home"===e.key&&(n(0),i(0)),"End"===e.key&&(n(A-1),i(A-1)),"Escape"===e.key&&n(null)
              }} style={{height:280,touchAction:"pan-y"}} className={c("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
                {f>0&&<svg width={f} height={280} className="overflow-visible">
                  {z.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={f-1} y1={W(e)} y2={W(e)} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} />
                                    <text x={0} y={W(e)} dy={-4} className={p}>
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {null!==a&&<rect x={U(a)} y={10} width={E} height={M} className={b} />}
                  {w.map((e,t)=>t%P==0?<text key={e} x={U(t)+E/2} y={276} textAnchor="middle" className={p}>{e}</text>:null)}
                  {w.map((e,t)=>{
                    let l=U(t)+(E-F)/2,n=null!==a&&a!==t;
                    return (
                      <g key={t}>
                                        {N.map((e,a)=>{
                                          let s=e.values[t]/C*M,i=o[e.id];
                                          return (
                                            <path key={e.id} d={function(e,t,a,r,l){
                                                                  if(r<=0||a<=0)return "";
                                                                  let n=Math.min(2,a/2,r);
                                                                  return `M${e},${t+r} L${e},${t+n} Q${e},${t} ${e+n},${t} L${e+a-n},${t} Q${e+a},${t} ${e+a},${t+n} L${e+a},${t+r} Z`;
                                                                }(l+a*(B+3),10+M-s,B,s,0)} strokeWidth={1} className={c(e.barClass,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]")} style={{opacity:!i||n?.4:1}} />
                                          );
                                        })}
                                      </g>
                    );
                  })}
                  <line x1={34} x2={f-1} y1={10+M} y2={10+M} shapeRendering="crispEdges" className="stroke-neutral-900/8 dark:stroke-neutral-100/8" strokeWidth={1} />
                </svg>}
                {f>0&&<div aria-hidden="true" style={{left:k(U(s)+E/2,72,Math.max(f-72,72)),top:4}} className={c("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={c(x,"whitespace-nowrap")}>{w[s]}</p>
                  <div className="space-y-0.5">
                    {N.map(e=>(
                      <div key={e.id} className="flex items-center justify-between gap-4">
                                        <span className={c(x,"flex items-center gap-1.5 whitespace-nowrap")}>
                                          <v outlined={e.outlined} inverse />
                                          {e.label}
                                        </span>
                                        <span className="whitespace-nowrap">{e.values[s].toLocaleString("en-US")}</span>
                                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 pt-0.5">
                      <span className={c(x,"whitespace-nowrap")}>YoY</span>
                      <span className="whitespace-nowrap">
                        {T>=0?"+":"−"}
                        {Math.abs(T).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"This year total",value:S.toLocaleString("en-US"),unit:""},{label:"Monthly average",value:D.toLocaleString("en-US"),unit:""},{label:"Busiest month",value:L.toLocaleString("en-US"),unit:"Nov"}].map(e=>(
                <div key={e.label} className={c("flex min-w-0 flex-col gap-2 px-4 py-3","rounded-[var(--rb-r-sm,6px)]","ps-3 pe-3")}>
                            <p className={c(h,"truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.value}
                              {e.unit&&<span className="ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.unit}</span>}
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default _;
