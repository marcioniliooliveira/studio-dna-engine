/**
 * React Bits Pro — Application UI (filtering-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { key, left, preventDefault, useEffect, useId, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40296 = [["path",{d:"M10.637 16.8238L20.3868 7.07406C20.7794 6.68143 21 6.1489 21 5.59363C21 4.43735 20.0626 3.5 18.9064 3.5C18.3511 3.5 17.8186 3.72058 17.4259 4.11321L7.67619 13.863H5.63905C5.2648 13.863 5.07768 13.863 4.89646 13.8971C4.7879 13.9176 4.68124 13.9471 4.57761 13.9854C4.40465 14.0494 4.24419 14.1457 3.92328 14.3382C3.34739 14.6837 3.05945 14.8565 3.01249 15.0613C2.98553 15.1788 3.00255 15.3021 3.06032 15.408C3.16096 15.5924 3.48493 15.6807 4.13286 15.8574L7.67619 16.8238L8.64256 20.3671C8.81926 21.0151 8.90762 21.339 9.09202 21.4397C9.19787 21.4975 9.3212 21.5145 9.43874 21.4875C9.6435 21.4406 9.81626 21.1526 10.1618 20.5767C10.3543 20.2558 10.4506 20.0954 10.5146 19.9224C10.5529 19.8188 10.5824 19.7121 10.6029 19.6035C10.637 19.4223 10.637 19.2352 10.637 18.861V16.8238Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 10V17.9457C17.5 18.6356 17.3125 19.3125 16.9575 19.9041C16.5581 20.5698 15.5727 20.5029 15.2669 19.7893L13 14.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 7H6.55434C5.86444 7 5.18751 7.1875 4.59592 7.54245C3.93025 7.94186 3.99713 8.92734 4.71066 9.23314L10 11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

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

let rA = (...e)=>e.filter(Boolean).join(" ");

let rD = "text-neutral-900 dark:text-neutral-100";

let rE = "text-neutral-900/62 dark:text-neutral-100/62";

let rM = "text-[17px]/[26px] font-medium";

let rL = "text-[14px]/[20px] font-medium";

let rR = "text-[15px]/[20px] font-bold";

let rP = "text-[13px]/[16px] font-semibold tabular-nums";

let rT = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let rW = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let rH = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let r$ = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let rq = "ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let rI = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

function rB({id:e,value:a,onChange:r,options:s,disabled:c,placeholder:d="Select…",className:_,triggerClassName:b,leading:u,ariaLabel:x}){
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
    <div ref={j} className={rA("relative",_)}>
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
        }} aria-label={x} className={rA("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {u}
            <span className={rA("truncate",!S&&"text-neutral-900/62 dark:text-neutral-100/62")}>{S?S.label:d}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {h&&<ul ref={N} id={p} role="listbox" tabIndex={-1} style={{maxHeight:w}} className={rA("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===m||undefined} onMouseEnter={()=>v(r)} onClick={()=>D(r)} className={rA("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={rA(rP,rE,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function rF({min:e,max:a,step:r=1,value:n,onChange:i,format:o,labels:s}){
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
        <span className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{left:`${u(n[0])}%`,width:`${u(n[1])-u(n[0])}%`}} />
        </span>
        <div {...h(0)} />
        <div {...h(1)} />
      </div>
  );
}

let rK = [{value:"NW",label:"Northwind"},{value:"SV",label:"Silverline"},{value:"AP",label:"Apex Air"},{value:"CN",label:"Cascade"},{value:"MR",label:"Meridian"}];

let rO = [{value:"any",label:"Any number of stops"},{value:"0",label:"Nonstop only"},{value:"1",label:"1 stop or fewer"},{value:"2",label:"2 stops or fewer"}];

let rU = [{id:"f1",airline:"NW",depart:360,duration:330,stops:0,price:289,carryOn:true},{id:"f2",airline:"SV",depart:465,duration:335,stops:0,price:312,carryOn:true},{id:"f3",airline:"AP",depart:420,duration:470,stops:1,price:214,carryOn:false},{id:"f4",airline:"CN",depart:540,duration:505,stops:1,price:198,carryOn:true},{id:"f5",airline:"MR",depart:600,duration:340,stops:0,price:358,carryOn:true},{id:"f6",airline:"NW",depart:690,duration:455,stops:1,price:231,carryOn:false},{id:"f7",airline:"SV",depart:300,duration:620,stops:2,price:176,carryOn:false},{id:"f8",airline:"AP",depart:780,duration:345,stops:0,price:334,carryOn:true},{id:"f9",airline:"CN",depart:855,duration:590,stops:2,price:189,carryOn:false},{id:"f10",airline:"MR",depart:930,duration:480,stops:1,price:256,carryOn:true},{id:"f11",airline:"NW",depart:1020,duration:335,stops:0,price:372,carryOn:true},{id:"f12",airline:"SV",depart:1080,duration:500,stops:1,price:243,carryOn:false},{id:"f13",airline:"AP",depart:1170,duration:350,stops:0,price:298,carryOn:true},{id:"f14",airline:"CN",depart:1260,duration:610,stops:2,price:167,carryOn:false},{id:"f15",airline:"MR",depart:1320,duration:355,stops:0,price:405,carryOn:true}];

let rV = [{value:"cheapest",label:"Cheapest"},{value:"fastest",label:"Fastest"},{value:"earliest",label:"Earliest departure"}];

let rG = e=>e.toString().padStart(2,"0");

let rQ = e=>{
  let a=(e%1440+1440)%1440;
  return `${rG(Math.floor(a/60))}:${rG(a%60)}`;
};

let rX = e=>1440===e?"24:00":rQ(e);

let rY = e=>{
  let a=Math.floor(e/60),r=e%60;
  return 0===r?`${a}h`:`${a}h ${r}m`;
};

let rJ = e=>`$${e}`;

let rZ = {stops:"any",depart:[0,1440],duration:[300,660],airlines:[],carryOn:false};

let r0 = (e,a,r)=>{
  if("stops"!==r&&"any"!==a.stops){
    let r=Number(a.stops);
    if(0===r?0!==e.stops:e.stops>r)return false;
  }
  return ("depart"===r||!(e.depart<a.depart[0])&&!(e.depart>a.depart[1]))&&("duration"===r||!(e.duration<a.duration[0])&&!(e.duration>a.duration[1]))&&("airlines"===r||!a.airlines.length||!!a.airlines.includes(e.airline))&&("carryOn"===r||!a.carryOn||!!e.carryOn);
};

function r1({label:e,children:a}){
  return (
    <section className="py-5 first:pt-0">
        <h3 className={rA(rR,rD,"mb-3")}>{e}</h3>
        {a}
      </section>
  );
}


export default function filtering_8__Sorbet__Component(){
  let[e,a]=useState(rZ),[r,i]=useState("cheapest"),[d,_]=useState(null),[b,u]=useState(false),x=useMemo(()=>{
    let a=rU.filter(a=>r0(a,e));
    return "fastest"===r?[...a].sort((e,a)=>e.duration-a.duration):"earliest"===r?[...a].sort((e,a)=>e.depart-a.depart):[...a].sort((e,a)=>e.price-a.price);
  }, [e,r]),p=rU.filter(a=>r0(a,e,"carryOn")&&a.carryOn).length,h=e=>a(a=>({...a,airlines:a.airlines.includes(e)?a.airlines.filter(a=>a!==e):[...a.airlines,e]})),k=0!==e.depart[0]||1440!==e.depart[1],m=300!==e.duration[0]||660!==e.duration[1],v=[..."any"!==e.stops?[{key:"stops",label:rO.find(a=>a.value===e.stops)?.label??e.stops,clear:()=>a(e=>({...e,stops:"any"}))}]:[],...k?[{key:"depart",label:`Depart ${rX(e.depart[0])} – ${rX(e.depart[1])}`,clear:()=>a(e=>({...e,depart:[0,1440]}))}]:[],...m?[{key:"duration",label:`Under ${rY(e.duration[1])}`,clear:()=>a(e=>({...e,duration:[300,660]}))}]:[],...e.airlines.map(e=>({key:`airline:${e}`,label:rK.find(a=>a.value===e)?.label??e,clear:()=>h(e)})),...e.carryOn?[{key:"carryOn",label:"Carry-on included",clear:()=>a(e=>({...e,carryOn:false}))}]:[]],g=<div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
    <r1 label="Stops">
      <div role="radiogroup" aria-label="Number of stops" className="-mx-2 space-y-0.5">
        {rO.map(r=>{
          let l,n=(l=r.value,rU.filter(a=>r0(a,e,"stops")&&((e,a)=>{
            if("any"===a)return true;
            let r=Number(a);
            return 0===r?0===e.stops:e.stops<=r;
          })(a,l)).length),i=e.stops===r.value;
          return (
            <label key={r.value} className={rA(r$,0===n&&!i&&"opacity-40")}>
                        <input type="radio" name="stops" checked={i} onChange={()=>a(e=>({...e,stops:r.value}))} className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,border-width,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-[6px] checked:border-[var(--rb-accent,oklch(84%_0.15_165))] checked:bg-white checked:shadow-[0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:border-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:bg-neutral-900 dark:checked:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:border-neutral-100/28" />
                        <span className="min-w-0 flex-1 truncate">{r.label}</span>
                        <span className={rA(rq,"shrink-0")}>{n}</span>
                      </label>
          );
        })}
      </div>
    </r1>
    <r1 label="Departure time">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={rA(rR,rD,"tabular-nums")}>
          {rX(e.depart[0])}
          {" – "}
          {rX(e.depart[1])}
        </span>
        {k&&<button type="button" onClick={()=>a(e=>({...e,depart:[0,1440]}))} className={rI}>Reset</button>}
      </div>
      <rF min={0} max={1440} step={15} value={e.depart} onChange={e=>a(a=>({...a,depart:e}))} format={rX} labels={["Earliest departure","Latest departure"]} />
    </r1>
    <r1 label="Duration">
      <div className="mb-4 flex min-h-7 items-center justify-between">
        <span className={rA(rR,rD,"tabular-nums")}>
          {rY(e.duration[0])}
          {" –"}
          {" "}
          {rY(e.duration[1])}
        </span>
        {m&&<button type="button" onClick={()=>a(e=>({...e,duration:[300,660]}))} className={rI}>Reset</button>}
      </div>
      <rF min={300} max={660} step={5} value={e.duration} onChange={e=>a(a=>({...a,duration:e}))} format={rY} labels={["Shortest duration","Longest duration"]} />
    </r1>
    <r1 label="Airlines">
      <ul className="-mx-2 space-y-0.5">
        {rK.map(a=>{
          var r;
          let l,i,s=(l=a.value,rU.filter(a=>r0(a,e,"airlines")&&a.airline===l).length),c=(r=a.value,(i=rU.filter(a=>r0(a,e,"airlines")&&a.airline===r).map(e=>e.price)).length?Math.min(...i):null),d=e.airlines.includes(a.value);
          return (
            <li key={a.value}>
                        <label className={rA(r$,0===s&&!d&&"opacity-40")}>
                          <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
                            <input type="checkbox" checked={d} onChange={()=>h(a.value)} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
                            <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{a.label}</span>
                          <span className={rA(rq,"shrink-0")}>{null!==c?`from ${rJ(c)}`:"None"}</span>
                        </label>
                      </li>
          );
        })}
      </ul>
    </r1>
    <r1 label="Baggage">
      <label className="flex cursor-pointer items-center justify-between gap-3">
        <span className="min-w-0">
          <span className={rA(rR,rD,"block")}>Carry-on included</span>
          <span className={rA("max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 block")}>
            <span className="tabular-nums">{p}</span>
            {" fares with a free cabin bag"}
          </span>
        </span>
        <button type="button" role="switch" aria-checked={e.carryOn} aria-label="Carry-on included" onClick={()=>a(e=>({...e,carryOn:!e.carryOn}))} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
          <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
        </button>
      </label>
    </r1>
  </div>;
  return (
    <div className={rA("bg-white dark:bg-neutral-950",rD,"flex h-full min-h-[1000px] w-full flex-col overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={rA("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",rD)}>San Francisco to New York</h2>
              <p className={rA(rL,rE,"mt-1 flex flex-wrap gap-x-3")}>
                <span role="status">
                  <span className={rA(rD,"tabular-nums")}>{x.length}</span>
                  {" "}
                  {"of "}
                  <span className="tabular-nums">{rU.length}</span>
                  {" "}
                  flights
                </span>
                <span>Thu, Jun 12</span>
                <span>SFO → JFK</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-expanded={b} onClick={()=>u(e=>!e)} className={rA(rW,rH,"md:hidden")}>
                <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
                Filters
                {v.length>0&&<span className="tabular-nums">
                  (
                  {v.length}
                  )
                </span>}
              </button>
              <rB value={r} onChange={i} options={rV} ariaLabel="Sort flights" className="w-[200px]" />
            </div>
          </header>
          <div className="mt-6 flex flex-1 flex-col gap-6 md:flex-row md:gap-8">
            <aside className={rA("w-full shrink-0 md:block md:w-[260px]",b?"block":"hidden")}>{g}</aside>
            <div className="flex min-w-0 flex-1 flex-col">
              {v.length>0&&<div className="mb-4 flex flex-wrap items-center gap-2">
                {v.map(e=>(
                  <span key={e.key} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
                                {e.label}
                                <button type="button" aria-label={`Remove ${e.label} filter`} onClick={e.clear} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/8 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/12 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />
                                </button>
                              </span>
                ))}
                <button type="button" onClick={()=>a(rZ)} className={rI}>Clear all</button>
              </div>}
              {0===x.length?<div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No flights match these filters</p>
                <p className={rA("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-[300px]")}>Allow more stops or widen the departure window to see more of the day.</p>
                <button type="button" onClick={()=>a(rZ)} className={rA(rT,rH,"mt-5")}>Clear all filters</button>
              </div>:<ul className="space-y-3">
                {x.map(e=>{
                  let a,r=rK.find(a=>a.value===e.airline),l=e.depart+e.duration,i=Math.floor(l/1440),s=d===e.id;
                  return (
                    <li key={e.id}>
                                    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]">
                                      <div className={rA(s&&"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","flex flex-wrap items-center gap-x-5 gap-y-3 p-4")}>
                                        <span className={rA("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-[40px]")}>
                                          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.airline}</span>
                                        </span>
                                        <div className="min-w-0 grow basis-40">
                                          <div className={rA(rM,rD,"flex items-baseline gap-1.5 tabular-nums")}>
                                            <span>{rQ(e.depart)}</span>
                                            <span className={rE}>–</span>
                                            <span>{rQ(l)}</span>
                                            {i>0&&<span className={rA(rP,rE)}>
                                              +
                                              {i}
                                            </span>}
                                          </div>
                                          <p className={rA(rP,rE,"mt-0.5 truncate")}>{r?.label}</p>
                                        </div>
                                        <div className="basis-24 text-right sm:text-left">
                                          <p className={rA(rL,rD)}>{0===(a=e.stops)?"Nonstop":1===a?"1 stop":`${a} stops`}</p>
                                          <p className={rA(rP,rE,"mt-0.5")}>{rY(e.duration)}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <div className="text-right">
                                            <p className={rA(rM,rD,"tabular-nums")}>{rJ(e.price)}</p>
                                            <p className={rA(rP,rE,"mt-0.5")}>{e.carryOn?"Carry-on":"Fare only"}</p>
                                          </div>
                                          <button type="button" aria-pressed={s} onClick={()=>_(a=>a===e.id?null:e.id)} className={rA(s?rT:rW,rH,"min-w-[114px]")}>
                                            {s?<>
                                              <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                                              Selected
                                            </>:<>
                                              <HugeiconsIcon icon={Icon_40296} size={18} strokeWidth={2} aria-hidden="true" />
                                              Select
                                            </>}
                                          </button>
                                        </div>
                                      </div>
                                    </article>
                                  </li>
                  );
                })}
              </ul>}
            </div>
          </div>
        </div>
      </div>
  );
}
