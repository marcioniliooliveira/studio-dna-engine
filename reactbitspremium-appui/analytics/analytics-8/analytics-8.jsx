/**
 * React Bits Pro — Application UI (analytics-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { height, left, top, useMemo, useRef, useState, width } from 'react';

let n = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  i = "text-neutral-900/66 dark:text-neutral-100/66",
  o = "rounded-[var(--rb-r-xs,4px)]",
  c = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  d = "text-[13px]/[18px] font-normal",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = "text-right tabular-nums",
  h = ["Visited pricing","Started trial","Invited a teammate","Connected a repo","Converted to paid"],
  p = ["All traffic","Organic","Paid"],
  m = {"All traffic":[24e3,8400,5100,3600,2050],Organic:[9800,4900,1850,1300,880],Paid:[14200,5400,3500,2600,900]};

function f(){
  let[e,t]=useState("All traffic"),[a,f]=useState(null),b=useRef(null),k=useRef(null),[g,v]=useState({x:0,y:0,row:0}),w=m[e],y=useMemo(()=>{
    let e=w[0];
    return w.map((t,a)=>({stage:h[a],count:t,ratio:t/e,fromTop:t/e*100,fromPrev:0===a?100:t/w[a-1]*100,lost:0===a?0:w[a-1]-t,dropPct:0===a?0:(w[a-1]-t)/w[a-1]*100}));
  }, [w]),j=useMemo(()=>{
    let e=1;
    for(let t=2;t<y.length;t++)y[t].dropPct>y[e].dropPct&&(e=t);
    return e;
  }, [y]),N=y[y.length-1].fromTop,_=(e,t,a)=>{
    let r=b.current;
    if(!r)return;
    let l=r.getBoundingClientRect(),n=(k.current?.offsetWidth??256)/2,s=k.current?.offsetHeight??76,i=e-left,o=t-top;
    f(a),v({x:Math.min(Math.max(width-n,n),Math.max(n,i)),y:o-s-12>=0?o-s-12:Math.min(o+20,height-s),row:a})
  },M=y[a??g.row],A=e=>{
    t(e),f(null)
  };
  return (
    <div className={n("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={n("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={n("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className={n(c,s)}>Signup funnel</h2>
                <p className={n(d,i,"mt-0.5 truncate")}>Self-serve activation, pricing page to paid.</p>
              </div>
              <div role="radiogroup" aria-label="Cohort" onKeyDown={t=>{
                var a,r,l;
                let n;
                return a=p.length,r=p.indexOf(e),l=e=>A(p[e]),void(!((n="ArrowRight"===t.key||"ArrowDown"===t.key?(r+1)%a:"ArrowLeft"===t.key||"ArrowUp"===t.key?(r-1+a)%a:"Home"===t.key?0:"End"===t.key?a-1:-1)<0)&&(t.preventDefault(),l(n),t.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
              }} className={n("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                {p.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>A(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
              </div>
            </div>
            <div className="px-5 py-4">
              <div ref={b} className="relative">
                {y.map((e,t)=>(
                  <div key={e.stage}>
                                {t>0&&<div className={n(u,i,"flex h-4 items-center gap-1.5")}>
                                  <span>
                                    −
                                    {e.lost.toLocaleString("en-US")}
                                    {" lost"}
                                  </span>
                                  <span>
                                    {e.dropPct.toFixed(1)}
                                    % drop
                                  </span>
                                  {t===j&&<span className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]">Steepest fall</span>}
                                </div>}
                                <div tabIndex={0} role="button" aria-label={`${e.stage}: ${e.count.toLocaleString("en-US")} users, ${e.fromTop.toFixed(1)} percent of visitors.`} onPointerMove={e=>_(e.clientX,e.clientY,t)} onPointerLeave={()=>f(null)} onFocus={e=>{
                                  let a=e.currentTarget.getBoundingClientRect();
                                  _(a.left+a.width/2,a.top,t)
                                }} onBlur={()=>f(null)} style={{touchAction:"pan-y"}} className={n("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]",a===t&&"bg-neutral-900/9 dark:bg-neutral-100/9","-mx-2 cursor-default px-2 py-1.5")}>
                                  <div className="mb-1 flex items-baseline justify-between gap-3">
                                    <span className={n("text-[14px]/[16px] font-[450]",s,"min-w-0 truncate")}>{e.stage}</span>
                                    <span className={n(d,i,x,"flex shrink-0 gap-2")}>
                                      <span className={s}>{e.count.toLocaleString("en-US")}</span>
                                      <span>
                                        {e.fromTop.toFixed(1)}
                                        %
                                      </span>
                                    </span>
                                  </div>
                                  <div className={n("bg-neutral-900/8 dark:bg-neutral-100/8",o,"h-7 w-full overflow-hidden")}>
                                    <div className={n("text-neutral-900 dark:text-neutral-100",o,"h-full bg-current")} style={{width:`${100*e.ratio}%`}} />
                                  </div>
                                </div>
                              </div>
                ))}
                <div ref={k} aria-hidden="true" style={{left:g.x,top:g.y}} className={n("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-3 py-2 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","-translate-x-1/2",null===a?"opacity-0":"opacity-100")}>
                  <p className={n(u,"whitespace-nowrap")}>{M.stage}</p>
                  <p className="whitespace-nowrap">
                    {M.count.toLocaleString("en-US")}
                    {" users"}
                  </p>
                  <p className={n(u,"flex gap-2 whitespace-nowrap")}>
                    <span>
                      {M.fromPrev.toFixed(1)}
                      % from previous
                    </span>
                    <span>
                      {M.fromTop.toFixed(1)}
                      % from top
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <span className={n(d,i)}>Visitor to paid conversion</span>
              <span className={n(c,s,x)}>
                {N.toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}


export default f;
