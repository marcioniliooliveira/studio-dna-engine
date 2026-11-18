/**
 * React Bits Pro — Application UI (analytics-15 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { getBoundingClientRect, useMemo, useRef, useState } from 'react';

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let k = "text-neutral-900/62 dark:text-neutral-100/62";

let tH = (...e)=>e.filter(Boolean).join(" ");

let tI = "text-neutral-900 dark:text-neutral-100";

let tK = "text-neutral-900/62 dark:text-neutral-100/62";

let tQ = "text-[14px]/[20px] font-medium";

let tJ = "text-[15px]/[20px] font-bold";

let tV = "text-[13px]/[16px] font-semibold tabular-nums";

let tG = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let tX = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let tY = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78";

let tZ = "block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]";

let t0 = (e,a,t)=>Math.min(t,Math.max(a,e));

let t1 = e=>`$${Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}`;

let t2 = [{name:"Priya Nandakumar",quota:42e4,actual:487e3},{name:"Marcus Bell",quota:38e4,actual:312e3},{name:"Sofia Alvarez",quota:45e4,actual:441e3},{name:"Tom\xe1s Guerrero",quota:4e5,actual:268e3},{name:"Wei Chen",quota:36e4,actual:402e3},{name:"Amelia Whitfield-Osei",quota:5e5,actual:475e3}];

let t5 = [{to:70,cls:"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]"},{to:90,cls:"bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]"},{to:125,cls:null}];

let t6 = ["By attainment","By quota","Alphabetical"];

let t4 = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=t.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?t.length-1:(r+a+t.length)%t.length;
  t[l].focus(),t[l].click()
};


export default function analytics_15__Sorbet__Component(){
  let[e,a]=useState("By attainment"),[t,n]=useState(null),[s,i]=useState({x:0,y:0,rep:0}),o=useRef(null),c=useRef(null),d=useRef(null),x=useMemo(()=>t2.map((e,a)=>({...e,id:a,pct:e.actual/e.quota*100,delta:e.actual-e.quota})), []),_=useMemo(()=>{
    let a=[...x].sort((a,t)=>"By attainment"===e?t.pct-a.pct:"By quota"===e?t.quota-a.quota:a.name.localeCompare(t.name)),t=new Map;
    return a.forEach((e,a)=>t.set(e.id,a)),t;
  }, [x,e]),u=x.reduce((e,a)=>e+a.actual,0),h=x.reduce((e,a)=>e+a.quota,0),p=u/h*100,b=64*x.length-0,m=(e,a,t)=>{
    let r=c.current,l=o.current;
    if(!r||!l)return;
    let s=r.getBoundingClientRect(),x=getBoundingClientRect(),_=(d.current?.offsetWidth??144)/2,u=d.current?.offsetHeight??76,h=e-s.left,p=a-s.top;
    n(t),i({x:s.left-x.left+t0(h,_,Math.max(s.width-_,_)),y:s.top-x.top+(p-u-12>=0?p-u-12:Math.min(p+20,s.height-u)),rep:t})
  },k=x[t??s.rep];
  return (
    <div className={tH("bg-white dark:bg-neutral-950",tI,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div ref={o} className="relative mx-auto w-full max-w-[1100px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={tH("text-[17px]/[22px] font-extrabold",tI)}>Quota attainment by rep</h2>
              <p className={tH(tQ,tK,"mt-0.5 truncate")}>Closed revenue against quota this quarter. Tick marks 100%.</p>
            </div>
            <div role="radiogroup" aria-label="Sort" onKeyDown={t4} className={tH("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {t6.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>a(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{t}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={tH("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
              <div ref={c} className="relative" style={{height:b}}>
                {x.map(e=>{
                  let a=_.get(e.id)??0,t=e.delta>=0,l=100*t0(e.pct/125,0,1);
                  return (
                    <div key={e.id} tabIndex={0} role="button" aria-label={`${e.name}: ${e.pct.toFixed(1)} percent of quota, ${t1(e.actual)} of ${t1(e.quota)}.`} onPointerMove={a=>m(a.clientX,a.clientY,e.id)} onPointerLeave={()=>n(null)} onFocus={a=>{
                                    let t=a.currentTarget.getBoundingClientRect();
                                    m(t.left+t.width/2,t.top+t.height/2,e.id)
                                  }} onBlur={()=>n(null)} style={{transform:`translateY(${64*a}px)`,height:64}} className={tH("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]",a<x.length-1&&"border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","absolute inset-x-0 top-0 grid grid-cols-[36px_minmax(0,1fr)_auto] content-center items-center gap-x-2.5 gap-y-1.5 px-3 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:flex sm:gap-4")}>
                                    <div className="contents sm:flex sm:w-52 sm:min-w-0 sm:items-center sm:gap-2.5">
                                      <span aria-hidden="true" className={tH(tG,"row-span-2 size-[36px]")}>
                                        <span className={tX}>
                                          {e.name.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <span className={tH(tJ,tI,"min-w-0 truncate")}>{e.name}</span>
                                    </div>
                                    <div className="relative col-start-2 h-6 min-w-0 flex-1">
                                      {t5.reduce((e,a,t)=>{
                                        let l=e.from/125*100,n=(a.to-e.from)/125*100;
                                        return e.nodes.push(<div key={t} aria-hidden="true" className={tH("absolute inset-y-0",a.cls)} style={{left:`${l}%`,width:`${n}%`}} />),e.from=a.to,e;
                                      },{from:0,nodes:[]}).nodes}
                                      <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2" aria-hidden="true"><div className={tZ} style={{width:`${l}%`}} /></div>
                                      <div aria-hidden="true" className={tH(tZ,"absolute inset-y-0 w-[2px]")} style={{left:"80%"}} />
                                    </div>
                                    <div className="col-start-3 row-span-2 row-start-1 flex shrink-0 items-center gap-4 sm:gap-5">
                                      <div className="w-16 text-right">
                                        <p className={tH(tJ,tI,"tabular-nums")}>{t1(e.actual)}</p>
                                        <p className={tH(tV,tK)}>
                                          {"of "}
                                          {t1(e.quota)}
                                        </p>
                                      </div>
                                      <span className={tH(tY,"w-14 justify-end")}>
                                        {t?"+":"−"}
                                        {t1(Math.abs(e.delta))}
                                      </span>
                                    </div>
                                  </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 sm:gap-4">
                <div className="flex min-w-0 items-center gap-2.5 sm:w-52">
                  <span aria-hidden="true" className={tH(tG,"size-[36px]")}><span className={tX}>T</span></span>
                  <span className={tH(tJ,tI,"min-w-0 truncate")}>Team</span>
                </div>
                <div className="hidden min-w-0 flex-1 sm:block">
                  <span className={tH(tQ,tK,"tabular-nums")}>
                    {p.toFixed(1)}
                    % of blended quota
                  </span>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
                  <div className="w-16 text-right">
                    <p className={tH(tJ,tI,"tabular-nums")}>{t1(u)}</p>
                    <p className={tH(tV,tK)}>
                      {"of "}
                      {t1(h)}
                    </p>
                  </div>
                  <span className={tH(tY,"w-14 justify-end")}>
                    {u-h>=0?"+":"−"}
                    {t1(Math.abs(u-h))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div ref={d} aria-hidden="true" style={{left:s.x,top:s.y}} className={tH("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
            <p className={tH(tV,"whitespace-nowrap")}>{k.name}</p>
            <p className="whitespace-nowrap">
              {k.pct.toFixed(1)}
              % of quota
            </p>
            <p className={tH(tV,"whitespace-nowrap")}>{k.delta>=0?`${t1(k.delta)} over target`:`${t1(Math.abs(k.delta))} to target`}</p>
          </div>
        </div>
      </div>
  );
}
