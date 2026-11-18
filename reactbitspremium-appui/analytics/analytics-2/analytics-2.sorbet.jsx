/**
 * React Bits Pro — Application UI (analytics-2 (Sorbet))
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

let C = (e,a,t)=>Math.min(t,Math.max(a,e));

function z({value:e}){
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

let E = ["7D","30D","12M"];

let F = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let B = (...e)=>e.filter(Boolean).join(" ");

let U = "text-neutral-900 dark:text-neutral-100";

let W = "text-neutral-900/62 dark:text-neutral-100/62";

let P = "text-[13px]/[16px] font-semibold tabular-nums";

let O = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let T = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";


export default function analytics_2__Sorbet__Component(){
  let[e,a]=useState("30D"),[t,o]=useState(null),[c,d]=useState(0),[x,_]=function(){
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
  }(),{values:u,labels:h}=useMemo(()=>(function(e){
    let{count:a,base:t,drift:r}={"7D":{count:7,base:41200,drift:.14},"30D":{count:30,base:36800,drift:.31},"12M":{count:12,base:268e3,drift:.72}}[e];
    return {values:Array.from({length:a},(e,l)=>Math.round(t*(1+l/(a-1)*r)*(1+.085*(.5*Math.sin(.7*l+2.4)+.34*Math.sin(.23*l+5.04)+.12*Math.sin(1.9*l+1.44))))),labels:Array.from({length:a},(a,t)=>"12M"===e?F[t]:"7D"===e?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][t]:`Jun ${t+1}`)};
  })(e), [e]),p=_.width,b=Math.max(p-36-1,1),m=202,{top:k,ticks:f}=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let t=e/a,r=10**Math.floor(Math.log10(t)),l=t/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...u)), [u]),g=useCallback(e=>36+e/(u.length-1)*b, [b,u.length]),v=useCallback(e=>10+m-e/k*m, [m,k]),w=line().x((e,a)=>g(a)).y(e=>v(e)).curve(s.G)(u)??"",y=area().x((e,a)=>g(a)).y0(10+m).y1(e=>v(e)).curve(s.G)(u)??"",j=u[u.length-1],N=null===t?j:u[t],M=(j-u[0])/u[0]*100,B=C(Math.floor(b/56),2,7),U=Math.ceil(u.length/B),W=Math.max(...u),P=Math.min(...u),O=Math.round(u.reduce((e,a)=>e+a,0)/u.length),T=e=>{
    a(e),o(null),d(0)
  };
  return (
    <div className={A("bg-white dark:bg-neutral-950",S,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={A("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={A("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={R}>Net revenue</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={A("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",S)}>
                      $
                      {N.toLocaleString("en-US")}
                    </p>
                    {null===t?<p className={L}>
                      <z value={M} />
                      <span className={$}>
                        {"over "}
                        {"12M"===e?"12 months":`${e} period`}
                      </span>
                    </p>:<p className={L}><span className={$}>{h[t]}</span></p>}
                  </div>
                </div>
                <div role="radiogroup" aria-label="Range" onKeyDown={a=>{
                  var t,r,l;
                  let n;
                  return t=E.length,r=E.indexOf(e),l=e=>T(E[e]),void(!((n="ArrowRight"===a.key||"ArrowDown"===a.key?(r+1)%t:"ArrowLeft"===a.key||"ArrowUp"===a.key?(r-1+t)%t:"Home"===a.key?0:"End"===a.key?t-1:-1)<0)&&(a.preventDefault(),l(n),a.currentTarget.querySelectorAll('[role="radio"]')[n]?.focus()));
                }} className={A("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                  {E.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} tabIndex={a===e?0:-1} onClick={()=>T(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
                </div>
              </div>
              <div ref={x} role="img" tabIndex={0} aria-label={`Net revenue over the last ${e}. Latest ${j.toLocaleString("en-US")} dollars.`} onPointerMove={e=>(e=>{
                let a=x.current;
                if(!a)return;
                let t=a.getBoundingClientRect(),r=b/(u.length-1),l=C(Math.round((e-t.left-36)/r),0,u.length-1);
                o(l),d(l)
              })(e.clientX)} onPointerLeave={()=>o(null)} onBlur={()=>o(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let a=C((t??u.length-1)+("ArrowLeft"===e.key?-1:1),0,u.length-1);
                  o(a),d(a)
                }
                "Home"===e.key&&(o(0),d(0)),"End"===e.key&&(o(u.length-1),d(u.length-1)),"Escape"===e.key&&o(null)
              }} style={{height:232,touchAction:"pan-y"}} className={A("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-4 cursor-crosshair")}>
                {p>0&&<svg width={p} height={232} className="overflow-visible">
                  {f.map(e=>(
                    <g key={e}>
                                    <line x1={36} x2={p-1} y1={v(e)} y2={v(e)} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} />
                                    <text x={0} y={v(e)} dy={-4} className={D}>
                                      $
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {h.map((e,a)=>a%U==0?<text key={e} x={g(a)} y={228} textAnchor={0===a?"start":a===u.length-1?"end":"middle"} className={D}>{e}</text>:null)}
                  <path d={y} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                  <path d={w} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
                  {null!==t&&<g>
                    <line x1={g(t)} x2={g(t)} y1={10} y2={10+m} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />
                    <rect x={g(t)-4} y={v(u[t])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />
                  </g>}
                </svg>}
                {p>0&&<div aria-hidden="true" style={{left:C(g(c),72,Math.max(p-72,72)),top:C(v(u[c]??0)-64,0,164)}} className={A("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={A("text-[13px]/[16px] font-semibold tabular-nums","whitespace-nowrap")}>{h[c]}</p>
                  <p className="whitespace-nowrap">
                    $
                    {(u[c]??0).toLocaleString("en-US")}
                  </p>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"Peak",value:W},{label:"Daily average",value:O},{label:"Lowest",value:P}].map(e=>(
                <div key={e.label} className={A("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","rounded-[var(--rb-r-4xl,18px)]","ps-3 pe-3")}>
                            <p className={A(R,"truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              $
                              {e.value.toLocaleString("en-US")}
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
