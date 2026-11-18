/**
 * React Bits Pro — Application UI (filtering-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_63188 = [["path",{d:"M22 17.5H2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 12V10.2134C11 9.83272 10.9428 9.70541 10.6497 9.55538C10.0395 9.24292 9.29865 9 8.5 9C7.70135 9 6.96055 9.24292 6.35025 9.55538C6.05721 9.70541 6 9.83272 6 10.2134L6 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 12V10.2134C18 9.83272 17.9428 9.70541 17.6497 9.55538C17.0395 9.24292 16.2987 9 15.5 9C14.7013 9 13.9605 9.24292 13.3503 9.55538C13.0572 9.70541 13 9.83272 13 10.2134L13 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M21 12V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_86153 = [["path",{d:"M6 20L5 21M18 20L19 21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2 12H22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 6L10.5 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_10498 = [["path",{d:"M17.5 10.5L19.5 12.5M14 14L16 16M10.5 17.5L12.5 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.5355 4.67767C11.9002 3.31296 12.5826 2.6306 13.3438 2.3153C14.3587 1.8949 15.4991 1.8949 16.5141 2.3153C17.2753 2.6306 17.9576 3.31296 19.3223 4.67767C20.687 6.04238 21.3694 6.72474 21.6847 7.48594C22.1051 8.50088 22.1051 9.64126 21.6847 10.6562C21.3694 11.4174 20.687 12.0998 19.3223 13.4645L13.4645 19.3223C12.0998 20.687 11.4174 21.3694 10.6562 21.6847C9.64126 22.1051 8.50088 22.1051 7.48594 21.6847C6.72474 21.3694 6.04238 20.687 4.67767 19.3223C3.31296 17.9576 2.6306 17.2753 2.3153 16.5141C1.8949 15.4991 1.8949 14.3587 2.3153 13.3438C2.6306 12.5826 3.31296 11.9002 4.67767 10.5355L10.5355 4.67767Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "border border-neutral-900/12 dark:border-neutral-100/14";

let u = "text-[15px]/[20px] font-bold";

let x = "text-[14px]/[20px] font-medium";

let p = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let h = "relative inline-flex size-[18px] shrink-0 items-center justify-center";

let k = "peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28";

let m = "pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]";

let v = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let g = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let f = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let w = "ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let y = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

let j = d(x,_);

let N = d("text-[13px]/[16px] font-semibold tabular-nums",_);

function z({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:_="Select…",className:b,triggerClassName:u,leading:x,ariaLabel:p}){
  let h=useId(),[k,m]=useState(false),[v,g]=useState(0),[f,w]=useState(false),[y,j]=useState(),z=useRef(null),C=useRef(null),S=useRef({buffer:"",at:0}),A=s.findIndex(e=>e.value===a),D=A>=0?Icon_68656:undefined,E=e=>{
    if(c)return;
    let a=z.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),c=n<o+8&&i>n,d=(c?i:n)-8;
      w(c),j(d<o?Math.max(d,40):undefined)
    }
    g(e??(A>=0?A:0)),m(true)
  };
  useEffect(()=>{
    if(!k)return;
    let e=z.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||m(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [k]),useEffect(()=>{
    if(!k)return;
    let e=C.current,a=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [k,v]);
  let M=e=>{
    let a=s[e];
    a&&(r(a.value),m(false),z.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={z} className={d("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={k} aria-controls={h} aria-haspopup="listbox" disabled={c} onClick={()=>k?m(false):E()} onKeyDown={e=>{
          if(!c){
            if(!k){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),E());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),m(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),M(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=S.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&g(t)
            }
          }
        }} aria-label={p} className={d("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",u)}>
          <span className="flex min-w-0 items-center gap-2">
            {x}
            <span className={d("truncate",!D&&"text-neutral-900/62 dark:text-neutral-100/62")}>{D?D.label:_}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {k&&<ul ref={C} id={h} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={d("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===v||undefined} onMouseEnter={()=>g(r)} onClick={()=>M(r)} className={d("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={d(N,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function C({min:e,max:a,step:r=1,value:n,onChange:i,format:o,labels:s}){
  let c=useRef(null),[d,_]=useState(null),b=t=>Math.min(a,Math.max(e,Math.round(t/r)*r)),u=r=>(r-e)/(a-e)*100,x=r=>{
    let t=c.current;
    if(!t)return e;
    let l=t.getBoundingClientRect();
    return 0===width?e:b(e+(r-left)/width*(a-e));
  },p=(e,a)=>{
    let[r,t]=n;
    0===e?i([Math.min(a,t),t]):i([r,Math.max(a,r)])
  },h=t=>({role:"slider",tabIndex:0,"aria-label":s[t],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n[t],"aria-valuetext":o(n[t]),style:{left:`${u(n[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),_(t)
  },onPointerMove:e=>{
    d===t&&p(t,x(e.clientX))
  },onLostPointerCapture:()=>_(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),_(null)
  },onKeyDown:l=>{
    let i=Math.max(r,Math.round((a-e)/10)),o=n[t],s=null;
    "ArrowLeft"===key||"ArrowDown"===key?s=o-r:"ArrowRight"===key||"ArrowUp"===key?s=o+r:"PageDown"===key?s=o-i:"PageUp"===key?s=o+i:"Home"===key?s=e:"End"===key&&(s=a),null!==s&&(preventDefault(),p(t,b(s)))
  },className:"absolute top-1/2 block size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[scale] duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-110 active:cursor-grabbing motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-white"});
  return (
    <div ref={c} onPointerDown={e=>{
        let a=x(e.clientX);
        p(Math.abs(a-n[0])<=Math.abs(a-n[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{left:`${u(n[0])}%`,width:`${u(n[1])-u(n[0])}%`}} />
          <div {...h(0)} />
          <div {...h(1)} />
        </div>
      </div>
  );
}

let S = [{value:"dinnerware",label:"Dinnerware"},{value:"drinkware",label:"Drinkware"},{value:"vases",label:"Vases"},{value:"planters",label:"Planters"},{value:"serveware",label:"Serveware"}];

let A = [{value:"chalk",label:"Chalk",hex:"#ece5d8",light:true},{value:"sand",label:"Sand",hex:"#c9b193",light:true},{value:"moss",label:"Moss",hex:"#5a6647",light:false},{value:"slate",label:"Slate",hex:"#3b4b5a",light:false},{value:"clay",label:"Clay",hex:"#a05a41",light:false},{value:"ink",label:"Ink",hex:"#2a2724",light:false}];

let D = [{value:"s",label:"Small"},{value:"m",label:"Medium"},{value:"l",label:"Large"}];

let E = [{value:"kilnhouse",label:"Kilnhouse"},{value:"muro",label:"Muro Studio"},{value:"terra",label:"Terra & Ash"},{value:"nine",label:"Nine Fields"}];

let M = [{id:"p1",name:"Ridge dinner plate",category:"dinnerware",price:38,glaze:"chalk",size:"l",maker:"kilnhouse"},{id:"p2",name:"Ridge side plate",category:"dinnerware",price:26,glaze:"chalk",size:"m",maker:"kilnhouse"},{id:"p3",name:"Coil cereal bowl",category:"dinnerware",price:32,glaze:"sand",size:"m",maker:"muro"},{id:"p4",name:"Ember pasta bowl",category:"dinnerware",price:44,glaze:"clay",size:"l",maker:"terra"},{id:"p5",name:"Halo charger plate",category:"dinnerware",price:52,glaze:"ink",size:"l",maker:"nine"},{id:"p6",name:"Tuck mug",category:"drinkware",price:28,glaze:"moss",size:"s",maker:"kilnhouse"},{id:"p7",name:"Stack tumbler",category:"drinkware",price:22,glaze:"slate",size:"s",maker:"muro"},{id:"p8",name:"Pour carafe",category:"drinkware",price:68,glaze:"chalk",size:"l",maker:"terra"},{id:"p9",name:"Field cup",category:"drinkware",price:19,glaze:"sand",size:"s",maker:"nine"},{id:"p10",name:"Bell teapot",category:"drinkware",price:94,glaze:"ink",size:"l",maker:"kilnhouse"},{id:"p11",name:"Column vase",category:"vases",price:76,glaze:"slate",size:"l",maker:"muro"},{id:"p12",name:"Pebble bud vase",category:"vases",price:34,glaze:"chalk",size:"s",maker:"terra"},{id:"p13",name:"Fold vase",category:"vases",price:58,glaze:"clay",size:"m",maker:"nine"},{id:"p14",name:"Basin planter",category:"planters",price:62,glaze:"sand",size:"l",maker:"kilnhouse"},{id:"p15",name:"Rim planter",category:"planters",price:41,glaze:"moss",size:"m",maker:"muro"},{id:"p16",name:"Trace wall planter",category:"planters",price:29,glaze:"ink",size:"s",maker:"terra"},{id:"p17",name:"Crest platter",category:"serveware",price:88,glaze:"chalk",size:"l",maker:"nine"},{id:"p18",name:"Ladle serving bowl",category:"serveware",price:54,glaze:"moss",size:"m",maker:"kilnhouse"}];

let ad = (...e)=>e.filter(Boolean).join(" ");

let a_ = "text-neutral-900/62 dark:text-neutral-100/62";

let ab = "text-[15px]/[20px] font-bold";

let au = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let ax = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let ap = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let ah = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let ak = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let am = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

let av = ad("text-[14px]/[20px] font-medium",a_);

let ag = ad("text-[13px]/[16px] font-semibold tabular-nums",a_);

function af({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:d="Select…",className:_,triggerClassName:b,leading:u,ariaLabel:x}){
  let p=useId(),[h,k]=useState(false),[m,v]=useState(0),[g,f]=useState(false),[w,y]=useState(),j=useRef(null),N=useRef(null),z=useRef({buffer:"",at:0}),C=s.findIndex(e=>e.value===a),S=C>=0?s[C]:undefined,A=e=>{
    if(c)return;
    let a=j.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),c=n<o+8&&i>n,d=(c?i:n)-8;
      f(c),y(d<o?Math.max(d,40):undefined)
    }
    v(e??(C>=0?C:0)),k(true)
  };
  useEffect(()=>{
    if(!h)return;
    let e=j.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [h]),useEffect(()=>{
    if(!h)return;
    let e=N.current,a=e?.querySelector(`[data-index="${m}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [h,m]);
  let D=e=>{
    let a=s[e];
    a&&(r(a.value),k(false),j.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={j} className={ad("relative",_)}>
        <button id={e} type="button" role="combobox" aria-expanded={h} aria-controls={p} aria-haspopup="listbox" disabled={c} onClick={()=>h?k(false):A()} onKeyDown={e=>{
          if(!c){
            if(!h){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),v(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),v(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),v(0);else if("End"===e.key)e.preventDefault(),v(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),D(m);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=z.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&v(t)
            }
          }
        }} aria-label={x} className={ad("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {u}
            <span className={ad("truncate",!S&&"text-neutral-900/62 dark:text-neutral-100/62")}>{S?S.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {h&&<ul ref={N} id={p} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={ad("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===m||undefined} onMouseEnter={()=>v(r)} onClick={()=>D(r)} className={ad("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={ad(ag,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function aw({min:e,max:a,step:r=1,value:n,onChange:i,format:o,labels:s}){
  let c=useRef(null),[d,_]=useState(null),b=t=>Math.min(a,Math.max(e,Math.round(t/r)*r)),u=r=>(r-e)/(a-e)*100,x=r=>{
    let t=c.current;
    if(!t)return e;
    let l=t.getBoundingClientRect();
    return 0===width?e:b(e+(r-left)/width*(a-e));
  },p=(e,a)=>{
    let[r,t]=n;
    0===e?i([Math.min(a,t),t]):i([r,Math.max(a,r)])
  },h=t=>({role:"slider",tabIndex:0,"aria-label":s[t],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n[t],"aria-valuetext":o(n[t]),style:{left:`${u(n[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),_(t)
  },onPointerMove:e=>{
    d===t&&p(t,x(e.clientX))
  },onLostPointerCapture:()=>_(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),_(null)
  },onKeyDown:l=>{
    let i=Math.max(r,Math.round((a-e)/10)),o=n[t],s=null;
    "ArrowLeft"===key||"ArrowDown"===key?s=o-r:"ArrowRight"===key||"ArrowUp"===key?s=o+r:"PageDown"===key?s=o-i:"PageUp"===key?s=o+i:"Home"===key?s=e:"End"===key&&(s=a),null!==s&&(preventDefault(),p(t,b(s)))
  },className:"absolute top-1/2 block size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[scale] duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-110 active:cursor-grabbing motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-white"});
  return (
    <div ref={c} onPointerDown={e=>{
        let a=x(e.clientX);
        p(Math.abs(a-n[0])<=Math.abs(a-n[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{left:`${u(n[0])}%`,width:`${u(n[1])-u(n[0])}%`}} />
          <div {...h(0)} />
          <div {...h(1)} />
        </div>
      </div>
  );
}

let ay = [{value:"all",label:"All"},{value:"apartment",label:"Apartment"},{value:"house",label:"House"},{value:"condo",label:"Condo"},{value:"studio",label:"Studio"},{value:"townhouse",label:"Townhouse"}];

let aj = {apartment:"Apartment",house:"House",condo:"Condo",studio:"Studio",townhouse:"Townhouse"};

let aN = [{value:"laundry",label:"Laundry"},{value:"parking",label:"Parking"},{value:"pets",label:"Pets OK"},{value:"dishwasher",label:"Dishwasher"},{value:"ac",label:"Central air"},{value:"balcony",label:"Balcony"},{value:"gym",label:"Gym"},{value:"doorman",label:"Doorman"},{value:"elevator",label:"Elevator"},{value:"hardwood",label:"Hardwood"}];

let az = Object.fromEntries(aN.map(e=>[e.value,e.label]));

let aC = [{value:"any",label:"Any time"},{value:"30",label:"Within 30 days"},{value:"60",label:"Within 60 days"},{value:"90",label:"Within 90 days"}];

let aS = e=>`$${e.toLocaleString("en-US")}`;

let aA = [{id:"r01",title:"Sunlit corner one-bed",neighbourhood:"Mission District",type:"apartment",beds:1,baths:1,sqft:720,price:2650,availableInDays:12,amenities:["laundry","dishwasher","hardwood","elevator"]},{id:"r02",title:"Renovated garden flat",neighbourhood:"Noe Valley",type:"apartment",beds:2,baths:1,sqft:940,price:3450,availableInDays:45,amenities:["parking","pets","dishwasher","balcony"]},{id:"r03",title:"Compact studio near transit",neighbourhood:"SoMa",type:"studio",beds:0,baths:1,sqft:460,price:1950,availableInDays:7,amenities:["laundry","gym","elevator","doorman"]},{id:"r04",title:"Craftsman three-bed house",neighbourhood:"Bernal Heights",type:"house",beds:3,baths:2,sqft:1680,price:5200,availableInDays:60,amenities:["parking","pets","ac","hardwood","dishwasher"]},{id:"r05",title:"Bright top-floor condo",neighbourhood:"Hayes Valley",type:"condo",beds:2,baths:2,sqft:1120,price:4100,availableInDays:21,amenities:["gym","elevator","doorman","balcony","ac"]},{id:"r06",title:"Quiet studio with alcove",neighbourhood:"Inner Richmond",type:"studio",beds:0,baths:1,sqft:500,price:2100,availableInDays:30,amenities:["hardwood","elevator"]},{id:"r07",title:"Modern townhouse end unit",neighbourhood:"Dogpatch",type:"townhouse",beds:3,baths:3,sqft:1740,price:5650,availableInDays:75,amenities:["parking","laundry","ac","balcony","dishwasher"]},{id:"r08",title:"Classic Edwardian one-bed",neighbourhood:"Pacific Heights",type:"apartment",beds:1,baths:1,sqft:780,price:3100,availableInDays:18,amenities:["hardwood","pets","dishwasher"]},{id:"r09",title:"Family four-bed with yard",neighbourhood:"Outer Sunset",type:"house",beds:4,baths:3,sqft:2200,price:6e3,availableInDays:90,amenities:["parking","pets","laundry","ac","dishwasher","hardwood"]},{id:"r10",title:"Loft-style two-bed",neighbourhood:"Potrero Hill",type:"condo",beds:2,baths:2,sqft:1180,price:4300,availableInDays:40,amenities:["gym","elevator","parking","balcony"]},{id:"r11",title:"Cozy junior studio",neighbourhood:"Nob Hill",type:"studio",beds:0,baths:1,sqft:420,price:1850,availableInDays:9,amenities:["laundry","elevator","doorman"]},{id:"r12",title:"Updated two-bed apartment",neighbourhood:"Cole Valley",type:"apartment",beds:2,baths:1,sqft:900,price:3300,availableInDays:33,amenities:["dishwasher","hardwood","pets","laundry"]},{id:"r13",title:"Split-level townhouse",neighbourhood:"Glen Park",type:"townhouse",beds:2,baths:2,sqft:1360,price:4650,availableInDays:55,amenities:["parking","ac","balcony","dishwasher"]},{id:"r14",title:"Penthouse-floor condo",neighbourhood:"Rincon Hill",type:"condo",beds:1,baths:1,sqft:820,price:3800,availableInDays:15,amenities:["gym","doorman","elevator","ac","balcony"]},{id:"r15",title:"Bungalow with home office",neighbourhood:"Excelsior",type:"house",beds:3,baths:2,sqft:1560,price:4400,availableInDays:48,amenities:["parking","pets","hardwood","laundry"]},{id:"r16",title:"Airy one-bed near park",neighbourhood:"Duboce Triangle",type:"apartment",beds:1,baths:1,sqft:690,price:2850,availableInDays:24,amenities:["hardwood","dishwasher","elevator"]},{id:"r17",title:"Roomy studio conversion",neighbourhood:"Tenderloin",type:"studio",beds:0,baths:1,sqft:540,price:1700,availableInDays:5,amenities:["laundry","elevator"]},{id:"r18",title:"Two-bed with private deck",neighbourhood:"Bernal Heights",type:"apartment",beds:2,baths:2,sqft:1050,price:3900,availableInDays:36,amenities:["balcony","pets","dishwasher","hardwood","parking"]},{id:"r19",title:"Detached three-bed home",neighbourhood:"West Portal",type:"house",beds:3,baths:2,sqft:1820,price:5100,availableInDays:70,amenities:["parking","ac","laundry","dishwasher"]},{id:"r20",title:"Corner townhouse with garage",neighbourhood:"Mission Bay",type:"townhouse",beds:4,baths:3,sqft:2050,price:5900,availableInDays:82,amenities:["parking","gym","elevator","ac","balcony","dishwasher"]},{id:"r21",title:"Light-filled loft condo",neighbourhood:"SoMa",type:"condo",beds:1,baths:1,sqft:760,price:3550,availableInDays:20,amenities:["gym","doorman","elevator","hardwood"]},{id:"r22",title:"Two-bed garden apartment",neighbourhood:"Inner Sunset",type:"apartment",beds:2,baths:1,sqft:970,price:3600,availableInDays:52,amenities:["pets","laundry","dishwasher","balcony"]}];

let aD = {type:"all",minBeds:0,minBaths:0,price:[1e3,6e3],amenities:[],availability:"any"};

let aE = (e,a,r)=>!("type"!==r&&"all"!==a.type&&e.type!==a.type||"minBeds"!==r&&e.beds<a.minBeds||"minBaths"!==r&&e.baths<a.minBaths||"price"!==r&&(e.price<a.price[0]||e.price>a.price[1])||"availability"!==r&&"any"!==a.availability&&e.availableInDays>Number(a.availability))&&("amenities"===r||!a.amenities.length||!!a.amenities.every(a=>e.amenities.includes(a)));

function aM({label:e,value:a,max:r,onChange:l,icon:i}){
  let o=0===a?"Any":`${a}+`;
  return (
    <div className="flex items-center justify-between gap-3">
        <span className="flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">
          <span className={a_}>{i}</span>
          {e}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" aria-label={`Decrease minimum ${e.toLowerCase()}`} disabled={0===a} onClick={()=>l(Math.max(0,a-1))} className={ad(au,ap)}>
            <HugeiconsIcon icon={Icon_99199} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <span className={ad(ab,"w-10 text-center tabular-nums")}>{o}</span>
          <button type="button" aria-label={`Increase minimum ${e.toLowerCase()}`} disabled={a===r} onClick={()=>l(Math.min(r,a+1))} className={ad(au,ap)}>
            <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
  );
}

function aL({label:e,children:a}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={ad(ab,"mb-3")}>{e}</h3>
        {a}
      </section>
  );
}


export default function filtering_5__Sorbet__Component(){
  let[e,a]=useState(aD),[r,i]=useState(false),d=e=>a(a=>({...a,amenities:a.amenities.includes(e)?a.amenities.filter(a=>a!==e):[...a.amenities,e]})),_=useMemo(()=>aA.filter(a=>aE(a,e)).sort((e,a)=>e.price-a.price), [e]),b=1e3!==e.price[0]||6e3!==e.price[1],u=[..."all"!==e.type?[{key:"type",label:aj[e.type]??e.type,clear:()=>a(e=>({...e,type:"all"}))}]:[],...e.minBeds>0?[{key:"beds",label:`${e.minBeds}+ beds`,clear:()=>a(e=>({...e,minBeds:0}))}]:[],...e.minBaths>0?[{key:"baths",label:`${e.minBaths}+ baths`,clear:()=>a(e=>({...e,minBaths:0}))}]:[],...b?[{key:"price",label:`${aS(e.price[0])} – ${aS(e.price[1])}`,clear:()=>a(e=>({...e,price:[1e3,6e3]}))}]:[],..."any"!==e.availability?[{key:"availability",label:aC.find(a=>a.value===e.availability)?.label??e.availability,clear:()=>a(e=>({...e,availability:"any"}))}]:[],...e.amenities.map(e=>({key:`amenity:${e}`,label:az[e]??e,clear:()=>d(e)}))],x=<div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
    <aL label="Property type">
      <div className="flex flex-wrap gap-1.5">
        {ay.map(r=>{
          let l=e.type===r.value;
          return <button key={r.value} type="button" aria-pressed={l} onClick={()=>a(e=>({...e,type:r.value}))} className={ah}>{r.label}</button>;
        })}
      </div>
    </aL>
    <aL label="Rooms">
      <div className="space-y-3">
        <aM label="Beds" value={e.minBeds} max={4} onChange={e=>a(a=>({...a,minBeds:e}))} icon={<HugeiconsIcon icon={Icon_63188} size={18} strokeWidth={2} aria-hidden="true" />} />
        <aM label="Baths" value={e.minBaths} max={3} onChange={e=>a(a=>({...a,minBaths:e}))} icon={<HugeiconsIcon icon={Icon_86153} size={18} strokeWidth={2} aria-hidden="true" />} />
      </div>
    </aL>
    <aL label="Monthly rent">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={ad(ab,"tabular-nums")}>
          {aS(e.price[0])}
          {" – "}
          {aS(e.price[1])}
          {6e3===e.price[1]?"+":""}
        </span>
        {b&&<button type="button" onClick={()=>a(e=>({...e,price:[1e3,6e3]}))} className={am}>Reset</button>}
      </div>
      <aw min={1e3} max={6e3} step={50} value={e.price} onChange={e=>a(a=>({...a,price:e}))} format={aS} labels={["Minimum rent","Maximum rent"]} />
    </aL>
    <aL label="Amenities">
      <ul className="-mx-2 grid grid-cols-1 gap-x-2 gap-y-0.5 sm:grid-cols-2">
        {aN.map(a=>{
          let r,l=e.amenities.includes(a.value),i=(r=a.value,aA.filter(a=>aE(a,e,"amenities")&&a.amenities.includes(r)).length);
          return (
            <li key={a.value}>
                        <label className={ad("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]",0===i&&!l&&"opacity-40")}>
                          <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
                            <input type="checkbox" checked={l} onChange={()=>d(a.value)} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
                            <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.label}</span>
                          <span className={ad("ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{i}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </aL>
    <aL label="Available from">
      <af value={e.availability} onChange={e=>a(a=>({...a,availability:e}))} options={aC} ariaLabel="Available from" />
    </aL>
  </div>;
  return (
    <div className={ad("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[980px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Rentals in San Francisco</h2>
              <p className={ad(av,"mt-1")}>
                <span className="tabular-nums">{_.length}</span>
                {" of"}
                {" "}
                <span className="tabular-nums">{aA.length}</span>
                {" homes match"}
              </p>
            </div>
            <button type="button" aria-expanded={r} onClick={()=>i(e=>!e)} className={ad(au,ax,"md:hidden")}>
              <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
              Filters
              {u.length>0&&<span className="tabular-nums">
                (
                {u.length}
                )
              </span>}
            </button>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={ad("w-full shrink-0 md:block md:w-[320px]",r?"block":"hidden")}>{x}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {u.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {u.map(e=>(
                  <span key={e.key} className={ah}>
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/8 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/12 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>a(aD)} className={am}>Clear all</button>
              </div>}
              {0===_.length?<div className={ad(ak,"flex-1 items-center justify-center px-6 py-16 text-center")}>
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No rentals match these filters</p>
                <p className={ad("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-[300px]")}>Try fewer amenities, lower the bed or bath minimum, or widen the rent range.</p>
                <button type="button" onClick={()=>a(aD)} className={ad("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",ax,"mt-5")}>Clear all filters</button>
              </div>:<ul className="space-y-2">
                {_.map(e=>(
                  <li key={e.id}>
                                <article className={ad(ak,"cursor-pointer")}>
                                  <div className="flex items-center gap-4 px-4 py-3">
                                    <div className="min-w-0 flex-1">
                                      <p className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{e.title}</p>
                                      <p className={ad(ag,"mt-0.5 flex min-w-0 gap-x-3")}>
                                        <span className="truncate">{e.neighbourhood}</span>
                                        <span className="shrink-0">{aj[e.type]}</span>
                                      </p>
                                    </div>
                                    <div className={ad(ag,"hidden shrink-0 items-center gap-4 sm:flex")}>
                                      <span className="inline-flex min-w-[56px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_63188} size={16} strokeWidth={2} aria-hidden="true" />
                                        {0===e.beds?"Studio":e.beds}
                                      </span>
                                      <span className="inline-flex min-w-[28px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_86153} size={16} strokeWidth={2} aria-hidden="true" />
                                        {e.baths}
                                      </span>
                                      <span className="inline-flex min-w-[80px] items-center gap-1.5">
                                        <HugeiconsIcon icon={Icon_10498} size={16} strokeWidth={2} aria-hidden="true" />
                                        {e.sqft.toLocaleString("en-US")}
                                        {" sqft"}
                                      </span>
                                    </div>
                                    <div className="min-w-[88px] shrink-0 text-right">
                                      <p className={ad(ab,"tabular-nums")}>
                                        {aS(e.price)}
                                        <span className={a_}>/mo</span>
                                      </p>
                                      <p className={ad(ag,"mt-0.5")}>{e.availableInDays<=14?"Available now":`In ${e.availableInDays} days`}</p>
                                    </div>
                                  </div>
                                </article>
                              </li>
                ))}
              </ul>}
            </div>
          </div>
        </div>
      </div>
  );
}
