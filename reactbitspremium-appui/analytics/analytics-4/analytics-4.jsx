/**
 * React Bits Pro — Application UI (analytics-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  m = "text-[12px]/[16px] font-normal tabular-nums",
  f = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  b = "ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  k = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  g = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
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

function y({stroke:e,dash:t,inverse:a=false}){
  return (
    <svg aria-hidden="true" width={12} height={8} viewBox="0 0 12 8" className="shrink-0">
        <line x1={0} x2={12} y1={4} y2={4} strokeWidth={2} strokeDasharray={t} stroke={a?"currentColor":undefined} className={a?undefined:e} />
      </svg>
  );
}

let j = [60,54,49,50,51,53,61,67,66,66,64,58,55,58,60,62,68,68,62,58,54,48,48,53,56,58,61,59,52,50],
  N = [257,273,283,261,237,227,211,203,223,241,240,243,237,208,189,192,194,204,236,254,249,248,241,218,213,232,243,257,280,280],
  _ = Array.from({length:30},(e,t)=>`Apr ${t+1}`),
  M = [{id:"p50",label:"p50",values:j,stroke:"stroke-neutral-900 dark:stroke-neutral-100",dash:undefined},{id:"p90",label:"p90",values:[147,137,143,153,155,159,162,149,134,130,127,126,140,154,155,157,157,144,136,142,147,153,169,178,171,165,158,144,139,147],stroke:g,dash:undefined},{id:"p99",label:"p99",values:N,stroke:g,dash:"6 4"}];

function A(){
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
  }(),[a,i]=useState(null),[o,c]=useState(N.length-1),[d,g]=useState({p50:true,p90:true,p99:true}),A=t.width,S=Math.max(A-34-1,1),$=206,R=j.length,L=M.filter(e=>d[e.id]),{top:D,ticks:C}=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(250,...L.flatMap(e=>e.values))), [L]),z=useCallback(e=>34+e/(R-1)*S, [S,R]),E=useCallback(e=>10+$-e/D*$, [$,D]),F=Math.ceil(R/v(Math.floor(S/56),2,7)),B=N.indexOf(Math.min(...N)),U=N[R-1],W=null===a?U:N[a];
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={u(f,"flex flex-wrap gap-x-2")}>
                    <span>p99 latency</span>
                    <span className={h}>{null===a?"Latest":_[a]}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={u("text-[40px]/[44px] font-[450] tabular-nums",x,"flex items-baseline gap-x-1")}>
                      {W}
                      <span className={b}>ms</span>
                    </p>
                    <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                      <w value={(W-250)/250*100} />
                      <span className={h}>vs SLO</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {M.map(e=>{
                    let t=d[e.id];
                    return (
                      <button key={e.id} type="button" aria-pressed={t} onClick={()=>g(t=>{
                                        let a={...t,[e.id]:!t[e.id]};
                                        return a.p50||a.p90||a.p99?a:t;
                                      })} className="flex h-7 min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900/5 aria-[pressed=false]:text-neutral-900/66 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:aria-[pressed=false]:text-neutral-100/66">
                                        <span className={u("inline-flex",t?"opacity-100":"opacity-40")}><y stroke={e.stroke} dash={e.dash} /></span>
                                        {e.label}
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`API latency percentiles over 30 days. Latest p99 ${U} milliseconds against a 250 millisecond SLO.`} onPointerMove={t=>(t=>{
                let a=e.current;
                if(!a)return;
                let r=a.getBoundingClientRect(),l=S/(R-1),n=v(Math.round((t-r.left-34)/l),0,R-1);
                i(n),c(n)
              })(t.clientX)} onPointerLeave={()=>i(null)} onBlur={()=>i(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let t=v((a??R-1)+("ArrowLeft"===e.key?-1:1),0,R-1);
                  i(t),c(t)
                }
                "Home"===e.key&&(i(0),c(0)),"End"===e.key&&(i(R-1),c(R-1)),"Escape"===e.key&&i(null)
              }} style={{height:236,touchAction:"pan-y"}} className={u("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
                {A>0&&<svg width={A} height={236} className="overflow-visible">
                  {C.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={A-1} y1={E(e)} y2={E(e)} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} />
                                    <text x={0} y={E(e)} dy={-4} className={k}>
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {_.map((e,t)=>t%F==0?<text key={e} x={z(t)} y={232} textAnchor={0===t?"start":t===R-1?"end":"middle"} className={k}>{e}</text>:null)}
                  {D>=250&&<g>
                    <line x1={34} x2={A-1} y1={E(250)} y2={E(250)} strokeDasharray="4 4" stroke="currentColor" className={p} strokeWidth={1} />
                    <text x={v(z(B),70,A-1-36)} y={E(250)} dy={-6} textAnchor="middle" className={k}>
                      {"SLO "}
                      250
                      ms
                    </text>
                  </g>}
                  {L.map(e=>{
                    let t=line().x((e,t)=>z(t)).y(e=>E(e)).curve(s.G)(e.values)??"";
                    return <path key={e.id} d={t} fill="none" className={e.stroke} strokeWidth={2} strokeDasharray={e.dash} strokeLinecap="round" strokeLinejoin="round" />;
                  })}
                  {d.p99&&N.map((e,t)=>e>250?<rect key={t} x={z(t)-3} y={E(e)-3} width={6} height={6} fill="currentColor" className={p} />:null)}
                  {null!==a&&<g>
                    <line x1={z(a)} x2={z(a)} y1={10} y2={10+$} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />
                    {L.map(e=>{
                      let t=e.values[a];
                      return "p99"===e.id&&t>250?<rect key={e.id} x={z(a)-4} y={E(t)-4} width={8} height={8} fill="currentColor" className={p} />:<rect key={e.id} x={z(a)-4} y={E(t)-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />;
                    })}
                  </g>}
                </svg>}
                {A>0&&<div aria-hidden="true" style={{left:v(z(o),78,Math.max(A-78,78)),top:4}} className={u("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={u(m,"whitespace-nowrap")}>{_[o]}</p>
                  <div className="space-y-0.5">
                    {M.map(e=>(
                      <div key={e.id} className={u("flex items-center justify-between gap-4",!d[e.id]&&"opacity-40")}>
                                        <span className={u(m,"flex items-center gap-1.5 whitespace-nowrap")}>
                                          <y stroke={e.stroke} dash={e.dash} inverse />
                                          {e.label}
                                        </span>
                                        <span className="whitespace-nowrap">
                                          {e.values[o]}
                                          ms
                                        </span>
                                      </div>
                    ))}
                  </div>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {M.map(e=>(
                <div key={e.id} className={u("flex min-w-0 flex-col gap-2 px-4 py-3","rounded-[var(--rb-r-sm,6px)]","ps-3 pe-3")}>
                            <p className={u(f,"flex items-center gap-1.5 truncate")}>
                              <y stroke={e.stroke} dash={e.dash} />
                              {e.label}
                              {" latency"}
                            </p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.values[R-1]}
                              <span className={b}>ms</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
