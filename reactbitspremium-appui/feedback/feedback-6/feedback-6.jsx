/**
 * React Bits Pro — Application UI (feedback-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "bg-neutral-900/9 dark:bg-neutral-100/9",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "flex min-w-0 flex-col gap-2 px-4 py-3",
  h = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  _ = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  m = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",
  k = "text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  v = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  g = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  w = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  y = d(x,u),
  j = d(x,b),
  N = d("text-[12px]/[16px] font-normal tabular-nums",b),
  S = d("text-neutral-900 dark:text-neutral-100","bg-current"),
  z = d("text-neutral-900/66 dark:text-neutral-100/66","bg-current"),
  A = ["30 days","90 days","12 months"],
  W = {"30 days":{responses:412,csat:"4.4",delta:.2,split:[64,24,12]},"90 days":{responses:1187,csat:"4.2",delta:-.1,split:[58,26,16]},"12 months":{responses:4630,csat:"4.1",delta:.4,split:[55,27,18]}},
  C = ["Positive","Neutral","Negative"],
  I = [S,z,c],
  q = [{name:"Export reliability",count:84,trend:22,share:100},{name:"Pricing and plans",count:61,trend:-8,share:73},{name:"Onboarding clarity",count:47,trend:4,share:56},{name:"Filter persistence",count:39,trend:31,share:46},{name:"Mobile layout",count:22,trend:0,share:26},{name:"Webhook retries",count:18,trend:12,share:21},{name:"Search relevance",count:14,trend:-3,share:17},{name:"Audit log gaps",count:9,trend:6,share:11}],
  R = [18,24,21,30,27,35,31,29,38,34,41,37,44,39,47,52,45,50,58,54];

function M(){
  let[e,r]=useState("30 days"),a=W[e],b=useMemo(()=>Math.max(...R), []),{ref:x,edges:z,onScroll:M}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Feedback insights</h2>
            <p className={d(j,"mt-0.5")}>Every survey, widget and email reply, grouped by theme.</p>
          </div>
          <div role="radiogroup" aria-label="Date range" className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
            {A.map(a=>{
              let n=e===a;
              return <button key={a} type="button" role="radio" aria-checked={n} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>;
            })}
          </div>
        </div>
        <div className={d("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-3")}>
          <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
            <div className={p}>
              <p className={h}>Responses</p>
              <p className={_}>{a.responses.toLocaleString()}</p>
              <p className={k}>
                {Math.round(a.responses/9800*100)}
                % response rate from 9,800 prompts
              </p>
            </div>
            <div className={p}>
              <p className={h}>Average rating</p>
              <div className="flex items-baseline gap-1.5">
                <p className={_}>{a.csat}</p>
                <span className={m}>
                  <HugeiconsIcon icon={a.delta>0?Icon_1497:a.delta<0?Icon_37502:Icon_99199} size={12} strokeWidth={1.8} aria-hidden />
                  <span className="sr-only">{a.delta>0?"Up":a.delta<0?"Down":"No change"}</span>
                  {Math.abs(a.delta).toFixed(1)}
                </span>
              </div>
              <p className={k}>Out of 5, against previous period</p>
            </div>
            <div className={p}>
              <p className={h}>Sentiment</p>
              <div className="flex h-2 w-full overflow-hidden" role="img" aria-label={C.map((e,r)=>`${e} ${a.split[r]} percent`).join(", ")}>
                {a.split.map((e,r)=><span key={C[r]} className={I[r]} style={{width:`${e}%`}} />)}
              </div>
              <ul className="flex items-center justify-between gap-2">
                {C.map((e,r)=>(
                  <li key={e} className="flex items-center gap-1.5">
                                <span aria-hidden className={d("inline-block size-2 shrink-0",I[r],"size-[6px]")} />
                                <span className={N}>{e}</span>
                                <span className="text-[12px]/[16px] font-[450] tabular-nums">
                                  {a.split[r]}
                                  %
                                </span>
                              </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_320px]">
          <div className={d(f,"min-h-0")}>
            <div className={d(v,"justify-between gap-3")}>
              <p className={w}>Top themes</p>
              <span className={N}>Mentions this period</span>
            </div>
            <div className={d(g,"relative min-h-0 flex-1")}>
              <ul ref={x} onScroll={M} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
                {q.map(e=>(
                  <li key={e.name}>
                                <div className="flex items-center justify-between gap-3">
                                  <span className={d(y,"truncate")}>{e.name}</span>
                                  <span className="flex shrink-0 items-center gap-2">
                                    <span className={d("text-[14px]/[16px] font-[450]","tabular-nums")}>{e.count}</span>
                                    <span className={d(m,"w-11 justify-end")}>
                                      <HugeiconsIcon icon={e.trend>0?Icon_1497:e.trend<0?Icon_37502:Icon_99199} size={12} strokeWidth={1.8} aria-hidden />
                                      <span className="sr-only">{e.trend>0?"Up":e.trend<0?"Down":"No change"}</span>
                                      {Math.abs(e.trend)}
                                      %
                                    </span>
                                  </span>
                                </div>
                                <div className={d("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-1.5")}>
                                  <span className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${e.share}%`}} />
                                </div>
                              </li>
                ))}
              </ul>
              <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",z.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",z.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
          <div className={d(f,"min-h-0")}>
            <div className={v}><p className={w}>Weekly volume</p></div>
            <div className={d(g,"min-h-0 flex-1 p-3")}>
              <p className={N}>Responses per day, last 20 days</p>
              <div className="mt-4 flex min-h-[96px] flex-1 items-end gap-[3px]" role="img" aria-label={`Daily responses rising from ${R[0]} to ${R[R.length-1]}`}>
                {R.map((e,r)=><span key={r} className={d("flex-1 rounded-t-[2px]",r===R.length-1?S:c)} style={{height:`${Math.round(e/b*100)}%`}} />)}
              </div>
              <div className={d(N,"mt-3 flex items-center justify-between")}>
                <span>20 days ago</span>
                <span className={u}>
                  {R[R.length-1]}
                  {" today"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default M;
