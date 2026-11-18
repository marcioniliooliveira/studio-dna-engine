/**
 * React Bits Pro — Application UI (list-11)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, forEach, observe, sort, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  h = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  b = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  m = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  f = [{id:"nair",name:"Priya Nair",initials:"PN",team:"Tier 2 support",w:{r:172,rt:96,cs:4.9},wd:{r:14,rt:-12,cs:.2},m:{r:712,rt:108,cs:4.8},md:{r:40,rt:-18,cs:.1}},{id:"bello",name:"Marcus Bello",initials:"MB",team:"Escalations",w:{r:168,rt:132,cs:4.7},wd:{r:9,rt:8,cs:0},m:{r:690,rt:140,cs:4.7},md:{r:22,rt:10,cs:0}},{id:"sato",name:"Hana Sato",initials:"HS",team:"Tier 1 support",w:{r:151,rt:118,cs:4.8},wd:{r:-6,rt:-5,cs:.1},m:{r:640,rt:122,cs:4.8},md:{r:-18,rt:-8,cs:.1}},{id:"ramos",name:"Diego Ramos",initials:"DR",team:"Billing",w:{r:149,rt:205,cs:4.5},wd:{r:21,rt:-22,cs:-.1},m:{r:705,rt:190,cs:4.6},md:{r:64,rt:-30,cs:-.1}},{id:"okoye",name:"Amara Okoye",initials:"AO",team:"Onboarding",w:{r:138,rt:176,cs:4.6},wd:{r:-3,rt:6,cs:.2},m:{r:588,rt:168,cs:4.5},md:{r:-11,rt:9,cs:.1}},{id:"fischer",name:"Lena Fischer",initials:"LF",team:"Tier 2 support",w:{r:131,rt:149,cs:4.7},wd:{r:12,rt:-9,cs:.1},m:{r:559,rt:155,cs:4.7},md:{r:33,rt:-12,cs:.1}},{id:"whitfield",name:"Sam Whitfield",initials:"SW",team:"Tier 1 support",w:{r:120,rt:221,cs:4.4},wd:{r:-8,rt:14,cs:-.2},m:{r:512,rt:210,cs:4.4},md:{r:-25,rt:20,cs:-.2}},{id:"tanaka",name:"Yuki Tanaka",initials:"YT",team:"Escalations",w:{r:109,rt:163,cs:4.6},wd:{r:4,rt:-3,cs:.1},m:{r:470,rt:172,cs:4.5},md:{r:12,rt:-6,cs:0}},{id:"haddad",name:"Omar Haddad",initials:"OH",team:"Billing",w:{r:96,rt:258,cs:4.3},wd:{r:18,rt:-18,cs:.3},m:{r:604,rt:226,cs:4.4},md:{r:48,rt:-24,cs:.2}}],
  k = [{id:"resolved",label:"Resolved"},{id:"response",label:"Response time"},{id:"csat",label:"Satisfaction"}],
  v = [{id:"w",label:"This week"},{id:"m",label:"This month"}],
  g = {resolved:"r",response:"rt",csat:"cs"},
  w = {resolved:false,response:true,csat:false},
  _ = e=>Math.round(10*e)/10,
  y = e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,"0")}`,
  j = (e,t)=>"w"===t?e.w:e.m,
  N = (e,t)=>"w"===t?e.wd:e.md,
  A = "grid-cols-[28px_36px_minmax(0,1fr)_72px] sm:grid-cols-[28px_60px_minmax(0,1fr)_96px_104px_76px]";

function z({children:e,right:t,className:r}){
  return <span className={d("text-[12px]/[16px] font-normal tabular-nums",x,t&&"text-right",r)}>{e}</span>;
}

function S(e,t,r){
  let a=g[t],n=f.map(t=>{
    let n=j(t,e)[a],i=r?_(n-N(t,e)[a]):n;
    return {id:t.id,val:i};
  });
  sort((e,r)=>w[t]?e.val-r.val:r.val-e.val);
  let i={};
  return forEach((e,t)=>i[e.id]=t+1),i;
}

let C = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function R(){
  let[e,t]=useState("resolved"),[r,w]=useState("w"),[R,M]=useState(null),{ref:T,edges:D,onScroll:O}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),P=useMemo(()=>S(r,e,false), [r,e]),E=useMemo(()=>S(r,e,true), [r,e]),W=useMemo(()=>Math.max(...f.map(e=>j(e,r).r)), [r]),H=useMemo(()=>{
    let e=f.reduce((e,t)=>e+j(t,r).r,0);
    return {resolved:e,rt:f.reduce((e,t)=>e+j(t,r).rt,0)/f.length,cs:_(f.reduce((e,t)=>e+j(t,r).cs,0)/f.length)};
  }, [r]);
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[640px] w-full flex-col overflow-hidden p-6 sm:p-8")}>
        <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]",c)}>Support leaderboard</h2>
              <p className={d(p,x,"mt-0.5")}>Ranked by conversations resolved</p>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <div role="radiogroup" aria-label="Sort by" onKeyDown={C} className={d(b,"h-8")}>
                {k.map(r=>{
                  let n=r.id===e;
                  return <button key={r.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(r.id)} className={m}>{r.label}</button>;
                })}
              </div>
              <div role="radiogroup" aria-label="Period" onKeyDown={C} className={d(b,"h-8")}>
                {v.map(e=>{
                  let t=e.id===r;
                  return <button key={e.id} type="button" role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>w(e.id)} className={m}>{e.label}</button>;
                })}
              </div>
            </div>
          </div>
          <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","min-h-0 flex-1")}>
            <div className={d(h,A,"grid shrink-0 items-center gap-3 px-4 py-2")}>
              <z>#</z>
              <z>Trend</z>
              <z>Agent</z>
              <z right className={"resolved"!==e&&"max-sm:hidden"}>Resolved</z>
              <z right className={"response"!==e&&"max-sm:hidden"}>Median FRT</z>
              <z right className={"csat"!==e&&"max-sm:hidden"}>CSAT</z>
            </div>
            <div className="relative min-h-0 flex-1">
              <div ref={T} onScroll={O} style={{touchAction:"pan-y"}} className="h-full overflow-y-auto">
                <div className="relative" style={{height:64*f.length}}>
                  {f.map(t=>{
                    let n=P[t.id],b=E[t.id]-n,m=j(t,r),k=N(t,r),v=n<=3,w=Math.round(m.r/W*100),z=R===t.id,S=k[g[e]],C="resolved"===e?`${S>0?"+":"−"}${Math.abs(S)} resolved`:"response"===e?`${S>0?"+":"−"}${Math.abs(S)}s response`:`${S>0?"+":"−"}${Math.abs(_(S))} CSAT`;
                    return (
                      <div key={t.id} style={{transform:`translateY(${(n-1)*64}px)`,zIndex:z?10:1}} className="absolute inset-x-0 top-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none">
                                        <div onPointerEnter={()=>M(t.id)} onPointerLeave={()=>M(e=>e===t.id?null:e)} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",n<f.length&&h,"h-16 overflow-hidden")}>
                                          <div aria-hidden="true" className={d("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","pointer-events-none absolute inset-y-1.5 left-1.5")} style={{width:`max(0px, calc(${w}% - 12px))`}} />
                                          <div className={d(A,"relative z-10 grid w-full items-center gap-3 px-4")}>
                                            <span className={d(p,v?c:x,"tabular-nums")}>{n}</span>
                                            <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                                              {b>0?<>
                                                <HugeiconsIcon icon={Icon_40972} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                <span className="sr-only">Up</span>
                                                {b}
                                              </>:b<0?<>
                                                <HugeiconsIcon icon={Icon_54345} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                <span className="sr-only">Down</span>
                                                {Math.abs(b)}
                                              </>:<>
                                                <HugeiconsIcon icon={Icon_99199} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                <span className="sr-only">No change</span>
                                              </>}
                                            </span>
                                            <div className="flex min-w-0 items-center gap-3">
                                              <span aria-hidden="true" className={d("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                                <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{t.initials}</span>
                                              </span>
                                              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{t.name}</span></p>
                                                <p data-description className={d(p,x,"flex items-center gap-3 truncate")}>
                                                  <span className="truncate">{t.team}</span>
                                                  <span className={d("transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","shrink-0 tabular-nums max-sm:hidden",z?"opacity-100":"opacity-0")}>
                                                    {C}
                                                    {" vs last"}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                            <span className={d(p,c,"resolved"!==e&&"max-sm:hidden","text-right tabular-nums")}>{m.r}</span>
                                            <span className={d(p,u,"response"!==e&&"max-sm:hidden","text-right tabular-nums")}>{y(m.rt)}</span>
                                            <span className={d(p,u,"csat"!==e&&"max-sm:hidden","text-right tabular-nums")}>{m.cs.toFixed(1)}</span>
                                          </div>
                                        </div>
                                      </div>
                    );
                  })}
                </div>
              </div>
              <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",D.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",D.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={d("border-t border-neutral-900/8 dark:border-neutral-100/8",A,"grid shrink-0 items-center gap-3 px-4 py-2.5")}>
              <span className={d("text-[12px]/[16px] font-[450] tabular-nums",c,"col-span-3 flex gap-3")}>
                <span>Team totals</span>
                <span>
                  {f.length}
                  {" agents"}
                </span>
              </span>
              <span className={d(p,c,"resolved"!==e&&"max-sm:hidden","text-right tabular-nums")}>{H.resolved.toLocaleString("en-US")}</span>
              <span className={d(p,x,"response"!==e&&"max-sm:hidden","text-right tabular-nums")}>{y(H.rt)}</span>
              <span className={d(p,x,"csat"!==e&&"max-sm:hidden","text-right tabular-nums")}>{H.cs.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
  );
}


export default R;
