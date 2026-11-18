/**
 * React Bits Pro — Application UI (monitoring-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let C = {danger:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",resolved:"text-neutral-900/78 dark:text-neutral-100/78"};

let E = (e,a)=>"req"===e?`${(a/1e3).toFixed(1)}k`:"err"===e?`${(a/100).toFixed(2)}%`:"p95"===e?`${a}ms`:`${a}%`;

function M({data:e,ticks:a,active:r,onActiveChange:o}){
  let[c,d]=function(){
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
  }(),_=d.height,x=Math.min(...e),b=Math.max(...e),h=.25*(b-x||1),p=useCallback(a=>a/(e.length-1)*Math.max(d.width-2,1)+1, [e.length,d.width]),m=useCallback(e=>_-4-(e-x+h)/(b-x+2*h)*(_-12), [_,b,x,h]),k=line().x((e,a)=>p(a)).y(e=>m(e)).curve(i.G)(e)??"",f=area().x((e,a)=>p(a)).y0(_).y1(e=>m(e)).curve(i.G)(e)??"";
  return (
    <div className="flex min-h-0 flex-1 flex-col">
        <div ref={c} role="img" aria-label={`Request throughput, ${e.length} points`} tabIndex={0} onPointerMove={a=>(a=>{
          let r=c.current;
          if(!r)return;
          let t=r.getBoundingClientRect(),n=t.width/(e.length-1);
          o(w(Math.round((a-t.left)/n),0,e.length-1))
        })(a.clientX)} onPointerLeave={()=>o(null)} onBlur={()=>o(null)} onKeyDown={a=>{
          ("ArrowLeft"===a.key||"ArrowRight"===a.key)&&(a.preventDefault(),o(w((r??e.length-1)+("ArrowLeft"===a.key?-1:1),0,e.length-1))),"Escape"===a.key&&o(null)
        }} style={{touchAction:"pan-y"}} className={u("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative min-h-[180px] flex-1 cursor-crosshair")}>
          {d.width>0&&d.height>0&&<svg width={d.width} height={_} className="absolute inset-0 overflow-visible">
            {[.25,.5,.75].map(e=><line key={e} x1={0} x2={d.width} y1={_*e} y2={_*e} className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} shapeRendering="crispEdges" />)}
            <path d={f} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
            <path d={k} fill="none" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {null!==r&&<>
              <line x1={p(r)} x2={p(r)} y1={0} y2={_} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />
              <rect x={p(r)-4} y={m(e[r])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />
            </>}
          </svg>}
        </div>
        <div className={u(v,"mt-2 flex justify-between")}>{a.map(e=><span key={e}>{e}</span>)}</div>
      </div>
  );
}


export default function monitoring_1__Sorbet__Component(){
  let[e,a]=useState("24h"),[r,l]=useState(null),{ref:i,edges:s,onScroll:h}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),v=useMemo(()=>A.map((a,r)=>({...a,values:j(1.4+2.3*r,a.base,a.drift,N[e])})), [e]),w=useMemo(()=>j(3.7,1263,.124,N[e]), [e]),D=w.reduce((e,a)=>e+a,0);
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[760px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","flex min-h-0 flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className={u("text-[17px]/[22px] font-extrabold","truncate")}>Platform health</h2>
                <span className={u("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900 dark:text-neutral-100")}>
                  <span className="flex h-lh shrink-0 items-center">
                    <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                  </span>
                  Live
                </span>
              </div>
              <p className={u(g,"mt-0.5 truncate")}>Traffic, errors and saturation across every production service.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div role="radiogroup" aria-label="Time range" className={u("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
                {y.map(r=>(
                  <button key={r} type="button" role="radio" aria-checked={r===e} onClick={()=>{
                                a(r),l(null)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r}</button>
                ))}
              </div>
              <button type="button" aria-label="Refresh" className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
                <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className={u(k,"@container p-0.75")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {v.map(a=>{
                let r=a.values[0],n=a.values[a.values.length-1],l=(n-r)/r*100,i=l>=0;
                return (
                  <div key={a.id} className={u("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","ps-3 pe-3")}>
                                <div className="flex items-start justify-between gap-2">
                                  <span className={u("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","min-w-0 truncate")}>{a.label}</span>
                                  <button type="button" aria-label={`Options for ${a.label}`} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]","-mt-1 -mr-1")}>
                                    <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
                                  </button>
                                </div>
                                <div className={f}>
                                  <p>{E(a.id,n)}</p>
                                  <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                                    <HugeiconsIcon icon={i?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" />
                                    <span className="sr-only">{i?"Up":"Down"}</span>
                                    {Math.abs(l).toFixed(1)}
                                    %
                                  </span>
                                </div>
                                <p className={u("text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62","text-pretty")}>
                                  {S[e]}
                                  {": "}
                                  {E(a.id,r)}
                                </p>
                              </div>
                );
              })}
            </div>
          </div>
          <div className={u(k,"min-h-0 flex-1")}>
            <div className={u("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8","grid min-h-0 flex-1 gap-px lg:grid-cols-[1fr_360px]")}>
              <div className={u(b,"flex min-h-[280px] flex-col p-4 lg:min-h-0")}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className={p}>Request throughput</h3>
                    <p className={u(f,"mt-1.5")}>{(null===r?D:w[r]).toLocaleString("en-US")}</p>
                  </div>
                  <p className={u(g,"shrink-0")}>{null===r?`total, last ${e}`:`point ${r+1} of ${w.length}`}</p>
                </div>
                <div className="mt-3 flex min-h-0 flex-1 flex-col"><M data={w} ticks={z[e]} active={r} onActiveChange={l} /></div>
              </div>
              <div className={u(b,"flex min-h-0 flex-col")}>
                <div className="px-4 py-3"><h3 className={p}>Incident activity</h3></div>
                <div className="relative min-h-0 flex-1">
                  <ul ref={i} onScroll={h} className={u("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","h-full overflow-y-auto pb-2")}>
                    {R.map(e=>(
                      <li key={e.id} className={u("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-4")}>
                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <div className={u("flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                            <span>{e.title}</span>
                                            <span className={u("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",C[e.tone])}>{e.severity}</span>
                                          </div>
                                          <p className={u(g,"mt-1 flex flex-wrap gap-x-3")}>
                                            <span>{e.service}</span>
                                            <span>{e.at}</span>
                                          </p>
                                          <p className={u(m,"text-neutral-900/78 dark:text-neutral-100/78","mt-1.5")}>{e.body}</p>
                                        </div>
                                      </li>
                    ))}
                  </ul>
                  <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
