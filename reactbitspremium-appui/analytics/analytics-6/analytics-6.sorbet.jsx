/**
 * React Bits Pro — Application UI (analytics-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, left, observe, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" ");

let ej = (...e)=>e.filter(Boolean).join(" ");

let eN = "text-neutral-900 dark:text-neutral-100";

let eM = "text-neutral-900/62 dark:text-neutral-100/62";

let eA = "text-[14px]/[20px] font-medium";

let eS = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let e$ = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78";

let eR = "text-right tabular-nums";

let eL = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let eD = (e,a,t)=>Math.min(t,Math.max(a,e));

let eC = ["7 days","28 days","90 days"];

let ez = [{id:"ph",name:"Product Hunt",initials:"PH",seed:1.2,sparkBase:240,seg:0},{id:"hn",name:"Hacker News",initials:"HN",seed:2.7,sparkBase:190,seg:1},{id:"gh",name:"GitHub",initials:"GH",seed:4.1,sparkBase:150,seg:2},{id:"dt",name:"Dev.to",initials:"DT",seed:5.6,sparkBase:92,seg:3},{id:"rd",name:"Reddit",initials:"RD",seed:7.3,sparkBase:70,seg:3},{id:"li",name:"LinkedIn",initials:"LI",seed:9,sparkBase:52,seg:3}];

let eE = {"7 days":{total:3180,delta:14.2,counts:[940,610,505,300,210,165],deltas:[24,5.2,-2,31,-9,6]},"28 days":{total:12480,delta:11.6,counts:[3240,2610,1980,1120,880,640],deltas:[18.2,9.4,-4.1,22.5,-6.8,3.3]},"90 days":{total:41600,delta:9.7,counts:[10850,9240,6700,3610,3020,2140],deltas:[12.5,7.8,-5.5,16.4,-3.2,1.9]}};

let eF = ["text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","text-[var(--rb-accent,oklch(84%_0.15_165))] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_72%,transparent)]","text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_38%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_30%,transparent)]"];

function eB({value:e}){
  return (
    <>
        <span>
          <HugeiconsIcon icon={e>0?Icon_1497:e<0?Icon_37502:Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="inline-block align-middle" />
        </span>
        <span className="sr-only">{e>0?"Up":e<0?"Down":"No change"}</span>
        {Math.abs(e).toFixed(1)}
        %
      </>
  );
}

function eU({data:e,active:a,onActive:t}){
  let[o,c]=function(){
    let e=useRef(null),[a,t]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(([e])=>{
        let a=e.contentRect;
        t({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),d=Math.min(...e),x=Math.max(...e),_=.2*(x-d||1),u=useCallback(a=>a/(e.length-1)*Math.max(c.width-2,1)+1, [e.length,c.width]),h=useCallback(e=>26-(e-d+_)/(x-d+2*_)*24, [x,d,_]),p=line().x((e,a)=>u(a)).y(e=>h(e)).curve(s.G)(e)??"",b=area().x((e,a)=>u(a)).y0(28).y1(e=>h(e)).curve(s.G)(e)??"";
  return (
    <div ref={o} role="img" aria-label="14-day signup trend" tabIndex={0} onPointerMove={a=>(a=>{
        let r=o.current;
        if(!r)return;
        let l=r.getBoundingClientRect(),n=width/(e.length-1);
        t(eD(Math.round((a-left)/n),0,e.length-1))
      })(a.clientX)} onPointerLeave={()=>t(null)} onBlur={()=>t(null)} onKeyDown={r=>{
        ("ArrowLeft"===r.key||"ArrowRight"===r.key)&&(r.preventDefault(),t(eD((a??e.length-1)+("ArrowLeft"===r.key?-1:1),0,e.length-1))),"Escape"===r.key&&t(null)
      }} style={{touchAction:"pan-y"}} className={ej(eL,"relative h-7 w-full cursor-crosshair")}>
        {c.width>0&&<svg width={c.width} height={28} className="overflow-visible">
          <path d={b} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
          <path d={p} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
          {null!==a&&<rect x={u(a)-4} y={h(e[a])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />}
        </svg>}
      </div>
  );
}


export default function analytics_6__Sorbet__Component(){
  let[e,a]=useState("28 days"),[t,n]=useState(null),[s,i]=useState({}),o=eE[e],c=useMemo(()=>ez.map(e=>{
    var a,t;
    return a=e.seed,t=e.sparkBase,Array.from({length:14},(e,r)=>Math.max(1,Math.round(t*(1+.44*(.5*Math.sin(.9*r+a)+.32*Math.sin(.31*r+1.7*a))))));
  }), []),d=o.counts[0]+o.counts[1]+o.counts[2],x=o.total-d,_=[{name:ez[0].name,value:o.counts[0]},{name:ez[1].name,value:o.counts[1]},{name:ez[2].name,value:o.counts[2]},{name:"Everything else",value:x}],u=e=>e/o.total*100,h=null===t?null:_[t],p=e=>{
    a(e),n(null)
  };
  return (
    <div className={ej("bg-white dark:bg-neutral-950",eN,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={ej("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={ej("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0",eS,"mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">Referral signups</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={ej("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",eN)}>{o.total.toLocaleString("en-US")}</p>
                    <p className={e$}>
                      <eB value={o.delta} />
                      <span className={eM}>
                        {"vs previous "}
                        {e}
                      </span>
                    </p>
                  </div>
                </div>
                <div role="radiogroup" aria-label="Range" onKeyDown={a=>{
                  var t,r,l;
                  let n;
                  return t=eC.length,r=eC.indexOf(e),l=e=>p(eC[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(r+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(r-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={ej("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                  {eC.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>p(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
                </div>
              </div>
              <div role="img" aria-label="Signup share across the top three sources and everything else" className="mt-4 flex h-2.5 w-full gap-0.5">
                {_.map((e,a)=><button key={e.name} type="button" aria-label={`${e.name}, ${e.value.toLocaleString("en-US")} signups`} onPointerEnter={()=>n(a)} onPointerLeave={()=>n(null)} onFocus={()=>n(a)} onBlur={()=>n(null)} style={{flexGrow:e.value}} className={ej(eF[a],eL,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","h-full min-w-1.5 cursor-pointer bg-current",0===a&&"rounded-l-[2px]",a===_.length-1&&"rounded-r-[2px]",null!==t&&t!==a&&"opacity-40")} />)}
              </div>
              <p className={ej(eA,eM,"mt-2 flex min-w-0 gap-2 truncate")}>
                {h?<>
                  <span className={ej(eN,"min-w-0 truncate")}>{h.name}</span>
                  <span className={ej(eR,"shrink-0")}>
                    {h.value.toLocaleString("en-US")}
                    {" signups"}
                  </span>
                  <span className={ej(eR,"shrink-0")}>
                    {u(h.value).toFixed(1)}
                    % of total
                  </span>
                </>:<span className="min-w-0 truncate">
                  {"Top 3 sources drive "}
                  {u(d).toFixed(0)}
                  {"% of all signups this "}
                  {e}
                </span>}
              </p>
            </div>
            <div className={ej(eS,"p-1")}>
              {ez.map((e,a)=>{
                let l=t===e.seg,d=s[e.id]??null,x=o.counts[a],_=null===d?x.toLocaleString("en-US"):c[a][d].toLocaleString("en-US");
                return (
                  <div key={e.id} onPointerEnter={()=>n(e.seg)} onPointerLeave={()=>n(null)} className={ej("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",l&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","rounded-[var(--rb-r-4xl,18px)]","ps-2 pe-4")}>
                                <span className={ej("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","w-4 text-right")}>{a+1}</span>
                                <span aria-hidden="true" className={ej("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-9")}>
                                  <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.initials}</span>
                                </span>
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                  <span className={ej("text-[15px]/[20px] font-bold",eN,"w-24 min-w-0 truncate")}>{e.name}</span>
                                  <div className="hidden min-w-0 flex-1 sm:block"><eU data={c[a]} active={d} onActive={a=>i(t=>({...t,[e.id]:a}))} /></div>
                                </div>
                                <span className={ej(eA,eN,eR,"w-16 shrink-0")}>{_}</span>
                                <span className={ej(e$,"w-16 shrink-0 justify-end")}><eB value={o.deltas[a]} /></span>
                              </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}
