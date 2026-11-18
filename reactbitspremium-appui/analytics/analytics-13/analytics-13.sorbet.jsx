/**
 * React Bits Pro — Application UI (analytics-13 (Sorbet))
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

let q = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]";

let tu = (...e)=>e.filter(Boolean).join(" ");

let th = "text-neutral-900 dark:text-neutral-100";

let tp = "text-neutral-900/62 dark:text-neutral-100/62";

let tb = "text-[13px]/[16px] font-semibold tabular-nums";

let tm = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let tk = "stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]";

let tf = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))]";

let tg = (e,a,t)=>Math.min(t,Math.max(a,e));

let tv = (e,a)=>.5*Math.sin(.7*a+e)+.34*Math.sin(.23*a+2.1*e)+.12*Math.sin(1.9*a+.6*e);

let tw = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let ty = Date.UTC(2024,0,2);

let tj = ["30D","90D","1Y"];

let tN = {"30D":{count:30,stride:1},"90D":{count:90,stride:1},"1Y":{count:120,stride:3}};

let tM = e=>`$${e.toFixed(2)}`;

let tA = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=t.indexOf(e.target);
  if(r<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?t.length-1:(r+a+t.length)%t.length;
  t[l].focus(),t[l].click()
};


export default function analytics_13__Sorbet__Component(){
  let[e,a]=useState("30D"),[t,n]=useState(null),[s,i]=useState(0),[c,d]=function(){
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
  }(),x=useMemo(()=>(function(e){
    let{count:a,stride:t}=tN[e],r=.05/a,l=128;
    return Array.from({length:a},(e,a)=>{
      let n,s=l,i=s*(1+.02*tv(2.4,a)+r),o=Math.max(s,i)*(1+.013*Math.abs(tv(5.1,a))),c=Math.min(s,i)*(1-.013*Math.abs(tv(3.7,a))),d=Math.round(24e5*(1+.42*tv(6.2,a)));
      return l=i,{open:s,high:o,low:c,close:i,volume:d,label:(n=new Date(ty+a*t*864e5),`${tw[n.getUTCMonth()]} ${n.getUTCDate()}`)};
    });
  })(e), [e]),_=x.length,p=d.width,b=Math.max(p-40-1,1),m=298,k=b/_,f=tg(.72*k,1,14),g=tg(.5*f,1,1.5),v=tg(.5*f,1,1.25),w=x.map(e=>e.low),y=x.map(e=>e.high),{lo:j,hi:N,ticks:M}=useMemo(()=>(function(e,a,t=3){
    let r=(a-e||1)/t,l=10**Math.floor(Math.log10(r)),n=r/l,s=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*l,i=Math.floor(e/s)*s,o=Math.ceil(a/s)*s,c=[];
    for(let e=i;e<=o+s/1e3;e+=s)c.push(Math.round(100*e)/100);
    return {lo:i,hi:o,ticks:c};
  })(Math.min(...x.map(e=>e.low)),Math.max(...x.map(e=>e.high)),2), [x]),A=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let t=e/a,r=10**Math.floor(Math.log10(t)),l=t/r,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*r,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(Math.max(...x.map(e=>e.volume))).top, [x]),S=useCallback(e=>40+k*(e+.5), [k]),$=useCallback(e=>12+m-(e-j)/(N-j||1)*m, [m,j,N]),R=useCallback(e=>72-e/A*66, [66,A]),L=x[0],D=x[_-1],C=D.close-L.open,z=C/L.open*100,E=Math.max(...y),F=Math.min(...w),B=tg(Math.floor(b/56),2,7),U=$(L.open),W=Math.ceil(88/k),P=_-1;
  for(let e=_-1;e>=W-1;e--)if(x.slice(e-W+1,e+2).every(e=>$(e.high)>=U-2||$(e.low)<=U-18)){
    P=e;
    break
  }
  let O=Math.ceil(_/B),T=x[s],q=(T.close-T.open)/T.open*100;
  return (
    <div className={tu("bg-white dark:bg-neutral-950",th,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={tu("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-[880px] shrink-0")}>
          <div className={tu("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1 px-5 py-4")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={tu("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","flex flex-wrap gap-x-2")}>
                  <span>Compute credits</span>
                  <span className={tp}>CMP/USD</span>
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                  <p className={tu("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",th)}>{tM(D.close)}</p>
                  <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                    <span>
                      <HugeiconsIcon icon={C>=0?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" className="inline-block align-middle" />
                    </span>
                    <span className="sr-only">{C>=0?"Up":"Down"}</span>
                    {C>=0?"+":"−"}
                    $
                    {Math.abs(C).toFixed(2)}
                    {" ("}
                    {C>=0?"+":"−"}
                    {Math.abs(z).toFixed(2)}
                    %)
                    <span className={tp}>
                      {"over "}
                      {e}
                    </span>
                  </p>
                </div>
                <p className={tu(tb,tp,"mt-1 flex flex-wrap gap-x-3")}>
                  <span>
                    {"Period high "}
                    {tM(E)}
                  </span>
                  <span>
                    {"Low "}
                    {tM(F)}
                  </span>
                </p>
              </div>
              <div role="radiogroup" aria-label="Range" onKeyDown={tA} className={tu("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
                {tj.map(t=>(
                  <button key={t} type="button" role="radio" aria-checked={t===e} tabIndex={t===e?0:-1} onClick={()=>{
                                a(t),n(null),i(0)
                              }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{t}</button>
                ))}
              </div>
            </div>
            <div ref={c} role="img" tabIndex={0} aria-label={`Compute-credit price, ${e}. Latest close ${tM(D.close)}, ${z>=0?"up":"down"} ${Math.abs(z).toFixed(1)} percent over the period.`} onPointerMove={e=>(e=>{
              let a=c.current;
              if(!a)return;
              let t=tg(Math.floor((e-a.getBoundingClientRect().left-40)/k),0,_-1);
              n(t),i(t)
            })(e.clientX)} onPointerLeave={()=>n(null)} onBlur={()=>n(null)} onKeyDown={e=>{
              if("ArrowLeft"===e.key||"ArrowRight"===e.key){
                e.preventDefault();
                let a=tg((t??_-1)+("ArrowLeft"===e.key?-1:1),0,_-1);
                n(a),i(a)
              }
              "Home"===e.key&&(n(0),i(0)),"End"===e.key&&(n(_-1),i(_-1)),"Escape"===e.key&&n(null)
            }} style={{touchAction:"pan-y"}} className={tu("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","relative mt-4 cursor-crosshair")}>
              {p>0&&<>
                <svg width={p} height={330} className="block overflow-visible">
                  {M.map(e=>(
                    <g key={e}>
                                    <line x1={40} x2={p-1} y1={$(e)} y2={$(e)} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" strokeWidth={1} />
                                    <text x={0} y={$(e)} dy={-4} className={tm}>
                                      $
                                      {Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`}
                                    </text>
                                  </g>
                  ))}
                  <line x1={40} x2={p-1} y1={$(L.open)} y2={$(L.open)} strokeDasharray="6 4" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />
                  <text x={Math.min(40+k*(P+1),p-1)} y={U} dy={-4} textAnchor="end" className={tm}>
                    {"Open "}
                    {tM(L.open)}
                  </text>
                  {null!==t&&<line x1={S(t)} x2={S(t)} y1={12} y2={12+m} className="stroke-neutral-900/40 dark:stroke-neutral-100/45" strokeWidth={1} shapeRendering="crispEdges" />}
                  {x.map((e,a)=>{
                    let l=e.close>=e.open,n=$(Math.max(e.open,e.close)),s=Math.max(1,$(Math.min(e.open,e.close))-n),i=null!==t&&t!==a;
                    return (
                      <g key={a} style={{opacity:i?.45:1}} className="transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]">
                                        <line x1={S(a)} x2={S(a)} y1={$(e.high)} y2={n} className={tk} strokeWidth={g} />
                                        <line x1={S(a)} x2={S(a)} y1={n+s} y2={$(e.low)} className={tk} strokeWidth={g} />
                                        <rect x={S(a)-f/2} y={n} width={f} height={s} fill={l?"none":undefined} strokeWidth={l?v:0} className={l?tk:tf} />
                                      </g>
                    );
                  })}
                </svg>
                <svg width={p} height={72} className="mt-1 block overflow-visible">
                  <text x={0} y={10} className={tm}>Volume</text>
                  <g>
                    {x.map((e,a)=>{
                      let l=R(e.volume),n=t===a;
                      return <rect key={a} x={S(a)-f/2} y={l} width={f} height={Math.max(1,72-l)} className={n?tf:"fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]"} />;
                    })}
                  </g>
                </svg>
                <svg width={p} height={16} className="block overflow-visible">
                  {x.map((e,a)=>a%O==0?<text key={a} x={S(a)} y={11} textAnchor={0===a?"start":a===_-1?"end":"middle"} className={tm}>{e.label}</text>:null)}
                </svg>
                <div aria-hidden="true" style={{left:tg(S(s),78,Math.max(p-78,78)),top:12}} className={tu("pointer-events-none absolute z-[70] flex min-w-36 max-w-64 flex-col gap-1.5 rounded-[calc(var(--rb-r-xl,12px))] bg-neutral-900 px-3.5 py-2.5 text-[13px]/[16px] font-bold tabular-nums text-white shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)] dark:bg-neutral-100 dark:text-neutral-900","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","w-[150px] -translate-x-1/2",null===t?"opacity-0":"opacity-100")}>
                  <p className={tb}>{T.label}</p>
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                    <span className={tb}>Open</span>
                    <span className="text-right">{tM(T.open)}</span>
                    <span className={tb}>High</span>
                    <span className="text-right">{tM(T.high)}</span>
                    <span className={tb}>Low</span>
                    <span className="text-right">{tM(T.low)}</span>
                    <span className={tb}>Close</span>
                    <span className="text-right">{tM(T.close)}</span>
                  </div>
                  <p className="text-right">
                    {q>=0?"+":"−"}
                    {Math.abs(q).toFixed(2)}
                    %
                  </p>
                </div>
              </>}
            </div>
          </div>
        </div>
      </div>
  );
}
