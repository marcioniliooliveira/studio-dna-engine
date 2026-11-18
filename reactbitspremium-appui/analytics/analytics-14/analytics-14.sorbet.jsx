/**
 * React Bits Pro — Application UI (analytics-14 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, left, observe, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_37576 = [["path",{d:"M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900 dark:text-neutral-100";

let k = "text-neutral-900/62 dark:text-neutral-100/62";

let f = "text-[14px]/[20px] font-medium";

let g = (e,a,t)=>Math.min(t,Math.max(a,e));

let v = ["Week","Month","Quarter"];

let w = {Week:7,Month:30,Quarter:13};

let y = {Week:"day",Month:"day",Quarter:"week"};

let j = [{id:"active",label:"Active teams",icon:Icon_88366,base:8420,drift:.041,seed:1.2},{id:"invited",label:"Seats invited",icon:Icon_44647,base:1245,drift:-.018,seed:3.4},{id:"sessions",label:"Sessions",icon:Icon_57466,base:64800,drift:.027,seed:5.1},{id:"duration",label:"Median session",icon:Icon_37576,base:412,drift:.004,seed:7.9}];

function N({value:e}){
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

function M({data:e,active:a,onActiveChange:t,label:o}){
  let[c,d]=function(){
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
  }(),x=Math.min(...e),_=Math.max(...e),u=.18*(_-x||1),h=useCallback(a=>a/(e.length-1)*Math.max(d.width-2,1)+1, [e.length,d.width]),p=useCallback(e=>41-(e-x+u)/(_-x+2*u)*38, [_,x,u]),m=line().x((e,a)=>h(a)).y(e=>p(e)).curve(s.G)(e)??"",k=area().x((e,a)=>h(a)).y0(44).y1(e=>p(e)).curve(s.G)(e)??"";
  return (
    <div ref={c} role="img" aria-label={`${o} trend, ${e.length} points`} tabIndex={0} onPointerMove={a=>(a=>{
        let r=c.current;
        if(!r)return;
        let l=r.getBoundingClientRect(),n=width/(e.length-1);
        t(g(Math.round((a-left)/n),0,e.length-1))
      })(a.clientX)} onPointerLeave={()=>t(null)} onBlur={()=>t(null)} onKeyDown={r=>{
        ("ArrowLeft"===r.key||"ArrowRight"===r.key)&&(r.preventDefault(),t(g((a??e.length-1)+("ArrowLeft"===r.key?-1:1),0,e.length-1))),"Escape"===r.key&&t(null)
      }} style={{touchAction:"pan-y"}} className={b("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative -mx-1 h-11 cursor-crosshair px-1")}>
        {d.width>0&&<svg width={d.width} height={44} className="overflow-visible">
          <path d={k} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
          <path d={m} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
          {null!==a&&<rect x={h(a)-4} y={p(e[a])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />}
        </svg>}
      </div>
  );
}

let A = (...e)=>e.filter(Boolean).join(" ");

let S = "text-neutral-900 dark:text-neutral-100";

let $ = "text-neutral-900/62 dark:text-neutral-100/62";

let R = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let L = "inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78";

let D = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let tS = (...e)=>e.filter(Boolean).join(" ");

let t$ = "text-neutral-900 dark:text-neutral-100";

let tR = "text-neutral-900/62 dark:text-neutral-100/62";

let tL = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]";

let tD = "text-[14px]/[20px] font-medium";

let tC = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let tz = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let tE = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]";

let tF = (e,a,t)=>Math.min(t,Math.max(a,e));

let tB = (e,a)=>.5*Math.sin(.9*a+e)+.32*Math.sin(.31*a+1.7*e);

let tU = ["All","Growth","Enterprise"];

let tW = ["Northwind Labs","Contoso Retail","Acme Freight","Meridian Health","Lumen Studios","Fabrikam","Cobalt Systems","Redwood Capital","Tallgrass Foods","Aperture Robotics","Vector Logistics","Beacon Insurance","Halcyon Media","Ironclad Security","Solstice Energy","Palisade Bank","Driftwood Travel","Quill Publishing","Verdant Farms","Sable & Co","Anvil Manufacturing","Cirrus Airlines","Marlowe Legal","Petra Ceramics","Onyx Telecom","Wexford Textiles"].map((e,a)=>{
  let t=tF(Math.round(20+(tB(1.1,a)+.9)*150),6,320),r=tF(Math.round(60+42*tB(3.3,a)),12,96),l=tF(Math.round(t*(430+260*tB(5.2,a))),4e3,19e4);
  return {i:a,name:e,seats:t,usage:r,acv:l,tier:l>=62e3?"Enterprise":"Growth"};
});

let tP = Math.min(...tW.map(e=>e.acv));

let tO = Math.max(...tW.map(e=>e.acv));

function tT(e){
  return 5+(Math.sqrt(e)-Math.sqrt(tP))/(Math.sqrt(tO)-Math.sqrt(tP)||1)*17;
}

let tq = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=t.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?t.length-1:(r+a+t.length)%t.length;
  t[l].focus(),t[l].click()
};


export default function analytics_14__Sorbet__Component(){
  let[e,a]=useState("All"),[t,n]=useState(null),[s,i]=useState(0),[o,c]=function(){
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
  }(),d=useMemo(()=>tW.filter(a=>"All"===e||a.tier===e), [e]),x=useMemo(()=>[...d].sort((e,a)=>a.acv-e.acv), [d]),_=useMemo(()=>(function(e){
    if(0===e.length)return 0;
    let a=[...e].sort((e,a)=>e-a),t=Math.floor(a.length/2);
    return a.length%2?a[t]:Math.round((a[t-1]+a[t])/2);
  })(d.map(e=>e.seats)), [d]),u=c.width,h=Math.max(u-40-16,1),p=328,b=Math.max(...tW.map(e=>e.seats)),{top:m,ticks:k}=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let t=e/a,r=10**Math.floor(Math.log10(t)),l=t/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(b), [b]),f=useCallback(e=>40+e/m*h, [h,m]),g=useCallback(e=>16+p-e/100*p, [p]),v=e=>e.seats>_&&e.usage<65,w=d.filter(v).length,y=null===t?null:tW.find(e=>e.i===t)??null,j=tW[s],N=g(j.usage),M=tT(j.acv),A=N-M-62,S=A>=0?A:Math.min(N+M+8,314),$=tT(2e4),R=tT(1e5),L=e=>{
    if(0===x.length)return;
    let a=x.map(e=>e.i),r=null===t?-1:a.indexOf(t),l=-1===r?e>0?0:a.length-1:tF(r+e,0,a.length-1);
    n(a[l]),i(a[l])
  },D=u>0?[{text:"Healthy",x:44,y:28,anchor:"start"},{text:"Expand",x:u-16-4,y:28,anchor:"end"},{text:"Watch",x:44,y:16+p-6,anchor:"start"},{text:"At risk",x:u-16-4,y:16+p-6,anchor:"end"}]:[];
  return (
    <div className={tS("bg-white dark:bg-neutral-950",t$,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={tS("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={tS("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className={tS("text-[17px]/[22px] font-extrabold",t$)}>Account health</h2>
                  <p className={tS(tD,tR,"mt-0.5 truncate")}>Seats against weekly active usage, sized by contract value.</p>
                </div>
                <div role="radiogroup" aria-label="Plan tier" onKeyDown={tq} className={tS("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                  {tU.map(t=>(
                    <button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>{
                                    a(t),n(null)
                                  }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{t}</button>
                  ))}
                </div>
              </div>
              <p className={tS(tD,tR,"mt-2 flex flex-wrap gap-x-6 gap-y-1")}>
                <span>
                  <span className={tS(t$,"tabular-nums")}>{d.length}</span>
                  {" "}
                  accounts
                </span>
                <span>
                  <span className={tS(t$,"tabular-nums")}>{w}</span>
                  {" "}
                  at risk
                </span>
                <span>
                  Median
                  {" "}
                  <span className={tS(t$,"tabular-nums")}>{_}</span>
                  {" "}
                  seats
                </span>
              </p>
              <div ref={o} role="img" tabIndex={0} aria-label={y?`${y.name}: ${y.seats} seats, ${y.usage}% weekly active, $${y.acv.toLocaleString("en-US")} contract value${v(y)?", at risk":""}`:`Account health scatter, ${d.length} accounts. Arrow keys step through accounts by contract value.`} onPointerMove={e=>((e,a)=>{
                let t=o.current;
                if(!t)return;
                let r=t.getBoundingClientRect(),l=e-r.left,s=a-r.top,c=-1,x=1/0;
                for(let e of d){
                  let a=Math.hypot(f(e.seats)-l,g(e.usage)-s)-tT(e.acv);
                  a<x&&(x=a,c=e.i)
                }
                c>=0&&x<=12?(n(c),i(c)):n(null)
              })(e.clientX,e.clientY)} onPointerLeave={()=>n(null)} onBlur={()=>n(null)} onKeyDown={e=>{
                "ArrowRight"===e.key||"ArrowDown"===e.key?(e.preventDefault(),L(1)):"ArrowLeft"===e.key||"ArrowUp"===e.key?(e.preventDefault(),L(-1)):"Home"===e.key?(e.preventDefault(),x.length&&(n(x[0].i),i(x[0].i))):"End"===e.key?(e.preventDefault(),x.length&&(n(x[x.length-1].i),i(x[x.length-1].i))):"Escape"===e.key&&n(null)
              }} style={{height:372,touchAction:"pan-y"}} className={tS("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-3 cursor-crosshair")}>
                {u>0&&<svg width={u} height={372} className="overflow-visible">
                  {[0,25,50,75,100].map(e=>(
                    <g key={`hy-${e}`}>
                                    <line x1={40} x2={u-16} y1={g(e)} y2={g(e)} shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/12 dark:stroke-neutral-100/14":"stroke-neutral-900/6 dark:stroke-neutral-100/8"} strokeWidth={1} />
                                    <text x={0} y={g(e)} dy={-4} className={tC}>
                                      {e}
                                      %
                                    </text>
                                  </g>
                  ))}
                  {k.map(e=>0===e?null:<text key={`xl-${e}`} x={f(e)} y={368} textAnchor="middle" className={tC}>
                    {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                  </text>)}
                  <line x1={f(_)} x2={f(_)} y1={16} y2={16+p} strokeDasharray="6 4" className={tz} strokeWidth={1} />
                  <line x1={40} x2={u-16} y1={g(65)} y2={g(65)} strokeDasharray="6 4" className={tz} strokeWidth={1} />
                  {D.map(e=><text key={e.text} x={e.x} y={e.y} textAnchor={e.anchor} className={tC}>{e.text}</text>)}
                  <g>
                    {d.map(e=>{
                      let a=v(e);
                      return <circle key={e.i} cx={f(e.seats)} cy={g(e.usage)} r={tT(e.acv)} fillOpacity={t===e.i?1:.55} stroke="currentColor" strokeWidth={1.5*!!a} className={tS(tE,a&&tL)} />;
                    })}
                  </g>
                  {y&&<circle cx={f(y.seats)} cy={g(y.usage)} r={tT(y.acv)+3} fill="none" strokeWidth={2} className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />}
                </svg>}
                {u>0&&<div aria-hidden="true" style={{left:tF(f(j.seats),88,Math.max(u-88,88)),top:S}} className={tS("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={tS("text-[13px]/[16px] font-semibold tabular-nums","whitespace-nowrap")}>{j.name}</p>
                  <p className="flex gap-2 whitespace-nowrap">
                    <span>
                      {j.seats.toLocaleString("en-US")}
                      {" seats"}
                    </span>
                    <span>
                      {j.usage}
                      % active
                    </span>
                    <span>
                      $
                      {j.acv.toLocaleString("en-US")}
                    </span>
                  </p>
                </div>}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2">
              <div className={tS(tD,tR,"flex items-center gap-3")}>
                <span>Contract value</span>
                <span className="flex items-center gap-1.5">
                  <svg width={Math.ceil(2*$)} height={24} className="shrink-0 overflow-visible" aria-hidden="true"><circle cx={$} cy={12} r={$} fillOpacity={.55} className={tE} /></svg>
                  <span className="tabular-nums">$20k</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width={Math.ceil(2*R)} height={Math.ceil(2*R)} className="shrink-0 overflow-visible" aria-hidden="true"><circle cx={R} cy={R} r={R} fillOpacity={.55} className={tE} /></svg>
                  <span className="tabular-nums">$100k</span>
                </span>
              </div>
              <div className={tS(tD,tR,"flex items-center gap-1.5")}>
                <svg width={10} height={10} className="shrink-0 overflow-visible" aria-hidden="true">
                  <circle cx={5} cy={5} r={4.25} fill="none" stroke="currentColor" strokeWidth={1.5} className={tL} />
                </svg>
                {"At risk: below "}
                65
                % usage above median seats
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
