/**
 * React Bits Pro — Application UI (analytics-9 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_37576 = [["path",{d:"M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_33126 = [["path",{d:"M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 7L5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"5",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"19",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"5",cy:"19",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let k = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[14px]/[20px] font-medium";

let g = (e,a,t)=>Math.min(t,Math.max(a,e));

let v = ["Week","Month","Quarter"];

let w = {Week:7,Month:30,Quarter:13};

let y = {Week:"day",Month:"day",Quarter:"week"};

let j = [{id:"active",label:"Active teams",icon:Icon_88366,base:8420,drift:.041,seed:1.2},{id:"invited",label:"Seats invited",icon:Icon_44647,base:1245,drift:-.018,seed:3.4},{id:"sessions",label:"Sessions",icon:Icon_57466,base:64800,drift:.027,seed:5.1},{id:"duration",label:"Median session",icon:Icon_37576,base:412,drift:.004,seed:7.9}];

let an = (...e)=>e.filter(Boolean).join(" ");

let as = "text-neutral-900 dark:text-neutral-100";

let ai = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let ao = "text-[13px]/[16px] font-semibold tabular-nums";

let ac = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let ad = (e,a,t)=>Math.min(t,Math.max(a,e));

let ax = (e,a)=>.5*Math.sin(.9*a+e)+.32*Math.sin(.31*a+1.7*e);

let a_ = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let au = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

let ah = Date.UTC(2024,10,4);

function ap(e){
  return new Date(ah+864e5*e);
}

let ab = [{id:"deploys",label:"Deployments",noun:"deployments",build:e=>{
  let a=e%7>=5,t=Math.max(0,(ax(1.3,e)+.62)*7);
  return Math.round(a?.24*t:t);
}},{id:"incidents",label:"Incidents",noun:"incidents",build:e=>Math.max(0,Math.round((ax(4.7,e)-.46)*13))},{id:"reviews",label:"Reviews",noun:"reviews",build:e=>{
  let a=e%7>=5,t=Math.max(0,(ax(6.1,e)+.7)*9);
  return Math.round(a?.42*t:t);
}}];

let am = ["fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]","text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_38%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_30%,transparent)]","text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_62%,transparent)] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_48%,transparent)]","text-[var(--rb-accent,oklch(84%_0.15_165))] dark:text-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_72%,transparent)]","text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]"];


export default function analytics_9__Sorbet__Component(){
  let[e,a]=useState(ab[0]),[t,n]=useState(null),[s,i]=useState({col:25,row:6}),[c,d]=function(){
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
  }(),x=useMemo(()=>Array.from({length:182},(a,t)=>e.build(t)), [e]),_=useMemo(()=>{
    let a=Math.max(...x,1),t=x.reduce((e,a)=>e+a,0),r=0;
    for(let e=1;e<182;e++)x[e]>x[r]&&(r=e);
    let l=0,n="incidents"===e.id;
    for(let e=181;e>=0;e--){
      let a=x[e]>0;
      if(n?a:!a)break;
      l++
    }
    return {max:a,total:t,peakDay:r,streak:l,incidentMode:n};
  }, [x,e]),u=useMemo(()=>{
    let e=[],a=-1,t=-3;
    for(let r=0;r<26;r++){
      let l=ap(7*r).getUTCMonth();
      l!==a&&r-t>=3&&(e.push({col:r,name:a_[l]}),t=r),a=l
    }
    return e;
  }, []),h=d.width,p=h>0?Math.floor((h-30-75)/26):0,b=p+3,m=18+7*p+18,k=(e,a)=>{
    let t=ap(7*e+a);
    return `${au[a]}, ${t.getUTCDate()} ${a_[t.getUTCMonth()]}`;
  },f=null===t?0:x[7*t.col+t.row],g=18+s.row*b-60,v=g>=0?g:18+s.row*b+p+6,w=k(Math.floor(_.peakDay/7),_.peakDay%7),y=null===t?`${e.label} heatmap, ${_.total.toLocaleString("en-US")} ${e.noun} over the last 26 weeks. Use arrow keys to inspect a day.`:`${0===f?`No ${e.noun}`:`${f} ${1===f?e.noun.replace(/s$/,""):e.noun}`} on ${k(t.col,t.row)}`,j=e=>{
    a(e),n(null)
  };
  return (
    <div className={an("bg-white dark:bg-neutral-950",as,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={an("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={an("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className={an("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","flex items-center gap-1.5")}>
                    <HugeiconsIcon icon={Icon_33126} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                    {e.label}
                  </div>
                  <p className={an("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",as,"mt-1")}>{_.total.toLocaleString("en-US")}</p>
                  <p className={an("text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62","mt-1 flex min-w-0 gap-2 truncate")}>
                    <span className="min-w-0 truncate">
                      {"Busiest "}
                      {w}
                      {" ("}
                      {x[_.peakDay].toLocaleString("en-US")}
                      )
                    </span>
                    <span className="shrink-0">
                      <span className="text-right tabular-nums">{_.streak}</span>
                      {_.incidentMode?"-day incident-free streak":"-day active streak"}
                    </span>
                  </p>
                </div>
                <div role="radiogroup" aria-label="Metric" onKeyDown={a=>{
                  var t,r,l;
                  let n;
                  return t=ab.length,r=ab.findIndex(a=>a.id===e.id),l=e=>j(ab[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(r+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(r-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={an("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                  {ab.map(a=><button key={a.id} type="button" role="radio" aria-checked={a.id===e.id} tabIndex={a.id===e.id?0:-1} onClick={()=>j(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a.label}</button>)}
                </div>
              </div>
              <div ref={c} role="img" tabIndex={0} aria-label={y} onPointerMove={e=>((e,a)=>{
                let t=c.current;
                if(!t||p<=0)return;
                let r=t.getBoundingClientRect(),l=ad(Math.floor((e-r.left-30)/b),0,25),s=ad(Math.floor((a-r.top-18)/b),0,6);
                n({col:l,row:s}),i({col:l,row:s})
              })(e.clientX,e.clientY)} onPointerLeave={()=>n(null)} onBlur={()=>n(null)} onKeyDown={e=>{
                let a=t??{col:25,row:6},r=null;
                if("ArrowLeft"===e.key)r={...a,col:a.col-1};else if("ArrowRight"===e.key)r={...a,col:a.col+1};else if("ArrowUp"===e.key)r={...a,row:a.row-1};else if("ArrowDown"===e.key)r={...a,row:a.row+1};else if("Home"===e.key)r={col:0,row:a.row};else if("End"===e.key)r={col:25,row:a.row};else if("Escape"===e.key)return void n(null);
                if(!r)return;
                e.preventDefault();
                let l={col:ad(r.col,0,25),row:ad(r.row,0,6)};
                n(l),i(l)
              }} style={{height:m,touchAction:"pan-y"}} className={an("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-4 cursor-pointer")}>
                {h>0&&p>0&&<svg width={h} height={m} className="overflow-visible">
                  {u.map(e=><text key={e.name+e.col} x={30+e.col*b} y={10} className={ac}>{e.name}</text>)}
                  {[0,2,4].map(e=><text key={e} x={0} y={18+e*b+p/2} dy={3} className={ac}>{au[e]}</text>)}
                  {x.map((e,a)=>{
                    var t;
                    let l=Math.floor(a/7),n=(t=_.max,e<=0?0:ad(1+Math.round(e/(t||1)*3),1,4)),s=_.incidentMode&&4===n;
                    return <rect key={a} x={30+l*b} y={18+a%7*b} width={p} height={p} rx={2} fill="currentColor" className={s?ai:am[n]} />;
                  })}
                  {null!==t&&<rect x={30+t.col*b-.5} y={18+t.row*b-.5} width={p+1} height={p+1} rx={2.5} fill="none" strokeWidth={1} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />}
                </svg>}
                {h>0&&p>0&&<div aria-hidden="true" style={{left:ad(30+s.col*b+p/2,72,Math.max(h-72,72)),top:v}} className={an("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className="whitespace-nowrap">
                    {0===x[7*s.col+s.row]?`No ${e.noun}`:`${x[7*s.col+s.row].toLocaleString("en-US")} ${1===x[7*s.col+s.row]?e.noun.replace(/s$/,""):e.noun}`}
                  </p>
                  <p className={an(ao,"whitespace-nowrap")}>{k(s.col,s.row)}</p>
                </div>}
              </div>
              <div className={an(ao,"text-neutral-900/62 dark:text-neutral-100/62","mt-3 flex items-center justify-end gap-1.5")}>
                <span>Less</span>
                {am.map((e,a)=>(
                  <svg key={a} aria-hidden="true" width={10} height={10} viewBox="0 0 10 10" className="shrink-0">
                                <rect width={10} height={10} rx={2} fill="currentColor" className={_.incidentMode&&a===am.length-1?ai:e} />
                              </svg>
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
