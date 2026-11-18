/**
 * React Bits Pro — Application UI (analytics-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, left, observe, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[13px]/[18px] font-normal",
  f = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80",
  k = "text-right tabular-nums",
  g = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  v = (e,t,a)=>Math.min(a,Math.max(t,e)),
  w = ["7 days","28 days","90 days"],
  y = [{id:"ph",name:"Product Hunt",initials:"PH",seed:1.2,sparkBase:240,seg:0},{id:"hn",name:"Hacker News",initials:"HN",seed:2.7,sparkBase:190,seg:1},{id:"gh",name:"GitHub",initials:"GH",seed:4.1,sparkBase:150,seg:2},{id:"dt",name:"Dev.to",initials:"DT",seed:5.6,sparkBase:92,seg:3},{id:"rd",name:"Reddit",initials:"RD",seed:7.3,sparkBase:70,seg:3},{id:"li",name:"LinkedIn",initials:"LI",seed:9,sparkBase:52,seg:3}],
  j = {"7 days":{total:3180,delta:14.2,counts:[940,610,505,300,210,165],deltas:[24,5.2,-2,31,-9,6]},"28 days":{total:12480,delta:11.6,counts:[3240,2610,1980,1120,880,640],deltas:[18.2,9.4,-4.1,22.5,-6.8,3.3]},"90 days":{total:41600,delta:9.7,counts:[10850,9240,6700,3610,3020,2140],deltas:[12.5,7.8,-5.5,16.4,-3.2,1.9]}},
  N = ["text-neutral-900 dark:text-neutral-100","text-neutral-900/80 dark:text-neutral-100/80","text-neutral-900/66 dark:text-neutral-100/66","text-neutral-900/40 dark:text-neutral-100/40"];

function _({value:e}){
  return (
    <>
        <span>
          <HugeiconsIcon icon={e>0?Icon_1497:e<0?Icon_37502:Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="inline-block align-middle" />
        </span>
        <span className="sr-only">{e>0?"Up":e<0?"Down":"No change"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </>
  );
}

function M({data:e,active:t,onActive:a}){
  let[o,c]=function(){
    let e=useRef(null),[t,a]=useState({width:0,height:0});
    return useEffect(()=>{
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let t=e.contentRect;
        a({width:t.width,height:t.height})
      });
      return observe(t),()=>disconnect();
    }, []),[e,t];
  }(),d=Math.min(...e),u=Math.max(...e),h=.2*(u-d||1),p=useCallback(t=>t/(e.length-1)*Math.max(c.width-2,1)+1, [e.length,c.width]),m=useCallback(e=>26-(e-d+h)/(u-d+2*h)*24, [u,d,h]),f=line().x((e,t)=>p(t)).y(e=>m(e)).curve(s.G)(e)??"",b=area().x((e,t)=>p(t)).y0(28).y1(e=>m(e)).curve(s.G)(e)??"";
  return (
    <div ref={o} role="img" aria-label="14-day signup trend" tabIndex={0} onPointerMove={t=>(t=>{
        let r=o.current;
        if(!r)return;
        let l=r.getBoundingClientRect(),n=width/(e.length-1);
        a(v(Math.round((t-left)/n),0,e.length-1))
      })(t.clientX)} onPointerLeave={()=>a(null)} onBlur={()=>a(null)} onKeyDown={r=>{
        ("ArrowLeft"===r.key||"ArrowRight"===r.key)&&(r.preventDefault(),a(v((t??e.length-1)+("ArrowLeft"===r.key?-1:1),0,e.length-1))),"Escape"===r.key&&a(null)
      }} style={{touchAction:"pan-y"}} className={x(g,"relative h-7 w-full cursor-crosshair")}>
        {c.width>0&&<svg width={c.width} height={28} className="overflow-visible">
          <path d={b} className="fill-neutral-900/5 dark:fill-neutral-100/5" />
          <path d={f} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900 dark:stroke-neutral-100" />
          {null!==t&&<rect x={p(t)-4} y={m(e[t])-4} width={8} height={8} className="fill-neutral-900 stroke-white stroke-2 dark:fill-neutral-100 dark:stroke-neutral-900" />}
        </svg>}
      </div>
  );
}

function A(){
  let[e,t]=useState("28 days"),[a,n]=useState(null),[s,i]=useState({}),o=j[e],c=useMemo(()=>y.map(e=>{
    var t,a;
    return t=e.seed,a=e.sparkBase,Array.from({length:14},(e,r)=>Math.max(1,Math.round(a*(1+.44*(.5*Math.sin(.9*r+t)+.32*Math.sin(.31*r+1.7*t))))));
  }), []),d=o.counts[0]+o.counts[1]+o.counts[2],u=o.total-d,v=[{name:y[0].name,value:o.counts[0]},{name:y[1].name,value:o.counts[1]},{name:y[2].name,value:o.counts[2]},{name:"Everything else",value:u}],A=e=>e/o.total*100,S=null===a?null:v[a],$=e=>{
    t(e),n(null)
  };
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",f,"mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">Referral signups</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={x("text-[40px]/[44px] font-[450] tabular-nums",h)}>{o.total.toLocaleString("en-US")}</p>
                    <p className={b}>
                      <_ value={o.delta} />
                      <span className={p}>
                        {"vs previous "}
                        {e}
                      </span>
                    </p>
                  </div>
                </div>
                <div role="radiogroup" aria-label="Range" onKeyDown={t=>{
                  var a,r,l;
                  let n;
                  return a=w.length,r=w.indexOf(e),l=e=>$(w[e]),void(!((n="ArrowRight"===t.key||"ArrowDown"===t.key?(r+1)%a:"ArrowLeft"===t.key||"ArrowUp"===t.key?(r-1+a)%a:"Home"===t.key?0:"End"===t.key?a-1:-1)<0)&&(t.preventDefault(),l(n),t.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
                  {w.map(t=><button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>$(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
                </div>
              </div>
              <div role="img" aria-label="Signup share across the top three sources and everything else" className="mt-4 flex h-2.5 w-full gap-0.5">
                {v.map((e,t)=><button key={e.name} type="button" aria-label={`${e.name}, ${e.value.toLocaleString("en-US")} signups`} onPointerEnter={()=>n(t)} onPointerLeave={()=>n(null)} onFocus={()=>n(t)} onBlur={()=>n(null)} style={{flexGrow:e.value}} className={x(N[t],g,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","h-full min-w-1.5 cursor-pointer bg-current",0===t&&"rounded-l-[2px]",t===v.length-1&&"rounded-r-[2px]",null!==a&&a!==t&&"opacity-40")} />)}
              </div>
              <p className={x(m,p,"mt-2 flex min-w-0 gap-2 truncate")}>
                {S?<>
                  <span className={x(h,"min-w-0 truncate")}>{S.name}</span>
                  <span className={x(k,"shrink-0")}>
                    {S.value.toLocaleString("en-US")}
                    {" signups"}
                  </span>
                  <span className={x(k,"shrink-0")}>
                    {A(S.value).toFixed(1)}
                    % of total
                  </span>
                </>:<span className="min-w-0 truncate">
                  {"Top 3 sources drive "}
                  {A(d).toFixed(0)}
                  {"% of all signups this "}
                  {e}
                </span>}
              </p>
            </div>
            <div className={x(f,"p-1")}>
              {y.map((e,t)=>{
                let l=a===e.seg,d=s[e.id]??null,u=o.counts[t],p=null===d?u.toLocaleString("en-US"):c[t][d].toLocaleString("en-US");
                return (
                  <div key={e.id} onPointerEnter={()=>n(e.seg)} onPointerLeave={()=>n(null)} className={x("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",l&&"bg-neutral-900/9 dark:bg-neutral-100/9","rounded-[var(--rb-r-sm,6px)]","ps-2 pe-4")}>
                                <span className={x("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","w-4 text-right")}>{t+1}</span>
                                <span aria-hidden="true" className={x("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-9")}>
                                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials}</span>
                                </span>
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <span className={x("text-[14px]/[16px] font-[450]",h,"w-24 min-w-0 truncate")}>{e.name}</span>
                                  <div className="hidden min-w-0 flex-1 sm:block"><M data={c[t]} active={d} onActive={t=>i(a=>({...a,[e.id]:t}))} /></div>
                                </div>
                                <span className={x(m,h,k,"w-16 shrink-0")}>{p}</span>
                                <span className={x(b,"w-16 shrink-0 justify-end")}><_ value={o.deltas[t]} /></span>
                              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}


export default A;
