/**
 * React Bits Pro — Application UI (filtering-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, label, left, preventDefault, useCallback, useEffect, useId, useMemo, useRef, useState, value, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90089 = [["path",{d:"M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let eU = (...e)=>e.filter(Boolean).join(" ");

let eV = "text-neutral-900/62 dark:text-neutral-100/62";

let eG = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eQ = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let eX = "h-10";

let eY = "h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]";

let eJ = "flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1";

let eZ = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let e0 = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

let e1 = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let e2 = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let e5 = eU("text-[14px]/[20px] font-medium",eV);

let e6 = eU("text-[13px]/[16px] font-semibold tabular-nums",eV);

function e8({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:d="Select…",className:_,triggerClassName:b,leading:u,ariaLabel:x}){
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
    <div ref={j} className={eU("relative",_)}>
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
        }} aria-label={x} className={eU("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {u}
            <span className={eU("truncate",!S&&"text-neutral-900/62 dark:text-neutral-100/62")}>{S?S.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {h&&<ul ref={N} id={p} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={eU("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===m||undefined} onMouseEnter={()=>v(r)} onClick={()=>D(r)} className={eU("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={eU(e6,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function e4(e=true){
  let a=useRef(null),[r,t]=useState({start:false,end:false}),n=useCallback(()=>{
    let e=a.current;
    if(!e)return;
    let{scrollTop:r,scrollHeight:l,clientHeight:n}=e;
    t({start:r>1,end:Math.ceil(r+n)<l-1})
  }, []);
  return useEffect(()=>{
    n();
    let e=a.current,r=e?.ownerDocument.defaultView;
    if(!e||!r?.ResizeObserver)return;
    let t=new r.ResizeObserver(n);
    return t.observe(e),()=>t.disconnect();
  }, [n,e]),{ref:a,edges:r,onScroll:n};
}

let e9 = [{value:"debug",label:"Debug",tone:eV},{value:"info",label:"Info",tone:"text-neutral-900/78 dark:text-neutral-100/78"},{value:"warn",label:"Warn",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"},{value:"error",label:"Error",tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"}];

let e3 = Object.fromEntries(e9.map(e=>[e.value,e]));

let e7 = [{value:"api-gateway",label:"api-gateway"},{value:"auth-service",label:"auth-service"},{value:"payments",label:"payments"},{value:"checkout",label:"checkout"},{value:"search-indexer",label:"search-indexer"},{value:"notifications",label:"notifications"},{value:"scheduler",label:"scheduler"},{value:"cdn-edge",label:"cdn-edge"}];

let ae = [{value:"15",label:"Last 15 minutes"},{value:"60",label:"Last hour"},{value:"240",label:"Last 4 hours"},{value:"1440",label:"Last 24 hours"}];

let aa = [{id:"l01",minutesAgo:1,sec:8,level:"error",service:"payments",message:"Charge declined: gateway returned 402 for intent pi_3Qa"},{id:"l02",minutesAgo:2,sec:41,level:"info",service:"checkout",message:"Order osq_8841 moved to state confirmed"},{id:"l03",minutesAgo:3,sec:12,level:"warn",service:"api-gateway",message:"Upstream latency 1420ms exceeded p95 budget of 800ms"},{id:"l04",minutesAgo:4,sec:55,level:"info",service:"auth-service",message:"Issued access token for user 44182, scope read:profile"},{id:"l05",minutesAgo:5,sec:3,level:"debug",service:"search-indexer",message:"Flushed 512 documents to shard idx-03 in 84ms"},{id:"l06",minutesAgo:6,sec:27,level:"info",service:"notifications",message:"Delivered email receipt to queue, template order_paid"},{id:"l07",minutesAgo:8,sec:19,level:"warn",service:"auth-service",message:"Rate limit reached for client mobile-ios, throttling 30s"},{id:"l08",minutesAgo:9,sec:46,level:"info",service:"api-gateway",message:"Routed GET /v2/catalog to region eu-west-1"},{id:"l09",minutesAgo:11,sec:2,level:"debug",service:"scheduler",message:"Tick 90210 processed 3 due jobs, next run in 60s"},{id:"l10",minutesAgo:12,sec:33,level:"error",service:"search-indexer",message:"Reindex job failed: connection reset by shard idx-07"},{id:"l11",minutesAgo:14,sec:9,level:"info",service:"payments",message:"Refund rf_2210 settled for order osq_8109"},{id:"l12",minutesAgo:16,sec:51,level:"info",service:"cdn-edge",message:"Cache hit ratio 0.94 for asset bundle app.4c2.js"},{id:"l13",minutesAgo:18,sec:24,level:"debug",service:"checkout",message:"Validated cart snapshot with 4 line items, subtotal 128.40"},{id:"l14",minutesAgo:21,sec:7,level:"warn",service:"payments",message:"Retrying webhook delivery to merchant m_5521, attempt 2 of 5"},{id:"l15",minutesAgo:23,sec:38,level:"info",service:"notifications",message:"Push token refreshed for device 8f21ac, platform android"},{id:"l16",minutesAgo:26,sec:14,level:"info",service:"api-gateway",message:"Handled 1284 requests in window, error rate 0.3%"},{id:"l17",minutesAgo:29,sec:59,level:"debug",service:"auth-service",message:"Rotated signing key kid-19, previous kept for 24h grace"},{id:"l18",minutesAgo:33,sec:5,level:"error",service:"checkout",message:"Inventory oversold for sku TS-114, reserved 3 over stock"},{id:"l19",minutesAgo:37,sec:42,level:"info",service:"scheduler",message:"Enqueued nightly digest job for 12840 subscribers"},{id:"l20",minutesAgo:41,sec:18,level:"warn",service:"cdn-edge",message:"Origin fetch slow: 2100ms for region ap-south-1"},{id:"l21",minutesAgo:45,sec:30,level:"info",service:"payments",message:"Captured payment pi_3Qb for amount 64.00 USD"},{id:"l22",minutesAgo:49,sec:11,level:"debug",service:"search-indexer",message:"Merged segments on idx-01, freed 240MB of heap"},{id:"l23",minutesAgo:54,sec:47,level:"info",service:"auth-service",message:"Password reset link generated for user 20915"},{id:"l24",minutesAgo:58,sec:22,level:"warn",service:"api-gateway",message:"Circuit half-open for upstream catalog after 3 failures"},{id:"l25",minutesAgo:64,sec:6,level:"info",service:"notifications",message:"SMS provider switched to fallback carrier for +44 numbers"},{id:"l26",minutesAgo:71,sec:39,level:"error",service:"auth-service",message:"Token verification failed: signature mismatch on kid-17"},{id:"l27",minutesAgo:78,sec:15,level:"info",service:"checkout",message:"Coupon SPRING20 applied to order osq_7742"},{id:"l28",minutesAgo:85,sec:52,level:"debug",service:"scheduler",message:"Skipped job cleanup-tmp, already ran this hour"},{id:"l29",minutesAgo:92,sec:28,level:"info",service:"cdn-edge",message:"Purged 812 objects for tag release-2024-06"},{id:"l30",minutesAgo:100,sec:4,level:"warn",service:"payments",message:"Fraud score 0.72 above threshold for order osq_7610"},{id:"l31",minutesAgo:108,sec:44,level:"info",service:"api-gateway",message:"TLS handshake renegotiated for client edge-pool-2"},{id:"l32",minutesAgo:117,sec:20,level:"debug",service:"search-indexer",message:"Warm query cache primed with 1280 top terms"},{id:"l33",minutesAgo:126,sec:57,level:"info",service:"notifications",message:"Batched 340 in-app notices for digest window"},{id:"l34",minutesAgo:135,sec:33,level:"error",service:"cdn-edge",message:"Edge node ap-1 unreachable, draining traffic to ap-2"},{id:"l35",minutesAgo:146,sec:9,level:"info",service:"checkout",message:"Guest session upgraded to account for user 45120"},{id:"l36",minutesAgo:158,sec:48,level:"warn",service:"scheduler",message:"Job queue depth 1420 growing, workers scaled to 12"},{id:"l37",minutesAgo:170,sec:25,level:"info",service:"payments",message:"Payout batch pb_0912 initiated for 84 merchants"},{id:"l38",minutesAgo:183,sec:1,level:"debug",service:"auth-service",message:"Session store evicted 90 idle entries older than 30m"},{id:"l39",minutesAgo:197,sec:36,level:"info",service:"api-gateway",message:"Config reloaded, 6 routes updated without downtime"},{id:"l40",minutesAgo:210,sec:13,level:"warn",service:"search-indexer",message:"Query timeout on idx-05, returned partial results to caller"},{id:"l41",minutesAgo:224,sec:50,level:"info",service:"notifications",message:"Webhook subscriber wh_44 re-subscribed to order events"},{id:"l42",minutesAgo:236,sec:17,level:"info",service:"cdn-edge",message:"Compression enabled for text assets on region us-east-1"}];

let ar = e=>String(e).padStart(2,"0");

let at = {levels:[],services:[],range:"240",query:""};

let al = (e,a,r)=>!("levels"!==r&&a.levels.length&&!a.levels.includes(e.level)||"services"!==r&&a.services.length&&!a.services.includes(e.service)||"range"!==r&&e.minutesAgo>Number(a.range)||"query"!==r&&a.query.trim()&&!e.message.toLowerCase().includes(a.query.trim().toLowerCase()));

function an({selected:e,counts:a,onToggle:r,onClear:i}){
  let[s,c]=useState(false),[d,_]=useState(""),b=useRef(null),{ref:u,edges:x,onScroll:p}=e4(s);
  useEffect(()=>{
    if(!s)return;
    let e=b.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||c(false)
    },t=e=>{
      "Escape"===e.key&&c(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),a.addEventListener("keydown",t),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r),a.removeEventListener("keydown",t)
    };
  }, [s]);
  let h=e7.filter(e=>e.label.toLowerCase().includes(d.trim().toLowerCase()));
  return (
    <div ref={b} className="relative">
        <button type="button" aria-expanded={s} aria-haspopup="dialog" onClick={()=>c(e=>!e)} className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eG)}>
          <HugeiconsIcon icon={Icon_90089} size={18} strokeWidth={2} aria-hidden="true" />
          Services
          {e.length>0&&<span className={eU("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{e.length}</span>}
        </button>
        {s&&<div role="dialog" aria-label="Filter by service" className={eU("flex max-h-80 w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-4 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute left-0 top-full z-30 mt-1.5 w-[264px] max-h-[none]")}>
          <div className={eU(eQ,eX)}>
            <span data-affix className={eJ}>
              <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <input value={d} onChange={e=>_(e.target.value)} placeholder="Search services…" aria-label="Search services" className={eY} />
          </div>
          <div className="relative -mx-2">
            <ul ref={u} onScroll={p} className="max-h-[220px] space-y-0.5 overflow-y-auto">
              {h.map(l=>{
                let i=e.includes(value),s=a[value]??0;
                return (
                  <li key={value}>
                                <label className={eU("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]",0===s&&!i&&"opacity-40")}>
                                  <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
                                    <input type="checkbox" checked={i} onChange={()=>r(value)} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
                                    <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]" />
                                  </span>
                                  <span className={eU("font-mono text-[12px]/[16px] tabular-nums","min-w-0 flex-1 truncate")}>{label}</span>
                                  <span className={eU("ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","shrink-0")}>{s}</span>
                                </label>
                              </li>
                );
              })}
              {0===h.length&&<li className={eU(e5,"px-2 py-6 text-center")}>
                No services match “
                {d}
                ”
              </li>}
            </ul>
            <div aria-hidden="true" className={eU(e1,"pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eU(e2,"pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
          </div>
          {e.length>0&&<div className={eU("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex justify-end pt-1.5")}><button type="button" onClick={i} className={e0}>Clear services</button></div>}
        </div>}
      </div>
  );
}


export default function filtering_4__Sorbet__Component(){
  let[e,a]=useState(at),{ref:r,edges:i,onScroll:o}=e4(),s=useMemo(()=>aa.filter(a=>al(a,e)).sort((e,a)=>e.minutesAgo-a.minutesAgo), [e]),d=useMemo(()=>{
    let a={};
    for(let r of e7)a[r.value]=aa.filter(a=>al(a,e,"services")&&a.service===r.value).length;
    return a;
  }, [e]),_=useMemo(()=>{
    let a=Number(e.range),r=Array(30).fill(0);
    for(let e of s){
      let t=Math.min(29,Math.max(0,Math.floor((1-e.minutesAgo/a)*29)));
      r[t]+=1
    }
    return r;
  }, [s,e.range]),b=Math.max(1,..._),u=e.levels.length+e.services.length+ +!!e.query.trim(),x=ae.find(a=>a.value===e.range)?.label??"range";
  return (
    <div className={eU("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[920px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Log explorer</h2>
              <p className={eU(e5,"mt-1")}>
                <span className="tabular-nums">{s.length}</span>
                {" events over"}
                {" "}
                {x.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <an selected={e.services} counts={d} onToggle={e=>a(a=>({...a,services:a.services.includes(e)?a.services.filter(a=>a!==e):[...a.services,e]}))} onClear={()=>a(e=>({...e,services:[]}))} />
              <e8 value={e.range} onChange={e=>a(a=>({...a,range:e}))} options={ae} ariaLabel="Time range" className="w-[168px]" />
            </div>
          </header>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Severity" className="flex flex-wrap items-center gap-1.5">
              {e9.map(r=>{
                let l,n=e.levels.includes(r.value),i=(l=r.value,aa.filter(a=>al(a,e,"levels")&&a.level===l).length);
                return (
                  <button key={r.value} type="button" aria-pressed={n} onClick={()=>{
                                let e;
                                return e=r.value,a(a=>({...a,levels:a.levels.includes(e)?a.levels.filter(a=>a!==e):[...a.levels,e]}));
                              }} className={eU("relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40",0===i&&!n&&"opacity-40")}>
                                {r.label}
                                <span className="ms-0.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{i}</span>
                              </button>
                );
              })}
            </div>
            <div className="relative ml-auto w-full sm:w-[280px]">
              <div className={eU(eQ,eX)}>
                <span data-affix className={eJ}>
                  <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <input value={e.query} onChange={e=>a(a=>({...a,query:e.target.value}))} placeholder="Filter messages…" aria-label="Filter messages" className={eY} />
                {e.query&&<span data-affix className={eJ}>
                  <button type="button" aria-label="Clear message filter" onClick={()=>a(e=>({...e,query:""}))} className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]")}>
                    <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </span>}
              </div>
            </div>
          </div>
          <section aria-label="Matched volume" className={eU(eZ,"mt-4 p-4")}>
            <div className="mb-2.5 flex items-center justify-between">
              <span className={eU(e6,"flex flex-wrap gap-x-3")}>
                <span>Volume</span>
                <span>{x.toLowerCase()}</span>
              </span>
              <span className={e6}>
                {"peak "}
                {b}
                /bucket
              </span>
            </div>
            <div className="flex h-14 items-end gap-[3px]">
              {_.map((e,a)=>e>0?<div key={a} className={eU("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","flex-1 rounded-[2px] bg-current")} style={{height:`${Math.max(3,e/b*100)}%`}} />:<div key={a} className={eU("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","flex-1 rounded-[2px]")} style={{height:"3%"}} />)}
            </div>
            <div className={eU(e6,"mt-2 flex items-center justify-between")}>
              <span>oldest</span>
              <span>now</span>
            </div>
          </section>
          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            {0===s.length?<div className={eU(eZ,"flex-1 items-center justify-center px-6 py-16 text-center")}>
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No log lines match these filters</p>
              <p className={eU("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-[300px]")}>
                Widen the time range, clear a severity, or loosen the message query to see more events.
              </p>
              <button type="button" onClick={()=>a(at)} className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eG,"mt-5")}>Reset filters</button>
            </div>:<div className={eU(eZ,"min-h-0 flex-1")}>
              <div ref={r} onScroll={o} className="h-full overflow-y-auto">
                <ul className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                  {s.map(e=>{
                    var a,r;
                    let l,n=e3[e.level];
                    return (
                      <li key={e.id} className={eU("flex min-w-full items-start gap-3 px-4 font-mono text-[13px]/[21px] tabular-nums","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","error"===e.level?"bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]":"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","py-2.5")}>
                                        <span className={eU(eV,"shrink-0")}>{a=e.minutesAgo,r=e.sec,l=872-a,`${ar(Math.floor(l/60))}:${ar(l%60)}:${ar(r)}`}</span>
                                        <span className={eU("inline-flex w-[5ch] shrink-0 font-bold","w-[52px]")}><span className={n.tone}>{e.level}</span></span>
                                        <span className={eU(eV,"hidden w-[124px] shrink-0 truncate sm:block")}>{e.service}</span>
                                        <span className="min-w-0 flex-1">{e.message}</span>
                                      </li>
                    );
                  })}
                </ul>
              </div>
              <div aria-hidden="true" className={eU(e1,"pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eU(e2,"pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
            </div>}
            <div className={eU(e5,"mt-3 flex min-h-7 items-center justify-between")}>
              <span>
                {u>0?<>
                  <span className="tabular-nums">{u}</span>
                  {" active filter"}
                  {1===u?"":"s"}
                </>:"No filters applied"}
              </span>
              {u>0&&<button type="button" onClick={()=>a(at)} className={e0}>Clear all</button>}
            </div>
          </div>
        </div>
      </div>
  );
}
