/**
 * React Bits Pro — Application UI (dashboard-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let h = "text-[13px]/[16px] font-semibold tabular-nums";

let b = [28,31,30,36,34,41,44,43,49,52,58,61];

let p = [70,72,71,74,78,79,83,86,88,90,93,97];

let u = [61,59,60,58,57,55,56,54,53,52,51,49];

let m = [12,13,12,14,13,15,14,16,15,17,16,18];

let k = [500,375,250,125,0];

let P = (...e)=>e.filter(Boolean).join(" ");

let O = "text-neutral-900 dark:text-neutral-100";

let F = "text-neutral-900/78 dark:text-neutral-100/78";

let T = "text-neutral-900/62 dark:text-neutral-100/62";

let U = "text-[14px]/[20px] font-medium";

let V = "rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8";

let H = [{label:"Active users",value:"8,472",delta:"+3.2%",positive:true,spark:[40,44,42,48,52,50,58,62]},{label:"Sessions",value:"21,908",delta:"+5.1%",positive:true,spark:[60,62,66,64,70,74,78,83]},{label:"Avg. session",value:"4m 12s",delta:"−1.4%",positive:false,spark:[55,54,56,52,51,50,49,47]},{label:"Bounce rate",value:"38.6%",delta:"+0.9 pp",positive:false,spark:[30,31,33,32,34,35,37,39]}];

let K = [520,486,543,610,588,640,705,672,718,690,748,760,795,812];

let J = [{path:"/",views:"48,210"},{path:"/pricing",views:"22,984"},{path:"/docs/quickstart",views:"18,663"},{path:"/changelog",views:"9,120"},{path:"/blog/series-b",views:"6,845"}];

let G = [{label:"Desktop",pct:62},{label:"Mobile",pct:31},{label:"Tablet",pct:7}];

let q = [{label:"Visited",value:"21,908"},{label:"Signed up",value:"3,914"},{label:"Activated",value:"2,180"},{label:"Subscribed",value:"1,024"}];

function Q({values:e}){
  let a=Math.min(...e),r=Math.max(...e)-a||1,l=e.map((t,l)=>{
    let n=l/(e.length-1)*100;
    return `${n.toFixed(2)},${(92-(t-a)/r*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

function X({className:e}){
  return <span className={P(V,"block h-3",e)} />;
}

function Y({title:e,onRefresh:a,onHide:r}){
  let s=[{label:"Refresh data",run:a},{label:"Hide widget",run:r}],[i,o]=useState(false),[c,d]=useState(false),[x,_]=useState(0),h=useRef(null),b=useRef(null),p=useRef(null);
  useEffect(()=>{
    if(!i)return;
    let e=h.current?.ownerDocument??document,a=e=>{
      h.current?.contains(e.target)||o(false)
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [i]),useEffect(()=>{
    i&&p.current?.focus({preventScroll:true})
  }, [i]);
  let u=(e,a)=>{
    _(e),d(a),o(true)
  },m=(e=true)=>{
    o(false),e&&b.current?.focus({preventScroll:true})
  },k=e=>{
    m(),s[e].run()
  };
  return (
    <div ref={h} className="relative shrink-0">
        <button ref={b} type="button" aria-label={`${e} options`} aria-haspopup="menu" aria-expanded={i} onClick={()=>i?m():u(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),u(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),u(s.length-1,false))
        }} className={P("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
          <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        {i&&<div ref={p} role="menu" aria-label={`${e} options`} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),m();break;case"ArrowDown":e.preventDefault(),_(e=>(e+1)%s.length);break;case"ArrowUp":e.preventDefault(),_(e=>(e-1+s.length)%s.length);break;case"Home":e.preventDefault(),_(0);break;case"End":e.preventDefault(),_(s.length-1);break;case"Enter":case" ":e.preventDefault(),k(x);break;case"Tab":m(false)}
        }} className={P("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",c&&"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute right-0 top-full z-30 mt-1.5 w-[160px] min-w-[160px]")}>
          {s.map((e,a)=><button key={e.label} type="button" role="menuitem" tabIndex={-1} data-highlighted={a===x?"":undefined} onClick={()=>k(a)} onPointerMove={()=>_(a)} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">{e.label}</button>)}
        </div>}
      </div>
  );
}

function Z({id:e,title:a,className:r,refreshing:l,skeleton:n,onRefresh:s,onHide:i,children:o}){
  return (
    <section className={P("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","p-4",r)} aria-busy={l}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{a}</h2>
          <Y title={a} onRefresh={()=>s(e)} onHide={()=>i(e)} />
        </div>
        {l?<div aria-hidden>{n}</div>:o}
      </section>
  );
}


export default function dashboard_3__Sorbet__Component(){
  let{ref:e,edges:a,onScroll:r}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),[s,i]=useState([]),[d,x]=useState(null),_=useRef(undefined),h=Math.max(...K);
  useEffect(()=>()=>window.clearTimeout(_.current), []);
  let b=e=>{
    window.clearTimeout(_.current),x(e),_.current=window.setTimeout(()=>x(null),900)
  },p=e=>i(a=>[...a,e]),u=e=>({id:e,refreshing:d===e,onRefresh:b,onHide:p});
  return (
    <div className={P("bg-white dark:bg-neutral-950",O,"relative flex h-full min-h-[740px] w-full flex-col overflow-hidden")}>
        <header className={P("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={P("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",O,"truncate")}>Web analytics</h1>
          {s.length>0?<button type="button" onClick={()=>i([])} className={P("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
            {"Show "}
            {s.length}
            {" hidden"}
          </button>:<span className={P(U,T,"shrink-0")}>Updated 2 min ago</span>}
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={r} className="h-full overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className={P("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","col-span-full")}>
                <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
                  {H.map(e=>{
                    let a,r=(a=e.delta,/^[−-]/.test(a));
                    return (
                      <div key={e.label} className={P("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","@container")}>
                                        <p className={P("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","text-pretty")}>{e.label}</p>
                                        <div className="mt-auto flex items-end justify-between gap-3">
                                          <p className={P("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","truncate")}>{e.value}</p>
                                          <Q values={e.spark} />
                                        </div>
                                        <p className={P("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","truncate")}>
                                          <HugeiconsIcon icon={r?Icon_37502:Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />
                                          <span className="sr-only">{r?"Down":"Up"}</span>
                                          {e.delta}
                                          <span className={T}>vs. last week</span>
                                        </p>
                                      </div>
                    );
                  })}
                </div>
              </div>
              {!s.includes("sessions")&&<Z {...u("sessions")} title="Sessions, last 14 days" className="col-span-2 flex flex-col" skeleton={<>
                <div className={P(V,"mt-4 h-40")} />
                <div className="mt-2 flex justify-between">
                  <X className="w-10" />
                  <X className="w-10" />
                </div>
              </>}>
                <div className="mt-4 flex h-40 items-end gap-1.5">
                  {K.map((e,a)=>(
                    <svg key={a} aria-hidden="true" className="block min-w-0 flex-1" style={{height:`${e/h*100}%`}}>
                                    <rect width="100%" height="100%" className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]" />
                                  </svg>
                  ))}
                </div>
                <div className={P("text-[13px]/[16px] font-semibold tabular-nums",T,"mt-2 flex justify-between")}>
                  <span>Mar 1</span>
                  <span>Mar 14</span>
                </div>
              </Z>}
              {!s.includes("pages")&&<Z {...u("pages")} title="Top pages" className="col-span-2" skeleton={<div className="mt-3 flex flex-col gap-1.5">{J.map(e=><div key={e.path} className={P(V,"h-9")} />)}</div>}>
                <ul className={P("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-3 flex flex-col")}>
                  {J.map(e=>(
                    <li key={e.path} className={P("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","min-h-[36px] justify-between")}>
                                    <span className={P("font-mono text-[12px]/[16px] tabular-nums",F,"min-w-0 flex-1 truncate")}>{e.path}</span>
                                    <span className={P(U,O,"shrink-0 tabular-nums")}>{e.views}</span>
                                  </li>
                  ))}
                </ul>
              </Z>}
              {!s.includes("devices")&&<Z {...u("devices")} title="Devices" className="col-span-2" skeleton={<div className="mt-3 space-y-3">
                {G.map(e=>(
                  <div key={e.label}>
                                <div className="flex items-center justify-between">
                                  <X className="w-16" />
                                  <X className="w-8" />
                                </div>
                                <div className={P(V,"mt-1.5 h-1.5")} />
                              </div>
                ))}
              </div>}>
                <ul className="mt-3 space-y-3">
                  {G.map(e=>(
                    <li key={e.label}>
                                    <div className={P(U,"flex items-center justify-between")}>
                                      <span className={F}>{e.label}</span>
                                      <span className={P(O,"tabular-nums")}>
                                        {e.pct}
                                        %
                                      </span>
                                    </div>
                                    <div className={P("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-1.5 h-1.5")}>
                                      <div className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${e.pct}%`}} />
                                    </div>
                                  </li>
                  ))}
                </ul>
              </Z>}
              {!s.includes("funnel")&&<Z {...u("funnel")} title="Signup funnel" className="col-span-2" skeleton={<div className="mt-3 space-y-3">
                {q.map(e=>(
                  <div key={e.label} className="flex items-center justify-between">
                                <X className="w-24" />
                                <X className="w-14" />
                              </div>
                ))}
              </div>}>
                <ul className="mt-3 space-y-3">
                  {q.map((e,a)=>(
                    <li key={e.label} className="flex items-center justify-between gap-3">
                                    <span className={P(U,F,"inline-flex items-center gap-2")}>
                                      <span className={P(T,"w-4 tabular-nums")}>{a+1}</span>
                                      {e.label}
                                    </span>
                                    <span className={P(U,O,"tabular-nums")}>{e.value}</span>
                                  </li>
                  ))}
                </ul>
              </Z>}
              {4===s.length&&<div className="col-span-full flex flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">All widgets hidden</p>
                <p className={P("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-xs")}>
                  Restore them from the button in the header to see traffic, pages, devices and funnel again.
                </p>
              </div>}
            </div>
          </div>
          <div aria-hidden="true" className={P("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={P("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
