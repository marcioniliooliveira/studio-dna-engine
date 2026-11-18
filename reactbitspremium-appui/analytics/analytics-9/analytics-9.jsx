/**
 * React Bits Pro — Application UI (analytics-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_33126 = [["path",{d:"M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 7L5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"5",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"19",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"5",cy:"19",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  c = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  d = "text-[12px]/[16px] font-normal tabular-nums",
  u = "fill-neutral-900/66 text-[12px] tabular-nums dark:fill-neutral-100/66",
  x = (e,t,a)=>Math.min(a,Math.max(t,e)),
  h = (e,t)=>.5*Math.sin(.9*t+e)+.32*Math.sin(.31*t+1.7*e),
  p = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  m = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  f = Date.UTC(2024,10,4);

function b(e){
  return new Date(f+864e5*e);
}

let k = [{id:"deploys",label:"Deployments",noun:"deployments",build:e=>{
  let t=e%7>=5,a=Math.max(0,(h(1.3,e)+.62)*7);
  return Math.round(t?.24*a:a);
}},{id:"incidents",label:"Incidents",noun:"incidents",build:e=>Math.max(0,Math.round((h(4.7,e)-.46)*13))},{id:"reviews",label:"Reviews",noun:"reviews",build:e=>{
  let t=e%7>=5,a=Math.max(0,(h(6.1,e)+.7)*9);
  return Math.round(t?.42*a:a);
}}],
  g = ["fill-neutral-900/5 dark:fill-neutral-100/5","text-neutral-900/40 dark:text-neutral-100/40","text-neutral-900/66 dark:text-neutral-100/66","text-neutral-900/80 dark:text-neutral-100/80","text-neutral-900 dark:text-neutral-100"];

function v(){
  let[e,t]=useState(k[0]),[a,h]=useState(null),[f,v]=useState({col:25,row:6}),[w,y]=function(){
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
  }(),j=useMemo(()=>Array.from({length:182},(t,a)=>e.build(a)), [e]),N=useMemo(()=>{
    let t=Math.max(...j,1),a=j.reduce((e,t)=>e+t,0),r=0;
    for(let e=1;e<182;e++)j[e]>j[r]&&(r=e);
    let l=0,n="incidents"===e.id;
    for(let e=181;e>=0;e--){
      let t=j[e]>0;
      if(n?t:!t)break;
      l++
    }
    return {max:t,total:a,peakDay:r,streak:l,incidentMode:n};
  }, [j,e]),_=useMemo(()=>{
    let e=[],t=-1,a=-3;
    for(let r=0;r<26;r++){
      let l=b(7*r).getUTCMonth();
      l!==t&&r-a>=3&&(e.push({col:r,name:p[l]}),a=r),t=l
    }
    return e;
  }, []),M=y.width,A=M>0?Math.floor((M-30-75)/26):0,S=A+3,$=18+7*A+18,R=(e,t)=>{
    let a=b(7*e+t);
    return `${m[t]}, ${a.getUTCDate()} ${p[a.getUTCMonth()]}`;
  },L=null===a?0:j[7*a.col+a.row],D=18+f.row*S-60,C=D>=0?D:18+f.row*S+A+6,z=R(Math.floor(N.peakDay/7),N.peakDay%7),E=null===a?`${e.label} heatmap, ${N.total.toLocaleString("en-US")} ${e.noun} over the last 26 weeks. Use arrow keys to inspect a day.`:`${0===L?`No ${e.noun}`:`${L} ${1===L?e.noun.replace(/s$/,""):e.noun}`} on ${R(a.col,a.row)}`,F=e=>{
    t(e),h(null)
  };
  return (
    <div className={i("bg-white dark:bg-neutral-950",o,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className={i("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex items-center gap-1.5")}>
                    <HugeiconsIcon icon={Icon_33126} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    {e.label}
                  </div>
                  <p className={i("text-[40px]/[44px] font-[450] tabular-nums",o,"mt-1")}>{N.total.toLocaleString("en-US")}</p>
                  <p className={i("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","mt-1 flex min-w-0 gap-2 truncate")}>
                    <span className="min-w-0 truncate">
                      {"Busiest "}
                      {z}
                      {" ("}
                      {j[N.peakDay].toLocaleString("en-US")}
                      )
                    </span>
                    <span className="shrink-0">
                      <span className="text-right tabular-nums">{N.streak}</span>
                      {N.incidentMode?"-day incident-free streak":"-day active streak"}
                    </span>
                  </p>
                </div>
                <div role="radiogroup" aria-label="Metric" onKeyDown={t=>{
                  var a,r,l;
                  let n;
                  return a=k.length,r=k.findIndex(t=>t.id===e.id),l=e=>F(k[e]),void(!((n="ArrowRight"===t.key||"ArrowDown"===t.key?(r+1)%a:"ArrowLeft"===t.key||"ArrowUp"===t.key?(r-1+a)%a:"Home"===t.key?0:"End"===t.key?a-1:-1)<0)&&(t.preventDefault(),l(n),t.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={i("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                  {k.map(t=><button key={t.id} type="button" role="radio" aria-checked={t.id===e.id} tabIndex={t.id===e.id?0:-1} onClick={()=>F(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t.label}</button>)}
                </div>
              </div>
              <div ref={w} role="img" tabIndex={0} aria-label={E} onPointerMove={e=>((e,t)=>{
                let a=w.current;
                if(!a||A<=0)return;
                let r=a.getBoundingClientRect(),l=x(Math.floor((e-r.left-30)/S),0,25),n=x(Math.floor((t-r.top-18)/S),0,6);
                h({col:l,row:n}),v({col:l,row:n})
              })(e.clientX,e.clientY)} onPointerLeave={()=>h(null)} onBlur={()=>h(null)} onKeyDown={e=>{
                let t=a??{col:25,row:6},r=null;
                if("ArrowLeft"===e.key)r={...t,col:t.col-1};else if("ArrowRight"===e.key)r={...t,col:t.col+1};else if("ArrowUp"===e.key)r={...t,row:t.row-1};else if("ArrowDown"===e.key)r={...t,row:t.row+1};else if("Home"===e.key)r={col:0,row:t.row};else if("End"===e.key)r={col:25,row:t.row};else if("Escape"===e.key)return void h(null);
                if(!r)return;
                e.preventDefault();
                let l={col:x(r.col,0,25),row:x(r.row,0,6)};
                h(l),v(l)
              }} style={{height:$,touchAction:"pan-y"}} className={i("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative mt-4 cursor-pointer")}>
                {M>0&&A>0&&<svg width={M} height={$} className="overflow-visible">
                  {_.map(e=><text key={e.name+e.col} x={30+e.col*S} y={10} className={u}>{e.name}</text>)}
                  {[0,2,4].map(e=><text key={e} x={0} y={18+e*S+A/2} dy={3} className={u}>{m[e]}</text>)}
                  {j.map((e,t)=>{
                    var a;
                    let l=Math.floor(t/7),n=(a=N.max,e<=0?0:x(1+Math.round(e/(a||1)*3),1,4)),s=N.incidentMode&&4===n;
                    return <rect key={t} x={30+l*S} y={18+t%7*S} width={A} height={A} rx={2} fill="currentColor" className={s?c:g[n]} />;
                  })}
                  {null!==a&&<rect x={30+a.col*S-.5} y={18+a.row*S-.5} width={A+1} height={A+1} rx={2.5} fill="none" strokeWidth={1} className="stroke-neutral-900 dark:stroke-neutral-100" />}
                </svg>}
                {M>0&&A>0&&<div aria-hidden="true" style={{left:x(30+f.col*S+A/2,72,Math.max(M-72,72)),top:C}} className={i("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className="whitespace-nowrap">
                    {0===j[7*f.col+f.row]?`No ${e.noun}`:`${j[7*f.col+f.row].toLocaleString("en-US")} ${1===j[7*f.col+f.row]?e.noun.replace(/s$/,""):e.noun}`}
                  </p>
                  <p className={i(d,"whitespace-nowrap")}>{R(f.col,f.row)}</p>
                </div>}
              </div>
              <div className={i(d,"text-neutral-900/66 dark:text-neutral-100/66","mt-3 flex items-center justify-end gap-1.5")}>
                <span>Less</span>
                {g.map((e,t)=>(
                  <svg key={t} aria-hidden="true" width={10} height={10} viewBox="0 0 10 10" className="shrink-0">
                                <rect width={10} height={10} rx={2} fill="currentColor" className={N.incidentMode&&t===g.length-1?c:e} />
                              </svg>
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default v;
