/**
 * React Bits Pro — Application UI (analytics-15)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { getBoundingClientRect, useMemo, useRef, useState } from 'react';

let n = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  i = "text-neutral-900/66 dark:text-neutral-100/66",
  o = "text-[13px]/[18px] font-normal",
  c = "text-[14px]/[16px] font-[450]",
  d = "text-[12px]/[16px] font-normal tabular-nums",
  u = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  x = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  h = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",
  p = "block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100",
  m = (e,t,a)=>Math.min(a,Math.max(t,e)),
  f = e=>`$${Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}`,
  b = [{name:"Priya Nandakumar",quota:42e4,actual:487e3},{name:"Marcus Bell",quota:38e4,actual:312e3},{name:"Sofia Alvarez",quota:45e4,actual:441e3},{name:"Tom\xe1s Guerrero",quota:4e5,actual:268e3},{name:"Wei Chen",quota:36e4,actual:402e3},{name:"Amelia Whitfield-Osei",quota:5e5,actual:475e3}],
  k = [{to:70,cls:"bg-neutral-900/9 dark:bg-neutral-100/9"},{to:90,cls:"bg-neutral-900/5 dark:bg-neutral-100/5"},{to:125,cls:null}],
  g = ["By attainment","By quota","Alphabetical"],
  v = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?a.length-1:(r+t+a.length)%a.length;
  a[l].focus(),a[l].click()
};

function w(){
  let[e,t]=useState("By attainment"),[a,w]=useState(null),[y,j]=useState({x:0,y:0,rep:0}),N=useRef(null),_=useRef(null),M=useRef(null),A=useMemo(()=>b.map((e,t)=>({...e,id:t,pct:e.actual/e.quota*100,delta:e.actual-e.quota})), []),S=useMemo(()=>{
    let t=[...A].sort((t,a)=>"By attainment"===e?a.pct-t.pct:"By quota"===e?a.quota-t.quota:t.name.localeCompare(a.name)),a=new Map;
    return t.forEach((e,t)=>a.set(e.id,t)),a;
  }, [A,e]),$=A.reduce((e,t)=>e+t.actual,0),R=A.reduce((e,t)=>e+t.quota,0),L=$/R*100,D=64*A.length-0,C=(e,t,a)=>{
    let r=_.current,l=N.current;
    if(!r||!l)return;
    let n=r.getBoundingClientRect(),s=getBoundingClientRect(),i=(M.current?.offsetWidth??144)/2,o=M.current?.offsetHeight??76,c=e-n.left,d=t-n.top;
    w(a),j({x:n.left-s.left+m(c,i,Math.max(n.width-i,i)),y:n.top-s.top+(d-o-12>=0?d-o-12:Math.min(d+20,n.height-o)),rep:a})
  },z=A[a??y.rep];
  return (
    <div className={n("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div ref={N} className="relative mx-auto w-full max-w-[1100px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={n("text-[16px]/[20px] font-[450] tracking-[-0.015em]",s)}>Quota attainment by rep</h2>
              <p className={n(o,i,"mt-0.5 truncate")}>Closed revenue against quota this quarter. Tick marks 100%.</p>
            </div>
            <div role="radiogroup" aria-label="Sort" onKeyDown={v} className={n("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {g.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>t(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div ref={_} className="relative" style={{height:D}}>
                {A.map(e=>{
                  let t=S.get(e.id)??0,a=e.delta>=0,l=100*m(e.pct/125,0,1);
                  return (
                    <div key={e.id} tabIndex={0} role="button" aria-label={`${e.name}: ${e.pct.toFixed(1)} percent of quota, ${f(e.actual)} of ${f(e.quota)}.`} onPointerMove={t=>C(t.clientX,t.clientY,e.id)} onPointerLeave={()=>w(null)} onFocus={t=>{
                                    let a=t.currentTarget.getBoundingClientRect();
                                    C(a.left+a.width/2,a.top+a.height/2,e.id)
                                  }} onBlur={()=>w(null)} style={{transform:`translateY(${64*t}px)`,height:64}} className={n("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",t<A.length-1&&"border-b border-neutral-900/8 dark:border-neutral-100/8","absolute inset-x-0 top-0 grid grid-cols-[36px_minmax(0,1fr)_auto] content-center items-center gap-x-2.5 gap-y-1.5 px-3 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:flex sm:gap-4")}>
                                    <div className="contents sm:flex sm:w-52 sm:min-w-0 sm:items-center sm:gap-2.5">
                                      <span aria-hidden="true" className={n(u,"row-span-2 size-[36px]")}>
                                        <span className={x}>
                                          {e.name.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <span className={n(c,s,"min-w-0 truncate")}>{e.name}</span>
                                    </div>
                                    <div className="relative col-start-2 h-6 min-w-0 flex-1">
                                      {k.reduce((e,t,a)=>{
                                        let l=e.from/125*100,s=(t.to-e.from)/125*100;
                                        return e.nodes.push(<div key={a} aria-hidden="true" className={n("absolute inset-y-0",t.cls)} style={{left:`${l}%`,width:`${s}%`}} />),e.from=t.to,e;
                                      },{from:0,nodes:[]}).nodes}
                                      <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2" aria-hidden="true"><div className={p} style={{width:`${l}%`}} /></div>
                                      <div aria-hidden="true" className={n(p,"absolute inset-y-0 w-[2px]")} style={{left:"80%"}} />
                                    </div>
                                    <div className="col-start-3 row-span-2 row-start-1 flex shrink-0 items-center gap-4 sm:gap-5">
                                      <div className="w-16 text-right">
                                        <p className={n(c,s,"tabular-nums")}>{f(e.actual)}</p>
                                        <p className={n(d,i)}>
                                          {"of "}
                                          {f(e.quota)}
                                        </p>
                                      </div>
                                      <span className={n(h,"w-14 justify-end")}>
                                        {a?"+":"−"}
                                        {f(Math.abs(e.delta))}
                                      </span>
                                    </div>
                                  </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 sm:gap-4">
                <div className="flex min-w-0 items-center gap-2.5 sm:w-52">
                  <span aria-hidden="true" className={n(u,"size-[36px]")}><span className={x}>T</span></span>
                  <span className={n(c,s,"min-w-0 truncate")}>Team</span>
                </div>
                <div className="hidden min-w-0 flex-1 sm:block">
                  <span className={n(o,i,"tabular-nums")}>
                    {L.toFixed(1)}
                    % of blended quota
                  </span>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
                  <div className="w-16 text-right">
                    <p className={n(c,s,"tabular-nums")}>{f($)}</p>
                    <p className={n(d,i)}>
                      {"of "}
                      {f(R)}
                    </p>
                  </div>
                  <span className={n(h,"w-14 justify-end")}>
                    {$-R>=0?"+":"−"}
                    {f(Math.abs($-R))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div ref={M} aria-hidden="true" style={{left:y.x,top:y.y}} className={n("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
            <p className={n(d,"whitespace-nowrap")}>{z.name}</p>
            <p className="whitespace-nowrap">
              {z.pct.toFixed(1)}
              % of quota
            </p>
            <p className={n(d,"whitespace-nowrap")}>{z.delta>=0?`${f(z.delta)} over target`:`${f(Math.abs(z.delta))} to target`}</p>
          </div>
        </div>
      </div>
  );
}


export default w;
