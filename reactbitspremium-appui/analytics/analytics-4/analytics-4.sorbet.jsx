/**
 * React Bits Pro — Application UI (analytics-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { line } from 'd3-shape';

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

let Z = (...e)=>e.filter(Boolean).join(" ");

let ee = "text-neutral-900 dark:text-neutral-100";

let ea = "text-neutral-900/62 dark:text-neutral-100/62";

let et = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let er = "text-[13px]/[16px] font-semibold tabular-nums";

let el = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let en = "ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78";

let es = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let ei = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let eo = (e,a,t)=>Math.min(t,Math.max(a,e));

function ec({value:e}){
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

function ed({stroke:e,dash:a,inverse:t=false}){
  return (
    <svg aria-hidden="true" width={12} height={8} viewBox="0 0 12 8" className="shrink-0">
        <line x1={0} x2={12} y1={4} y2={4} strokeWidth={2} strokeDasharray={a} stroke={t?"currentColor":undefined} className={t?undefined:e} />
      </svg>
  );
}

let ex = [60,54,49,50,51,53,61,67,66,66,64,58,55,58,60,62,68,68,62,58,54,48,48,53,56,58,61,59,52,50];

let e_ = [257,273,283,261,237,227,211,203,223,241,240,243,237,208,189,192,194,204,236,254,249,248,241,218,213,232,243,257,280,280];

let eu = Array.from({length:30},(e,a)=>`Apr ${a+1}`);

let eh = [{id:"p50",label:"p50",values:ex,stroke:"stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]",dash:undefined},{id:"p90",label:"p90",values:[147,137,143,153,155,159,162,149,134,130,127,126,140,154,155,157,157,144,136,142,147,153,169,178,171,165,158,144,139,147],stroke:ei,dash:undefined},{id:"p99",label:"p99",values:e_,stroke:ei,dash:"6 4"}];


export default function analytics_4__Sorbet__Component(){
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
  }(),[t,i]=useState(null),[o,c]=useState(e_.length-1),[d,x]=useState({p50:true,p90:true,p99:true}),_=a.width,u=Math.max(_-34-1,1),h=206,p=ex.length,b=eh.filter(e=>d[e.id]),{top:m,ticks:k}=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let t=e/a,r=10**Math.floor(Math.log10(t)),l=t/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(250,...b.flatMap(e=>e.values))), [b]),f=useCallback(e=>34+e/(p-1)*u, [u,p]),g=useCallback(e=>10+h-e/m*h, [h,m]),v=Math.ceil(p/eo(Math.floor(u/56),2,7)),w=e_.indexOf(Math.min(...e_)),y=e_[p-1],j=null===t?y:e_[t];
  return (
    <div className={Z("bg-white dark:bg-neutral-950",ee,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={Z("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={Z("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
            <div className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={Z(el,"flex flex-wrap gap-x-2")}>
                    <span>p99 latency</span>
                    <span className={ea}>{null===t?"Latest":eu[t]}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                    <p className={Z("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",ee,"flex items-baseline gap-x-1")}>
                      {j}
                      <span className={en}>ms</span>
                    </p>
                    <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                      <ec value={(j-250)/250*100} />
                      <span className={ea}>vs SLO</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {eh.map(e=>{
                    let a=d[e.id];
                    return (
                      <button key={e.id} type="button" aria-pressed={a} onClick={()=>x(a=>{
                                        let t={...a,[e.id]:!a[e.id]};
                                        return t.p50||t.p90||t.p99?t:a;
                                      })} className="flex h-8 min-w-0 cursor-pointer items-center gap-2 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-[pressed=false]:text-neutral-900/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:aria-[pressed=false]:text-neutral-100/45">
                                        <span className={Z("inline-flex",a?"opacity-100":"opacity-40")}><ed stroke={e.stroke} dash={e.dash} /></span>
                                        {e.label}
                                      </button>
                    );
                  })}
                </div>
              </div>
              <div ref={e} role="img" tabIndex={0} aria-label={`API latency percentiles over 30 days. Latest p99 ${y} milliseconds against a 250 millisecond SLO.`} onPointerMove={a=>(a=>{
                let t=e.current;
                if(!t)return;
                let r=t.getBoundingClientRect(),l=u/(p-1),n=eo(Math.round((a-r.left-34)/l),0,p-1);
                i(n),c(n)
              })(a.clientX)} onPointerLeave={()=>i(null)} onBlur={()=>i(null)} onKeyDown={e=>{
                if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                  e.preventDefault();
                  let a=eo((t??p-1)+("ArrowLeft"===e.key?-1:1),0,p-1);
                  i(a),c(a)
                }
                "Home"===e.key&&(i(0),c(0)),"End"===e.key&&(i(p-1),c(p-1)),"Escape"===e.key&&i(null)
              }} style={{height:236,touchAction:"pan-y"}} className={Z("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-4 cursor-crosshair")}>
                {_>0&&<svg width={_} height={236} className="overflow-visible">
                  {k.map(e=>(
                    <g key={e}>
                                    <line x1={34} x2={_-1} y1={g(e)} y2={g(e)} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} />
                                    <text x={0} y={g(e)} dy={-4} className={es}>
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  {eu.map((e,a)=>a%v==0?<text key={e} x={f(a)} y={232} textAnchor={0===a?"start":a===p-1?"end":"middle"} className={es}>{e}</text>:null)}
                  {m>=250&&<g>
                    <line x1={34} x2={_-1} y1={g(250)} y2={g(250)} strokeDasharray="4 4" stroke="currentColor" className={et} strokeWidth={1} />
                    <text x={eo(f(w),70,_-1-36)} y={g(250)} dy={-6} textAnchor="middle" className={es}>
                      {"SLO "}
                      250
                      ms
                    </text>
                  </g>}
                  {b.map(e=>{
                    let a=line().x((e,a)=>f(a)).y(e=>g(e)).curve(s.G)(e.values)??"";
                    return <path key={e.id} d={a} fill="none" className={e.stroke} strokeWidth={2} strokeDasharray={e.dash} strokeLinecap="round" strokeLinejoin="round" />;
                  })}
                  {d.p99&&e_.map((e,a)=>e>250?<rect key={a} x={f(a)-3} y={g(e)-3} width={6} height={6} fill="currentColor" className={et} />:null)}
                  {null!==t&&<g>
                    <line x1={f(t)} x2={f(t)} y1={10} y2={10+h} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />
                    {b.map(e=>{
                      let a=e.values[t];
                      return "p99"===e.id&&a>250?<rect key={e.id} x={f(t)-4} y={g(a)-4} width={8} height={8} fill="currentColor" className={et} />:<rect key={e.id} x={f(t)-4} y={g(a)-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />;
                    })}
                  </g>}
                </svg>}
                {_>0&&<div aria-hidden="true" style={{left:eo(f(o),78,Math.max(_-78,78)),top:4}} className={Z("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","-translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={Z(er,"whitespace-nowrap")}>{eu[o]}</p>
                  <div className="space-y-0.5">
                    {eh.map(e=>(
                      <div key={e.id} className={Z("flex items-center justify-between gap-4",!d[e.id]&&"opacity-40")}>
                                        <span className={Z(er,"flex items-center gap-1.5 whitespace-nowrap")}>
                                          <ed stroke={e.stroke} dash={e.dash} inverse />
                                          {e.label}
                                        </span>
                                        <span className="whitespace-nowrap">
                                          {e.values[o]}
                                          ms
                                        </span>
                                      </div>
                    ))}
                  </div>
                </div>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-3">
              {eh.map(e=>(
                <div key={e.id} className={Z("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","rounded-[var(--rb-r-4xl,18px)]","ps-3 pe-3")}>
                            <p className={Z(el,"flex items-center gap-1.5 truncate")}>
                              <ed stroke={e.stroke} dash={e.dash} />
                              {e.label}
                              {" latency"}
                            </p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">
                              {e.values[p-1]}
                              <span className={en}>ms</span>
                            </p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
