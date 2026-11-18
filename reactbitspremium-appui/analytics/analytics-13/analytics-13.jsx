/**
 * React Bits Pro — Application UI (analytics-13)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  h = "stroke-neutral-900 dark:stroke-neutral-100",
  p = "fill-neutral-900 dark:fill-neutral-100",
  m = (e,t,a)=>Math.min(a,Math.max(t,e)),
  f = (e,t)=>.5*Math.sin(.7*t+e)+.34*Math.sin(.23*t+2.1*e)+.12*Math.sin(1.9*t+.6*e),
  b = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  k = Date.UTC(2024,0,2),
  g = ["30D","90D","1Y"],
  v = {"30D":{count:30,stride:1},"90D":{count:90,stride:1},"1Y":{count:120,stride:3}},
  w = e=>`$${e.toFixed(2)}`,
  y = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function j(){
  let[e,t]=useState("30D"),[a,j]=useState(null),[N,_]=useState(0),[M,A]=function(){
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
  }(),S=useMemo(()=>(function(e){
    let{count:t,stride:a}=v[e],r=.05/t,l=128;
    return Array.from({length:t},(e,t)=>{
      let n,s=l,i=s*(1+.02*f(2.4,t)+r),o=Math.max(s,i)*(1+.013*Math.abs(f(5.1,t))),c=Math.min(s,i)*(1-.013*Math.abs(f(3.7,t))),d=Math.round(24e5*(1+.42*f(6.2,t)));
      return l=i,{open:s,high:o,low:c,close:i,volume:d,label:(n=new Date(k+t*a*864e5),`${b[n.getUTCMonth()]} ${n.getUTCDate()}`)};
    });
  })(e), [e]),$=S.length,R=A.width,L=Math.max(R-40-1,1),D=298,C=L/$,z=m(.72*C,1,14),E=m(.5*z,1,1.5),F=m(.5*z,1,1.25),B=S.map(e=>e.low),U=S.map(e=>e.high),{lo:W,hi:P,ticks:H}=useMemo(()=>(function(e,t,a=3){
    let r=(t-e||1)/a,l=10**Math.floor(Math.log10(r)),n=r/l,s=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*l,i=Math.floor(e/s)*s,o=Math.ceil(t/s)*s,c=[];
    for(let e=i;e<=o+s/1e3;e+=s)c.push(Math.round(100*e)/100);
    return {lo:i,hi:o,ticks:c};
  })(Math.min(...S.map(e=>e.low)),Math.max(...S.map(e=>e.high)),2), [S]),O=useMemo(()=>(function(e,t=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let a=e/t,r=10**Math.floor(Math.log10(a)),l=a/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...S.map(e=>e.volume))).top, [S]),T=useCallback(e=>40+C*(e+.5), [C]),q=useCallback(e=>12+D-(e-W)/(P-W||1)*D, [D,W,P]),I=useCallback(e=>72-e/O*66, [66,O]),K=S[0],Q=S[$-1],J=Q.close-K.open,V=J/K.open*100,G=Math.max(...U),X=Math.min(...B),Y=m(Math.floor(L/56),2,7),Z=q(K.open),ee=Math.ceil(88/C),et=$-1;
  for(let e=$-1;e>=ee-1;e--)if(S.slice(e-ee+1,e+2).every(e=>q(e.high)>=Z-2||q(e.low)<=Z-18)){
    et=e;
    break
  }
  let ea=Math.ceil($/Y),er=S[N],el=(er.close-er.open)/er.open*100;
  return (
    <div className={o("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1 px-5 py-4")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={o("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex flex-wrap gap-x-2")}>
                  <span>Compute credits</span>
                  <span className={d}>CMP/USD</span>
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                  <p className={o("text-[40px]/[44px] font-[450] tabular-nums",c)}>{w(Q.close)}</p>
                  <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                    <span>
                      <HugeiconsIcon icon={J>=0?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" className="inline-block align-middle" />
                    </span>
                    <span className="sr-only">{J>=0?"Up":"Down"}</span>
                    {J>=0?"+":"−"}
                    $
                    {Math.abs(J).toFixed(2)}
                    {" ("}
                    {J>=0?"+":"−"}
                    {Math.abs(V).toFixed(2)}
                    %)
                    <span className={d}>
                      {"over "}
                      {e}
                    </span>
                  </p>
                </div>
                <p className={o(u,d,"mt-1 flex flex-wrap gap-x-3")}>
                  <span>
                    {"Period high "}
                    {w(G)}
                  </span>
                  <span>
                    {"Low "}
                    {w(X)}
                  </span>
                </p>
              </div>
              <div role="radiogroup" aria-label="Range" onKeyDown={y} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                {g.map(a=>(
                  <button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>{
                                t(a),j(null),_(0)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>
                ))}
              </div>
            </div>
            <div ref={M} role="img" tabIndex={0} aria-label={`Compute-credit price, ${e}. Latest close ${w(Q.close)}, ${V>=0?"up":"down"} ${Math.abs(V).toFixed(1)} percent over the period.`} onPointerMove={e=>(e=>{
              let t=M.current;
              if(!t)return;
              let a=m(Math.floor((e-t.getBoundingClientRect().left-40)/C),0,$-1);
              j(a),_(a)
            })(e.clientX)} onPointerLeave={()=>j(null)} onBlur={()=>j(null)} onKeyDown={e=>{
              if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                e.preventDefault();
                let t=m((a??$-1)+("ArrowLeft"===e.key?-1:1),0,$-1);
                j(t),_(t)
              }
              "Home"===e.key&&(j(0),_(0)),"End"===e.key&&(j($-1),_($-1)),"Escape"===e.key&&j(null)
            }} style={{touchAction:"pan-y"}} className={o("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-crosshair")}>
              {R>0&&<>
                <svg width={R} height={330} className="block overflow-visible">
                  {H.map(e=>(
                    <g key={e}>
                                    <line x1={40} x2={R-1} y1={q(e)} y2={q(e)} shapeRendering="crispEdges" className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} />
                                    <text x={0} y={q(e)} dy={-4} className={x}>
                                      $
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  <line x1={40} x2={R-1} y1={q(K.open)} y2={q(K.open)} strokeDasharray="6 4" className="stroke-neutral-900/66 dark:stroke-neutral-100/66" strokeWidth={1} shapeRendering="crispEdges" />
                  <text x={Math.min(40+C*(et+1),R-1)} y={Z} dy={-4} textAnchor="end" className={x}>
                    {"Open "}
                    {w(K.open)}
                  </text>
                  {null!==a&&<line x1={T(a)} x2={T(a)} y1={12} y2={12+D} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />}
                  {S.map((e,t)=>{
                    let l=e.close>=e.open,n=q(Math.max(e.open,e.close)),s=Math.max(1,q(Math.min(e.open,e.close))-n),i=null!==a&&a!==t;
                    return (
                      <g key={t} style={{opacity:i?.45:1}} className="transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]">
                                        <line x1={T(t)} x2={T(t)} y1={q(e.high)} y2={n} className={h} strokeWidth={E} />
                                        <line x1={T(t)} x2={T(t)} y1={n+s} y2={q(e.low)} className={h} strokeWidth={E} />
                                        <rect x={T(t)-z/2} y={n} width={z} height={s} fill={l?"none":undefined} strokeWidth={l?F:0} className={l?h:p} />
                                      </g>
                    );
                  })}
                </svg>
                <svg width={R} height={72} className="mt-1 block overflow-visible">
                  <text x={0} y={10} className={x}>Volume</text>
                  <g>
                    {S.map((e,t)=>{
                      let l=I(e.volume),n=a===t;
                      return <rect key={t} x={T(t)-z/2} y={l} width={z} height={Math.max(1,72-l)} className={n?p:"fill-neutral-900/5 dark:fill-neutral-100/5"} />;
                    })}
                  </g>
                </svg>
                <svg width={R} height={16} className="block overflow-visible">
                  {S.map((e,t)=>t%ea==0?<text key={t} x={T(t)} y={11} textAnchor={0===t?"start":t===$-1?"end":"middle"} className={x}>{e.label}</text>:null)}
                </svg>
                <div aria-hidden="true" style={{left:m(T(N),78,Math.max(R-78,78)),top:12}} className={o("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","w-[150px] -translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={u}>{er.label}</p>
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                    <span className={u}>Open</span>
                    <span className="text-right">{w(er.open)}</span>
                    <span className={u}>High</span>
                    <span className="text-right">{w(er.high)}</span>
                    <span className={u}>Low</span>
                    <span className="text-right">{w(er.low)}</span>
                    <span className={u}>Close</span>
                    <span className="text-right">{w(er.close)}</span>
                  </div>
                  <p className="text-right">
                    {el>=0?"+":"−"}
                    {Math.abs(el).toFixed(2)}
                    %
                  </p>
                </div>
              </>}
            </div>
          </div>
        </div>
      </div>
  );
}


export default j;
