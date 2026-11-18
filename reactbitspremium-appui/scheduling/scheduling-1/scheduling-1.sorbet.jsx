/**
 * React Bits Pro — Application UI (scheduling-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "text-neutral-900/40 dark:text-neutral-100/40";

let h = "text-[14px]/[20px] font-medium";

let k = "text-[13px]/[16px] font-semibold tabular-nums";

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let f = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let g = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let w = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let y = [31];

let j = Array.from({length:30},(e,r)=>r+1);

let N = [1,2,3,4];

let C = new Set([4,8,9,10,11,13,21,24,25,28]);

let M = [{id:"handoff",title:"Mobile QA handoff",state:"Upcoming",time:"2:30 pm",place:"Remote",people:["RS","MK","TA"]},{id:"allhands",title:"Quarterly all-hands",state:"Upcoming",time:"4:00 pm",place:"Main hall",people:["DV"]},{id:"campaign",title:"Campaign review",state:"Upcoming",time:"10:30 am",place:"Video call",people:["LM","PN","JR"]},{id:"panel",title:"Hiring panel: Design",state:"Confirmed",time:"11:00 am",place:"Room 4B",people:["AO","SE"]},{id:"retro",title:"Platform retro",state:"Confirmed",time:"5:15 pm",place:"Video call",people:["KT","BR"]},{id:"sync",title:"Support escalation sync",state:"Tentative",time:"6:00 pm",place:"Remote",people:["WH"]}];

function L({id:e,value:r,defaultValue:a,onChange:s,options:c,disabled:d,placeholder:_="Select…",className:b,triggerClassName:x,ariaLabel:p}){
  let h=useId(),[k,m]=useState(false),[v,f]=useState(0),[g,w]=useState(false),[y,j]=useState(),[N,C]=useState(a??""),M=useRef(null),L=useRef(null),z=useRef({buffer:"",at:0}),S=r??N,A=c.findIndex(e=>e.value===S),W=A>=0?Icon_5042:undefined,E=()=>{
    if(d)return;
    let e=M.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let a=e.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let o=l-a.bottom,n=a.top-t,i=Math.min(32*c.length+8,264),s=o<i+8&&n>o,d=(s?n:o)-8;
      w(s),j(d<i?Math.max(d,40):undefined)
    }
    f(A>=0?A:0),m(true)
  };
  useEffect(()=>{
    if(!k)return;
    let e=M.current;
    if(!e)return;
    let r=e.ownerDocument,a=r=>{
      e.contains(r.target)||m(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [k]),useEffect(()=>{
    if(!k)return;
    let e=L.current,r=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [k,v]);
  let D=e=>{
    let a=c[e];
    a&&(undefined===r&&C(a.value),s?.(a.value),m(false),M.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={M} className={u("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={k} aria-controls={h} aria-haspopup="listbox" aria-label={p} disabled={d} onClick={()=>k?m(false):E()} onKeyDown={e=>{
          if(!d){
            if(!k){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),E());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),f(e=>Math.min(e+1,c.length-1));else if("ArrowUp"===e.key)e.preventDefault(),f(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),f(0);else if("End"===e.key)e.preventDefault(),f(c.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),D(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=z.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=c.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&f(t)
            }
          }
        }} className={u("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {c.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className={u("truncate",!W&&"text-neutral-900/62 dark:text-neutral-100/62")}>{W?W.label:_}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {k&&<ul ref={L} id={h} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={u("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,r)=>{
            let a=e.value===S;
            return (
              <li key={e.value} role="option" aria-selected={a} data-index={r} data-highlighted={r===v?"":undefined} onMouseEnter={()=>f(r)} onClick={()=>D(r)} className={u("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {a&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let A = (...e)=>e.filter(Boolean).join(" ");

let W = "text-neutral-900 dark:text-neutral-100";

let E = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let D = "flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";


export default function scheduling_1__Sorbet__Component(){
  let[e,r]=useState(10),{ref:a,edges:n,onScroll:i}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:o}=r;
      a({start:t>1,end:Math.ceil(t+o)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto w-full max-w-5xl")}>
          <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1")}>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-[336px_1fr]">
              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <button type="button" aria-label="Previous month" className={u(v,f)}>
                    <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <L ariaLabel="Month" defaultValue="June" options={["April","May","June","July"].map(e=>({value:e,label:e}))} className="min-w-0 flex-1" />
                  <L ariaLabel="Year" defaultValue="2026" options={["2025","2026","2027"].map(e=>({value:e,label:e}))} className="shrink-0" triggerClassName="tabular-nums" />
                  <button type="button" aria-label="Next month" className={u(v,f)}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
                </div>
                <div className="mt-4 grid grid-cols-7 justify-items-center gap-1">
                  {g.map(e=><div key={e} className={u(k,x,"pb-1 text-center")}>{e.slice(0,3)}</div>)}
                  {y.map(e=><div key={`lead-${e}`} aria-hidden="true" className={u(h,p,"flex size-8 items-center justify-center self-center tabular-nums")}>{e}</div>)}
                  {j.map(a=>{
                    let l=a===e;
                    return (
                      <button key={a} type="button" aria-pressed={l} onClick={()=>r(a)} className={u(l?m:v,f,h,"tabular-nums")}>
                                        {C.has(a)&&<span aria-hidden="true" className={u(!l&&x,"absolute top-1 size-1 bg-current")} />}
                                        {a}
                                      </button>
                    );
                  })}
                  {N.map(e=><div key={`trail-${e}`} aria-hidden="true" className={u(h,p,"flex size-8 items-center justify-center self-center tabular-nums")}>{e}</div>)}
                </div>
              </div>
              <div className="flex min-h-0 flex-col">
                <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-4">
                  <div className="min-w-0">
                    <h2 className={u("text-[17px]/[22px] font-extrabold","truncate")}>
                      {w[e%7]}
                      {", June "}
                      {e}
                    </h2>
                    <p className={u(k,x,"mt-0.5 flex min-w-0 gap-x-2")}>
                      <span className="truncate">
                        {M.length}
                        {" events"}
                      </span>
                      <span className="truncate">3 need a reply</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <L ariaLabel="Filter events" defaultValue="All events" options={["All events","Only mine","Needs reply"].map(e=>({value:e,label:e}))} className="hidden sm:block" />
                    <button type="button" className={u(m,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                      <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                      Add
                    </button>
                  </div>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={a} onScroll={i} className={u("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","h-full overflow-y-auto pb-4")}>
                    {M.map(e=>(
                      <div key={e.id} className="px-2 py-1">
                                        <article className={u("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","px-2")}>
                                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <h3 className={u("text-[15px]/[20px] font-bold","truncate")}>{e.title}</h3>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                                              <span className={u("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{e.state}</span>
                                              <span className="flex items-center *:not-first:-ms-1 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-4px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]">
                                                {e.people.map(e=>(
                                                  <span key={e} role="img" aria-label={e} title={e} className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[20px]")}>
                                                                              <span aria-hidden="true" className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.charAt(0)}</span>
                                                                            </span>
                                                ))}
                                              </span>
                                              <span className={u(k,x,"flex items-center gap-1.5")}>
                                                <HugeiconsIcon icon={Icon_29635} size={16} strokeWidth={2} aria-hidden="true" />
                                                {e.time}
                                              </span>
                                              <span className={u(k,x,"flex min-w-0 items-center gap-1.5")}>
                                                <HugeiconsIcon icon={Icon_87924} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                                                <span className="truncate">{e.place}</span>
                                              </span>
                                            </div>
                                          </div>
                                        </article>
                                      </div>
                    ))}
                  </div>
                  <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",n.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",n.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
