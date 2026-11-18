/**
 * React Bits Pro — Application UI (analytics-12)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { area, stack, stackOffsetExpand, stackOrderAscending, stackOrderNone } from 'd3-shape';

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  p = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  m = "fill-neutral-900/5 dark:fill-neutral-100/5",
  f = (e,t,a)=>Math.min(a,Math.max(t,e)),
  b = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  k = [42,44,47,45,48,52,55,53,58,61,64,68],
  g = [88,92,90,96,101,99,104,110,108,115,119,124],
  v = [210,218,225,232,240,251,248,260,272,281,290,305],
  w = [340,352,368,375,390,405,418,432,445,461,478,496],
  y = b.map((e,t)=>({month:e,hot:k[t],warm:g[t],cold:v[t],archive:w[t]})),
  j = ["archive","cold","warm","hot"],
  N = {hot:{label:"Hot",fill:"text-neutral-900 dark:text-neutral-100",ink:1,outlined:false},warm:{label:"Warm",fill:"text-neutral-900/66 dark:text-neutral-100/66",ink:.66,outlined:false},cold:{label:"Cold",fill:"text-neutral-900/40 dark:text-neutral-100/40",ink:.4,outlined:false},archive:{label:"Archive",fill:m,ink:0,outlined:true}};

function _({tier:e,inverse:t=false}){
  let a=N[e];
  return (
    <svg aria-hidden="true" viewBox="0 0 8 8" className="inline-block size-2 shrink-0">
        {a.outlined?t?<rect x={.5} y={.5} width={7} height={7} fill="none" stroke="currentColor" strokeWidth={1} />:<rect x={.5} y={.5} width={7} height={7} strokeWidth={1} className={u(m,"stroke-neutral-900/66 dark:stroke-neutral-100/66")} />:<rect width={8} height={8} fill="currentColor" opacity={t?a.ink:undefined} className={t?undefined:a.fill} />}
      </svg>
  );
}

let M = ["Stacked","100%"],
  A = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function S(){
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
  }(),[a,m]=useState(null),[g,v]=useState(b.length-1),[w,S]=useState("Stacked"),[$,R]=useState({hot:true,warm:true,cold:true,archive:true}),L=t.width,D=Math.max(L-34-1,1),C=230,z=b.length,E="100%"===w,F=j.filter(e=>$[e]),B=useMemo(()=>stack().keys(F).order(stackOrderAscending).offset(E?stackOffsetExpand:stackOrderNone)(y), [F,E]),U=useMemo(()=>{
    if(E)return 1;
    let e=0;
    for(let t of B)for(let a of t)e=Math.max(e,a[1]);
    return e;
  }, [B,E]),{top:W,ticks:P}=useMemo(()=>E?{top:1,ticks:[0,.25,.5,.75,1]}:function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  }(U), [E,U]),H=useCallback(e=>34+e/(z-1)*D, [D,z]),O=useCallback(e=>10+C-e/W*C, [C,W]),T=Math.ceil(z/7),q=useMemo(()=>y.map(e=>e.hot+e.warm+e.cold+e.archive), []),I=useMemo(()=>y.map(e=>F.reduce((t,a)=>t+e[a],0)), [F]),K=q[z-1],Q=(q[z-1]-q[z-2])/q[z-2]*100,J=k[z-1]/K*100,V=I[g];
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]",x)}>Storage by tier</h2>
                  <p className={u("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66","mt-0.5 truncate")}>
                    {K.toLocaleString("en-US")}
                    {" TB stored across four tiers"}
                  </p>
                </div>
                <div role="radiogroup" aria-label="Chart mode" onKeyDown={A} className={u("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                  {M.map(e=><button key={e} type="button" role="radio" aria-checked={e===w} tabIndex={e===w?0:-1} onClick={()=>S(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>)}
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`Storage composition by tier across 12 months. Latest total ${K.toLocaleString("en-US")} terabytes.`} onPointerMove={t=>(t=>{
                let a=e.current;
                if(!a)return;
                let r=a.getBoundingClientRect(),l=D/(z-1),n=f(Math.round((t-r.left-34)/l),0,z-1);
                m(n),v(n)
              })(t.clientX)} onPointerLeave={()=>m(null)} onBlur={()=>m(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let t=f((a??z-1)+("ArrowLeft"===e.key?-1:1),0,z-1);
                  m(t),v(t)
                }
                "Home"===e.key&&(m(0),v(0)),"End"===e.key&&(m(z-1),v(z-1)),"Escape"===e.key&&m(null)
              }} style={{height:260,touchAction:"pan-y"}} className={u("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
                {L>0&&<svg width={L} height={260} className="overflow-visible">
                  {P.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={L-1} y1={O(e)} y2={O(e)} shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />
                                    <text x={0} y={O(e)} dy={-4} className={p}>
                                      {E?`${Math.round(100*e)}%`:Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {b.map((e,t)=>t%T==0?<text key={e} x={H(t)} y={256} textAnchor={0===t?"start":"middle"} className={p}>{e}</text>:null)}
                  <g>
                    {B.map(e=>{
                      let t=e.key,a=N[t],l=area().x((e,t)=>H(t)).y0(e=>O(e[0])).y1(e=>O(e[1])).curve(d.G)(e)??"";
                      return <path key={t} d={l} fill="currentColor" className={a.fill} />;
                    })}
                  </g>
                  {null!==a&&<line x1={H(a)} x2={H(a)} y1={10} y2={10+C} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />}
                </svg>}
                {L>0&&<div aria-hidden="true" style={{left:f(H(g),96,Math.max(L-96,96)),top:4}} className={u("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={u(h,"whitespace-nowrap")}>{b[g]}</p>
                  <div className="space-y-0.5">
                    {[...j].reverse().filter(e=>$[e]).map(e=>{
                      let t=y[g][e],a=V>0?t/V*100:0;
                      return (
                        <div key={e} className="flex items-center justify-between gap-4">
                                            <span className={u(h,"flex items-center gap-1.5 whitespace-nowrap")}>
                                              <_ tier={e} inverse />
                                              {N[e].label}
                                            </span>
                                            <span className="whitespace-nowrap">
                                              {t.toLocaleString("en-US")}
                                              {" TB"}
                                              <span className={u(h,"ml-1")}>
                                                {a.toFixed(1)}
                                                %
                                              </span>
                                            </span>
                                          </div>
                      );
                    })}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <span className={u(h,"whitespace-nowrap")}>Total</span>
                      <span className="whitespace-nowrap">
                        {V.toLocaleString("en-US")}
                        {" TB"}
                      </span>
                    </div>
                  </div>
                </div>}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1">
                {[...j].reverse().map(e=>{
                  let t=$[e];
                  return (
                    <button key={e} type="button" aria-pressed={t} onClick={()=>R(t=>{
                                    let a={...t,[e]:!t[e]};
                                    return Object.values(a).some(Boolean)?a:t;
                                  })} className="flex h-7 min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900/5 aria-[pressed=false]:text-neutral-900/66 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:aria-[pressed=false]:text-neutral-100/66">
                                    <span className={u("inline-flex",t?"opacity-100":"opacity-40")}><_ tier={e} /></span>
                                    {N[e].label}
                                  </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"Total stored",value:K.toLocaleString("en-US"),unit:"TB"},{label:"Growth this month",value:`${Q>=0?"+":"−"}${Math.abs(Q).toFixed(1)}`,unit:"%"},{label:"Hot tier share",value:J.toFixed(1),unit:"%"}].map(e=>(
                <div key={e.label} className={u("flex min-w-0 flex-col gap-2 px-4 py-3","rounded-[var(--rb-r-sm,6px)]","ps-3 pe-3")}>
                            <p className={u("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.value}
                              <span className="ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.unit}</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default S;
