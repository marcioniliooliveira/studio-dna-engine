/**
 * React Bits Pro — Application UI (analytics-3 (Sorbet))
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

let B = (...e)=>e.filter(Boolean).join(" ");

let U = "text-neutral-900 dark:text-neutral-100";

let W = "text-neutral-900/62 dark:text-neutral-100/62";

let P = "text-[13px]/[16px] font-semibold tabular-nums";

let O = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let T = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let q = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]";

let H = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let I = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]";

let K = (e,a,t)=>Math.min(t,Math.max(a,e));

function Q({value:e}){
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

function J({outlined:e,inverse:a=false}){
  return (
    <svg aria-hidden="true" viewBox="0 0 8 8" className="inline-block size-2.5 shrink-0 rounded-full">
        {e?a?<rect x={.5} y={.5} width={7} height={7} fill="none" stroke="currentColor" strokeWidth={1} />:<rect x={.5} y={.5} width={7} height={7} strokeWidth={1} className={B(I,H)} />:a?<rect width={8} height={8} fill="currentColor" />:<rect width={8} height={8} className={q} />}
      </svg>
  );
}

let V = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let G = [3120,2980,3340,3610,3180,2890,2760,3050,3480,3720,3910,3540];

let X = [2740,2610,2880,3020,2950,2680,2510,2790,3010,3180,3260,3040];

let Y = [{id:"current",label:"This year",values:G,barClass:q,outlined:false},{id:"prior",label:"Last year",values:X,barClass:B(I,H),outlined:true}];


export default function analytics_3__Sorbet__Component(){
  let[e,a]=function(){
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
  }(),[t,n]=useState(null),[s,i]=useState(11),[o,c]=useState({current:true,prior:true}),d=a.width,x=Math.max(d-34-1,1),_=250,u=V.length,h=useMemo(()=>G.reduce((e,a)=>e+a,0), []),p=useMemo(()=>X.reduce((e,a)=>e+a,0), []),b=(h-p)/p*100,m=useMemo(()=>Math.max(...G), []),k=Math.round(h/u),{top:f,ticks:g}=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let t=e/a,r=10**Math.floor(Math.log10(t)),l=t/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...G,...X)), []),v=x/u,w=.72*v,y=Math.max((w-3)/2,1),j=useCallback(e=>34+e*v, [v]),N=useCallback(e=>10+_-e/f*_, [_,f]),M=Math.ceil(u/7),A=null===t?h:G[t],S=null===t?b:(G[t]-X[t])/X[t]*100,$=(G[s]-X[s])/X[s]*100;
  return (
    <div className={B("bg-white dark:bg-neutral-950",U,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={B("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={B("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={B(O,"flex flex-wrap gap-x-2")}>
                    <span>Ticket volume</span>
                    <span className={W}>{null===t?"This year":V[t]}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={B("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",U)} style={{minWidth:"6ch"}}>{A.toLocaleString("en-US")}</p>
                    <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                      <Q value={S} />
                      <span className={W}>{null===t?"vs last year":"YoY"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {Y.map(e=>{
                    let a=o[e.id];
                    return (
                      <button key={e.id} type="button" aria-pressed={a} onClick={()=>c(a=>{
                                        let t={...a,[e.id]:!a[e.id]};
                                        return t.current||t.prior?t:a;
                                      })} className="flex h-8 min-w-0 cursor-pointer items-center gap-2 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-[pressed=false]:text-neutral-900/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:aria-[pressed=false]:text-neutral-100/45">
                                        <span className={B("inline-flex",a?"opacity-100":"opacity-40")}><J outlined={e.outlined} /></span>
                                        {e.label}
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`Ticket volume by month, this year versus last year. This year total ${h.toLocaleString("en-US")} tickets.`} onPointerMove={a=>(a=>{
                let t=e.current;
                if(!t)return;
                let r=K(Math.floor((a-t.getBoundingClientRect().left-34)/v),0,u-1);
                n(r),i(r)
              })(a.clientX)} onPointerLeave={()=>n(null)} onBlur={()=>n(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let a=K((t??u-1)+("ArrowLeft"===e.key?-1:1),0,u-1);
                  n(a),i(a)
                }
                "Home"===e.key&&(n(0),i(0)),"End"===e.key&&(n(u-1),i(u-1)),"Escape"===e.key&&n(null)
              }} style={{height:280,touchAction:"pan-y"}} className={B("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-4 cursor-crosshair")}>
                {d>0&&<svg width={d} height={280} className="overflow-visible">
                  {g.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={d-1} y1={N(e)} y2={N(e)} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} />
                                    <text x={0} y={N(e)} dy={-4} className={T}>
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {null!==t&&<rect x={j(t)} y={10} width={v} height={_} className={I} />}
                  {V.map((e,a)=>a%M==0?<text key={e} x={j(a)+v/2} y={276} textAnchor="middle" className={T}>{e}</text>:null)}
                  {V.map((e,a)=>{
                    let l=j(a)+(v-w)/2,n=null!==t&&t!==a;
                    return (
                      <g key={a}>
                                        {Y.map((e,t)=>{
                                          let s=e.values[a]/f*_,i=o[e.id];
                                          return (
                                            <path key={e.id} d={function(e,a,t,r,l){
                                                                  if(r<=0||t<=0)return "";
                                                                  let n=Math.min(2,t/2,r);
                                                                  return `M${e},${a+r} L${e},${a+n} Q${e},${a} ${e+n},${a} L${e+t-n},${a} Q${e+t},${a} ${e+t},${a+n} L${e+t},${a+r} Z`;
                                                                }(l+t*(y+3),10+_-s,y,s,0)} strokeWidth={1} className={B(e.barClass,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]")} style={{opacity:!i||n?.4:1}} />
                                          );
                                        })}
                                      </g>
                    );
                  })}
                  <line x1={34} x2={d-1} y1={10+_} y2={10+_} shapeRendering="crispEdges" className="stroke-neutral-900/12 dark:stroke-neutral-100/14" strokeWidth={1} />
                </svg>}
                {d>0&&<div aria-hidden="true" style={{left:K(j(s)+v/2,72,Math.max(d-72,72)),top:4}} className={B("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={B(P,"whitespace-nowrap")}>{V[s]}</p>
                  <div className="space-y-0.5">
                    {Y.map(e=>(
                      <div key={e.id} className="flex items-center justify-between gap-4">
                                        <span className={B(P,"flex items-center gap-1.5 whitespace-nowrap")}>
                                          <J outlined={e.outlined} inverse />
                                          {e.label}
                                        </span>
                                        <span className="whitespace-nowrap">{e.values[s].toLocaleString("en-US")}</span>
                                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 pt-0.5">
                      <span className={B(P,"whitespace-nowrap")}>YoY</span>
                      <span className="whitespace-nowrap">
                        {$>=0?"+":"−"}
                        {Math.abs($).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {[{label:"This year total",value:h.toLocaleString("en-US"),unit:""},{label:"Monthly average",value:k.toLocaleString("en-US"),unit:""},{label:"Busiest month",value:m.toLocaleString("en-US"),unit:"Nov"}].map(e=>(
                <div key={e.label} className={B("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","rounded-[var(--rb-r-4xl,18px)]","ps-3 pe-3")}>
                            <p className={B(O,"truncate")}>{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.value}
                              {e.unit&&<span className="ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78">{e.unit}</span>}
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
