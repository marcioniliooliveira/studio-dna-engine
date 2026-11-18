/**
 * React Bits Pro — Application UI (monitoring-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let b = "bg-white dark:bg-neutral-950";

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "text-[15px]/[20px] font-bold";

let m = "text-[14px]/[20px] font-medium";

let k = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let f = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let g = u(m,h);

let v = u("text-[13px]/[16px] font-semibold tabular-nums",h);

let w = (e,a,r)=>Math.min(r,Math.max(a,e));

let j = (e,a,r,t)=>Array.from({length:t},(n,l)=>Math.round(a*(1+l/(t-1)*r+.09*(.5*Math.sin(.7*l+e)+.34*Math.sin(.23*l+2.1*e)))));

let y = ["1h","24h","7d"];

let N = {"1h":12,"24h":24,"7d":28};

let z = {"1h":["09:00","09:15","09:30","09:45","10:00"],"24h":["04:00","08:00","12:00","16:00","20:00"],"7d":["Mon","Wed","Thu","Sat","Sun"]};

let S = {"1h":"vs previous hour","24h":"vs previous day","7d":"vs previous week"};

let A = [{id:"req",label:"Requests",base:1284e3,drift:.151,unit:""},{id:"err",label:"Error rate",base:42,drift:-.02,unit:"%"},{id:"p95",label:"p95 latency",base:318,drift:.004,unit:"ms"},{id:"sat",label:"Saturation",base:61,drift:.037,unit:"%"}];

let R = [{id:"i1",title:"Checkout API timeouts",severity:"Critical",tone:"danger",service:"payments-edge",at:"09:12",body:"The charge endpoint exceeded its 8s budget on six consecutive calls, holding four orders at authorisation."},{id:"i2",title:"Retry storm contained",severity:"Major",tone:"warning",service:"invoice-worker",at:"08:47",body:"Backoff was applied after a vendor 503 spike, capping retries and draining the queued backlog."},{id:"i3",title:"Search index degraded",severity:"Minor",tone:"resolved",service:"search-api",at:"08:05",body:"Read latency on the embeddings index rose to 1.9s, slowing lookups for eleven minutes before recovering."}];

let L = (...e)=>e.filter(Boolean).join(" ");

let O = "text-neutral-900/62 dark:text-neutral-100/62";

let $ = "text-[14px]/[20px] font-medium";

let T = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let I = "ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78";

let F = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let B = L($,O);

let q = L("text-[13px]/[16px] font-semibold tabular-nums",O);

let H = [{id:"rps",label:"Requests",unit:"/s",base:4200,spread:480,seed:1.1,threshold:5200,thresholdLabel:"Autoscale at 5,200/s",decimals:0},{id:"p99",label:"p99 latency",unit:"ms",base:340,spread:90,seed:4.6,threshold:500,thresholdLabel:"SLO ceiling 500ms",decimals:0},{id:"err",label:"Errors",unit:"%",base:.42,spread:.26,seed:8.3,threshold:1,thresholdLabel:"Page on-call above 1%",decimals:2}];

let V = (e,a)=>a.toLocaleString("en-US",{minimumFractionDigits:e.decimals,maximumFractionDigits:e.decimals});

let U = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=r.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(t+a+r.length)%r.length;
  r[n].focus(),r[n].click()
};


export default function monitoring_2__Sorbet__Component(){
  let e=useRef(null),[a,r]=useState("rps"),[c,d]=useState(true),[_,x]=useState(0),u=H.find(e=>e.id===a)??H[0];
  useEffect(()=>{
    if(!c)return;
    let a=e.current?.ownerDocument.defaultView??window,r=a.setInterval(()=>x(e=>e+1),1e3);
    return ()=>a.clearInterval(r);
  }, [c]);
  let b=useMemo(()=>Array.from({length:60},(e,a)=>{
    let r;
    return r=_+a,Math.max(0,u.base+u.spread*(.52*Math.sin(.21*r+u.seed)+.33*Math.sin(.071*r+3.1*u.seed)+.15*Math.sin(.53*r+1.7*u.seed)));
  }), [u,_]),h=b[b.length-1],p=Math.min(...b),m=Math.max(...b),k=b.reduce((e,a)=>e+a,0)/b.length,f=h>u.threshold,[g,v]=function(){
    let e=useRef(null),[a,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(([e])=>{
        let a=e.contentRect;
        r({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),w=v.height,j=.94*Math.min(p,u.threshold),y=1.06*Math.max(m,u.threshold),N=useCallback(e=>e/59*Math.max(v.width-2,1)+1, [v.width]),z=useCallback(e=>w-4-(e-j)/(y-j||1)*(w-12), [w,y,j]),S=line().x((e,a)=>N(a)).y(e=>z(e)).curve(i.G)(b)??"",A=area().x((e,a)=>N(a)).y0(w).y1(e=>z(e)).curve(i.G)(b)??"",R=[{label:"Now",value:V(u,h)},{label:"Average",value:V(u,k)},{label:"Peak",value:V(u,m)},{label:"Floor",value:V(u,p)}];
  return (
    <div ref={e} className={L("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={L("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className={L("text-[17px]/[22px] font-extrabold","truncate")}>Live stream</h2>
                <span className={L("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",c?"text-neutral-900 dark:text-neutral-100":"text-neutral-900/62 dark:text-neutral-100/62")}>
                  {c&&<span className="flex h-lh shrink-0 items-center">
                    <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                  </span>}
                  {c?"Streaming":"Paused"}
                </span>
              </div>
              <p className={L(B,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>api-gateway</span>
                <span>eu-west-1</span>
                <span>1s resolution</span>
              </p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Metric" onKeyDown={U} className={L("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                {H.map(e=><button key={e.id} type="button" role="radio" aria-checked={e.id===a} tabIndex={e.id===a?0:-1} onClick={()=>r(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{e.label}</button>)}
              </div>
              <button type="button" onClick={()=>d(e=>!e)} className={L("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                <HugeiconsIcon icon={c?Icon_81520:Icon_48318} size={18} strokeWidth={2} aria-hidden="true" />
                {c?"Pause":"Resume"}
              </button>
            </div>
          </div>
          <div className={L(T,"flex shrink-0 grow flex-col p-4")}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-1">
                <p className="text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums">{V(u,h)}</p>
                <span className={I}>{u.unit}</span>
              </div>
              <p className={L($,f?"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":O,"inline-flex items-center gap-1.5")}>
                {f?<>
                  <HugeiconsIcon icon={Icon_27476} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                  <span className="sr-only">Over threshold.</span>
                </>:<svg aria-hidden="true" width={16} height={2} className="shrink-0 overflow-visible">
                  <line x1={0} x2={16} y1={1} y2={1} strokeWidth={1} strokeDasharray="6 4" className={F} />
                </svg>}
                {u.thresholdLabel}
              </p>
            </div>
            <div ref={g} role="img" aria-label={`${u.label} over the last 60 seconds, currently ${V(u,h)}${u.unit}`} className="relative mt-4 min-h-[120px] flex-1 sm:min-h-[220px]">
              {v.width>0&&v.height>0&&<svg width={v.width} height={w} className="absolute inset-0 overflow-visible">
                {[.25,.5,.75].map(e=><line key={e} x1={0} x2={v.width} y1={w*e} y2={w*e} className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} shapeRendering="crispEdges" />)}
                <line x1={0} x2={v.width} y1={z(u.threshold)} y2={z(u.threshold)} className={F} strokeWidth={1} strokeDasharray="6 4" shapeRendering="crispEdges" />
                <path d={A} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                <path d={S} fill="none" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <rect x={N(59)-4} y={z(h)-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />
              </svg>}
            </div>
            <div className={L(q,"mt-2 flex justify-between")}>
              <span>−60s</span>
              <span>−45s</span>
              <span>−30s</span>
              <span>−15s</span>
              <span>now</span>
            </div>
          </div>
          <div className={L(T,"@container p-0.75")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {R.map(e=>(
                <div key={e.label} className={L("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","ps-3 pe-3")}>
                            <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.value}
                              <span className={I}>{u.unit}</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
