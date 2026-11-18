/**
 * React Bits Pro — Application UI (scheduling-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, duration, from, observe, push, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let eE = (...e)=>e.filter(Boolean).join(" ");

let eD = "text-neutral-900 dark:text-neutral-100";

let eT = "text-neutral-900/62 dark:text-neutral-100/62";

let eH = "text-[13px]/[16px] font-bold tabular-nums";

let eR = "text-[13px]/[16px] font-semibold tabular-nums";

let eV = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let e$ = "border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let eI = "border-r border-transparent";

let eB = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let eP = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let eU = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let eF = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eJ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let eZ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eq = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let eO = Array.from({length:10},(e,r)=>8+r);

let eK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

let eY = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

let eQ = e=>e-(e-1)%7;

let eX = [{label:"30 min",value:.5},{label:"45 min",value:.75},{label:"1 hour",value:1},{label:"90 min",value:1.5},{label:"2 hours",value:2}];

let eG = [{id:"e1",date:8,from:9,duration:.5,title:"Standup"},{id:"e2",date:8,from:11,duration:1.5,title:"Roadmap shaping"},{id:"e3",date:9,from:10,duration:1,title:"1:1 with Nadia"},{id:"e4",date:9,from:10.5,duration:1,title:"Vendor call"},{id:"e5",date:9,from:14,duration:2,title:"Design critique"},{id:"e6",date:10,from:9.5,duration:1,title:"Mobile QA handoff"},{id:"e7",date:10,from:13,duration:1,title:"All-hands"},{id:"e8",date:11,from:11,duration:1,title:"Hiring panel"},{id:"e9",date:11,from:15,duration:1,title:"Platform retro"},{id:"e10",date:12,from:9,duration:3,title:"Focus block"},{id:"e11",date:12,from:14,duration:1,title:"Customer demo"}];

let e0 = (e,r,a)=>Math.min(a,Math.max(r,e));

let e1 = e=>.25*Math.round(e/.25);

function e2(e){
  let r=Math.floor(e),a=Math.round((e-r)*60);
  return `${r>12?r-12:r}:${String(a).padStart(2,"0")} ${r>=12?"pm":"am"}`;
}

function e5(e){
  let r=Math.round(60*e);
  if(r<60)return `${r} min`;
  let a=Math.floor(r/60),t=r%60;
  return t?`${a} h ${t} min`:`${a} h`;
}

function e6({id:e,value:r,defaultValue:a,onChange:s,options:c,disabled:d,placeholder:_="Select…",className:b,triggerClassName:u,ariaLabel:x}){
  let p=useId(),[h,k]=useState(false),[m,v]=useState(0),[f,g]=useState(false),[w,y]=useState(),[j,N]=useState(a??""),C=useRef(null),M=useRef(null),L=useRef({buffer:"",at:0}),z=r??j,S=c.findIndex(e=>e.value===z),A=S>=0?c[S]:undefined,W=()=>{
    if(d)return;
    let e=C.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let a=e.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let o=l-a.bottom,n=a.top-t,i=Math.min(32*c.length+8,264),s=o<i+8&&n>o,d=(s?n:o)-8;
      g(s),y(d<i?Math.max(d,40):undefined)
    }
    v(S>=0?S:0),k(true)
  };
  useEffect(()=>{
    if(!h)return;
    let e=C.current;
    if(!e)return;
    let r=e.ownerDocument,a=r=>{
      e.contains(r.target)||k(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [h]),useEffect(()=>{
    if(!h)return;
    let e=M.current,r=e?.querySelector(`[data-index="${m}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [h,m]);
  let E=e=>{
    let a=c[e];
    a&&(undefined===r&&N(a.value),s?.(a.value),k(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={eE("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={h} aria-controls={p} aria-haspopup="listbox" aria-label={x} disabled={d} onClick={()=>h?k(false):W()} onKeyDown={e=>{
          if(!d){
            if(!h){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),W());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,c.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(c.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),E(m);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=L.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=c.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&v(t)
            }
          }
        }} className={eE("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",u)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {c.map(e=><span key={e.value} aria-hidden="true" className="invisible truncate">{e.label}</span>)}
            <span className={eE("truncate",!A&&"text-neutral-900/62 dark:text-neutral-100/62")}>{A?A.label:_}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {h&&<ul ref={M} id={p} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={eE("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {c.map((e,r)=>{
            let a=e.value===z;
            return (
              <li key={e.value} role="option" aria-selected={a} data-index={r} data-highlighted={r===m?"":undefined} onMouseEnter={()=>v(r)} onClick={()=>E(r)} className={eE("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {a&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}


export default function scheduling_6__Sorbet__Component(){
  let[e,r]=useState("Week"),[a,n]=useState(eQ(10)),[i,_]=useState(10),[b,u]=useState(eG),[x,p]=useState(null),[h,k]=useState(false),m=useRef(null),v=useRef(false),f=useRef(null),{ref:g,edges:w,onScroll:y}=function(){
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
  }(),j=useMemo(()=>"Week"===e?Array.from({length:5},(e,r)=>a+r):[i], [e,a,i]),N=b.find(e=>e.id===x)??null,C=(e,r)=>{
    let a=f.current;
    if(!a)return null;
    let t=a.getBoundingClientRect(),l=e0(Math.floor((e-t.left)/t.width*j.length),0,j.length-1),o=8+(r-t.top)/56;
    return {date:j[l],time:o};
  },M=(e,r)=>u(a=>a.map(a=>a.id===e?{...a,...r}:a)),L=e=>{
    m.current&&(e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),m.current=null,k(false))
  },z=r=>{
    if(p(null),"Week"===e){
      let e=e0(a+7*r,1,22);
      n(e),_(e+2);
      return
    }
    let t=e0(i+r,1,26);
    _(t),n(e0(eQ(t),1,22))
  },S="Week"===e?`${a} – ${a+4} June`:`${i} June`,A=`${eY[(i-1)%7]}, `;
  return (
    <div className={eE("bg-white dark:bg-neutral-950",eD,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={eE("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex h-14 shrink-0 items-center gap-2 px-4 sm:px-5")}>
          <div className="flex shrink-0 items-center gap-0.5">
            <button type="button" onClick={()=>z(-1)} aria-label={"Week"===e?"Previous week":"Previous day"} className={eE(eJ,eq)}>
              <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" onClick={()=>z(1)} aria-label={"Week"===e?"Next week":"Next day"} className={eE(eJ,eq)}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
          </div>
          <button type="button" onClick={()=>{
            n(eQ(10)),_(10),p(null)
          }} className={eE(eF,eZ)}>Today</button>
          <h1 className={eE("text-[15px]/[20px] font-bold","min-w-0 flex-1 truncate px-1 tabular-nums")}>
            {"Day"===e&&<span className="max-sm:hidden">{A}</span>}
            {S}
            <span className="max-sm:hidden">{" 2026"}</span>
          </h1>
          <div role="radiogroup" aria-label="Calendar view" className={eE("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0 max-sm:hidden")}>
            {["Day","Week"].map(a=>(
              <button key={a} type="button" role="radio" aria-checked={a===e} onClick={()=>{
                        r(a),p(null)
                      }} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>
            ))}
          </div>
          <button type="button" onClick={()=>{
            let e=j.includes(i)?i:j[0],r=`draft-${Date.now()}`;
            u(a=>[...a,{id:r,date:e,from:9,duration:1,title:"Untitled"}]),p(r)
          }} className={eE(eU,eZ)}>
            <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
            New
          </button>
        </header>
        <div className={eE("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0")}>
          <div className="w-14 shrink-0" />
          <div className="grid flex-1" style={{gridTemplateColumns:`repeat(${j.length}, minmax(0, 1fr))`}}>
            {j.map(e=>{
              let a=10===e;
              return (
                <button key={e} type="button" onClick={()=>{
                            _(e),r("Day"),p(null)
                          }} className={eE("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6",eP,eB,"rounded-[var(--rb-r-4xl,18px)]","m-1 flex cursor-pointer items-center justify-center gap-1.5 py-1.5")}>
                            <span className={eE(eR,eT)}>{eK[(e-1)%7]}</span>
                            <span className={a?eE("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12"):eH}>{e}</span>
                          </button>
              );
            })}
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={g} onScroll={y} className="h-full overflow-y-auto">
            <div className="flex select-none py-4">
              <div className={eE(eI,"w-14 shrink-0")}>
                {eO.map(e=>(
                  <div key={e} style={{height:56}} className="relative">
                                <span className={eE(eR,eT,"absolute -top-1.5 right-3")}>{12===e?"12 pm":e>12?`${e-12} pm`:`${e} am`}</span>
                              </div>
                ))}
              </div>
              <div ref={f} onPointerDown={e=>{
                if(0!==e.button)return;
                let r=C(e.clientX,e.clientY);
                if(!r)return;
                let a=e.target,t=a.closest("[data-event-id]"),l=t?.dataset.eventId;
                if(e.currentTarget.setPointerCapture(e.pointerId),e.preventDefault(),v.current=false,k(true),l){
                  let e=b.find(e=>e.id===l);
                  if(!e)return;
                  p(l),m.current=a.closest("[data-resize]")?{mode:"resize",id:l}:{mode:"move",id:l,grab:r.time-e.from};
                  return
                }
                let o=e0(e1(r.time),8,17.5),n={id:`draft-${Date.now()}`,date:r.date,from:o,duration:.5,title:"Untitled"};
                u(e=>[...e,n]),p(n.id),m.current={mode:"resize",id:n.id}
              }} onPointerMove={e=>{
                let r=m.current;
                if(!r)return;
                let a=C(e.clientX,e.clientY);
                if(!a)return;
                v.current=true;
                let t=b.find(e=>e.id===r.id);
                if(!t)return;
                if("move"===r.mode){
                  let e=e0(e1(a.time-r.grab),8,18-t.duration);
                  (e!==t.from||a.date!==t.date)&&M(r.id,{from:e,date:a.date});
                  return
                }
                let l=e0(e1(a.time-t.from),.5,18-t.from);
                l!==t.duration&&M(r.id,{duration:l})
              }} onPointerUp={L} onPointerCancel={L} style={{gridTemplateColumns:`repeat(${j.length}, minmax(0, 1fr))`,touchAction:"none"}} className={eE("grid flex-1",h?"cursor-grabbing":"cursor-cell")}>
                {j.map((e,r)=>{
                  let a,l,o,n,i;
                  return (
                    <div key={e} className={eE(r<j.length-1&&eI,"relative")} style={{height:560}}>
                                    {eO.slice(1).map(e=><div key={e} aria-hidden="true" style={{top:(e-8)*56}} className={eE(e$,"pointer-events-none absolute inset-x-0")} />)}
                                    {10===e&&<div aria-hidden="true" style={{top:131.59999999999997}} className={eE(eD,"pointer-events-none absolute inset-x-0 z-[3] flex -translate-y-1/2 items-center")}>
                                      <span className="size-1.5 shrink-0 bg-current" />
                                      <span className="h-px flex-1 bg-current" />
                                    </div>}
                                    {(a=[...b.filter(r=>r.date===e)].sort((e,r)=>e.from-r.from||r.duration-e.duration),l=[],o=[],n=-1/0,i=()=>{
                                      if(!o.length)return;
                                      let e=[];
                                      o.map(r=>{
                                        let a=e.findIndex(e=>e<=r.from+1e-6);
                                        return -1===a?(e.push(r.from+r.duration),a=e.length-1):e[a]=r.from+r.duration,{event:r,lane:a};
                                      }).forEach(r=>push({...r,lanes:Math.max(1,e.length)})),o=[],n=-1/0
                                    },a.forEach(e=>{
                                      o.length&&e.from>=n-1e-6&&i(),o.push(e),n=Math.max(n,e.from+e.duration)
                                    }),i(),l).map(({event:e,lane:r,lanes:a})=>{
                                      let l=e.id===x,o=56*e.duration-3;
                                      return (
                                        <button key={e.id} type="button" data-event-id={e.id} aria-pressed={l} onClick={()=>p(e.id)} onKeyDown={r=>{
                                                            if("ArrowUp"===r.key||"ArrowDown"===r.key){
                                                              var a,t;
                                                              let l;
                                                              r.preventDefault(),a=e.id,t="ArrowUp"===r.key?-1:1,(l=b.find(e=>e.id===a))&&M(a,{from:e0(from+.25*t,8,18-duration)})
                                                            }
                                                          }} style={{top:(e.from-8)*56,height:o,left:`calc(${r/a*100}% + 3px)`,width:`calc(${100/a}% - 6px)`}} className={eE(l?"bg-[oklch(80%_0.12_220)] dark:bg-[oklch(80%_0.12_220)]":"bg-[oklch(95.5%_0.035_220)] dark:bg-[oklch(31%_0.075_220)]",l?"text-neutral-900 dark:text-neutral-900":eD,"rounded-[var(--rb-r-sm,6px)]",eB,eP,"group @container absolute overflow-hidden px-2 py-1 text-left",h?"cursor-grabbing":"cursor-grab",l?"z-[2]":"z-[1]")}>
                                                            <span className={eE(eH,"block truncate")}>{e.title}</span>
                                                            {o>34&&<span className={eE(eR,!l&&eT,"block whitespace-nowrap @max-[72px]:hidden")}>{e2(e.from)}</span>}
                                                            <span data-resize="true" aria-hidden="true" className={eE(eP,"absolute inset-x-0 bottom-0 flex h-3 cursor-ns-resize items-end justify-center pb-0.5 opacity-0 group-hover:opacity-100 group-aria-pressed:opacity-100")}><span className={eE(!l&&eT,"h-0.5 w-6 rounded-[1px] bg-current")} /></span>
                                                          </button>
                                      );
                                    })}
                                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={eE("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 z-10 h-8",w.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eE("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8",w.end?"opacity-100":"opacity-0")} />
        </div>
        {N?<div className={eE(e$,eV,"flex h-[60px] shrink-0 items-center gap-2 px-4 sm:px-5")}>
          <div className={eE("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","min-w-0 flex-1")}>
            <input value={N.title} onChange={e=>M(N.id,{title:e.target.value})} aria-label="Event title" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
          </div>
          <e6 ariaLabel="Duration" value={String(N.duration)} placeholder={e5(N.duration)} onChange={e=>M(N.id,{duration:e0(Number(e),.5,18-N.from)})} options={eX.map(e=>({value:String(e.value),label:e.label}))} className="hidden shrink-0 sm:block" />
          <p className={eE(eR,eT,"hidden shrink-0 gap-2 px-1 md:flex")}>
            <span>
              {"June "}
              {N.date}
            </span>
            <span>{e2(N.from)}</span>
            <span>{e5(N.duration)}</span>
          </p>
          <button type="button" onClick={()=>{
            u(e=>e.filter(e=>e.id!==N.id)),p(null)
          }} aria-label="Delete event" className={eE(eF,eq)}>
            <HugeiconsIcon icon={Icon_96037} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" onClick={()=>p(null)} aria-label="Close editor" className={eE(eU,eq)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>:<div className={eE(e$,eV,"flex h-[60px] shrink-0 items-center px-4 sm:px-5")}>
          <p className={eE("text-[14px]/[20px] font-medium",eT,"line-clamp-2")}>
            Drag on the grid to block out time. Drag an event to move it, or its bottom edge to resize.
          </p>
        </div>}
      </div>
  );
}
