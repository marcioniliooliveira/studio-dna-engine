/**
 * React Bits Pro — Application UI (monitoring-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  p = "bg-white dark:bg-neutral-950",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[14px]/[16px] font-[450]",
  f = "text-[13px]/[18px] font-normal",
  g = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  k = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  v = h(f,b),
  w = h("text-[12px]/[16px] font-normal tabular-nums",b),
  _ = (e,t,r)=>Math.min(r,Math.max(t,e)),
  j = (e,t,r,a)=>Array.from({length:a},(n,l)=>Math.round(t*(1+l/(a-1)*r+.09*(.5*Math.sin(.7*l+e)+.34*Math.sin(.23*l+2.1*e))))),
  y = ["1h","24h","7d"],
  N = {"1h":12,"24h":24,"7d":28},
  S = {"1h":["09:00","09:15","09:30","09:45","10:00"],"24h":["04:00","08:00","12:00","16:00","20:00"],"7d":["Mon","Wed","Thu","Sat","Sun"]},
  z = {"1h":"vs previous hour","24h":"vs previous day","7d":"vs previous week"},
  A = [{id:"req",label:"Requests",base:1284e3,drift:.151,unit:""},{id:"err",label:"Error rate",base:42,drift:-.02,unit:"%"},{id:"p95",label:"p95 latency",base:318,drift:.004,unit:"ms"},{id:"sat",label:"Saturation",base:61,drift:.037,unit:"%"}],
  R = [{id:"i1",title:"Checkout API timeouts",severity:"Critical",tone:"danger",service:"payments-edge",at:"09:12",body:"The charge endpoint exceeded its 8s budget on six consecutive calls, holding four orders at authorisation."},{id:"i2",title:"Retry storm contained",severity:"Major",tone:"warning",service:"invoice-worker",at:"08:47",body:"Backoff was applied after a vendor 503 spike, capping retries and draining the queued backlog."},{id:"i3",title:"Search index degraded",severity:"Minor",tone:"resolved",service:"search-api",at:"08:05",body:"Read latency on the embeddings index rose to 1.9s, slowing lookups for eleven minutes before recovering."}],
  C = {danger:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",warning:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",resolved:"text-neutral-900/80 dark:text-neutral-100/80"},
  E = (e,t)=>"req"===e?`${(t/1e3).toFixed(1)}k`:"err"===e?`${(t/100).toFixed(2)}%`:"p95"===e?`${t}ms`:`${t}%`;

function M({data:e,ticks:t,active:r,onActiveChange:o}){
  let[d,c]=function(){
    let e=useRef(null),[t,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(([e])=>{
        let t=e.contentRect;
        r({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),u=c.height,x=Math.min(...e),p=Math.max(...e),b=.25*(p-x||1),m=useCallback(t=>t/(e.length-1)*Math.max(c.width-2,1)+1, [e.length,c.width]),f=useCallback(e=>u-4-(e-x+b)/(p-x+2*b)*(u-12), [u,p,x,b]),g=line().x((e,t)=>m(t)).y(e=>f(e)).curve(s.G)(e)??"",k=area().x((e,t)=>m(t)).y0(u).y1(e=>f(e)).curve(s.G)(e)??"";
  return (
    <div className="flex min-h-0 flex-1 flex-col">
        <div ref={d} role="img" aria-label={`Request throughput, ${e.length} points`} tabIndex={0} onPointerMove={t=>(t=>{
          let r=d.current;
          if(!r)return;
          let a=r.getBoundingClientRect(),n=a.width/(e.length-1);
          o(_(Math.round((t-a.left)/n),0,e.length-1))
        })(t.clientX)} onPointerLeave={()=>o(null)} onBlur={()=>o(null)} onKeyDown={t=>{
          ("ArrowLeft"===t.key||"ArrowRight"===t.key)&&(t.preventDefault(),o(_((r??e.length-1)+("ArrowLeft"===t.key?-1:1),0,e.length-1))),"Escape"===t.key&&o(null)
        }} style={{touchAction:"pan-y"}} className={h("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","relative min-h-[180px] flex-1 cursor-crosshair")}>
          {c.width>0&&c.height>0&&<svg width={c.width} height={u} className="absolute inset-0 overflow-visible">
            {[.25,.5,.75].map(e=><line key={e} x1={0} x2={c.width} y1={u*e} y2={u*e} className="stroke-neutral-900/5 dark:stroke-neutral-100/5" strokeWidth={1} shapeRendering="crispEdges" />)}
            <path d={k} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
            <path d={g} fill="none" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {null!==r&&<>
              <line x1={m(r)} x2={m(r)} y1={0} y2={u} className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={1} shapeRendering="crispEdges" />
              <rect x={m(r)-4} y={f(e[r])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />
            </>}
          </svg>}
        </div>
        <div className={h(w,"mt-2 flex justify-between")}>{t.map(e=><span key={e}>{e}</span>)}</div>
      </div>
  );
}

function D(){
  let[e,t]=useState("24h"),[r,l]=useState(null),{ref:s,edges:i,onScroll:b}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),w=useMemo(()=>A.map((t,r)=>({...t,values:j(1.4+2.3*r,t.base,t.drift,N[e])})), [e]),_=useMemo(()=>j(3.7,1263,.124,N[e]), [e]),D=_.reduce((e,t)=>e+t,0);
  return (
    <div className={h("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[760px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","flex min-h-0 flex-1 flex-col gap-1")}>
          <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Platform health</h2>
                <span className={h("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900 dark:text-neutral-100")}>
                  <span className="flex h-lh shrink-0 items-center">
                    <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                  </span>
                  Live
                </span>
              </div>
              <p className={h(v,"mt-0.5 truncate")}>Traffic, errors and saturation across every production service.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div role="radiogroup" aria-label="Time range" className={h("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
                {y.map(r=>(
                  <button key={r} type="button" role="radio" aria-checked={r===e} onClick={()=>{
                                t(r),l(null)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r}</button>
                ))}
              </div>
              <button type="button" aria-label="Refresh" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
                <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className={h(g,"@container p-0.75")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {w.map(t=>{
                let r=t.values[0],n=t.values[t.values.length-1],l=(n-r)/r*100,s=l>=0;
                return (
                  <div key={t.id} className={h("flex min-w-0 flex-col gap-2 px-4 py-3","ps-3 pe-3")}>
                                <div className="flex items-start justify-between gap-2">
                                  <span className={h("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","min-w-0 truncate")}>{t.label}</span>
                                  <button type="button" aria-label={`Options for ${t.label}`} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]","-mt-1 -mr-1")}>
                                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                  </button>
                                </div>
                                <div className={k}>
                                  <p>{E(t.id,n)}</p>
                                  <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                                    <HugeiconsIcon icon={s?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" />
                                    <span className="sr-only">{s?"Up":"Down"}</span>
                                    {Math.abs(l).toFixed(1)}
                                    %
                                  </span>
                                </div>
                                <p className={h("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","text-pretty")}>
                                  {z[e]}
                                  {": "}
                                  {E(t.id,r)}
                                </p>
                              </div>
                );
              })}
            </div>
          </div>
          <div className={h(g,"min-h-0 flex-1")}>
            <div className={h("bg-neutral-900/8 dark:bg-neutral-100/8","grid min-h-0 flex-1 gap-px lg:grid-cols-[1fr_360px]")}>
              <div className={h(p,"flex min-h-[280px] flex-col p-4 lg:min-h-0")}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className={m}>Request throughput</h3>
                    <p className={h(k,"mt-1.5")}>{(null===r?D:_[r]).toLocaleString("en-US")}</p>
                  </div>
                  <p className={h(v,"shrink-0")}>{null===r?`total, last ${e}`:`point ${r+1} of ${_.length}`}</p>
                </div>
                <div className="mt-3 flex min-h-0 flex-1 flex-col"><M data={_} ticks={S[e]} active={r} onActiveChange={l} /></div>
              </div>
              <div className={h(p,"flex min-h-0 flex-col")}>
                <div className="px-4 py-3"><h3 className={m}>Incident activity</h3></div>
                <div className="relative min-h-0 flex-1">
                  <ul ref={s} onScroll={b} className={h("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto pb-2")}>
                    {R.map(e=>(
                      <li key={e.id} className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-4")}>
                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <div className={h("flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                            <span>{e.title}</span>
                                            <span className={h("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",C[e.tone])}>{e.severity}</span>
                                          </div>
                                          <p className={h(v,"mt-1 flex flex-wrap gap-x-3")}>
                                            <span>{e.service}</span>
                                            <span>{e.at}</span>
                                          </p>
                                          <p className={h(f,"text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>{e.body}</p>
                                        </div>
                                      </li>
                    ))}
                  </ul>
                  <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default D;
