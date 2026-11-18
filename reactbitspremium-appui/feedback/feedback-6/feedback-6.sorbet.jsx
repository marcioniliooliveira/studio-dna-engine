/**
 * React Bits Pro — Application UI (feedback-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let eW = (...e)=>e.filter(Boolean).join(" ");

let ez = "bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]";

let eM = "text-neutral-900/78 dark:text-neutral-100/78";

let eI = "text-neutral-900/62 dark:text-neutral-100/62";

let eq = "text-[14px]/[20px] font-medium";

let eR = "flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4";

let eE = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let eH = "flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100";

let eO = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78";

let eF = "text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62";

let eP = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let eD = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let eT = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let eB = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let e$ = eW(eq,eM);

let eU = eW(eq,eI);

let eV = eW("text-[13px]/[16px] font-semibold tabular-nums",eI);

let eZ = eW("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","bg-current");

let eG = eW("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","bg-current");

let eY = ["30 days","90 days","12 months"];

let eK = {"30 days":{responses:412,csat:"4.4",delta:.2,split:[64,24,12]},"90 days":{responses:1187,csat:"4.2",delta:-.1,split:[58,26,16]},"12 months":{responses:4630,csat:"4.1",delta:.4,split:[55,27,18]}};

let eJ = ["Positive","Neutral","Negative"];

let eQ = [eZ,eG,ez];

let eX = [{name:"Export reliability",count:84,trend:22,share:100},{name:"Pricing and plans",count:61,trend:-8,share:73},{name:"Onboarding clarity",count:47,trend:4,share:56},{name:"Filter persistence",count:39,trend:31,share:46},{name:"Mobile layout",count:22,trend:0,share:26},{name:"Webhook retries",count:18,trend:12,share:21},{name:"Search relevance",count:14,trend:-3,share:17},{name:"Audit log gaps",count:9,trend:6,share:11}];

let e0 = [18,24,21,30,27,35,31,29,38,34,41,37,44,39,47,52,45,50,58,54];


export default function feedback_6__Sorbet__Component(){
  let[e,r]=useState("30 days"),a=eK[e],l=useMemo(()=>Math.max(...e0), []),{ref:i,edges:s,onScroll:c}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:o,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<o-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let o=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={eW("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[17px]/[22px] font-extrabold">Feedback insights</h2>
            <p className={eW(eU,"mt-0.5")}>Every survey, widget and email reply, grouped by theme.</p>
          </div>
          <div role="radiogroup" aria-label="Date range" className={eW("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10")}>
            {eY.map(a=>{
              let o=e===a;
              return <button key={a} type="button" role="radio" aria-checked={o} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>;
            })}
          </div>
        </div>
        <div className={eW("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-3")}>
          <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
            <div className={eR}>
              <p className={eE}>Responses</p>
              <p className={eH}>{a.responses.toLocaleString()}</p>
              <p className={eF}>
                {Math.round(a.responses/9800*100)}
                % response rate from 9,800 prompts
              </p>
            </div>
            <div className={eR}>
              <p className={eE}>Average rating</p>
              <div className="flex items-baseline gap-1.5">
                <p className={eH}>{a.csat}</p>
                <span className={eO}>
                  <HugeiconsIcon icon={a.delta>0?Icon_1497:a.delta<0?Icon_37502:Icon_99199} size={14} strokeWidth={2} aria-hidden />
                  <span className="sr-only">{a.delta>0?"Up":a.delta<0?"Down":"No change"}</span>
                  {Math.abs(a.delta).toFixed(1)}
                </span>
              </div>
              <p className={eF}>Out of 5, against previous period</p>
            </div>
            <div className={eR}>
              <p className={eE}>Sentiment</p>
              <div className="flex h-2 w-full overflow-hidden" role="img" aria-label={eJ.map((e,r)=>`${e} ${a.split[r]} percent`).join(", ")}>
                {a.split.map((e,r)=><span key={eJ[r]} className={eQ[r]} style={{width:`${e}%`}} />)}
              </div>
              <ul className="flex items-center justify-between gap-2">
                {eJ.map((e,r)=>(
                  <li key={e} className="flex items-center gap-1.5">
                                <span aria-hidden className={eW("inline-block size-2.5 shrink-0 rounded-full",eQ[r],"size-[6px]")} />
                                <span className={eV}>{e}</span>
                                <span className="text-[13px]/[16px] font-bold tabular-nums">
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
          <div className={eW(eP,"min-h-0")}>
            <div className={eW(eD,"justify-between gap-3")}>
              <p className={eB}>Top themes</p>
              <span className={eV}>Mentions this period</span>
            </div>
            <div className={eW(eT,"relative min-h-0 flex-1")}>
              <ul ref={i} onScroll={c} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
                {eX.map(e=>(
                  <li key={e.name}>
                                <div className="flex items-center justify-between gap-3">
                                  <span className={eW(e$,"truncate")}>{e.name}</span>
                                  <span className="flex shrink-0 items-center gap-2">
                                    <span className={eW("text-[15px]/[20px] font-bold","tabular-nums")}>{e.count}</span>
                                    <span className={eW(eO,"w-11 justify-end")}>
                                      <HugeiconsIcon icon={e.trend>0?Icon_1497:e.trend<0?Icon_37502:Icon_99199} size={14} strokeWidth={2} aria-hidden />
                                      <span className="sr-only">{e.trend>0?"Up":e.trend<0?"Down":"No change"}</span>
                                      {Math.abs(e.trend)}
                                      %
                                    </span>
                                  </span>
                                </div>
                                <div className={eW("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-1.5")}>
                                  <span className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${e.share}%`}} />
                                </div>
                              </li>
                ))}
              </ul>
              <div aria-hidden="true" className={eW("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eW("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
          <div className={eW(eP,"min-h-0")}>
            <div className={eD}><p className={eB}>Weekly volume</p></div>
            <div className={eW(eT,"min-h-0 flex-1 p-3")}>
              <p className={eV}>Responses per day, last 20 days</p>
              <div className="mt-4 flex min-h-[96px] flex-1 items-end gap-[3px]" role="img" aria-label={`Daily responses rising from ${e0[0]} to ${e0[e0.length-1]}`}>
                {e0.map((e,r)=><span key={r} className={eW("flex-1 rounded-t-[2px]",r===e0.length-1?eZ:ez)} style={{height:`${Math.round(e/l*100)}%`}} />)}
              </div>
              <div className={eW(eV,"mt-3 flex items-center justify-between")}>
                <span>20 days ago</span>
                <span className={eM}>
                  {e0[e0.length-1]}
                  {" today"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
