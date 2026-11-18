/**
 * React Bits Pro — Application UI (analytics-11 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, left, observe, top, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let k = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[14px]/[20px] font-medium";

let g = (e,a,t)=>Math.min(t,Math.max(a,e));

let a$ = (...e)=>e.filter(Boolean).join(" ");

let aR = "rounded-[var(--rb-r-sm,6px)]";

let aL = "text-neutral-900 dark:text-neutral-100";

let aD = "text-neutral-900/62 dark:text-neutral-100/62";

let aC = "text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]";

let az = "text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:text-neutral-950";

let aE = "text-[14px]/[20px] font-medium";

let aF = "text-[13px]/[16px] font-semibold tabular-nums";

let aB = "inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1";

let aU = "h-10";

let aW = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40";

let aP = (e,a,t)=>Math.min(t,Math.max(a,e));

let aO = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;

let aT = (e,a)=>.5*Math.sin(.9*a+e)+.32*Math.sin(.31*a+1.7*e);

let aq = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function aH(e){
  let a=24305+e;
  return `${aq[a%12]} ${Math.floor(a/12)}`;
}

let aI = e=>9-e;

let aK = Array.from({length:8},(e,a)=>Math.round(1500+265*a+170*aT(2,a)));

let aQ = [100,62,50,43,38,35,33,32,31];

let aJ = [100,99,101,104,107,110,113,116,118];

let aV = [{id:"users",label:"User retention",lo:0,hi:100},{id:"revenue",label:"Revenue retention",lo:85,hi:125}];

let aG = [{id:false,label:"Percent"},{id:true,label:"Absolute"}];

function aX(e,a,t){
  if(0===t)return 100;
  let r=Math.round(("users"===e?aQ[t]:aJ[t])+a*("users"===e?.6:.5)+3*aT(a+t,t));
  return "users"===e?aP(r,5,99):aP(r,80,135);
}

function aY(e,a,t){
  let r=aK[a];
  return "users"===e?Math.round(r*t/100):Math.round(20*r*t/100);
}

let aZ = [{alpha:.05,text:aD},{alpha:.09,text:"text-neutral-900/78 dark:text-neutral-100/78"},{alpha:.25,text:aL},{alpha:.66,text:az},{alpha:1,text:az}];

function a0(e,a,t){
  let r=aP((e-a)/(t-a||1),0,1);
  return aZ[aP(Math.round(4*r),0,4)];
}

let a1 = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=t.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?t.length-1:(r+a+t.length)%t.length;
  t[l].focus(),t[l].click()
};


export default function analytics_11__Sorbet__Component(){
  let[e,a]=useState("users"),[t,n]=useState(false),[s,i]=useState(null),[o,c]=useState(null),d=useRef(null),{ref:x,edges:_,onScroll:u}=function(){
    let e=useRef(null),[a,t]=useState({start:false,end:false}),r=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:r,scrollWidth:l,clientWidth:n}=a;
      t({start:r>1,end:Math.ceil(r+n)<l-1})
    }, []);
    return useEffect(()=>{
      r();
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let l=new t.ResizeObserver(r);
      return observe(a),()=>disconnect();
    }, [r]),{ref:e,edges:a,onScroll:r};
  }(),h=aV.find(a=>a.id===e),p=useMemo(()=>Array.from({length:9},(a,t)=>{
    let r=Array.from({length:8},(e,a)=>a).filter(e=>t<aI(e));
    return {pct:Math.round(r.reduce((a,r)=>a+aX(e,r,t),0)/r.length),abs:Math.round(r.reduce((a,r)=>a+aY(e,r,aX(e,r,t)),0)/r.length)};
  }), [e]),b=useMemo(()=>{
    let a=0;
    for(let t=1;t<8;t++)!(3>=aI(t))&&aX(e,t,3)>aX(e,a,3)&&(a=t);
    return a;
  }, [e]);
  useEffect(()=>{
    if(!s)return;
    let e=d.current,a=x.current;
    if(!e||!a)return;
    let t=a.querySelector(`[data-cell="${s.row}-${s.col}"]`);
    if(!t)return;
    let r=t.getBoundingClientRect(),l=e.getBoundingClientRect(),n=r.top-top-82;
    c({x:r.left-left+r.width/2,top:n>=0?n:r.bottom-top+6,max:Math.max(width-92,92)})
  }, [s,e,t,x]);
  let m=(a,r)=>t?"revenue"===e?`$${aO(r)}`:aO(r):`${a}%`,k=(e,a)=>{
    let t=aP(e,0,7),r=aP(a,0,aI(t)-1);
    i({row:t,col:r})
  },f=a$("bg-white dark:bg-neutral-950","sticky left-0 z-10"),g=null!==s?{cohort:aH(s.row),offset:s.col,pct:aX(e,s.row,s.col),abs:aY(e,s.row,aX(e,s.row,s.col))}:null;
  return (
    <div className={a$("bg-white dark:bg-neutral-950",aL,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className={a$("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[1100px] shrink-0")}>
          <div className={a$("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="px-3 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className={a$("text-[17px]/[22px] font-extrabold",aL)}>Cohort retention</h2>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <div role="radiogroup" aria-label="Metric" onKeyDown={a1} className={a$(aB,aU)}>
                    {aV.map(t=>(
                      <button key={t.id} type="button" role="radio" aria-checked={t.id===e} tabIndex={t.id===e?0:-1} onClick={()=>{
                                        a(t.id),i(null)
                                      }} className={aW}>{t.label}</button>
                    ))}
                  </div>
                  <div role="radiogroup" aria-label="Values" onKeyDown={a1} className={a$(aB,aU)}>
                    {aG.map(e=><button key={e.label} type="button" role="radio" aria-checked={e.id===t} tabIndex={e.id===t?0:-1} onClick={()=>n(e.id)} className={aW}>{e.label}</button>)}
                  </div>
                </div>
              </div>
              <div className={a$(aE,aD,"mt-1 flex flex-wrap gap-x-6 gap-y-1")}>
                <span>
                  Month 3 average
                  {" "}
                  <span className={a$(aL,"tabular-nums")}>
                    {p[3].pct}
                    %
                  </span>
                </span>
                <span>
                  Best cohort
                  {" "}
                  <span className={aL}>{aH(b)}</span>
                  {" "}
                  <span className="tabular-nums">
                    (
                    {aX(e,b,3)}
                    % at month 3)
                  </span>
                </span>
              </div>
            </div>
            <div className="p-2">
              <div ref={d} className="relative overflow-hidden">
                <div ref={x} role="img" tabIndex={0} aria-label={g?`${g.cohort}, month ${g.offset}: ${g.pct}% retained, ${g.abs.toLocaleString("en-US")} ${"revenue"===e?"dollars":"users"}`:`${h.label} matrix, 8 cohorts by 9 monthly offsets. Arrow keys inspect a cell.`} onScroll={u} onPointerLeave={()=>i(null)} onKeyDown={e=>{
                  let a=s??{row:0,col:0};
                  "Escape"===e.key?i(null):["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&(e.preventDefault(),"ArrowLeft"===e.key?k(a.row,a.col-1):"ArrowRight"===e.key?k(a.row,a.col+1):"ArrowUp"===e.key?k(a.row-1,a.col):"ArrowDown"===e.key?k(a.row+1,a.col):"Home"===e.key?k(a.row,0):"End"===e.key&&k(a.row,aI(a.row)-1))
                }} style={{touchAction:"pan-y"}} className={a$("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","overflow-x-auto")}>
                  <div className="grid gap-1 pt-1" style={{gridTemplateColumns:"148px repeat(9, minmax(62px, 1fr))",minWidth:742}}>
                    <div className={a$(f,aF,aD,"flex items-end px-1 pb-1")}>Cohort</div>
                    {Array.from({length:9},(e,a)=>(
                      <div key={a} className={a$(aF,aD,"flex items-end justify-center pb-1")}>
                                        {"Month "}
                                        {a}
                                      </div>
                    ))}
                    {Array.from({length:8},(a,t)=>(
                      <Fragment key={t}>
                                        <div className={a$(f,"flex h-9 flex-col justify-center px-1")}>
                                          <span className={a$(aE,aL,"truncate")}>{aH(t)}</span>
                                          <span className={a$(aF,aD,"truncate")}>
                                            {aK[t].toLocaleString("en-US")}
                                            {" signups"}
                                          </span>
                                        </div>
                                        {Array.from({length:9},(a,l)=>{
                                          if(l>=aI(t))return <div key={l} className="h-9" />;
                                          let n=aX(e,t,l),o=aY(e,t,n),c=a0(n,h.lo,h.hi),d=null!==s&&(s.row===t||s.col===l),x=null!==s&&s.row===t&&s.col===l;
                                          return (
                                            <div key={l} data-cell={`${t}-${l}`} onPointerEnter={()=>i({row:t,col:l})} className={a$(aE,c.text,"relative flex h-9 items-center justify-center tabular-nums")}>
                                                                  <span aria-hidden="true" className={a$(aC,aR,"absolute inset-0 bg-current")} style={{opacity:c.alpha}} />
                                                                  <span className="relative">{m(n,o)}</span>
                                                                  {d&&!x&&<span aria-hidden="true" className={a$("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",aR,"absolute inset-0")} />}
                                                                  {x&&<span aria-hidden="true" className={a$("border-2 border-neutral-900/30 dark:border-neutral-100/34",aR,"absolute inset-0")} />}
                                                                </div>
                                          );
                                        })}
                                      </Fragment>
                    ))}
                    <div className={a$(f,"text-[15px]/[20px] font-bold",aL,"flex h-8 items-center px-1")}>Average</div>
                    {p.map((e,a)=>{
                      let t=a0(e.pct,h.lo,h.hi);
                      return (
                        <div key={a} className={a$(aE,t.text,"relative flex h-8 items-center justify-center tabular-nums")}>
                                            <span aria-hidden="true" className={a$(aC,aR,"absolute inset-0 bg-current")} style={{opacity:t.alpha}} />
                                            <span className="relative">{m(e.pct,e.abs)}</span>
                                          </div>
                      );
                    })}
                  </div>
                </div>
                <div aria-hidden="true" className={a$("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",_.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={a$("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",_.end?"opacity-100":"opacity-0")} />
                {g&&o&&<div aria-hidden="true" style={{left:aP(o.x,92,o.max),top:o.top}} className={a$("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2")}>
                  <p className={a$(aF,"flex gap-2 whitespace-nowrap")}>
                    <span>{g.cohort}</span>
                    <span>
                      {"Month "}
                      {g.offset}
                    </span>
                  </p>
                  <p className="whitespace-nowrap">
                    {g.pct}
                    % retained
                  </p>
                  <p className={a$(aF,"whitespace-nowrap")}>
                    {"revenue"===e?`≈ $${g.abs.toLocaleString("en-US")} retained`:`≈ ${g.abs.toLocaleString("en-US")} users`}
                  </p>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
