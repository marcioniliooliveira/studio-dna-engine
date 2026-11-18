/**
 * React Bits Pro — Application UI (analytics-11)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, left, observe, top, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';

let n = (...e)=>e.filter(Boolean).join(" "),
  s = "rounded-[var(--rb-r-xs,4px)]",
  i = "text-neutral-900 dark:text-neutral-100",
  o = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-neutral-900 dark:text-neutral-100",
  d = "text-white dark:text-neutral-900",
  u = "text-[13px]/[18px] font-normal",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  h = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  p = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  m = (e,t,a)=>Math.min(a,Math.max(t,e)),
  f = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`,
  b = (e,t)=>.5*Math.sin(.9*t+e)+.32*Math.sin(.31*t+1.7*e),
  k = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function g(e){
  let t=24305+e;
  return `${k[t%12]} ${Math.floor(t/12)}`;
}

let v = e=>9-e,
  w = Array.from({length:8},(e,t)=>Math.round(1500+265*t+170*b(2,t))),
  y = [100,62,50,43,38,35,33,32,31],
  j = [100,99,101,104,107,110,113,116,118],
  N = [{id:"users",label:"User retention",lo:0,hi:100},{id:"revenue",label:"Revenue retention",lo:85,hi:125}],
  _ = [{id:false,label:"Percent"},{id:true,label:"Absolute"}];

function M(e,t,a){
  if(0===a)return 100;
  let r=Math.round(("users"===e?y[a]:j[a])+t*("users"===e?.6:.5)+3*b(t+a,a));
  return "users"===e?m(r,5,99):m(r,80,135);
}

function A(e,t,a){
  let r=w[t];
  return "users"===e?Math.round(r*a/100):Math.round(20*r*a/100);
}

let S = [{alpha:.05,text:o},{alpha:.09,text:"text-neutral-900/80 dark:text-neutral-100/80"},{alpha:.25,text:i},{alpha:.66,text:d},{alpha:1,text:d}];

function $(e,t,a){
  let r=m((e-t)/(a-t||1),0,1);
  return S[m(Math.round(4*r),0,4)];
}

let R = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function L(){
  let[e,t]=useState("users"),[a,d]=useState(false),[b,k]=useState(null),[y,j]=useState(null),S=useRef(null),{ref:L,edges:D,onScroll:C}=function(){
    let e=useRef(null),[t,a]=useState({start:false,end:false}),r=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:r,scrollWidth:l,clientWidth:n}=t;
      a({start:r>1,end:Math.ceil(r+n)<l-1})
    }, []);
    return useEffect(()=>{
      r();
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(r);
      return observe(t),()=>disconnect();
    }, [r]),{ref:e,edges:t,onScroll:r};
  }(),z=N.find(t=>t.id===e),E=useMemo(()=>Array.from({length:9},(t,a)=>{
    let r=Array.from({length:8},(e,t)=>t).filter(e=>a<v(e));
    return {pct:Math.round(r.reduce((t,r)=>t+M(e,r,a),0)/r.length),abs:Math.round(r.reduce((t,r)=>t+A(e,r,M(e,r,a)),0)/r.length)};
  }), [e]),F=useMemo(()=>{
    let t=0;
    for(let a=1;a<8;a++)!(3>=v(a))&&M(e,a,3)>M(e,t,3)&&(t=a);
    return t;
  }, [e]);
  useEffect(()=>{
    if(!b)return;
    let e=S.current,t=L.current;
    if(!e||!t)return;
    let a=t.querySelector(`[data-cell="${b.row}-${b.col}"]`);
    if(!a)return;
    let r=a.getBoundingClientRect(),l=e.getBoundingClientRect(),n=r.top-top-82;
    j({x:r.left-left+r.width/2,top:n>=0?n:r.bottom-top+6,max:Math.max(width-92,92)})
  }, [b,e,a,L]);
  let B=(t,r)=>a?"revenue"===e?`$${f(r)}`:f(r):`${t}%`,U=(e,t)=>{
    let a=m(e,0,7),r=m(t,0,v(a)-1);
    k({row:a,col:r})
  },W=n("bg-white dark:bg-neutral-950","sticky left-0 z-10"),P=null!==b?{cohort:g(b.row),offset:b.col,pct:M(e,b.row,b.col),abs:A(e,b.row,M(e,b.row,b.col))}:null;
  return (
    <div className={n("bg-white dark:bg-neutral-950",i,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className={n("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[1100px] shrink-0")}>
          <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="px-3 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className={n("text-[16px]/[20px] font-[450] tracking-[-0.015em]",i)}>Cohort retention</h2>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <div role="radiogroup" aria-label="Metric" onKeyDown={R} className={n(h,"h-8")}>
                    {N.map(a=>(
                      <button key={a.id} type="button" role="radio" aria-checked={a.id===e} tabIndex={a.id===e?0:-1} onClick={()=>{
                                        t(a.id),k(null)
                                      }} className={p}>{a.label}</button>
                    ))}
                  </div>
                  <div role="radiogroup" aria-label="Values" onKeyDown={R} className={n(h,"h-8")}>
                    {_.map(e=><button key={e.label} type="button" role="radio" aria-checked={e.id===a} tabIndex={e.id===a?0:-1} onClick={()=>d(e.id)} className={p}>{e.label}</button>)}
                  </div>
                </div>
              </div>
              <div className={n(u,o,"mt-1 flex flex-wrap gap-x-6 gap-y-1")}>
                <span>
                  Month 3 average
                  {" "}
                  <span className={n(i,"tabular-nums")}>
                    {E[3].pct}
                    %
                  </span>
                </span>
                <span>
                  Best cohort
                  {" "}
                  <span className={i}>{g(F)}</span>
                  {" "}
                  <span className="tabular-nums">
                    (
                    {M(e,F,3)}
                    % at month 3)
                  </span>
                </span>
              </div>
            </div>
            <div className="p-2">
              <div ref={S} className="relative overflow-hidden">
                <div ref={L} role="img" tabIndex={0} aria-label={P?`${P.cohort}, month ${P.offset}: ${P.pct}% retained, ${P.abs.toLocaleString("en-US")} ${"revenue"===e?"dollars":"users"}`:`${z.label} matrix, 8 cohorts by 9 monthly offsets. Arrow keys inspect a cell.`} onScroll={C} onPointerLeave={()=>k(null)} onKeyDown={e=>{
                  let t=b??{row:0,col:0};
                  "Escape"===e.key?k(null):["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&(e.preventDefault(),"ArrowLeft"===e.key?U(t.row,t.col-1):"ArrowRight"===e.key?U(t.row,t.col+1):"ArrowUp"===e.key?U(t.row-1,t.col):"ArrowDown"===e.key?U(t.row+1,t.col):"Home"===e.key?U(t.row,0):"End"===e.key&&U(t.row,v(t.row)-1))
                }} style={{touchAction:"pan-y"}} className={n("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","overflow-x-auto")}>
                  <div className="grid gap-1 pt-1" style={{gridTemplateColumns:"148px repeat(9, minmax(62px, 1fr))",minWidth:742}}>
                    <div className={n(W,x,o,"flex items-end px-1 pb-1")}>Cohort</div>
                    {Array.from({length:9},(e,t)=>(
                      <div key={t} className={n(x,o,"flex items-end justify-center pb-1")}>
                                        {"Month "}
                                        {t}
                                      </div>
                    ))}
                    {Array.from({length:8},(t,a)=>(
                      <Fragment key={a}>
                                        <div className={n(W,"flex h-9 flex-col justify-center px-1")}>
                                          <span className={n(u,i,"truncate")}>{g(a)}</span>
                                          <span className={n(x,o,"truncate")}>
                                            {w[a].toLocaleString("en-US")}
                                            {" signups"}
                                          </span>
                                        </div>
                                        {Array.from({length:9},(t,l)=>{
                                          if(l>=v(a))return <div key={l} className="h-9" />;
                                          let i=M(e,a,l),o=A(e,a,i),d=$(i,z.lo,z.hi),x=null!==b&&(b.row===a||b.col===l),h=null!==b&&b.row===a&&b.col===l;
                                          return (
                                            <div key={l} data-cell={`${a}-${l}`} onPointerEnter={()=>k({row:a,col:l})} className={n(u,d.text,"relative flex h-9 items-center justify-center tabular-nums")}>
                                                                  <span aria-hidden="true" className={n(c,s,"absolute inset-0 bg-current")} style={{opacity:d.alpha}} />
                                                                  <span className="relative">{B(i,o)}</span>
                                                                  {x&&!h&&<span aria-hidden="true" className={n("bg-neutral-900/9 dark:bg-neutral-100/9",s,"absolute inset-0")} />}
                                                                  {h&&<span aria-hidden="true" className={n("border border-neutral-900/50 dark:border-neutral-100/50",s,"absolute inset-0")} />}
                                                                </div>
                                          );
                                        })}
                                      </Fragment>
                    ))}
                    <div className={n(W,"text-[14px]/[16px] font-[450]",i,"flex h-8 items-center px-1")}>Average</div>
                    {E.map((e,t)=>{
                      let a=$(e.pct,z.lo,z.hi);
                      return (
                        <div key={t} className={n(u,a.text,"relative flex h-8 items-center justify-center tabular-nums")}>
                                            <span aria-hidden="true" className={n(c,s,"absolute inset-0 bg-current")} style={{opacity:a.alpha}} />
                                            <span className="relative">{B(e.pct,e.abs)}</span>
                                          </div>
                      );
                    })}
                  </div>
                </div>
                <div aria-hidden="true" className={n("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",D.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={n("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",D.end?"opacity-100":"opacity-0")} />
                {P&&y&&<div aria-hidden="true" style={{left:m(y.x,92,y.max),top:y.top}} className={n("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2")}>
                  <p className={n(x,"flex gap-2 whitespace-nowrap")}>
                    <span>{P.cohort}</span>
                    <span>
                      {"Month "}
                      {P.offset}
                    </span>
                  </p>
                  <p className="whitespace-nowrap">
                    {P.pct}
                    % retained
                  </p>
                  <p className={n(x,"whitespace-nowrap")}>
                    {"revenue"===e?`≈ $${P.abs.toLocaleString("en-US")} retained`:`≈ ${P.abs.toLocaleString("en-US")} users`}
                  </p>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default L;
